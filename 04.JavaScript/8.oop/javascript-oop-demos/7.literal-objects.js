var person = {
    firstName: 'Samir',
    lastName: 'Saghir',
    height: 54,
    name : function() 
      	{
            return this.firstName + ' ' + this.lastName;
        }
};

//Two ways to access the object properties
console.log(person['height'] === person.height);
console.log(person.name());

//Serialise the object to a string in JSON format -- only attributes getr serialised
var jsonString = JSON.stringify(person);
console.log(jsonString);

//Deserialise a JSON string to an object
//Create an object from a string!
//More info @ https://developer.mozilla.org/en-US/docs/JSON
var personObject = JSON.parse(jsonString);
console.log(personObject);