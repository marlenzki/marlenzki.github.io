var original = $("#searchArea").clone();

$('#searchBar').bind("enterKey",function(e){
  $("#btnGroupId").animate({"margin-top":"2%"});
  $("#label1").fadeOut();
  var desiredSearch = $("#searchBar").val().split(" ").join("%20");
 deleteOldResults();
 getResults(desiredSearch);
});
  
function WidenBar(){
  $("#btnGroupId").animate({"width":"50%"}); 
  $("#searchBar").css("cursor","text");
  $("#label1").fadeOut();
  $("#searchclear").css("visibility","visible");
};

function CloseBar(){
  $("#btnGroupId").animate({"width":"35px"}); 
  $("#searchBar").css("cursor","pointer");
  $("#label1").fadeIn();
  $("#searchclear").css("visibility","hidden");
};
 
$('#searchBar').focus(function(){  //when user clicks circle, widen input
  WidenBar();
  
});

$("#searchclear").click(function(){
  $("#searchBar").val("");
  deleteOldResults();
  CloseBar();
});


$('#searchBar').blur(function(){  
  CloseBar();
});





  
  
$('#searchBar').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});


function getResults(desiredSearch){
   var wikiURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+desiredSearch+"&utf8=";
  $.ajax({ //open ajax1
        dataType: "jsonp",
        url:wikiURL,
        success: function(json){ //oppen success1
          for(i=0;i<json.query.search.length;i++){ //open for loop thru each result
            var pageID = String(json.query.search[i].pageid);
            var searchTerm = json.query.search[i].title.split(" ").join("%20");
            $("#Results").append("<a target='_blank' href='https://en.wikipedia.org/?curid=" + pageID + "'><div class='result' id='result"+i+"'><strong>"+json.query.search[i].title + "</strong><br><br></div></a>");
            //$("#result"+i).slideDown("slow");
            getDetails(i,searchTerm,pageID);
          }; //close for loop
        
        }, //close success1
        error: function(){ //open error1
          alert("error, plz try again!");
        }, //close error1
        cache: false
      }); //close ajax1
  $("#searchBar").off("blur");
} //close function

function deleteOldResults(){
  $('.result').fadeOut(300, function(){ 
    $(this).remove();
  });
}




function getDetails(i,searchTerm,pageID){
   $.ajax({ // do addittional api call for each result open ajax2
              dataType: "jsonp",
              url:"https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles="+searchTerm,
              success: function(json_2){ //open success2 
                var content = json_2.query.pages[pageID].extract;
               
                $("#result"+i).append(content);
               //$("#Results").show();
                //$("#result"+i).slideUp("slow").delay(100).fadeIn("slow");
                //alert(i);
                //alert(content);
               }, //close success2
              error: function(){ //open error2
                     alert("error");

              }, //close error2
              cache: false
            }); //close ajax2
};