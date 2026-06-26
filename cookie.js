/**
 * Initialise a cookie object
 * @param {string} name 
 * @author Jack Dunn <https://github.com/JackDunnCodes>
 * @license MPL-2.0
 */
function cookie(name) {
    /**
     * Get the value of this cookie
     * @returns The cookie value
     */
    function value() {
        let cookieString = decodeURIComponent(document.cookie);
        let cookies = cookieString.split(';');
        for(let i = 0; i <cookies.length; i++) {
            let cookie = cookies[i].trim().split('=');
            let cookieName = cookie[0];
            if (cookieName === name) {
                return cookie.slice(1).join('=');
            }
        }
        return undefined;
    }
    /**
     * Set the value of the cookie, with an optional timeout.
     * @param {*} value 
     * @param {number} seconds 
     */
    function set(value, seconds = undefined) {
        if(seconds === undefined) {
            document.cookie = name + "=" + value+";path=/";
        } else {
            const d = new Date();
            d.setTime(d.getTime() + (seconds*1000));
            document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/";
        }
    }
    function deleteCookie() {
        set("", -1);

    }
    return {value, set, delete: deleteCookie, toString: value().toString()};
}