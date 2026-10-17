'use strict';

module.exports = (sequelize, DataTypes) => {
  const GameSession = sequelize.define(
    'GameSession',
    {
      session_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      session_code: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true
      },

      host_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      question_set_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'WAITING'
      },

      started_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      ended_at: {
        type: DataTypes.DATE,
        allowNull: true
      },

      time_limit_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      chaos_meter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'game_sessions',
      timestamps: false
    }
  );

  return GameSession;
};