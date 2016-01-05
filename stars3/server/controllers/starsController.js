"use strict";
class StarsController {

    constructor() {
        this.Staff = require('../models/staffModel');
        this.Course = require('../models/courseModel');
        this.Student = require('../models/studentModel');
        this.Program = require('../models/programModel');
        this.ActionType = require('../models/actionTypeModel');
        this.Action = require('../models/actionModel');
    }

    login(req, res){
        console.log("login. Username", req.params.username);
        console.log("password", req.params.password);
        this.Staff.findOne({ Username: req.params.username, Password: req.params.password},
            (err, staff) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log(staff);
                    res.json(staff);
                }
            });
    }

    getStaff(req, res){
        this.Staff.find({ Type: req.params.type}, function (err, staff) {
            if (err)
                res.status(500).send(err);
            else{
                res.json(staff);
            }
        });
    }

    getCourses(req, res){
        this.Course.find({InstructorId: req.params.insId}, function (err, courses) {
            if (err)
                res.status(500).send(err);
            else{
                res.json(courses);
            }
        });
    }

    getStudents(req, res){
        this.Student.find({}, function (err, students) {
            if (err)
                res.status(500).send(err);
            else{
                res.json(students);
            }
        });
    }

    getStudentsByProgram(req, res){
        this.Student.find( { Program: { $in: req.params.programs.split(",") } } , function (err, students) {
            if (err)
                res.status(500).send(err);
            else{
                res.json(students);
            }
        }).sort('StudentId');
    }

    getAdviserPrograms(req, res){
        this.Program.find( {Code: { $in: req.params.adviserPrograms.split(",") } } , function (err, programs) {
            if (err)
                res.status(500).send(err);
            else{
                res.json(programs);
            }
        });
    }

    getActionTypes(req, res){
        this.ActionType.find( { } , function (err, actionTypes) {
            if (err)
                res.status(500).send(err);
            else{
                actionTypes = actionTypes.map(a => a.Type);
                res.json(actionTypes);
            }
        });
    }

    getAdvisers(req, res, next){
        this.Staff.find({ Type: 'Adviser'}, function (err, staff) {
            if (err)
                res.status(500).send(err);
            else{
                req.advisers = staff.map(s => s.Username);
                next();
            }
        });
    }

    getCoordinators(req, res, next){
        this.Staff.find({ Type: 'Coordinator'}, function (err, staff) {
            if (err)
                res.status(500).send(err);
            else{
                req.coordinators = staff.map(s => s.Username);
                next();
            }
        });
    }

    getFaculty(req, res, next){
        this.Staff.find({ Type: 'Faculty'}, function (err, staff) {
            if (err)
                res.status(500).send(err);
            else{
                req.faculty = staff.map(s => s.Username);
                next();
            }
        });
    }

    getActions(req, res){
        console.log(req.params.studentId);
        let query = this.Action.find().where('Students').in([req.params.studentId]);

        switch (req.params.actionBy){
            case 'Me':
                query.where({ ByWhom: req.params.username});
                break;
            case 'Adviser':
                query.where('ByWhom').in(req.advisors);
                //actions = actions.filter(a => advisors.indexOf(a.ByWhom) >= 0);
                break;
            case 'Coordinator':
                query.where('ByWhom').in(req.coordinators);
                //actions = actions.filter(a => coordinators.indexOf(a.ByWhom) >= 0);
                break;
            case 'Faculty':
                query.where('ByWhom').in(req.faculty);
                //actions = actions.filter(a => coordinators.indexOf(a.ByWhom) < 0
                    //&& advisors.indexOf(a.ByWhom) < 0);
                break;
        }

        query.exec(function(err, results) {
            if (err) {
                res.status(500).send(err);
             } else {
                res.send(results);
                //console.log(results);
            }
        });
    }

    getAction (req, res, next) {
        this.Action.findById(req.params.actionId,
            (err, action) => {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    if (action) {
                        req.action = action;
                        next();
                    }
                    else {
                        res.status(404).send('no action found');
                    }
                }
        });
    }

    getActionById (req, res) {
        res.json(req.action);
    }

    deleteAction (req, res){
        req.action.remove((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.status(204).send('Action Removed');
            }
        });
    }

    updateAction (req, res) {
        if (req.body._id) {
            delete req.body._id;
        }

        for (let p in req.body) {
            req.action[p] = req.body[p];
        }
        req.action.save((err) => {
            if (err) {
                res.status(500).send(err);
            }
            else {
                res.json(req.action);
            }
        });
    }

    addAction (req, res) {
        let action = new this.Action(req.body);
        action.save();
        console.log("Action added", action);
        res.status(201).send(action);
    }
}

module.exports = new StarsController();