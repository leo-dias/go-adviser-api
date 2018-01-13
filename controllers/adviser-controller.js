'use strict';

const Adviser = require('../models/adviser');
const callback = require('./callback-controller');
const fields = 'is_online name email price_consulting_video price_consulting_voice price_consulting_text resume';
const ObjectId = require('mongodb').ObjectID;

const controller = {
    filter: (req, res) => {
        let query = req.query;

        if (query.name) query.name = new RegExp(req.query.name, 'i');

        if (query.email) query.email = new RegExp(req.query.email, 'i');

        Adviser.find(query, fields, (err, result) => callback(err, res, result)).populate('resume.skills');
    },

    findByPriceVideo: (req, res) => {
        const price_init = req.query.init;
        const price_end = req.query.end;

        if (price_init === undefined || price_end === undefined) {
            res.status(400).send({message: 'The parameters [init] and [end] are required.'});
            return;
        }

        Adviser.find({}, fields)        
            .where('price_consulting_video')
            .gte(price_init).lte(price_end)
            .populate('resume.skills')
            .exec((err, result) => callback(err, res, result));
    },

    findBySkills: (req, res) => {
        if (!req.headers.skills) {
            res.status(400).send({message: 'No variable skills was found in header request.'});
            return;
        }

        let skillsParam = JSON.parse('[' + req.headers.skills + ']');
        let skills = [];
        for (let i = 0; i < skillsParam.length; i++) {
            skills.push(new ObjectId(skillsParam[i]));
        }

        Adviser.find({ 'resume.skills': { '$in': skills } }, fields, (err, result) => callback(err, res, result))
        .populate('resume.skills');
    }
};

module.exports = controller;