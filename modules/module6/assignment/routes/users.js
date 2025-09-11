const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/users', (req, res, next) => {
  const users = adminData.users;
  res.render('users', {
    users: users, 
    pageTitle: 'Users', 
    path: '/users', 
    activeUsers: true
  });
});

module.exports = router;