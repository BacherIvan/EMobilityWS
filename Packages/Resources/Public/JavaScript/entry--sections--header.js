(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entry--sections--header"],{

/***/ "./source/js/entries/sections/header.js":
/*!**********************************************!*\
  !*** ./source/js/entries/sections/header.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! waypoints/lib/noframework.waypoints */ "./node_modules/waypoints/lib/noframework.waypoints.js");
/* harmony import */ var waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
/* harmony import */ var tk_source_root_js_utilities_prevent_link_on_touch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tk-source-root/js/utilities/prevent-link-on-touch */ "./source/js/utilities/prevent-link-on-touch.js");
/* harmony import */ var tk_source_root_js_utilities_pixel_warper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tk-source-root/js/utilities/pixel-warper */ "./source/js/utilities/pixel-warper.js");
/*  ==========================================================================
    HEADER
    ========================================================================== */

// node modules imports



// local imports




/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'header';

// initialize module
const $section = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["CLASSNAMES"].sect}[data-id="${identifier}"]`);
if ($section.length) {
  // prevent linking on touch
  Object(tk_source_root_js_utilities_prevent_link_on_touch__WEBPACK_IMPORTED_MODULE_3__["initPreventLinkOnTouch"])('JS-block-touch');

  // trigger mobile menu
  let menuOpenHeader = 0;
  let menuOpenHero = 0;
  let pageScrollable = 1;
  $section.on('click', '.JS-main-menu-trigger', () => {
    $section.attr('data-menu-open', menuOpenHeader = 1 - menuOpenHeader);
    tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$hero.attr('data-menu-open', menuOpenHero = 1 - menuOpenHero);
    tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
  });
  $section.on('click', '.JS-login-menu-trigger', () => {
    $section.attr('data-login-open', menuOpenHeader = 1 - menuOpenHeader);
    $section.attr('data-login-error', 0);
    tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$hero.attr('data-login-open', menuOpenHero = 1 - menuOpenHero);
    tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
  });
  var login = document.getElementById('JS-login');
  window.onclick = function (event) {
    if (event.target == login) {
      $section.attr('data-login-open', menuOpenHeader = 1 - menuOpenHeader);
      $section.attr('data-login-error', 0);
      tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$hero.attr('data-login-open', menuOpenHero = 1 - menuOpenHero);
      tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
    }
  };
  $section.on('click', '.JS-login-button', () => {
    $section.attr('data-login-error', 1);
  });

  // menu scroll animation
  $section.find('.JS-anchor').on('click', function () {
    const target = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-target'),
      $element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`#${target}`);
    $section.attr('data-menu-open', menuOpenHeader = 1 - menuOpenHeader);
    tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$hero.attr('data-menu-open', menuOpenHero = 1 - menuOpenHero);
    tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$body.attr('data-scroll', pageScrollable = 1 - pageScrollable);
    Object(tk_source_root_js_utilities_pixel_warper__WEBPACK_IMPORTED_MODULE_4__["pixelWarp"])($element[0], {
      speed: 500,
      verticalOffset: -50,
      easing: tk_source_root_js_utilities_pixel_warper__WEBPACK_IMPORTED_MODULE_4__["EasingFunctions"].easeInOutQuad
    });
  });

  // scrolling
  const wayPoint1 = new Waypoint({
    element: document.getElementById('JS-waypoint--1'),
    handler: function (direction) {
      if (direction === 'down') {
        $section.attr('data-scrolling', '1');
        tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$hero.attr('data-scrolling', '1');
        tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$hero.find('.JS-confetti-effect').addClass('hidden');
      } else {
        $section.attr('data-scrolling', '0');
        tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$hero.attr('data-scrolling', '0');
      }
    },
    offset: 0
  });
}

/***/ })

},[["./source/js/entries/sections/header.js","webpack--runtime","vendor--cash-dom","tk-internal-functions","vendor--animated-scroll-to","vendor--waypoints"]]]);