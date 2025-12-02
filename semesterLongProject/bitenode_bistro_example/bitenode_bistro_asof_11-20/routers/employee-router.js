const express = require('express');

const router = express.Router();

// Import employee controller
const employeeController = require('../controllers/employee-controller');

// Register routes
router.get("/", employeeController.getTeam);

// export the router
module.exports = router;