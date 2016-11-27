
var express = require('express'),
    path = require('path');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.render('index');
});

var port = 3000;
app.listen(port, function(){
   console.log('Listening on port ' + port + ' .');
});