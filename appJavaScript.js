let treasureHuntsElement = document.getElementById("treasureHuntsList");

async function getChallenges() {
    // Fetch again inside the function if needed
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {
            // Use the fetched data here
            for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
                var milliseconds = jsonObject.treasureHunts[i].endsOn;
                const weeks = millisecondsToWeeks(milliseconds);
                const roundedWeeks = Math.round(weeks);
                treasureHuntsElement.innerHTML += "<li class='treasureHunts'>" + "<a href=''><button onclick='startTreasureHunt()' class='treasureHuntsButtons'>" + "<p class='treasureHuntName'>" + jsonObject.treasureHunts[i].name + "<img src='media/start-button.png' class='startLogo' alt='Treasure Hunt Logo'>" + "</p>" + "<p class='endsInText'> Ends in: " + roundedWeeks + " weeks" + "</p>" + "</button></a>" + "</li>";

                console.log(jsonObject.treasureHunts[0].endsOn);
            }
        });
}

getChallenges();

function millisecondsToWeeks(milliseconds) {
    return milliseconds / (1000 * 60 * 60 * 24 * 7);
}

async function startTreasureHunt() {
    // Fetch again inside the function if needed
    fetch("https://codecyprus.org/th/api/start")
        .then(response => response.json())
        .then(jsonObject => {
            console.log(jsonObject);
            // let treasureHuntsArray = JSON.parse(jsonObject);
            // for (let i = 0; i < treasureHuntsArray.length; i++) {
            //     console.log("TH name: " + treasureHuntsArray[0].name);
            //     console.log("TH name: " + treasureHuntsArray[1].name);
            // }
        });
}
//
// let thcJSONResponse = '{\n' +
//     ' "treasureHunts": [\n' +
//     ' {\n' +
//     ' "uuid": "f1a6332f-27a4-4522-b52e-4937d5d747c7",\n' +
//     ' "name": "name-0",\n' +
//     ' "description": "description-0",\n' +
//     ' "ownerEmail": "email-0@example.com",\n' +
//     ' "secretCode": "abc1234",\n' +
//     ' "visibility": "PRIVATE",\n' +
//     ' "startsOn": 1568883640616,\n' +
//     ' "endsOn": 1568887240616,\n' +
//     ' "maxDuration": 720000,\n' +
//     ' "shuffled": false,\n' +
//     ' "requiresAuthentication": false,\n' +
//     ' "emailResults": true,\n' +
//     ' "hasPrize": false\n' +
//     ' },\n' +
//     ' {\n' +
//     ' "uuid": "05de92a7-6f7c-442c-a6c3-bd97a810002f",\n' +
//     ' "name": "name-1",\n' +
//     ' "description": "description-1",\n' +
//     ' "ownerEmail": "email-1@example.com",\n' +
//     ' "secretCode": "abc1234",\n' +
//     ' "visibility": "PUBLIC",\n' +
//     ' "startsOn": 1568883640617,\n' +
//     ' "endsOn": 1568887240617,\n' +
//     ' "maxDuration": 360000,\n' +
//     ' "shuffled": false,\n' +
//     ' "requiresAuthentication": false,\n' +
//     ' "emailResults": true,\n' +
//     ' "hasPrize": true\n' +
//     ' }\n' +
//     ' ],\n' +
//     ' "status": "OK"\n' +
//     '}';
//
// let thcJSONResponseObject = JSON.parse(thcJSONResponse);
// console.log(thcJSONResponseObject);
//
// let treasureHuntsArray = thcJSONResponseObject.treasureHunts;
//
// console.log("Status: " + thcJSONResponseObject.status);
// console.log("treasureHunt size: " + treasureHuntsArray.length);
//
// for (let i = 0; i < treasureHuntsArray.length; i++) {
//     console.log("TH name: " + treasureHuntsArray[0].name);
//     console.log("TH name: " + treasureHuntsArray[1].name);
// }

function refresh() {
    window.location.reload();
}