
var path = require('path'),
    fs = require('fs');

exports.addFile = function (filePath, data, req, res) {
    filePath = path.normalize(path.join(filePath, req.file.originalname));
    fs.writeFile(filePath , data, function(err) {
        if(err) res.send(err);
        fs.unlink(req.file.path, function(err) {
            if(err) res.send(err);
            res.redirect('back');
        });
    });
};