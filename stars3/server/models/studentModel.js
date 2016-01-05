"use strict";

let mongoose = require('mongoose');

let StudentSchema = new mongoose.Schema({
    StudentId: {type: Number},
    FirstName: {type: String},
    LastName: {type: String},
    Gender: {type: String},
    Program: {type: String},
    GPA:{type: Number},
    CourseCRN:{type: Number},
    AtRiskCategory: {type: String},
    Semester: {type: String},
    Courses:{type: [Number]}
});

module.exports = mongoose.model('Student', StudentSchema);