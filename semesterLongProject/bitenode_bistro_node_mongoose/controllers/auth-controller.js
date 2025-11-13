const User = require("../models/user-model-mongoose");

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
    user = await User.findOne({ email: email });

    if (!user) {
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid Credentials",
        entries: req.body,
      });
    }

    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid Credentials",
        entries: req.body,
      });
    }

    if (user && validPassword) {
      req.session.isAuthenticated = true;
      req.session.user = user;
      
      req.session.save((err) => {
        if (err) {
          console.log("Error saving session: ", err);
        }
        req.flash("success", "Login Successful!");
        if (req.session.returnTo) {
          let redirectTo = req.session.returnTo;
          delete req.session.returnTo; // prevent looping
          return res.redirect(redirectTo);
        }
        res.redirect("/"); // default redirect to home page
      });
    }
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
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password !== confirmPassword) {
    console.log("Passwords do not match.");
    return res.redirect("auth/signup", {
      title: "Signup",
      errors: [
        {
          path: "confirmPassword",
          message: "Please make sure your passwords match.",
        },
      ],
      entries: req.body,
    });
  }

  try {
    const uniqueEmail = await User.checkEmailUnique(email);
    if (!uniqueEmail) {
      return res.render("auth/signup", {
        title: "Signup",
        errors: [
          {
            path: "email",
            message: "Email address is already taken",
          },
        ],
        entries: req.body,
      });
    }

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    await user.save();

    req.session.isAuthenticated = true;
    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        console.log("Error saving session: ", err);
      }
      req.flash("success", "Signup Successful!");
      if (req.session.returnTo) {
        let redirectTo = req.session.returnTo;
        delete req.session.returnTo; // prevent looping
        return res.redirect(redirectTo);
      }
      res.redirect("/"); // default redirect to home page
    });
  } catch (err) {
    console.log("Signup error: ", err);

    res.render("auth/signup", {
      title: "Signup",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.verifyAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  req.flash("error", "Please login to access this page.");
  req.session.returnTo = req.originalUrl;
  res.redirect("/auth/login");
};

exports.verifyAdmin = (req, res, next) => {
  if (req.session.used?.roles.includes("admin")){
    return next();
  }
  eq.flash("error", "You must be admin to access this page.");
  req.session.returnTo = req.originalUrl;
  res.redirect("/auth/login");
}
