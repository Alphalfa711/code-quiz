// Declare array of objects/questions
const questionsArray = [
    {
        question: "Arrays in JavaScript can be used to store _____.",
        answers: [
            "a. numbers and strings",
            "b. other arrays",
            "c. booleans",
            "d. all of the above"
        ],
        correctAnswer: "d"        
    },
    {
        question: "Loos in JS:",
        answers: [
            "a. array2 q1",
            "b. array2 q2",
            "c. array2 q3",
            "d. array2 q4"
        ],
        correctAnswer: "a"
    },
    {
        question: "Scope in JS:",
        answers: [
            "a. array3 q1",
            "b. array3 q2",
            "c. array3 q3",
            "d. array3 q4"
        ],
        correctAnswer: "b"
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
var timerAnswer = document.createElement('div')
timerAnswer.setAttribute("class", "timer");
var remainingTimeDisplay = document.getElementById('timeLeft');








function quizReset() {

    remainingTime = 90;
    currentQuestionIndex = 0;
    
    showWelcomeScreen();
}

function showWelcomeScreen() {
    quizContainer.appendChild(startHeader);
    quizContainer.appendChild(startMessage1);
    quizContainer.appendChild(startMessage2);
    quizContainer.appendChild(startQuizButton);    
}


function removeAllChildren(parent) {
    console.log("Parent item: " ,parent);
    while (parent.firstChild) {
        console.log("First child: ", parent.firstChild);
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

    for (itemIndex in questionsArray[currentQuestionIndex].answers) {
        
        newListItem = document.createElement('li');        
        quizUl.appendChild(newListItem);        
    }
    
    
}

function updateQuestionElements() {
    
    enableListItems();

    quizQuestionNumber.textContent =  "Question " + (currentQuestionIndex + 1) + "/" + questionsArray.length;
    quizQuestion.textContent = questionsArray[currentQuestionIndex].question;
    
    var listItems = quizUl.querySelectorAll('li');

    // console.log("By tag name: ", listItems)
    // console.log("By query selector: ", listItems)

    // Does not work
    // for (item in listItems) {        
    //     item.textContent = "Hello"               
    // }   
    
    // Does not work
    // console.log(listItems)

    // Loop runs more than 4 time even though array only has 4 elements
    // for (i in listItems) {        
    //     listItems[i].textContent = questionsArray[currentQuestionIndex].answers[i];               
    // }   
    for (var i = 0; i < 4; i++) {        
        listItems[i].textContent = questionsArray[currentQuestionIndex].answers[i];               
    }   
    // console.log("By query selector: ", listItems)
}

function checkAnswer(element) {
    var listItems = quizUl.querySelectorAll('li');


    for (item of listItems) {        
        if (item.textContent === element.textContent) {
            if (element.textContent[0] === questionsArray[currentQuestionIndex].correctAnswer) {
                // console.log("Correct answer")
                element.setAttribute("class", "correct disabled")
                quizFeedbackContainer.textContent = "Correct";
                    
            } else {
                // console.log("Incorrect answer")
                element.setAttribute("class", "incorrect disabled")
                quizFeedbackContainer.textContent = "Wrong";
            }
        } else {
            item.setAttribute("class", "disabled");
        }                
    }    
}

function enableListItems() {
    var listItems = quizUl.querySelectorAll('li');
    
    for (var i = 0; i < 4; i++) {        
        listItems[i].setAttribute("class", "question");
    }
    // This also works. Why ?
    // for (item of listItems) {
    //     item.setAttribute("class", "question");
    // }
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
        
        // var displayAnswerTime = 4;
        var displayAnswerTime = 4;

        timerAnswer.textContent = displayAnswerTime + 1;
        
        
        
        checkAnswer(element);       
        
        
        quizContainer.appendChild(quizFeedbackContainer);
        quizContainer.append(timerAnswer);
        
        

        // Display a box with with correct or wrong status for 5 sec
        var timerInterval = setInterval(function() {

            if (displayAnswerTime > 0) {     
                timerAnswer.textContent = displayAnswerTime;
                displayAnswerTime--;
            } else {
                quizContainer.removeChild(timerAnswer);
                quizContainer.removeChild(quizFeedbackContainer);
                clearInterval(timerInterval);
                
                console.log("Success")
                currentQuestionIndex++;
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