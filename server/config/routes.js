
var auth = require('./auth'),
    userController = require('../controllers/users'),
    categoriesController = require('../controllers/categories');

module.exports = function(app) {

    app.get('/api/Categories', auth.requireRole('admin'), categoriesController.getAllCategories);
    app.post('/api/Categories', auth.requireRole('admin'), categoriesController.createCategories);
    app.put('/api/Categories', auth.requireRole('admin'), categoriesController.updateCategories);

    app.get('/api/users', auth.requireRole('admin'), userController.getAllUsers);
    app.post('/api/users', userController.createUser);
    app.put('/api/users', userController.updateUser);

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
};