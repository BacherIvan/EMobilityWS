/*  ==========================================================================
    MODULE
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'Packages/Build/source/js/variables/variables';
import { inView } from 'Packages/Build/source/js/utilities/in-view';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'PRESET';

// initialize module
const $modules = $(`.${vars.CLASSNAMES.mod}[data-id="${identifier}"]`);
inView($modules.get(), (item) => {
    const $container = $(item.target);

    // ...
});
