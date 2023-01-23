


/**
 * Remove All Child Nodes
 * @param parent container
 */
function removeAllChildren(parent) {
    parent.innerHTML = ""
}


function showBestScores() {
    removeAllChildren(quizContainer);
    bestScores.setAttribute("class", "button")
    appendHighScoresElements();
}

function appendHighScoresElements() {
    quizContainer.appendChild(bestScoresTitle);
    
    for (var i = 0; i < highScores.length; i++) {
        var bestScoreItem = document.createElement('div')
            bestScoreItem.textContent = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].score;
            bestScoreItem.setAttribute('class', 'result-item');
            quizContainer.appendChild(bestScoreItem);
    }
    
    quizContainer.appendChild(bestScoresButtonContainer);
    bestScoresButtonContainer.appendChild(bestScoresGoBack);
    bestScoresButtonContainer.appendChild(bestScoresClear);  
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


function displayQuestion() {    
    // Check to see if currentQuestionIndex is not out of range
    if (questionsArray[currentQuestionIndex] != undefined) {
        // Append question elements on first question
        quizQuestionNumber.textContent =  "Question " + (currentQuestionIndex + 1) + "/" + questionsArray.length;
        quizContainer.appendChild(quizQuestionNumber)
    
        quizQuestion.textContent = questionsArray[currentQuestionIndex].question;
        quizContainer.appendChild(quizQuestion);
    
        // Create and append as many elements as there is possible answers
        for (i in questionsArray[currentQuestionIndex].answers) {
            newListItem = document.createElement('li');        
            newListItem.textContent = questionsArray[currentQuestionIndex].answers[i];               
            newListItem.setAttribute("class", "question");      
            quizUl.appendChild(newListItem);        
        }
        quizListContainer.appendChild(quizUl);
        quizContainer.appendChild(quizListContainer)
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
        
        
        var listItems = quizUl.querySelectorAll('li');
        
        for (item of listItems) {        
            if (item.textContent === element.textContent) {
                if (element.textContent[0] === questionsArray[currentQuestionIndex].questionAnswer) {
                    element.setAttribute("class", "correct disabled")
                    // quizFeedback.textContent = "Correct ✔";                    
                    showFeedback(true)
                    correctAnswers++;
                } else {
                    element.setAttribute("class", "incorrect disabled")
                    showFeedback(false)
                    // quizFeedback.textContent = "Wrong ✖";
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


function showFeedback(answer) {
    
    if (answer) {
        quizFeedback.textContent = "Correct ✔";
    } else {
        quizFeedback.textContent = "Wrong ✖";
    }
    quizFeedbackContainer.appendChild(quizFeedback);   
    
    if (questionsArray[currentQuestionIndex + 1] == undefined) {
        isLastQuestion = true;
        feedbackButton.textContent = "Check Score";           
        clearInterval(trackRemainingTime);
    } else {
        feedbackButton.textContent = "Next question >";
    }
    quizFeedbackContainer.appendChild(feedbackButton);

    quizContainer.appendChild(quizFeedbackContainer); 
}

function endQuiz() {    
    quizContainer.innerHTML = "";
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

function upadateHighScores() {
    
    // If user entered initials
    if (userName.value.trim()) {
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
        
        userName.value = "";
        showBestScores();
    } else {
        // If user did not enter initials
        alert("Please enter your initials.")
    }

}


// Event listeners
bestScores.addEventListener('click', showBestScores);

startQuizButton.addEventListener("click", startQuiz);

quizUl.addEventListener("click", submitAnswer);

feedbackButton.addEventListener("click", function (){
    removeAllChildren(quizUl)
    removeAllChildren(quizContainer);
    currentQuestionIndex++;
    displayQuestion();               
});

submitScore.addEventListener('click' , upadateHighScores)


bestScoresClear.addEventListener('click', () => {
    // Reset local storage  
    localStorage.removeItem("high scores");
    highScores = [];
    // Show updated content
    showBestScores();
})

bestScoresGoBack.addEventListener('click', () => {
    removeAllChildren(quizContainer);
    init();
})

// Display welcome screen
init()

