var log = log4javascript.getLogger("main");
var appender = new log4javascript.InPageAppender();
log.addAppender(appender);
log.debug("This is a debugging message from the log4javascript in-page page");

replaceConsole(log);

this.logLevels = [log4javascript.Level.ALL,
                 log4javascript.Level.TRACE,
                 log4javascript.Level.DEBUG,
                 log4javascript.Level.INFO,
                 log4javascript.Level.WARN,
                 log4javascript.Level.ERROR,
                 log4javascript.Level.FATAL,
                 log4javascript.Level.OFF];

console.debug("replaced console");

var socket = io.connect('http://localhost');
socket.on('log', function(data) {
	for ( var int = 0; int < logLevels.length; int++) {
		var logLevel = logLevels[int];
		if(data.level == logLevel.name){
			data.level = logLevel;
			log.log(data.level, [data.params]);
			break;
		}
	}
});