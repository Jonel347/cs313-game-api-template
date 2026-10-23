const repository = require('../repositories/game-answer.repository');

async function getAnswersByPlayerId(playerId) {
  return repository.findByPlayerId(playerId);
}

async function submitAnswer(data) {
  return repository.create(data);
}

module.exports = {
  getAnswersByPlayerId,
  submitAnswer
};