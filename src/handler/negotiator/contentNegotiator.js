module.exports = function negotiator(){
	return function negotiator(req, res, next){
		console.log('content negotiator handler');
		next();
	};
};