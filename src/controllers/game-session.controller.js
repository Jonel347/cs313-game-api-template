const service = require('../services/game-session.service');

async function getByCode(req, res, next) {
  try {
    const session = await service.getSessionByCode(req.params.code);

    if (!session) {
      return res.status(404).json({
        error: 'Game session not found'
      });
    }

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const {
      session_code,
      host_user_id,
      question_set_id,
      time_limit_seconds
    } = req.body;

    if (!session_code || !host_user_id || !question_set_id) {
      return res.status(400).json({
        error: 'session_code, host_user_id, and question_set_id are required'
      });
    }

    if (session_code.length !== 6) {
      return res.status(400).json({
        error: 'session_code must be exactly 6 characters'
      });
    }

    const existingSession = await service.getSessionByCode(session_code);

    if (existingSession) {
      return res.status(409).json({
        error: 'Session code already exists'
      });
    }

    const session = await service.createSession({
      session_code,
      host_user_id,
      question_set_id,
      time_limit_seconds: time_limit_seconds || 0
    });

    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const session = await service.updateSession(
      req.params.code,
      req.body
    );

    if (!session) {
      return res.status(404).json({
        error: 'Game session not found'
      });
    }

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getByCode,
  create,
  update
};