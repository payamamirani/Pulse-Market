
var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

module.exports = function(app, config) {
    function compile(src, path) {
        return stylus(src).set('filename', path);
    }

    app.set('views', config.viewPath);
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(stylus.middleware({
        src: config.publicPath,
        compile: compile
    }));
    app.use(express.static(config.publicPath));
}