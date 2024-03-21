let treasureHuntID;
const sessionID = getCookie("sessionID"); // Get session ID from cookie
let treasureHuntsElement = document.getElementById("treasureHuntsList");

// Function to fetch treasure hunt challenges
function getChallenges() {
    // Fetch treasure hunts data
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {

            // Get references to name filling box elements
            let nameBox = document.getElementById("nameBoxDiv");
            let closeButton = document.getElementById("closeButton");


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

                document.getElementById("loader").style.display = "none";

                // Adjust button appearance based on time
                if (treasureHuntStartTime < currentTimeStamp < treasureHuntEndTime) {
                    document.getElementById("treasureHunt"+i+"").style.cursor = "pointer";
                }

                // Disable button if treasure hunt has not started yet
                if (currentTimeStamp < treasureHuntStartTime) {
                    document.getElementById("treasureHunt" + i + "").style.cursor = "no-drop";
                    document.getElementById("treasureHunt"+i+"").setAttribute("disabled", true);
                }

                let buttons = document.querySelectorAll('.treasureHuntsButtons');

                // Add click event listeners to buttons
                buttons.forEach((button) => {
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        nameBox.style.display = "block";
                    });
                });

                // Add click event listener to close button
                closeButton.onclick = function() {
                    nameBox.style.display = "none";
                };
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
function startTreasureHunt() {
    let playerName = document.getElementById("usernameBox").value;
    // Fetch start treasure hunt API
    fetch(`https://codecyprus.org/th/api/start?player=${playerName}&app="Team-A1&treasure-hunt-id=${treasureHuntID}`)
        .then(response => response.json())
        .then(jsonObject => {
            let status = jsonObject.status;
            // Handle response
            if (status === "OK") {
                setCookie("sessionID", jsonObject.session, 365); // sets sessionID as a cookie
                location.href = "questions.html";
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


// Function to refresh the page
function refresh() {
    window.location.reload();
}


