const Contact = require('../models/contact-model-mongoose')

exports.getContact = (req, res) => {
    res.render('contact', {title: "Contact", message: ""});
};

exports.postContact = (req, res) => {
    // Retrieve the requrest body
    console.log("Request body is: ", req.body);

    // Import
    Contact.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })
    .then((response) => {
        console.log("Success!", response);
        res.render("contact", {title: "Contact", message: "Thanks! Your request has been submitted."})
    })
    .catch((err) => {
        console.error(err);
        res.render("contact", {title: "Contact", message: "Oops, something went wrong. Please try again later."})
    })
};