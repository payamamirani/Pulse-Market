
var CategoriesModel = require('mongoose').model('Category');

exports.getAllCategories = function (req, res) {
    CategoriesModel.find({}).exec(function (err, categories) {
        res.send(categories);
    });
};

exports.createCategories = function(req, res) {
    var categoryData = req.body;
    categoryData.CreatedBy = req.user[0].Username.toLowerCase();
    if(!categoryData.ParentId) {
        CategoriesModel.create(categoryData, function (err, category) {
            if (err) {
                res.status(400);
                return res.send({reason: err.toString()});
            } else {
                res.send(category);
            }
        });
    } else {
        var child = new CategoriesModel();
        child.Title = categoryData.Title;
        child.CreatedBy = req.user[0].Username.toLowerCase();
        CategoriesModel.findOneAndUpdate({_id: categoryData.ParentId}, { $push: { Child: child }} ,
            {safe:true, upsert: true}, function(err, category) {
            if(err) {
                res.status(400);
                return res.send({reason: err.toString()});
            } else {
                res.send(category);
            }
        });
    }
};

exports.updateCategories = function (req, res) {
    var categoryData = req.body;
    if(!categoryData.ParentId) {
        CategoriesModel.findOneAndUpdate({_id: categoryData.Id}, {$set: {Title: categoryData.Title}}, {new: true},
            function (err, category) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                } else {
                    res.send(category);
                }
            });
    } else {
        CategoriesModel.update({"Child._id": categoryData.Id},
            {$set: {'Child.$.Title': categoryData.Title}}, {new: true},
            function (err, category) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                } else {
                    res.send(category);
                }
            });
    }
};