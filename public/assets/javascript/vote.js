$(document).ready(function(){   
$('.votebutton').on("click", function() {

console.log('clicked')


 

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
              votehandle(ip);
         });
   }); // end ip get 
   // votehandle(ip);
};

function votehandle(ip){
    console.log(ip)


    var url ='/vote/' + ip + '/'+ entryid;
        console.log(url);


$.get(url, function(data) {
     data = data[0];
     console.log('$.get one',data);
 });


 $.post(url, function(data) {
    data = data[0];
    console.log('$.post two',data);
});
}

});  //end on votebutton click
});//send on ready function