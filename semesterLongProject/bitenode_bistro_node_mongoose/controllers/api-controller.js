const MenuCategory = require("../models/menu-category-model-mongoose");
const MenuItem = require("../models/menu-item-model-mongoose");

exports.getMenuData = async (req, res, next) => {

  try {
    const categories = await MenuCategory.find()
      .populate("items")
      .lean();

      const sanitized = categories.map((cat)=>({
        name: cat.name,
        slug: cat.slug,
        items: cat.items.map((item)=> ({
          name: item.name,
          slug: item.slug,
          description: item.description,
          price: item.price,
          image: '/img/menu/' + item.image
        }))
      }));

    res.locals.data = sanitized;

    next();
  } catch (err) {
    console.error(err);
    // Invoke error-handling middleware
    const customError = new Error(
      "Unable to retrieve menu data.  Please try again later."
    );
    next(customError);
  }
};

exports.getMenuDataByCategory = async (req, res, next) => {
  try {

    const category = await MenuCategory.findOne({ slug: req.params.category })
      .populate("items")
      .lean();

    if (!category) throw new Error("Category not found.")

      const data = {
        name: category.name,
        slug: category.slug,
        items: category.item.map((item)=> ({
          name: item.name,
          slug: item.slug,
          description: item.description,
          price: item.price,
          image: '/img/menu/' + item.image
        })),
      };

    res.locals.data = data;
    return next();
  } catch (error) {
    console.log(error);
    // Invoke error-handling middleware
    const customError = new Error(
      "Unable to retrieve menu category data.  Please try again later."
    );
    next(customError);
  }
};

exports.getMenuItemData = async (req, res, next) => {
  try {
    const { itemSlug } = req.params;

    let item = await MenuItem.findOne({ slug: itemSlug }).populate("category");

    const sanitized = {
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        image: '/img/menu/' + item.image
        }

    res.locals.data = sanitized;
    next();
  } catch (error) {
    console.log(error);
    // Invoke error-handling middleware
    const customError = new Error(
      "Unable to retrieve menu item.  Please try again later."
    );
    next(customError);
  }
};

exports.sendResponse = async (req, res, next) => {
  res.status(201).json({
    message: "Success!",
    data: res.locals.data,
  });
};
