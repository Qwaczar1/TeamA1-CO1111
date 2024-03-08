const params = new URLSearchParams(window.location.search);
const appName = params.get("app");
const playerName = params.get("player");
const treasureHuntID = params.get("treasure-hunt-id");

console.log(appName);
console.log(playerName);
console.log(treasureHuntID);

const url = `https://codecyprus.org/th/api/start?player=${playerName}&app=${appName}&treasure-hunt-id=${treasureHuntID}`;
fetch(url)
    .then(value => value.json())
    .then(jsonObject => {
       console.log(jsonObject);
    });