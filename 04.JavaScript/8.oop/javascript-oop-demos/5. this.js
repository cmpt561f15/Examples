function Person(name) {
  this.name = name;
  this.whatIsThis = this;
  this.getName = function() {
    	return this.name;
  };
} 
var ali = new Person("Ali");
console.log(ali.getName()); //Ali

console.log(this); //this is the window in this case
console.log(ali.whatIsThis); //this is the object before the dot (.)
