// Import express from npm
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

// Import Controllers
const homeController = require("./controllers/home-controller");
const menuController = require("./controllers/menu-controller");
const contactController = require("./controllers/contact-controller");

// Import Routers
const menuRouter = require("./routers/menu-router");
const homeRouter = require("./routers/home-router");
const contactRouter = require("./routers/contact-router");

// const { nextTick } = require('process');
const Contact = require("./models/contact-model");

// Import model config
const { configModels } = require("./util/model-config");

// Initialize the express app
const app = express();

// Initialize app settings
app.set("view engine", "ejs"); // What templating engine should be used
app.set("views", "views"); // Where should app find views

//  Mount middleware

// Mount express middleware to parse requrest bodies
app.use(express.urlencoded({ extended: false }));

// Tell the app where to find static resources
app.use(express.static(path.join(__dirname, "public")));

// Tell the app to use the expressLayouts package
app.use(expressLayouts);

// Configure Model Relationships
configModels();

// Register Routes

app.use("/menu", menuRouter);
app.use("/contact", contactRouter);

app.get("/team", (req, res) => {
  res.render("team", { title: "Our Team" });
});

app.get("/testimonials", (req, res) => {
  res.render("testimonials", { title: "Testimonials" });
});

app.get("/booking", (req, res) => {
  res.render("booking", { title: "Booking" });
});

app.use(homeRouter);

// Handle all unrecognized requests
app.use((req, res) => {
  // Render a 404 page
  res.render("404", { title: "Page not found" });
});

mongoose
  .connect(
    "mongodb+srv://dbo:aggies@cluster0.0ebdpxo.mongodb.net/bitenode-bistro-mongoose?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Mongoose Connected!");
    app.listen(3000);
    console.log("App is running on port 3000");
  })
  .catch((error) => {
    console.error(error);
  });
