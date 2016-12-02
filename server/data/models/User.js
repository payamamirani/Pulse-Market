

var mongoose = require('mongoose'),
    UserSchema = require('../schemas/UserSchema'),
    fns = require('../../common/functions');

module.exports = function () {
    var User = mongoose.model('User', UserSchema);
    User.find({}).exec(function(err, users) {
        if(err) throw err;
        if(users.length === 0) {
            var salt, pass;
            salt = fns.createSalt();
            pass = fns.hashPassword(salt, "payam");
            User.create({FirstName:"payam", LastName:"amirani", Username:"payam", Salt: salt, HashPassword: pass});
            salt = fns.createSalt();
            pass = fns.hashPassword(salt, "ali");
            User.create({FirstName:"ali", LastName:"amirani", Username:"ali", Salt: salt, HashPassword: pass});
            salt = fns.createSalt();
            pass = fns.hashPassword(salt, "yasaman");
            User.create({FirstName:"yasaman", LastName:"amirani", Username:"yasaman", Salt: salt, HashPassword: pass});
        }
    });
    return User;
}();