  	
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

  var mx_periods = 1;
  var mx_langs = 1;
  var rec_counter = 0;
  var total=[];
   /*--Create H-E  Quiz object--*/
  var heQuiz = new Quiz();
  
  /*----Arrays----*/
  heQuiz.initializeArrays();

/*Start UI execution after DOM loaded*/
$(document).ready(function(){
	
  /*------PROGRAMMING-INTEREST TREND CONTROL CENTER--------*/
  $('.trendInput').submit( function(event){
    
    // zero out results if previous search has run
    $('.trendTable .trendData').html('');
    rec_counter=0;
    mx_periods = 1;
    mx_langs = 1;
    rec_counter = 0;
    total.length= 0;//clear array
    mx_total = 0;
    // get the value of the tags the user submitted
    var lang = $(this).find("select[name='lang']").val();
    var period = $(this).find("select[name='period']").val();
    var sub_period = $(this).find("select[name='subPeriod']").val();
    if(lang.length==0||period.length==0){ return;}
    getData(lang,period,sub_period);
    
  });

/*------QUIZ CONTROL SECTION------------*/
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

  /*-------NAMED FUNCTIONS FOR QUIZ SECTION-------*/
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
      
      //
      quizReference[0] = "#tab4";
      quizReference[1] = "#tab4";
      quizReference[2] = "#tab4";
      quizReference[3] = "#tab4";
      quizQuestion[0] = "Which text-notation language has gained the greatest rate of interest over the past 6 years?";// XML, JSON, SGML, JSONP?";//JSON
      quizQuestion[1] = "Which programming language has generated the greatest rate of interest over the past 6 years?";//C#,C,C++,(Java)
      quizQuestion[2] = "Which is the most widely used server-side scripting language  over the past 6 years?";// (PHP), Ruby, Python, Perl
      quizQuestion[3] = "Which mobile OS has lost the most traction over the last two years?";//iOS, android, windows-mobile, (Blackberry) 
      
      //Create muti-dimen array
      for (var i = 0; i <=maxNumQ; i++) {
        quizAnswer[i] = new Array(4);
      }
      quizAnswer[0][0]= "JSONP";
      quizAnswer[0][1]= "XML";
      quizAnswer[0][2]= "SGML";
      quizAnswer[0][3]= "JSON";

      quizAnswer[1][0]= "Java";
      quizAnswer[1][1]= "C++";
      quizAnswer[1][2]= "C#";
      quizAnswer[1][3]= "C";

      quizAnswer[2][0]= "Ruby";
      quizAnswer[2][1]= "PHP";
      quizAnswer[2][2]= "Perl";
      quizAnswer[2][3]= "Python";

      quizAnswer[3][0]= "Window Mobile (Phone)";
      quizAnswer[3][1]= "iOS";
      quizAnswer[3][2]= "Blackberry";
      quizAnswer[3][3]= "Android";


      
      /*for(var i=0; i<=maxNumQ;i++){
        quizQuestion[i] = qQ + (i+1);
        for(var j=0; j<=maxNumQ;j++){
            quizAnswer[i][j] = qA + (j+1);
        };
      };*/
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
      for(var j=0; j<=maxNumQ;j++){
          //$("#ans1").val("Test 1");//(quizAnswer[0][j]);
          $(".ans"+j).html(quizAnswer[quizQNum][j]);
       };
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

/*-----NAMED FUNCITONS FOR STACK OVERFLOW API-HACK SECTION----------*/
var langs = [];
var periods = [];
var getData = function(tags,period,sub_period) {
  //split(",");//see also .substring(x,y) and .split("-");
    langs = tags;
    periods = period;
    mx_langs = tags.length;
    mx_periods = periods.length;
    
  
  //Ensure processing of only single range, even if two are inputed 
  if(mx_langs>=mx_periods){
    mx_total = mx_langs;
    mx_periods=1;} 
  else{
    mx_total = mx_periods;
    mx_langs=1;}
  
  //first call to AJAX
  if(langs.length>0){//
    var frm_date =period[0]+"-01-01";//1388534400;//2014-01-01
    var to_date =period[0]+"-01-31";
    getQuestions(tags[0],frm_date,to_date);
  }
}
// this function takes the question object returned by StackOverflow 
// and creates new result to be appended to DOM
var showTrend = function(record) {
  
  // clone our result template code
  var result = $('.templates .trendData').clone();//Issue: w/o "templates", doesn't work
  
  //Set lang
  var lang = result.find('.lang');
  lang.text(record.tag);
  //Set # of questions
  var numQs = result.find('.numQs');
  numQs.text(record.num_ques);
  //Set Period
  var period = result.find('.period');
   period.text(record.fromdate.substr(0,4));//toString(record), .split(",")
  //$('.trendTable').append(result);//???****Need Work?

  return result;
};

/*-----Gets  QuestionS from StackOverflow-------*/ 
// this function takes the results object from StackOverflow
// and creates info about search results to be appended to DOM
var showSearchResults = function(query, resultNum) {
  var results = resultNum + ' results for <strong>' + query;
  return results;
};

// takes error string and turns it into displayable DOM element
var showError = function(error){
  var errorElem = $('.templates .error').clone();
  var errorText = '<p>' + error + '</p>';
  errorElem.append(errorText);
};

var getQuestions = function(tags,from_date,to_date0) {
  //Ex: questions, c++, 2014-01-01 to 2014-12-31;?filter=total 
  // the parameters we need to pass in our request to StackOverflow's API
  var request = {tagged: tags,
                site: 'stackoverflow',
                filter:'total',
                fromdate:from_date,
                todate:to_date0};
  var result = $.ajax({
    url: "http://api.stackexchange.com/2.2/questions",
    data: request,
    dataType: "jsonp",
    type: "GET",
    })
  .done(function(result){
      var trend_record = {tag:tags, num_ques:result.total, fromdate:from_date,
                todate:to_date0};//convert an object to a var

    if(rec_counter<mx_total){//(rec_counter<mx_langs||rec_counter<mx_periods)
      if(result.error_id ) trend_record.num_ques = -result.error_id;
      
      total[rec_counter]=trend_record.num_ques;//modify after call t Stack Xchng OK
      rec_counter++;
      
      //trend: #of Qs vs lang, time fixed
      if(mx_langs>0 && mx_periods==1 ){      
        var frm_date =periods[0]+"-01-01";//1388534400;//2014-01-01
        var to_date =periods[0]+"-01-31";
        var lang = langs[rec_counter];
        setTimeout(function() {
          getQuestions(langs[rec_counter],frm_date,to_date);
        }, 10);//call every 1sec
      }
      //trend: #of Qs vs time, tag fixed      
      if(mx_periods>1 &&rec_counter<=mx_periods){//trend: #of Qs vs lang, time fixed
        //display rest of record, if period range
        if(rec_counter>1){trend_record.tag ="";}
        var record = showTrend(trend_record);
        $('.trendTable').append(record);

        var year = periods[rec_counter];//toString((+period[i]));
        var frm_date = year+"-01-01";
        var to_date = year+"-01-31";
        setTimeout(function() {
            getQuestions(langs[0],frm_date,to_date);
          }, 10);//call every 250msec
      }
      //Run if more than one tag (this implies only one period)
       if(rec_counter>=mx_langs && mx_langs>1){
        rec_counter=0;
        var j = 0;
        var tag;
        var k;
        var tags0 = [];
        var totals = [];
        //Place records in desc order of # of Qs
        for(var j=0;j<(mx_total); j++){
          var total_mx=-1;
          for(var i=0;i<mx_total; i++)
          {
            if(total[i]>total_mx){
              total_mx=total[i];
              tag = langs[i];
              k = i;// index of maxsave
            }
          }
          totals[j]=total_mx;//place numbers in desc order
          tags0[j]=tag;
          total[k]=NaN;

          //display rest of records (trend: #of Qs vs tag, period fixed)
          if(rec_counter==0){trend_record.fromdate =periods[0];}
          else{trend_record.fromdate=""}
          trend_record.tag=tag;
          trend_record.num_ques=total_mx;
          record = showTrend(trend_record);
          $('.trendTable').append(record);
          rec_counter++;
        }
        //langs = tags0;//langs[]re-ordered       
      }
      //display 1st record, if language range
      else if(rec_counter==1&&mx_periods<=1&& mx_langs<=1){
        var record = showTrend(trend_record);
        $('.trendTable').append(record);
      }
    }    
   
  })
  .fail(function(jqXHR, error, errorThrown){
    var errorElem = showError(error);
    $('.search-results').append(errorElem);
  });
};
  
  


