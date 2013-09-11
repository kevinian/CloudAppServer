/**
 * Middleware for dynamically generating sitemap.xml
 */
module.exports = function sitemap_xml(){
	return function sitemap_xml(req, res, next){
		console.log('sitemap xml handler');
		next();
	};
};
