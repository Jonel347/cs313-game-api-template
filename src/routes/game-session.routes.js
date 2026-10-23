const express = require('express');
const controller = require('../controllers/game-session.controller');
const playerController = require('../controllers/player.controller');

const router = express.Router();

router.post('/', controller.create);
router.get('/:code', controller.getByCode);
router.patch('/:code', controller.update);

router.post('/:code/players', playerController.joinSession);
router.get('/:code/players', playerController.getPlayers);

module.exports = router;