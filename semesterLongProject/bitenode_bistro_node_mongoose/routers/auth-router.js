const express = require('express');

const router = express.Router();

// Import Controller
const authController = require('../controllers/auth-controller');

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);

router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignup);

// export router
module.exports = router