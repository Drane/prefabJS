var prefabLOG;
var extend = require("xtend");
var winston = require('winston');
var prefabLOGVIEW = require('prefabLOGVIEW')();

prefabLOGVIEW.startServer();

module.exports = exports = prefabLOG = function prefabLOG_module(options) {

	var defaults = {
		module : "prefabLOG"
	};

	var settings = (options ? extend(defaults, options) : defaults);
	console.info("settings:", settings);

	var public_methods = {};

	console.log("in prefabLOG");

	winston = require('winston');
	// Requiring `winston-syslog` will expose
	// `winston.transports.Syslog`
	require('winston-syslog').Syslog;
	winston.add(winston.transports.Syslog, options);

	replaceConsole(winston);

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
				console.log('A');
				fn.apply(logger, arguments);
			};
		}
		// logger = logger || winston;
		[ 'log', 'debug', 'info', 'warn', 'error' ].forEach(function(item) {
			console.dir(logger);
			console.dir(logger['log']);
			logger['log']('B', item);
			logger.log('B', item);
			logger.info('B', item);
			console[item] = replaceWith(item === 'log' ? logger.info
					: logger[item]);
			console.log('A');
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