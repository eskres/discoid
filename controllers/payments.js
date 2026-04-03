// Require User Model
const {User} = require("../models/User");

// Require Passport Configurations
let passport = require("../helper/ppConfig");

// Require bcrypt for hashing
const bcrypt = require('bcrypt');
const salt = 10;

// APIs for User Registration and Authentication

// HTTP GET - Signup Route - To load the signup form
exports.payment_signup_get = (req, res) => {
    res.render("payment/signup");
}

// HTTP POST - Signup Route - To post the data into the database for registration
exports.payment_signup_post = (req, res) => {
    let user = new User(req.body);

    let hash = bcrypt.hashSync(req.body.password, salt);
    user.password = hash;

    user.save()
    .then(()=> {
        res.redirect("/");
    })
    .catch((err)=> {
        console.log(err);
        res.send("Please try again later.")
    })
}

// HTTP GET - Signin Route - To load the signin form
exports.payment_signin_get = (req, res) => {
    res.render("payment/signin");
}

// HTTP POST - Signin Route - To post the data for paymententication
exports.payment_signin_post = passport.paymententicate('local', {
    successRedirect: "/",
    failureRedirect: "/payment/signin"
})

// HTTP GET - Logout Route - To logout the user
exports.payment_logout_get = (req, res) => {
    // Invalidates the session
   req.logout(function(err) {
    if(err) { 
        
        return next(err);}
    req.flash("success", "You are logged out successfully!!!")
    res.redirect("/payment/signin");
   }) 
}