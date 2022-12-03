/*  ==========================================================================
    SLIDER
    Helper function to create a slider.

     INFO:
    - needs "tiny-slider"
    - for help look here "https://github.com/ganlanyuan/tiny-slider" or here
      "https://ganlanyuan.github.io/tiny-slider/demo/"
    - "tiny-slider" is mobile first, so the breakpoints are inverse
    - to switch from slide to fade use "gallery" mode instead of "carousel"
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';
import { tns as tinySlider } from 'tiny-slider/src/tiny-slider';
import { debounce } from 'lodash-es';

// local imports
import * as vars from 'Packages/Build/source/js/variables/variables';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Change the pagination information like index and count variable
 * @param containerInfo
 * @param shouldBePrefixed
 * @param $paginationIndex
 * @param $paginationCount
 */
function changePaginationInfos(containerInfo, shouldBePrefixed, $paginationIndex, $paginationCount) {
    let initIndex = String(containerInfo.displayIndex),
        initCount = String(containerInfo.slideCount);
    if (shouldBePrefixed) {
        initIndex = initIndex.padStart(2, '0');
        initCount = initCount.padStart(2, '0');
    }
    $paginationIndex.html(initIndex);
    $paginationCount.html(initCount);
}

/**
 * Helper function to create a slider.
 *
 * @param $element a cash-dom element
 * @param overrides special configuration for tny-slider
 * @param itemsToShow
 *        possible: {
 *             desktop: {int, >0},
 *             tablet: {int, >0},
 *             mobile: {int, >0}
 *         }
 * @param controlsOverride
 *         possible: {
 *             arrows: {Element},
 *             nav: {Element},
 *             pagination: {Element}
 *         }
 */
export function initSlider($element, overrides, itemsToShow = {}, controlsOverride = {}) {
    // slides to show
    let slidesToShow = itemsToShow.desktop || 1;
    if (window.innerWidth <= 767) {
        // mobile
        slidesToShow = itemsToShow.mobile || 1;
    } else if (window.innerWidth <= 1024) {
        // tablet
        slidesToShow = itemsToShow.tablet || 1;
    }

    // default options
    const defaults = {
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayHoverPause: false,
        autoplayResetOnVisibility: false,
        autoplayTimeout: 6000,
        container: $element[0],
        controls: false,
        items: slidesToShow,
        loop: true,
        mouseDrag: true,
        mode: 'carousel',
        nav: false,
        onInit: (info) => {
            // match items height (custom option!)
            if (overrides.matchHeight === true) {
                const observer = new ResizeObserver(() => {
                    $(info.container).find('.tns-item').css('min-height', 'auto');
                    setTimeout(function () {
                        $(info.container).find('.tns-item').css('min-height', `${info.container.clientHeight}px`);
                    }, 100);
                });
                observer.observe(info.container);
            }
        },
        preventScrollOnTouch: 'auto',
        slideBy: 1,
        speed: 500,
    };

    // arrows
    const $arrowsContainer = controlsOverride.arrows || $element.parent().find(`.${vars.CLASSNAMES.sliderArrows}`);
    const $arrowPrev = $arrowsContainer.find(`.${vars.CLASSNAMES.sliderArrows}__arrow[data-direction="prev"]`);
    const $arrowNext = $arrowsContainer.find(`.${vars.CLASSNAMES.sliderArrows}__arrow[data-direction="next"]`);
    if ($arrowPrev.length && $arrowNext.length) {
        defaults.controls = true;
        defaults.prevButton = $arrowPrev[0];
        defaults.nextButton = $arrowNext[0];
    }

    // nav (dots)
    const $navContainer = controlsOverride.nav || $element.parent().find(`.${vars.CLASSNAMES.sliderNav}`);
    if ($navContainer.length) {
        defaults.nav = true;
        defaults.navContainer = $navContainer[0];

        // generate dots
        const slidesNumber = $element.children().length;
        for (let i = 0; i < slidesNumber; i++) {
            const navDot = document.createElement('div');
            navDot.className = `${$navContainer.attr('data-prefix')}__${$navContainer.attr('data-key')}__dot`;
            navDot.style.display = 'none';
            $navContainer.append(navDot);
        }
    }

    // pagination (config is further below)
    const $paginationContainer = controlsOverride.pagination || $element.parent().find(`.${vars.CLASSNAMES.sliderPagination}`);

    // options overrides
    const options = $.extend({}, defaults, overrides);

    // initialize slider if more "slides" then "slides to show" are given
    if ($element.children().length > slidesToShow) {
        const tnsInit = tinySlider(options);

        // nav (dots)
        if ($navContainer.length) {
            $navContainer.attr('data-active', 1);
        }

        // arrows
        if ($arrowPrev.length && $arrowNext.length) {
            $arrowsContainer.attr('data-active', 1);
            $arrowPrev.attr('data-active', 1);
            $arrowNext.attr('data-active', 1);
        }

        // pagination
        if ($paginationContainer.length) {
            $paginationContainer.attr('data-active', 1);
            const containerInitInfo = tnsInit.getInfo();
            const $paginationIndex = $paginationContainer.find(`.${vars.CLASSNAMES.sliderPagination}__index`);
            const $paginationCount = $paginationContainer.find(`.${vars.CLASSNAMES.sliderPagination}__count`);
            const shouldBePrefixed = ($paginationContainer.attr('data-prefix') === '1');

            changePaginationInfos(
                containerInitInfo,
                shouldBePrefixed,
                $paginationIndex,
                $paginationCount,
            );
            tnsInit.events.on('indexChanged', (containerChangeInfo) => {
                changePaginationInfos(
                    containerChangeInfo,
                    shouldBePrefixed,
                    $paginationIndex,
                    $paginationCount,
                );
            });
        }

        // remove pagination (because displayed information are no longer correct after resize)
        let windowWidth = $(window).width();
        $(window).on('resize', debounce(() => {
            if (windowWidth !== $(window).width()) {
                if ($paginationContainer.length) {
                    $paginationContainer.remove();
                }
                windowWidth = $(window).width();
            }
        }, 250));

        return tnsInit;
    }

    return null;
}
