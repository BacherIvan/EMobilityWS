(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entry--sections--admin"],{

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

/***/ "./source/js/entries/sections/admin.js":
/*!*********************************************!*\
  !*** ./source/js/entries/sections/admin.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
/* harmony import */ var tk_source_root_js_utilities_in_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tk-source-root/js/utilities/in-view */ "./source/js/utilities/in-view.js");
/*  ==========================================================================
    HERO
    ========================================================================== */

// node modules imports


// local imports



/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'admin';

// initialize module
const $section = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_1__["CLASSNAMES"].sect}[data-id="${identifier}"]`);
if ($section.length) {}

/***/ })

},[["./source/js/entries/sections/admin.js","webpack--runtime","vendor--cash-dom","tk-internal-functions","vendor--lodash-es"]]]);