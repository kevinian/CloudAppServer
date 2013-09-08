Memory = function(options){
  this._recordCounter = 1;
  this._data = [];
};

Memory.prototype.find = function(query, callback) {
  callback(null, query(this._data, query));
};

Memory.prototype.findOne = function(query, callback) {
  console.log(callback.toString());
  callback(null, query(this._data, query)[0]);
};

Memory.prototype.insert = function(record, callback) {
  record._id = this._recordCounter++;
  record.created = new Date();
  record.modified = new Date();
  this._data[this._data.length]= record;
  callback();
};

Memory.prototype.update = function(record, query, callback) {
  record.modified = new Date();
  var result = query(this_data, query)[0];
  for(var i=0; i < this_data.length; i++) {
    if (this._data[i]._id === result._id) {
      this._data[i] = record;
      return callback();
    }
  }
};

Memory.prototype.remove = function(record, query, callback) {
  var result = query(this_data, query)[0];
  for(var i=0; i < this_data.length; i++) {
    if (this._data[i]._id === result._id) {
      // TODO remove record, modify index
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

var query = function(records, query) {
  var result = records.filter(function(record) {
    var keys = Object.keys(query);
    for(var i=0; i < keys.length; i++) {
      if (!record.hasOwnProperty(keys[i]) || record[keys[i]] !== query(keys[i])) {
        return false;
      }
    }
    return true;
  });
  return result;
};
exports.Memory = Memory;