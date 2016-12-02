

var mongoose = require('mongoose'),
    UserSchema = require('../schemas/UserSchema');

module.exports = function () {
    debugger;
    var User = mongoose.model('User', UserSchema);
    User.find({}).exec(function(err, users) {
        if(err) throw err;
        if(users.length === 0) {
            User.create({FirstName:"payam", LastName:"amirani", Username:"payam"});
            User.create({FirstName:"ali", LastName:"amirani", Username:"ali"});
            User.create({FirstName:"yasaman", LastName:"amirani", Username:"yasaman"});
        }
    });
    return User;
}();