"use strict";

let mongoose = require('mongoose');

let AdviserTypeSchema = new mongoose.Schema({
    Type: {type: String}

});

module.exports = mongoose.model('AdviserType', AdviserTypeSchema);