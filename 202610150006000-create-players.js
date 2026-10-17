'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('players', {
            player_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            session_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'game_sessions',
                    key: 'session_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },

            nickname: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },

            score: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            completed: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            joined_at: {
                type: Sequelize.DATE,
                allowNUll: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('players');
    }
};