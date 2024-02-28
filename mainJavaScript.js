let navElement = document.querySelector("#nav");
let burgerMenuElement = document.querySelector("#burgerMenu");

function burgerMenuClick() {
    navElement.classList.toggle("nav--open");
    burgerMenuElement.classList.toggle("burgerMenu--open");
}
let box = document.getElementById("Modal");

// to open the modal
let help = document.getElementById("help");

//span element to close the modal
let span = document.getElementsByClassName("ToClose")[0];

//when click 'help' to open the modal
help.onclick = function() {
    box.style.display = "block";
}

//when click 'X' to close the modal
span.onclick = function() {
    box.style.display = "none";

}
let box2 = document.getElementById("Modal2");

let about = document.getElementById("about");

let span2 = document.getElementsByClassName("ToClose2")[0];

about.onclick = function() {
    box2.style.display = "block";
}

span2.onclick = function() {
    box2.style.display = "none";
}