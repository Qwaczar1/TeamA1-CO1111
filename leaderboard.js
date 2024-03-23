const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url
const sessionID = getCookie("sessionID"); // Get session ID from cookie

function getLeaderBoard(url) {
    // create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            handleLeaderboard(json);
        });
}


function handleLeaderboard(leaderboard) {
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',second: '2-digit' };
    let html = ""; // used to include HTML code for the table rows
    let count = 1;
    let leaderboardArray = leaderboard['leaderboard'];
    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);

        html += "<tr>" +
            "<td class='tableData'>" + count + "</td>" +
            "<td class='tableData'>" + entry['player'] + "</td>" +
            "<td class='tableData'>" + entry['score'] + " Pts" + "</td>" +
            "<td class='tableData'>" + formattedDate + "</td>" +
            "</tr>";
        count++;
    }
    let scoreboardTable = document.getElementById('scoreboardTable');
    scoreboardTable.innerHTML += html;
}

let url = TH_API_URL + "leaderboard?sorted&limit=30&session=" + getCookie("sessionID");
getLeaderBoard(url);