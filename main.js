// Get references to HTML elements
let help = document.getElementById("help");
let helpBox = document.getElementById("helpBox");
let closeHelpBox = document.getElementById("closeHelpBox");
let about = document.getElementById("about");
let aboutBox = document.getElementById("aboutBox");
let closeAboutBox = document.getElementById("closeAboutBox");
let QRCodeLogo = document.getElementById("qrCodeLogo");
let QRCodeBox = document.getElementById("QRCodeBox");
let closeQRCodeBox = document.getElementById("closeQRCodeBox");

// Display QR Code box when QR Code Logo is clicked
QRCodeLogo.onclick = function() {
    QRCodeBox.style.display = "block";
}

// Close QR Code box when close button is clicked
closeQRCodeBox.onclick = function() {
    QRCodeBox.style.display = "none";
}

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