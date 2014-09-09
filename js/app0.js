  	
/*Author: Mai, Bide
  Date: 9/4/14
  subject: javascript for Thinful Quiz project

  Reminders: 1) Add password 2) Add "Previous Q" button 
*/
  /*-------INITIALIZATION-------*/
  /*---Global Variables ---*/
  var nextQClicked = false;
  var submitAnsClicked = false;

  var tab1TextClicked = false;
  var tab2TextClicked = false;
  var tab3TextClicked = false;
  var quizResultRdy = false;
  var quizQNum = 0;
  var maxNumQ = 3;//This means 4 total questions
  var qQ = "Question No.";
  var qA = "Response No.";
  var totalCorA = 0;//total correct ans
  var quizReference = [];
  var quizQuestion = [];//quiz questions
  var quizAnswer = [[]];//possible answers for ea question
  var quizCorAns = [];//correct ans for Qs [0],[1]..

   /*--Create H-E  Quiz object--*/
  var heQuiz = new Quiz();
  
  /*----Arrays----*/
  heQuiz.initializeArrays();

/*Start UI execution after DOM loaded*/
$(document).ready(function(){
	
  /*------QUIZ CONTROL CENTER--------*/
  //$("#tab1 section").show();//Make sure this tab is displayed first 
  $("#tab2Text").click(function(event){
      heQuiz.setupQuiz();
  });

  $("#tab3Text").click(function(event){
    heQuiz.displayQuizResult();
  });

  $("#submitAns").click(function(event){
    event.preventDefault();//(H1--prevents resetting)
    heQuiz.submitReponse();
  });

  $("#nextQ").click(function(event){
     heQuiz.showNxtQuestion();
  });

  $("#reTakeQuiz").click(function(event){
    heQuiz.resetQuiz();
  });
});

  /*-------NAMED FUNCTIONS-------*/
    /*----Constructor Object, Properties and Methods---*/
  function Quiz () {
    //this.quizQuestion1 = quizQuestion1;
    //this.quizQNum1 = quizQNum1;
    this.setupQuiz = function () {
        setUpQuiz();
        return 0;
    }
    this.displayQuizResult = function () {
        showQuizResult();
        return 0;
    }
    this.submitReponse = function () {
        submitUserResp();
        return 0;
    }
    this.showNxtQuestion = function () {
        showQuestion();
        return 0;
    }
    this.resetQuiz = function () {
        reSetupQuiz();
        return 0;
    }
    this.initializeArrays = function(){
      quizCorAns = [3,0,1,2];//correct ans for Qs [0],[1]..
      quizReference[0] = "https://www.google.com/intl/en/about.html?fg=1";
      quizReference[1] = "https://www.google.com/intl/en/about.html?fg=1";
      quizReference[2] = "https://www.google.com/intl/en/about.html?fg=1";
      quizReference[3] = "https://www.google.com/intl/en/about.html?fg=1";

      for (var i = 0; i <=maxNumQ; i++) {
        quizAnswer[i] = new Array(4);
      }
      
      for(var i=0; i<=maxNumQ;i++){
        quizQuestion[i] = qQ + (i+1);
        for(var j=0; j<=maxNumQ;j++){
            quizAnswer[i][j] = qA + (j+1);
        };
      };
    }
  };

  var setUpQuiz= function () {
    tab2TextClicked=true;
    if(quizQNum==0){
    $("#nextQ").hide();
    totalCorA=0;
    var response= checkRadioInput();
    updateUI("tab2Text",response);
    }
  }
  var showQuizResult= function () {
    if(quizResultRdy){
      $("#quizResult").show();
      $("#infoOnQuestions").show();
      tab3TextClicked = false;
      updateUI("tab3Text",NaN);
    }
    else{
      //$("#tab3 section").hide();
      $("#quizResult").hide();
      $("#infoOnQuestions").hide();
    }
  }
  var submitUserResp= function () {
    submitAnsClicked = true;
    if(tab2TextClicked &&(!quizQNum||nextQClicked )){
      
      var response= checkRadioInput();
      if(response <= maxNumQ&&response >= 0){
        nextQClicked = false;
        updateUI("submitAns",response);
        $("#nextQ").show();
        quizQNum++;
        if(quizQNum>maxNumQ){
          $("#nextQ").show();
          $("#nextQ").attr("href","#tab3");
          $("#nextQ").text("Quiz Results");
        }
      }
      //$("#submitAns").hide();
      //if(quizQNum<=maxNumQ){$("#nextQ").show();}
      else{
        /*$("#nextQ").show();
        $("#nextQ").attr("href","#tab3");
        $("#nextQ").text("Quiz Results");*/
        alert("Please select an answer");
      }
    }
    else{
      //if(#submitAns clicked more than once && response same
      ;//clear Radio buttons)
    }
  }
  var showQuestion = function(){
    if(submitAnsClicked && (quizQNum<=maxNumQ)){
      nextQClicked = true;
      if(quizQNum==0) return 0;
      //submitAnsClicked = false;
      var response= checkRadioInput();
      if(response <= maxNumQ&&response >= 0){
        updateUI("nextQ",response);//Clear Radio Button
      }
      //$("#submitAns").show();
      $("#nextQ").hide();
      if(quizQNum==maxNumQ){
        quizResultRdy = true;}
    }
    //update Quiz Result
    else if(quizResultRdy){
      $("#quizResult").show();
      $("#infoOnQuestions").show();
      //quizResultRdy = true;//set to access quiz Result
    }
    submitAnsClicked = false;
  }
  var reSetupQuiz = function(){
    if(quizResultRdy||quizQNum==0){
      quizResultRdy=false;
      tab2TextClicked=true;
      quizQNum=0;
      totalCorA=0;
      $("#nextQ").hide();
      $("#quizResult").hide();
      $("#infoOnQuestions").hide();
      $("#respImage").attr("src","");
      $("#nextQ").text("Next Question");
      $("#nextQ").attr("href","#tab2");
      var response= checkRadioInput();
      updateUI("tab2Text",response);
    }
  }
  
  var checkRadioInput = function(){
    for(var j=0; j<=maxNumQ;j++){
      //var radioValue = $("form #ans1[type='radio']:checked").val();
      var radioValue = document.getElementById("ans"+j).checked;
      //document.getElementById("ans1").checked = false;
      if(radioValue){return j;}      
    }
    return NaN;//no button checked
  }

  var updateUI = function (element, data) {
    var quizQNum1 = quizQNum+1;//Adjust so display natural order
    if(element==="tab2Text"){
       $("#quizQ").text(quizQuestion[quizQNum]);//Display guess result
       $("#quizQNum").text((quizQNum+1)+")");//Update # of guesses 
       for(var j=0; j<=maxNumQ;j++){
          //$("#ans1").val("Test 1");//(quizAnswer[0][j]);
          $(".ans"+j).html(quizAnswer[quizQNum][j]);
       };
       $("#corIncor").text("");
       $("#numCorResp").text("0");
       $("#numCorRespR").text("0");
       if(!isNaN(data)){document.getElementById("ans"+data).checked=false;}
       //$("#guessList").html("<li>"+guessNum+"</li>");//Build list of guesses
    }
    else if(element==="submitAns"){
      if(data==quizCorAns[quizQNum]){
          totalCorA++;
          $("#corIncor").text("Correct!");
          $("#corIncor"+quizQNum).text("Correct!");
          $("#numCorResp").text(totalCorA);
          $("#numCorRespR").text(totalCorA);
          $("#ref"+quizQNum).attr("href",quizReference[quizQNum]);
          //Update image response to correct ans
          if(totalCorA==1){
            //$('.ryu-still').show();
            $("#respImage").attr("src","images/ryu-standing-still.png");
          }
          else if (totalCorA==2) {
            $("#respImage").attr("src","images/ryu-cool.gif");
          }
          else if (totalCorA==3) {
            $("#respImage").attr("src","images/ryu-ready-position.gif");
          }
          else if (totalCorA==4) {
            playHadouken ();
            $("#respImage").attr("src","images/ryu-throwing-hadouken.png");
          }/**/
      }
      else{
          $("#corIncor").text("Incorrect");
          $("#corIncor"+quizQNum).text("Incorrect");
      }
    }
    else if(element==="nextQ"){
      //Display new Q#, Q, clear checked Radio button
      $("#quizQ").text(quizQuestion[quizQNum]);//Display guess result
      $("#quizQNum").text((quizQNum+1)+")");//Update # of guesses 
      if(!isNaN(data)){document.getElementById("ans"+data).checked=false;}
    }
    else if(element==="tab3Text"){
      $("#userGuess").val("");//(H3) Display "Enter another guess
      $("#guessList").empty();//Clear guess list
    }
    return 0;
  };

  var playHadouken= function () {
    $('#hadouken-sound')[0].volume = 0.5;
    $('#hadouken-sound')[0].load();
    $('#hadouken-sound')[0].play();
  }
  


