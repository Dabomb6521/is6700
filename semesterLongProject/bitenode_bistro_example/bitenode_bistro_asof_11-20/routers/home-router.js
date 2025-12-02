const express = require('express');

const router = express.Router();

// Import home controller
const homeController = require('../controllers/home-controller');

router.get("/", homeController.getHome);

router.get("/about", homeController.getAbout);

// export the router
module.exports = router;