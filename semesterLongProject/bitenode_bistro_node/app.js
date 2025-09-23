// Import express from npm
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Import temp menu data
const menu = require('./data/menu.json');

// Initialize the express app
const app = express();

// Initialize app settings
app.set('view engine', 'ejs'); // What templating engine should be used
app.set('views', 'views'); // Where should app find views

//  Mount middleware

// Tell the app where to find static resources
app.use(express.static(path.join(__dirname, 'public')));

// Tell the app to use the expressLayouts package
app.use(expressLayouts);

// Register Routes
app.get("/", (req, res) => {
    res.render('index.ejs', {title: "Home"});
});

app.get("/about", (req, res) => {
    res.render('about.ejs', {title: "About Us"})
});

app.get("/menu", (req, res) => {
    res.render('menu', {title: "Menu", data: menu, selectedCategory: 'breakfast'});
});
app.get("/menu/:selectedCategory", (req, res) => {
    // Retrieve value of selecteed category
    const selectedCategory = req.params.selectedCategory;
    res.render('menu', {title: "Menu", data: menu, selectedCategory})
})

app.get("/team", (req, res) => {
    res.render('team', {title: "Our Team"});
});

app.get("/testimonials", (req, res) => {
    res.render('testimonials', {title: "Testimonials"});
});

app.get("/contact", (req, res) => {
    res.render('contact', {title: "Contact"});
});

app.get("/booking", (req, res) => {
    res.render('booking', {title: "Booking"});
});

// Launch my express app
app.listen(3000);
console.log("App is running on port 3000" );
