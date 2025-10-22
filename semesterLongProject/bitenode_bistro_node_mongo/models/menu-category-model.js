// Import DataTypes object from sequelize package
const {DataTypes} = require('sequelize');

// Import slugify
const slugify = require('slugify');

// Import configured sequelize instance
const sequelize = require('../util/database');

// Define a model for a Menu Category
const MenuCategory = sequelize.define('menuCategory', {
    // Define attributes of a category
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            // Set the passed value as the name (default behavior)
            this.setDataValue("name", value);

            // Set the slug field to the "slugified" version of the name
            this.setDataValue("slug", slugify(value, {lower: true, trim: true}));
        }
    },
    adjective: {
        type: DataTypes.STRING,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Custom options
    tableName: 'menu_categories'
});

// Export the model for use elsewhere
module.exports = MenuCategory;