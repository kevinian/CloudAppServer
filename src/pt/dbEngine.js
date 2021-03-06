var async = require('async'),
    uuid = require('node-uuid');

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

DB.prototype.print = function(callback) {
  this._db.dummy(callback);
};

DB.prototype.count = function(uri, query, callback) {
  query._node = { $regex: '^' + uri};
  this._db.find(query, function(err, results) {
    callback(err, results.length);
  });
};

DB.prototype.get = function(uri, query, callback) {
  query._node = { $regex: '^' + uri};
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

/**
 * Only for demo
 */
DB.prototype.init = function(callback) {
  var records = require('./articles.json');
  var thiz = this;
  /* Lets bootstrap with dummy data */
  async.each(
          records
    , function(record, cb) {
        if (!record.id)
          record.id = uuid.v4();
        thiz.create('/articles', record, cb);
      }
    , function(err) {
        callback(err, records);
      }
  );
};