var Memory = require('./memoryDB').Memory;

exports.connect = function(options, callback) {
  if (arguments.length === 1) {
    callback = options;
    options = null;
  }
  var dbInst = new Memory(options);
  callback(null, new DB(dbInst));
};

/**
 * Thin wrapper around memory Db class.
 */
function DB(dbInst) {
  this._db = dbInst;
}

DB.prototype.count = function(uri, query, callback) {
  query._node = new RegExp('^' + uri);
  this._db.find(query, function(err, results) {
    callback(err, results.length);
  });
};

DB.prototype.get = function(uri, query, callback) {
  query._node = new RegExp('^' + uri);
  this._db.find(query, callback);
};

DB.prototype.getOne = function(uri, query, callback) {
  query._node = uri;
  this._db.findOne(query, callback);
};

DB.prototype.update = function(uri, query, options, callback) {
  query._node = uri;
  this._db.update(record, query, callback);
};

DB.prototype.create = function(uri, record, callback) {
  record._node = uri + '/' + record.id;
  this._db.insert(record, callback);
};

DB.prototype.remove = function(url, query, options, callback) {
  // TODO
};

DB.prototype.init = function(callback) {
  var articles = require('./articles.json');
  /* Lets bootstrap with dummy data */
  this._db.save(articles, callback);
};