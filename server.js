'use strict';

var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    mongoose = require('mongoose'),
    exphbs = require('express-handlebars'),
    routes = require('./routes');

// Create express instance and set a port variable
const port = process.env.PORT || 3000;
var app = express();

// Set handlebars as templating engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

// Connect to our mongo database
mongoose.connect('mongodb://localhost/game-state');

// Set public as static content dir
app.use('/', express.static(__dirname + '/public/'));

// Start the server
var server = http.createServer(app).listen(port, function() {
    console.log('Express server started on port ' + port);
});

// Initialize socket.io
var io = require('socket.io').listen(server);

// Initialize routes
routes(app, io);

/*
const port = 3000;
const host = '127.0.0.1';

var server = http.createServer(function(req, res) {
    if(req.method == 'POST') {
        console.log('Handling POST request..');
        res.writeHead(200, {'Content-Type': 'text/html'});

        let body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            console.log('POST payload: ' + body);
            res.end();
        })
    } else {
        console.log('Not expecting other request types');
        res.writeHead(200, {'Content-Type': 'text/html'});
        let html = '<html><body>HTTP Server at http://' + host + ':' + port + '</body></html>';
        res.end(html);
    }
});

server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);
*/
