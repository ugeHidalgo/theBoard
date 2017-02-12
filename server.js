var http = require ('http');
var express = require ('express');
//var ejsEngine = require ('ejs-locals');

var app = express();
var port = process.env.port || 3000;

var controllers = require('./controllers')
var flash = require('connect-flash');
var cookieParser = require('cookie-parser')
var expressSession = require('express-session');

//Setup the View engine.
//app.set('view engine', 'jade');
//app.engine('ejs', ejsEngine);  //To support master pages
//app.set('view engine', 'ejs'); //Set ejs as view engine
app.set('view engine', 'vash'); //Set vash as view engine

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Support flash
app.use(cookieParser());
app.use(expressSession({
    secret: 'anystringhereisvalidtoencript',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());



//Set the public static resource folder
app.use(express.static(__dirname + '/public'));

//Use authentication
var auth = require ('./auth');
auth.init(app);

//Map the routes
controllers.init(app);


/*app.get ('/', function (request, response){
    //response.send("<html><body><h1>Hello</h1></body></html>"); //Sin view engine.
    //response.render ('jade/index', {  //Using jade as view engine
    //    title: 'Express using jade'
    //});
    //response.render ('ejs/index', { //using ejs as view engine
    //    title: 'Express using ejs'
    //});
    response.render ('index', { //Using vash as view engine
        title: 'Express using vash'
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
});*/

var server = http.createServer(app);

server.listen(port);