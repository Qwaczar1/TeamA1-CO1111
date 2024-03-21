const TH_API_URL = "https://codecyprus.org/th/api/"; // the API base url

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

var identifier = "leaderboard.html"; // Identifier for this HTML file

// Execute the script only if the identifier matches
if (window.location.pathname.includes(identifier)) {
    var urlParams = new URLSearchParams(window.location.search);

    // Check if the 'session' parameter exists
    if (!urlParams.has('session')) {
        // Set the 'session' parameter with a value (sessionID variable assumed to be defined)
        urlParams.set('session', sessionID);
    }

    // Update the URL with the modified parameters
    var updatedUrl = window.location.pathname + '?' + urlParams.toString();
    document.getElementById('leaderboardID').setAttribute('href', updatedUrl);
}

let url = TH_API_URL + "leaderboard?sorted&session=" + getCookie("sessionID");
getLeaderBoard(url);