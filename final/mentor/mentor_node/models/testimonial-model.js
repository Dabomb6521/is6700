const { DataTypes } = require("sequelize");

const sequelize = require("../util/database");

const Testimonial = sequelize.define("testimonial", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isImageFile(value) {
        if (!value.endsWith(".jpg") && !value.endsWith(".png")) {
          throw new Error("Enter Image with .jpg or .png extension");
        }
      },
    },
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  starRating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  testimonial: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Testimonial;
