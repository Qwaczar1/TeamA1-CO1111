let treasureHuntsElement = document.getElementById("treasureHuntsList");

async function getChallenges() {
    // Fetch again inside the function if needed
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {
            // Use the fetched data here
            for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
                treasureHuntsElement.innerHTML += "<li class='treasureHunts'>" + "<a href=''><button class='treasureHuntsButtons'>" + jsonObject.treasureHunts[i].name + "<img src='media/start-button.png' class='startLogo' alt='Treasure Hunt Logo'></button></a>" + "</li>";
            }
        });
}

getChallenges();