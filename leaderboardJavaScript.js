const TH_API_URL = "https://codecyprus.org/th/api/leaderboard?sorted"; // the API base url

function getLeaderBoard(url) {
    // create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            handleLeaderboard(json);
        });
}

getLeaderBoard(TH_API_URL + getCookie('sessionID'));

console.log(TH_API_URL + getCookie('sessionID'));

function handleLeaderboard(leaderboard) {
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        html += "<tr>" +
            "<td>" + entry['player'] + "</td>" +
            "<td>" + entry['score'] + "</td>" +
            "<td>" + entry['completionTime'] + "</td>" +
            "</tr>";
    }
    document.getElementById('test-results-table').innerHTML += html;
}