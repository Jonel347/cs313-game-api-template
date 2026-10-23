const { GameSession } = require('../models');

async function findByCode(sessionCode) {
  return GameSession.findOne({
    where: {
      session_code: sessionCode
    }
  });
}

async function create(data) {
  return GameSession.create(data);
}

async function update(sessionCode, data) {
  const session = await findByCode(sessionCode);

  if (!session) {
    return null;
  }

  await session.update(data);
  return session;
}

module.exports = {
  findByCode,
  create,
  update
};