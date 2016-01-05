"use strict";
let express = require('express');
let starsController = require('../controllers/starsController');
let starsRouter = express.Router();

starsRouter.route('/login/:username/:password')
    .get((req, res) => starsController.login(req, res));

starsRouter.route('/staff/:type')
    .get((req, res) => starsController.getStaff(req, res));

starsRouter.route('/courses/:insId')
    .get((req, res) => starsController.getCourses(req, res));

starsRouter.route('/students')
    .get((req, res) => starsController.getStudents(req, res));

/*
starsRouter.route('/students/:programs')
    .get((req, res) => starsController.getStudentsByProgram(req, res));
*/

starsRouter.route('/programs/:adviserPrograms')
    .get((req, res) => starsController.getAdviserPrograms(req, res));

starsRouter.route('/actiontypes')
    .get((req, res) => starsController.getActionTypes(req, res));

starsRouter.route('/actions/:studentId/:actionBy/:username')
    .get((req, res) => starsController.getActions(req, res));

starsRouter.use('/actions/:actionId', (req, res, next) => starsController.getAction(req, res, next));
starsRouter.route('/actions/:actionId')
    .get((req, res) => starsController.getActionById(req, res))
    .put((req, res) => starsController.updateAction(req, res))
    .delete((req, res) => starsController.deleteAction(req, res));

starsRouter.post('/actions', (req, res)=> starsController.addAction(req, res));

module.exports = starsRouter;