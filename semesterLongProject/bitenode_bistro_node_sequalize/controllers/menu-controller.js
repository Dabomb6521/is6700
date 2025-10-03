// Handler functions that pertainer to the menu

// const menuModel = require('../models/menu-model.js');
const MenuCategory = require('../models/menu-category-model');
const MenuItem = require('../models/menu-item-model');

exports.getMenu = (req, res, next) => {

    const {selectedCategory} = req.params;

    let categories, items;
    // Retrieve the menu category data
    MenuCategory.findAll()
    .then((catData) => {
        
        categories = catData

        if (selectedCategory && !categories.find((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase())){
            return next ();
        }
        // Retrieve the menu item data
        return MenuItem.findAll();
    })
    .then((results) => {
        if (results) {
            items = results;
            console.log("Items are: ", items)
            // Render the view
            res.render('menu', {title: "Menu", categories, items, selectedCategory: selectedCategory || "breakfast"});
        }
        
    })
    .catch((err) => {
        console.error(err);
    })
}

exports.getMenuItem = (req, res, next) => {

}