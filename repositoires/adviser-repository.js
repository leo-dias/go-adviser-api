'use strict';

const Adviser = require('../models/adviser');
const passwordHash = require('password-hash');
const fields = 'is_online name email price_consulting_video price_consulting_voice price_consulting_text resume';

const Repository = {
    login: async (email, password) => {
        const query = { email }
        const adviser = await Adviser.findOne(query, (err, result) => {
            return result;
        });

        const passwordVerified = passwordHash.verify(password, adviser.password);
        if (!passwordVerified) return null;

        return adviser;
    },
    findById: async (_id) => {
        const query = { _id }
        const adviser = await Adviser.findOne(query, (err, result) => {
            return result;
        });
        return adviser;
    }
    ,
    filter: (query) => {
        if (query.name) query.name = new RegExp(query.name, 'i');

        if (query.email) query.email = new RegExp(query.email, 'i');

        return Adviser.find(query, fields).populate('resume.skills');
    }
    ,
    findByPriceVideo: (price_init, price_end) => {
        const query = {
            price_consulting_video: { $gte: price_init, $lte: price_end }
        };

        return Adviser.find(query, fields).populate('resume.skills');
    }
    ,
    findBySkills: (skills) => {
        return Adviser.find({ "resume.skills": { "$in": skills } }, fields).populate('resume.skills');
    }
};

module.exports = Repository;