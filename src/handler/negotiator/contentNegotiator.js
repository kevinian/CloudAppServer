var Negotiator = require('negotiator');

module.exports = function contentNegotiator(){
	return function contentNegotiator(req, res, next){
		console.log('content negotiator handler');
		var negotiator = new Negotiator(req);
		console.log(negotiator.preferredLanguages());
		next();
	};
};