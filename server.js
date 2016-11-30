
var express = require('express'),
    path = require('path'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(src, path) {
    return stylus(src).set('filename', path);
}

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(stylus.middleware({
    src: path.join(__dirname, 'public'),
    compile: compile
}));
app.use(express.static(path.join(__dirname, 'public')));

if(env === "development") {
    mongoose.connect("mongodb://localhost/multivision");
} else {
    mongoose.connect("mongodb://appuser:multivision123@ds027145.mlab.com:27145/multivision");
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error ...'));
db.once('open', function callback(){
    console.log('multivision db opened.');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    if(err) console.error.bind(console, 'Not Found Any Message ...!');
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath)
});

app.get('*', function(req, res) {
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Listening on port ' + port + ' .');
});
