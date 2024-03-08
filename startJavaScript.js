const params = new URLSearchParams(window.location.search);
const app = params.get("app");
const player = params.get("player");
const treasureHuntID = params.get("treasure-hunt-id");

console.log(app);
console.log(player);
console.log(treasureHuntID);

// const url = `https://codecyprus.org/th/api/start?player=${...}&app=${...}&treasure-hunt-id=${...}`;
// console.log(url);
// fetch(`https://codecyprus.org/th/api/start?player=${playerName}&app=GroupA1-App&treasure-hunt-id=${treasureHuntId}`)
//     .then(value => value.json())
//     .then(jsonObject => {
//        console.log(jsonObject);
//     });