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
        optionA: "Option5",
        optionB: "Option6",
        optionC: "Option7",
        optionD: "Option8",
        answer: "a"
    } 
]


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
quizli1.setAttribute("class", "question")
var quizli2 = document.createElement('li');
quizli2.setAttribute("class", "question")
var quizli3 = document.createElement('li');
quizli3.setAttribute("class", "question")
var quizli4 = document.createElement('li');
quizli4.setAttribute("class", "question")
// Display correct / wrong answer
var quizAnswerContainer = document.createElement('div')
    // Set it's initial state to hidden
    quizAnswerContainer.setAttribute("class", "answerContainer")
var timerAnswer = document.createElement('div')
timerAnswer.setAttribute("class", "timer");





// quizQuestion.setAttribute("class", "answer")

var currentQuestionIndex;
var remainingTime;

function startQuiz() {
    // Reset global values
    currentQuestionIndex = 0;
    remainingTime = 90;
    showWelcomeScreen();
}

function resetQuiz() {
    currentQuestionIndex = 0;
}

function showWelcomeScreen() {
    quizContainer.appendChild(startHeader);
    quizContainer.appendChild(startMessage1);
    quizContainer.appendChild(startMessage2);
    quizContainer.appendChild(startQuizButton);    
}

function removeWelcomeScreen() {
    quizContainer.removeChild(startHeader);
    quizContainer.removeChild(startMessage1);
    quizContainer.removeChild(startMessage2);
    quizContainer.removeChild(startQuizButton);    
    currentQuestion();
}




// function currentQuestion (questionArray, questionIndex) {
function currentQuestion () {    

    if (questionsArray[currentQuestionIndex] != undefined) {
        
        if (currentQuestionIndex === 0){
            quizContainer.appendChild(quizQuestionNumber)
            quizContainer.appendChild(quizQuestion);
            quizContainer.appendChild(quizListContainer)
            quizListContainer.appendChild(quizUl);
            quizUl.appendChild(quizli1);
            quizUl.appendChild(quizli2);
            quizUl.appendChild(quizli3);
            quizUl.appendChild(quizli4);
        }
        
        // Update content based on object in the array
        quizQuestionNumber.textContent =  "Question " + (currentQuestionIndex + 1) + "/" + questionsArray.length;
        quizQuestion.textContent = questionsArray[currentQuestionIndex].question;
        quizli1.textContent = questionsArray[currentQuestionIndex].optionA;
        quizli2.textContent = questionsArray[currentQuestionIndex].optionB;
        quizli3.textContent = questionsArray[currentQuestionIndex].optionC;
        quizli4.textContent = questionsArray[currentQuestionIndex].optionD;       
        
        
        
    }
    else {
        // Provide summary

        console.log("Reach last element")
    }
}

function submitAnswer(event) {
    var element = event.target;
    if (element.matches('li')) {
        
        var displayAnswerTime = 4;






        if (element.textContent[0] === questionsArray[currentQuestionIndex].answer) {
            console.log("Correct answer")
            element.setAttribute("class", "correct disabled")
        } else {
            console.log("Incorrect answer")
            element.setAttribute("class", "incorrect disabled")
        }


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
                currentQuestionIndex++;
                currentQuestion(questionsArray, currentQuestionIndex);           
            }
        }, 1000);   


        // quizAnswerContainer.setAttribute("data-state", "visible");
        
        
        
    } else {
        console.log("Not an li element")
    }

}






// Event listeners
quizUl.addEventListener("click", submitAnswer);
startQuizButton.addEventListener("click", removeWelcomeScreen)

// Display welcome screen
// showWelcomeScreen()
startQuiz()