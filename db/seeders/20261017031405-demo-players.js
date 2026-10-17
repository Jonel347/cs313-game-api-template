'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [[session]] = await db.query(
      "SELECT session_id FROM game_sessions WHERE session_code = 'LIB001'"
    );

    const [users] = await db.query(`
      SELECT user_id, school_id
      FROM users
      WHERE school_id IN ('2099-0002', '2099-0003', '2099-0004')
      ORDER BY school_id
    `);

    if (!session) {
      throw new Error('Demo game session was not found.');
    }

    if (users.length !== 3) {
      throw new Error('Expected exactly 3 demo player users.');
    }

    await queryInterface.bulkInsert('players', [
      {
        session_id: session.session_id,
        user_id: users[0].user_id,
        nickname: 'Bookworm',
        score: 30,
        completed: false,
      },
      {
        session_id: session.session_id,
        user_id: users[1].user_id,
        nickname: 'Page Turner',
        score: 20,
        completed: false,
      },
      {
        session_id: session.session_id,
        user_id: users[2].user_id,
        nickname: 'Quiet Reader',
        score: 10,
        completed: true,
      },
    ]);
  },

  async down(queryInterface) {
    const db = queryInterface.sequelize;

    const [[session]] = await db.query(
      "SELECT session_id FROM game_sessions WHERE session_code = 'LIB001'"
    );

    if (session) {
      await queryInterface.bulkDelete('players', {
        session_id: session.session_id,
      });
    }
  },
};