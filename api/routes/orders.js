// Importing express package
const express = require('express');

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// JWT Protection
const checkAuth = require('../middleware/check-auth')

// Get Order Controller
const OrdersController = require('../controllers/orders')

// Handle incoming GET requests to /orders
router.get('/', checkAuth, OrdersController.orders_get_all)

// Handle incoming POST requests to /orders
router.post('/', checkAuth, OrdersController.orders_create_order)

// Handle incoming GET requests to /orders/:orderId
router.get('/:orderId', checkAuth, OrdersController.orders_get_order)

// Handle incoming DELETE requests to /orders/:orderId
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order)

module.exports = router;