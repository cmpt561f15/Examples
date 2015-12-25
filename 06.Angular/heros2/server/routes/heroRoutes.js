"use strict";
let express = require('express');
let Hero = require('../models/heroModel');

let heroRouter = express.Router();

heroRouter.route('/')
    .post(function (req, res) {
        let hero = new Hero(req.body);
        hero.save();
        console.log("Hero Service - post request to /heros", hero);
        res.status(201).send(hero);
    })
    .get(function (req, res) {

        let query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Hero.find(query, function (err, heros) {
            if (err)
                res.status(500).send(err);
            else
                res.json(heros);
        });
    });

heroRouter.use('/:heroId', function (req, res, next) {
    Hero.findById(req.params.heroId, function (err, hero) {
        if (err)
            res.status(500).send(err);
        else if (hero) {
            req.hero = hero;
            next();
        }
        else {
            res.status(404).send('no hero found');
        }
    });
});

heroRouter.route('/:heroId')
    .get(function (req, res) {

        res.json(req.hero);

    })
    .put(function (req, res) {
        if (req.body._id)
            delete req.body._id;

        for (let p in req.body) {
            req.hero[p] = req.body[p];
        }
        
        req.hero.save(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.json(req.hero);
            }
        });
    })
    .delete(function (req, res) {
        req.hero.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(204).send('Removed');
            }
        });
    });


module.exports = heroRouter;