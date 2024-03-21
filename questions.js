const sessionID = getCookie("sessionID"); // Get session ID from cookie

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
    console.log(`Fetching question with sessionID: ${sessionID}`);
    // Fetch questions API
    fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonObject => {
            console.log('API response received:', jsonObject);
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
            const currentQuestionIndex = jsonObject.currentQuestionIndex;
            const correctScore = jsonObject.correctScore;
            const wrongScore = jsonObject.wrongScore;
            const skipScore = jsonObject.skipScore;
            const status = jsonObject.status;

            let questionsDiv = document.getElementById('questionsDiv');

            if (status === "OK") {
                questionsDiv.innerHTML = "<p class='questionText'>" + questionText + "</p>";
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
            }
            else {
                let errorMessage = "";
                for (let i = 0; i < errorMessages.length; i++) {
                    errorMessage += errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            alert('Failed to fetch questions. Please try again later.'); // Display error to the user
        });
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
            console.log(jsonObject);
            if (_questionType === "TEXT" || _questionType === "NUMERIC" || _questionType === "INTEGER") {
                inputElement.value = "";
            }
           if (jsonObject.status === "OK") {
               if (jsonObject.completed) {
                   location.href = "leaderboard.html";
               }
               else {
                   alert(jsonObject.message);
                   //TODO - Update the score.

                   if (jsonObject.correct) {
                       getQuestion();
                   }
               }
           }
           else {
               //TODO - Handle and print errors...
           }
        });
}