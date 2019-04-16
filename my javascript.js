//Nina's Java Script File

//Define the User
var user = {
	firstName: "",
	totalCorrect: 0,
	percentage: 0,
	letterGrade: ''
};

//Define the Questions Array
var questions = [];
var questionIndex = 0;
var selections = [];


//retrive a JSON Payload for the questions

function requestQuestions (){
	var JSONQuestions;
	var xmlhttp = new XMLHttpRequest(); //SETUP A XML HTTP REQUEST CONNECTION
	xmlhttp.onreadystatechange = function() { //STATE CHANGE FOR THE HTTP CONNECTION
		if (this.readyState == 4 && this.status == 200) { //RETURN A VALID AND PROPER JSON RESPONSE
			var questionsDB = JSON.parse(this.responseText); //PARSE THE JSON OBJECT AND PUT IT INTO A VARIABLE
			populateQuestionObject(questionsDB);
			console.log(questions);	
		}
	}
	xmlhttp.open("GET", "https://opentdb.com/api.php?amount=10&type=multiple", true); //URL REQUEST
	xmlhttp.send(); //SEND REQUEST
}

function populateQuestionObject(JSONQuestions){
	//var questions = [];
	for (i = 0; i < JSONQuestions.results.length; i++) //LOOP THROUGH THE QUESTIONS
		 {
		 	var question = new Object();
		 	question.category = JSONQuestions.results[i].category;
		 	question.type = JSONQuestions.results[i].type;
		 	question.difficulty = JSONQuestions.results[i].difficulty;
		 	question.questionValue = JSONQuestions.results[i].question;
		 	question.correctAnswer = JSONQuestions.results[i].correct_answer;
		 	question.incorrectAnswer = [];
		 	for (j = 0; j < JSONQuestions.results[i].incorrect_answers.length; j++) //LOOP INCORRECT ANSWERS
		 		{
		 			question.incorrectAnswer.push(JSONQuestions.results[i].incorrect_answers[j]);
		 		}
		 	questions.push(question);
		 }
}

window.onload = function () {
	requestQuestions();
	console.log('Hello Nina');
	}


//function to store first name
function storeFirstName(){
	user.firstName = document.getElementById("fName").value;
	console.log(user.firstName);
	var form = document.getElementById("form");
	var formChild = document.getElementById("firstName");
				form.removeChild(formChild);
			document.getElementById("yourName").innerHTML = "<strong> Quiz Time! </strong>";
	return displayQuestion();
};



//display first question 
function displayQuestion(){

  	var category = questions[questionIndex].category;
  	var theQuestion = questions[questionIndex].questionValue;
  	var optionA = questions[questionIndex].incorrectAnswer[0];
	var optionB = questions[questionIndex].incorrectAnswer[1];
	var optionC = questions[questionIndex].incorrectAnswer[2];
	var optionCorrect = questions[questionIndex].correctAnswer;


  	document.getElementById('questionsDemo').innerHTML = '<strong>Category:</strong> ' + category + '<br>';
	document.getElementById('questionsDemo').innerHTML += '<br>' + '<strong>Question:</strong> ' + theQuestion + '<br>';
	document.getElementById('questionsDemo').innerHTML += "<input type='radio' name='choices' value='A'>" + optionA + '<br>';
	document.getElementById('questionsDemo').innerHTML += "<input type='radio' name='choices' value='B'>" + optionB + '<br>';
	document.getElementById('questionsDemo').innerHTML += "<input type='radio' name='choices' value='C'>" + optionC + '<br>';
	document.getElementById('questionsDemo').innerHTML += "<input type='radio' name='choices' value='correct'>" + optionCorrect + '<br>';
	document.getElementById('questionsDemo').innerHTML += "<button id='next' onclick='checkAnswer()'>Submit</button>" + '<br>';
}
  

//function to store answers
function checkAnswer(){
choices = document.getElementsByName('choices');
  for(i=0; i<choices.length; i++){
    if(choices[i].checked){
    	selections.push(choices[i].value);
    }
    // check if answer is correct
 	if(choices[i].checked && choices[i].value === 'correct'){
 		user.totalCorrect++
 	}
  }

questionIndex++;

if(questionIndex >= questions.length){
displayFinal();
} else {
	displayQuestion();
	}
}

function displayFinal(){

	var nameDiv = document.getElementById("yourName");
		nameDiv.remove();

	var questionDiv = document.getElementById("questionsDemo");
		questionDiv.remove();

  	user.percentage = (user.totalCorrect/questions.length)*100;
	
	if(user.percentage > 89){
		user.letterGrade = 'Wow, you must be perfect! You get an A!';
	} else if (user.percentage < 90 && user.percentage >= 79){
		user.letterGrade = 'You are a little special. You get a B!';
	} else if(user.percentage < 80 && user.percentage >= 69){
		user.letterGrade = 'You are pretty average. You get a C!';
	} else if(user.percentage < 70 && user.percentage >= 59){
		user.letterGrade = 'They say practice makes perfect. Keep at it and try again later. You get a D!';
	}else{
		user.letterGrade = 'Yikes! You Failed!';
	}

  	document.getElementById('final').innerHTML += 'Congrats ' + user.firstName + ' !'+ '</br>';
	document.getElementById('final').innerHTML += '</br>' + 'You got ' + user.totalCorrect + ' correct out of ' + questions.length + ' total questions'+ '</br>';
	document.getElementById('final').innerHTML += 'Which is a score of ' + user.percentage +' %' + '</br>';
	document.getElementById('final').innerHTML += '</br>' + user.letterGrade + '</br>';

	return;
  } 


//function to calcuate Letter Grade - user && || operator to calculate



