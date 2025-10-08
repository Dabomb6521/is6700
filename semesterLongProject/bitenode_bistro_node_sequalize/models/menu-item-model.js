// Import DataTypes object from sequelize package
const {DataTypes} = require('sequelize');

// Import slugify
const slugify = require('slugify');

// Import configured sequelize instance
const sequelize = require('../util/database');

// Define a model for a Menu Item
const MenuItem = sequelize.define('menuItem', {
    // Define attributes of a menu item
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
     // Custom options
    tableName: 'menu_items'
});

// Export the model for use elsewhere
module.exports = MenuItem;