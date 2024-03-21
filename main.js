// Get references to HTML elements
let help = document.getElementById("help");
let helpBox = document.getElementById("helpBox");
let closeHelpBox = document.getElementById("closeHelpBox");
let about = document.getElementById("about");
let aboutBox = document.getElementById("aboutBox");
let closeAboutBox = document.getElementById("closeAboutBox");

// Display help box when 'Help' is clicked
help.onclick = function() {
    helpBox.style.display = "block";
}

// Close help box when close button is clicked
closeHelpBox.onclick = function() {
    helpBox.style.display = "none";
}

// Display about box when 'About' is clicked
about.onclick = function() {
    aboutBox.style.display = "block";
}

// Close about box when close button is clicked
closeAboutBox.onclick = function() {
    aboutBox.style.display = "none";
}