
var UserModel = require('mongoose').model('User'),
    encryption = require('../utilities/encryption');

exports.getAllUsers = function (req, res) {
    UserModel.find({}).exec(function (err, users) {
        res.send(users);
    });
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.Username = userData.Username.toLowerCase();
    userData.Salt = encryption.createSalt();
    userData.HashPassword = encryption.hashPassword(userData.Salt, userData.Password);

    UserModel.create(userData, function (err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error("Duplicate Username");
            }
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            req.login(user, function (err) {
                if (err) return next(err);
                res.send(user);
            });
        }
    });
};