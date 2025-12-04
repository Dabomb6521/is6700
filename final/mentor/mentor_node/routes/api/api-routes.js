const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/api/api-controller');

router.get('/token', apiController.getToken);

// Protected Routes
router.use(apiController.verifyToken);

router.get('/courses', apiController.getCourses, apiController.renderJson);

module.exports = router;