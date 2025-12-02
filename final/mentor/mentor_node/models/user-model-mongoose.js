const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.(com|net)$/i.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid email. Please enter a valid email address ending in .com or .net`,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [6, "Password must be at least 6 characters"]
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
    validate: {
      validator: function (roles) {
        return roles.every(role => ["user", "admin"].includes(role)); // Ensures only valid roles are used
      },
      message: (props) => `Invalid role(s): ${props.value.join(", ")}. Allowed roles are: user, admin.`
    }
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

userSchema.pre('save', async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

// Check to see if passowrd matches
userSchema.methods.validatePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Check to see if email is unique
userSchema.statics.checkEmailUnique = async function (email) {
  const user = await this.findOne({email: email});

  return !Boolean(user);
}

module.exports = mongoose.model("User", userSchema, 'users');