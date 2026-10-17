'use strict';

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'Question',
    {
      question_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      question_set_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      question_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      question_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      time_limit_seconds: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'questions',
      timestamps: false
    }
  );

  return Question;
};
