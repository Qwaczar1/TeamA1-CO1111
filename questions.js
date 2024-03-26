const sessionID = getCookie("sessionID"); // Get session ID from cookie

const _score = document.getElementById("score");
const textInputElement = document.getElementById("textInput");
const numericInputElement = document.getElementById("numericInput");
const mcqInputElement = document.getElementById("mcqInput");
const integerInputElement = document.getElementById("integerInput");
const booleanInputElement = document.getElementById("booleanInput");
hideAllForms();

let _questionType = "INTEGER";

function hideAllForms() {
    textInputElement.style.display = "none";
    numericInputElement.style.display = "none";
    mcqInputElement.style.display = "none";
    integerInputElement.style.display = "none";
    booleanInputElement.style.display = "none";
}

// Function to fetch questions
function getQuestion() {
    // console.log(`Fetching question with sessionID: ${sessionID}`);
    // Fetch questions API
    fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonObject => {
            // console.log('API response received:', jsonObject);
            hideAllForms();
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

            let questionDiv = document.getElementById('questionDiv');
            let questionNumber = document.getElementById('questionNumber');
            let questionScoring = document.getElementById('questionScoring');

            questionNumber.innerHTML = "Question " + currentQuestionIndex + "/" + numOfQuestions;
            questionScoring.innerHTML = "<p class='scoreText'>" + "If you answer correctly, you score " + correctScore + " points." + "</p>" +
                "<p class='scoreText'>" + "If you answer wrongly, you lose " + wrongScore + " points." + "</p>" +
                "<p class='scoreText'>" + "If you skip a question, you lose " + skipScore + " points." + "</p>";

            document.getElementById("loader").style.display = "none";

            if (status === "OK") {
                questionDiv.innerHTML = "<p class='questionText'>" + questionText + "</p>" + "<img src=\"media/Treasure Hunt Logo.png\" id=\"redLogo\" alt=\"Treasure Hunt Logo\">";
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

                if (completed) {
                    location.href = "leaderboard.html?completed=true";
                }
            }
            if (requiresLocation) {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(updateLocation);
                }
                else {
                    alert("This browser does not support geolocation.")
                }
            }
            else {
                let errorMessage = "";
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessage += errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        })
}

// Function to refresh the page
function refresh() {
    window.location.reload();
}

function answer(elementID) {
    const inputElement = document.getElementById(elementID);
    const answerText = inputElement.value;
    //TODO - Validate answer
    fetch(`https://codecyprus.org/th/api/answer?session=${sessionID}&answer=${answerText}`)
        .then(response => response.json())
        .then(jsonObject => {
            const status = jsonObject.status;
            const correct = jsonObject.correct;
            const completed = jsonObject.completed;
            const errorMessages = jsonObject.errorMessages;
            console.log(jsonObject);
            if (_questionType === "TEXT" || _questionType === "NUMERIC" || _questionType === "INTEGER") {
                inputElement.value = "";
            }
           if (status === "OK") {
               if (completed) {
                   location.href = "leaderboard.html?completed=true";
               }
               else {
                   score();
                   alert(jsonObject.message);
                   if (correct) {
                       getQuestion();
                   }
                   else {
                   }
               }
           }
           else {
               let errorMessage = "";
               for (let i = 0; i < errorMessages.length; i++) {
                   errorMessage += errorMessages[i] + "\n";
               }
               alert(errorMessage);
           }
        });
}

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
            else {
                let errorMessage = "";
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessage += errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        });
}

function score() {
    fetch(`https://codecyprus.org/th/api/score?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonObject =>{
            const score = jsonObject.score;
            _score.innerText = "Score: " + score;
        })
}


const skipButton = document.getElementById("skipButton");

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
                    location.href = "leaderboard.html?completed=true";
                } else {
                    if (confirm("Are you sure you want to skip this question?")) {
                        score();
                        alert('You skipped the question.');
                        getQuestion();
                    }
                }
            } else {
                let errorMessage = "";
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessage += errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        })
}

skipButton.addEventListener("click",function (event){
    event.preventDefault();
    skip();
});

const reopenBox = document.getElementById("reopenBox");

// Function to display the modal dialog
function hideBox() {
    reopenBox.style.display = "none";
    console.log("Hiding box...");
    localStorage.setItem('browserClosed', 'false');
}

// Function to display the modal dialog
function showBox() {
    reopenBox.style.display = "block";
    console.log("Showing box...");
}

console.log("Checking if the browser was previously closed...");
console.log(localStorage.getItem('browserClosed') === 'true');
// Check if the browser was previously closed
if (localStorage.getItem('browserClosed') === 'true') {
    console.log("Browser was previously closed. Showing box...");
    showBox();
}
else {
    console.log("Browser was not previously closed.");
}

// Add an event listener to hide the box when the user closes it
document.getElementById('box1').addEventListener('click', hideBox);
document.getElementById('box2').addEventListener('click', hideBox);

window.addEventListener('unload', function (event) {
    localStorage.setItem('browserClosed', 'true');
});