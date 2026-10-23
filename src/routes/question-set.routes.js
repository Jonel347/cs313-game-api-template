const express = require('express');
const controller = require('../controllers/question-set.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.patch('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;