// ==UserScript==
// @name         OnlinePHP.io - auto-login via GitHub
// @namespace    http://github.com/jackdunncodes/
// @version      2026-07-02
// @description  Premium account keep logging you out? This is for you.
// @author       Jack Dunn
// @match        https://onlinephp.io
// @match        https://onlinephp.io/login
// @icon         https://www.google.com/s2/favicons?sz=64&domain=onlinephp.io
// @grant        none
// @license      MPL-2.0
// ==/UserScript==

(function() {
    'use strict';

    function go() {
        try{
            if(document.querySelector('button.login-github') !== null) {
                window.stop();
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

                document.querySelector('button.login-github').click();
            } else if (document.querySelector('a[href="https://onlinephp.io/login"]') !== null) {
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
