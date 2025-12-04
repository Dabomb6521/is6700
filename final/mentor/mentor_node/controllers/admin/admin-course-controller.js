const { nextTick } = require("process");
const Course = require("../../models/course-model-mongoose");
const Trainer = require("../../models/trainer-model-mongoose");
const User = require("../../models/user-model-mongoose");
const path = require("path");

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

exports.getCreateCourse = async (req, res, next) => {
  try {
    const trainers = await Trainer.find().select("_id name");

    res.render("admin/create-course", {
      title: "Create Course",
      trainers: trainers,
    });
  } catch (error) {
    console.error(error);
    const customError = new Error('Unable to load course creation form. Try again later');
    next(customError);
  }
};

exports.getEditCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    const trainers = await Trainer.find().select('_id name');

    if (!course) {
      req.flash('error', 'Course not found');
      return res.redirect('/courses');
    }
    res.render('admin/edit-course', {
      title: 'Edit Course',
      course: course,
      trainers: trainers
    });
  } catch (error) {
    console.error(error);
    const customError = new Error('Unable to load course for editing. Try again later');
    next(customError);
  }
};

exports.postCreateCourse = async (req, res) => {

  try {

    if(!req.files || !req.files.image) {
      req.flash('error', 'Upload a course image');
      return res.redirect('/admin/courses/create');
    }

    const imageName = await handleFileUpload(req.files.image);

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
    const customError = new Error('Unable to create course. Try again later');
  }
};
exports.postEditCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      req.flash('error', 'Course not found');
      return res.redirect('/courses');
    }

    Object.assign(course, {
      title: req.body.title,
      summary: req.body.summary,
      description: req.body.description,
      price: parseFloat(req.body.price),
      capacity: parseInt(req.body.capacity),
      trainer: req.body.trainer
    });

    if (req.files && req.files.image) {
      const imageName = await handleFileUpload(req.files.image);
      course.image = imageName;
    }
    await course.save();

    req.flash('success', `Course "${course.title}" updated successfully!`);
    res.redirect('/courses');
  } catch (error) {
    console.error(error);
  }
};

exports.postDeleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      req.flash('error', 'Course not found');
      return res.redirect('/courses');
    }

    await User.updateMany(
      { courses: req.params.courseId},
      {$pull: {courses: req.params.courseId}}
    );

    await Course.findByIdAndDelete(req.params.courseId);

    req.flash('success', 'Course deleted successfully');
    res.redirect('/courses');
  } catch (error) {
    console.error(error);
    const customError = new Error ('Unable to delete coures. Try again later');
    next(customError);
  }
};
