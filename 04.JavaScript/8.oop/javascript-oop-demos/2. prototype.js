//adding a method to arrays to sum their number elements
Array.prototype.sum = function(){
  var sum = 0;
  for(var index in this){
    if(typeof this[index] === "number"){
      sum += this[index];
    }
  }
  return sum;
}

var numbers = [1,2,3,4,5];
console.log(numbers.sum());
//logs 15
