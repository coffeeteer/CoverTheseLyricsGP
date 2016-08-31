$(document).ready(function() {
$('.votebutton').on("click", function() {
    
    var entry_id = $(this).attr("id");
    var ip
    var d = new Date();
    var currentDate = d.toISOString().substring(0, 10);

    getIP();

    function getIP() {
        $(function() {
            $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
                function(json) {
                    ip = json.ip;
                    console.log('start voteHandler function')
                    voteHandler(ip);
                });
        });
    }; // end ip get

    function voteHandler(ip) {
            console.log('in voteHandler function')

            var d = new Date();
            var today = d.toISOString();
            var formatted_date = today.slice(0, 10);
            //var url = '/vote/' + ip + '/' + entry_id + '/' + formatted_date;
            var url = '/vote/' + ip + '/' + entry_id + '/' + formatted_date;
            console.log('**send data check**','*IP*',ip,'*entry_id*',entry_id,'*formatted_date*',formatted_date,'*url*',url);
            
            //check if voted 
            $.get(url, function(result) {
                console.log('vote get result', result);
                if (result === null) {
                    console.log('NO vote rec found: call voteNew()');
                    voteNew(url);
                } else {
                    console.log('VOTE rec found - call voteUpdate()');
                    voteUpdate(url);
                }

                function voteNew(url) {
                        console.log('in voteNew function');
                        var voteUrl = '/vote/' + ip + '/' + entry_id + '/' + formatted_date +'/' + 1 
                        //console.log('/' + 'post vote url',voteUrl  + '/');
                        $.post(voteUrl, function(result) {
                            result = result[0];
                            console.log('$.post new rec result', result);
                        }); //end newVote
                    } //end newVote

                function voteUpdate() {
                        console.log('in voteUpdate', result);
                        var id = result.id
                        var createdAt = result.createdAt;
                        var dateCheck = dateCalc(createdAt);
                        var votes = result.vote_counts;
                        url = '/vote/' + id + '/' + votes;
                        console.log('url', url);
                        console.log(dateCheck);


                        if (votes < 5 && dateCheck === true) {

                            var votecount = votes + 1;
                            url = '/vote/' + id + '/' + votecount;

                            console.log('in vote logic');
                            console.log('vote', votes, 'votecount',
                                votecount);

                            $.post(url, function(result) {
                                console.log(url);
                                result = result[0];
                                console.log('$.post update', result);
                            }); 
                        } else{
                            
                        $('#modal2').remodal(open)
                        console.log('max voting reached')


                        } 
                    } //end voteUpdate()

            function dateCalc(created) {
                
                    var todaycompare = new Date();
                    var createOn = new Date(created);
                    var diff = Math.floor((todaycompare - createOn));
                    var diffminutes = diff / (1000*60*60);

                    console.log('in dateCalc check function')
                    console.log('function passed created:',created)
                    console.log('var todaycompare',todaycompare);
                    console.log('var createOn',createOn);
                    console.log('todaycompare','-','createdOn','=','diff',diff);
                    //console.log('minutes in a day(24*60) =1440')
                    //console.log('diff/minutes',diff/1440)

                    if (diffminutes < 1440) {
                        console.log('less then a day true');
                        return true;
                    }
                    else{
                        console.log('dateCalc FALSE/more than a day');
                        return false;
                    }        
                } //  end dateCalc
            }); //end $.get(url, function(result)
        } // end votehandler

   
}); //end on votebutton click
}); //send on ready function

//    if (votes < 5 && dateCheck === true) {
//          var votecount = votes + 1;
//          url = '/vote/' + id + '/' + votecount;
//
//          console.log('in vote logic');
//          console.log('vote', votes, 'votecount',
//                      votecount);

//           $.post(url, function(result) {
//            console.log(url);
//            result = result[0];
//            console.log('$.post update', result);
//        }); 
//  } //end true 