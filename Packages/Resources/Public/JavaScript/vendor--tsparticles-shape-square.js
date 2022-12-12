(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-shape-square"],{

/***/ "./node_modules/tsparticles-shape-square/esm/SquareDrawer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-shape-square/esm/SquareDrawer.js ***!
  \*******************************************************************/
/*! exports provided: SquareDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SquareDrawer", function() { return SquareDrawer; });
const fixFactor = Math.sqrt(2);
class SquareDrawer {
    draw(context, particle, radius) {
        context.rect(-radius / fixFactor, -radius / fixFactor, (radius * 2) / fixFactor, (radius * 2) / fixFactor);
    }
    getSidesCount() {
        return 4;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-square/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-shape-square/esm/index.js ***!
  \************************************************************/
/*! exports provided: loadSquareShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSquareShape", function() { return loadSquareShape; });
/* harmony import */ var _SquareDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SquareDrawer */ "./node_modules/tsparticles-shape-square/esm/SquareDrawer.js");

async function loadSquareShape(engine) {
    const drawer = new _SquareDrawer__WEBPACK_IMPORTED_MODULE_0__["SquareDrawer"]();
    await engine.addShape("edge", drawer);
    await engine.addShape("square", drawer);
}


/***/ })

}]);