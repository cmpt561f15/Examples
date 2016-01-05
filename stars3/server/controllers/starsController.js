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

    login(req, res) {
        console.log("login using: ", req.params.username, req.params.password);

        let promise = this.Staff.findOne({Username: req.params.username, Password: req.params.password}).exec();
        let userToReturn;
        promise.then(user => {
                if (!user) { // if null just return it
                    return user;
                }
                userToReturn = user.toObject();
                //If adviser get details of their programs
                if (user.Type === 'Adviser') {
                    return this.Program.find({Code: {$in: user.Program}}).exec();
                }
                //If faculty get their courses
                else if (user.Type === 'Faculty') {
                    return this.Course.find({InstructorId: user.StaffNo}).exec();
                }
                else {
                    return userToReturn;
                }
            })
            .then(results => {
                if (!userToReturn) {
                    res.status(403).send("Login failed. Invalid username and/or password");
                }
                else {
                    //Attach the results to the user object to return
                    if (userToReturn.Type === 'Adviser') {
                        userToReturn.Programs = results;
                    } else if (userToReturn.Type === 'Faculty') {
                        userToReturn.Courses = results;
                    }
                    res.send(userToReturn);
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send(err)
            });
    }

    getStudents(req, res){
        let query = this.Student.find();
        console.log("getStudents.req.query.programs: ", req.query.programs);
        if(req.query.programs) {
            query.where({Program: {$in: req.query.programs.split(",")}});
        }

        //To access query string (values after ? in the url) you can use req.query
        console.log("getStudents.req.query.courses: ", req.query.courses);
        if(req.query.courses) {
            query.where({Courses: {$in: req.query.courses.split(",")}});
        }

        query.exec(function (err, students) {
            if (err)
                res.status(500).send(err);
            else{
                res.json(students);
            }
        });
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

    getActions(req, res) {
        console.log("getActions for StudentId " + req.params.studentId);
        let query = this.Action.find().where('Students').in([req.params.studentId]);

        if (req.params.actionBy === 'all' || req.params.actionBy === 'Me') {
            let promise = req.params.actionBy === 'all' ? query.exec() :
                query.where({ByWhom: req.params.username}).exec();

            promise.then(results => res.send(results))
                .catch(err => res.status(500).send(err));
        }
        else {
            //Get advisers, faculty or coordinators depending on the actionBy parameter
            let promise = this.Staff.find({Type: req.params.actionBy}).exec();

            promise.then(staff => {
                    let usernames = staff.map(s => s.Username);
                    console.log(`Staff of type - ${req.params.actionBy} : `, usernames);
                    return query.where('ByWhom').in(usernames).exec();
                })
                .then(results => res.send(results))
                .catch(err => res.status(500).send(err));
        }
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
                res.status(204).send(`Action ${req.action._id} removed`);
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
                res.status(200).send(`Action ${req.action._id} updated`);
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