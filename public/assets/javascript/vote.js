$(document).ready(function() {
  jQuery.noConflict();

  $('.votebutton').on("click", function(id) {
    var entry_id = $(this).attr("id");
console.log('entry_id, id',entry_id,id)

    var ip;
    getIP();

    function getIP() {
      $(function() {
        $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
          function(json) {
            ip = json.ip;
            voteHandler(ip,entry_id);
            
          });
      });
    } // end ip get

    function voteHandler(ip,entry_id) {
        var url = '/vote/' + ip

        console.log('in voteHandler function')
        console.log('**get data check**', '*IP*', ip, '*url*', url);

        //check for vote record in db


        $.get(url, function(result) {
          console.log('vote get result', result.length);
            var votes = result.length;

         if (result == null || result.length < 5) {  
              voteNew(entry_id); 
              postVote(votes);

              console.log('post vote call',votes)
          }else {
              $('#myModal').modal('show');
                postVote(votes);

                console.log('vote max ')
               }

        }); //end $.get(url, function(result)


        function voteNew(entry_id,votes) {
          console.log('56 entry',entry_id)
          var votes = 1
          var voteUrl = '/vote/' + ip + '/' + votes + '/' + entry_id
          
          postVote(votes);

          // console.log('in voteNew function',voteUrl);
            
            $.post(voteUrl, function(result) {
              // result = result[0];

              console.log(' 54 $.post new rec result', result);
            }); //end newVote
          } //end newVote


        function postVote(votes){
            $('#badgestyle').empty();
            $('#badgestyle').append(votes);
        };  //end post vote

      } // end votehandler
  }); //end on votebutton click
}); // end on ready function


  //vote update not in use as of 11/2 
        // function voteUpdate(result) {
        //   var id = result.id
        //   var votes = result.vote_counts;
        //   var votecount = votes + 1;
        //   var updateUrl = '/vote/' + id + '/' + votecount;

        //   console.log('in voteUpdate', result);
        //   console.log('url', url);
        //   console.log('in vote logic');
        //   console.log('vote', votes, 'votecount', votecount);

        //   postVote(votecount);
              
        //     $.post(updateUrl, function(result) {
        //       result = result[0];
        //     });
        //   } //end voteUpdate()


         //var votes = result.vote_counts;
          //console.log('result', result.length);           
         
          // if (result === null) {
            
          //   console.log('vote new');
          //   voteNew();

          // } else if (result.vote_counts < 5) {
          //   console.log('vote update ')
          //   voteUpdate(result);

          // } else {  
          //   var votes = result.vote_counts;
          //   postVote(votes);
          //   console.log('vote max ')
          //  $('#myModal').modal('show');
  
          // }