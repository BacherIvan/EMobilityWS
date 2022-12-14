(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tk-internal-functions"],{

/***/ "./source/js/utilities/_general.js":
/*!*****************************************!*\
  !*** ./source/js/utilities/_general.js ***!
  \*****************************************/
/*! exports provided: clickToggleClass, rteMore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clickToggleClass", function() { return clickToggleClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rteMore", function() { return rteMore; });
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/*  ==========================================================================
    GENERAL
    In this file are functions which can't be assigned to specifc groups or
    topics like the other files.
    ========================================================================== */

// node modules imports


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
function clickToggleClass(trigger, target, className) {
  cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(trigger).on('click', () => {
    if (!cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(target).hasClass(className)) {
      cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(target).addClass(className);
    } else {
      cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(target).removeClass(className);
    }
  });
}

/**
 * RTE MORE
 * Shows entire text on mobile devices if text was collapsed
 * * @param $module
 */
function rteMore($module) {
  $module.on('click', '.JS-rte-more', e => {
    $module.find('.JS-rte-text').removeClass('JS-crop-text');
    $module.find('.JS-rte-more').remove();
  });
}

/**
 * START COUNTER
 * Shows entire text on mobile devices if text was collapsed
 * * @param $module
 */

/***/ }),

/***/ "./source/js/utilities/first-user-interaction.js":
/*!*******************************************************!*\
  !*** ./source/js/utilities/first-user-interaction.js ***!
  \*******************************************************/
/*! exports provided: onFirstUserAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onFirstUserAction", function() { return onFirstUserAction; });
/*  ==========================================================================
    FIRST-USER-INTERACTION
    Helper for doing things on first user input
    ========================================================================== */

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * A flag, which indicates if the listeners were already registered or not
 * @type {boolean}
 */
let areListenerRegistered = false;

/**
 * A flag, which indicates if the event was already triggered or not
 * @type {boolean}
 */
let wasAlreadyTriggered = false;

/**
 * Event name for 'FIRST-USER-INTERACTION'
 * @type {string}
 */
const firstUserInteractionEvent = 'first-user-interaction';

/**
 * Registers and fires an event on first user input (like click, keydown, mousemove, etc)
 */
function registerEventListeners() {
  const eventDispatchFunc = event => {
    if (!wasAlreadyTriggered) {
      window.dispatchEvent(new Event(firstUserInteractionEvent));
      console.log(`FIRST-USER-INTERACTION: event '${firstUserInteractionEvent}' was »triggered« on user event '${event.type}'`);
      wasAlreadyTriggered = true;
    } else {
      console.log(`FIRST-USER-INTERACTION: »ignored« event '${event.type}'`);
    }
  };
  window.addEventListener('click', eventDispatchFunc, {
    once: true
  });
  window.addEventListener('keydown', eventDispatchFunc, {
    once: true
  });
  window.addEventListener('mousemove', eventDispatchFunc, {
    once: true
  });
  window.addEventListener('scroll', eventDispatchFunc, {
    once: true,
    passive: false
  });
  window.addEventListener('touchstart', eventDispatchFunc, {
    once: true,
    passive: false
  });
  areListenerRegistered = true;
}

/**
 * Resolves a promise when the user has made some kind of interaction
 * @return Promise
 */
function onFirstUserAction() {
  return new Promise(resolve => {
    if (wasAlreadyTriggered) {
      resolve();
    } else {
      window.addEventListener(firstUserInteractionEvent, () => resolve(), {
        once: true
      });
      if (!areListenerRegistered) {
        registerEventListeners();
      }
    }
  });
}

/***/ }),

/***/ "./source/js/utilities/in-view.js":
/*!****************************************!*\
  !*** ./source/js/utilities/in-view.js ***!
  \****************************************/
/*! exports provided: inView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inView", function() { return inView; });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/lodash.js");
/*  ==========================================================================
    IN-VIEW
     a simple replacement for
        `$(...).on('inview', ...)`
            to
        `inView($(...).get(), (entry, direction) => { ... }, { options })`

    IntersectionObserver API Reference:
     (https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
    ========================================================================== */

// node modules imports


/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Helper function for callback handling
 * @param {Object} data
 */
function handleCallback(data) {
  data.callback(data.entry, data.direction);
  if (data.config.once === true) {
    data.observer.unobserve(data.entry.target);
  }
}

/**
 * Call this function with at least one element, and a callback function
 *
 * DEFAULT OPTIONS :
 *  - 'root'       : `null` -> top-level document's viewport.
 *  - 'rootMargin' : `100% 0 100% 0` -> should be a complete viewport height before and after the
 *                                      observed element comes in view ('vh' doesn't work, only '%')
 *  - 'threshold'  : `[0]`  -> you can add multiple trigger points, values from `0.0` till `1.0`.
 *  - 'once'       : `true` -> decide if the callback should be only triggered once or repeatedly.
 *
 * @param {Array, NodeList, Node} elements - either an array, a NodeList or a Node of DOM Elements.
 *                                           If you use `cash-dom`, don't forget to convert the
 *                                           object.
 * @param callback - a callback function when it's intersecting, you have the params `entry` and
 *                   `direction` available.
 * @param {Object} [options] - options from the Intersection API, plus a custom one 'once' for
 *                             single pass.
 */
function inView(elements, callback) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const defaults = {
    rootMargin: '100% 0% 100% 0%',
    once: true
  };
  const config = Object(lodash_es__WEBPACK_IMPORTED_MODULE_0__["merge"])(defaults, options);
  let previousYPosition = 0;
  let isLeaving = false;
  const observerInstance = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      const currentYPosition = entry.boundingClientRect.y;
      if (previousYPosition === 0) {
        if (entry.isIntersecting) {
          handleCallback({
            observer,
            entry,
            config,
            callback,
            direction: 'initial'
          });
        }
      } else if (currentYPosition < previousYPosition) {
        if (entry.isIntersecting) {
          isLeaving = true;
          handleCallback({
            observer,
            entry,
            config,
            callback,
            direction: 'down-enter'
          });
        } else if (isLeaving) {
          isLeaving = false;
          handleCallback({
            observer,
            entry,
            config,
            callback,
            direction: 'down-leave'
          });
        }
      } else if (currentYPosition > previousYPosition) {
        if (entry.isIntersecting) {
          isLeaving = true;
          handleCallback({
            observer,
            entry,
            config,
            callback,
            direction: 'up-enter'
          });
        } else if (isLeaving) {
          isLeaving = false;
          handleCallback({
            observer,
            entry,
            config,
            callback,
            direction: 'up-leave'
          });
        }
      }
      previousYPosition = currentYPosition;
    });
  }, config);
  if (elements instanceof NodeList || Array.isArray(elements)) {
    elements.forEach(elem => {
      observerInstance.observe(elem);
    });
    return;
  }
  if (elements instanceof Node) {
    observerInstance.observe(elements);
    return;
  }
  throw new Error("'in-view' Error: unknown type of given elements... convert it to either an Array, NodeList or Node");
}

/***/ }),

/***/ "./source/js/utilities/lightbox.js":
/*!*****************************************!*\
  !*** ./source/js/utilities/lightbox.js ***!
  \*****************************************/
/*! exports provided: initLightBoxGallery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initLightBoxGallery", function() { return initLightBoxGallery; });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/lodash.js");
/* harmony import */ var lightgallery_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lightgallery.js */ "./node_modules/lightgallery.js/lib/js/lightgallery.js");
/* harmony import */ var lightgallery_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lightgallery_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lg_thumbnail_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lg-thumbnail.js */ "./node_modules/lg-thumbnail.js/dist/lg-thumbnail.js");
/* harmony import */ var lg_thumbnail_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lg_thumbnail_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lg_video_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lg-video.js */ "./node_modules/lg-video.js/dist/lg-video.js");
/* harmony import */ var lg_video_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lg_video_js__WEBPACK_IMPORTED_MODULE_3__);
/*  ==========================================================================
    LIGHTBOX
    It uses the 'lightgallery.js' plugin
    ========================================================================== */

// node modules imports





/* CODE
 * --------------------------------------------------------------------------- */

function initLightBoxGallery(element, overrides) {
  // default options
  const defaults = {
    selector: '.JS-lbox__item',
    counter: false,
    thumbnail: false,
    exThumbImage: 'data-exthumbimage',
    download: false,
    videojs: true,
    videojsOptions: {
      controls: 1
    },
    iframeMaxWidth: '100%',
    thumbWidth: 70,
    thumbContHeight: 90
  };

  // options overrides
  const options = Object(lodash_es__WEBPACK_IMPORTED_MODULE_0__["merge"])(Object(lodash_es__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(defaults), overrides);

  // initialize
  // eslint-disable-next-line no-undef
  lightGallery(element, options);
}

/***/ }),

/***/ "./source/js/utilities/pixel-warper.js":
/*!*********************************************!*\
  !*** ./source/js/utilities/pixel-warper.js ***!
  \*********************************************/
/*! exports provided: pixelWarp, EasingFunctions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pixelWarp", function() { return pixelWarp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EasingFunctions", function() { return EasingFunctions; });
/* harmony import */ var animated_scroll_to__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! animated-scroll-to */ "./node_modules/animated-scroll-to/lib/animated-scroll-to.js");
/* harmony import */ var animated_scroll_to__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(animated_scroll_to__WEBPACK_IMPORTED_MODULE_0__);
/*  ==========================================================================
    PIXEL WARPER
    Helper to scroll (warp) to a certain element or position with a smooth animation

    ___________________          _-_
    \==============_=_/ ____.---'---`---.____
                \_ \    \----._________.----/
                  \ \   /  /    `-_-'
              __,--`.`-'..'-_
             /____          ||
                  `--.____,-'

    INFO:
        - Call this util within the window 'onload' event to prevent 'unwanted behaviour'
          (or, if you have a custom event, you can use that too)
        - If you want to change the easing (animation), you will find some options in this
          local file: `bn-source-root/js/utilities/pixel-warper`
        - It's just a wrapper for `https://www.npmjs.com/package/animated-scroll-to`

    REQUIREMENTS:
        `npm i animated-scroll-to`

    OPTIONS:
        same as: https://www.npmjs.com/package/animated-scroll-to
    ```
        const defaultOptions = {
          // Indicated if scroll animation should be canceled on user action (scroll/keypress/touch)
          // if set to "false" user input will be disabled until scroll animation is complete
          cancelOnUserAction: true,

          // Animation easing function, with "easeOutCubic" as default
          easing: t => (--t) * t * t + 1,

          // DOM element that should be scrolled
          // Example: document.querySelector('#element-to-scroll'),
          elementToScroll: window,

          // Horizontal scroll offset
          // Practical when you are scrolling to a DOM element and want to add some padding
          horizontalOffset: 0,

          // Maximum duration of the scroll animation
          maxDuration: 3000,

          // Minimum duration of the scroll animation
          minDuration: 250,

          // Duration of the scroll per 1000px
          speed: 500,

          // Vertical scroll offset
          // Practical when you are scrolling to a DOM element and want to add some padding
          verticalOffset: 0,
        };
    ```

    EXAMPLE:
    ```
        import { EasingFunctions } from 'bn-source-root/js/utilities/pixel-warper'
        pixelWarp($('#DNA-main')[0], {
            speed: 5000,
            verticalOffset: -100,
            easing: EasingFunctions.easeInOutQuad,
        });
    ```
    ========================================================================== */

// node module imports


/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Helper to scroll (warp) to a certain element or position with a smooth animation
 *
 * @param {(Element|int|Array)} to - the destination to warp (=scroll), either a vanilla DOM
 *                                   Element, an integer as desired vertical position or an array
 *                                   with exactly 2 values, the horizontal and vertical position,
 *                                   both as integer.
 * @param {Object} [options] -       the configuration object from `animateScrollTo` library
 */
function pixelWarp(to, options) {
  animated_scroll_to__WEBPACK_IMPORTED_MODULE_0___default()(to, options);
}

/*
    EASING FUNCTIONS
      from https://gist.github.com/gre/1650294

    USE:
    1) import it in your file
        `import { EasingFunctions } from 'bn-source-root/js/utilities/pixel-warper';`
    2) give it to the `pixel-warp` function as `function value` (call without parentheses)
        `pixelWarp({ easing: EasingFunctions.linear });`
*/

const EasingFunctions = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t * t,
  // decelerating to zero velocity
  easeOutQuad: t => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // accelerating from zero velocity
  easeInCubic: t => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: t => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: t => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: t => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // accelerating from zero velocity
  easeInQuint: t => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: t => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
};

/***/ }),

/***/ "./source/js/utilities/prevent-link-on-touch.js":
/*!******************************************************!*\
  !*** ./source/js/utilities/prevent-link-on-touch.js ***!
  \******************************************************/
/*! exports provided: initPreventLinkOnTouch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPreventLinkOnTouch", function() { return initPreventLinkOnTouch; });
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
/*  ==========================================================================
    PREVENT LINK ON HOVER
    Add functionality for the first main navigation level, so that
    the navigation is more user-friendly on touch-devices
    ========================================================================== */

// node modules imports


// local imports


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
function initPreventLinkOnTouch(linkClass) {
  const $links = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`.${linkClass}`);
  if ($links.length) {
    tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_1__["LAYOUT"].$html.on('touchstart', e => {
      const $target = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(e.target);
      if (!$target.hasClass(linkClass)) {
        $links.removeClass(`${linkClass}--act`);
      }
      if ($target.hasClass(linkClass) && !$target.hasClass(`${linkClass}--act`)) {
        $links.removeClass(`${linkClass}--act`);
      }
      $links.on('click', event => {
        const $this = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(event.currentTarget);
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

/***/ }),

/***/ "./source/js/utilities/scroller.js":
/*!*****************************************!*\
  !*** ./source/js/utilities/scroller.js ***!
  \*****************************************/
/*! exports provided: initScroller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initScroller", function() { return initScroller; });
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/lodash.js");
/*  ==========================================================================
    SCROLLER
    ========================================================================== */

// node modules imports


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
  const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  const trackLength = docHeight - winHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  // calculate current scroll percentage and round it to 2 decimal places
  const percentScrolled = Math.round(scrollTop / trackLength * 100 * 100) / 100;
  $element.css('width', `${percentScrolled}%`);
}

/**
 * Init the scroll indicator
 * @param $element
 */
function initScroller($element) {
  if ($element.length) {
    const throttledFunction = Object(lodash_es__WEBPACK_IMPORTED_MODULE_0__["throttle"])(calculateScrollProgress, 25);
    window.addEventListener('resize', () => throttledFunction($element));
    window.addEventListener('scroll', () => throttledFunction($element));
  }
}

/***/ }),

/***/ "./source/js/utilities/slider.js":
/*!***************************************!*\
  !*** ./source/js/utilities/slider.js ***!
  \***************************************/
/*! exports provided: initSlider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initSlider", function() { return initSlider; });
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tiny_slider_src_tiny_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-slider/src/tiny-slider */ "./node_modules/tiny-slider/src/tiny-slider.js");
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash-es */ "./node_modules/lodash-es/lodash.js");
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
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




// local imports


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
function initSlider($element, overrides) {
  let itemsToShow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let controlsOverride = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
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
    onInit: info => {
      // match items height (custom option!)
      if (overrides.matchHeight === true) {
        const observer = new ResizeObserver(() => {
          cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(info.container).find('.tns-item').css('min-height', 'auto');
          setTimeout(function () {
            cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(info.container).find('.tns-item').css('min-height', `${info.container.clientHeight}px`);
          }, 100);
        });
        observer.observe(info.container);
      }
    },
    preventScrollOnTouch: 'auto',
    slideBy: 1,
    speed: 500
  };

  // arrows
  const $arrowsContainer = controlsOverride.arrows || $element.parent().find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sliderArrows}`);
  const $arrowPrev = $arrowsContainer.find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sliderArrows}__arrow[data-direction="prev"]`);
  const $arrowNext = $arrowsContainer.find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sliderArrows}__arrow[data-direction="next"]`);
  if ($arrowPrev.length && $arrowNext.length) {
    defaults.controls = true;
    defaults.prevButton = $arrowPrev[0];
    defaults.nextButton = $arrowNext[0];
  }

  // nav (dots)
  const $navContainer = controlsOverride.nav || $element.parent().find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sliderNav}`);
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
  const $paginationContainer = controlsOverride.pagination || $element.parent().find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sliderPagination}`);

  // options overrides
  const options = cash_dom__WEBPACK_IMPORTED_MODULE_0___default.a.extend({}, defaults, overrides);

  // initialize slider if more "slides" then "slides to show" are given
  if ($element.children().length > slidesToShow) {
    const tnsInit = Object(tiny_slider_src_tiny_slider__WEBPACK_IMPORTED_MODULE_1__["tns"])(options);

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
      const $paginationIndex = $paginationContainer.find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sliderPagination}__index`);
      const $paginationCount = $paginationContainer.find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sliderPagination}__count`);
      const shouldBePrefixed = $paginationContainer.attr('data-prefix') === '1';
      changePaginationInfos(containerInitInfo, shouldBePrefixed, $paginationIndex, $paginationCount);
      tnsInit.events.on('indexChanged', containerChangeInfo => {
        changePaginationInfos(containerChangeInfo, shouldBePrefixed, $paginationIndex, $paginationCount);
      });
    }

    // remove pagination (because displayed information are no longer correct after resize)
    let windowWidth = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).on('resize', Object(lodash_es__WEBPACK_IMPORTED_MODULE_2__["debounce"])(() => {
      if (windowWidth !== cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).width()) {
        if ($paginationContainer.length) {
          $paginationContainer.remove();
        }
        windowWidth = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(window).width();
      }
    }, 250));
    return tnsInit;
  }
  return null;
}

/***/ }),

/***/ "./source/js/variables/variables.js":
/*!******************************************!*\
  !*** ./source/js/variables/variables.js ***!
  \******************************************/
/*! exports provided: LAYOUT, CLASSNAMES, URL_PARAMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LAYOUT", function() { return LAYOUT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSNAMES", function() { return CLASSNAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_PARAMS", function() { return URL_PARAMS; });
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/*  ==========================================================================
    VARIABLES
    Global variables for the whole project

    INFO:
    - the "TS" object is coming from the ts2js converter
    - translations MUST NOT be defined here, generally don't make translations
     in javascript!
    - contributions for the kickstarter are welcome!
    ========================================================================== */

// node modules imports


/* LAYOUT
 * --------------------------------------------------------------------------- */

const LAYOUT = {
  $html: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('html'),
  $head: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('head'),
  $body: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('body'),
  $page: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#EmoBILity'),
  $header: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#EBIL-section--header'),
  $hero: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#EBIL-section--hero'),
  $main: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#EBIL-section--main'),
  $footer: cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#EBIL-section--footer')
};

/* CLASS NAMES
 * --------------------------------------------------------------------------- */

const CLASSNAMES = {
  loader: 'JS-loader',
  scroller: 'JS-scroller',
  noResult: 'JS-no-result',
  sliderArrows: 'JS-slider-arrows',
  sliderNav: 'JS-slider-nav',
  sliderPagination: 'JS-slider-pagination',
  sect: 'EBIL-section',
  mod: 'EBIL-module'
};

/* URL PARAMS
 *  Parses current url segments and save them into a constant
 *  For 'use' instructions see here: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 * --------------------------------------------------------------------------- */

const URL_PARAMS = new URLSearchParams(window.location.search);

/***/ })

}]);