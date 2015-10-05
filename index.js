var unity = require('./bin/unity');

unity.on('/test/:name', function(name, next){
	console.log(this);
	
	next(name);

});

unity.on('/parent/:name', function(name, next){
	console.log('PARENT ', name);
	
});

var s = unity.spawn(__dirname + '/child.js');

setTimeout(function(){

	unity.emit('/child/joe', function(){
		//console.log(arguments);
	});
	
}, 1000);