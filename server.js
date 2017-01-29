var http = require ('http');
var port = process.env.port || 3000;


console.log('Starting  server...');
var server = http.createServer(function (request, response) {

    //console.log('Ctrl+C to end.');
    response.writeHead( 200, { 'Content-Type' : 'text/plain'});
    response.end('Hello World\n');
});

server.listen(port);