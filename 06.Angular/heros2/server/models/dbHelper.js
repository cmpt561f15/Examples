var dbHelper = {
    initDb: function () {
        //If the heros collections is empty then init the db with heros.json
        //ToDo: improve the modularity and placement of this code
        var Hero = require('./heroModel');
        Hero.find({}, function (err, heros) {
            console.log(heros.length);
            if (err)
                console.log(err);
            else if (heros.length === 0) {
                console.log(heros);

                var fs = require('fs');
                fs.readFile('./server/data/heros.json', 'UTF-8', function (err, fileData) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Retrieved file data: ' + fileData);
                        var heros = JSON.parse(fileData);
                        for (var i in heros) {
                            var hero = heros[i];
                            delete hero.id; //delete _id property
                            hero = new Hero(hero);  //create a new hero model instance and initialize it
                            hero.save();
                        }
                    }
                });
            }
        });
    }
};

module.exports = dbHelper;