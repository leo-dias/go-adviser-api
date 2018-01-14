'use strict';

const mongoose = require('mongoose');

const name = require('./fields/field-name');
const email = require('./fields/field-email');

const authSchema = new mongoose.Schema({
    name,
    email
});

module.exports = authSchema;