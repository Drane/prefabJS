var prefabLOG;
var extend = require("xtend");
var winston = require('winston');

module.exports = exports = prefabLOG = function prefabLOG_module(options) {

	var defaults = {
		attachLogView : true,
		module : "prefabLOG"
	};

	var settings = (options ? extend(defaults, options) : defaults);
	console.info("settings:", settings);

	var public_methods = {};

	console.log("in prefabLOG");

	if (settings.attachLogView)
		require('prefabLOGVIEW')();
/*
	[ 'log', 'debug', 'info', 'warn', 'error' ].forEach(function(item) {
		winston[item]("test " + item);
	});
*/
	var logger = new winston.Logger({
		transports : [ new winston.transports.Console({
			handleExceptions : true,
			json : true,
			colorize : true,
			timestamp: true
		}) ],
		exitOnError : false
	});

//	replaceConsole(logger);

	var originalConsoleFunctions = {
		log : console.log,
		debug : console.debug,
		info : console.info,
		warn : console.warn,
		error : console.error
	};

	function replaceConsole(logger) {
		function replaceWith(fn) {
			return function() {
				fn.apply(logger, arguments);
			};
		}
		// logger = logger || winston;
		[ 'log', 'debug', 'info', 'warn', 'error' ].forEach(function(item) {
//			console.dir(logger);
//			console.dir(logger['log']);
//			logger['log']('B', item);
//			logger.log('B', item);
//			logger.info('B', item);
			console[item]=replaceWith(item === 'debug'?logger.info:logger[item]);
//			console.log('A');
		});
		testConsoleLog('testConsoleLog');
//		console.log('testConsoleLog');
	}

	function testConsoleLog(msg) {
		[ 'log', 'debug', 'info', 'warn', 'error' ].forEach(function(item) {
			console[item](msg);
		});
	}
	
	function restoreConsole() {
		[ 'log', 'debug', 'info', 'warn', 'error' ].forEach(function(item) {
			console[item] = originalConsoleFunctions[item];
		});
	}

	function clear() {
		console.log('\033[2J');
		process.stdout.write('\u001B[2J\u001B[0;0f');
	}

	public_methods.clear = clear;

	return public_methods;
};