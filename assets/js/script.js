// Declare array of objects/questions
const questionsArray = [
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answers: [
            "a. It is an ordered list of values",
            "b. It is an ordered list of objects",
            "c. It is an ordered list of string",
            "d. It is an ordered list of functions"
        ],
        questionAnswer: "a"        
    },
    {
        question: "Which of the following is correct about JavaScript?",
        answers: [
            "a. JavaScript is an Object-Based language",
            "b. JavaScript is Assembly-language",
            "c. JavaScript is an Object-Oriented language",
            "d. JavaScript is a High-level language"
        ],
        questionAnswer: "a"
    },    
    {
        question: "Which of the following are not server-side Javascript objects?",
        answers: [
            "a. Date",
            "b. FileUpload",
            "c. Function",
            "d. All of the above"
        ],
        questionAnswer: "d"
    },
    {
        question: "How do we write comment in javascript?",
        answers: [
            "a. /* */",
            "b. //",
            "c. #",
            "d. $$"
        ],
        questionAnswer: "b"
    },    
    {
        question: "Why JavaScript Engine is needed?",
        answers: [  
            "a. Both Compiling & Interpreting the JavaScript",
            "b. Parsing the javascript",
            "c. Interpreting the JavaScript",
            "d. Compiling the JavaScript",
        ],
        questionAnswer: "c"
    }
]

// Defining Global variables
var currentQuestionIndex = 0;
const questionTimeLimit = 90;
var remainingTime;
var correctAnswers = 0;
var invalidAnswers = 0;
var finalScore = 0;
var trackRemainingTime;
var isLastQuestion = false;
// Creating DOM Elements


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



// Quiz summary screen elements
var summaryTitle = document.createElement('h2');
    
var summaryScore = document.createElement('p')

// Quiz question container
var quizContainer = document.getElementById('quiz-container');
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

// Display correct / wrong answer
var quizFeedbackContainer = document.createElement('div')    
    quizFeedbackContainer.setAttribute("class", "feedback-container")

var quizFeedback = document.createElement('div');
quizFeedback.setAttribute('class', "feedback")


var nextButton = document.createElement('button');
    nextButton.setAttribute('class', 'button');
    // nextButton.textContent = "Next question >";


var remainingTimeDisplay = document.getElementById('timeLeft');


/**
 * Remove All Child Nodes
 * Function source https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
 * @param parent  
 */
function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

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
function prepareQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    invalidAnswers = 0;
    isLastQuestion = false;
    remainingTime = 30 * questionsArray.length
    displayRemainingTime()
    showWelcomeScreen();
}

/**
 * Start the counter that will update remaining time every second
 * Remove all welcome elements from welcome screen
 * Load first quesiton elements
 */
function startQuiz() {
    
    trackRemainingTime = setInterval(function() {
        if (remainingTime > 0) {
            remainingTime--;
            displayRemainingTime();
        // End quiz if time reaches zero
        } else {
            endQuiz();
        }     
    }, 1000);
    
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
                    invalidAnswers++;
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
    finalScore = correctAnswers / questionsArray.length

    if (remainingTime > 0) {
        summaryTitle.textContent = "All done!"
    } else {
        summaryTitle.textContent = "Time's up!"
    }

    quizContainer.appendChild(summaryTitle);
        
    summaryScore.textContent = "Your final score is " + (finalScore * 100); 
    quizContainer.appendChild(summaryScore);    
    if (confirm("Start again ?")) {
        removeAllChildren(quizContainer);
        prepareQuiz();
    }
}


// Event listeners
startQuizButton.addEventListener("click", startQuiz);

quizUl.addEventListener("click", submitAnswer);

nextButton.addEventListener("click", function (){
    removeAllChildren(quizFeedbackContainer);
    quizContainer.removeChild(quizFeedbackContainer);             
    currentQuestionIndex++;
    displayQuestion();               
});


// Display welcome screen
prepareQuiz()