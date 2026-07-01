/**
 * Initialise a cookie object. Minifies to less than 395 bytes (305 bytes gzipped)!
 * Note: Don't include as a seperate file and create a bunch of overhead. Just copy-paste into your own JS.
 * @param {string} name 
 * @author Jack Dunn <https://github.com/JackDunnCodes>
 * @license MPL-2.0
 */
function cookie(name) {
    let nameEquals = name+"=";
  let _document = document;
    /**
     * Get the value of this cookie
     * @returns The cookie value
     */
    let value = () => {
        let re = new RegExp(";? *"+nameEquals+"([^;]*)(?:;|$)")
        let match = re.exec(_document.cookie);
        if(match !== null){return decodeURIComponent(match[1])};
    };
    /**
     * Set the value of the cookie, with an optional timeout.
     * @param {*} value 
     * @param {number} seconds 
     */
    let set = (value, seconds = NaN) => {
        return _document.cookie =
            nameEquals + encodeURIComponent(value) + ";path=/"
            + (
                isNaN(seconds) ? '' : (
                    ";expires=" + (new Date(Date.now() + (seconds*1000))).toUTCString()
                )
            );
        }
    return {value, set, delete: ()=>{return set("",0)}, toString:value};
}