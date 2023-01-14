// Declare array of objects/questions
var questions = [
    {
        question: "Arrays in JavaScript can be used to store _____.",
        option1: "1. numbers and strings",
        option2: "2. other arrays",
        option3: "3. booleans",
        option4: "4. all of the above",
        answer: "all of the above"
    },
    {
        question: "Loos in JS:",
        option1: "Option5",
        option2: "Option6",
        option3: "Option7",
        option4: "Option8",
        answer: "Option1"
    } 
]
// Creating DOM Elements
var quizContainer = document.getElementById('quiz-container');
// Question number
var quizQuestionNumber = document.createElement('h4');
// Question title
var quizTitle = document.createElement('h2');
var quizUl = document.createElement('ul');
// Answers as list items
var quizli1 = document.createElement('li')
var quizli2 = document.createElement('li');
var quizli3 = document.createElement('li');
var quizli4 = document.createElement('li');
// Display correct / wrong answer
var quizAnswerContainer = document.createElement('div')
    // Set it's initial state to hidden
    // quizAnswerContainer.setAttribute("data-state", "hidden")
var timerAnswer = document.createElement('div')
timerAnswer.setAttribute("class", "timer");


// quizTitle.setAttribute("class", "answer")

var currentQuestionIndex = 0;
var remainingTime = 90;

function resetQuiz() {
    currentQuestionIndex = 0;
}

// function currentQuestion (questionArray, questionIndex) {
function currentQuestion () {

    if (questions[currentQuestionIndex] != undefined) {
        
        // Update content based on object in the array
        quizQuestionNumber.textContent =  "Question " + (currentQuestionIndex + 1) + "/" + questions.length;
        quizTitle.textContent = questions[currentQuestionIndex].question;
        quizli1.textContent = questions[currentQuestionIndex].option1;
        quizli2.textContent = questions[currentQuestionIndex].option2;
        quizli3.textContent = questions[currentQuestionIndex].option3;
        quizli4.textContent = questions[currentQuestionIndex].option4;       
        

        quizContainer.appendChild(quizQuestionNumber)
        quizContainer.appendChild(quizTitle);
        quizContainer.appendChild(quizUl);
        quizUl.appendChild(quizli1);
        quizUl.appendChild(quizli2);
        quizUl.appendChild(quizli3);
        quizUl.appendChild(quizli4);
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
                currentQuestion(questions, currentQuestionIndex);           
            }
        }, 1000);   


        // quizAnswerContainer.setAttribute("data-state", "visible");
        
        
        
    }    
}


currentQuestion();

quizContainer.addEventListener("click", submitAnswer);

