const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth-controller');
const adminContactsController = require('../../controllers/admin/admin-contacts-controller');
const adminCourseController = require('../../controllers/admin/admin-course-controller');

// Protected Routes
router.use(authController.verifyAuth);
router.use(authController.verifyAdmin);

// GET requests
router.get('/contacts', adminContactsController.getContacts);
router.get('/create', adminCourseController.getCreateCourse);
router.get('/edit/:courseId', adminCourseController.getEditCourse);

// POST requests
router.post('/create', adminCourseController.postCreateCourse);
router.post('/edit/:courseId', adminCourseController.postEditCourse);
router.post('/delete/:courseId', adminCourseController.postDeleteCourse);


module.exports = router;