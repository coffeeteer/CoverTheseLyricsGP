var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var app = express();

console.log('process.env.PORT', process.env.PORT);
var port = process.env.PORT || 3010;
var Submissions = require('./models')['Submissions'];
var contestantVotes = require('./models')['contestantVotes'];

global.db = require("./models");


app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(methodOverride('_method'));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

//***********Routes to Handlebars Travis G**********//


//***********Routes to Handlebars TravisG**********//

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/lyrics', function(req, res) {
  res.render('lyrics');
});

app.get('/submit-video', function(req, res) {
  res.render('submit'); //get form for entry
});

app.post('/submit-video', function(req, res) { //send form data to db
  var body = req.body;

  db.Submissions.create({
    name: body.name,
    state: body.state,
    email: body.email,
    entry: body.URL,
    lyrics: body.lyric,
    optradio: body.optradio
  }).then(function(data) {
    console.log('data', data);
    //res.redirect('/submit-video/');
    res.render('index');
  })
});

// initial vote page with submissions 
app.get('/vote', function(req, res) {

  Submissions.findAll({}).then(function(result) {
    console.log(result);
    return res.render('vote', {
      Submissions: result
    });
  });
}); //end app.get 1

//vote lookup for prev vote
app.get('/vote/:ip', function(req, res) {
  var ip = req.params.ip;

  contestantVotes.findOne({
    where: {
      ip: ip,
      createdAt: {
        $lt: new Date(),
        $gt: new Date(new Date() - 24 * 60 * 60 * 1000) //rec within 24 hrs
      },
    }
  }).then(function(result) {
    return res.json(result);
  });
});
// new vote post
app.post('/vote/:ip/:vote_counts/:entry_id', function(req, res) {
  var body = req.params;

  db.contestantVotes.create({
    ip: body.ip,
    vote_counts: body.vote_counts,
    entry_id: body.entry_id,
  }).then(function(result) {
    return res.json(result);
  });
});
//update vote count 
app.post('/vote/:id/:vote_counts', function(req, res) {
  var id = req.params.id;
  var vote_counts = req.params.vote_counts;

  db.contestantVotes.update({
    vote_counts: vote_counts
  }, {
    where: {
      id: id,
    }
  }).then(function(result) {
    return res.json(result);
  });
});

//*************************************************//
app.get('/prizes', function(req, res) {
  res.render('prizes');
});

// sequelize sync: not in use
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log('connected to port ', port);
  });
});