'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('game_answers', {
            answer_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            player_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'players',
                    key: 'player_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            question_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'questions',
                    key: 'question_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            choice_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'choices',
                    key: 'choice_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },

            is_correct: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },

            response_time_ms: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            stars_earned: {
                type: Sequelize.INTEGER,
                allowNUll: false,
                defaultValue: 0
            },

            answered_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('answers');
    }
};