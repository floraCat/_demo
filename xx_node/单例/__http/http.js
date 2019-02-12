var http = require('http');


http.createServer(function(request, response) { 
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end('Hello World\n');
}).listen(3000); // tcp6


// http.createServer(function(request, response) { 
//         response.writeHead(200, {'Content-Type':'text/plain'});
//         response.end('Hello World3\n');
// }).listen(3000, '0.0.0.0'); // tcp


console.log('Server started');