const express = require("express");

const router = express.Router();

// Import controller
const apiController = require('../controllers/api-controller');

//Set CORS headers to allow API requests from other domains
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// GET /api/menu
router.get("/menu", apiController.getMenuData, apiController.sendResponse);
router.get("/menu/:category", apiController.getMenuDataByCategory, apiController.sendResponse);
router.get("/menu/items/:item", apiController.getMenuItemData, apiController.sendResponse);

// Handle any errors that occur
router.use(apiController.errorHandler);

module.exports = router;
