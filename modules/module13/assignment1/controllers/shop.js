const Product = require("../models/product");
const Order = require("../models/order");

// Import data import file for Extra query practice
const bulkProductsData = require('../data/bulk-add-products.json');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      console.log(user.cart.items);
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

// Extra query practice requirements

exports.queryPractice = (req, res, next) => {
  res.render('shop/query-practice', {
    path: '/query-practice',
    pageTitle: 'Extra Practice'
  });
};

exports.getBulkAdd = (req, res, next) => {
  Product.create(bulkProductsData)
  .then(result => {
    console.log('Created Product');
    res.redirect('/products');
  })
  .catch(err => {
    console.log(err);
  });
};
exports.getStartWithC = (req, res, next) => {
  Product.find({
    title: {
      $regex: /^C/, $options: 'i'
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
  Product.find({
    price: { $gte: 100, $lte: 200 }
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
  Product.find({
    description: { $regex: /your/, $options: 'i' }
  })
  .then(products => {
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'Contains "your"',
      prods: products
    })
  })
  .catch(err => console.log(err));
};
exports.getBlenderPriceIncrease = (req, res, next) => {
  Product.findOne({
    title: { $regex: /blender/i }
  })
  .then(product => {
    product.price = (product.price += 10).toFixed(2);
    return product.save()
  })
  .then(result => {
    console.log("Blender Price increased");
    res.redirect('/products')
  })
  .catch(err => console.log(err));
};
exports.getDeleteAllProducts = (req, res, next) => {
  Product.deleteMany({})
  .then(result => {
      console.log('Destroyed Product');
      res.redirect('/products');
    })
    .catch(err => {
      console.log(err);
    });
};
