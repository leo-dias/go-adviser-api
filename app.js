'user strict';

require('./config/mongo-db-config');

const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const routes = require('./routes/api');

const root = '/go-adviser-api';

// Express
app.use(bodyparser.urlencoded({ extended: true }));

// Extend limit size of json 
app.use(bodyparser.json({
    limit: '5mb'
}));

// Routes Config
app.use(root, routes.Auth);
app.use(root, routes.AdviserRoute);
app.use(root, routes.ProfileRoute);
app.use(root, routes.SkillRoute);

app.use((req, res) => {
    res.status(404).send({ error: `Resource ${req.url} not found` });
});

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT);
console.log(`API is running on port ${PORT}`);