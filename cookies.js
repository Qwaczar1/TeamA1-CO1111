// Function to set cookie
function setCookie(cookieName, cookieValue, expireDays) {
    let date = new Date();
    // Calculate the expiration date
    date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    // Set the cookie with specified name, value, and expiration date
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Function to get the value of a cookie
function getCookie(cookieName) {
    let name = cookieName + "=";
    // Decode the cookie string
    let decodedCookie = decodeURIComponent(document.cookie);
    // Split the decoded cookie string into an array of individual cookies
    let cookieArray = decodedCookie.split(';');
    for(let i = 0; i <cookieArray.length; i++) {
        let cookie = cookieArray[i];
        // Remove leading spaces from the cookie string
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        // If the cookie starts with the specified name, return its value
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    // Return null if the cookie with the specified name is not found
    return null;
}