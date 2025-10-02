const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

// Extra routes added for final part of assignment

router.get('/querypractice', shopController.getQueryPractice);

router.get('/bulkcreate', shopController.bulkCreate);

router.get('/startswithc', shopController.startsWithC);

router.get("/between100and200", shopController.between100and200);

router.get("/containsyour", shopController.containsYour);

router.get("/increaseblenderprice", shopController.increaseBlenderPrice);

router.get('/deleteall', shopController.deleteAllProducts);

module.exports = router;
