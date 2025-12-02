const Employee = require("../models/employee-model-mongoose");

exports.getTeam = async (req, res) => {
  try {
      const employees = await Employee.find();
      res.render("team", { title: "Team", employees });
  } catch (error) {
    console.log(error);
    // Invoke error-handling middleware
    const customError = new Error("Unable to retrieve employee data.  Please try again later.");
    next(customError);
  }

};
