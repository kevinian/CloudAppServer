module.exports = function cors(){
	return function cors(req, res, next){
		console.log('cors handler');
		next();
	};
};