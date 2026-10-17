'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [[session]] = await db.query(
      "SELECT session_id FROM game_sessions WHERE session_code = 'LIB001'"
    );

    const [players] = await db.query(`
      SELECT player_id, user_id
      FROM players
      WHERE session_id = ${session ? session.session_id : -1}
      ORDER BY player_id
    `);

    const [questions] = await db.query(`
      SELECT question_id
      FROM questions
      WHERE question_set_id = (
        SELECT question_set_id
        FROM question_sets
        WHERE title = 'Library Mayhem Basics'
      )
      ORDER BY question_id
    `);

    const [choices] = await db.query(`
      SELECT choice_id, question_id, choice_text, is_correct
      FROM choices
      WHERE question_id IN (
        SELECT question_id
        FROM questions
        WHERE question_set_id = (
          SELECT question_set_id
          FROM question_sets
          WHERE title = 'Library Mayhem Basics'
        )
      )
      ORDER BY choice_id
    `);

    if (!session) {
      throw new Error('Demo game session was not found.');
    }

    if (players.length !== 3) {
      throw new Error('Expected exactly 3 demo players.');
    }

    if (questions.length !== 5) {
      throw new Error('Expected exactly 5 demo questions.');
    }

    if (choices.length !== 20) {
      throw new Error('Expected exactly 20 demo choices.');
    }

    const correctChoice = (questionId) =>
      choices.find(
        (choice) =>
          choice.question_id === questionId && choice.is_correct === true
      );

    const choiceFor = (questionId, text) =>
      choices.find(
        (choice) =>
          choice.question_id === questionId && choice.choice_text === text
      );

    const q1Correct = correctChoice(questions[0].question_id);
    const q2Correct = correctChoice(questions[1].question_id);
    const q3Correct = correctChoice(questions[2].question_id);

    const q1Wrong = choiceFor(questions[0].question_id, 'HIDE IT');
    const q2Wrong = choiceFor(questions[1].question_id, 'HISTORY');
    const q3Wrong = choiceFor(questions[2].question_id, 'AUTHOR');
    const q4Wrong = choiceFor(questions[3].question_id, 'BOOK TITLE');

    await queryInterface.bulkInsert('game_answers', [
      {
        player_id: players[0].player_id,
        question_id: questions[0].question_id,
        choice_id: q1Correct.choice_id,
        is_correct: true,
        response_time_ms: 4200,
        stars_earned: 3,
      },
      {
        player_id: players[0].player_id,
        question_id: questions[1].question_id,
        choice_id: q2Correct.choice_id,
        is_correct: true,
        response_time_ms: 5100,
        stars_earned: 3,
      },
      {
        player_id: players[1].player_id,
        question_id: questions[0].question_id,
        choice_id: q1Wrong.choice_id,
        is_correct: false,
        response_time_ms: 8300,
        stars_earned: 0,
      },
      {
        player_id: players[1].player_id,
        question_id: questions[1].question_id,
        choice_id: q2Correct.choice_id,
        is_correct: true,
        response_time_ms: 6200,
        stars_earned: 2,
      },
      {
        player_id: players[2].player_id,
        question_id: questions[2].question_id,
        choice_id: q3Correct.choice_id,
        is_correct: true,
        response_time_ms: 3900,
        stars_earned: 3,
      },
      {
        player_id: players[2].player_id,
        question_id: questions[3].question_id,
        choice_id: q4Wrong.choice_id,
        is_correct: false,
        response_time_ms: null,
        stars_earned: 0,
      },
    ]);
  },

  async down(queryInterface) {
    const db = queryInterface.sequelize;

    const [players] = await db.query(`
      SELECT player_id
      FROM players
      WHERE session_id = (
        SELECT session_id
        FROM game_sessions
        WHERE session_code = 'LIB001'
      )
    `);

    const playerIds = players.map((player) => player.player_id);

    if (playerIds.length > 0) {
      await queryInterface.bulkDelete('game_answers', {
        player_id: playerIds,
      });
    }
  },
};