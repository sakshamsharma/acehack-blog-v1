$(document).ready(function() {

$("#skillTable tr").hover(function() {
 var thisRow = $(this).closest('tr'); //parent row of the input or whatever is the click trigger
 var conDiv = $(this).data("href"); //returns #content1 - id of the content div you want shown
 var conH = $(conDiv).height(); //corresponding content div height
 var rowH = $(thisRow).height(); // this row height
 var newrowH = conH + rowH; //the new row height
 var posL = $(thisRow).position().left; // left position that div needs to be
 var posT = $(thisRow).position().top + rowH + 5 + 'px';  // top position that div needs to be ** not working properly!!
 

   if ( $(conDiv).is(":visible") ) {
       $(thisRow).css({"height" : "auto"});
       $(conDiv).css({"display" : "none", "top" : "auto" });
   } else  {
       //reset all rows to normal height
       $("tr").css({"height" : "auto"}); 
       //expand the height of this row
       $(thisRow).css({"height" : newrowH});
       
       // reset all content divs.. hide them             
       $("[id*=content]").css({"display" : "none", "top" : "auto"}); 
       //show the one you want
       $(conDiv).css({"display" : "block", "top" : posT});
   }
});

});
