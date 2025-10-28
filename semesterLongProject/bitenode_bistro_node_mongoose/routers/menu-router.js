const express = require('express');

const router = express.Router();

// Import Controller
const menuController = require('../controllers/menu-controller');

router.get(["/", "/:catSlug"], menuController.getMenu);

router.get('/:catSlug/:itemSlug', menuController.getMenuItem);

// export router
module.exports = router