var r = require('responder');

r.on('/child/:childName', function(){
	console.log('Child ', arguments);
});

r.emit('/parent/awesome', function(){
	console.log('Child emit cb ', arguments);
});

console.log('I AM A CHILD');