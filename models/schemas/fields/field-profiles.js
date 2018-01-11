'use strict';

const mongoose = require('mongoose');

const Field = [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
}]

module.exports = Field;