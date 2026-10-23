const service = require('../services/game-answer.service');

async function getAnswers(req, res, next) {
  try {
    const answers = await service.getAnswersByPlayerId(req.params.playerId);

    res.status(200).json(answers);
  } catch (error) {
    next(error);
  }
}

async function submitAnswer(req, res, next) {
  try {
    const {
      player_id,
      question_id,
      choice_id,
      is_correct,
      response_time_ms,
      stars_earned
    } = req.body;

    if (!player_id || !question_id || is_correct === undefined) {
      return res.status(400).json({
        error: 'player_id, question_id, and is_correct are required'
      });
    }

    const answer = await service.submitAnswer({
      player_id,
      question_id,
      choice_id: choice_id || null,
      is_correct,
      response_time_ms: response_time_ms || null,
      stars_earned: stars_earned || 0
    });

    res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAnswers,
  submitAnswer
};