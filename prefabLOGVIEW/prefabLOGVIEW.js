var prefabLOGVIEW;
var extend = require("xtend");

var express = require('express'), 
app = express(), 
server = require('http').createServer(app),
routes = require('./routes'),
io = require('socket.io').listen(server);

module.exports = exports = prefabLOGVIEW = function prefabLOGVIEW_module(options){
	var defaults = {
		log4javascriptLevels: ["ALL","TRACE","DEBUG","INFO","WARN","ERROR","FATAL","OFF"]	
	};
	
	this.settings = (options?extend(defaults, options):defaults);
	
	var public_methods = {};
	
	console.log("in prefabLOGVIEW");
	this.mainSocket = null;
	
	server.listen(8080);
	
	app.configure(function() {
		app.use(express.logger());
		app.set('port', 3000);
		app.set('view engine', 'jade');
		app.set('views', __dirname + '/views');
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});

	app.get('/', routes.index);
	
	io.sockets.on('connection', function(socket) {
		mainSocket = socket;
		socket.on('log', function(data) {
			console.log(data);
			log(data.level, data.params);
		});
	});
	
	function log(level, params){
		if(mainSocket)
			mainSocket.emit('log', {level: level, params: params});
		else
			console.log(level, params);
	}
	
	public_methods.log = log;
	
	return public_methods;
};