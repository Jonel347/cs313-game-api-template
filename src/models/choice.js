'use strict';

module.exports = (sequelize, DataTypes) => {
  const Choice = sequelize.define(
    'Choice',
    {
      choice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      choice_text: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: 'choices',
      timestamps: false
    }
  );

  return Choice;
};