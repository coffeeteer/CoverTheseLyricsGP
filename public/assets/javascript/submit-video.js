
$('#submission').on("click", function(){

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
  $.post( currentURL + "/api/new", newCharacter)
    .done(function(data){
      console.log(data);
    })

//reset form 
  $("#fullName").val("");
  $("#state").val("");
  $("#eMail").val("");

  return false;

});



