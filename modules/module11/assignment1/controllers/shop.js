const Product = require('../models/product');
const Cart = require('../models/cart');

// Import data import file for Extra query practice
const bulkProductsData = require('../data/bulk-add-products.json');
const { Op } = require('sequelize');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({where: {id: prodId}})
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

// Extra query practice requirements

exports.queryPractice = (req, res, next) => {
  res.render('shop/query-practice', {
    path: '/query-practice',
    pageTitle: 'Extra Practice'
  });
};

exports.getBulkAdd = (req, res, next) => {
  Product.bulkCreate(bulkProductsData)
  .then(result => {
    console.log('Created Product');
    res.redirect('/products');
  })
  .catch(err => {
    console.log(err);
  });
};
exports.getStartWithC = (req, res, next) => {
  Product.findAll({
    where: {
      title: {
        [Op.startsWith]: 'C'
      }
    }
  })
  .then(products => {
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'Starts With C',
      prods: products
    })
  })
  .catch(err => console.log(err));
};
exports.getProductBetween = (req, res, next) => {
  Product.findAll({
    where: {
      price: {
        [Op.between]: [100, 200]
      }
    }
  })
  .then(products => {
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'Price Between $100 and $200',
      prods: products
    })
  })
  .catch(err => console.log(err));
};
exports.getContainsYour = (req, res, next) => {
  Product.findAll({
    where: {
      description: {
        [Op.substring]: 'your'
      }
    }
  })
  .then(products => {
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'Price Between $100 and $200',
      prods: products
    })
  })
  .catch(err => console.log(err));
};
exports.getBlenderPriceIncrease = (req, res, next) => {
  Product.findOne({
    where: {
      title: 'Blender'
    }
  })
  .then(product => {
    product.price += 10;
    return product.save()
  })
  .then(result => {
    console.log("Blender Price increased");
    res.redirect('/products')
  })
  .catch(err => console.log(err));
};
exports.getDeleteAllProducts = (req, res, next) => {
  Product.destroy({
    truncate: true
  })
  .then(result => {
      console.log('Destroyed Product');
      res.redirect('/products');
    })
    .catch(err => {
      console.log(err);
    });
};
