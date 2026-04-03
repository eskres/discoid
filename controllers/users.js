// Require Models
const {Record} = require("../models/Record");
const {User} = require("../models/User");
const {Payment} = require("../models/Payment");

// Require Moment Library
const moment = require('moment');

// // HTTP GET - User By Id
exports.user_show_get = (req, res) => {
    User.findById(req.user._id).populate('record')
    .then(user => {
        res.render("users/myaccount", {user, moment})
    })
    .catch(err => {
        console.log(err)
    })
}

// UPDATE
// HTTP GET - Load User Edit Form
exports.user_edit_get = (req, res) => {
    User.findById(req.query.id)
    .then((user) => {
        res.render("users/edit", {user})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - User Update
exports.user_update_put = (req, res) => {
    User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/users/myaccount");
    })
    .catch(err => {
        console.log(err)
    })
}