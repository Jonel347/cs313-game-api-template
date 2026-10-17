'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [[host]] = await db.query(
      "SELECT user_id FROM users WHERE school_id = '2099-0001'"
    );

    if (!host) {
      throw new Error('Demo host user was not found.');
    }

    await queryInterface.bulkInsert('question_sets', [
      {
        owner_user_id: host.user_id,
        title: 'Library Mayhem Basics',
        description: 'Basic questions for the Library Mayhem game.',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('question_sets', {
      title: 'Library Mayhem Basics',
    });
  },
};