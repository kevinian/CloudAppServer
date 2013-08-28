var express = require('express'),
    path = require('path'),
    async = require('async');

var cors = require('./handler/cors/cors');
var negotiator = require('./handler/negotiator/contentNegotiator');
var robots_txt = require('./handler/robots/robots_txt');
var sitemap_xml = require('./handler/sitemap/sitemap_xml');

var app = express();

app.use(express.favicon())
   .use(express.logger('dev'))
   .use(negotiator())
   .use(express.query())
   .use(express.bodyParser())
   .use(cors())
   .use(robots_txt())
   .use(sitemap_xml())
   // compress works not, since res.json is not overridden by compress middleware
   // TODO make sure res.headers['content-encoding'] is set correctly
   .use(app.router)
   .use(express.compress())
   .use(express.static(path.join(__dirname, '../apps/e-shop/public')));

app.get('/hello', function(req, res) {
  console.log('New coming request');
  console.log('Request URL: ' + req.url);
  res.json({
    message: 'Hello World'
  });
});

app.get('/users', function(req, res) {
  var users = require(path.join(__dirname, '../apps/e-shop/fixtures/users.json'));
  console.log(users.toString());
  res.json(users);
});

app.get('/application', function(req, res) {
  var application = require(path.join(__dirname, '../apps/e-shop/fixtures/application.json'));
  console.log(application.toString());
  res.json(application);
});

app.listen(8888);
console.log('Server started on port 8888');