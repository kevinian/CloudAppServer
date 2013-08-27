var http = require('http');
var express = require('express');

var app = express();

app.use(express.favicon())
   .use(express.logger('dev'))
   .use(express.bodyParser())
   .use(function (req, res, next) {
	   console.log("cors");   
	   next();
    })
   .use(function (req, res, next) {
	   console.log("compress");   
	   next();
    })
    .use(function (req, res, next) {
	   console.log("robots.txt");   
	   next();
    })
    .use(function (req, res, next) {
	   console.log("sitemap.xml");   
	   next();
    });

app.get('/', function(req, res){
	console.log('New coming request');
	console.log('Request URL: ' + req.url);
	res.json({ message: 'Hello World' });
});

app.listen(8888);
console.log('Express started on port 8888');