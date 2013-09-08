/**
 * Demo database based on Mongo DB
 */

var uuid = require('node-uuid');

Memory = function(options){
  this._recordCounter = 1;
  this._data = [];
};

Memory.prototype.dummy = function(callback) {
  callback(null, this._data);
};

Memory.prototype.find = function(query, callback) {
  callback(null, search(this._data, query));
};

Memory.prototype.findOne = function(query, callback) {
  callback(null, search(this._data, query)[0]);
};

Memory.prototype.insert = function(record, callback) {
  record._id = uuid.v4();
  this._recordCounter++;
  record.created = new Date();
  record.modified = new Date();
  this._data[this._data.length]= record;
  callback();
};

Memory.prototype.update = function(record, query, callback) {
  record.modified = new Date();
  var result = search(this._data, query)[0];
  for(var i=0; i < this._data.length; i++) {
    if (this._data[i]._id === result._id) {
      this._data[i] = record;
      return callback();
    }
  }
};

Memory.prototype.remove = function(record, query, callback) {
  var result = search(this._data, query)[0];
  for(var i=0; i < this._data.length; i++) {
    if (this._data[i]._id === result._id) {
      this._data.splice(i, 1);
      this._recordCounter--;
      return callback();
    }
  }
};

//Memory.prototype.save = function(records, query, criteria, callback) {
//  var record = null;
//
//  if( typeof(records.length)=="undefined")
//    records = [records];
//
//  for( var i =0;i< records.length;i++ ) {
//    record = records[i];
//    record._id = this._recordCounter++;
//    record.created_at = new Date();
//
//    if( record.comments === undefined )
//      record.comments = [];
//
//    for(var j =0;j< record.comments.length; j++) {
//      record.comments[j].created_at = new Date();
//    }
//    this._dummyData[this._dummyData.length]= record;
//  }
//  callback(null, records);
//};

var search = function(records, query) {
  var result = records.filter(function(record) {
    var keys = Object.keys(query);
    for(var i=0; i < keys.length; i++) {
      var queryCond;
      if (query[keys[i]].hasOwnProperty('$regex')) {
        queryCond = query[keys[i]].hasOwnProperty('$options') ? 
                new RegExp(query[keys[i]].$regex, query[keys[i]].$options) : 
                new RegExp(query[keys[i]].$regex);
      } else
        queryCond = new RegExp(query[keys[i]]);
      if (!record.hasOwnProperty(keys[i]) || !queryCond.test(record[keys[i]])) {
        return false;
      }
    }
    return true;
  });
  return result;
};

exports.Memory = Memory;