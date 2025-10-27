const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('68ff07e1e27feee92c183f99')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect('mongodb+srv://dbo:aggies@cluster0.0ebdpxo.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
  .then(
    result => {
      User.findOne().then(user => {
        if (!user) {
          const user = new User({
            name: 'Brayden',
            email: 'brayden@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });
      app.listen(3000);
    }).catch(err => {
      console.log(err);
    });
