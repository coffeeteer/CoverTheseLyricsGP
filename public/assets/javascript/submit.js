$(document).on('confirmation', '.remodal', function () {
  console.log('Confirmation button is clicked');
  
  $("#submitForm").submit();
});