/*
Here is where you set up your server file.
express middleware.
*/

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public')); //process.cwd returns the current working directory

app.use(bodyParser.urlencoded({
	extended: false
}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//var routes = require('./controllers/ctl_controller.js');
//app.use('/', routes);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('connected to port ', port);
});


//***********Routes to Handlebars TravisG**********//

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/lyrics', function(req, res) {
	res.render('lyrics');
});

app.get('/submit-video', function(req, res) {
	res.render('submit');
});

app.get('/vote', function(req, res) {
	res.render('vote');
});

//*************************************************//
