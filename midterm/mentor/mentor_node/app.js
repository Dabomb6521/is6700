const express = require('express');
const ejs = require('ejs');
const path = requrie('path');
const expressLayouts = require('express-ejs-layouts');

// Initialize the express app
const app = express();

// Mount Middleware

// Static Resources
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);
console.log("Mentor App is running on port 3000");