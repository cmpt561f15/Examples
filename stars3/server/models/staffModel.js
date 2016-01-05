"use strict";

let mongoose = require('mongoose');

let StaffSchema = new mongoose.Schema({
    StaffNo: {type: Number},
    Username: {type: String},
    Firstname: {type: String},
    Lastname: {type: String},
    Password: {type: String},
    Type:{type: String},
    Program:{type: [String]}
});

module.exports = mongoose.model('Staff', StaffSchema);