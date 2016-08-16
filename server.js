/*
Here is where you set up your server file.
express middleware.*/

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

// creates all the tables in the models directories
global.db = require("./models");
// var Submissions = require('./models')['Submissions'];

// var sequelizeConnection = models.sequelize;
// sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0');


// models.sequelize.sync();  //sync all tables

//database setup
// var Sequelize = require ('sequelize'), connection;
// if (process.env.JAWSDB_URL) {
//   connection = new Sequelize(process.env.JAWSDB_URL);
// }else {
//   connection = new Sequelize('coverTheseLyrics', 'root', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '3306'
//   })
// }

app.use(express.static(process.cwd() + '/public')); //process.cwd returns the current working directory

app.use(bodyParser.urlencoded({
	extended: false
}));


app.use(methodOverride('_method'));  // override with POST having ?_method=DELETE

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//var routes = require('./controllers/ctl_controller.js');
//app.use('/', routes);

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
app.post('/submit-video', function(req,res){
    var body = req.body;
      db.Submissions.create({
        name:body.name,
        state: body.state,
        email: body.email,
        optradio: body.optradio  
      }).then(function(data){
        console.log('data',data);

    res.redirect('/submit-video/');
  })
});

app.get('/vote', function(req, res) {
	res.render('vote');
});

//*************************************************//

app.get('/prizes', function(req, res) {
  res.render('prizes');
});

var port = process.env.PORT || 3000;
db.sequelize.sync().then(function(){
  app.listen(port, function(){
    console.log('connected to port ', port);
  }); //JW moved best practice has the litening app last in the file
});

