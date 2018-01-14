'use strict';

const express = require('express');
const router = express.Router();
const Adviser = require('../models/adviser');
const adviserController = require('../controllers/adviser-controller');
const authService = require('../services/auth-service');

const root = '/advisers';

//Routes
Adviser.methods(['get', 'put', 'post', 'delete']);

router.get(`${root}/filter`, authService.authorize, adviserController.filter);
router.get(`${root}/price-video`, authService.authorize, adviserController.findByPriceVideo);
router.get(`${root}/skills`, authService.authorize, adviserController.findBySkills);

Adviser.register(router, root);

// Return router
module.exports = router;