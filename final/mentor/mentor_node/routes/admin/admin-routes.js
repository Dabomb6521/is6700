const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth-controller');
const adminContactsController = require('../../controllers/admin/admin-contacts-controller');
const adminCourseController = require('../../controllers/admin/admin-course-controller');

// Protected Routes
router.use(authController.verifyAuth);
router.use(authController.verifyAdmin);

// Contact
// GET requests
router.get('/contacts', adminContactsController.getContacts);
router.get('/contacts/respond', adminContactsController.getContactsWithNoResponse, adminContactsController.renderContactRespond);

// POST requests
router.post('/contacts/respond', adminContactsController.loadContact, adminContactsController.getContactsWithNoResponse, adminContactsController.renderContactRespond);
router.post('/contacts/respond/submit', adminContactsController.postContactResponse);

// Courses
// GET requests
router.get('/courses/create', adminCourseController.getCreateCourse);
router.get('/courses/edit/:courseId', adminCourseController.getEditCourse);

// POST requests
router.post('/courses/create', adminCourseController.postCreateCourse);
router.post('/courses/edit/:courseId', adminCourseController.postEditCourse);
router.post('/courses/delete/:courseId', adminCourseController.postDeleteCourse);


module.exports = router;