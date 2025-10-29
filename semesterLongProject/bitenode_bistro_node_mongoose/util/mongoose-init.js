const mongoose = require("mongoose");

// Import models (change path as needed)
const MenuCategory = require("../models/menu-category-model-mongoose");
const MenuItem = require("../models/menu-item-model-mongoose");

// Import data (change path as needed)
const CategoryData = require("./menu-categories-mongoose.json");
const MenuItemData = require("./menu-items-mongoose.json");


//  Define variables for holding menuitems and categories arrays
let menuItems, categories;

mongoose
  .connect(
    "mongodb+srv://dbo:aggies@cluster0.0ebdpxo.mongodb.net/bitenode-bistro-mongoose?retryWrites=true&w=majority&appName=Cluster0" //Put your connection string here
  )
  .then(() => {
    // Bulk create all menu item data
    return MenuItem.create(MenuItemData);
  })
  .then((result) => {
    // Log menu item data
    console.log("Inserted menu item data: ", result);
    // Save data in variable for later use
    menuItems = result;
    // Bulk create all category data
    return MenuCategory.create(CategoryData);
  })
  .then((result) => {
    // Log category data
    console.log("Inserted category data: ", result);
      // Save data in variable for later use
    categories = result;
  })
  .then(() => {
    // Iterate through categories and menu items to add item IDs to their respective category (eight items per category)
    // and category IDs to their respective items
    let itemCounter = 0;
    let categoryCounter = 1;
    let itemsPerCategory = 8;

    for (let cat of categories) {

      // Add the correct number of items to each category
      while (itemCounter < categoryCounter * itemsPerCategory) {

        // Add category ID to current menu item
        menuItems[itemCounter].category = cat._id;

        //Save updated menu item to database using mongoose model save() method
        menuItems[itemCounter].save();

        // Add menu item ID to items property of category
        cat.items.push(menuItems[itemCounter]._id);

        itemCounter++;
      }
      // Save updated category to database using mongoose model save() method
      cat.save();
      categoryCounter++;
    }
  })
  .catch((err) => {
    console.log(err);
  });
