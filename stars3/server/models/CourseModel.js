"use strict";

let mongoose = require('mongoose');

let CourseSchema = new mongoose.Schema({
    CRN: {type: Number},
    CourseCode: {type: String},
    CourseName: {type: String},
    Semester: {type: String},
    InstructorId: {type: Number}
});

module.exports = mongoose.model('Course', CourseSchema);