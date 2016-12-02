
var mongoose = require('mongoose'),
    fns = require('../../common/functions');

module.exports = function () {
    var UserShcema = mongoose.Schema({
        FirstName: String,
        LastName: String,
        Username: String,
        Salt: String,
        HashPassword: String
    });

    UserShcema.methods = {
        authenticate: function (passwordToMatch) {
            return fns.hashPassword(this.Salt, passwordToMatch) === this.HashPassword;
        }
    };

    return UserShcema;
}();