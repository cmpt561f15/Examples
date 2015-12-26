//Look at this super-slim, happy and joyful router after kicking out all the logic to the controller 
"use strict";
let express = require('express');
let heroController = require('../controllers/heroController');

let heroRouter = express.Router();

heroRouter.route('/')
    .post((req, res) => heroController.addHero(req, res))
    .get((req, res) => heroController.getHeros(req, res));

heroRouter.use('/:heroId', (req, res, next) => heroController.loadHero(req, res, next));

heroRouter.route('/:heroId')
    .get((req, res) => heroController.getHero (req, res))
    .put((req, res) => heroController.updateHero (req, res))
    .delete((req, res) => heroController.deleteHero (req, res));

module.exports = heroRouter;

