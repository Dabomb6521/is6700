const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Course = sequelize.define(
    "course",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isImageFile(value) {
                    if (!value.endsWith('.jpg') && !value.endsWith('.png')) {
                        throw new Error('Enter Image with .jpg or .png extension');
                    }
                }
            }
        },
        summary: {
            type: DataTypes.STRING(350),
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
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        registrants: {
            type: DataTypes.INTEGER,
            default: 0
        },
        likes: {
            type: DataTypes.INTEGER,
            default: 0
        },
        trainer: {
            type: DataTypes.INTEGER,

        },
        titleSlug: {
            type: STRING,
            allowNull: false
        }
    }
);

module.exports = Course