$(function(){

$('#searchform').submit(function(){
    // get current velue and add to items list
    var searchterms= $("#searchterms").val();
    //call our search youtube function

  getResultsFromOMDB(searchterms);
  return false;

});

});

function getResultsFromOMDB (searchterms){
    // call youtube API using AJAX
    //build url for the request
    var url="http://www.omdbapi.com/?apikey=f930c283"+ searchterms;
    //use jquery json shortcut
    $getJSON(url, function(jsondata){
      //handle the results
      addResultTitles(jsondata);

    });
}

function addResultTitles(jsondata){
    //create a string to contain our HTML code to inject 
    var htmlstring="";
    //iterate over the collection of results 
    for (var i=0; i<10; i++){
      var title = jsondata.Search[i].Title;
      htmlstring +="<li>"+title+"</li>";

    }
    //inject the HTML into our emty list
    $("#results").html(htmlstring);

  
}