$(document).ready(function() {
    var ip
    $('.votebutton').on("click", function() {

      var id = $(".votebutton").attr("id");
      console.log($(".votebutton").attr("id"));

      getIp();

      var currentURL = window.location.origin;

 $.get( currentURL + "/contestantvotes" + id + ip, function( data ) {
  
    data = data[0];

    // log the data to our console
    console.log(data);

  });


       





function getIp() {
     $(function() {
           $.getJSON(
              "https://api.ipify.org?format=jsonp&callback=?",
              function(json) {
                  console.log(
                      "My public IP address is: ",
                      json.ip);
                  ip = json.ip
                  return ip;
              });
              });
          }
          console.log('click');
      });
});
