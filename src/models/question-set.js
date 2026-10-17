'use strict';

module.exports = (sequelize, DataTypes) => {
  const QuestionSet = sequelize.define(
    'QuestionSet',
    {
      question_set_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      owner_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      title: {
        type: DataTypes.STRING(100),
        allowNull: false
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },

      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'question_sets',
      timestamps: false
    }
  );

  return QuestionSet;
};