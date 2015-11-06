function convert(str) {
  var ht = atob(str);
  document.getElementById("contentGoesHere").innerHTML= ht;
  $("#contentGoesHere").trigger("create");
}
