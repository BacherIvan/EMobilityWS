/*  ==========================================================================
    GENERAL
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';
import 'lazysizes';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';

import {
    onFirstUserAction,
} from 'tk-source-root/js/utilities/first-user-interaction';
import { initScroller } from 'tk-source-root/js/utilities/scroller';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Inner Width as CSS-Variable
 * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);


/**
 * ON FIRST USER ACTION
 */
onFirstUserAction()
    .then(() => {
        /**
         * SCROLLER
         * init scroller on page scroll
         */
        const $scroller = vars.LAYOUT.$body.find(`.${vars.CLASSNAMES.scroller}`);
        if ($scroller.length) {
            initScroller($scroller);
        }
    });


