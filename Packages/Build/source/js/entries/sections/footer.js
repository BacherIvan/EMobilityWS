/*  ==========================================================================
    FOOTER
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { inView } from 'tk-source-root/js/utilities/in-view';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'footer';

// initialize module
const $section = $(`.${vars.CLASSNAMES.sect}[data-id="${identifier}"]`);
if ($section.length) {
    inView($section.get(), (item) => {
        const $container = $(item.target);

    });
}
