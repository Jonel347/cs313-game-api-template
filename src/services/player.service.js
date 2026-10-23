const repository = require('../repositories/player.repository');
const { GameSession } = require('../models');

async function getPlayers(sessionId) {
  return repository.findBySessionId(sessionId);
}

async function joinSession(sessionId, userId, nickname) {
  const existingPlayer = await repository.findBySessionAndUser(
    sessionId,
    userId
  );

  if (existingPlayer) {
    return {
      error: 'ALREADY_JOINED',
      player: existingPlayer
    };
  }

  const player = await repository.create({
    session_id: sessionId,
    user_id: userId,
    nickname
  });

  return {
    player
  };
}

async function getSessionByCode(sessionCode) {
  return GameSession.findOne({
    where: {
      session_code: sessionCode
    }
  });
}

module.exports = {
  getPlayers,
  joinSession,
  getSessionByCode
};