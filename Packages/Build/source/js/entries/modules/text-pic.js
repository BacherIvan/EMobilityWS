/*  ==========================================================================
    MODULE
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { rteMore } from 'tk-source-root/js/utilities/_general';
import { inView } from 'tk-source-root/js/utilities/in-view';
import { initLightBoxGallery } from 'tk-source-root/js/utilities/lightbox';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'text-pic';

// initialize module
const $modules = $(`.${vars.CLASSNAMES.mod}[data-id="${identifier}"]`);
inView($modules.get(), (item) => {
    const $container = $(item.target);

    // read more function on mobile devices
    rteMore($container);
    // init Light Box Gallery
    initLightBoxGallery($container.find('.JS-lbox').get(0));

    // add fade in
    $container.addClass('JS-fade-in');

}, {
    rootMargin: '0px',
});
