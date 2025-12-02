const User = require("../models/user-model-mongoose");

exports.getSignup = (req, res) => {
  res.render("auth/signup", { title: "Signup" });
};

exports.getLogin = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

exports.postSignup = async (req, res, next) => {
  // retrieve data from req.body
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Match password and confirm password
  if (password !== confirmPassword) {
    return res.render("auth/signup", {
      title: "Signup",
      errors: [
        {
          path: "confirmPassword",
          message: "Passwords do not match",
        },
      ],
      entries: req.body,
    });
  }

  try {
    // Check to see if email is unique
    const emailUnique = await User.checkEmailUnique(email);

    if (!emailUnique) {
      return res.render("auth/signup", {
        title: "Signup",
        errors: [
          {
            path: "email",
            message: "Email address is taken, Please try again",
          },
        ],
        entries: req.body,
      });
    }

    // create new user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });
    await user.save();

    // Store user data in session
    req.session.isAuthenticated = true;
    req.session.user = user;

    req.session.save((err) => {
      if (err) {
        console.log("Error saving session: ", err);
      }
      req.flash("success", `Welcome, ${user.firstName}!`);

      if (req.session.returnTo) {
        let redirectTo = req.session.returnTo;
        delete req.session.redirectTo;
        return res.redirect(redirectTo);
      }
      res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.render("auth/signup", {
      title: "Signup",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid email or password",
        entries: req.body,
      });
    }

    const passwordsMatch = await user.validatePassword(password);

    if (!passwordsMatch) {
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid Credentials.",
        entries: req.body,
      });
    }

    // Authentication succeded!
    if (user && passwordsMatch) {
      req.session.isAuthenticated = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        req.flash("success", `Welcome, ${user.firstName}!`);
        if (req.session.returnTo) {
          let redirectTo = req.session.returnTo;
          delete req.session.returnTo;
          return res.redirect(redirectTo);
        }
        res.redirect("/");
      });
    }
  } catch (error) {
    console.error(err);
    res.render("auth/login", {
      title: "Login",
      message: "Oops, something went wrong. Please try again",
      entries: req.body,
      errors: Object.values(err.errors),
    });
  }
};

exports.getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    res.redirect("/");
  });
};
