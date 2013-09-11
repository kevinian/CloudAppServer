/**
 * Cross-Origin Resource Sharing
 * http://www.w3.org/TR/cors/
 * A mechanism to enable client-side cross-origin requests
 */
module.exports = function cors(){
	return function cors(req, res, next){
		console.log('cors handler');
		next();
	};
};
