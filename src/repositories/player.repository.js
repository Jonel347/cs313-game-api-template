const { Player } = require('../models');

async function findBySessionId(sessionId) {
  return Player.findAll({
    where: {
      session_id: sessionId
    },
    order: [['player_id', 'ASC']]
  });
}

async function findBySessionAndUser(sessionId, userId) {
  return Player.findOne({
    where: {
      session_id: sessionId,
      user_id: userId
    }
  });
}

async function create(data) {
  return Player.create(data);
}

module.exports = {
  findBySessionId,
  findBySessionAndUser,
  create
};