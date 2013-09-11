/**
 * Middleware for dynamically generating robots.txt
 */
module.exports = function robots_txt(){
	return function robots_txt(req, res, next){
		console.log('robots txt handler');
		next();
	};
};
