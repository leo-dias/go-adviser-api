'use strict';

const Auth = require('../routes/auth-router');
const AdviserRoute = require('../routes/adviser-router');
const ProfileRoute = require('../routes/profile-router');
const SkillRoute = require('../routes/skill-router');

const routes = {
    Auth,
    AdviserRoute,
    ProfileRoute,
    SkillRoute
}

module.exports = routes;