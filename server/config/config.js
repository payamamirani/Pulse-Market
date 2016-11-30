
var path = require('path');
var rootPath = path.normalize(path.join(__dirname, '../..'));
var publicPath = path.normalize(path.join(rootPath, 'public'));
var viewPath = path.normalize(path.join(rootPath, 'server/views'));
module.exports = {
    development: {
        rootPath: rootPath ,
        publicPath: publicPath ,
        viewPath: viewPath ,
        db: "mongodb://localhost/multivision" ,
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath ,
        publicPath: publicPath ,
        viewPath: viewPath ,
        db: "mongodb://appuser:multivision123@ds027145.mlab.com:27145/multivision" ,
        port: process.env.PORT || 8000
    }
}