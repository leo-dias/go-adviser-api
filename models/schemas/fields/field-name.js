'use strict';

const validator = require('./validators/name-greater-3-char-validator');

const Field = {
    type: String, 
    validate: [validator.validate, validator.message],
    required: true,
    index: true
}

module.exports = Field;