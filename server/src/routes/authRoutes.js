const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/api/v1/users/login', authController.login);
router.post('/api/v1/users/register', authController.register);

module.exports = router;