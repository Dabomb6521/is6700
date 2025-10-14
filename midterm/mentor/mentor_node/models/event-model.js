const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Event = sequelize.define(
    "event",
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
        summary: {
            type: DataTypes.STRING(350),
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
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }
);

module.exports = Event