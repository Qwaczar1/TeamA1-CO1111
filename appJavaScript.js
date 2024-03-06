let treasureHuntsElement = document.getElementById("treasureHuntsList");

async function startTreasureHunt(treasureHuntName) {
    // Add your logic here to handle the start of the treasure hunt
    alert("Starting treasure hunt -> " + "'" +treasureHuntName + "'");
}

async function getChallenges() {
    // Fetch again inside the function if needed
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {
            const button = document.getElementsByClassName('treasureHuntsButtons');
            // Use the fetched data here
            for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
                var treasureHuntStartTime = jsonObject.treasureHunts[i].startsOn;
                var treasureHuntEndTime = jsonObject.treasureHunts[i].endsOn;
                var nameOfTreasureHunt = jsonObject.treasureHunts[i].name;
                treasureHuntsElement.innerHTML += "<li class='treasureHunts'>" + "<a href=''><button onclick='startTreasureHunt(\""+nameOfTreasureHunt+"\")' id='treasureHunt"+i+"' class='treasureHuntsButtons'>" + "<p class='treasureHuntName'>" + nameOfTreasureHunt + "<img src='media/start-button.png' class='startLogo' alt='Treasure Hunt Logo'>" + "</p>" + "<p class='endsInText'> Ends in: " + treasureHuntStartTime + "</p>" + "</button></a>" + "</li>";

                let currentTimeStamp = Date.now();
                console.log(currentTimeStamp);

                if (treasureHuntStartTime < currentTimeStamp < treasureHuntEndTime) {
                    document.getElementById("treasureHunt"+i+"").style.cursor = "pointer";
                }

                if (currentTimeStamp > treasureHuntEndTime) {
                    document.getElementById("treasureHunt"+i+"").style.cursor = "no-drop";
                }
            }
        });
}

getChallenges();

function millisecondsToWeeks(milliseconds) {
    return milliseconds / (1000 * 60 * 60 * 24 * 7);
}

// async function startTreasureHunt() {
//     // Fetch again inside the function if needed
//     fetch("https://codecyprus.org/th/api/start")
//         .then(response => response.json())
//         .then(jsonObject => {
//             for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
//                 alert("Starting treasure hunt " + jsonObject.treasureHunts[i].name);
//             }
//             // let treasureHuntsArray = JSON.parse(jsonObject);
//             // for (let i = 0; i < treasureHuntsArray.length; i++) {
//             //     console.log("TH name: " + treasureHuntsArray[0].name);
//             //     console.log("TH name: " + treasureHuntsArray[1].name);
//             // }
//         });
// }

function refresh() {
    window.location.reload();
}
let Modal = document.getElementById("nameModal");
let button = document.getElementById("treasureHuntsList")
let span = document.getElementsByClassName("closeBtn")[0];

button.onclick = function() {
    Modal.style.display = "block";
}
span.onclick = function() {
    Modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target === Modal) {
        Modal.style.display = "none";
    }
}