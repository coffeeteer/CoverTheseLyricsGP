$(document).ready(function() {
$('.votebutton').on("click", function() {
    
    var entry_id = $(this).attr("id");
    var ip
    var d = new Date();
    var currentDate = d.toISOString().substring(0, 10);


    console.log('entry_id',entry_id);
    console.log('d',d,'currentDate',currentDate)

    getIP();

function getIP() {
    $(function() {
        $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
            function(json) {
                ip = json.ip;
                voteHandler(ip);
            });
    });
}; // end ip get


function voteHandler(ip) {
        console.log('start voteHandler function')
        console.log('ip received', ip);

        var d = new Date();
        var today = d.toISOString();
        var formatted_date = today.slice(0, 10);
        //var url = '/vote/' + ip + '/' + entry_id + '/' + formatted_date;
        var url = '/vote/' + ip + '/' + entry_id + '/' + formatted_date;
        console.log('voteHandler: var today', today);
        console.log('voteHandler: check for record var url', url);
        //check if voted 
        $.get(url, function(result) {
            console.log('vote get result', result);
            if (result === null) {
                console.log('result = null call voteNew()');
                voteNew(url);
            } else {
                console.log('else call voteUpdate()');
                voteUpdate(url);
            }

            function voteNew(url) {
                    console.log('in new vote count');
                    console.log('true:vote_count === null');
                    var voteUrl = '/vote/' + ip + '/' + 1 + '/' + entry_id + '/' + formatted_date

                    console.log('/' + 'post vote url',voteUrl  + '/');
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
                    if (votes < 2 && dateCheck === true) {
                        var votecount = votes + 1;
                        url = '/vote/' + id + '/' + votecount;
                        console.log('in vote logic');
                        console.log('vote', votes, 'votecount',
                            votecount);
                        $.post(url, function(result) {
                            console.log(url);
                            result = result[0];
                            console.log('$.post update', result);
                        }); //end put
                    } //end true 
                } //end voteUpdate()

            function dateCalc(created) {
                    var todaycompare = new Date();
                    var createOn = new Date(created);
                    var diff = Math.floor((todaycompare - createOn));
                    var diffminutes = diff / (60 * 1000);
                    if (diffminutes < 1440) {
                        console.log('less then a day true');
                        return true;
                    }
                    console.log('diff', diff, 'diffminutes',
                        diffminutes);
                    console.log('todaycompare', todaycompare, 'created',
                        createOn);
                } //  end dateCalc
        }); //end $.get(url, function(result)
    } // end votehandle

   
}); //end on votebutton click
}); //send on ready function