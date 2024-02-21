let treasureHuntsElement = document.getElementById("challenges");

async function getChallenges() {
    // Fetch again inside the function if needed
    fetch("https://codecyprus.org/th/api/list")
        .then(response => response.json())
        .then(jsonObject => {
            // Use the fetched data here
            for (let i = 0; i < jsonObject.treasureHunts.length; i++) {
                treasureHuntsElement.innerHTML += "<li>" + "<button>" + jsonObject.treasureHunts[i].name + "</button>" + "</li>";
            }
        });
}

getChallenges();