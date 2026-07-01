/**
 * Initialise a cookie object. Minifies to less than 400 bytes (307 bytes gzipped)!
 * Note: Don't include as a seperate file and create a bunch of overhead. Just copy-paste into your own JS.
 * @param {string} name 
 * @author Jack Dunn <https://github.com/JackDunnCodes>
 * @license MPL-2.0
 */
function cookie(name) {
  let _docCookie = (value) => {return document.cookie=value}, _eqChar = '=';
    /**
     * Get the value of this cookie
     * @returns The cookie value
     */
    let value = () => {
        let cookieString = decodeURIComponent(document.cookie);
        let cookies = cookieString.split(';');
        for(let i in cookies) {
            let cookie = cookies[i].trim().split(_eqChar);
            let cookieName = cookie[0];
            if (cookieName === name) {
                return cookie.slice(1).join(_eqChar);
            }
        }
        return undefined;
    };
    /**
     * Set the value of the cookie, with an optional timeout.
     * @param {*} value 
     * @param {number} seconds 
     */
    let set = (value, seconds = NaN) => {
        return document.cookie =
            name + _eqChar + value + ";path=/"
            + (
                isNaN(seconds) ? '' : (
                    ";expires=" + (new Date(Date.now() + (seconds*1000))).toUTCString()
                )
            );
        }
    return {value, set, delete: ()=>{return set("",0)}, toString:value};
}