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

router.get('/query-practice', shopController.queryPractice);

// Extra Practice
router.get('/query-practice/bulk-add', shopController.getBulkAdd)
router.get('/query-practice/start-with-c', shopController.getStartWithC)
router.get('/query-practice/product-between', shopController.getProductBetween)
router.get('/query-practice/contains-your', shopController.getContainsYour)
router.get('/query-practice/blender-price-increase', shopController.getBlenderPriceIncrease)
router.get('/query-practice/delete-all-products', shopController.getDeleteAllProducts)

module.exports = router;
