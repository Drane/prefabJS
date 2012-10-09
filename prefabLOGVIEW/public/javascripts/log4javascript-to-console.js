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
//			console.log('A');
			fn.apply(logger, arguments);
		};
	}
	// logger = logger || winston;
	[ 'log', 'debug', 'info', 'warn', 'error' ]
			.forEach(function(item) {
//				console.dir(logger);
//				console.dir(logger['log']);
//				logger['log']('B', item);
//				logger.log('B', item);
//				logger.info('B', item);
				console[item] = replaceWith(item === 'log' ? logger.info
						: logger[item]);
//				console.log('A');
			});
}

function restoreConsole() {
	[ 'log', 'debug', 'info', 'warn', 'error' ].forEach(function(item) {
		console[item] = originalConsoleFunctions[item];
	});
}
