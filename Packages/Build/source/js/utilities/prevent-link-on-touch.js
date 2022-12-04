/*  ==========================================================================
    PREVENT LINK ON HOVER
    Add functionality for the first main navigation level, so that
    the navigation is more user-friendly on touch-devices
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

// local imports
import { LAYOUT } from 'tk-source-root/js/variables/variables';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Function which initialize the trigger for the first level-links in the main
 * navigation menu. It triggers only on touch devices. The corresponding links
 * doesn't link on the first touch-click but on the second. The first click opens
 * just the submenu so you can have access to them, too.
 *
 * @param {string} linkClass - the class for the first level-links in the menu
 */
export function initPreventLinkOnTouch(linkClass) {
    const $links = $(`.${linkClass}`);
    if ($links.length) {
        LAYOUT.$html.on('touchstart', (e) => {
            const $target = $(e.target);

            if (!$target.hasClass(linkClass)) {
                $links.removeClass(`${linkClass}--act`);
            }
            if ($target.hasClass(linkClass) && !$target.hasClass(`${linkClass}--act`)) {
                $links.removeClass(`${linkClass}--act`);
            }
            $links.on('click', (event) => {
                const $this = $(event.currentTarget);

                if (!$this.hasClass(`${linkClass}--act`)) {
                    event.preventDefault();
                    $links.removeClass(`${linkClass}--act`);
                    $this.addClass(`${linkClass}--act`);
                }
            });
        });
    } else {
        console.log('No menu elements for \'preventLinkOnTouch\' found.');
    }
}
