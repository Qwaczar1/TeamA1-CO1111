let treasureHuntsElement = document.getElementById("treasureHuntsList");

async function startTreasureHunt(treasureHuntName, idOfTreasureHunt) {
    // Add your logic here to handle the start of the treasure hunt
    alert("Starting treasure hunt -> " + "'" +treasureHuntName + "'");
    // Set the values of hidden input fields
    document.getElementById("appName").value = "Team-A1";
    document.getElementById("treasureHuntId").value = idOfTreasureHunt;
}

async function getChallenges() {
    // Fetch again inside the function if needed
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {
            // Use the fetched data here
            for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
                const treasureHuntStartTime = new Date(jsonObject.treasureHunts[i].startsOn).getTime();
                const treasureHuntEndTime = new Date(jsonObject.treasureHunts[i].endsOn).getTime();

                let currentTimeStamp = Date.now();

                const goesLiveIn = Math.ceil(treasureHuntStartTime / (1000 * 60 * 60 * 24 * 7)); // Start time in weeks
                const EndsOn = Math.ceil(treasureHuntEndTime / (1000 * 60 * 60 * 24 * 7)); // End time in weeks

                const timeText = currentTimeStamp < treasureHuntStartTime ? "Going live in: " + goesLiveIn + " weeks" : "Ends in: " + EndsOn + " weeks";

                const nameOfTreasureHunt = jsonObject.treasureHunts[i].name;
                const idOfTreasureHunt = jsonObject.treasureHunts[i].uuid;

                treasureHuntsElement.innerHTML += "<li class='treasureHunts'>" + "<a href=''><button onclick='startTreasureHunt(\"" + nameOfTreasureHunt + "\", \"" + idOfTreasureHunt + "\")' id='treasureHunt"+i+"' class='treasureHuntsButtons'>" + "<p class='treasureHuntName'>" + nameOfTreasureHunt + "<img src='media/start-button.png' class='startLogo' alt='Treasure Hunt Logo'>" + "</p>" + "<p class='timeText'>" + timeText + "</p>" + "</button></a>" + "</li>";

                if (treasureHuntStartTime < currentTimeStamp < treasureHuntEndTime) {
                    document.getElementById("treasureHunt"+i+"").style.cursor = "pointer";
                }

                if (currentTimeStamp < treasureHuntStartTime) {
                    document.getElementById("treasureHunt" + i + "").style.cursor = "no-drop";
                    document.getElementById("treasureHunt"+i+"").setAttribute("disabled", true);
                }
            }
        });
}

getChallenges();

function refresh() {
    window.location.reload();
}

let nameBox = document.getElementById("nameBoxDiv");
let button = document.getElementById("treasureHuntsList")
let closeButton = document.getElementById("closeButton");

button.onclick = function(event) {
    event.preventDefault();
    nameBox.style.display = "block";
}

closeButton.onclick = function() {
    nameBox.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === nameBox) {
        nameBox.style.display = "none";
    }
}

let scoreboard = document.getElementById("scoreboard");
let scoreboardBox = document.getElementById("scoreboardBox");
let closeScoreboardBox = document.getElementById("closeScoreboardBox");

// Display scoreboard box when pressed
scoreboard.onclick = function() {
    scoreboardBox.style.display = "block";
}

// Close scoreboard box when pressed
closeScoreboardBox.onclick = function() {
    scoreboardBox.style.display = "none";
}

const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url

/*This is a function to access the /leaderboard at the specified URL*/
function getLeaderBoard(url) {
    // create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            // console.log(json);
            handleLeaderboard(json);
        });
}

function getSession() {
    let url = new URL(window.location.href);
    return url.searchParams.get("session");
}

let session = getSession();

let url = TH_API_URL + "leaderboard?sorted&session=" + session;
console.log(url);
getLeaderBoard(url);

function handleLeaderboard(leaderboard) {
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    for(const entry of leaderboardArray) {
        html += "<tr class='tableRow'>" +
            "<td class='tableData'>" + entry['player'] + "</td>" +
            "<td class='tableData'>" + entry['score'] + "</td>" +
            "<td class='tableData'>" + entry['completionTime'] + "</td>" +
            "</tr>";
    }
    let leaderboardElement = document.getElementById('scoreboardResults');
    leaderboardElement.innerHTML += html;
}
