/*  ==========================================================================
    MAIN
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'Packages/Build/source/js/variables/variables';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'main';

// initialize module
const $section = $(`.${vars.CLASSNAMES.sect}[data-id="${identifier}"]`);
if ($section.length) {
    // ...
}
