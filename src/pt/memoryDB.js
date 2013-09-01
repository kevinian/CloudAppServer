var recordCounter = 1;

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

/* Lets bootstrap with dummy data */
new DB().save([
  {title: 'Post one', body: 'Body one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
  {title: 'Post two', body: 'Body two'},
  {title: 'Post three', body: 'Body three'}
], function(error, articles){});

exports.DB = DB;