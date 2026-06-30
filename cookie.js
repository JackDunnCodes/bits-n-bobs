/**
 * Initialise a cookie object
 * @param {string} name 
 * @author Jack Dunn <https://github.com/JackDunnCodes>
 * @license MPL-2.0
 */
function cookie(name) {
  let docCookie = (value) => {return document.cookie=value}
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
    function set(value, seconds = null) {
        const nvp =name + "=" + value+ ";path=/";
        if(seconds === null) {
            docCookie(nvp);
        } else {
            const d = new Date();
            d.setTime(d.getTime() + (seconds*1000));
            docCookie(nvp + ";expires=" + d.toUTCString());
        }
    }
    return {value, set, delete: ()=>{return set("",0)}, toString:value};
}