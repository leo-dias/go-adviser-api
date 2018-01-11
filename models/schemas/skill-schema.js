'use strict';

const mongoose = require('mongoose');

const name = require('./fields/field-name');

const profileSchema = new mongoose.Schema({
    name
});

module.exports = profileSchema;