(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entry--globals--global"],{

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./source/js/entries/globals/global.js":
/*!*********************************************!*\
  !*** ./source/js/entries/globals/global.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
/* harmony import */ var tk_source_root_js_utilities_first_user_interaction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tk-source-root/js/utilities/first-user-interaction */ "./source/js/utilities/first-user-interaction.js");
/* harmony import */ var tk_source_root_js_utilities_scroller__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tk-source-root/js/utilities/scroller */ "./source/js/utilities/scroller.js");
/*  ==========================================================================
    GENERAL
    ========================================================================== */

// node modules imports



// local imports




/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Inner Width as CSS-Variable
 * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 */
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

/**
 * ON FIRST USER ACTION
 */
Object(tk_source_root_js_utilities_first_user_interaction__WEBPACK_IMPORTED_MODULE_3__["onFirstUserAction"])().then(() => {
  /**
   * SCROLLER
   * init scroller on page scroll
   */
  const $scroller = tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["LAYOUT"].$body.find(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["CLASSNAMES"].scroller}`);
  if ($scroller.length) {
    Object(tk_source_root_js_utilities_scroller__WEBPACK_IMPORTED_MODULE_4__["initScroller"])($scroller);
  }
});

/***/ })

},[["./source/js/entries/globals/global.js","webpack--runtime","vendor--cash-dom","tk-internal-functions","vendor--lodash-es","vendor--lazysizes"]]]);