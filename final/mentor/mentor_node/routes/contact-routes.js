const express = require('express');
const contactController = require('../controllers/contact-controller');
const router = express.Router();

// GET requests
router.get('/new', contactController.getContact);

router.post('/create', contactController.postContact);

module.exports = router;