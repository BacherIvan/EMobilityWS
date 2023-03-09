/*  ==========================================================================
    MODULE
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { inView } from 'tk-source-root/js/utilities/in-view';
import { EasingFunctions, pixelWarp } from 'tk-source-root/js/utilities/pixel-warper';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'sidenav';

// initialize module
const $modules = $(`.${vars.CLASSNAMES.sect}[data-id="${identifier}"]`);

inView($modules.get(), (item) => {
    const $container = $(item.target);

    // get sidenav items
    const $sideNavItems = $container.find('.JS-items');

    // update sidenav on scroll
    $('.EBIL-module').each(function () {
        const $element = $(this);
        inView($element.get(), (item) => {
            const $elementInView = $(item.target);
            const elementInViewCID = $elementInView.attr('id');
            $sideNavItems.find('.JS-item').removeClass('JS-act');
            $sideNavItems.find(`[data-cid="${elementInViewCID}"]`).addClass('JS-act');
            vars.LAYOUT.$header.find('.JS-anchor').removeClass('JS-act');
            vars.LAYOUT.$header.find(`[data-target="${elementInViewCID}"]`).addClass('JS-act');
        }, {
            rootMargin: '-50%',
            once: false,
        });
    });
    inView($('.EBIL-section[data-id="footer"] .EBIL-section__legal-menu').get(), (item) => {
        const $elementInView = $(item.target);
        const elementInViewCID = $elementInView.attr('id');
        $sideNavItems.find('.JS-item').removeClass('JS-act');
        let x = document.getElementById('JS-footer-id');
        x.classList.add('JS-act')
        vars.LAYOUT.$header.find('.JS-anchor').removeClass('JS-act');
        vars.LAYOUT.$header.find('[data-target="EBIL-section--footer"]').addClass('JS-act');
    }, {
        rootMargin: '0px',
        once: false,
    });

    // sidenav item on click scroll to
    $sideNavItems.find('.JS-item').on('click', function (e) {
        const elementTargetID = $(this).attr('data-cid');

        pixelWarp(vars.LAYOUT.$body.find(`[id="${elementTargetID}"]`)[0], {
            speed: 500,
            verticalOffset: -50,
            easing: EasingFunctions.easeInOutQuad,
        });
    });
});
