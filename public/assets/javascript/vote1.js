
$(document).ready(function() {
   
$('.votebutton').on("click", function() {

    var id = $(this).attr("id");
    console.log($(this).attr("id"));
    console.log("id",id);
    var ip

 $(function() {
     $.getJSON(
         "https://api.ipify.org?format=jsonp&callback=?",
         function(json) {
             console.log(
                 "My public IP address is2: ",
                 json.ip);
             ip = json.ip;
             console.log(
                 "My public IP address is3: ",
                 ip);
         });
   });

     console.log("My public IP address is1: ", ip);
     var currentURL = window.location.origin;
     console.log('currentURL'currentURL);

     $.get(currentURL + "/contestantvotes" + id + ip, function(data) {
         data = data[0];
         console.log(data);
     });
 });

});  //end doc ready