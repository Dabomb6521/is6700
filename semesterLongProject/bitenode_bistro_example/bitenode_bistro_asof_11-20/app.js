// Import packages from NPM
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const { csrfSync } = require("csrf-sync");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");

// Import routers
const homeRouter = require("./routers/home-router");
const menuRouter = require("./routers/menu-router");
const contactRouter = require("./routers/contact-router");
const employeeRouter = require("./routers/employee-router");
const authRouter = require("./routers/auth-router");
const apiRouter = require("./routers/api-router");
const testimonialRouter = require("./routers/testimonial-router");
const recipeRouter = require('./routers/recipe-router');

// Import controllers
const errorController = require("./controllers/error-controller");

// Database connection string
const MONGODB_URI = 'mongodb+srv://dbo:aggies@cluster0.tiegiif.mongodb.net/bitenode-bistro-mongoose?retryWrites=true&w=majority&appName=Cluster0';

// Initialize session store
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

// Initalize csrf protection
const {
  generateToken, // Use this in your routes to generate, store, and get a CSRF token.
  csrfSynchronisedProtection // This is the default CSRF protection middleware.
} = csrfSync({
  // Override the default getTokenFromRequest to get the token from the req.body
  getTokenFromRequest: req => req.body._csrf // _csrf is the name of the hidden field expected in the form
});

// Initialize the express app
const app = express();

// Initialize app settings
app.set("view engine", "ejs"); // What templating engine should be used
app.set("views", "views"); // Where should app find views

// Mount middleware

// Mount express middleware to parse request bodies from forms
app.use(express.urlencoded({ extended: false }));

// Mount middleware to parse JSON request bodies (needed for API POST requests)
app.use(express.json());

// Tell the app where to find static resources
app.use(express.static(path.join(__dirname, "public")));

// Tell the app to use the expressLayouts package
app.use(expressLayouts);

// Register session middleware (should come before routes)
app.use(
  session({
    secret: 'purple monkey dishwasher', // The longer the better!
    resave: false, // Don't resave session data if nothing has changed
    saveUninitialized: false, // Don't automatically create a session object if not initalized by app code
    store: store, // Store session data in MongoDBStore setup above
    cookie: {
      maxAge : 1000 * 60 * 60, // cookie lasts for one hour (in milliseconds)
      sameSite: true // prevent cookie from being sent to other sites (CSRF)
    }
  })
);

// Mount flash message middleware
app.use(flash());

// Mount fileupload middleware (make sure this comes BEFORE csrfProtection!!!)
app.use(fileUpload());

// Mount middleware for csrf protection
// This will protect all requests except GET requests which are ignored
// Exclude API routes (and optionally JSON requests) from CSRF protection
app.use((req, res, next) => {
  // Skip CSRF for API routes or if request is JSON (token-based auth expected)
  if (req.path.startsWith('/api') || req.is('application/json')) {
    return next();
  }
  return csrfSynchronisedProtection(req, res, next);
});

// Middleware to store session data in res.locals for easy access from views
app.use((req, res, next) => {

  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  res.locals.user = req.session.user || {};
  res.locals.isAdmin = req.session.user?.roles.includes("admin");
  // Generate the csrf token and store in res.locals for easy access on views
  res.locals.csrfToken = generateToken(req);
  res.locals.flashMessages = req.flash(); // Retrieve any flash messages and make them available to views
  next();
})

// Register routes
app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/menu", menuRouter);
app.use("/contact", contactRouter);
app.use("/team", employeeRouter);
app.use("/recipes", recipeRouter);

app.use("/testimonials", testimonialRouter);

app.get("/testimonials", (req, res) => {
  res.render("testimonials", { title: "Testimonials" });
});

app.get("/booking", (req, res) => {
  res.render("booking", { title: "Booking" });
});

// Home and about routes
app.use(homeRouter);

// Handle unrecognized requests
app.use(errorController.get404);

// Handle server errors
app.use(errorController.get500);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Mongoose Connected!");
    // Launch express app
    app.listen(3000);
  })
  .catch((error) => {
    console.error(error);
  });
