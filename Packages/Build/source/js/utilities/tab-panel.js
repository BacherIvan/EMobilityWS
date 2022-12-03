/*  ==========================================================================
    TAB PANEL
    Helper to make a single content area with multiple panels.

    INFO:
    - you can add also your own tab panels if existing ones don't work for
      your requirements!
    - add class "JS-tab-panel--first-open" to container if you want first tab
      opened on load
    - add class "JS-tab-panel--auto-scroll" to activate auto scroll to content
      (needs "pixelWarp" utility!)
    - each tab panel must have following css classes and should be
      structured (roughly) like this:

    <div class="JS-tab-panel">
        <div class="JS-tab-panel__tabs">
            <button class="JS-tab-panel__tab" data-panel="1">
                Tab 1
            </button>
            <button class="JS-tab-panel__tab" data-panel="2">
                Tab 2
            </button>
        </div>
        <div class="JS-tab-panel__panels">
            <div class="JS-tab-panel__panel" data-panel="1">
                Panel 1
            </div>
            <div class="JS-tab-panel__panel" data-panel="2">
                Panel 2
            </div>
        </div>
    </div>
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'Packages/Build/source/js/variables/variables';
import { pixelWarp } from 'Packages/Build/source/js/utilities/pixel-warper';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Helper to make a single content area with multiple panels.
 * @param $element - a cash-dom element
 * @param options
 */
export function initTabPanel($element, options = {}) {
    if ($element.hasClass('JS-tab-panel')) {
        // set first panel active
        if ($element.hasClass('JS-tab-panel--first-open')) {
            $element.find('.JS-tab-panel__tabs .JS-tab-panel__tab').first().addClass('JS-tab-panel__tab--act');
            $element.find('.JS-tab-panel__panels .JS-tab-panel__panel').first().addClass('JS-tab-panel__panel--act');
        }

        // open panel on click
        $element
            .find('.JS-tab-panel__tabs')
            .on('click', '.JS-tab-panel__tab', function () {
                const $clickedPanelTab = $(this);
                const targetId = $(this).attr('data-panel');
                const $parentPanel = $clickedPanelTab.parents('.JS-tab-panel');
                if (!$clickedPanelTab.hasClass('JS-tab-panel__tab--act')) {
                    $parentPanel
                        .find('.JS-tab-panel__tab.JS-tab-panel__tab--act')
                        .removeClass('JS-tab-panel__tab--act');
                    $parentPanel
                        .find('.JS-tab-panel__panel.JS-tab-panel__panel--act')
                        .removeClass('JS-tab-panel__panel--act');
                    $clickedPanelTab.addClass('JS-tab-panel__tab--act');
                    $parentPanel
                        .find(`.JS-tab-panel__panel[data-panel="${targetId}"]`)
                        .addClass('JS-tab-panel__panel--act');

                    // scroll to top of panel
                    if ($element.hasClass('JS-tab-panel--auto-scroll')) {
                        pixelWarp($element.get(0), options.warperOptions || {});
                    }
                } else if (!$element.hasClass('JS-tab-panel--first-open')) {
                    // close opened panel on second click
                    // (only if first panel is not set active on load!)
                    $parentPanel
                        .find('.JS-tab-panel__tab.JS-tab-panel__tab--act')
                        .removeClass('JS-tab-panel__tab--act');
                    $parentPanel
                        .find('.JS-tab-panel__panel.JS-tab-panel__panel--act')
                        .removeClass('JS-tab-panel__panel--act');
                    $clickedPanelTab.removeClass('JS-tab-panel__tab--act');
                }
            });
    }
}
