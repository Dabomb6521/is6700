// All data access code dealing with the menu

// Import the database connection
const db = require('../util/database');

// create a Javascript class that represents the menu model (this is not strictly necessary), could use standalone functions.
module.exports = class Menu {
    // Function to retrieve all category data
    static fetchAllCategories() {
        // Return a promise that will eventually either resolve to the data or be rejected if error
        return db.execute(`SELECT * 
                        FROM menu_categories;`);
    };
    // Function to retrieve all menu data
    static fetchAllMenuItems() {
        // Return a promise that will eventually either resolve to the data or be rejected if error
        return db.execute(`SELECT * 
                        FROM menu_items;`);
    };
};