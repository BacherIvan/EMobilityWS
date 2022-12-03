/*  ==========================================================================
    LIGHTBOX
    It uses the 'lightgallery.js' plugin
    ========================================================================== */

// node modules imports
import { cloneDeep, merge } from 'lodash-es';
import 'lightgallery.js';
import 'lg-thumbnail.js';
import 'lg-video.js';

/* CODE
 * --------------------------------------------------------------------------- */

export function initLightBoxGallery(element, overrides) {
    // default options
    const defaults = {
        selector: '.JS-lbox__item',
        counter: false,
        thumbnail: false,
        exThumbImage: 'data-exthumbimage',
        download: false,
        videojs: true,
        videojsOptions: {
            controls: 1,
        },
        iframeMaxWidth: '100%',
        thumbWidth: 70,
        thumbContHeight: 90,
    };

    // options overrides
    const options = merge(cloneDeep(defaults), overrides);

    // initialize
    // eslint-disable-next-line no-undef
    lightGallery(element, options);
}
