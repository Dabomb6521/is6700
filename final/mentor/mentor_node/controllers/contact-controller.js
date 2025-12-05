const Contact = require("../models/contact-model-mongoose");

exports.getContact = (req, res) => {
  res.render("contact", { title: "Contact", message: "" });
};

exports.postContact = (req, res, next) => {

  Contact.create({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    postDate: new Date(),
    response: null,
    responseDate: null,
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

