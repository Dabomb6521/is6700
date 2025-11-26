const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Contact = sequelize.define(
    "contact",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Please enter a valid email address."
                }
            }
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        postDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        response: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        responseDate: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    }
);

module.exports = Contact;