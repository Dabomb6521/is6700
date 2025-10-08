// Handler functions that pertainer to the menu

// const menuModel = require('../models/menu-model.js');
const MenuCategory = require("../models/menu-category-model");
const MenuItem = require("../models/menu-item-model");
const Menu = require("../models/menu-model");

exports.getMenu = (req, res, next) => {
  const { catSlug } = req.params;

  let categories, items;
  // Retrieve the menu category data
  MenuCategory.findAll()
    .then((catData) => {
      categories = catData;

      if (
        catSlug &&
        !categories.find(
          (cat) => cat.slug === catSlug
        )
      ) {
        return next();
      }
      // Retrieve the menu item data
      return MenuItem.findAll();
    })
    .then((results) => {
      if (results) {
        items = results;
        console.log("Items are: ", items);
        // Render the view
        res.render("menu", {
          title: "Menu",
          categories,
          items,
          catSlug: catSlug || "breakfast",
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.getMenuItem = (req, res, next) => {
  const { itemSlug, catSlug } = req.params;  
  MenuItem.findOne({
    where: {
      slug: itemSlug,
    },
    include: {
      model: MenuCategory
    }
  })
    .then((item) => {
      if (!item) {
        return next();
      } else {
        console.log("Retrieved item is: ", item)
        res.render("menu-item", { title: "Menu Item", item });
      }
    })
    .catch((err) => console.log(err));
};
