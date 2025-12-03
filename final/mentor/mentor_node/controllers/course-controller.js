const Course = require("../models/course-model-mongoose");
const Trainer = require("../models/trainer-model-mongoose");
const User = require("../models/user-model-mongoose");

exports.getAllCourses = (req, res, next) => {
  Course.find()
    .populate("trainer")
    .then((courses) => {
      res.render("courses", {
        title: "Courses",
        courses: courses,
      });
    })
    .catch((err) => {
      console.error(err);
      const customError = new Error("Unable to load courses, try again later");
      next(customError);
    });
};

exports.getCourseDesc = (req, res, next) => {
  const titleSlug = req.params.titleSlug;

  Course.findOne({ titleSlug: titleSlug })
    .populate("trainer")
    .then((course) => {
      if (!course) {
        return next();
      } else {
        res.render("course-details", { title: "Course Details", course });
      }
    })
    .catch((err) => {
      console.log(err);
      const customError = new Error("Unable to load course details, try again later")
      next(customError);
    });
};

exports.getRegistration = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const courses = await Course.find().select("_id title price");

    res.render("course-registration", {
      title: "Course Registration",
      courses: courses,
      selectedCourseId: courseId,
      user: req.session.user,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Error loading registration form");
    res.redirect("/courses");
  }
};

exports.postRegistration = async (req, res, next) => {
  const { courseId } = req.body;
  const userId = req.session.user._id;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return next();
    }
    if (course.registrants.length >= course.capacity) {
      req.flash("error", "Sorry, This course is full");
      return res.redirect("/courses");
    }
    if (course.registrants.includes(userId)) {
      req.flash("error", "You are already registered for this course");
      return res.redirect("/courses");
    }

    course.registrants.push(userId);
    await course.save();

    await User.findByIdAndUpdate(userId, {
      $push: { courses: courseId },
    });

    req.flash("success", `Successfully registered for ${course.title}`);
    res.redirect("/courses");
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred during registration");
    res.redirect("/courses");
  }
};

exports.postUnregister = async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.session.user._id;

  try {
    await Course.findByIdAndUpdate(courseId, {
      $pull: { registrants: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $pull: { courses: courseId },
    });

    req.flash("success", "Successfully unregistered from course");
    res.redirect("/courses");
  } catch (error) {
    console.error(error);
    req.flash("error", "An error occurred during unregistration");
    res.redirect("/courses");
  }
};
