const express = require('express');
const courseController = require('../controllers/course-controller');
const router = express.Router();

// GET requests
router.get('/', courseController.getAllCourses);

router.get('/:titleSlug', courseController.getCourseDesc);

module.exports = router;