

let url = 'http://127.0.0.1:5500/Final2/js/faqs.json'
let faqs= []

$(document).ready(function() {

  //Use AJAX method to load Json file
  $.getJSON(
    url,
    function(data){
      //Loop through all questions and display on webpage
      $.each(data, function(i, question){
        //Display question and answer
        $("#questions").append('<div class="tx">'+'<p class="question-style">' + question.question + '</p>'+
                               '<p class="answer-style">' + question.answer + '</p>'+'</div>');
      });

      //Store these questions in the variable
      faqs = data;
  
    }
  );

  //Add event to the button "search"

});
$("input#searchBtn").click(function(){
  //Clear the questions
  $("#questions").html("");

  //Use filter() method to get questions containing keywords
  let searchKeyWord = $("input#searchInput").val();
  let results = faqs.filter(function(faqs){
    return faqs.question.indexOf(searchKeyWord) > -1;
  });

  //Display the results on webpage
  if (results.length == 0) {
    //No results
    $("#questions").html("No results!!!!!");
  } else {
    //Loop through all filted questions
    for(var i=0; i < results.length; i++) {
      $("#questions").append('<div class="tx">'+'<p class="question-style">' + results[i].question +'</p>'
                              +'<p class="answer-style">' + results[i].answer + '</p>'+'</div>');
    }
  }
});

function openNav() {
	document.getElementById("curtain-nav").style.width = "50%";			
}

function closeNav() {
	document.getElementById("curtain-nav").style.width = "0%";			
}