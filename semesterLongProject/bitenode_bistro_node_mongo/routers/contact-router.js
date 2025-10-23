const express = require('express');

const router = express.Router();

// Import Controller
const contactController = require('../controllers/contact-controller');

router.get("/", contactController.getContact);

router.post("/", contactController.postContact);

// export router
module.exports = router