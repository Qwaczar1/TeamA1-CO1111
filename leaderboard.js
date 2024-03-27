const TH_API_URL = "https://codecyprus.org/th/api/"; // Base URL for the Treasure Hunt API
const sessionID = getCookie("sessionID"); // Get session ID from cookie

// Function to fetch leaderboard data
function getLeaderBoard(url) {
    // create and invoke the http request
    fetch(url, { method: "GET" })
        .then(response => response.json())
        .then(json => {
            handleLeaderboard(json);
        });
}

// Function to handle and display leaderboard data
function handleLeaderboard(leaderboard) {
    let options = { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',second: '2-digit' };
    let html = ""; // used to include HTML code for the table rows
    let count = 1;
    let leaderboardArray = leaderboard['leaderboard'];
    for(const entry of leaderboardArray) {
        let date = new Date(entry['completionTime']);
        let formattedDate = date.toLocaleDateString("en-UK", options);
        // Construct HTML row for the entry
        html += "<tr>" +
            "<td class='tableData'>" + count + "</td>" +
            "<td class='tableData'>" + entry['player'] + "</td>" +
            "<td class='tableData'>" + entry['score'] + " Pts" + "</td>" +
            "<td class='tableData'>" + formattedDate + "</td>" +
            "</tr>";
        count++;
    }
    // Append the generated HTML to the table with id 'test-results-table'
    let leaderboardTable = document.getElementById('leaderboardTable');
    leaderboardTable.innerHTML += html;
}

// URL for fetching leaderboard data
let url = TH_API_URL + "leaderboard?sorted&limit=30&session=" + getCookie("sessionID");
// Call getLeaderBoard function with the URL
getLeaderBoard(url);

// Parse URL parameter
const urlParams = new URLSearchParams(window.location.search);
const completed = urlParams.get('completed');
const rankText = document.getElementById('rankText');

const _score = document.getElementById("score");

// Display appropriate message based on session completion
if (completed === 'true') {
    // Display content for completion
    rankText.innerHTML = "Congratulations! You have completed the session.<br><br>Can you see your name in the top 30 players?";
}
else {
    rankText.innerHTML = "You have not completed the session.";
}

// Function to refresh the page
function refresh() {
    window.location.reload();
}