const express = require('express');

const router = express.Router();

// Import Controller
const authController = require('../controllers/auth-controller');

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post('/profile', authController.verifyAuth, authController.getProfile);

router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);
router.post('/profile', authController.verifyAuth, authController.postProfile);

// export router
module.exports = router