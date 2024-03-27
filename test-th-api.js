const TH_API_URL = "https://codecyprus.org/th/test-api/"; // the API base url

// This function accesses the /leaderboard endpoint at the specified URL and handles the response
function getLeaderBoard(url) {
    // create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            handleLeaderboard(json);
        });
}

// Call the getLeaderBoard function with the URL for the leaderboard
getLeaderBoard(TH_API_URL + "leaderboard?sorted");

// This function handles the leaderboard data and generates HTML for displaying it
function handleLeaderboard(leaderboard) {
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    let html = ""; // used to include HTML code for the table rows
    let leaderboardArray = leaderboard['leaderboard'];
    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        // Construct HTML row for the entry
        html += "<tr>" +
            "<td>" + entry['player'] + "</td>" +
            "<td>" + entry['score'] + "</td>" +
            "<td>" + formattedDate + "</td>" +
            "</tr>";
    }
    // Append the generated HTML to the table with id 'test-results-table'
    document.getElementById('test-results-table').innerHTML += html;
}