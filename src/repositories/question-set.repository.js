const { QuestionSet } = require('../models');

async function findAll() {
  return QuestionSet.findAll({
    order: [['question_set_id', 'ASC']]
  });
}

async function findById(questionSetId) {
  return QuestionSet.findByPk(questionSetId);
}

async function create(data) {
  return QuestionSet.create(data);
}

async function update(questionSetId, data) {
  const questionSet = await QuestionSet.findByPk(questionSetId);

  if (!questionSet) {
    return null;
  }

  await questionSet.update(data);
  return questionSet;
}

async function remove(questionSetId) {
  const questionSet = await QuestionSet.findByPk(questionSetId);

  if (!questionSet) {
    return null;
  }

  await questionSet.destroy();
  return questionSet;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};