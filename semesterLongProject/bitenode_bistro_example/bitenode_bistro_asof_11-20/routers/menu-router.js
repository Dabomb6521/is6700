const express = require('express');

const router = express.Router();

// Import menu controller
const menuController = require('../controllers/menu-controller');


router.get(["/","/:catSlug"], menuController.getMenu);

router.get('/:catSlug/:itemSlug', menuController.getMenuItem);

// export the router
module.exports = router;