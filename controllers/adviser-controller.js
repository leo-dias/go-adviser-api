'use strict';

const Adviser = require('../models/adviser');

const controller = {
    filter: (req, res) => {
        let query = req.query;

        if (query.name) query.name = new RegExp(req.query.name, 'i');

        if (query.email) query.email = new RegExp(req.query.email, 'i');

        Adviser.find(query, (err, result) => {
            if (err) return res.status(400).send(err);
            
            if(result.length === 0) return res.status(404).send();

            return res.send(result);
        });
    }
}; 

module.exports = controller;