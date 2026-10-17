'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [[host]] = await db.query(
      "SELECT user_id FROM users WHERE school_id = '2099-0001'"
    );

    const [[questionSet]] = await db.query(
      "SELECT question_set_id FROM question_sets WHERE title = 'Library Mayhem Basics'"
    );

    if (!host) {
      throw new Error('Demo host user was not found.');
    }

    if (!questionSet) {
      throw new Error('Demo question set was not found.');
    }

    await queryInterface.bulkInsert('game_sessions', [
      {
        session_code: 'LIB001',
        host_user_id: host.user_id,
        question_set_id: questionSet.question_set_id,
        status: 'WAITING',
        started_at: null,
        ended_at: null,
        time_limit_seconds: 300,
        chaos_meter: 0,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('game_sessions', {
      session_code: 'LIB001',
    });
  },
};