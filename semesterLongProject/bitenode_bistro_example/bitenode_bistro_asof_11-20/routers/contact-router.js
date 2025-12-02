const express = require('express');

const router = express.Router();

// Import controllers
const contactController = require('../controllers/contact-controller');
const authController = require('../controllers/auth-controller');


router.get("/", contactController.getContact);

router.post("/", contactController.postContact);

// All handler functions after this will require admin verification
router.use(authController.verifyAdmin);

// Retrieve contact requests with no response and render the contact-respond view
router.get('/respond', contactController.getContactsWithNoResponse, contactController.renderContactRespond);

// Retrieve a selected contact request, retrieve contact requests with no response, and render the contact-respond view
router.post('/load', contactController.loadContact, contactController.getContactsWithNoResponse, contactController.renderContactRespond);

// Post a response to a contact request, retrieve contact requests with no response, and render the contact-respond view
router.post('/respond',  contactController.postContactResponse);

// export the router
module.exports = router;