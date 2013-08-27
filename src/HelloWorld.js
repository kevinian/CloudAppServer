var http = require('http');
var express = require('express');
//var connect = require('connect');

var app = express();

app.use(express.favicon())
   .use(express.logger('dev'))
   .use(express.bodyParser());

app.use(function (req, res, next) {
    console.log("first middle ware");                                                                                                             
    next();
});

app.get('/', function(req, res){
//	if (req.url === '/favicon.ico') {
//		res.writeHead(200, {'Content-Type': 'image/x-icon'} );
//		res.end();
//	    console.log('favicon requested');
//	    return;
//	}
	
	console.log('New coming request');
	console.log('Request URL: ' + req.url);
	res.send('Hello World');
//	res.writeHead(200, {'Content-Type': 'text/plain'});
//	res.end('Hello World\n');
  
});

app.listen(8888);
console.log('Express started on port 8888');


//http.createServer(function (req, res) {
//	
//	if (req.url === '/favicon.ico') {
//		res.writeHead(200, {'Content-Type': 'image/x-icon'} );
//		res.end();
//	    console.log('favicon requested');
//	    return;
//	}
//	
//	console.log('New coming request');
//	console.log('Request URL: ' + req.url);
//	res.writeHead(200, {'Content-Type': 'text/plain'});
//	res.end('Hello World\n');
//}).listen(8888);
//
//console.log('Server running at http://127.0.0.1:8888/');