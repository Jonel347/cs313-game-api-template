const service = require('../services/question-set.service');
const {
  validateCreate,
  validateUpdate
} = require('../validators/question-set.validator');

async function getAll(req, res, next) {
  try {
    const questionSets = await service.getAllQuestionSets();

    res.status(200).json(questionSets);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const questionSetId = Number(req.params.id);

    if (!Number.isInteger(questionSetId)) {
      return res.status(400).json({
        error: 'Invalid question set ID'
      });
    }

    const questionSet = await service.getQuestionSetById(questionSetId);

    if (!questionSet) {
      return res.status(404).json({
        error: 'Question set not found'
      });
    }

    res.status(200).json(questionSet);
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const errors = validateCreate(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }

    const questionSet = await service.createQuestionSet(req.body);

    res.status(201).json(questionSet);
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const questionSetId = Number(req.params.id);

    if (!Number.isInteger(questionSetId)) {
      return res.status(400).json({
        error: 'Invalid question set ID'
      });
    }

    const errors = validateUpdate(req.body);

    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      });
    }

    const questionSet = await service.updateQuestionSet(
      questionSetId,
      req.body
    );

    if (!questionSet) {
      return res.status(404).json({
        error: 'Question set not found'
      });
    }

    res.status(200).json(questionSet);
  } catch (error) {
    next(error);
  }
}

async function remove(req, res, next) {
  try {
    const questionSetId = Number(req.params.id);

    if (!Number.isInteger(questionSetId)) {
      return res.status(400).json({
        error: 'Invalid question set ID'
      });
    }

    const questionSet = await service.deleteQuestionSet(questionSetId);

    if (!questionSet) {
      return res.status(404).json({
        error: 'Question set not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};