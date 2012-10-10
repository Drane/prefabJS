process.stdout.write('\u001B[2J\u001B[0;0f');
var prefabLOGVIEW = require('./prefabLOGVIEW.js')();

setInterval(function() {
	["ALL","TRACE","DEBUG","INFO","WARN","ERROR","FATAL","OFF"].forEach(function(item) {
		prefabLOGVIEW.log(item, {test: "test"});
	});
}, 1000 );

