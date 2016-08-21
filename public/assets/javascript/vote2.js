$(document).ready(function(){   
$('#votebutton').on("click", function() {
event.preventDefault();
console.log('clicked')


 $.get('/vote', function(data) {
     data = data[0];
     console.log(data);
 });

var entryid = $(this).attr("id");
    console.log($(this).attr("id"));
    //console.log("id",id);
    var ip

getip();


function getip(){

 $(function() {
     $.getJSON(
         "https://api.ipify.org?format=jsonp&callback=?",
         function(json) {
             ip = json.ip;
             console.log(
                 "My public IP address is3: ",
                 ip);
              votehandler(ip);
         });
   }); // end ip get 
   // votehandle(ip);
};

function votehandler(ip){
    console.log(ip)
    var url ='/vote/' + ip + '/'+ entryid;
    console.log(url);

 $.post(url, function(data) {
    data = data[0];
    console.log(data);
});
} // end votehandler()

});  //end on votebutton click
});//send on ready function
