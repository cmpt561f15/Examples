function timeLeft(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    // return two values in array
    return [mins, secs];
}

//We can use destructing to create variables m and s from the returned array
let [m,s] = timeLeft(450);
let sentence = `You've got ${m ? `${m} minutes and ` : ` `}${s} seconds left!`;

console.log(m,s);
console.log(sentence);