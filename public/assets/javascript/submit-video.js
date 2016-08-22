
$('#submission').on("click", function(){
  console.log('in submit-video')
  // make a newCharacter obj
  var newSubmission = 
  {
    name: $("#fullName").val().trim(), 
    state: $("#state").val().trim(), 
    email: $("#eMail").val().trim() 
  };

  // grab the url from the window/tab
  var currentURL = window.location.origin;

  // send an AJAX POST-request with jQuery
  $.post( currentURL + "/submit-video", newCharacter)
    .done(function(data){
      console.log(data);
    })

//reset form 
  $("#fullName").val("");
  $("#state").val("");
  $("#eMail").val("");
  $("#url").val("");
  return false;

});



