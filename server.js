var http = require ('http');
var express = require ('express');
var ejsEngine = require ('ejs-locals');

var app = express();
var port = process.env.port || 3000;

//Setup the View engine.
//app.set('view engine', 'jade');
app.engine('ejs', ejsEngine);  //To support master pages
app.set('view engine', 'ejs'); //Set ejs as view engine

app.get ('/', function (request, response){
    //response.send("<html><body><h1>Hello</h1></body></html>");
    /*response.render ('jade/index', {
        title: 'Express using jade'
    });*/
    response.render ('ejs/index', {
        title: 'Express using ejs'
    });
});

app.get ('/api/users', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send ([{
        name: 'Jhon',
        isValid: true
    },{
        name: 'Pete',
        isValid: true
    }])
});

console.log('Starting  server...');
var server = http.createServer(app);

server.listen(port);