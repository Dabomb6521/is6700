// Home for all the contact routes

const express = require('express');

// Import controllers
const testimonialController = require('../controllers/testimonial-controller');
const authController = require('../controllers/auth-controller');

const router = express.Router();


router.get("/", testimonialController.getTestimonials);
router.get("/new", authController.verifyAuth, testimonialController.getTestimonialNew);
router.post("/new", authController.verifyAuth, testimonialController.postTestimonial);


module.exports = router;