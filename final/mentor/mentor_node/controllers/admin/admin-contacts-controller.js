const Contact = require("../../models/contact-model-mongoose");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ postDate: -1 });
    res.render("admin/contact-requests", {
      title: "Contact Requests",
      contacts: contacts,
    });
  } catch (error) {
    console.error(error);
    const customError = new Error(
      "Unable to retrieve contact requests. Try again later"
    );
    next(customError);
  }
};

exports.getContactsWithNoResponse = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ response: null });
    res.locals.contacts = contacts;
    next();
  } catch (error) {
    console.error(error);
    const customError = new Error(
      "Unable to retrieve contact requests. Try again later"
    );
    next(customError);
  }
};

exports.loadContact = async (req, res, next) => {
  try {
    const { contactId } = req.body;
    const contact = await Contact.findById(contactId);

    if (!contact) {
      req.flash("error", "Contact request not found");
      return res.redirect("/admin/contacts");
    }
    res.locals.selectedContact = contact;
    next();
  } catch (error) {
    console.error(error);
    const customError = new Error(
      "Unable to load contact request. Try again later"
    );
    next(customError);
  }
};

exports.postContactResponse = async (req, res, next) => {
  const { id, response } = req.body;
  try {
    const result = await Contact.findByIdAndUpdate(
      id,
      { $set: { response: response, responseDate: new Date() } },
      { new: true }
    );
    console.log("Result of update operation is: ", result);
    req.flash("success", "Contact Response Recorded.");
    res.redirect("/contact/respond");
  } catch (error) {
    console.error(error);
    const customError = new Error(
      "Unable to post response to contact request. Try again later"
    );
    next(customError);
  }
};

exports.renderContactRespond = (req, res) => {
  res.render("admin/contact-respond", { title: "Contact Respond" });
};
