
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

exports.updateUser = function (req, res) {
    var userUpdates = req.body;
    debugger;
    if(req.user[0]._id != userUpdates._id) {
        res.status(403);
        return res.end();
    }

    req.user[0].FirstName = userUpdates.FirstName;
    req.user[0].LastName = userUpdates.LastName;
    req.user[0].Username = userUpdates.Username;
    if(userUpdates.Password && userUpdates.Password.length > 0){
        req.user[0].Salt = encryption.createSalt();
        req.user[0].HashPassword = encryption.hashPassword(req.user[0].Salt, userUpdates.Password);
    }
    req.user[0].save(function(err) {
        if(err) { res.status(400); return res.send({ reason:err.toString() }); }
        res.send(req.user[0]);
    })
};