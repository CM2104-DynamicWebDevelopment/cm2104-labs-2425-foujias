$(function(){
    alert("document ready");

$('#searchform').submit(function(){
  addItemToList("example item");
  return false;

});

});
function addItemToList (item){
$('#results').append("<li>" +item+ "</li>"); //add the “item” into our list


}



//listener tied to the form submit button
// return false -this just stops the page reloading


