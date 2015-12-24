var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var open = require('open');

var dbConnection = mongoose.connect('mongodb://localhost/heros', function(err) {
    if(!err) {
        var dbHelper = require('./server/models/dbHelper');
        dbHelper.initDb();
    }
});

var app = express();
//Allow serving static files
app.use(express.static(__dirname));

var port = process.env.PORT || 9080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var heroRouter = require('./server/routes/heroRoutes');


app.use('/api/heros', heroRouter);

app.listen(port, function(){
    console.log('Hero App is running my app on http://localhost:' + port);
    //open('http://localhost:' + port);
});