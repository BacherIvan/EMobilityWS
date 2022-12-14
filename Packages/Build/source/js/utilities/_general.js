/*  ==========================================================================
    GENERAL
    In this file are functions which can't be assigned to specifc groups or
    topics like the other files.
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Gives the possibility to toggle a class on an element by a click on
 * a different (or the same) element
 *
 * @param trigger the target on which the 'click' event will be triggered
 * @param target the element which will be altered
 * @param className the class which will be either added or removed
 */
export function clickToggleClass(trigger, target, className) {
    $(trigger).on('click', () => {
        if (!$(target).hasClass(className)) {
            $(target).addClass(className);
        } else {
            $(target).removeClass(className);
        }
    });
}

/**
 * RTE MORE
 * Shows entire text on mobile devices if text was collapsed
 * * @param $module
 */
export function rteMore($module) {
    $module.on('click', '.JS-rte-more', (e) => {
        $module.find('.JS-rte-text').removeClass('JS-crop-text');
        $module.find('.JS-rte-more').remove();
    });
}

/**
 * START COUNTER
 * Shows entire text on mobile devices if text was collapsed
 * * @param $module
 */
