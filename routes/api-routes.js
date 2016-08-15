// api-routes.js - this file offers a set of routes for displaying and saving data to the db

// Dependencies

var Submissions = require("../models")["Submissions"]; 

// Routes

module.exports = function(app){

  // If a user sends data to add a new character...
  app.post('submit-video', function(req, res){
    var submissions = req.body;

    // Create a routeName
    //var routeName = submissions.name.replace(/\s+/g, '').toLowerCase();

    Submissions.create({
      name: submissions.name,
      state: submissions.state,
      entry: submissions.entry,
      email: submissions.email,
      age: submissions.age,
      parental: submissions.parental,
      lyrics: submissions.lyrics,
    });
  })
}
