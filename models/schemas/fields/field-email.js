'use strict';

const _set = (v) => v.toLowerCase();
const validator = require('./validators/email-validator');

const Field = {
    type: String, 
    set: _set,
    validate: [validator.validate, validator.message],
    required: true,
    index: true,
    unique: true
}

module.exports = Field;