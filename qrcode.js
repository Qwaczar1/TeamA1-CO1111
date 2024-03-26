var opts = {
    continuous: true,
    video: document.getElementById('preview'),
    mirror: true,
    captureImage: false,
    backgroundScan: true,
    scanPeriod: 1,
};

var scanner = new Instascan.Scanner(opts);
var cameras;
var currentCameraIndex = 0;

scanner.addListener('scan', function (content) {
    console.log(content);
    document.getElementById("content").innerHTML = content;
    scanner.stop(); // Stop continuous scanning
    document.getElementById('preview').style.display = 'none'; // Hide the video element
});

function switchCamera(direction) {
    if (cameras.length > 1) {
        if (direction === 'next') {
            currentCameraIndex = (currentCameraIndex + 1);
        }
        else if (direction === 'previous') {
            currentCameraIndex = (currentCameraIndex - 1 + cameras.length);
        }
        scanner.stop();
        scanner.start(cameras[currentCameraIndex]);
    }
}

let QRCodeLogo = document.getElementById("qrCodeLogo");
let QRCodeBox = document.getElementById("QRCodeBox");
let closeQRCodeBox = document.getElementById("closeQRCodeBox");

// Display QR Code box when QR Code Logo is clicked
QRCodeLogo.onclick = function() {
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        }
        else {
            console.error('No cameras found.');
            alert("No cameras found.");
        }
    }).catch(function (e) {
        console.error(e);
    });
    QRCodeBox.style.display = "block";
    scanner.start(cameras[currentCameraIndex]); // Start scanning when QR Code box is displayed
}

// Close QR Code box when close button is clicked
closeQRCodeBox.onclick = function() {
    QRCodeBox.style.display = "none";
    scanner.stop(); // Stop scanning when QR Code box is closed
}