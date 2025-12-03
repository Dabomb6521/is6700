const Course = require("../models/course-model-mongoose");
const Event = require("../models/event-model-mongoose");
const Trainer = require("../models/trainer-model-mongoose");
const Testimonial = require("../models/testimonial-model-mongoose");

exports.getHome = async (req, res) => {
  try {
    const courses = await Course.find().limit(3).populate("trainer");

    const trainers = await Trainer.find({
      limit: 3,
    });

    res.render("index", {
      title: "Home",
      courseCount: await Course.countDocuments(),
      eventCount: await Event.countDocuments(),
      trainerCount: await Trainer.countDocuments(),
      courses: courses,
      trainers: trainers,
    });
  } catch (err) {
    console.error(err);
    const customError = new Error("Unable to site, Try again later");
    next(customError);
  }
};

exports.getAbout = async (req, res) => {
  try {
    res.render("about", {
      title: "About Us",
      courseCount: await Course.countDocuments(),
      eventCount: await Event.countDocuments(),
      trainerCount: await Trainer.countDocuments(),
      testimonials: await Testimonial.find(),
    });
  } catch (err) {
    console.error(err);
  }
};
