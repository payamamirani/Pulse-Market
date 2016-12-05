
var auth = require('./auth'),
    User = require('../data/models/User');

module.exports = function(app) {

    app.get('/api/users', auth.requireRole('admin'), function (req, res) {
        User.find({}).exec(function (err, users) {
            res.send(users);
        });
    });

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });
    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}