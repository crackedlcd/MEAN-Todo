var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var database = require('./config/database')
mongoose.connect(database.url);

var Todo = require('./app/models/todo')

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

require('./app/routes')(app, router);

// Pointless but it helps show how middleware works
// router.use(function(req, res, next) {
//   console.log('Something is happening...');
//   next();
// });

app.listen(port);
console.log('Magic happing on port ' + port);

exports = module.exports = app;