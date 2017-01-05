
var UserModel = require('mongoose').model('User'),
    encryption = require('../utilities/encryption'),
    mail = require('../config/mail');

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

exports.resetPassword = function(req, res) {
    var data = req.body;
    if(data.captcha.toLowerCase() !== req.session.captcha)
        return res.send({success: false, error: req.i18n_texts.InvalidSecurityCode});

    data.username = data.username.toLowerCase();
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 2);
    var query = { Username: data.username };
    var update = { Token: encryption.createSalt(), TokenExpireDate: expireDate };
    var options = { new: true };

    UserModel.findOneAndUpdate(query, update, options, function(err, user) {
        if (err) return res.send({success: false, error: err.toString()});
        if (!user) return res.send({success: false, error: req.i18n_texts.UsernameNotFound});
        mail.SendMail(user.Username, req.i18n_texts.ResetPasswordEmailSubject, "resetPassword", function (err) {
            if (err) return res.send({success: false, error: err.toString()});
            return res.send({success: true});
        });
    });
};