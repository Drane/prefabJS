var prefabLOGVIEW;
var extend = require("xtend");
var express = require('express');
var routes = require('./routes');
//var sock = require('sockjs');
var shoe = require('shoe');
var dnode = require('dnode');

module.exports = exports = prefabLOGVIEW = function prefabLOGVIEW_module(options){
	var defaults = {
	};
	
	var settings = (options?extend(defaults, options):defaults);
	
	var public_methods = {};
	
	console.log("in prefabLOGVIEW");
	
	function startServer(){
		var app = module.exports = express();

		// Configuration

		app.configure(function(){
		  app.use(express.logger());
		  app.set('port', 3000);
		  app.set('view engine', 'jade');
		  app.set('views', __dirname + '/views');
		  app.use(express.bodyParser());
		  app.use(express.methodOverride());
		  app.use(app.router);
		  app.use(express.static(__dirname + '/public'));
//		  app.use(logErrors);
//		  app.use(clientErrorHandler);
//		  app.use(errorHandler);
		});
		
//		function logErrors(err, req, res, next) {
//			  console.error(err.stack);
//			  next(err);
//			}
//		function clientErrorHandler(err, req, res, next) {
//			  if (req.xhr) {
//			    res.send(500, { error: 'Something blew up!' });
//			  } else {
//			    next(err);
//			  }
//			}
		
//		function errorHandler(err, req, res, next) {
//			  res.status(500);
//			  res.render('error', { error: err });
//			}
		
		app.configure('development', function(){
		  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
		});

		app.configure('production', function(){
		  app.use(express.errorHandler());
		});

		// Routes

		app.get('/', routes.index);

//		app.listen(process.env.port || 3000);
		
		
		
		var sock = shoe(function (stream) {
		    var d = dnode({
		        transform : function (s, cb) {
		            var res = s.replace(/[aeiou]{2,}/, 'oo').toUpperCase();
		            cb(res);
		        }
//		    ,
//			    log : function (level, params, cb) {
//			    	var res = s.replace(/[aeiou]{2,}/, 'oo').toUpperCase();
//			    	cb(level, params);
//			    }
		    });
		    d.pipe(stream).pipe(d);
		});
		sock.install(app.listen(process.env.port || app.get('port')), '/dnode'); 
		console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
	}
	
	function log(level, params){
		
	}
	
	public_methods.startServer = startServer;
	
	return public_methods;
};