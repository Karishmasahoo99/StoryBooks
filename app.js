const path=require('path');
const express=require("express");
const dotenv= require('dotenv');
const mongoose=require('mongoose');
const morgan=require('morgan');
const passport=require('passport');
const session=require('express-session');
const exphbs = require('express-handlebars');
const MongoStore=require('connect-mongo')(session);
const connectdb=require('./config/db');

//Passport config
require('./config/passport')(passport);

connectdb();

const app=express();

//Handlebars
app.engine('.hbs', exphbs({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({ mongooseConnection: mongoose.connection})
  }))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//Static folder
app.use(express.static(path.join(__dirname+'/public')))

//Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));

const PORT= process.env.PORT|| 5000;

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
