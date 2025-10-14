const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const port = 3000;

// Import Routes
const homeRoutes = require('./routes/home-routes');
const trainerRoutes = require('./routes/trainer-routes');
const eventRoutes = require('./routes/event-routes');

// Initialize the express app
const app = express();

// Initialize app settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// Mount Middleware

// Static Resources
app.use(express.static(path.join(__dirname, 'public')));

// Use expressLayouts package
app.use(expressLayouts);

//  Register Routes
app.use("/", homeRoutes);
app.use("/trainers", trainerRoutes);
app.use("/events", eventRoutes);

app.listen(port);
console.log(`Mentor App is running on port ${port}`);