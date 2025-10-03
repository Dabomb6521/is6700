// Import DataTypes object from sequelize package
const {DataTypes} = require('sequelize');

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
        allowNull: false
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
    }
}, {
     // Custom options
    tableName: 'menu_items'
});

// Export the model for use elsewhere
module.exports = MenuItem;