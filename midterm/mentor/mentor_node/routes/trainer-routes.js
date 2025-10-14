const express = require('express');
const trainerController = require('../controllers/trainer-controller');
const router = express.Router();

// GET requests
router.get('/', trainerController.getAllTrainers);

module.exports = router;