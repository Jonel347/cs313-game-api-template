const { GameAnswer } = require('../models');

async function findByPlayerId(playerId) {
  return GameAnswer.findAll({
    where: {
      player_id: playerId
    },
    order: [['answer_id', 'ASC']]
  });
}

async function create(data) {
  return GameAnswer.create(data);
}

module.exports = {
  findByPlayerId,
  create
};