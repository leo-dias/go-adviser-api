'use strict';

const validator = require('./validators/mm-yyyy-validator');

const Field = {
    type: String,
    validate: [validator.validate, validator.message],
    required: true
}

module.exports = Field;