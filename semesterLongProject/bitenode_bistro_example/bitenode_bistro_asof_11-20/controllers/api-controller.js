const MenuCategory = require("../models/menu-category-model-mongoose");
const MenuItem = require("../models/menu-item-model-mongoose");
const jwt = require('jsonwebtoken');

// Retrieve API token
exports.getToken = (req, res, next) => {
  const { user, passwordsMatch } = res.locals;

  if (!user || !passwordsMatch) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    return next(error);
  }

  const token = jwt.sign(
    { email: user.email, userId: user._id.toString() },
    "somesupersecretsecret",
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Token Generated.",
    data: { token },
  });
};

// Verify API Token
exports.verifyToken = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, "somesupersecretsecret");

    if (!decodedToken) {
      const error = new Error("Token not valid.");
      error.statusCode = 401;
      throw error;
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    console.error(err);

    if (!err.statusCode) {
      err.statusCode = 500;
      err.message = err.message || "Server Error.";
    }

    next(err);
  }
};

// Retrieve all menu data
exports.getMenuData = async (req, res, next) => {
  try {
    const categories = await MenuCategory.find({}).populate("items").lean(); // Return a plain JavaScript object, not full mongoose model

    const sanitized = categories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      items: cat.items.map((item) => ({
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        image: "/img/menu/" + item.image,
      })),
    }));

    res.locals.data = sanitized;

    return next();
  } catch (err) {
    console.log('Error is: ', err);
    next(new Error("Failed to retrieve menu."));
  }
};

// Retrieve menu data by category slug
exports.getMenuDataByCategory = async (req, res, next) => {
  try {
    const category = await MenuCategory.findOne({ slug: req.params.category }).populate("items").lean();

    if (!category) throw new Error("Category not found.");

    const sanitized = {
      name: category.name,
      slug: category.slug,
      items: category.items.map((item) => ({
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        image: "/img/menu/" + item.image,
      })),
    };

    res.locals.data = sanitized;
    return next();
  } catch (err) {
    next(new Error(`Failed to retrieve category: ${err.message}`));
  }
};

// Retrieve item data by item slug
exports.getMenuItemData = async (req, res, next) => {
  try {
    const item = await MenuItem.findOne({ slug: req.params.item }).lean();

    if (!item) throw new Error("Menu item not found.");

    const sanitized = {
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      image: "/img/menu/" + item.image,
    };

    res.locals.data = sanitized;
    return next();
  } catch (err) {
    next(new Error(`Failed to retrieve menu item: ${err.message}`));
  }
};

// Send API JSON response
exports.sendResponse = (req, res) => {
  res.status(200).json({
    message: "Success!",
    data: res.locals.data,
  });
};

// Handle API Errors
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: `Error! ${err.message}`,
    data: null,
  });
};
