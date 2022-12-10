(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tk-internal-functions"],{

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