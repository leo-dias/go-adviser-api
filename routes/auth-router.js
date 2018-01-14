'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../models/auth');
const authController = require('../controllers/auth-controller');
const authService = require('../services/auth-service');

router.post('/auth', authController.authenticate);
router.post('/refresh-token', authService.authorize, authController.refreshToken);

module.exports = router;