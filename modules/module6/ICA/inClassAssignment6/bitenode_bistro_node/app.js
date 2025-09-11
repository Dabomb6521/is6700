// Import express from npm
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

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
    res.render('index.ejs');
});

app.get("/about", (req, res) => {
    res.render('about.ejs')
})

// Launch my express app
app.listen(3000);
console.log("App is running on port 3000" );
