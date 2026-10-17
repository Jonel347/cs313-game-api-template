'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0001',
        username: 'library_master',
        password_hash: 'demo_hash_001',
        role: 'HOST',
      },
      {
        school_id: '2099-0002',
        username: 'bookworm01',
        password_hash: 'demo_hash_002',
        role: 'PLAYER',
      },
      {
        school_id: '2099-0003',
        username: 'page_turner',
        password_hash: 'demo_hash_003',
        role: 'PLAYER',
      },
      {
        school_id: '2099-0004',
        username: 'quiet_reader',
        password_hash: 'demo_hash_004',
        role: 'PLAYER',
      },
      {
        school_id: '2099-0005',
        username: 'study_buddy',
        password_hash: 'demo_hash_005',
        role: 'PLAYER',
      },
      {
        school_id: '2099-0006',
        username: 'chapter_chaser',
        password_hash: 'demo_hash_006',
        role: 'PLAYER',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      school_id: {
        [queryInterface.sequelize.Sequelize.Op.like]: '2099-%',
      },
    });
  },
};