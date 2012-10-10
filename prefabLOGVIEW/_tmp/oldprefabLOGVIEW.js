var express = require('express'), 
	app = express(), 
	server = require('http').createServer(app),
	routes = require('./routes'),
	io = require('socket.io').listen(server);

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
	socket.emit('log', {level: level, params: params});
	socket.on('my other event', function(data) {
		console.log(data);
	});
});


function log(level, params){
	
}