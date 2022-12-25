/*  ==========================================================================
    HEADER
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';
import 'waypoints/lib/noframework.waypoints';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { initPreventLinkOnTouch } from 'tk-source-root/js/utilities/prevent-link-on-touch';
import { EasingFunctions, pixelWarp } from 'tk-source-root/js/utilities/pixel-warper';

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
        vars.LAYOUT.$hero.attr('data-login-open', menuOpenHero = 1 - menuOpenHero);
        vars.LAYOUT.$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
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
