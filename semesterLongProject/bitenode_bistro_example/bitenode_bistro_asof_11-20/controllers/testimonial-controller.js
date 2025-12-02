const Testimonial = require("../models/testimonial-model-mongoose");

// Retrieve all testimonials
exports.getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().populate("user");
    res.render("testimonials", {title: "Testimonials",  testimonials });
  } catch (error) {
    console.log(error);
    next(new Error("Error retrieving testimonials!"));
  }
};

// Render view to add new testimonial
exports.getTestimonialNew = (req, res, next) => {
  res.render("testimonial-new", {title: "New Testimonial"});
};

// Post a new testimonial
exports.postTestimonial = async (req, res, next) => {
  try {
    const response = await Testimonial.create({
      content: req.body.content,
      user: req.session.user._id,
    });
    // console.log("Success!", response);
    res.render("testimonial-new", { title: "Add Testimonial", message: "Thank you!  Your testimonial has been saved." });
  } catch (err) {
    console.log("Raw error is: ", err);

    if (err.name === "ValidationError") {
      console.log("Object.values of err.errors is: ", Object.values(err.errors));
      return res.render("testimonial-new", { title: "Add Testimonial", message: "Oops, something went wrong.  Please try again.", entries: req.body, errors: Object.values(err.errors) });
    }

    next(new Error("Testimonial could not be saved.  Please try again later."));
  }
};
