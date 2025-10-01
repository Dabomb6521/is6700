// Handler functions that pertainer to the menu

const menuModel = require('../models/menu-model.js');

exports.getMenu = (req, res, next) => {

    const {selectedCategory} = req.params;

    let categories, items;
    // Retrieve the menu category data
    menuModel.fetchAllCategories()
    .then(([catData]) => {
        
        categories = catData

        if (selectedCategory && !categories.find((cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase())){
            return next ();
        }
        // Retrieve the menu item data
        return menuModel.fetchAllMenuItems();
    })
    .then((results) => {
        if (result) {
            items = results[0]
            // Render the view
            res.render('menu', {title: "Menu", categories, items, selectedCategory: selectedCategory || "breakfast"});
        }
        
    })
    .catch((err) => {
        console.error(err);
    })
}