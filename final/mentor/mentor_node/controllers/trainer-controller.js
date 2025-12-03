const Trainer = require("../models/trainer-model-mongoose");

exports.getAllTrainers = (req, res) => {
  Trainer.find()
    .then((trainers) => {
      res.render("trainers", {
        title: "Our Trainers",
        trainers: trainers,
      });
    })
    .catch((err) => {
      console.error(err);
      const customError = new Error("Unable to load trainer, Try again later");
      next(customError);
    });
};
