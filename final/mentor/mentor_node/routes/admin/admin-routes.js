const express = require('express');
const adminController = require('../../controllers/admin/admin-contacts-controller');
const router = express.Router();

// GET requests
router.get('/contacts', adminController.getContacts);

module.exports = router;