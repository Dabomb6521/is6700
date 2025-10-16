const Course = require('../models/course-model');
const Event = require('../models/event-model');
const Trainer = require('../models/trainer-model');

exports.getHome = async (req, res) => {
    try {

        res.render('index', {
            title: 'Home',
            courseCount: await Course.count(),
            eventCount: await Event.count(),
            trainerCount: await Trainer.count(),
        });
    } catch (err) {console.error(err);};
};

exports.getAbout = (req, res) => {
    res.render('about', {title: "About Us"})
};