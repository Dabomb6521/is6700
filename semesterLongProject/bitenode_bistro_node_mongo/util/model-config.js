const MenuCategory = require('../models/menu-category-model');
const MenuItem = require('../models/menu-item-model');

exports.configModels = () => {
    // Create a foreign key config object
    const catItemForKey = {
        foreignKey: 'cat_id'
    }

    MenuCategory.hasMany(MenuItem, catItemForKey);
    MenuItem.belongsTo(MenuCategory, catItemForKey);
}