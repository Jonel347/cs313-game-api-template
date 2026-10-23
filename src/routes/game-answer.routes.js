const express = require('express');
const controller = require('../controllers/game-answer.controller');

const router = express.Router();

router.post('/', controller.submitAnswer);
router.get('/player/:playerId', controller.getAnswers);

module.exports = router;