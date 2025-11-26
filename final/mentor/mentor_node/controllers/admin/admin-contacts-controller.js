const Contact = require('../../models/contact-model');

exports.getContacts = async(req, res) => {
    try {
        res.render('admin-contact-requests', {
            title: "Contact Requests", 
            contacts: await Contact.findAll({
                order: [['postDate', 'DESC']]
            })
        });
    } catch (err) {console.error(err);};
};