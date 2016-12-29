
var CategoriesModel = require('mongoose').model('Category');

exports.getAllCategories = function (req, res) {
    CategoriesModel.find({}).exec(function (err, categories) {
        res.send(categories);
    });
};

exports.createCategories = function(req, res) {
    var categoryData = req.body;
    categoryData.CreatedBy = req.user[0].Username.toLowerCase();

    CategoriesModel.create(categoryData, function (err, category) {
        if(err) {
            res.status(400);
            return res.send({reason: err.toString()});
        } else {
            res.send(category);
        }
    });
};

exports.updateCategories = function (req, res) {
    res.send({success: true});
};