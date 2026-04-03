// Require User Model
const {User} = require("../models/User");
 

var fs = require('fs');
var multer = require('multer');

var path = require('path');
require('dotenv/config');

// Require Passport Configurations
let passport = require("../helper/ppConfig");

// Require bcrypt for hashing
const bcrypt = require('bcrypt');
const salt = 10;

// APIs for User Registration and Authentication

// HTTP GET - Signup Route - To load the signup form
exports.auth_signup_get = (req, res) => {
    res.render("auth/signup");
}

// HTTP POST - Signup Route - To post the data into the database for registration
exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
    
    if (req.file !== undefined) {
        user.profilePicture = '/albumCover/' + req.file.filename;
    }
 
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
exports.auth_signin_get = (req, res) => {
    res.render("auth/signin");
}

// HTTP POST - Signin Route - To post the data for authentication
exports.auth_signin_post = passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/auth/signin"
})

// HTTP GET - Logout Route - To logout the user
exports.auth_logout_get = (req, res) => {
    // Invalidates the session
   req.logout(function(err) {
    if(err) { 
        
        return next(err);}
    req.flash("success", "You are logged out successfully!!!")
    res.redirect("/auth/signin");
   }) 
}


exports.password_change_get = (req, res) => {
    User.findById(req.query.id)
    .then((user) => {
        console.log(user);
        res.render("users/changePassword", {user})
    })
    .catch(err => {
        console.log(err);
    })
}




exports.password_update_put = (req, res) => {
    console.log(" req.body.id " + req.body.id);

    // User.findByIdAndUpdate(req.body.id, req.body)
    console.log(req.body)
    let hash = bcrypt.hashSync(req.body.password, salt);
    console.log(hash);

    req.body.password = hash;

    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/users/myaccount");
    })
    .catch(err => {
        console.log(err)
    })
}

