const express = require('express');

const router = express.Router();

// Import employee controller
const employeeController = require('../controllers/employee-controller');

router.get('/', employeeController.getTeam);

// export the router
module.exports = router;