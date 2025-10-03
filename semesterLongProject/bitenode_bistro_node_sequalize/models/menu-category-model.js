// Import DataTypes object from sequelize package
const {DataTypes} = require('sequelize');

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
        allowNull: false       
    },
    adjective: {
        type: DataTypes.STRING,
        allowNull: true
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    // Custom options
    tableName: 'menu_categories'
});

// Export the model for use elsewhere
module.exports = MenuCategory;