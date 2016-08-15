//1. Needs to limit User to five total votes per day.

//2. User is known through IP address. After 5 votes are made.

//3. A module pops up letting user know there votes are up, and button depressed not allowing more clicks.

//on click of voting button, post to db vote for lyrics 
//store ip in db, get vote count for ip, if at vote limit for ip for date deactive vote button - message to user limit has been reached.

$(document).ready(function(){

$('#votebtn').on("click", function(){

  // make a newCharacter obj
  var newContestantvotes = 
  {
    name: $("#name").val().trim(), // name from name input
    role: $("#role").val().trim(), // role from role input
    age: $("#age").val().trim(), // age from age input
    forcePoints: $("#forcepoints").val().trim() // points from forcepoints input 
  };

  // grab the url from the window/tab
  var currentURL = window.location.origin;

  // send an AJAX POST-request with jQuery
  $.post( currentURL + "/api/new", newCharacter)
    // on success, run this callback
    .done(function(data){
      // log the data we found
      console.log(data);
      // tell the user we're adding a character with an alert window
      alert("Adding character...")
    })





  var ip

  $(function() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
       console.log("My public IP address is: ", json.ip);
       ip = json.ip
        return ip;    
      }
    );
  });


console.log("2 My public IP address is: ", ip);
});
