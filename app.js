'user strict';

require('./config/mongo-db-config');

const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const routes = require('./routes/api');

const root = '/go-adviser-api';

// Express
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Routes Config
app.use(root, routes.AdviserRoute);
app.use(root, routes.ProfileRoute);
app.use(root, routes.SkillRoute);

app.use((req, res) => {
    res.status(404).send({ error: `Resource ${req.url} not found` });
});

const PORT = process.env.PORT || 3000;

// Start Server
app.listen(PORT);
console.log(`API is running on port ${PORT}`);