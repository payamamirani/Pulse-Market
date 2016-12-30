
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session),
    //geolang = require("geolang-express"),
    i18n = require('i18n-express');

module.exports = function(app, config) {
    function compile(src, path) {
        return stylus(src).set('filename', path);
    }

    app.set('views', config.viewPath);
    app.set('view engine', 'pug');

    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret:'Plus Market Unicorns.',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        cookie: { }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({
        src: config.publicPath,
        compile: compile
    }));
    /*app.use(geolang({
     siteLangs: ["fa","en"],
     cookieLangName: 'ulang'
     }));*/
    app.use(i18n({
        translationsPath: config.localesPath,
        defaultLang: "fa",
        siteLangs: ["fa", "en"],
        cookieLangName: 'ulang'
    }));
    app.use(express.static(config.publicPath));
};