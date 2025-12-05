const Contact = require("../../models/contact-model-mongoose");
const nodemailer = require("nodemailer");
const transporter = require("../../util/email-config");

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
    const contacts = await Contact.find({ response: null }).sort({
      postDate: -1,
    });
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

    // Send Email
    const info = await transporter.sendMail({
      from: '"Mentor Training" <noreply@mentor.com>',
      to: result.email,
      subject: `Response to your inquiry: ${result.subject}`,
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5fcf80;">Mentor Training - Contact Response</h2>
          <p>Dear ${result.name},</p>
          <p>Thank you for contacting Mentor Training.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3>Your Original Message:</h3>
            <p><strong>Subject:</strong> ${result.subject}</p>
            <p>${result.message}</p>
          </div>
          
          <div style="background-color: #e8f5e9; padding: 20px; margin: 20px 0;">
            <h3 style="color: #2e7d32;">Our Response:</h3>
            <p>${result.response}</p>
          </div>
          
          <p>Best regards,<br><strong>Mentor Training Team</strong></p>
        </div>
      `,
    });
    console.log("Message Sent: ", info.messageId);
    console.log("Preview URL: ", nodemailer.getTestMessageUrl(info));

    console.log("Result of update operation is: ", result);
    req.flash("success", "Contact Response Recorded.");
    res.redirect("/admin/contacts/respond");
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
