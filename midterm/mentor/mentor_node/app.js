const express = require('express');
const ejs = require('ejs');
const path = requrie('path');
const expressLayouts = require('express-ejs-layouts');
const port = 3000;

// Import Routes
const homeRoutes = require('./controllers/home-routes');

// Initialize the express app
const app = express();

// Initialize app settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// Mount Middleware

// Static Resources
app.use(express.static(path.join(__dirname, 'public')));

//  Register Routes
app.get("/", homeRoutes);

app.listen(port);
console.log(`Mentor App is running on port ${port}`);