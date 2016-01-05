"use strict";

let mongoose = require('mongoose');

let ActionSchema = new mongoose.Schema({
    ActionId: {type: Number},
    Date: {type: String},
    ActionType: {type: String},
    Title: {type: String},
    Description: {type: String},
    ByWhom:{type: String},
    CourseCRN:{type: Number},
    Students:{type: [Number]}
});

module.exports = mongoose.model('Action', ActionSchema);