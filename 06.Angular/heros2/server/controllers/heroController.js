"use strict";
class HeroController {
    constructor() {
        this.Hero = require('../models/heroModel');
    }

    addHero(req, res) {
        let hero = new this.Hero(req.body);
        hero.save();
        console.log("heroController.addHero", hero);
        res.status(201).send(hero);
    }

    getHeros(req, res) {
        let query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        this.Hero.find(query, function (err, heros) {
            if (err)
                res.status(500).send(err);
            else
                res.json(heros);
        });
    }

    loadHero(req, res, next) {
        this.Hero.findById(req.params.heroId, function (err, hero) {
            if (err)
                res.status(500).send(err);
            else if (hero) {
                req.hero = hero;
                next();
            }
            else {
                res.status(404).send('No hero found');
            }
        });
    }

    getHero (req, res) {
        res.json(req.hero);
    }

    updateHero (req, res) {
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
    }

    deleteHero (req, res) {
        req.hero.remove(function (err) {
            if (err)
                res.status(500).send(err);
            else {
                res.status(204).send('Removed');
            }
        });
    }
    
};

module.exports = new HeroController();