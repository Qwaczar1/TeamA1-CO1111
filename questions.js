const sessionID = getCookie("sessionID"); // Get session ID from cookie

const loader = document.getElementById("loader");
let _score = document.getElementById("score");
const textInputElement = document.getElementById("textInput");
const numericInputElement = document.getElementById("numericInput");
const mcqInputElement = document.getElementById("mcqInput");
const integerInputElement = document.getElementById("integerInput");
const booleanInputElement = document.getElementById("booleanInput");

hideAllForms(); // Initially hide all input forms

let _questionType = "INTEGER"; // Default question type

// Function to hide all input forms
function hideAllForms() {
    textInputElement.style.display = "none";
    numericInputElement.style.display = "none";
    mcqInputElement.style.display = "none";
    integerInputElement.style.display = "none";
    booleanInputElement.style.display = "none";
}

// Function to fetch questions from API
function getQuestion() {
    // console.log(`Fetching question with sessionID: ${sessionID}`);
    fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonObject => {
            // console.log('API response received:', jsonObject);
            hideAllForms(); // Hide all input forms
            // Handle API response
            const errorMessages = jsonObject.errorMessages;
            const completed = jsonObject.completed;
            const questionText = jsonObject.questionText;
            const questionType = jsonObject.questionType;
            _questionType = questionType;
            const canBeSkipped = jsonObject.canBeSkipped;
            const requiresLocation = jsonObject.requiresLocation;
            const numOfQuestions = jsonObject.numOfQuestions;
            const currentQuestionIndex = jsonObject.currentQuestionIndex + 1;
            const correctScore = jsonObject.correctScore;
            const wrongScore = jsonObject.wrongScore;
            const skipScore = jsonObject.skipScore;
            const status = jsonObject.status;

            // Update UI with question details
            let questionDiv = document.getElementById('questionDiv');
            let questionNumber = document.getElementById('questionNumber');
            let questionScoring = document.getElementById('questionScoring');

            questionNumber.innerHTML = "Question " + currentQuestionIndex + "/" + numOfQuestions;
            questionScoring.innerHTML =
                "<p class='scoreText'>" + "✅ Correct answer:  " + correctScore + " points" +
                "<p class='scoreText'>" + "❌ Wrong answer:  " + wrongScore + " points" +
                "<p class='scoreText'>" + "⏩ Skip question:  " + skipScore + " points" + "</p>";

            loader.style.display = "none";

            if (status === "OK") {
                // Display question text and appropriate input form based on question type
                questionDiv.innerHTML = "<p class='questionText'>" + questionText + "</p>" + "<img src=\"media/TreasureHuntLogo.png\" id=\"redLogo\" alt=\"Treasure Hunt Logo\">";
                if (questionType === "BOOLEAN") {
                    booleanInputElement.style.display = "block";
                }
                else if (questionType === "INTEGER") {
                    integerInputElement.style.display = "block";
                }
                else if (questionType === "NUMERIC") {
                    numericInputElement.style.display = "block";
                }
                else if (questionType === "MCQ") {
                    mcqInputElement.style.display = "block";
                }
                else if (questionType === "TEXT") {
                    textInputElement.style.display = "block";
                }

                // Redirect to leaderboard if quiz completed
                if (completed) {
                    hideAllForms(); // Hide all input forms
                    location.href = `leaderboard.html?completed=true&score=${_score}`;
                }
            }
            // Handle requirements for location
            if (requiresLocation) {
                if (navigator.geolocation) {
                    // Get location periodically (every 5 minutes)
                    setInterval(() => {
                        navigator.geolocation.getCurrentPosition(updateLocation);
                    }, 5 * 60 * 1000);
                }
                else {
                    alert("This browser does not support geolocation.")
                }
            }
            // Handle error messages
            else {
                let errorMessage = "";
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessage += errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        })

    loader.style.display = "block";

}

// Function to refresh the page
function refresh() {
    window.location.reload();
}

// Function to handle answer submission
function answer(elementID) {
    const inputElement = document.getElementById(elementID);
    const answerText = inputElement.value;
    fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${answerText}`)
        .then(response => response.json())
        .then(jsonObject => {
            const status = jsonObject.status;
            const correct = jsonObject.correct;
            const completed = jsonObject.completed;
            const errorMessages = jsonObject.errorMessages;

            loader.style.display = "none";

            // Clear input value for certain types
            if (_questionType === "TEXT" || _questionType === "NUMERIC" || _questionType === "INTEGER") {
                inputElement.value = "";
            }

           if (status === "OK") {
               if (completed) {
                   hideAllForms(); // Hide all input forms
                   location.href = `leaderboard.html?completed=true&score=${_score}`;
               }
               else {
                   score();
                   alert(jsonObject.message);
                   if (correct) {
                       hideAllForms(); // Hide all input forms
                       getQuestion();
                   }
               }
           }
           // Handle error messages
           else {
               let errorMessage = "";
               for (let i = 0; i < errorMessages.length; i++) {
                   errorMessage += errorMessages[i] + "\n";
               }
               alert(errorMessage);
           }
        });
}

// Function to update user's location
function updateLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    fetch(`https://codecyprus.org/th/api/location?session=${sessionID}&latitude=${latitude}&longitude=${longitude}`)
        .then(response => response.json())
        .then(jsonObject => {
            const errorMessages = jsonObject.errorMessages;
            const status = jsonObject.status;
            const message = jsonObject.message;
            if (status === "OK") {
                alert(message);
            }
            // Handle error messages
            else {
                let errorMessage = "";
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessage += errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        });
}

// Function to fetch and display user's score
function score() {
    fetch(`https://codecyprus.org/th/api/score?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonObject =>{
            const score = jsonObject.score;
            _score.innerText = "Score: " + score;
            _score = score;
        })
}


const skipButton = document.getElementById("skipButton");

// Function to handle skipping question
function skip(){
    fetch(`https://codecyprus.org/th/api/skip?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonObject => {
            const completed = jsonObject.completed;
            const errorMessages = jsonObject.errorMessages;
            const scoreAdjustment = jsonObject.scoreAdjustment;
            const status = jsonObject.status;
            if (status === 'OK') {
                if (completed) {
                    hideAllForms(); // Hide all input forms
                    location.href = `leaderboard.html?completed=true&score=${_score}`;
                } else {
                    if (confirm("Are you sure you want to skip this question?")) {
                        score();
                        alert('You skipped the question.');
                        getQuestion();
                    }
                }
            }
            // Handle error messages
            else{
                let errorMessage = "";
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessage += errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        })
}

// Event listener for skip button click
skipButton.addEventListener("click",function (event){
    event.preventDefault();
    skip();
});

const reopenBox = document.getElementById("reopenBox");

// Function to hide the box
function hideBox() {
    reopenBox.style.display = "none";
    // Set browserClosed flag to false when the box is hidden
    localStorage.setItem('browserClosed', 'false');
}

// Function to display the box
function showBox() {
    reopenBox.style.display = "block";
}

// Check if the browser was previously closed
if (localStorage.getItem('browserClosed') === 'true') {
    showBox();
}
else {
    hideBox();
}

// Add an event listener to hide the boxes when the user closes it
document.getElementById('box1').addEventListener('click', hideBox);
document.getElementById('box2').addEventListener('click', hideBox);

// Event listener to set browserClosed flag to true when the browser is closed or refreshed
window.addEventListener('unload', function (event) {
    localStorage.setItem('browserClosed', 'true');
});