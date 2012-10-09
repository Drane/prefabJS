process.stdout.write('\u001B[2J\u001B[0;0f');
var prefabLOGVIEW = require('./index.js')();

prefabLOGVIEW.startServer();

setInterval(function() {
	prefabLOGVIEW
}, 5000 );