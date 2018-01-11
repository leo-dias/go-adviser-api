'use strict';

const restful = require('node-restful');
const adviserSchema = require('./schemas/adviser-shema');

module.exports = restful.model('Adviser', adviserSchema);