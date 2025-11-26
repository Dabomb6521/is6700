const express = require('express');
const homeController = require('../controllers/home-controller');
const router = express.Router();

router.get('/', homeController.getHome);
router.get('/about', homeController.getAbout);


module.exports = router;