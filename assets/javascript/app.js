var triviaQuestions = [{
	question: "Which is a Wes Anderson movie?",
	answerList: ["Taxi Driver", "Fantastic Mr. Fox", "Rampage", "Silence of the Lambs"],
	answer: 1
},{
	question: "Who will play Venom in the new movie Venom?",
	answerList: ["Tom Hardy", "Adam Sandler", "Brad Pitt", "Bill Shakespeare"],
	answer: 0
},{
	question: "Martin Scorsese's 1976 hit?",
	answerList: ["Taxi Driver", "Silence", "The Age of Innocence", "Goodfellas"],
	answer: 0
},{
	question: "Al Paccino was not in which of the following movies?",
	answerList: ["Scent of a Woman", "The Godfather", "Goodfellas", "Dog Day Afternoon"],
	answer: 2
},{
	question: "Rush hour starred Jackie Chan and which of these actors?",
	answerList: ["Ashton Kutcher", "Will Smith", "Bruce Lee", "Chris Tucker"],
	answer: 3
},{
	question: "In what year did the last Rush Hour movie come out?",
	answerList: ["2007", "2006", "2001", "1998"],
	answer: 0
},{
	question: "In Time Burton's Beetlejuice, what was Michael Keaton's character's name?",
	answerList: ["Clown", "Betelgeuse", "Billy", "Zane"],
	answer: 1
},{
	question: "Michael Keaton amost recently appeared in which of these movies?",
	answerList: ["The Founder", "Dumbo", "Spider-Man: Far From Home", "Birdman"],
	answer: 2
},{
	question: "Who played the lead role in the 2016 movie, The Founder (about the founder of McDonald's)?",
	answerList: ["Amy Poehler", "Michael Keaton", "Will Smith", "Billy Zane"],
	answer: 1
},{
	question: "Billy Crystal was a yankee turned cowboy in this sweet 90's movie",
	answerList: ["Forget Paris", "Analyze That", "Analyze This", "City Slickers"],
	answer: 3
},{
	question: "In what movie did Will Smith jump over a taxi?",
	answerList: ["Independence Day", "Wild Wild West", "Taxi", "Power Rangers"],
	answer: 0
},{
	question: "Who plays Jon Snow in the series Game of Thrones?",
	answerList: ["Nicolas Cage", "Kit Harington", "Nikolaj Coster-Waldau", "Sansa Stark"],
	answer: 1
},{
	question: "How many Mission: Impossible movies make up the film series?",
	answerList: ["4", "8", "7", "6"],
	answer: 3
},{
	question: "Who wrote the novel of the movie A Clockwork Orange?",
	answerList: ["Anthony Burgess", "Spike Lee", "Stanley Kubrick", "Leo DiCaprio"],
	answer: 0
},{
	question: "Who was not in the movie Tropic Thunder?",
	answerList: ["Ben Stiller", "Jack Black", "Owen Wilson", "Tom Cruise"],
	answer: 2
}];

var gifArray = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13','q14','q15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "yes, good",
	incorrect: "nuh uh",
	endTime: "time is up, sir!",
	finished: "let's check out the stats"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}