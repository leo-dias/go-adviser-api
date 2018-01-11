'use strict';

const mongoose = require('mongoose');

const name = require('./fields/field-name');
const email = require('./fields/field-email');
const password = require('./fields/field-password');
const is_online = require('./fields/field-is_online');
const photo = require('./fields/field-buffer');
const price_consulting_video = require('./fields/field-price-consulting');
const price_consulting_voice = require('./fields/field-price-consulting');
const price_consulting_text = require('./fields/field-price-consulting');
const resume = require('./resume-schema');
const financials = require('./financial-schema');
const created_at = require('./fields/field-created_at');

const adviserSchema = new mongoose.Schema({
    name,
    email,
    password,
    is_online,
    photo,
    price_consulting_video,
    price_consulting_voice,
    price_consulting_text,
    resume,
    financials: [financials],
    created_at
});

module.exports = adviserSchema;