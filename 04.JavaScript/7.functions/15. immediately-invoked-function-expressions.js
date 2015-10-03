var test = function(){
	console.log("invoked!");
}();

(function(){
	console.log("invoked!");
}());

(function(){
	console.log("invoked!");
})();

!function(){
	console.log("invoked!");
}();