'use strict';

const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

//Routes
Skill.methods(['get', 'put', 'post', 'delete']);
Skill.register(router, '/skills');

module.exports = router;
