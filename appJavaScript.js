let challengesList = document.getElementById("challenges");
let treasureHuntsElement = document.getElementById("treasureHunts");

async function getChallenges() {
    // Fetch again inside the function if needed
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {
            // Use the fetched data here
            for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
                let treasureHuntButton = document.createElement("li");
                treasureHuntButton.innerHTML = jsonObject.treasureHunts[i].name;
                treasureHuntsElement.appendChild(treasureHuntButton);
            }
        });
}

getChallenges();