'use strict';

const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');

//Routes
Profile.methods(['get', 'put', 'post', 'delete']);
Profile.register(router, '/profiles');

module.exports = router;
