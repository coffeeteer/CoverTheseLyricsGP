/*
Here is where you set up your server file.
express middleware.*/

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var Submissions = require('./models')['Submissions'];

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

app.use(express.static(process.cwd() + '/public')); 

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));  

app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//***********Routes to Handlebars TravisG**********//

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/lyrics', function(req, res) {
	res.render('lyrics');
});

app.get('/submit-video', function(req, res) {
	res.render('submit');  //get form for entry
});
app.post('/submit-video', function(req,res){  //send form data to db
    var body = req.body;
    db.Submissions.create({
        name: body.name,
        state: body.state,
        email: body.email,
        entry: body.URL,
        lyrics: body.lyric,
        optradio: body.optradio  
      }).then(function(data){
        console.log('data',data);
    //res.redirect('/submit-video/');
    res.render('index');

  })
});


app.get('/vote', function(req, res){
    Submissions.findAll({})
      .then(function(result) {
        console.log(result);
        return res.render('vote', {
            Submissions: result
        });
    });
  });


app.post('/vote/:ip?/:entryid?',function(req, res){
   console.log('DATA CHECK JW',req.params.ip, req.params.entryid);
 var body = req.params;
    db.contestantVotes.create({
        ip: body.ip,
       entryid: body.entryid,
      }).then(function(data){
        console.log('data',data);
    //res.redirect('/submit-video/');
    res.render('vote');

  });

});


//*************************************************//

app.get('/prizes', function(req, res) {
  res.render('prizes');
});

var port = process.env.PORT || 3306;
db.sequelize.sync().then(function(){
  app.listen(port, function(){
    console.log('connected to port ', port);
  }); //JW moved best practice has the listening app last in the file
});

  