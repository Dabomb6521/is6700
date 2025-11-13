const express = require('express');

const router = express.Router();

// Import Controller
const contactController = require('../controllers/contact-controller');
const authController = require('../controllers/auth-controller');

router.get("/", contactController.getContact);

router.post("/", contactController.postContact);

router.get("/respond", authController.verifyAdmin, contactController.getContactsWith)
router.post("/load", )

// export router
module.exports = router