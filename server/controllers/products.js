
var path = require('path'),
    fs = require('fs'),
    jDate = require('jdate'),
    ProductsModel = require('mongoose').model('Product');

exports.getAllProducts = function (req, res) {
    ProductsModel.find({}).exec(function (err, collections) {
        res.send(collections);
    });
};

exports.createProduct = function(req, res) {

    var data = req.body.product;
    data.CreatedBy = req.user[0].Username.toLowerCase();
    data.CreatedOn = jDate.JDate().toString('yyyy/MM/dd HH:mm:ss');

    ProductsModel.create(data, function (err, product) {
        if (err) {
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            if(req.files && req.files.length > 0) {
                var rootFilePath = path.normalize(path.join(req.myConfig.siteImagePath, product._id.toString()));
                if (!fs.existsSync(rootFilePath))
                    fs.mkdirSync(rootFilePath);

                for (var i in req.files) {
                    var data = fs.readFileSync(req.files[i].path);
                    var filePath = path.normalize(path.join(rootFilePath, req.files[i].originalname));
                    fs.writeFileSync(filePath, data);
                    fs.unlinkSync(req.files[i].path);
                }
            }

            return res.send({product: product});
        }
    });
};

exports.updateProduct = function (req, res) {
    return res.send({success: true});
};