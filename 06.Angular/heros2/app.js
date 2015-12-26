"use strict";

let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    open = require('open');

let dbConnection = mongoose.connect('mongodb://localhost/heros', function(err) {
    if(!err) {
        let heroRepository = require('./server/models/heroRepository');
        heroRepository.initDb();
    }
});

let app = express();
//Allow serving static files
app.use(express.static(__dirname));

let port = process.env.PORT || 9080;

app.use(bodyParser.urlencoded({extended:true}));
//aut-deserialize the body of incoming request to a json object
app.use(bodyParser.json());

let heroRouter = require('./server/routes/heroRoutes');
app.use('/api/heros', heroRouter);

app.listen(port, function(){
    console.log('Hero App is running my app on http://localhost:' + port);
    //open('http://localhost:' + port);
});