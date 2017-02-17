
var ProductsModel = require('mongoose').model('Product');

exports.getAllProducts = function (req, res) {
    ProductsModel.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createProduct = function(req, res) {
    var data = req.body;
    data.CreatedBy = req.user[0].Username.toLowerCase();
    return res.send({success: true});
};

exports.updateProduct = function (req, res) {
    return res.send({success: true});
};