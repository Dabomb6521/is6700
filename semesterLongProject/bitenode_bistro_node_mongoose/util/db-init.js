// Import my configured sequelize instance
const sequelize = require('./database');

// Import Model Config
const {configModels} = require('./model-config');

// Import models that should be synced
const Contact = require('../models/contact-model');
const MenuCategory = require('../models/menu-category-model');
const MenuItem = require('../models/menu-item-model');

// Import Model Data
const catData = require('./menu_categories.json');
const itemData = require('./menu_items.json');

// Define Model relationships
configModels()

// Sync all models to the database
sequelize.sync({force: true})
.then((result) => {
    console.log("Sucess!", result);
    // Bulk insert into the categories table
    return MenuCategory.bulkCreate(catData);
})
.then((catResult) => {
    console.log("Category insert Successfull!", catResult);
    // Bulk insert into the items table
    return MenuItem.bulkCreate(itemData);
})
.then((itemResult) => {
    console.log("Item data created successfully!", itemResult)
})
.catch((err) => {
    console.error(err);
})