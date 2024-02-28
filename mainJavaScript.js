let navElement = document.querySelector("#nav");
let burgerMenuElement = document.querySelector("#burgerMenu");

function burgerMenuClick() {
    navElement.classList.toggle("nav--open");
    burgerMenuElement.classList.toggle("burgerMenu--open");
}

let help = document.getElementById("help");
let helpBox = document.getElementById("helpBox");
let closeHelpBox = document.getElementById("closeHelpBox");
let about = document.getElementById("about");
let aboutBox = document.getElementById("aboutBox");
let closeAboutBox = document.getElementById("closeAboutBox");

// Display help box when pressed
help.onclick = function() {
    helpBox.style.display = "block";
}

// Close help box when pressed
closeHelpBox.onclick = function() {
    helpBox.style.display = "none";
}

// Display about box when pressed
about.onclick = function() {
    aboutBox.style.display = "block";
}

// Close about box when pressed
closeAboutBox.onclick = function() {
    aboutBox.style.display = "none";
}

