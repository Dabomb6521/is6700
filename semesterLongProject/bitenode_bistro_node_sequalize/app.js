// Import express from npm
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Import Controllers
const menuController = require('./controllers/menu-controller');

// Import temp menu data
const menu = require('./data/menu.json');

// Import menu model
const menuModel = require('./models/menu-model');
// const { nextTick } = require('process');
const Contact = require('./models/contact-model')

// Import model config
const {configModels} = require('./util/model-config');

// Initialize the express app
const app = express();

// Initialize app settings
app.set('view engine', 'ejs'); // What templating engine should be used
app.set('views', 'views'); // Where should app find views

//  Mount middleware

// Mount express middleware to parse requrest bodies
app.use(express.urlencoded({extended: false}));

// Tell the app where to find static resources
app.use(express.static(path.join(__dirname, 'public')));

// Tell the app to use the expressLayouts package
app.use(expressLayouts);

// Configure Model Relationships
configModels();

// Register Routes
app.get("/", (req, res) => {
    res.render('index.ejs', {title: "Home"});
});

app.get("/about", (req, res) => {
    res.render('about.ejs', {title: "About Us"})
});

app.get(["/menu", "/menu/:catSlug"], menuController.getMenu);
// instead of defining in two seperate app.get you can pass an array with the paths
// app.get("/menu/:selectedCategory", menuController.getMenu);

app.get('/menu/:catSlug/:itemSlug', menuController.getMenuItem);

app.get("/team", (req, res) => {
    res.render('team', {title: "Our Team"});
});

app.get("/testimonials", (req, res) => {
    res.render('testimonials', {title: "Testimonials"});
});

app.get("/contact", (req, res) => {
    res.render('contact', {title: "Contact", message: ""});
});
app.post("/contact", (req, res) => {
    // Retrieve the requrest body
    console.log("Request body is: ", req.body);

    // Import
    Contact.create({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })
    .then((response) => {
        console.log("Success!", response);
        res.render("contact", {title: "Contact", message: "Thanks! Your request has been submitted."})
    })
    .catch((err) => {
        console.error(err);
        res.render("contact", {title: "Contact", message: "Oops, something went wrong. Please try again later.", entries: req.body, errors: err.errors})
    })
});

app.get("/booking", (req, res) => {
    res.render('booking', {title: "Booking"});
});

// Handle all unrecognized requests
app.use((req, res) => {
    // Render a 404 page
    res.render("404", {title: "Page not found"})
})

// Launch my express app
app.listen(3000);
console.log("App is running on port 3000" );
