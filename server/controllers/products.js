
var ProductsModel = require('mongoose').model('Product');

exports.getAllProducts = function (req, res) {
    ProductsModel.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createProduct = function(req, res) {
    debugger;
    var data = req.body;
    data.CreatedBy = req.user[0].Username.toLowerCase();
    data.CreatedOn = Date.now();

    if(data.Id && data.Id != null) {
        // Todo: Update Product
    } else {
        ProductsModel.create(data, function (err, product) {
            if(err) {
                res.status(400);
                return res.send({reason: err.toString()});
            } else {
                return res.send({product: product});
            }
        });
    }
};

exports.updateProduct = function (req, res) {
    return res.send({success: true});
};