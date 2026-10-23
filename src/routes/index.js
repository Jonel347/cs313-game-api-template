// The single place that maps URLs to route files.
const { Router } = require('express');

const router = Router();

// Hub Contract endpoints
router.use('/health', require('./health.routes'));
router.use('/game-info', require('./game-info.routes'));
router.use('/results', require('./results.routes'));

// Question Sets
router.use('/question-sets', require('./question-set.routes'));

//Game Sessions
router.use('/sessions', require('./game-session.routes'));

//Answers
router.use('/answers', require('./game-answer.routes'));

module.exports = router;
