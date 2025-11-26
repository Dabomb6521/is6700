const express = require('express');
const eventController = require('../controllers/event-controller');
const router = express.Router();

// GET requests
router.get('/', eventController.getAllEvents);

module.exports = router;