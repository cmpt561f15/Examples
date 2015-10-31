var names = new Set();
names.add('Samir');
names.add('Fatima');
names.add('Mariam');
names.add('Ahmed');
names.add('Samir'); // won't be added

console.log(names);

for (let name of names) {
    console.log(name);
}

var mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add("some text");
var o = {a: 1, b: 2};
mySet.add(o);

mySet.has(1); // true
mySet.has(3); // false, 3 has not been added to the set
mySet.has(5);              // true
mySet.has(Math.sqrt(25));  // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 4

mySet.delete(5); // removes 5 from the set
mySet.has(5);    // false, 5 has been removed

mySet.size; // 3, we just removed one value

console.log(mySet);

var map = new Map();
map.set(1, 'a');
map.set(2, 'b');

for (let pair of map) {
    console.log(pair)
}
for (let key of map.keys()) {
    console.log(key)
}
for (let value of map.values()) {
    console.log(value)
}