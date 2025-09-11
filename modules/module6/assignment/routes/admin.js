const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];
const users = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/');
});

// /admin/add-user => GET
router.get('/add-user', (req, res, next) => {
  res.render('add-user', {
    pageTitle: 'Add User',
    path: '/admin/add-user',
    formsCSS: true,
    productCSS: true,
    activeAddUser: true
  });
});

// /admin/add-user => POST
router.post('/add-user', (req, res, next) => {
  users.push({User: req.body.name});
  res.redirect('/users');
});

exports.routes = router;
exports.products = products;
exports.users = users;