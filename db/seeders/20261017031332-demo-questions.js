'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [[questionSet]] = await db.query(
      "SELECT question_set_id FROM question_sets WHERE title = 'Library Mayhem Basics'"
    );

    if (!questionSet) {
      throw new Error('Demo question set was not found.');
    }

    await queryInterface.bulkInsert('questions', [
      {
        question_set_id: questionSet.question_set_id,
        prompt: 'What should you do when a book is misplaced in the library?',
        correct_answer: 'REPORT IT',
        points: 10,
      },
      {
        question_set_id: questionSet.question_set_id,
        prompt: 'Which section usually contains books about computers and technology?',
        correct_answer: 'TECHNOLOGY',
        points: 10,
      },
      {
        question_set_id: questionSet.question_set_id,
        prompt: 'What do you call the person who borrows a library book?',
        correct_answer: 'BORROWER',
        points: 10,
      },
      {
        question_set_id: questionSet.question_set_id,
        prompt: 'What should you check before leaving the library with a borrowed book?',
        correct_answer: 'DUE DATE',
        points: 10,
      },
      {
        question_set_id: questionSet.question_set_id,
        prompt: 'What is the main purpose of a library?',
        correct_answer: 'INFORMATION',
        points: 10,
      },
    ]);
  },

  async down(queryInterface) {
    const db = queryInterface.sequelize;

    const [[questionSet]] = await db.query(
      "SELECT question_set_id FROM question_sets WHERE title = 'Library Mayhem Basics'"
    );

    if (questionSet) {
      await queryInterface.bulkDelete('questions', {
        question_set_id: questionSet.question_set_id,
      });
    }
  },
};