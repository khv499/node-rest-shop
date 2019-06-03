// Importing express package
const express = require('express');

// Router-level middleware works in the same way as application-level middleware, 
// except it is bound to an instance of express.Router().
const router = express.Router();

// JWT Protection
const checkAuth = require('../middleware/check-auth')

// User Controller
const USerController = require('../controllers/user')

router.post('/signup', USerController.user_signup)

router.post("/login", USerController.user_login);

router.delete('/:userId', checkAuth, USerController.user_delete)

module.exports = router;