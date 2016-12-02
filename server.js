
var express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('./server/data/models/User');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);

passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({Username: username}).exec(function(err, user) {
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

passport.serializeUser(function(user, done) {
    if(user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done) {
    User.find({_id: id}).exec(function(err, user) {
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

app.listen(config.port, function(){
    console.log('Listening on port ' + config.port + ' .');
});
