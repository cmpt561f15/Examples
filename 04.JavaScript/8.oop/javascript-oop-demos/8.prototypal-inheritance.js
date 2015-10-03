//watch this demo http://www.youtube.com/watch?v=giJV6boOLxU
//reply the demo using Chrome JS Console
var Organism = Object.create(Object.prototype);
var Animal = Object.create(Organism);
var Mammal = Object.create(Animal);
var Dog = Object.create(Mammal);
var Spot = Object.create(Dog);

//Add some properties to the Organism and the Mammal Objects:
Mammal.hasHair = true;
Organism.hasHair = false;

//Define some properties for the Dog object:
Dog.numLegs = 4;
Dog.speak = function() {
        return 'woof, woof!';
};

//Finally I define some variables for Spot
Spot.color = 'White';
Spot.pattern = 'Spots';
Spot.patternColor = 'Black';
Spot.weight = 22;
