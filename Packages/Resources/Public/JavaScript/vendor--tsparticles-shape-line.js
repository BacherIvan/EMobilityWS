(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-shape-line"],{

/***/ "./node_modules/tsparticles-shape-line/esm/LineDrawer.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-shape-line/esm/LineDrawer.js ***!
  \***************************************************************/
/*! exports provided: LineDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineDrawer", function() { return LineDrawer; });
class LineDrawer {
    draw(context, particle, radius) {
        context.moveTo(-radius / 2, 0);
        context.lineTo(radius / 2, 0);
    }
    getSidesCount() {
        return 1;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-line/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tsparticles-shape-line/esm/index.js ***!
  \**********************************************************/
/*! exports provided: loadLineShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadLineShape", function() { return loadLineShape; });
/* harmony import */ var _LineDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineDrawer */ "./node_modules/tsparticles-shape-line/esm/LineDrawer.js");

async function loadLineShape(engine) {
    await engine.addShape("line", new _LineDrawer__WEBPACK_IMPORTED_MODULE_0__["LineDrawer"]());
}


/***/ })

}]);