// Handler functions that pertain to the menu

// Import menu model
const MenuCategory = require("../models/menu-category-model-mongoose");
const MenuItem = require("../models/menu-item-model-mongoose");

// Hanlder function to retrieve all menu data - using async/await
exports.getMenu = async (req, res, next) => {
  // Get selected category (if any) from req.params
  const { catSlug } = req.params;
  //   const selectedCategory = req.params.selectedCategory;

  // Declare local variables to hold categories and items
  let categories;

  try {
    categories = await MenuCategory.find().populate('items').sort({ _id: 1 });

    console.log("Categories from Mongoose are: ", categories);

    // If selectedCategory exists but is not valid, send to next() to show 404
    if (catSlug && !categories.find((cat) => cat.slug === catSlug)) {
      return next();
    }

    res.render("menu", { title: "Menu", categories, catSlug: catSlug || "breakfast" });
  } catch (error) {
    console.log(error);
    // Invoke error-handling middleware
    const customError = new Error("Unable to retrieve menu data.  Please try again later.");
    next(customError);
  }
};

// Handler Function to get menu data for specific item - using async/await
exports.getMenuItem = async (req, res, next) => {
  const { itemSlug, catSlug } = req.params;

  try {

    let item = await MenuItem.findOne({ slug: itemSlug }).populate("category");

    // If no rows returned, redirect to 404
    if (!item) {
      return next();
    } else {
      console.log("Retrieved item is: ", item);

      // Get the specific item to be displayed
      // const item = category.items.find(item => item.slug === itemSlug);

      res.render("menu-item", { title: "Menu Item", item });
    }
  } catch (error) {
    console.log(error);
    // Invoke error-handling middleware
    const customError = new Error("Unable to retrieve menu item.  Please try again later.");
    next(customError);
  }
};

