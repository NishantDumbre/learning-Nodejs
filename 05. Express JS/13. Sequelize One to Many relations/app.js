//Read controllers/admin.js

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product')
const User = require('./models/users')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  User.findByPk(1)
  .then((user)=>{
    req.user = user
    // we can create new objects in the request but shouldn't change the existing objects
    next()
    //running next to pass to the next middleware
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);


Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'})
User.hasMany(Product)
sequelize
  .sync() // we can user sync({force:true}) to drop all the tables and create new ones.
  .then(result => {
    return User.findByPk(1) // findById is depricated in sequelize. Instead use findByPk
  })
  .then((user)=>{
    if(!user){
      return User.create({name:'nishant', email:'nishant.gmail.com'})
    }
    return user
  })
  .then(()=>{
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });