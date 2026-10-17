'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [questions] = await db.query(`
      SELECT question_id, prompt
      FROM questions
      WHERE question_set_id = (
        SELECT question_set_id
        FROM question_sets
        WHERE title = 'Library Mayhem Basics'
      )
      ORDER BY question_id
    `);

    if (questions.length !== 5) {
      throw new Error('Expected 5 demo questions, found ${questions.length}.');
    }

    const questionIds = questions.map((question) => question.question_id);

    await queryInterface.bulkInsert('choices', [
      // Question 1
      {
        question_id: questionIds[0],
        choice_text: 'REPORT IT',
        is_correct: true,
      },
      {
        question_id: questionIds[0],
        choice_text: 'HIDE IT',
        is_correct: false,
      },
      {
        question_id: questionIds[0],
        choice_text: 'KEEP IT',
        is_correct: false,
      },
      {
        question_id: questionIds[0],
        choice_text: 'IGNORE IT',
        is_correct: false,
      },

      // Question 2
      {
        question_id: questionIds[1],
        choice_text: 'TECHNOLOGY',
        is_correct: true,
      },
      {
        question_id: questionIds[1],
        choice_text: 'HISTORY',
        is_correct: false,
      },
      {
        question_id: questionIds[1],
        choice_text: 'FICTION',
        is_correct: false,
      },
      {
        question_id: questionIds[1],
        choice_text: 'ART',
        is_correct: false,
      },

      // Question 3
      {
        question_id: questionIds[2],
        choice_text: 'BORROWER',
        is_correct: true,
      },
      {
        question_id: questionIds[2],
        choice_text: 'LIBRARIAN',
        is_correct: false,
      },
      {
        question_id: questionIds[2],
        choice_text: 'AUTHOR',
        is_correct: false,
      },
      {
        question_id: questionIds[2],
        choice_text: 'PUBLISHER',
        is_correct: false,
      },

      // Question 4
      {
        question_id: questionIds[3],
        choice_text: 'DUE DATE',
        is_correct: true,
      },
      {
        question_id: questionIds[3],
        choice_text: 'BOOK TITLE',
        is_correct: false,
      },
      {
        question_id: questionIds[3],
        choice_text: 'AUTHOR NAME',
        is_correct: false,
      },
      {
        question_id: questionIds[3],
        choice_text: 'PAGE COUNT',
        is_correct: false,
      },

      // Question 5
      {
        question_id: questionIds[4],
        choice_text: 'INFORMATION',
        is_correct: true,
      },
      {
        question_id: questionIds[4],
        choice_text: 'ENTERTAINMENT ONLY',
        is_correct: false,
      },
      {
        question_id: questionIds[4],
        choice_text: 'SELLING BOOKS',
        is_correct: false,
      },
      {
        question_id: questionIds[4],
        choice_text: 'STORING TOYS',
        is_correct: false,
      },
    ]);
  },

  async down(queryInterface) {
    const db = queryInterface.sequelize;

    const [questions] = await db.query(`
      SELECT question_id
      FROM questions
      WHERE question_set_id = (
        SELECT question_set_id
        FROM question_sets
        WHERE title = 'Library Mayhem Basics'
      )
    `);

    const questionIds = questions.map((question) => question.question_id);

    if (questionIds.length > 0) {
      await queryInterface.bulkDelete('choices', {
        question_id: questionIds,
      });
    }
  },
};