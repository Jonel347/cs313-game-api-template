const repository = require('../repositories/game-session.repository');

async function getSessionByCode(sessionCode) {
  return repository.findByCode(sessionCode);
}

async function createSession(data) {
  return repository.create(data);
}

async function updateSession(sessionCode, data) {
  return repository.update(sessionCode, data);
}

module.exports = {
  getSessionByCode,
  createSession,
  updateSession
};