const User = require('../models/user-model-mongoose');

const { response } = require("express");
const { rawListeners } = require("../models/menu-category-model-mongoose");

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

exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    user = await User.findOne({email: email});
    
    if (!user) {
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid Credentials",
        entries: req.body,
      })
    }

    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid Credentials",
        entries: req.body,
      })
    }

    if (user && validPassword) {
      req.session.isAuthenticated = true;
      req.session.user = user
      req.session.save((err) => {
        if (err) {
          console.log("Error saving session: ", err);
        } else {
          console.log("Session user is: ", req.session.user);
        }
        res.redirect("/");
      });

    };
  } catch (err) {
    return res.render("auth/login", {
        title: "Login",
        message: "Something went wrong. Please try again",
        entries: req.body,
        errors: Object.values(err, errors),
      });
  }
};

exports.postSignup = async (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password
  const confirmPassword = req.body.confirmPassword;
  
  if(password !== confirmPassword) {
    console.log("Passwords do not match.");
    return res.redirect("auth/signup", {
      title: "Signup",
      errors: [{
        path: "confirmPassword",
        message: "Please make sure your passwords match.",
      }],
      entries: req.body,
    });
  }

  try{

    const uniqueEmail = await User.checkEmailUnique(email);
    if (!uniqueEmail) {
      return res.render("auth/signup", {
      title: "Signup",
      errors: [{
        path: "email",
        message: "Email address is already taken",
      }],
      entries: req.body,
    })
  }

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    });

    await user.save();

    req.session.isAuthenticated = true;
    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        console.log("Error saving session: ", err);
      } else {
        console.log("Session user is: ", req.session.user);
      }
      res.redirect("/");
    });
  } catch (err) {
    console.log("Signup error: ", err);

    res.render("auth/signup", {
      title: "Signup",
      entries: req.body,
      errors: Object.values(err.errors)
    })
  }

};
