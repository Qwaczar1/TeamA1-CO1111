const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url
const sessionID = getCookie("sessionID"); // Get session ID from cookie

function getLeaderBoard(url) {
    // create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            handleLeaderboard(json);
        });
}

// console.log(TH_API_URL + "leaderboard?session=" + getCookie('sessionID') + "&sorted");

function handleLeaderboard(leaderboard) {
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',second: '2-digit' };
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    console.log(leaderboardArray);
    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);

        html += "<tr>" +
            "<td class='tableData'>" + entry['player'] + "</td>" +
            "<td class='tableData'>" + entry['score'] + "</td>" +
            "<td class='tableData'>" + formattedDate + "</td>" +
            "</tr>";
    }
    let scoreboardTable = document.getElementById('scoreboardTable');
    scoreboardTable.innerHTML += html;
}

let url = TH_API_URL + "leaderboard?sorted&limit=20&session=" + getCookie("sessionID");
getLeaderBoard(url);