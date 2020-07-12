const path=require('path')
const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const passport=require('passport')
const session=require('express-session')
const morgan=require('morgan')
const MongoStore= require('connect-mongo')(session)
const exphbs= require('express-handlebars')
const connectDb= require('./config/db')

//Load config
dotenv.config({path:'./config/config.env'})

//Passport config
require('./config/passport')(passport)

connectDb()

const app=express()
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs',exphbs({defaultLayout:'main' ,extname:'.hbs'}))
app.set('view engine','.hbs')

//Session
app.use(session({
    secret:'Secret',
    resave:false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection})
}))

//Passport MiddleWare
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user,done)=>{
    done(null,user.id)
})
passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})

//Static folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))

const PORT=process.env.PORT ||5000;
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
