var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');
var app = express();
var nodemailer = require('nodemailer');

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

app.get('/our-ballad', function(req, res) {
  res.render('ballad');
});

app.get('/contact-us', function(req, res) {
  res.render('contact-us');
});

app.get('/view-your-favorite', function(req, res) {
  res.render('favorite');
});

app.get('/winners-circle', function(req, res) {
  res.render('winners');
});

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
  var str = body.URL;
  var URL = str.slice(17);
  
  console.log(str)
  console.log(URL);

  db.Submissions.create({
    name: body.name,
    state: body.state,
    email: body.email,
    entry: URL,
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

  Submissions.findAll({})
  .then(function(result) {
    console.log(result);
    return res.render('vote', {
      Submissions: result
    });
  });
}); //end app.get 1

//vote lookup for prev vote
app.get('/vote/:ip', function(req, res) {
  var ip = req.params.ip;

  contestantVotes.findAll({
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

// Contact page email 
 
// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport('smtps://ctljenforce%40gmail.com:nineteen72@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"jen 👥" <jenforce@aol.com>', // sender address 
    to: 'jenforce@aol.com', // list of receivers 
    subject: 'Hello ✔', // Subject line 
    text: 'Hello world 🐴', // plaintext body 
    html: '<b>Hello world 🐴</b>' // html body 
};
 
// send mail with defined transport object 
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});



// sequelize sync: not in use
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log('connected to port ', port);
  });
});