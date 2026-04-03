// Require Express
const express = require('express');

// Require and Initialze dotenv
require('dotenv').config();

// Require Connect Flash
const flash = require('connect-flash');

// Require Mongoose
const mongoose = require('mongoose');

// Port Configuration
const PORT = process.env.PORT;

// Initialze Express
const app = express();

// Using Connect Flash
app.use(flash());

// Look for all static files in public folder
// (CSS, JS, Images, Videos, Audio files)
app.use(express.static("public"));

// Require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// Import Routes
const indexRouter = require('./routes/index');
const recordsRouter = require('./routes/records');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const cartsRouter = require('./routes/carts');

// Look into views folder for the file named as layout.ejs
app.use(expressLayouts);

// Express Session and Passport
let session = require('express-session');
let passport = require('./helper/ppConfig');
const { use } = require('./helper/ppConfig');
const { MongoStore } = require('connect-mongo');

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {maxAge: 3600000},
    store: MongoStore.create({
        mongoUrl: process.env.MongoDBURL 
        // mongooseConnection: mongoose.connection
    })
}))

// Initialze passport and passport session
app.use(passport.initialize());
app.use(passport.session());

// Sharing the information with all pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.alerts = req.flash();
    res.locals.session = req.session; //ASK SAAD WHETHER THIS IS SECURE OR NOT
    next();
})

// Mount Routes
app.use('/', indexRouter);
app.use('/', recordsRouter);
app.use('/', usersRouter);
app.use('/', authRouter);
app.use('/', cartsRouter);

// NodeJS will look in a folder called views/ for all EJS related files.
app.set("view engine", "ejs");

// Validate database Connection
mongoose.connect(process.env.MongoDBURL)
    .then(() => console.log("MongoDB connected!!!"))
    .catch(err => console.log(err));

// Validate server connection
app.listen(PORT, () => {
    console.log(`Discoid is running on port ${PORT}`);
})