"use strict";

let mongoose = require('mongoose');

let ProgramSchema = new mongoose.Schema({
    Code: {type: String},
    Name: {type: String}

});

module.exports = mongoose.model('Program', ProgramSchema);