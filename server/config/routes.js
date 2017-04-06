
var multer = require('multer'),
    auth = require('./auth'),
    captcha = require('./captcha'),
    userController = require('../controllers/users'),
    categoriesController = require('../controllers/categories'),
    productsController = require('../controllers/products');

module.exports = function(app, config) {

    var upload = multer({ dest: config.templatePath });

    app.get('/api/Products', productsController.getAllProducts);
    app.post('/api/Products', auth.requireRole('admin'), upload.array('files'), productsController.createProduct);
    app.put('/api/Products', auth.requireRole('admin'), upload.array('files'), productsController.updateProduct);

    app.get('/api/Categories', categoriesController.getAllCategories);
    app.post('/api/Categories', auth.requireRole('admin'), categoriesController.createCategories);
    app.put('/api/Categories', auth.requireRole('admin'), categoriesController.updateCategories);

    app.get('/api/users', auth.requireRole('admin'), userController.getAllUsers);
    app.post('/api/users', userController.createUser);
    app.put('/api/users', auth.requireApiLogin, userController.updateUser);

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

    app.get('/captcha', captcha.captcha);

    app.get('*', function (req, res) {
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};