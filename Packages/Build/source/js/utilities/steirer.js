/*  ==========================================================================
    STEIRER
    Helper to create an accordion (= element which opens on click).
    The story behind the naming: https://en.wikipedia.org/wiki/Steirische_Harmonika

       +---+\/\/\/\/\/+---+
       |   | | |  | | |   |
       |   | | |  | | |   |
       |   | | |  | | |   |
       +---+/\/\/\/\/\+---+

    ========================================================================== */

// node modules imports
import $ from 'cash-dom';
import { pixelWarp } from 'Packages/Build/source/js/utilities/pixel-warper';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * The helper only adds classes; for open/close animations use css
 *
 * Each accordion must have following css classes and should be
 * structured (roughly) like this:
 *
 * ```html
 * <div class="JS-steirer">
 *     <div class="JS-steirer__trigger">
 *         Title
 *     </div>
 *     <div class="JS-steirer__slide">
 *         Content
 *     </div>
 * </div>
 * ```
 *
 * Additional classes:
 * - `JS-steirer--off` : to deactivate accordion
 * - `JS-steirer-single-open` : to parent container, which wraps all
 *   the accordions, if you want always only one accordion opened
 * - `JS-steirer--auto-scroll` : to activate auto scroll to content
 *
 *
 * Options:
 *   the options for the steirer util are only in use, to configure the
 *   pixel warper util
 *
 * @param $element
 * @param options
 */
export function initSteirer($element, options = {}) {
    if ($element.hasClass('JS-steirer')) {
        // trigger on click
        $element.on('click', '.JS-steirer__trigger', function () {
            if (!$element.hasClass('JS-steirer--off')) {
                const $this = $(this);
                if ($this.hasClass('JS-steirer__trigger--act')) {
                    // close this accordion if already open
                    $this.parents('.JS-steirer').removeClass('JS-steirer--first-opening');
                    $this.parents('.JS-steirer').removeClass('JS-steirer--open');
                    $this.parents('.JS-steirer').find('.JS-steirer__trigger').removeClass('JS-steirer__trigger--act');
                    $this.parents('.JS-steirer').find('.JS-steirer__slide').removeClass('JS-steirer__slide--open');
                } else {
                    // close other accordions
                    if ($element.parent().hasClass('JS-steirer-single-open')) {
                        $this.parents('.JS-steirer-single-open').find('.JS-steirer.JS-steirer--first-opening').removeClass('JS-steirer--first-opening');
                        $this.parents('.JS-steirer-single-open').find('.JS-steirer.JS-steirer--open').removeClass('JS-steirer--open');
                        $this.parents('.JS-steirer-single-open').find('.JS-steirer__trigger.JS-steirer__trigger--act').removeClass('JS-steirer__trigger--act');
                        $this.parents('.JS-steirer-single-open').find('.JS-steirer__slide.JS-steirer__slide--open').removeClass('JS-steirer__slide--open');
                    }

                    // open this accordion
                    $this.parents('.JS-steirer').addClass('JS-steirer--open');
                    $this.parents('.JS-steirer').find('.JS-steirer__trigger').addClass('JS-steirer__trigger--act');
                    $this.parents('.JS-steirer').find('.JS-steirer__slide').addClass('JS-steirer__slide--open');

                    // scroll to opened accordion
                    if ($element.hasClass('JS-steirer--auto-scroll')) {
                        pixelWarp($element.get(0), options.warperOptions || {});
                    }
                }
            }
        });
    }
}
