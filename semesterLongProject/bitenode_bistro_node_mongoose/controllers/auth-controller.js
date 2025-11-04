// const User = require('../models/user');

const { response } = require("express");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    path: "/login",
    title: "Contact",
  });
};

exports.getProfile = (req, res) => {
  res.render("auth/profile", { title: "Profile" });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    path: "/signup",
    title: "Signup",
  });
};

exports.postLogin = (req, res) => {
  req.session.isAuthenticated = true;
  req.session.user = user = {
    _id: 1,
    firstName: "Temp",
    lastName: "User",
    email: req.body.email,
  };
  req.session.save((err) => {
    if (err) {
      console.log("Error saving session: ", err);
    } else {
      console.log("Session user is: ", req.session.user);
    }
    res.redirect("/");
  });
};

exports.postSignup = (req, res) => {
  req.session.isAuthenticated = true;
  req.session.user = user = {
    _id: 1,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
  };
  req.session.save((err) => {
    if (err) {
      console.log("Error saving session: ", err);
    } else {
      console.log("Session user is: ", req.session.user);
    }
    res.redirect("/");
  });
};
