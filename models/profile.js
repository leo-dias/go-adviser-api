'use strict';

const restful = require('node-restful');
const mongoose = restful.mongoose;
const profileSchema = require('./schemas/profile-schema');

module.exports = restful.model('Profile', profileSchema);