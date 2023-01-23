/**
 * Reset/assign all variables
 * Read local storage
 * Show updated time remainig 
 * Time remaining is calculated as 90 times each question in the array
 * Load welcome screen elements
 */
function init() {
    highScores = JSON.parse(localStorage.getItem('high scores'));
        if (!highScores) {
            highScores = [];
        }
    currentQuestionIndex = 0;
    correctAnswers = 0;
    isLastQuestion = false;
    remainingTime = questionTimeLimit * questionsArray.length;
    
    displayRemainingTime()
    showWelcomeScreen();
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
 * Display best scores
 * 1. First clear quiz container by removing any child elements it might contain
 * 2. Enable best scores button
 * 3. Append bestScores elements
 */
function showBestScores() {
    removeAllChildren(quizContainer);
    bestScores.setAttribute("class", "button")
    
    quizContainer.appendChild(bestScoresTitle);
    
    // Iterate through list of best scores stored in local storage, create and append div for each object
    for (var i = 0; i < highScores.length; i++) {
        var bestScoreItem = document.createElement('div')
            bestScoreItem.textContent = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].score;
            bestScoreItem.setAttribute('class', 'best-score-item');
            quizContainer.appendChild(bestScoreItem);
    }
    
    quizContainer.appendChild(bestScoresButtonContainer);
    bestScoresButtonContainer.appendChild(bestScoresGoBack);
    bestScoresButtonContainer.appendChild(bestScoresClear);  
}

/**
 * Start the counter that will update remaining time every second
 * Disable best scores button when quiz is in progress
 * Start timer
 * Remove all welcome elements from welcome screen
 * Load quesiton elements
 */
function startQuiz() {
    bestScores.setAttribute("class", "button disabled")
    startTimer();
    removeAllChildren(quizContainer);
    displayQuestion();    
}

/**
 * Make sure current question index is not our of range in questions array
 * Update question elements content
 * Dislay question elements
 * End quiz if there is no more question to display
 */
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

/**
 * @param {clicked list item} event 
 * Check to make sure user clicked on possible answer
 * Check to see if user picked correct answer
 * Apply styling possible answers based on user selection 
 * Show feedback elements
 * Increment question index
 * Disable events for list items
 * Subtract 10 seconds from time remaining if user provides incorrect answer
 * End quiz if user has less than 10 seconds left and provides incorrect answer
 */
function submitAnswer(event) {
    var element = event.target;
    if (element.matches('li')) {
        
        var listItems = quizUl.querySelectorAll('li');
        
        for (item of listItems) {        
            if (item.textContent === element.textContent) {
                if (element.textContent[0] === questionsArray[currentQuestionIndex].questionAnswer) {
                    element.setAttribute("class", "correct disabled")
                    showFeedback(true)
                    correctAnswers++;
                } else {
                    element.setAttribute("class", "incorrect disabled")
                    showFeedback(false)
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

/**
 * @param {correct/incorrect choice as bool} answer 
 * Assign feedback message based on user's answer
 * Assign button text based on quesiton index
 * Display feedback elements
 */
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

/**
 * Remove all questions elements
 * Stop timer
 * Display quiz summary screen 
 */
function endQuiz() {    
    removeAllChildren(quizContainer);
    clearInterval(trackRemainingTime);    
    showSummaryScreen();    
}

/**
 * Assign summary title based on reason for quiz ending
 * Calculate user's score and display it formatted as int number
 * Display summary screen elements
 * Set focus on text box
 */
function showSummaryScreen() {
    if (remainingTime > 0) {
        summaryTitle.textContent = "All done!"
    } else {
        summaryTitle.textContent = "Time's up!"
    }
    quizContainer.appendChild(summaryTitle);
    
    finalScore = parseInt((correctAnswers / questionsArray.length) * 100)
    summaryScore.textContent = "Your final score is " + finalScore + "."; 
    
    quizContainer.appendChild(summaryScore);    
    quizContainer.appendChild(userName);
    quizContainer.appendChild(submitScore)
    userName.focus();
}

/**
 * Make sure user provided initials
 * Push new score to local array
 * Sort local array
 * Update local storage
 * Store sorted array in local storage
 */
function upadateHighScores() {
    // If user entered initials
    if (userName.value.trim()) {
        userScore = {
            initials: userName.value,
            score: finalScore
        }; 
        // Update local array
        highScores.push(userScore);
        // Sort local array
        var sortedScores = highScores.sort((a, b) => {
            if (a.score === b.score) {
                return 0;    
            } else if (a.score > b.score) {
                return -1
            } else {
                return 1
            };
        })
        // Update local storage
        localStorage.setItem("high scores", JSON.stringify(sortedScores));
        // Reset input field
        userName.value = "";
        // Display best results screen
        showBestScores();
    } else {
        // If user did not enter initials
        // Notify user that initials field cannot be empty
        alert("Please enter your initials.")
        // Reset input field
        userName.value = "";
    }
}

/**
 * Remove All Child Nodes
 * @param parent container
 */
function removeAllChildren(parent) {
    parent.innerHTML = ""
}

/**
 * Defining timer function that will update remaining time every one second 
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
 * Format how time is displayed based on allowed time
 */
function displayRemainingTime() {
    // If remaining time is greater than one hour
    if (remainingTime >= 3600) {
        remainingTimeDisplay.textContent = parseInt(remainingTime / 3600).toString().padStart(2, '0')
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0') 
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0');
    } else {
        // If remaining time is less than one hour
        remainingTimeDisplay.textContent = parseInt(remainingTime / 3600).toString().padStart(2, '0')
        + ":" 
        + parseInt(remainingTime / 60).toString().padStart(2, '0') 
        + ":" 
        + parseInt(remainingTime % 60).toString().padStart(2, '0');
    }    
}

/**
 * Event listeners
 */

// Show best scores
bestScores.addEventListener('click', showBestScores);

// Start button located on welcome screen
startQuizButton.addEventListener("click", startQuiz);

// Each list item container in quizUL container for each quesiton
quizUl.addEventListener("click", submitAnswer);

// Button for next question / show result located in feedback section after user provides an answer
feedbackButton.addEventListener("click", function (){
    // Removes all list items from UL elements inside quiz container
    removeAllChildren(quizUl)
    // Removes all children from quiz container
    removeAllChildren(quizContainer);
    // Updates queston index 
    currentQuestionIndex++;
    // Attempts to display next question
    displayQuestion();               
});

// Button located in quiz summary seciion, adds user to best scores list
submitScore.addEventListener('click' , upadateHighScores)

// Clear Scores Button located in best results section / clears local storage
bestScoresClear.addEventListener('click', () => {
    // Reset local storage  
    localStorage.removeItem("high scores");
    // Reset local array
    highScores = [];
    // Show updated content
    showBestScores();
})

// Go Back button located in best results section / removed all quiz elements and loads welcome screen
bestScoresGoBack.addEventListener('click', () => {
    removeAllChildren(quizContainer);
    init();
})

// Initialize quiz
// Display welcome screen
init()

