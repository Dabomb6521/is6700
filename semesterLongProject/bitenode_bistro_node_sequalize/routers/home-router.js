const express = require('express');

const router = express.Router();

// Import Controller
const homeController = require('../controllers/home-controller');

router.get("/", homeController.getHome);

router.get("/about", homeController.getAbout);

// export router
module.exports = router