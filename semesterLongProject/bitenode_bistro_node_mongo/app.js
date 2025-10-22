// Import express from npm
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Import Controllers
const homeController = require('./controllers/home-controller');
const menuController = require('./controllers/menu-controller');
const contactController = require('./controllers/contact-controller');

// Import Routers
const menuRouter = require('./routers/menu-router');
const homeRouter = require('./routers/home-router');


// import MongoDB connection function
const { mongoConnect} = require('./util/database-mongo');

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


app.use("/menu", menuRouter);

app.get("/team", (req, res) => {
    res.render('team', {title: "Our Team"});
});

app.get("/testimonials", (req, res) => {
    res.render('testimonials', {title: "Testimonials"});
});


app.get("/contact", contactController.getContact);

app.post("/contact", contactController.postContact);

app.get("/booking", (req, res) => {
    res.render('booking', {title: "Booking"});
});

app.use(homeRouter);

// Handle all unrecognized requests
app.use((req, res) => {
    // Render a 404 page
    res.render("404", {title: "Page not found"})
})

mongoConnect(() => {
    // Launch my express app
    app.listen(3000);
    console.log("App is running on port 3000" );
})



