require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");

// Import Routes
const homeRoutes = require("./routes/home-routes");
const trainerRoutes = require("./routes/trainer-routes");
const eventRoutes = require("./routes/event-routes");
const courseRoutes = require("./routes/course-routes");
const contactRoutes = require("./routes/contact-routes");
const adminRoutes = require("./routes/admin/admin-routes");
const userRoutes = require("./routes/user-routes");
const apiRoutes = require('./routes/api/api-routes');
externalApiRoutes = require('./routes/api/external-api-routes');

// Import Error Controller
const errorController = require('./controllers/error/error-controller');

// Database connection string
const MONGODB_URI = process.env.MONGODB_URI;

// Import Logging Middleware
const logRequests = require("./middleware");

// Initialize session store
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// Initialize the express app
const app = express();

// Initialize app settings
app.set("view engine", "ejs");
app.set("views", "views");

// Mount Middleware

// Mount Morgan middleware to log http requests
app.use(logRequests);

// Mount express middleware to parse request bodies
app.use(express.urlencoded({ extended: false }));

// Static Resources
app.use(express.static(path.join(__dirname, "public")));

// Use expressLayouts package
app.use(expressLayouts);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
    },
  })
);

app.use(flash());

app.use(fileUpload());

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.flashMessages = req.flash();

  next();
});

//  Register Routes
app.use("/", homeRoutes);
app.use("/user", userRoutes);
app.use("/trainers", trainerRoutes);
app.use("/events", eventRoutes);
app.use("/courses", courseRoutes);
app.use("/contact", contactRoutes);
app.use("/admin", adminRoutes);
app.use('/api', apiRoutes);
app.use('/externalapi', externalApiRoutes);

app.use(errorController.get404);
app.use(errorController.get500);

// Start the app using mongoose
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Mongoose Connected!");
    app.listen(process.env.PORT || 3000);
    console.log("Mentor App is running on port 3000");
  })
  .catch((error) => {
    console.error(error);
  });
