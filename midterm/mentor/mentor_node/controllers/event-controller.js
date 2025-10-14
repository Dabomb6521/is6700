const Event = require('../models/event-model');

exports.getAllEvents = (req, res) => {
    Event.findAll({
        order: [['date', 'ASC']]
    })
    .then(events => {
        res.render('events', {
            title: 'Events',
            events: events
        })
    })
    .catch((err) => console.error(err));
};