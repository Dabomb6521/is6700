const Contact = require("../models/contact-model-mongoose");

exports.getContact = (req, res) => {
  res.render("contact", { title: "Contact", message: "" });
};

exports.postContact = (req, res) => {
  // Retrieve the requrest body
  // console.log("Request body is: ", req.body);

  // Import the contact request data into the database using the Contact model
  Contact.create({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    date: new Date(),
    response: null,
    responseDate: null,
  })
    .then((response) => {
      console.log("Success!", response);
      res.render("contact", {
        title: "Contact",
        message: "Thanks! Your request has been submitted.",
      });
    })
    .catch((err) => {
      console.error(err);
      res.render("contact", {
        title: "Contact",
        message: "Oops, something went wrong. Please try again later.",
      });
    });
};

// This function retrieves contact requests with no response.
// It stores the data in res.locals so it is accessible to any eventual view that may be rendered.
// It then calls next() to pass to the next function in the chain.
exports.getContactsWithNoResponse = async (req, res, next) => {
  try {
    // Get contact requests with no response
    const contacts = await Contact.find({ response: null });

    // Add data to res.locals so it is available in subsequent functions and views
    res.locals.contacts = contacts;

    // Call next to go to next function in chain
    next();
  } catch (error) {
    console.log(error);
    // Invoke error-handling middleware
    const customError = new Error(
      "Unable to retrieve contact requests. Please try again later"
    );
    next(customError);
  }
};

// This function runs when the user selects a contact request to view and submits the first form on contact-respond.ejs.
// It gets the contact ID from the body of the request, retrieves the contact record from the database, and
// stores it in res.locals before calling next()
exports.loadContact = async (req, res, next) => {
  try {
    // Get contactId from form
    const { contactId } = req.body;

    // Retrieve contact
    const contact = await Contact.findById(contactId);

    // Add data to res.locals so it is available in subsequent functions and views
    res.locals.selectedContact = contact;

    //  Call next to got to next function in chain
    next();
  } catch (error) {
    console.log(error);
    // Invoke error-handling middleware
    const customError = new Error(
      "Unable to load contact request. Please try again later"
    );
    next(customError);
  }
};

exports.postContactResponse = async (req, res) => {
  const { id, response } = req.body;
  try {
    // Use Mongoose findByIdAndUpdate function to update
    // The {new: true} parameter makes the function return the updated record instead of the original record
    const result = await Contact.findByIdAndUpdate(
      id,
      { set: { response: response, responseDate: new Date() } },
      { new: true }
    );
    console.log("Result of update operation is: ", result);
    req.flash("success", "Contact Response Recorded.");
    // Redirect to display flash message
    res.redirect("/contact/respond");
  } catch (err) {
    console.log("Error saving response: ", err);
    // Invoke error-handling middleware
    const customError = new Error(
      "Unable to post response to contact request. Please try again later"
    );
    next(customError);
  }
};

// This function renders the contact-respond view.  It only sets the title. All other data is assumed to be retrieved
// and added to res.locals by earlier functions in the chain.
exports.renderContactRespond = (req, res) => {
  // Render view
  res.render("contact-respond", { title: "Contact Respond" });
};
