const express = require("express");

const apiController = require("../controllers/api-controller");

const router = express.Router();

// Set CORS headers to allow API requrests from other domains

// GET /api/menu
router.get("/menu", apiController.getMenuData, apiController.sendResponse);
router.get("/menu/:category", apiController.getMenuDataByCategory, apiController.sendResponse);
router.get("/menu/items/:item", apiController.getMenuItemData, apiController.sendResponse);

module.exports = router;
