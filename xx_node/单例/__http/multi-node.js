var http = require('http');  
var multi = require('multi-node');
var server = http.createServer(function (request, response) {  
    var j = 0;  
    for (var i = 0; i < 100000; i++) {  
        j += 2 / 3;  
    }  
    response.end(j + '**');  
});  
var nodes = multi.listen({  
    port: 8883,  
    nodes: 4  
}, server);  
console.log('Server running at http://10.1.10.150:8883/');  