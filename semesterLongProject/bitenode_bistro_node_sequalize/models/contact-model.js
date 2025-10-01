// Model that represents contact requests from customers

// Import sequelize datatypes
const { DataTypes } = require('sequelize');

// Import my configured sequelize instance
const sequelize = require("../util/database");

// Create a new model for the Contact request
const Contact = sequelize.define(
  "contact",
  {
    // Fields
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    responseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    // Optional Parameters
    tableName: 'contacts'
  }
);

// Export the model
module.exports = Contact;
