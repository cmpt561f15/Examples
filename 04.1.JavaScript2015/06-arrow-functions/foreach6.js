var myArray = [1, 2, 3];


var sum = function(array) {
    var total = 0;
    array.forEach(item => total = total + item);
    return total;
}

var total = sum(myArray);
console.log(total);