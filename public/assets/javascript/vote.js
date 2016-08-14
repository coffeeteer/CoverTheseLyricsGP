//1. Needs to limit User to five total votes per day.

//2. User is known through IP address. After 5 votes are made.

//3. A module pops up letting user know there votes are up, and button depressed not allowing more clicks.

//on click of voting button, post to db vote for lyrics 
//store ip in db, get vote count for ip, if at vote limit for ip for date deactive vote button - message to user limit has been reached.

$(document).ready(function(){
var ip

  $(function() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
       console.log("My public IP address is: ", json.ip);
       ip = json.ip
      }
    );
  });
console.log("22My public IP address is: ", json.ip);vkkn
});
