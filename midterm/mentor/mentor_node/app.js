const express = require('express');
const ejs = require('ejs');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const port = 3000;

// Import Routes
const homeRoutes = require('./routes/home-routes');
const trainerRoutes = require('./routes/trainer-routes');
const eventRoutes = require('./routes/event-routes');
const courseRoutes = require('./routes/course-routes');
const contactRoutes = require('./routes/contact-routes');
const adminRoutes = require('./routes/admin/admin-routes');

// Import Logging Middleware
const logRequests = require('./middleware');

// Initialize the express app
const app = express();

// Initialize app settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// Mount Middleware

// Mount Morgan middleware to log http requests
app.use(logRequests);

// Mount express middleware to parse request bodies
app.use(express.urlencoded({extened: false}));

// Static Resources
app.use(express.static(path.join(__dirname, 'public')));

// Use expressLayouts package
app.use(expressLayouts);

//  Register Routes
app.use("/", homeRoutes);
app.use("/trainers", trainerRoutes);
app.use("/events", eventRoutes);
app.use("/courses", courseRoutes);
app.use("/contact", contactRoutes);
app.use("/admin", adminRoutes);

app.listen(port);
console.log(`Mentor App is running on port ${port}`);