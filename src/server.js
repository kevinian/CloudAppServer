var express = require('express'),
    path = require('path'),
    async = require('async'),
    clone = require('clone'),
    fresh = require('fresh');

// Handlers
var cors = require('./handler/cors/cors');
var negotiator = require('./handler/negotiator/contentNegotiator');
var robots_txt = require('./handler/robots/robots_txt');
var sitemap_xml = require('./handler/sitemap/sitemap_xml');

// Persistent layer
var pt = require('./pt/init');
var DB = require('./pt/memoryDB').DB;

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
  global.db.init(function(err, records) {
    res.json({
      message: 'Database initialized!',
      records: records
    });
  });
});

app.get('/database/print', function(req, res) {
  global.db.print(function(err, records) {
    res.json(records);
  });
});

app.get('/articles/:id', function(req, res) {
  global.db.getOne(req.url, {}, function(err, record) {
    if (!record)
      return res.send(404);
    
    // Cache
    var lastModified = record.modified ? record.modified : record.created;
    res.setHeader('last-modified', lastModified.toUTCString());
    if (!fresh(req, res))
      return res.send(304);
    
    // clone required only for temp demo DB
    var result = clone(record);
    delete result._id;
    delete result._node;
    res.json(result);
  });
});

app.get('/articles', function(req, res) {
  global.db.get(req.url, {}, function(err, records) {
    if (!records)
      return res.send(404);
    
    // Cache
    var lastModified = Math.max.apply(Math, records.map(function(o) {
      if (o.modified)
        return o.modified;
      else
        return o.created;
    }));
    res.setHeader('last-modified', new Date(lastModified).toUTCString());
    console.log(fresh(req, res));
    if (!fresh(req, res))
      return res.send(304);
    
    async.map(
        records
      , function(record, cb) {
         // clone required only for temp demo DB
          var result = clone(record);
          delete result._id;
          delete result._node;
          cb(null, result);
        }
      , function(err, results){
          res.json(results);
        }
    );
  });
});

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