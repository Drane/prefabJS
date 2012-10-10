var domready = require('domready');
var shoe = require('shoe');
var dnode = require('dnode');

domready(function () {
    var result = document.getElementById('result');
    var stream = shoe('/dnode');

    var d = dnode();
    d.on('remote', function (remote) {
        remote.transform('beep', function (s) {
            console.debug('beep => ' + s);
        });
//        [ 'log', 'debug', 'info', 'warn', 'error' ]
        remote.log('log', function (level, params) {
        	console.debug('in remote.log');
        	console.log(level, params);
        });
    });
    d.pipe(stream).pipe(d);
});