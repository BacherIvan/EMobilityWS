/*  ==========================================================================
    HEADER
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';
import 'waypoints/lib/noframework.waypoints';
import Cookies from 'js-cookie';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { initPreventLinkOnTouch } from 'tk-source-root/js/utilities/prevent-link-on-touch';
import { EasingFunctions, pixelWarp } from 'tk-source-root/js/utilities/pixel-warper';
import CryptoJS from "crypto-js";

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'header';

// initialize module
const $section = $(`.${vars.CLASSNAMES.sect}[data-id="${identifier}"]`);
if ($section.length) {
    // prevent linking on touch
    initPreventLinkOnTouch('JS-block-touch');

    // trigger mobile menu
    let menuOpenHeader = 0;
    let menuOpenHero = 0;
    let pageScrollable = 1;
    $section.on('click', '.JS-main-menu-trigger', () => {
        $section.attr('data-menu-open', menuOpenHeader = 1 - menuOpenHeader);
        vars.LAYOUT.$hero.attr('data-menu-open', menuOpenHero = 1 - menuOpenHero);
        vars.LAYOUT.$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
    });


    $section.on('click', '.JS-login-menu-trigger', () => {
        $section.attr('data-login-open', menuOpenHeader = 1 - menuOpenHeader);
        $section.attr('data-login-error', 0);
        vars.LAYOUT.$hero.attr('data-login-open', menuOpenHero = 1 - menuOpenHero);
        vars.LAYOUT.$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
        $section.attr('data-login-error', 0);
        document.getElementById('JS-username').value = '';
        document.getElementById('JS-password').value = '';
    });
    const salt = "$2a$13$x69";
    var login = document.getElementById('JS-login');

    window.onclick = function (event) {
        if (event.target == login) {
            $section.attr('data-login-open', menuOpenHeader = 1 - menuOpenHeader);
            $section.attr('data-login-error', 0);
            vars.LAYOUT.$hero.attr('data-login-open', menuOpenHero = 1 - menuOpenHero);
            vars.LAYOUT.$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
            $section.attr('data-login-error', 0);
        }
    }

    // Wenn enter gedrückt wird, einen Button click "simulieren"
    var input = document.getElementById('JS-login');
    input.addEventListener("keypress", function (event) {
        if(event.key === "Enter") {
            document.getElementById("JS-button").click();
        }
    });

    $section.on('click', '.JS-login-button', () => {
        // Cookies überprüfen und direkt weiterleiten oder Fehlermeldung ausgeben
        var xhttp = new XMLHttpRequest();
        var user = document.getElementById('JS-username').value;
        var pwd = document.getElementById('JS-password').value;
        const CryptoJS = require("crypto-js");
        pwd = CryptoJS.SHA512(salt + pwd).toString();
        console.log(pwd);
        $section.attr('data-login-error', 0);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var values = JSON.parse(xhttp.responseText);
                if (values.statusCode == 0) {
                    // Cookies setzen
                    Cookies.set('uname', user, { expires: 7, path: '/' });
                    Cookies.set('pwd', pwd, { expires: 7, path: '/' });
                    // Values zurücksetzen
                    document.getElementById('JS-username').value = '';
                    document.getElementById('JS-password').value = '';
                    // Weiterleitung
                    window.open('admin.php', '_blank');
                } else {
                    $section.attr('data-login-error', 1);
                    document.getElementById('JS-displayError').innerHTML = "Benutzername oder Passwort sind nicht korrekt!";
                }
            }
        };

        xhttp.open("GET", "/config/db/Login.php?uname=" + user + "&pwd=" + pwd);
        xhttp.send(null);
    });


    // menu scroll animation
    $section.find('.JS-anchor').on('click', function () {
        const target = $(this).attr('data-target'),
            $element = $(`#${target}`);

        $section.attr('data-menu-open', menuOpenHeader = 1 - menuOpenHeader);
        vars.LAYOUT.$hero.attr('data-menu-open', menuOpenHero = 1 - menuOpenHero);
        vars.LAYOUT.$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);

        pixelWarp($element[0], {
            speed: 500,
            verticalOffset: -50,
            easing: EasingFunctions.easeInOutQuad,
        });
    });

    // scrolling
    const wayPoint1 = new Waypoint({
        element: document.getElementById('JS-waypoint--1'),
        handler: function (direction) {
            if (direction === 'down') {
                $section.attr('data-scrolling', '1');
                vars.LAYOUT.$hero.attr('data-scrolling', '1');
                vars.LAYOUT.$hero.find('.JS-confetti-effect').addClass('hidden');
            } else {
                $section.attr('data-scrolling', '0');
                vars.LAYOUT.$hero.attr('data-scrolling', '0');
            }
        },
        offset: 0,
    });
}
