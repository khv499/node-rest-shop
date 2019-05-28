// Express application which will make handling requests

// For more reference on express middleware refer
// https://expressjs.com/en/guide/using-middleware.html

// Importing express package
const express = require('express');

// Executing the function stored in express variable
// And storing the result into app variable 
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;