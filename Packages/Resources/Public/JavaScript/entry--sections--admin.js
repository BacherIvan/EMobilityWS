(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entry--sections--admin"],{

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
if ($section.length) {
  console.log("HAAAAALO");
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var values = JSON.parse(xhttp.responseText);
      console.log(values);
    }
  };
  xhttp.open("GET", "/config/db/Tagebuch.php?datum='2022-11-21'");
  xhttp.send(null);
}

/***/ })

},[["./source/js/entries/sections/admin.js","webpack--runtime","vendor--cash-dom","tk-internal-functions"]]]);