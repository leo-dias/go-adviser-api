'use strict';

const restful = require('node-restful');
const mongoose = restful.mongoose;
const authSchema = require('./schemas/auth-schema');

module.exports = restful.model('Auth', authSchema);
