$(document).ready(function() {
$('.votebutton').on("click", function() {
    console.log('clicked')

    var entry_id = $(this).attr("id");
    console.log($(this).attr("id"));

    var ip

    getIP();

function getIP() {
    $(function() {
        $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
            function(json) {
                ip = json.ip;
                votehandle(ip);
            });
    });
}; // end ip get

function votehandle(ip) {
     console.log(ip)
     var url = '/vote/' + ip + '/' + entry_id;
     console.log(url);

     $.get(url, function(result) {
           console.log('vote get result',result);

         if (result === null) {
            voteNew(url);

         } else {
            voteUpdate(url);
        }
             
    function voteNew(url) {
        console.log('true:vote_count === null')
        var voteUrl = url + '/' + 1;
        $.post(voteUrl, function(result) {
            console.log(voteUrl);
            result = result[0];
            console.log('$.post new rec', result);
        });  //end newVote
    } //end newVote


    function voteUpdate(){
        console.log('in voteUpdate', result);
        var id = result.id
        var createdAt = result.createdAt;
        var dateCheck = dateCalc(createdAt);
        var votes = result.vote_counts;
            url = '/vote/' + id + '/' + votes;

        console.log('url',url);

        if (votes < 2 && dateCheck == true) {
            var votecount = votes + 1;
             url = '/vote/' + id + '/' + votecount;

            console.log('in vote logic');
            console.log('vote',votes,'votecount',votecount);

             $.post(url, function(result) {
                 console.log(url);
                 result = result[0];
                 console.log('$.post update', result);
            });  //end put

        }
    }; //end voteUpdate()

    function dateCalc(created){

            var today = new Date();
            var createOn = new Date(created);
            var diff = Math.floor((today - createOn));
            var diffminutes = diff / (60 * 1000);
                
            if (diffminutes < 1440) {
                 console.log('less then a day true')
                 return true;
             } 
            console.log('diff', diff, 'diffday', diffday,
                 'diffminutes', diffminutes);
            console.log('today', today, 'created', createOn);
    }  //  end dateCalc
});  //end $.get(url, function(result)
} // end votehandle
   
}); //end on votebutton click
}); //send on ready function
//new update