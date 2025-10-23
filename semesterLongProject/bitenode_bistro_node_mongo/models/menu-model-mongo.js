// Get the configured mongo database

const { getDb } = require('../util/database-mongo');

// Create Menu Model (TMP)
module.exports = class Menu {
    
    // Static function for retrieving all menu data
    static fetchMenu() {

        // Get DB instance
        const db = getDb();

        // Query database to get all menu data
        return db.collection('menu').find().toArray(); // Use toarray to dump all data into an array
    }
    // Static function for retrieving a single menu category by item slug
    static fetchCategoryByItemSlug(itemSlug) {
        const db =getDb();
        return db.collection('menu').findOne({
            'items.slug': itemSlug
        });
    }
};