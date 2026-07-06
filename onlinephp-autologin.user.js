// ==UserScript==
// @name         OnlinePHP.io - auto-login via GitHub
// @namespace    http://github.com/jackdunncodes/
// @version      2026-07-06.02
// @description  Premium account keep logging you out? This is for you. PLEASE NOTE - this only works for Github logins. Any others, open a feature request issue :)
// @author       Jack Dunn
// @match        https://onlinephp.io
// @match        https://onlinephp.io/login
// @icon         https://www.google.com/s2/favicons?sz=64&domain=onlinephp.io
// @updateURL    https://github.com/JackDunnCodes/bits-n-bobs/raw/refs/heads/main/onlinephp-autologin.user.js
// @downloadURL  https://github.com/JackDunnCodes/bits-n-bobs/raw/refs/heads/main/onlinephp-autologin.user.js
// @supportURL   https://github.com/JackDunnCodes/bits-n-bobs/issues
// @source       https://github.com/JackDunnCodes/bits-n-bobs/blob/main/onlinephp-autologin.user.js
// @grant        none
// @license      MPL-2.0
// ==/UserScript==

(function() {
    'use strict';

    function overlayIt() {
        const overlay = document.createElement('div');
                overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
`;
        document.body.appendChild(overlay);
    }
    
    function go() {
        try{
            if(document.querySelector('button.login-github') !== null) {
                window.stop();
                overlayIt();

                document.querySelector('button.login-github').click();
            } else if (document.querySelector('a[href="https://onlinephp.io/login"]') !== null) {
                overlayIt();

                document.querySelector('a[href="https://onlinephp.io/login"]').click();
                window.setTimeout(go, 1000);
            }
        } catch (e) {
            console.error(e)
            window.setTimeout(go, 100);
        }
    }

    window.setTimeout(function () {
        go();
        document.onreadystatechange=go;
    },1);
})();
