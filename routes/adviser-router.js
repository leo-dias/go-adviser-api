'use strict';

const express = require('express');
const router = express.Router();
const Adviser = require('../models/adviser');
const adviserController = require('../controllers/adviser-controller');

const root = '/advisers';

//Routes
Adviser.methods(['get', 'put', 'post', 'delete']);
Adviser.register(router, root);

router.get(`${root}/filter`, (req, res) => adviserController.filter(req, res));

// Return router
module.exports = router;