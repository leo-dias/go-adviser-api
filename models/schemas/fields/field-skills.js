'use strict';

const mongoose = require('mongoose');

const Field = [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Skill'
}]

module.exports = Field;