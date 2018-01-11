'use strict';
// https://github.com/davidwood/node-password-hash

const passwordHash = require('password-hash');

module.exports = (v) => passwordHash.generate(v);