var mongoose = require('mongoose');

var heroSchema = new mongoose.Schema({
    name: {type: String},
    heroType: {type: String},
    quote: {type: String}
});

module.exports = mongoose.model('Hero', heroSchema);