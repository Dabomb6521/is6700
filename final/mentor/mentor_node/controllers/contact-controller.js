const Contact = require("../models/contact-model-mongoose");

exports.getContact = (req, res) => {
  res.render("contact", { title: "Contact", message: "" });
};

exports.postContact = (req, res, next) => {
  console.log("Request body is: ", req.body);

  Contact.create({
    name: req.body.name,
    email: req.body.email,
    subjects: req.body.subject,
    message: req.body.message,
    postDate: new Date(),
  })
    .then((response) => {
      console.log("Success!", response);
      res.render("thanks", { title: "Thank You" });
    })
    .catch((err) => {
      console.error("Full Error: ", err);
      const customError = new Error('Unable to post response to contact request. Please Try again later');
      next(customError);
    });
};

