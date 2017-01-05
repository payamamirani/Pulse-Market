
var mongoose = require('mongoose'),
    UserModel = require('../models/User'),
    CategoryModel = require('../models/Category');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connecting to database error ...'));
    db.once('open', function callback(){
        console.log('Pulse Market db opened.');
    });
    UserModel.createDefaultUsers();
    CategoryModel.createDefaultCategories();
};