'use strict';

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define(
    'Player',
    {
      player_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      nickname: {
        type: DataTypes.STRING(50),
        allowNull: false
      },

      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      joined_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'players',
      timestamps: false
    }
  );

  return Player;
};