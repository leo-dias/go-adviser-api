'use strict';

const validator = {
    validate: (v) => /^((0?[1-9]|1[0-2])\/)?(19\d{2}|20[0-9][0-9])$/.test(v),
    message: 'Date {VALUE} is invalid'
};

module.exports = validator;
