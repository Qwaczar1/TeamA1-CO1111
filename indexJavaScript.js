let navElement = document.querySelector("#nav");
let burgerMenuElement = document.querySelector("#burgerMenu");

function burgerMenuClick() {
    navElement.classList.toggle("nav--open");
    burgerMenuElement.classList.toggle("hamburger--open");
}