const Course = require('../models/course-model');
const Event = require('../models/event-model');
const Trainer = require('../models/trainer-model');

exports.getHome = async (req, res) => {
    try {

        const courses = await Course.findAll({
            limit: 3,
            include: [{
                model: Trainer,
                as: 'trainerInfo'
            }]
        });

        const trainers = await Trainer.findAll({
            limit: 3
        });

        res.render('index', {
            title: 'Home',
            courseCount: await Course.count(),
            eventCount: await Event.count(),
            trainerCount: await Trainer.count(),
            courses: courses,
            trainers: trainers
        });
    } catch (err) {console.error(err);};
};

exports.getAbout = async (req, res) => {
    try {

        res.render('about', {
            title: 'About Us',
            courseCount: await Course.count(),
            eventCount: await Event.count(),
            trainerCount: await Trainer.count(),
        });
    } catch (err) {console.error(err);};
};