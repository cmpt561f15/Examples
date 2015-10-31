var colors = ["red", "green", "blue"];

// Create Variables from Array
var [primaryColor, secondaryColor, tertiaryColor] = colors;

console.log(primaryColor);
console.log(secondaryColor);
console.log(tertiaryColor);


for(let value of ["a", "b", "c"]){
    console.log(value)
}
// "a"
// "b"
// "c"

let abcArray = [..."abc"];
console.log(abcArray) // ["a", "b", "c"]