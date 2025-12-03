const express = require('express');
const courseController = require('../controllers/course-controller');
const authController = require('../controllers/auth-controller');
const router = express.Router();

// GET requests
router.get('/', courseController.getAllCourses);



router.post('/register', authController.verifyAuth, courseController.postRegistration);
router.get('/register/:courseId', authController.verifyAuth, courseController.getRegistration);
router.post('/unregister/:courseId', authController.verifyAuth, courseController.postUnregister);

router.get('/:titleSlug', courseController.getCourseDesc);

module.exports = router;