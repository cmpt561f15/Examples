"use strict";
class StarsRepository {
    constructor() {
        this.Staff = require('./staffModel');
        this.Action = require('./actionModel');
        this.ActionType = require('./actionTypeModel');
        this.AdviserType = require('./adviserTypeModel');
        this.Course = require('./courseModel');
        this.Program = require('./programModel');
        this.Student = require('./studentModel');
    }

    emptyDB() { //in case needed during testing
        this.Staff.remove({}, function (err, results) {
        });
        this.Action.remove({}, function (err, results) {
        });
        this.ActionType.remove({}, function (err, results) {
        });
        this.AdviserType.remove({}, function (err, results) {
        });
        this.Course.remove({}, function (err, results) {
        });
        this.Program.remove({}, function (err, results) {
        });
        this.Student.remove({}, function (err, results) {
        });
    }

    loadDataFromJsonFiles() {
        let fs = require('fs');
        fs.readFile('./server/data/staff.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved staff from json data: ' + fileData);
                    let staff = JSON.parse(fileData);
                    for (let s of staff) {
                        let staffModel = new this.Staff(s);
                        staffModel.save();
                    }
                }
            });

        fs.readFile('./server/data/action.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved actions from json data: ' + fileData);
                    let actions = JSON.parse(fileData);
                    for (let a of actions) {
                        let actionModel = new this.Action(a);
                        actionModel.save();
                    }
                }
            });

        fs.readFile('./server/data/actiontype.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved actiontypes from json data: ' + fileData);
                    let actiontypes = JSON.parse(fileData);
                    for (let at of actiontypes) {
                        let actiontypeModel = new this.ActionType(at);
                        actiontypeModel.save();
                    }
                }
            });

        fs.readFile('./server/data/advisertype.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved advisertypes from json data: ' + fileData);
                    let advisertypes = JSON.parse(fileData);
                    for (let at of advisertypes) {

                        let advisertypeModel = new this.AdviserType(at);
                        advisertypeModel.save();
                    }
                }
            });

        fs.readFile('./server/data/course.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved courses from json data: ' + fileData);
                    let courses = JSON.parse(fileData);
                    for (let course of courses) {

                        let courseModel = new this.Course(course);  //create a new hero model instance and initialize it
                        courseModel.save();
                    }
                }
            });

        fs.readFile('./server/data/program.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved programs from json data: ' + fileData);
                    let programs = JSON.parse(fileData);
                    for (let program of programs) {
                        let programModel = new this.Program(program);
                        programModel.save();
                    }
                }
            });

        fs.readFile('./server/data/student.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved students from json data: ' + fileData);
                    let students = JSON.parse(fileData);
                    for (let s of students) {
                        let studentModel = new this.Student(s);
                        studentModel.save();
                    }
                }
            });
    }

    initDb() {
        //If the db is empty then init the db with data in json files
        this.Staff.find({},
            (err, staffs) => {
            console.log('Staff Count: ' + staffs.length);
            if (err)
                console.log(err);
            else if (staffs.length == 0) {
                this.loadDataFromJsonFiles();
            }
        });
    }
}

module.exports = new StarsRepository();