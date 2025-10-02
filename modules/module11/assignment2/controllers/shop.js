const Product = require('../models/product');

const {Op} = require('sequelize');
const bulkProducts = require('../data/bulk-add-products.json');

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
  // Product.findAll({ where: { id: prodId } })
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
  req.user
  .getCart()
  .then(cart => {
    return cart
    .getProducts()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err))
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
  .getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: prodId}});
  })
  .then(products => {
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (product){
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product
    }
    return Product.findByPk(prodId)
  })
  .then(product => {
    return fetchedCart.addProduct(product, { through: { quantity: newQuantity }})
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts({where:{id: prodId}});
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  .then(result => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
  .getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then(products => {
    return req.user
    .createOrder()
    .then(order => {
      return order.addProducts(products.map(product => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      }));
    })
    .catch(err => console.log(err));
  })
  .then(result => {
    fetchedCart.setProducts(null);
  })
  .then(result => {
    res.redirect('/orders');
  })
  .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
  })
  .catch(err => console.log(err1));
};

//Additional handler functions for last part of assignment

exports.getQueryPractice = (req, res, next) => {
  res.render('shop/query-practice', {
    pageTitle: 'Query Practice',
    path: '/querypractice'
  });
}

exports.bulkCreate = (req, res, next) => {
  Product.bulkCreate(bulkProducts)
  .then(result => {
    console.log(result);
    res.redirect('/products')
  })
  .catch(err => console.log(err));
}

exports.startsWithC = (req, res, next) => {
  Product.findAll({where: {
    title: {[Op.startsWith] : 'C'}    
  }})
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products starting with C',
      path: '/products'
    });
  })
  .catch(err => console.log('An error occurred!', err));
}

// Async/await version
// exports.startsWithC = async (req, res, next) => {
//   try {
//     let products = await Product.findAll({where: {
//       title: {[Op.startsWith] : 'C'}    
//     }});
    
//       res.render('shop/product-list', {
//         prods: products,
//         pageTitle: 'Products starting with C',
//         path: '/products'
//       });
//   } catch (err) {
//     console.log("An error occurred!", err)
//   } 
// }

exports.between100and200 = (req, res, next) => {
  Product.findAll({where: {
    price: {[Op.between] : [100, 200]}    
  }})
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products between $100 and $200',
      path: '/products'
    });
  })
  .catch(err => console.log('An error occurred!', err));
}

exports.containsYour = (req, res, next) => {
  Product.findAll({where: {
    description: {[Op.substring] : 'your'}    
  }})
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'Products containing \'your\'',
      path: '/products'
    });
  })
  .catch(err => console.log('An error occurred!', err));
}

exports.increaseBlenderPrice = (req, res, next) => {
  Product.findOne({where: {title: 'Blender'}}).then(product => {
    product.price += 10;
    return product.save();
      }).then((result) => {
    console.log(result);
    res.redirect('/products');
  }).catch(err => console.log(err));
}

exports.deleteAllProducts = (req, res, next) => {
  Product.destroy({
    truncate: true
  }).then(result => {
    console.log(result);
    res.redirect('/products');
  }).catch(err => console.log(err));
}
