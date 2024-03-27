// Configuration options for the Instascan scanner
var opts = {
    continuous: true,
    video: document.getElementById('preview'),
    mirror: true,
    captureImage: false,
    backgroundScan: true,
    scanPeriod: 1,
};

// Create a new Instascan scanner with the provided options
var scanner = new Instascan.Scanner(opts);

// Initialize variables for cameras and current camera index
var cameras;
var currentCameraIndex = 0;

// Event listener for when a QR code is scanned
scanner.addListener('scan', function (content) {
    console.log(content);
    document.getElementById("content").innerHTML = content;
    scanner.stop(); // Stop continuous scanning
    document.getElementById('preview').style.display = 'none'; // Hide the video element
});

// Function to switch the camera (next or previous)
function switchCamera(direction) {
    if (cameras.length > 1) {
        if (direction === 'next') {
            currentCameraIndex = (currentCameraIndex + 1);
        }
        else if (direction === 'previous') {
            currentCameraIndex = (currentCameraIndex - 1 + cameras.length);
        }
        // Stop the scanner
        scanner.stop();
        // Start the scanner with the new camera
        scanner.start(cameras[currentCameraIndex]);
    }
}

let QRCodeLogo = document.getElementById("qrCodeLogo");
let QRCodeBox = document.getElementById("QRCodeBox");
let closeQRCodeBox = document.getElementById("closeQRCodeBox");

// Event listener to display QR Code box when QR Code Logo is clicked
QRCodeLogo.onclick = function() {
    loader.style.display = "block"; // Display loader while fetching cameras
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            // Start scanning with the first available camera
            scanner.start(cameras[0]);
            loader.style.display = "none"; // Hide loader once scanning starts
        }
        else {
            console.error('No cameras found.');
            alert("No cameras found.");
        }
    }).catch(function (e) {
        console.error(e);
    });
    QRCodeBox.style.display = "block"; // Display QR Code box
    scanner.start(cameras[currentCameraIndex]); // Start scanning when QR Code box is displayed
}

// Event listener to close QR Code box when close button is clicked
closeQRCodeBox.onclick = function() {
    QRCodeBox.style.display = "none"; // Hide QR Code box
    scanner.stop(); // Stop scanning
}