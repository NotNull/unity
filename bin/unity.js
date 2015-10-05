var r = require('responder');
var util = require("util");
var cp = require('child_process');

function Unity(){
	r.Responder.call(this);
	
	this.process = {};
	
	this.process.on = function(child, message){
		var event = message.event;
		var data = message.data;
		
		r.emit({
			event: event,
			child: child
		}, data);
	};

	this.process.emit = function(child){
		r.on({ event: '(.*)', child: child }, function(){			
			var ev = this.event;
			var data = Array.prototype.slice(arguments);
			
			data.pop();//last variable should be the callback; don't want that
			
			child.send({
				event: ev,
				data: data
			});
		});
	};
}

util.inherits(Unity, r.Responder);

Unity.prototype.spawn = function(path){
	var n = cp.fork(path);
	var u = this;
	
	n.on('message', function(){
		var args = Array.prototype.slice.call(arguments);
		args.unshift(n);
		
		u.process.on.apply(u, args);
	});
	
	this.process.emit(n, n.send);
	
	return n;
};

module.exports = new Unity();

module.exports.Unity = Unity;