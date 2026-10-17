'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('questions', {
            question_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            question_set_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'question_sets',
                    key: 'question_set_id'
                }
            },

            prompt: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            correct_answer: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            points: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('questions');
    }
};