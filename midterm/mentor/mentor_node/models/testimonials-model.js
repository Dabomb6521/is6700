const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Testimonials = sequelize.define(
    'testimonials',
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
    }
)