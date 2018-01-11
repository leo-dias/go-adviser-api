'use strict';

const validator = require('./validators/is-positive-validator');

const Field = {
    type: Number, 
    validate: [validator.validate, validator.message],
    default: 0
}

module.exports = Field;