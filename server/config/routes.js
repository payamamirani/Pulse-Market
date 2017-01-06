
var auth = require('./auth'),
    svgCaptcha = require('svg-captcha'),
    userController = require('../controllers/users'),
    categoriesController = require('../controllers/categories');

module.exports = function(app) {

    app.get('/api/Categories', auth.requireRole('admin'), categoriesController.getAllCategories);
    app.post('/api/Categories', auth.requireRole('admin'), categoriesController.createCategories);
    app.put('/api/Categories', auth.requireRole('admin'), categoriesController.updateCategories);

    app.get('/api/users', auth.requireRole('admin'), userController.getAllUsers);
    app.post('/api/users', userController.createUser);
    app.put('/api/users', userController.updateUser);

    app.post('/api/forgotPassword', userController.forgotPassword);
    app.post('/api/resetPassword', userController.resetPassword);

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function (req, res) {
        req.logout();
        res.end();
    });

    app.get('/captcha', function(req, res) {
        var captcha = svgCaptcha.create({
            size: 5,
            ignoreChars: '01iIloO',
            color: true,
            background: "#f5f5f5",
            noise: 2
        });
        req.session.captcha = captcha.text.toLowerCase();

        res.set('Content-Type', 'image/svg+xml');
        res.status(200).send(captcha.data);
    });

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};