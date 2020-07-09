const path=require('path');
const express=require("express");
const dotenv= require('dotenv');
const morgan=require('morgan');
const passport=require('passport');
const exphbs = require('express-handlebars');
const connectdb=require('./config/db');

//Passport config
require('./config/passport')(passport);

connectdb();

const app=express();

//Logging
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs({defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//Routes
app.use('/',require('./routes/index'));

//Static folder
app.use(express.static(path.join(__dirname+'/public')))

const PORT= process.env.PORT|| 5000;

console.log(process.env.MONGO_URI);
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
