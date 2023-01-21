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



function showBestScores() {
    bestScores.setAttribute("class", "button")
    removeAllChildren(quizContainer);
    alert("Results")
    
}

function appendHighScoresElements() {

}



// Timer
var remainingTimeDisplay = document.getElementById('timeLeft');

// Quiz container 
var quizContainer = document.getElementById('quiz-container');


// BODY
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
quizListContainer.setAttribute("id", "list-container");
// UL List 
var quizUl = document.createElement('ul');
// List element that will be assigned questions dynamically
var quizli = document.createElement('li')

// Feedback elements
// Display correct / wrong answer
var quizFeedbackContainer = document.createElement('div')    
    quizFeedbackContainer.setAttribute("class", "feedback-container")
var quizFeedback = document.createElement('div');
quizFeedback.setAttribute('class', "feedback")
var nextButton = document.createElement('button');
nextButton.setAttribute('class', 'button');



// Quiz summary screen elements
var summaryTitle = document.createElement('h2');    
var summaryScore = document.createElement('h3');
var userName = document.createElement('input');
https://stackoverflow.com/questions/12274748/setting-multiple-attributes-for-an-element-at-once-with-javascript
    Object.assign(userName, {        
        autocomplete: 'none',        
        placeholder: "Nickname",
        id: 'initials'
    })
    
    
var submitScore = document.createElement('button');
submitScore.innerText = "Submit";
submitScore.setAttribute('class', 'button');


/**
 * Remove All Child Nodes
 * Function source https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
 * @param parent container
 */
function removeAllChildren(parent) {
    
    // parent.innerHTML = ""
    
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//! quizContainer.innerHTML = ""


/**
 * Format how time is displayed based on allowed time
 */
function displayRemainingTime() {
    if (remainingTime >= 3600) {
        remainingTimeDisplay.textContent = parseInt(remainingTime / 3600).toString().padStart(2, '0')
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0') 
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0');
    } else {
        remainingTimeDisplay.textContent = parseInt(remainingTime / 3600).toString().padStart(2, '0')
        + ":" 
        + parseInt(remainingTime / 60).toString().padStart(2, '0') 
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0');
    }    
}

/**
 * Reset all variables
 * Show updated time remainig 
 * Load welcome screen elements
 */
function init() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    isLastQuestion = false;
    remainingTime = questionTimeLimit * questionsArray.length;

    highScores = JSON.parse(localStorage.getItem('high scores'));

    
    if (!highScores) {
        highScores = [];
    }

    displayRemainingTime()
    showWelcomeScreen();
}

/**
 * Defining timer function that will update remaining time 
 * every second
 * If time runs out the quiz will end
 */
function startTimer() {
    trackRemainingTime = setInterval(function() {
        if (remainingTime > 0) {
            remainingTime--;
            displayRemainingTime();
        // End quiz if time reaches zero
        } else {
            endQuiz();
        }     
    }, 1000);
}

/**
 * Start the counter that will update remaining time every second
 * Remove all welcome elements from welcome screen
 * Load first quesiton elements
 */
function startQuiz() {
    bestScores.setAttribute("class", "button disabled")
    startTimer();
    removeAllChildren(quizContainer);
    displayQuestion();    
}

/**
 * Show all elements of the weclome screen
 */
function showWelcomeScreen() { 
    quizContainer.appendChild(startHeader);
    quizContainer.appendChild(startMessage1);
    quizContainer.appendChild(startMessage2);
    quizContainer.appendChild(startMessage3);
    quizContainer.appendChild(startQuizButton);    
}


/**
 * Append all question element to quiz container
 */
function appendQuestionElements() {
    quizContainer.appendChild(quizQuestionNumber)
    quizContainer.appendChild(quizQuestion);
    quizContainer.appendChild(quizListContainer)
    quizListContainer.appendChild(quizUl);
    // Create and append as many elements as there is possible answers
    for (itemIndex in questionsArray[currentQuestionIndex].answers) {
        newListItem = document.createElement('li');        
        quizUl.appendChild(newListItem);        
    }
}

/**
 * Update question elements with information from next available question
 * Reset/assign proper styling for possible answers (li elements) 
 */
function updateQuestionElements() {
    quizQuestionNumber.textContent =  "Question " + (currentQuestionIndex + 1) + "/" + questionsArray.length;
    quizQuestion.textContent = questionsArray[currentQuestionIndex].question;
    
    var listItems = quizUl.querySelectorAll('li');
    
    for (var i = 0; i < 4; i++) {        
        listItems[i].textContent = questionsArray[currentQuestionIndex].answers[i];               
    }   
    enableListItems();
}

/**
 * Reset/assign proper styling for possible answers (li elements)
 */
function enableListItems() {
    var listItems = quizUl.querySelectorAll('li');
    
    for (var i = 0; i < 4; i++) {        
        listItems[i].setAttribute("class", "question");
    }
}


function displayQuestion() {    
    // Check to see if currentQuestionIndex is not out of range
    if (questionsArray[currentQuestionIndex] != undefined) {
        // Append question elements on first question
        if (currentQuestionIndex === 0){            
            appendQuestionElements();
        } 
        updateQuestionElements();       
    }
    else {
        // No more questions to display
        // Provide summary        
        endQuiz();
    }
}


function submitAnswer(event) {
    var element = event.target;
    if (element.matches('li')) {
        
        showFeedback()
        
        var listItems = quizUl.querySelectorAll('li');

        for (item of listItems) {        
            if (item.textContent === element.textContent) {
                if (element.textContent[0] === questionsArray[currentQuestionIndex].questionAnswer) {
                    element.setAttribute("class", "correct disabled")
                    quizFeedback.textContent = "Correct ✔";
                    correctAnswers++;
                } else {
                    element.setAttribute("class", "incorrect disabled")
                    quizFeedback.textContent = "Wrong ✖";
                    if (remainingTime > 10) {
                        if (!isLastQuestion) {
                            remainingTime-=10;
                        }
                    } else {
                        remainingTime = 0;
                        endQuiz();
                    }
                }
            } else {
                if (item.textContent[0] === questionsArray[currentQuestionIndex].questionAnswer) {
                    item.setAttribute("class", "correct disabled")
                } else {
                    item.setAttribute("class", "disabled");
                }
                
            }                
        }    
    }
}      


function showFeedback() {

    quizContainer.appendChild(quizFeedbackContainer);       
    quizFeedbackContainer.appendChild(quizFeedback);
    quizFeedbackContainer.appendChild(nextButton);
    
    if (questionsArray[currentQuestionIndex + 1] == undefined) {
        isLastQuestion = true;
        nextButton.textContent = "Check Score";           
        clearInterval(trackRemainingTime);
    } else {
        nextButton.textContent = "Next question >";
    }
    
}

function endQuiz() {    
    removeAllChildren(quizUl)
    removeAllChildren(quizContainer);
    displayRemainingTime();
    clearInterval(trackRemainingTime);    
    showSummaryScreen();    
}


function showSummaryScreen() {
    finalScore = parseInt((correctAnswers / questionsArray.length) * 100)

    if (remainingTime > 0) {
        summaryTitle.textContent = "All done!"
    } else {
        summaryTitle.textContent = "Time's up!"
    }

    quizContainer.appendChild(summaryTitle);
        
    summaryScore.textContent = "Your final score is " + finalScore; 
    quizContainer.appendChild(summaryScore);    
    quizContainer.appendChild(userName);
    quizContainer.appendChild(submitScore)
    userName.focus();
}

function upadateHighScores(event) {
    
    event.preventDefault();

    userScore = {
        initials: userName.value,
        score: finalScore
    }; 

    highScores.push(userScore);



    var sortedScores = highScores.sort((a, b) => {
        if (a.score === b.score) {
            return 0;    
        } else if (a.score > b.score) {
            return -1
        } else {
            return 1
        };
    })


    localStorage.setItem("high scores", JSON.stringify(sortedScores));
    
    // TODO: display best scores
    userName.value = "";
    

    // TODO: remove init function
    showBestScores();
}


// Event listeners
bestScores.addEventListener('click', showBestScores);

startQuizButton.addEventListener("click", startQuiz);

quizUl.addEventListener("click", submitAnswer);

nextButton.addEventListener("click", function (){
    removeAllChildren(quizFeedbackContainer);
    quizContainer.removeChild(quizFeedbackContainer);             
    currentQuestionIndex++;
    displayQuestion();               
});

submitScore.addEventListener('click' , upadateHighScores)


// Display welcome screen
init()

