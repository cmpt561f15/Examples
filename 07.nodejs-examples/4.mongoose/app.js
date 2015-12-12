var express = require('express');

var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/routes');

// Mongoose ODM...
var mongoose = require('mongoose');

// Connect to MongoDB...
//mongoose.connect('mongodb://erradi:demo2015@ds027335.mongolab.com:27335/qudb');
//mongoose.connect('mongodb://demo:standup123@ds052827.mongolab.com:52827/standupmeetingnotes');
mongoose.connect('mongodb://localhost/StandupMeetingNotes');

var app = express();

// assign the swig view engine to .html files...
var swig = require('swig');
app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.set('port', 9090); //process.env.PORT || 3000

app.listen(app.get('port'), function() {
    console.log('Express server listening @ http://localhost:' + app.get('port'));
});

