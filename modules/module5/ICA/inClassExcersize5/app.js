// Require the express package
const express = require('express');

// Launch Express and store the result in an app variable
const app = express();

// Define handler functions
const getHome = ((req, res) => {
    console.log("Request method is: ", req.method);
    console.log("Request path is: ", req.path);

    // Send back a response
    res.send("<h1>This is the home page!</h1>");
});

const getAbout = ((req, res, next) => {
    console.log("Request method is: ", req.method);
    console.log("Request path is: ", req.path);

    // res.send("<h1>This is the about page!!</h1>");
    next();
});

const authUser = (req, res, next) => {
    let goodUser = false;
    if (goodUser) {
        next();
    } else {
        res.send("You are not authorized to view this resource.")
    }
}


// Register routes

// Home page
app.get("/", getHome);

// About us page (/about)
// app.get("/about", getAbout);
app.use(authUser);
app.get("/about", getAbout, (req, res) => {
    res.send("<h1>THIS IS THE SECRET ABOUT PAGE!</h1>")
});

// Tell our app to listen to listen on a certian port
app.listen(3000, () => {
    console.log("App listening on port 3000")
});