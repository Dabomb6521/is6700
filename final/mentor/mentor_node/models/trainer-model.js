const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Trainer = sequelize.define(
    "trainer",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
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
        expertise: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type:DataTypes.TEXT,
            allowNull: false
        }
    }
);

module.exports = Trainer;