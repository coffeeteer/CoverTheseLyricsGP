
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

var app = express();

console.log('process.env.PORT', process.env.PORT);

var port = process.env.PORT || 3309;


var Submissions = require('./models')['Submissions'];
var contestantVotes = require('./models')['contestantVotes'];

// creates all tables in models directories

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

// initial vote page with submissions 
app.get('/vote', function(req, res) {
    Submissions.findAll({})
    .then(function(result) {
        console.log(result);
        return res.render('vote', {
            Submissions: result
        });
    });
}); //end app.get 1

//vote test/lookup for prev vote
app.get('/vote/:ip/:entry_id/:formatted_date', 
  function(req, res) {
            console.log('JW *** get rec check/db select',res);
            var ip = req.params.ip;
            var entry_id = req.params.entry_id;
            var formatted_date = req.params.formatted_date;

            contestantVotes.findOne({
                where: {
                  ip: ip,
                  entry_id: entry_id,
                  formatted_date:formatted_date
                
                }
            }).then(function(result) {
                return res.json(result);
            });
       });
  
  // new vote post
app.post('/vote/:ip/:entry_id/:formatted_date/:vote_counts',
  function(req, res){
   console.log('NEW VOTE JW',req.params.ip, req.params.entry_id,req.params.formatted_date, req.params.vote_counts);
   var body = req.params;

    db.contestantVotes.create({
       ip: body.ip,
       entry_id: body.entry_id,
       formatted_date: body.formatted_date,
       vote_counts: body.vote_counts
      }).then(function(result){
      return res.send(result);

  });
});

//update vote count 
app.post('/vote/:id/:vote_counts', 
  function(req, res){
      console.log('JW *** app.put db select ');
      var id = req.params.id;
      var vote_counts = req.params.vote_counts;
      

    db.contestantVotes.update(
    { vote_counts: vote_counts},{
          where: {
            id: id,
          }}).then(function(result) {
          return res.json(result);
      });
 });


//*************************************************//

app.get('/prizes', function(req, res) {
  res.render('prizes');
});


db.sequelize.sync().then(function(){
  app.listen(port, function(){
    console.log('connected to port ', port);
  }); 
});

/*------------ Legal -------------*/
app.get('/rules', function(req, res) {
  res.render('rules.html');
});

app.get('/terms', function(req, res) {
  res.render('terms.html');
});

app.get('/license', function(req, res) {
  res.render('license.html');
});
/*------------- End Legal ---------------*/