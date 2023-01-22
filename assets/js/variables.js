// VARIABLES

// Defining Global variables
var highScores;
var userScore;
var currentQuestionIndex = 0;
const questionTimeLimit = 90;
var remainingTime;
var correctAnswers = 0;
var finalScore = 0;
var trackRemainingTime;
var isLastQuestion = false;


// Creating DOM Elements

// HEADER
// High scores
var bestScores = document.getElementById('scores');
// Timer
var remainingTimeDisplay = document.getElementById('timeLeft');


// BODY
// Quiz container 
var quizContainer = document.getElementById('quiz-container');

// Quiz welcome/start screen elements
var startHeader = document.createElement('h2');
    startHeader.setAttribute("class", "center");
    startHeader.textContent = "Coding Quiz Challenge";
var startMessage1 = document.createElement('p');
    startMessage1.setAttribute("class", "center start");
    startMessage1.textContent = "Try to answer the following code-related questions within the time limit."
var startMessage2 = document.createElement('p');
    startMessage2.setAttribute("class", "center start");
    startMessage2.textContent = "You will have " + questionTimeLimit + " seconds to answer each question."
var startMessage3 = document.createElement('p');
    startMessage3.setAttribute("class", "center start");
    startMessage3.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
var startQuizButton = document.createElement("button");
    startQuizButton.setAttribute("class", "button start");
    startQuizButton.textContent = "Start Quiz";

// Questions elements
// Question number
var quizQuestionNumber = document.createElement('h4');
// Question title
var quizQuestion = document.createElement('h2');
// Flex container for UL list
var quizListContainer = document.createElement('div');
    quizListContainer.setAttribute("class", "list-container");
// UL List 
var quizUl = document.createElement('ul');

// Feedback elements
// Display correct / incorrect answer
var quizFeedbackContainer = document.createElement('div')    
    quizFeedbackContainer.setAttribute("class", "feedback-container")
var quizFeedback = document.createElement('div');
    quizFeedback.setAttribute('class', "feedback")
var feedbackButton = document.createElement('button');
    feedbackButton.setAttribute('class', 'button');


// Quiz summary screen elements
// Dislay end of quiz header
var summaryTitle = document.createElement('h2');    
// Display message that will include user's score
var summaryScore = document.createElement('h3');
// Show input box for user to enter initials
var userName = document.createElement('input');
    https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript
    Object.assign(userName, {        
        autocomplete: 'none',        
        placeholder: "Nickname",
        id: 'initials'
    })
// Show submit score button
var submitScore = document.createElement('button');
    submitScore.innerText = "Submit";
    submitScore.setAttribute('class', 'button');    


// Best Results Elements
// Title
var bestScoresTitle = document.createElement('h3');    
    bestScoresTitle.textContent = "Best Scores";
var bestScoresButtonContainer = document.createElement('div');
    bestScoresButtonContainer.setAttribute('class', 'list-container')

    // Buttons
var bestScoresGoBack = document.createElement('button')
    bestScoresGoBack.setAttribute('class', 'button scores');
    
    bestScoresGoBack.textContent = "Go back";
var bestScoresClear = document.createElement('button');
    bestScoresClear.setAttribute('class', 'button scores');
    bestScoresClear.textContent = "Clear scores";