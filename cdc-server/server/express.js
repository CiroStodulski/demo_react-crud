'use distinct'

const express = require('express')
    , consign = require('consign')
    , bodyParser = require('body-parser')
    , app = express()
    , expressValidator = require('express-validator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

consign()
    .include('config')
    .then('app/services')
    .then('app')
    .into(app);

module.exports = app;