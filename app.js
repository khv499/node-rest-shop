// Express application which will make handling requests

// For more reference on express middleware refer
// https://expressjs.com/en/guide/using-middleware.html

// Importing express package
const express = require('express');

// Executing the function stored in express variable
// And storing the result into app variable 
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
})

module.exports = app;

