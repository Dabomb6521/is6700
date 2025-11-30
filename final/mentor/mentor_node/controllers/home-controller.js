const Course = require("../models/course-model");
const Event = require("../models/event-model");
const Trainer = require("../models/trainer-model");
const Testimonial = require("../models/testimonial-model");

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
