
var mongoose = require('mongoose');

module.exports = function () {
    var UserShcema = mongoose.Schema({
        FirstName: String,
        LastName: String,
        Username: String
    });
    return UserShcema;
}();