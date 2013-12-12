var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    mongoose = require('mongoose');

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.get('/', function(req, res) {
  res.send("Hello world!");
});

routes = require('./routes/users')(app);

mongoose.connect('mongodb://localhost/users', function(err, res) {
	if(err) {
		console.log('ERROR: Conectando a la Base de Datos. ' + err);
	} else {
		console.log('Conectado a la Base de Datos');
	}
});

server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});