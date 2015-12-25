"use strict";
class HeroRepository {
    constructor() {
        this.Hero = require('./heroModel');
    }

    initDb () {
        //If the heros collections is empty then init the db with heros.json
        //this.Hero.remove({}, function (err, results) {}); //uncomment to empty Heros collection and re-init DB
        this.Hero.find({}, (err, heros) => {
            console.log('Number of existing heros:', heros.length);
            if (err)
                console.log(err);
            else if (heros.length === 0) {
                this.loadDataFromJsonFile();
            }
        });
    }

    loadDataFromJsonFile() {
        let fs = require('fs');
        fs.readFile('./server/data/heros.json', 'UTF-8',
            (err, fileData) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Retrieved heros from json data: ' + fileData);
                    let heros = JSON.parse(fileData);
                    for (let hero of heros) {
                        delete hero.id; //delete id property because MongoDB will manage and auto-generate _id
                        let heroModel = new this.Hero(hero);  //create a new hero model instance and initialize it
                        heroModel.save();
                    }
                }
            });
    }
};

module.exports = new HeroRepository();