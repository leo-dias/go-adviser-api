'use strict';

const validator = require('./validators/is-positive-validator');

const Field = {
    type: Number, 
    validate: [validator.validate, 'Price can not be negative.'],
    default: 0
}

module.exports = Field;