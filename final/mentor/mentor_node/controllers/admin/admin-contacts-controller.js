const Contact = require("../../models/contact-model-mongoose");

exports.getContacts = async (req, res) => {
  try {
    res.render("admin-contact-requests", {
      title: "Contact Requests",
      contacts: await Contact.find().sort({ postDate: -1 }),
    });
  } catch (err) {
    console.error(err);
  }
};
