$(document).ready(function(){   
$('.votebutton').on("click", function() {

console.log('clicked')


var id = $(this).attr("id");
    console.log($(this).attr("id"));
    console.log("id",id);
    var ip

getip();

function getip(){

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
              votehandle(ip);
         });
   }); // end ip get 
    votehandle(ip);
};

function votehandle(ip){
    console.log(ip)
    var url ='/vote/' + id + '/'+ ip;
        console.log(url);

     $.get(url, function(data) {
         data = data[0];
         console.log(data);
     });
}

});  //end on votebutton click
});//send on ready function
