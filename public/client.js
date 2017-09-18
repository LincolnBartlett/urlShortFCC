// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  $("#inputBtn").click(function(){ 
    var url = $("#inputURL").val();
      document.location.replace(`https://lincbarturlshort.glitch.me/new/${url}`)
  });

});
