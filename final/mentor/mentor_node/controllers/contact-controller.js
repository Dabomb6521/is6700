const Contact = require('../models/contact-model-mongoose');

exports.getContact = (req, res) => {
    res.render('contact', {title: "Contact", message: ""});
};

exports.postContact = (req, res) => {
    console.log("Request body is: ", req.body);

    Contact.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
        postDate: new Date()
    })
    .then((response) => {
        console.log("Success!", response);
        res.render("thanks", {title: "Thank You"});
    })
    .catch((err) => {
        console.error("Full Error: ",err);
        res.render("contact", {title: "Contact", message: "Oops, something went wrong. Please try again later."})
    })
};