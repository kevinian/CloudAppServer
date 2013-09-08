var engine = require('./dbEngine');

var build = function(callback) {
  engine.connect(callback);
};

exports.build = build;