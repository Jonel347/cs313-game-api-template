'use strict';

module.exports = (sequelize, DataTypes) => {
  const GameAnswer = sequelize.define(
    'GameAnswer',
    {
      answer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      player_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      choice_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },

      response_time_ms: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      stars_earned: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      answered_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'game_answers',
      timestamps: false
    }
  );

  return GameAnswer;
};