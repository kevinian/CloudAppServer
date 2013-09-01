var recordCounter = 0;

DB = function(){};
DB.prototype.dummyData = [];

DB.prototype.findAll = function(callback) {
  callback( null, this.dummyData );
};

DB.prototype.findById = function(id, callback) {
  var result = null;
  for(var i =0;i<this.dummyData.length;i++) {
    if( this.dummyData[i]._id == id ) {
      result = this.dummyData[i];
      break;
    }
  }
  callback(null, result);
};

DB.prototype.save = function(records, callback) {
  var record = null;

  if( typeof(records.length)=="undefined")
    records = [records];

  for( var i =0;i< records.length;i++ ) {
    record = records[i];
    record._id = recordCounter++;
    record.created_at = new Date();

    if( record.comments === undefined )
      record.comments = [];

    for(var j =0;j< record.comments.length; j++) {
      record.comments[j].created_at = new Date();
    }
    this.dummyData[this.dummyData.length]= record;
  }
  callback(null, records);
};

DB.prototype.init = function(callback) {
  var articles = require('./articles.json');
  /* Lets bootstrap with dummy data */
  new DB().save(articles, callback);
};

exports.DB = DB;