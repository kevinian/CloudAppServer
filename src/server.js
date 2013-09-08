var express = require('express'),
    path = require('path'),
    async = require('async');

// Handlers
var cors = require('./handler/cors/cors');
var negotiator = require('./handler/negotiator/contentNegotiator');
var robots_txt = require('./handler/robots/robots_txt');
var sitemap_xml = require('./handler/sitemap/sitemap_xml');

// Persistent layer
var pt = require('./pt/init');
var DB = require('./pt/memoryDB').DB;
//var dbInst = new DB();

// Express framework
var app = express();

// all environments
app.configure(function(){
  app.set('title', 'My Application');
  app.use(express.favicon())
     .use(express.logger('dev'))
     .use(negotiator())
     .use(express.query())
     .use(express.bodyParser())
     .use(cors())
     .use(robots_txt())
     .use(sitemap_xml())
     .use(app.router)
     // compress works not, since res.json is not overridden by compress middleware
     // TODO make sure res.headers['content-encoding'] is set correctly
     .use(express.compress())
     .use(express.static(path.join(__dirname, '../apps/e-shop/public')));
});

// development only
app.configure('development', function(){
  app.use(express.favicon())
     .use(express.logger('dev'));
});

// production only
app.configure('production', function(){
  // TODO
});

// Router
// TODO move into single module
app.get('/hello', function(req, res) {
  console.log('New coming request');
  console.log('Request URL: ' + req.url);
  res.json({
    message: 'Hello World!'
  });
});

app.get('/database/init', function(req, res) {
//  dbInst.init(function(err, records) {
//    res.json({
//      message: 'Database initialized!'
//    });
//  });
  var record = {
    id: 1,
    value: 'test record'
  };
  global.db.create('/articles', record, function() {
    res.json({
      message: 'Create Record',
      record: record
    });
  });
});

app.get('/articles/:id', function(req, res) {
  console.log(req.url);
  global.db.getOne(req.url, {}, function(err, record) {
    if (record)
      res.json(record);
    else
      res.send(404);
  });
});

//app.get('/articles/:id', function(req, res) {
//  global.db.getOne(req.url, function(err, record) {
//    if (record)
//      res.json(record);
//    else
//      res.send(404);
//  });
//});
//
//app.get('/articles', function(req, res) {
//  global.db.get(req.url, function(err, records) {
//    if (records)
//      res.json(records);
//    else
//      res.send(404);
//  });
//});

app.get('/users', function(req, res) {
  var users = require(path.join(__dirname, '../apps/e-shop/fixtures/users.json'));
  res.json(users);
});

app.get('/application', function(req, res) {
  var application = require(path.join(__dirname, '../apps/e-shop/fixtures/application.json'));
  res.json(application);
});

async.series([
  function(callback) {
    pt.build(function(err, db) {
      global.db = db;
      callback();
    });
  },
  function(callback) {
    callback();
  }
],
function(err, results) {
  //Server start
  //TODO with MONIT support
  app.listen(8888);
  console.log('Server started on port 8888');
});