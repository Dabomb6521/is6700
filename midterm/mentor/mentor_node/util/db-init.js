const sequelize = require('./database');

// Import models to sync
const Trainer = require('../models/trainer-model');
const Event = require('../models/event-model');
const Course = require('../models/course-model');
const Contact = require('../models/contact-model');
const Testimonial = require('../models/testimonial-model');

// Import Model Data
const trainerData = require('./trainer-info.json');
const eventData = require('./event-info.json');
const courseData = require('./course-info.json');
const testimonialData = require('./testimonial-info.json');

sequelize.sync({force: true})
.then((result) => {
    console.log("Success!", result);
    // Bulk insert the Trainers information
    return Trainer.bulkCreate(trainerData)
})
.then((trainerDataResult) => {
    console.log("Trainer insert successfull!", trainerDataResult);
    return Event.bulkCreate(eventData);
})
.then((eventDataResult) => {
    console.log("Event insert successfull!", eventDataResult);
    return Course.bulkCreate(courseData);
})
.then((courseDataResult) => {
    console.log("Course insert successfull!", courseDataResult);
    return Testimonial.bulkCreate(testimonialData);
})
.then((testimonialDataResult) => {
    console.log("Testimonial insert successfull!", testimonialDataResult);
})
.catch((err) => {
    console.error(err);
});

