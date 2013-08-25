var http = require('http');

http.createServer(function (req, res) {
	console.log('New coming request');
	
	if (req.url === '/favicon.ico') {
		res.writeHead(200, {'Content-Type': 'image/x-icon'} );
		res.end();
	    console.log('favicon requested');
	    return;
	}
	
	console.log(req.headers);
	console.log(req.url);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');