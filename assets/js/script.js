// Declare array of objects/questions
const questionsArray = [
    {
        question: "Arrays in JavaScript can be used to store _____.",
        optionA: "a. numbers and strings",
        optionB: "b. other arrays",
        optionC: "c. booleans",
        optionD: "d. all of the above",
        answer: "d"        
    },
    {
        question: "Loos in JS:",
        optionA: "a. Option5",
        optionB: "b. Option6",
        optionC: "c. Option7",
        optionD: "d. Option8",
        answer: "a"
    } 
]

// Defining Global variables
var currentQuestionIndex;
var remainingTime;

// Creating DOM Elements


// Quiz welcome/start screen
var startHeader = document.createElement('h2');
startHeader.setAttribute("class", "center");
startHeader.textContent = "Coding Quiz Challenge";
var startMessage1 = document.createElement('p');
startMessage1.setAttribute("class", "center start");
startMessage1.textContent = "Try to answer the following code-related questions within the time limit."
var startMessage2 = document.createElement('p');
startMessage2.setAttribute("class", "center start");
startMessage2.textContent = "Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
var startQuizButton = document.createElement("button");
startQuizButton.setAttribute("class", "button start");
startQuizButton.textContent = "Start Quiz";



// Quiz question container
var quizContainer = document.getElementById('quiz-container');
// Question number
var quizQuestionNumber = document.createElement('h4');
// Question title
var quizQuestion = document.createElement('h2');
var quizListContainer = document.createElement('div');
quizListContainer.setAttribute("id", "list-container");
var quizUl = document.createElement('ul');
// Answers as list items
var quizli1 = document.createElement('li')
// quizli1.setAttribute("class", "question")
var quizli2 = document.createElement('li');
// quizli2.setAttribute("class", "question")
var quizli3 = document.createElement('li');
// quizli3.setAttribute("class", "question")
var quizli4 = document.createElement('li');
// quizli4.setAttribute("class", "question")
// Display correct / wrong answer
var quizAnswerContainer = document.createElement('div')
    // Set it's initial state to hidden
    quizAnswerContainer.setAttribute("class", "answerContainer")
var timerAnswer = document.createElement('div')
timerAnswer.setAttribute("class", "timer");







function startQuiz() {
    resetVariables();
    showWelcomeScreen();
}

function resetVariables() {
    remainingTime = 90;
    currentQuestionIndex = 0;
}

function showWelcomeScreen() {
    quizContainer.appendChild(startHeader);
    quizContainer.appendChild(startMessage1);
    quizContainer.appendChild(startMessage2);
    quizContainer.appendChild(startQuizButton);    
}


function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayFirstQuestion() {    
    
    removeAllChildren(quizContainer);
    displayQuestion();
}

function appendQuestionElements() {
    quizContainer.appendChild(quizQuestionNumber)
    quizContainer.appendChild(quizQuestion);
    quizContainer.appendChild(quizListContainer)
    quizListContainer.appendChild(quizUl);
    quizUl.appendChild(quizli1);
    quizUl.appendChild(quizli2);
    quizUl.appendChild(quizli3);
    quizUl.appendChild(quizli4);
}

function updateQuestionElements() {
    
    enableListItems();

    quizQuestionNumber.textContent =  "Question " + (currentQuestionIndex + 1) + "/" + questionsArray.length;
    quizQuestion.textContent = questionsArray[currentQuestionIndex].question;
    quizli1.textContent = questionsArray[currentQuestionIndex].optionA;
    quizli2.textContent = questionsArray[currentQuestionIndex].optionB;
    quizli3.textContent = questionsArray[currentQuestionIndex].optionC;
    quizli4.textContent = questionsArray[currentQuestionIndex].optionD;   
}

function checkAnswer(element) {
    var listItems = quizUl.getElementsByTagName('li');


    for (let item of listItems) {        
        if (item.textContent === element.textContent) {
            if (element.textContent[0] === questionsArray[currentQuestionIndex].answer) {
                console.log("Correct answer")
                element.setAttribute("class", "correct disabled")
                    
            } else {
                console.log("Incorrect answer")
                element.setAttribute("class", "incorrect disabled")
            }
        } else {
            item.setAttribute("class", "disabled");
        }                
    }    
}

function enableListItems() {
    var listItems = quizUl.getElementsByTagName('li');
    
    for (let item of listItems) {
        item.setAttribute("class", "question");
    }
}

function displayQuestion() {    

    if (questionsArray[currentQuestionIndex] != undefined) {
        
        if (currentQuestionIndex === 0){            
            appendQuestionElements();
        }
        
        // Update content based on object in the array
        updateQuestionElements();       
        
        
    }
    else {
        // Submitted answer for final question
        // Provide summary

        console.log("Reach last element")
    }
}

function submitAnswer(event) {
    var element = event.target;
    if (element.matches('li')) {
        
        var displayAnswerTime = 4;

        checkAnswer(element);       


        quizAnswerContainer.textContent = "Correct";
        timerAnswer.textContent = displayAnswerTime + 1;
        quizContainer.appendChild(quizAnswerContainer);
        quizContainer.append(timerAnswer);
        

        // Display a box with with correct or wrong status for 5 sec
        var timerInterval = setInterval(function() {

            if (displayAnswerTime > 0) {     
                timerAnswer.textContent = displayAnswerTime;
                displayAnswerTime--;
            } else {
                quizContainer.removeChild(timerAnswer);
                quizContainer.removeChild(quizAnswerContainer);
                clearInterval(timerInterval);
                
                console.log("Success")
                displayQuestionIndex++;
                displayQuestion();           
            }
        }, 1000);   
    } 
}






// Event listeners
quizUl.addEventListener("click", submitAnswer);
startQuizButton.addEventListener("click", displayFirstQuestion)

// Display welcome screen
// showWelcomeScreen()
startQuiz()