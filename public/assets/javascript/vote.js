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
         
          if (result === null) {
            voteNew();

          } else if (result.vote_counts < 5) {
            voteUpdate(result);

          } else {   
            $('#myModal').modal('show');
  
          }
        }); //end $.get(url, function(result)


        function voteNew() {
          var voteUrl = '/vote/' + ip + '/' + 1 + '/' + entry_id
          
          console.log('in voteNew function');
            
            $.post(voteUrl, function(result) {
              result = result[0];

              console.log('$.post new rec result', result);
            }); //end newVote
          } //end newVote

        function voteUpdate(result) {
            var id = result.id
            var votes = result.vote_counts;
            var votecount = votes + 1;
            var updateUrl = '/vote/' + id + '/' + votecount;

            console.log('in voteUpdate', result);
            console.log('url', url);
            console.log('in vote logic');
            console.log('vote', votes, 'votecount', votecount);

            $.post(updateUrl, function(result) {
              result = result[0];
           
            });
          } //end voteUpdate()
      } // end votehandler
  }); //end on votebutton click
}); // end on ready function