const User = require("../models/user-model-mongoose");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
};

exports.getProfile = (req, res) => {
  res.render("auth/profile", { title: "Profile" });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    title: "Signup",
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    user = await User.findOne({ email: email });

    if (!user) {
      // Find matching user by email
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid Credentials",
        entries: req.body, // Pass back user entried to re-populate form
      });
    }

    // Call model instance method to validate password
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
      return res.render("auth/login", {
        title: "Login",
        message: "Invalid Credentials",
        entries: req.body, 
      });
    }

    // Authentication Succeeded
    if (user && validPassword) {
      req.session.isAuthenticated = true;
      req.session.user = user;
      
      req.session.save((err) => {
        if (err) {
          console.log("Error saving session: ", err);
        }
        req.flash("success", "Login Successful!");
        // Redirect to previously requested page if applicable
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
 // Retrieve data from req.body
  const { firstname, lastname, email, password, confirmpassword } = req.body;

  if (password !== confirmPassword) {
    console.log("Passwords do not match.");
    return res.redirect("auth/signup", {
      title: "Signup",
      // Set up an errors array that matches structure of mongoose errors. Makes errors simpler to handle on view
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
      firstName: firstname,
      lastName: lastname,
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

exports.postProfile = async (req, res, next) => {
  try{
    // Retrieve user from database
    const user = await User.findById(req.session.user_id);

    if (!user) {
      req.flash("error", "Could not retrieve user data.");
      return res.redirect("/auth/profile");
    }

    user.firstName = req.body.firstname;
    user.lastName = req.body.lastname;
    user.email = req.body.email;
  
  await user.save();

  req.session.user = user;
  req.session.save(err => {
    if (err) {
      console.log("Error saving session: ", err);
    }

    req.flash("success", "Profile Updated!");
    return res.redirect("/auth/profile");
  });
 }catch (error) {
  console.log("Error Occurred: ", error);
  req.flash("error", "Could not save profile data");
  return res.redirect('/auth/profile');
 }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session: ", err);
    }
    res.redirect("/auth/login"); // Redirect to login or homepage
  })
}

// Middleware function to verify that user is logged in before proceeding.
exports.verifyAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  }
  req.flash("error", "Please login to access this page.");
  req.session.returnTo = req.originalUrl; // Store the URL of the original requrest in session to redirect user upon successful login.
  res.redirect("/auth/login");
};


// Middleware function to verify that user is an admin in before proceeding.
exports.verifyAdmin = (req, res, next) => {
  if (req.session.used?.roles.includes("admin")){
    return next();
  }
  req.flash("error", "You must be admin to access this page.");
  req.session.returnTo = req.originalUrl;
  res.redirect("/auth/login");
}
