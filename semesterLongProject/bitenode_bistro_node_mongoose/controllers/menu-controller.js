// Handler functions that pertainer to the menu

const MenuCategory = require("../models/menu-category-model-mongoose");
const MenuItem = require("../models/menu-item-model-mongoose");

const Menu = require('../models/menu-model-mongo');


exports.getMenu = async (req, res, next) => {
  const { catSlug } = req.params;

  let categories;

  try {
    categories = await MenuCategory.find().populate('items').sort({_id: 1});

    console.log("Categories from Mongoose are : ", categories);

  if (
        catSlug &&
        !categories.find(
          (cat) => cat.slug === catSlug
        )
      ) 
        return next();
  res.render("menu", {
          title: "Menu",
          categories,
          catSlug: catSlug || "breakfast",
        });
  } catch (err) {
    console.error(err);
  }
};

// using .then and .catch
// exports.getMenu = (req, res, next) => {
//   const { catSlug } = req.params;

//   let categories, items;
//   // Retrieve the menu category data
//   MenuCategory.findAll()
//     .then((catData) => {
//       categories = catData;

//       if (
//         catSlug &&
//         !categories.find(
//           (cat) => cat.slug === catSlug
//         )
//       ) {
//         return next();
//       }
//       // Retrieve the menu item data
//       return MenuItem.findAll();
//     })
//     .then((results) => {
//       if (results) {
//         items = results;
//         console.log("Items are: ", items);
//         // Render the view
//         res.render("menu", {
//           title: "Menu",
//           categories,
//           items,
//           catSlug: catSlug || "breakfast",
//         });
//       }
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

exports.getMenuItem = async (req, res, next) => {
  const { itemSlug, catSlug } = req.params; 
  
  try {

    let item = await MenuItem.findOne({slug: itemSlug}).populate("category");
    if (!item) {
        return next();
      } else {
        console.log("Retrieved item is: ", item)

        res.render("menu-item", { title: "Menu Item", item });
      }
  } catch (error) {
    (err) => console.log(err)
  }
};

// exports.getMenuItem = (req, res, next) => {
//   const { itemSlug, catSlug } = req.params;  
//   MenuItem.findOne({
//     where: {
//       slug: itemSlug,
//     },
//     include: {
//       model: MenuCategory
//     }
//   })
//     .then((item) => {
//       if (!item) {
//         return next();
//       } else {
//         console.log("Retrieved item is: ", item)
//         res.render("menu-item", { title: "Menu Item", item });
//       }
//     })
//     .catch((err) => console.log(err));
// };
