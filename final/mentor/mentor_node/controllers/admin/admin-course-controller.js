const Course = require("../../models/course-model-mongoose");
const Trainer = require("../../models/trainer-model-mongoose");
const User = require("../../models/user-model-mongoose");
const path = require("path");
const fs = require("fs");
const { error } = require("console");

const handleFileUpload = async (imageFile) => {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = path.extname(imageFile.name).toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
    throw new Error("Only .jpg, .jpeg, and .png files are allowed");
  }
  const imageName = `course-${Date.now()}${fileExtension}`;
  const uploadPath = path.join(
    __dirname,
    "../../public/assets/img/",
    imageName
  );

  await imageFile.mv(uploadPath, (error) => {
    if (error) {
      console.error("File upload error: ", error);
      throw new Error("File upload failed");
    }
  });
  return imageName;
};

exports.getCreateCourse = async (req, res) => {
  try {
    const trainers = await Trainer.find().select("_id name");

    res.render("admin/create-course", {
      title: "Create Course",
      trainers: trainers,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Error loading create course form");
    res.redirect("/courses");
  }
};

exports.getEditCourse = async (req, res) => {};

exports.postCreateCourse = async (req, res) => {

  try {

    if(!req.files || !req.files.image) {
      req.flash('error', 'Upload a course image');
      return res.redirect('/admin/courses/create');
    }

    const imageName = await handlerFileUpload(req.files.image);

    const course = new Course({
      ...req.body,
      image: imageName,
      price: parseFloat(req.body.price),
      capacity: parseInt(req.body.capacity)
    });
    await course.save();

    req.flash('success', `Course "${course.title}" created successfully!`);
    res.redirect('/courses');
    
  } catch (error) {
    console.error(error);
    req.flash("error", "Error creating course");
    res.redirect("/admin/courses/create");
  }
};
exports.postEditCourse = async (req, res) => {};
exports.postDeleteCourse = async (req, res) => {};
