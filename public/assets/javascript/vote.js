$(document).ready(function() {
  jQuery.noConflict();
  $('.votebutton').on("click", function() {
    var entry_id = $(this).attr("id");
    var ip;
    getIP();

    function getIP() {
      $(function() {
        $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
          function(json) {
            ip = json.ip;
            voteHandler(ip);
            console.log('start voteHandler function')
          });
      });
    } // end ip get


    function voteHandler(ip) {
        var url = '/vote/' + ip

        console.log('in voteHandler function')
        console.log('**get data check**', '*IP*', ip, '*url*', url);

                //check for vote record in db
        $.get(url, function(result) {
          console.log('vote get result', result);

           //var votes = result.vote_counts;
          //console.log('var votes', result.vote);           
         
          if (result === null) {
            
            console.log('vote new ');
            voteNew();

          } else if (result.vote_counts < 5) {
            console.log('vote update ')
            voteUpdate(result);

          } else {  
            var votes = result.vote_counts;
            postVote(votes);
            console.log('vote max ')
           $('#myModal').modal('show');
  
          }
        }); //end $.get(url, function(result)


        function voteNew() {
          var voteUrl = '/vote/' + ip + '/' + 1 + '/' + entry_id
          
          console.log('in voteNew function');
            
            $.post(voteUrl, function(result) {
              result = result[0];

              console.log(' 54 $.post new rec result', result);
            }); //end newVote
          } //end newVote

        function voteUpdate(result) {
          var id = result.id
           var votes = result.vote_counts;
            var votecount = votes + 1;
            var updateUrl = '/vote/' + id + '/' + votecount;
            // var gifDiv = $('<div class = "badge votesmallbackground">');

            console.log('in voteUpdate', result);
            console.log('url', url);
            console.log('in vote logic');
            console.log('vote', votes, 'votecount', votecount);

            postVote(votes);
              
            $.post(updateUrl, function(result) {
              result = result[0];
            });
  
          } //end voteUpdate()

        function postVote(votes){

            $('#badgestyle').empty();
            $('#badgestyle').append(votes);
        };  //end post vote

      } // end votehandler
  }); //end on votebutton click
}); // end on ready function