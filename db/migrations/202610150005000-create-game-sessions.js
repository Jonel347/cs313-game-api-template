'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('game_sessions', {
            session_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            session_code: {
                type: Sequelize.STRING(6),
                allowNull: false,
                unique: true
            },

            host_user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },

            question_set_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'question_sets',
                    key: 'question_set_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },

            status: {
                type: Sequelize.STRING(20),
                allowNull: false,
                defaultValue: 'WAITING'
            },

            started_at: {
                type: Sequelize.DATE,
                allowNull: true
            },

            ended_at: {
                type: Sequelize.DATE,
                allowNUll: false
            },

            time_limit_seconds: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            chaos_meter: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('game_sessions');
    }
};