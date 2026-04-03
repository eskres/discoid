// Require Passport
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// Require User Model
const {User} = require("../models/User");

// Serialze User
// Save the data into the session
// Unique Identifier
passport.serializeUser(function(user, done){
    done(null, user.id)
});

// DeSerialze User
// Reading the information from the database according to the ID from Session.
passport.deserializeUser(async function(id, done){
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

passport.use(new LocalStrategy({
    usernameField: "emailAddress",
    passwordField: "password"
},
    async function(emailAddress, password, done) {
        try {
            const user = await User.findOne({ emailAddress });
            if (!user) { return done(null, false); }
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        } catch(err) {
            return done(err);
        }
    }
));

// Export Passport Middleware
module.exports = passport;




