// Import my configured sequelize instance
const sequelize = require('./database');

// Import models that should be synced
const Contact = require('../models/contact-model');

// Sync all models to the database
sequelize.sync()
.then((result) => {
    console.log("Sucess!", result);
})
.catch((err) => {
    console.error(err);
})