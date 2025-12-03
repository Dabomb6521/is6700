const Event = require("../models/event-model-mongoose");

exports.getAllEvents = (req, res) => {
  Event.find()
    .sort({ date: 1 })
    .then((events) => {
      res.render("events", {
        title: "Events",
        events: events,
      });
    })
    .catch((err) => {
      console.error(err);
      const customError = new Error("Unable to load Events, Try again later");
      next(customError);
    });
};
