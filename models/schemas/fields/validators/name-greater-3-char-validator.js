'use strict';

const validator = {
    validate: (v) => v.length > 3,
    message: 'Name must be greater than 3 characters'
}

module.exports = validator;