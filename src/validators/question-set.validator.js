function validateCreate(data) {
  const errors = [];

  if (!data.owner_user_id) {
    errors.push('owner_user_id is required');
  }

  if (!data.title || data.title.trim() === '') {
    errors.push('title is required');
  }

  if (data.title && data.title.length > 150) {
    errors.push('title must not exceed 150 characters');
  }

  return errors;
}

function validateUpdate(data) {
  const errors = [];

  if (data.title !== undefined) {
    if (typeof data.title !== 'string' || data.title.trim() === '') {
      errors.push('title must not be empty');
    }

    if (data.title.length > 150) {
      errors.push('title must not exceed 150 characters');
    }
  }

  return errors;
}

module.exports = {
  validateCreate,
  validateUpdate
};