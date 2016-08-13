//1. Needs to limit User to five total votes per day.

//2. User is known through IP address. After 5 votes are made.

//3. A module pops up letting user know there votes are up, and button depressed not allowing more clicks.


<!DOCTYPE html>
<html>
<head>
  <title></title>
</head>
<body>
<script type="application/javascript">
  function getIP(json) {
    document.write("My public IP address is: ", json.ip);
  }
</script>

<script type="application/javascript" src="https://api.ipify.org?format=jsonp&callback=getIP"></script>




</body>
</html>
