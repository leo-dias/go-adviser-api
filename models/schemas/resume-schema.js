'use strict';

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    education: { type: String, required: true },
    professional_experience: { type: String, required: true },
    adicional_informations: { type: String, required: false },
    skills: require('./fields/field-skills')
});

module.exports = resumeSchema;