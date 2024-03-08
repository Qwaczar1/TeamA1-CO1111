let treasureHuntsElement = document.getElementById("treasureHuntsList");

async function startTreasureHunt(treasureHuntName, idOfTreasureHunt) {
    // Add your logic here to handle the start of the treasure hunt
    alert("Starting treasure hunt -> " + "'" +treasureHuntName + "'");
    // Set the values of hidden input fields
    document.getElementById("appName").value = treasureHuntName;
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
