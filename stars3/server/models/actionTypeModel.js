"use strict";

let mongoose = require('mongoose');

let ActionTypeSchema = new mongoose.Schema({
    Type: {type: String}

});

module.exports = mongoose.model('ActionType', ActionTypeSchema);