const Trainer = require('../models/trainer-model');

exports.getAllTrainers = (req, res) => {
    Trainer.findAll()
    .then(trainers => {
        res.render('trainers', {
            title: 'Our Trainers',
            trainers: trainers
        })
    })
    .catch((err) => console.error(err));
};