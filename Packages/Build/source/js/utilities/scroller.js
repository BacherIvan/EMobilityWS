/*  ==========================================================================
    SCROLLER
    ========================================================================== */

// node modules imports
import { throttle } from 'lodash-es';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * The calculator function for the scroll indicator.
 * for initialisation:
 * @see initScroller
 * @param $element
 */
function calculateScrollProgress($element) {
    const winHeight = window.innerHeight;
    // get the highest available number as new document height
    const docHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight,
    );
    const trackLength = docHeight - winHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    // calculate current scroll percentage and round it to 2 decimal places
    const percentScrolled = Math.round(((scrollTop / trackLength) * 100) * 100) / 100;
    $element.css('width', `${percentScrolled}%`);
}

/**
 * Init the scroll indicator
 * @param $element
 */
export function initScroller($element) {
    if ($element.length) {
        const throttledFunction = throttle(calculateScrollProgress, 25);
        window.addEventListener('resize', () => throttledFunction($element));
        window.addEventListener('scroll', () => throttledFunction($element));
    }
}
