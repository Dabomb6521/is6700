const Event = require("../models/event-model");

exports.getAllEvents = (req, res) => {
  Event.find({
    order: [["date", "ASC"]],
  })
    .sort({ date: 1 })
    .then((events) => {
      res.render("events", {
        title: "Events",
        events: events,
      });
    })
    .catch((err) => console.error(err));
};
