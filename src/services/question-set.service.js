const repository = require('../repositories/question-set.repository');

async function getAllQuestionSets() {
  return repository.findAll();
}

async function getQuestionSetById(questionSetId) {
  return repository.findById(questionSetId);
}

async function createQuestionSet(data) {
  return repository.create(data);
}

async function updateQuestionSet(questionSetId, data) {
  return repository.update(questionSetId, data);
}

async function deleteQuestionSet(questionSetId) {
  return repository.remove(questionSetId);
}

module.exports = {
  getAllQuestionSets,
  getQuestionSetById,
  createQuestionSet,
  updateQuestionSet,
  deleteQuestionSet
};