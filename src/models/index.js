// ONE Sequelize instance (one connection pool) for the whole API.
// Every other file imports it from here - nobody opens a second one.
const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');
const dbConfig = require('../config/database')[env.nodeEnv];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Load all models
const User = require('./user')(sequelize, DataTypes);
const QuestionSet = require('./question-set')(sequelize, DataTypes);
const Question = require('./question')(sequelize, DataTypes);
const Choice = require('./choice')(sequelize, DataTypes);
const GameSession = require('./game-session')(sequelize, DataTypes);
const Player = require('./player')(sequelize, DataTypes);
const GameAnswer = require('./game-answer')(sequelize, DataTypes);

// User → Question Sets
User.hasMany(QuestionSet, {
  foreignKey: 'created_by',
  as: 'questionSets'
});

QuestionSet.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator'
});

// Question Set → Questions
QuestionSet.hasMany(Question, {
  foreignKey: 'set_id',
  as: 'questions'
});

Question.belongsTo(QuestionSet, {
  foreignKey: 'set_id',
  as: 'questionSet'
});

// Question → Choices
Question.hasMany(Choice, {
  foreignKey: 'question_id',
  as: 'choices'
});

Choice.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question'
});

// User → Game Sessions
User.hasMany(GameSession, {
  foreignKey: 'host_user_id',
  as: 'gameSessions'
});

GameSession.belongsTo(User, {
  foreignKey: 'host_user_id',
  as: 'host'
});

// Question Set → Game Sessions
QuestionSet.hasMany(GameSession, {
  foreignKey: 'question_set_id',
  as: 'gameSessions'
});

GameSession.belongsTo(QuestionSet, {
  foreignKey: 'question_set_id',
  as: 'questionSet'
});

// Game Session → Players
GameSession.hasMany(Player, {
  foreignKey: 'session_id',
  as: 'players'
});

Player.belongsTo(GameSession, {
  foreignKey: 'session_id',
  as: 'session'
});

// User → Players
User.hasMany(Player, {
  foreignKey: 'user_id',
  as: 'players'
});

Player.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Player → Game Answers
Player.hasMany(GameAnswer, {
  foreignKey: 'player_id',
  as: 'answers'
});

GameAnswer.belongsTo(Player, {
  foreignKey: 'player_id',
  as: 'player'
});

// Question → Game Answers
Question.hasMany(GameAnswer, {
  foreignKey: 'question_id',
  as: 'gameAnswers'
});

GameAnswer.belongsTo(Question, {
  foreignKey: 'question_id',
  as: 'question'
});

module.exports = {
  sequelize,
  Sequelize,
  DataTypes,
  User,
  QuestionSet,
  Question,
  Choice,
  GameSession,
  Player,
  GameAnswer
};