// Changed admin and shop controllers along with product model. Usede MySQL DB instead of storing data in files. Read admin and shop controllers along with product model and utils/database.js

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()    // This line syncs the tables when the app starts. It creates the required tables from the models on starting the app if the tables don't exist
    .then((result)=>{
        console.log(result)
        app.listen(8080);
    })
    .catch(err=>console.log(err))
