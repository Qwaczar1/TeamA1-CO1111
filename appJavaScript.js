let treasureHuntID;
const sessionID = getCookie('sessionID'); // Get session ID from cookie
let treasureHuntsElement = document.getElementById("treasureHuntsList");

// Function to fetch treasure hunt challenges
async function getChallenges() {
    // Fetch treasure hunts data
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {
            // Loop through treasure hunts data
            for (let i = 0; i < jsonObject.treasureHunts.length; i++) {

                const treasureHuntStartTime = new Date(jsonObject.treasureHunts[i].startsOn).getTime();
                const treasureHuntEndTime = new Date(jsonObject.treasureHunts[i].endsOn).getTime();
                const nameOfTreasureHunt = jsonObject.treasureHunts[i].name;
                const idOfTreasureHunt = jsonObject.treasureHunts[i].uuid;

                // Calculate time
                let currentTimeStamp = Date.now();
                const goesLiveIn = Math.ceil(treasureHuntStartTime / (1000 * 60 * 60 * 24 * 7)); // Start time in weeks
                const EndsOn = Math.ceil(treasureHuntEndTime / (1000 * 60 * 60 * 24 * 7)); // End time in weeks
                const timeText = currentTimeStamp < treasureHuntStartTime ? "Going live in: " + goesLiveIn + " weeks" : "Ends in: " + EndsOn + " weeks";

                // Display treasure hunt information
                treasureHuntsElement.innerHTML += "<li class='treasureHunts'>" + "<a href=''><button onclick='getStartParameters(\"" + nameOfTreasureHunt + "\", \"" + idOfTreasureHunt + "\")' id='treasureHunt"+i+"' class='treasureHuntsButtons'>" + "<p class='treasureHuntName'>" + nameOfTreasureHunt + "<img src='media/start-button.png' class='startLogo' alt='Treasure Hunt Logo'>" + "</p>" + "<p class='timeText'>" + timeText + "</p>" + "</button></a>" + "</li>";

                // Adjust button appearance based on time
                if (treasureHuntStartTime < currentTimeStamp < treasureHuntEndTime) {
                    document.getElementById("treasureHunt"+i+"").style.cursor = "pointer";
                }

                // Disable button if treasure hunt has not started yet
                if (currentTimeStamp < treasureHuntStartTime) {
                    document.getElementById("treasureHunt" + i + "").style.cursor = "no-drop";
                    document.getElementById("treasureHunt"+i+"").setAttribute("disabled", true);
                }
            }
        });
}

getChallenges();

// Function to handle starting a treasure hunt
function getStartParameters(treasureHuntName, id) {
    alert("Starting treasure hunt -> " + "'" +treasureHuntName + "'");
    // Set the values of hidden input fields
    document.getElementById("appName").value = "Team-A1";
    document.getElementById("treasureHuntId").value = id;
    treasureHuntID = id;
}

// Function to start a treasure hunt
async function startTreasureHunt() {
    let playerName = document.getElementById("usernameBox").value;

    // Fetch start treasure hunt API
    fetch(`https://codecyprus.org/th/api/start?player=${playerName}&app="Team-A1&treasure-hunt-id=${treasureHuntID}`)
        .then(response => response.json())
        .then(jsonObject => {
            let status = jsonObject.status;
            // Handle response
            if (status === "OK") {
                setCookie("sessionID", jsonObject.session, 365); // sets sessionID as a cookie
                getQuestions();
            }
            else if (status === "ERROR") {
                let errorMessage = "";
                for (let i = 0; i < jsonObject.errorMessages.length; i++) {
                    errorMessage += jsonObject.errorMessages[i] + "\n";
                }
                alert(errorMessage);
            }
        });
}

// Function to set cookie
function setCookie(cookieName, cookieValue, expireDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Function to get cookie value
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Function to fetch questions
async function getQuestions() {
    console.log(`Fetching questions with sessionID: ${sessionID}`);
    // Fetch questions API
    fetch(`https://codecyprus.org/th/api/question?session=${sessionID}`)
        .then(response => response.json())
        .then(jsonObject => {
            console.log('API response received:', jsonObject);
            // Handle API response
            const errorMessages = jsonObject.errorMessages;
            const completed = jsonObject.completed;
            const questionText = jsonObject.questionText;
            const questionType = jsonObject.questionType;
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
                for (let i = currentQuestionIndex; i < numOfQuestions; i++) {
                    questionsDiv.innerHTML += "<p class='questionText'>" + questionText + "</p>";
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

// Get references to name filling box elements
let nameBox = document.getElementById("nameBoxDiv");
let button = document.getElementById("treasureHuntsList")
let closeButton = document.getElementById("closeButton");

// Function to handle button click event
button.onclick = function(event) {
    event.preventDefault();
    nameBox.style.display = "block";
}

// Function to handle close button click event
closeButton.onclick = function() {
    nameBox.style.display = "none";
}

const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url

function getLeaderBoard(url) {
    // create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            handleLeaderboard(json);
        });
}

getLeaderBoard(TH_API_URL + "leaderboard?session=" + getCookie('sessionID') + "&sorted");

// console.log(TH_API_URL + "leaderboard?session=" + getCookie('sessionID') + "&sorted");

function handleLeaderboard(leaderboard) {
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    console.log(leaderboardArray);
    for(const entry of leaderboardArray) {
        html += "<tr>" +
            "<td class='tableData'>" + entry['player'] + "</td>" +
            "<td class='tableData'>" + entry['score'] + "</td>" +
            "<td class='tableData'>" + entry['completionTime'] + "</td>" +
            "</tr>";
    }
    document.getElementById('scoreboardTable').innerHTML += html;
}