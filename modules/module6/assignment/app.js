
const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
// Modified from video due to handlebars being on newer version
// const { engine } = require('express-handlebars');

const app = express();

// This is outdated in handlebars v6+
// app.engine('hbs', expressHbs({layoutsDir: 'views/layouts', defaultLayout: 'main-layout'}));
// The function below is what ChatGPT says is updated call
// app.engine(
//     "hbs",
//     engine({
//         extname: "hbs",
//         layoutsDir: "views/layouts",
//         defaultLayout: "main-layout",
//         extname: "hbs",
//     })
// );
app.set('view engine', 'ejs');
// This is default in express, set here for clarity
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const usersRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(usersRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Page Not Found', path: req.url});
});

app.listen(3000);

