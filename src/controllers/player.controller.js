const service = require('../services/player.service');

async function getPlayers(req, res, next) {
  try {
    const session = await service.getSessionByCode(req.params.code);

    if (!session) {
      return res.status(404).json({
        error: 'Game session not found'
      });
    }

    const players = await service.getPlayers(session.session_id);

    res.status(200).json(players);
  } catch (error) {
    next(error);
  }
}

async function joinSession(req, res, next) {
  try {
    const session = await service.getSessionByCode(req.params.code);

    if (!session) {
      return res.status(404).json({
        error: 'Game session not found'
      });
    }

    const { user_id, nickname } = req.body;

    if (!user_id || !nickname) {
      return res.status(400).json({
        error: 'user_id and nickname are required'
      });
    }

    const result = await service.joinSession(
      session.session_id,
      user_id,
      nickname
    );

    if (result.error === 'ALREADY_JOINED') {
      return res.status(409).json({
        error: 'User has already joined this session'
      });
    }

    res.status(201).json(result.player);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPlayers,
  joinSession
};