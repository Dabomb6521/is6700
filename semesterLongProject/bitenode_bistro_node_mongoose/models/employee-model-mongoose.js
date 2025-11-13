const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [1, "Name must be at least 1 character"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [1, "Name must be at least 1 character"],
  },
  title: {
    type: String,
    required: false
  },
  image: {
    type: Image,
    required: true
  },
}, {
  // Options
  collection: 'employees',
  timestamps: false, // no `createdAt` and `updatedAt` fields by default
});

// Create and export the module based on the schema
module.exports = mongoose.model("Employee", employeeSchema);
