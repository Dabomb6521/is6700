const sequelize = require('./database');

// Import models to sync
const Trainer = require('../models/trainer-model');
const Event = require('../models/event-model');

// Import Model Data
const trainerData = require('./trainer-info.json');
const eventData = require('./event-info.json');

sequelize.sync({force: true})
.then((result) => {
    console.log("Success!", result);
    // Bulk insert the Trainers information
    return Trainer.bulkCreate(trainerData)
})
.then((trainerDataResult) => {
    console.log("Trainer insert Successfull!", trainerDataResult);
    return Event.bulkCreate(eventData);
})
.then((eventDataResult) => {
    console.log("Event insert successfull!", eventDataResult);
})
.catch((err) => {
    console.error(err);
});

