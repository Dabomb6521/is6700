// Home for all the auth routes

const express = require('express');

const router = express.Router();

// Import controller
const authController = require('../controllers/auth-controller');

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/profile', authController.verifyAuth,authController.getProfile);
router.get('/logout', authController.logout);

router.post('/login', authController.authUser, authController.loginWebApp);
router.post('/signup', authController.postSignup);
router.post('/profile',authController.verifyAuth, authController.uploadProfilePic, authController.postProfile);

module.exports = router;