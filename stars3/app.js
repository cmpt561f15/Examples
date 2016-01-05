"use strict";
let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    open = require('open');

/* Very important
This makes Mongoose async operations, like .save() and queries,
return ES6 Promises. This means that you can do things like MyModel.findOne({}).then()
 */
mongoose.Promise = global.Promise;

let dbConnection = mongoose.connect('mongodb://localhost/stars', function(err) {
    if(!err) {
        let starsRepository = require('./server/models/starsRepository');
        starsRepository.initDb();
    }
});

let app = express();
//Allow serving static files
app.use(express.static(__dirname));

let port = process.env.PORT || 9080;

app.use(bodyParser.urlencoded({extended:true}));
//aut-deserialize the body of incoming request to a json object
app.use(bodyParser.json());

let starsRouter = require('./server/routes/starsRoutes');


app.use('/api/stars', starsRouter);

app.listen(port, function(){
    console.log('STARS App is running my app on http://localhost:' + port);
    //open('http://localhost:' + port);
});