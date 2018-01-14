'use strict';

const callback = require('./callback-controller');
const adviserRepository = require('../repositoires/adviser-repository');
const ObjectId = require('mongodb').ObjectID;

const controller = {
    filter: (req, res) => {
        adviserRepository
            .filter(req.query)
            .then((err, result) => callback(err, res, result));
    }
    ,
    findByPriceVideo: (req, res) => {
<<<<<<< HEAD
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
=======
        if (req.query.init === undefined || req.query.end === undefined) {
            res.status(400).send({ message: 'The parameters [init] and [end] are required.' });
            return;
        }
>>>>>>> dev

        adviserRepository
            .findByPriceVideo(req.query.init, req.query.end)
            .then((err, result) => callback(err, res, result));
    }
    ,
    findBySkills: (req, res) => {
        if (!req.headers.skills) {
<<<<<<< HEAD
            res.status(400).send({message: 'No variable skills was found in header request.'});
            return;
        }

        let skillsParam = JSON.parse('[' + req.headers.skills + ']');
=======
            res.status(400).send({ message: 'No variable skills was found in header request.' });
            return;
        }

        let skillsParam = JSON.parse("[" + req.headers.skills + "]");
>>>>>>> dev
        let skills = [];
        for (let i = 0; i < skillsParam.length; i++) {
            skills.push(new ObjectId(skillsParam[i]));
        }

<<<<<<< HEAD
        Adviser.find({ 'resume.skills': { '$in': skills } }, fields, (err, result) => callback(err, res, result))
        .populate('resume.skills');
=======
        adviserRepository
            .findBySkills(skills)
            .then((err, result) => callback(err, res, result));
>>>>>>> dev
    }
};

module.exports = controller;