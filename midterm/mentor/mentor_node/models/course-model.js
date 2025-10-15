const { DataTypes } = require("sequelize");

const slugify = require("slugify");

const sequelize = require("../util/database");
const Trainer = require("./trainer-model");

const Course = sequelize.define(
  "course",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
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
    summary: {
      type: DataTypes.STRING(350),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registrants: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    trainer: {
      type: DataTypes.INTEGER,
      references: {
        model: "trainers",
        key: "id",
      },
    },
    titleSlug: {
      type: DataTypes.STRING
    },
  },
  {
    hooks: {
      beforeValidate: (course) => {
        if (course.title) {
          course.titleSlug = slugify(course.title, {
            lower: true,
            strict: true,
          });
        }
      },
    },
  }
);

Course.belongsTo(Trainer, {
  foreignKey: 'trainer',
  as: 'trainerInfo'
});

module.exports = Course;
