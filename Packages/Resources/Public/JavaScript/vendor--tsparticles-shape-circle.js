(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-shape-circle"],{

/***/ "./node_modules/tsparticles-shape-circle/esm/CircleDrawer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-shape-circle/esm/CircleDrawer.js ***!
  \*******************************************************************/
/*! exports provided: CircleDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleDrawer", function() { return CircleDrawer; });
class CircleDrawer {
    draw(context, particle, radius) {
        context.arc(0, 0, radius, 0, Math.PI * 2, false);
    }
    getSidesCount() {
        return 12;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-circle/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-shape-circle/esm/index.js ***!
  \************************************************************/
/*! exports provided: loadCircleShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadCircleShape", function() { return loadCircleShape; });
/* harmony import */ var _CircleDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CircleDrawer */ "./node_modules/tsparticles-shape-circle/esm/CircleDrawer.js");

async function loadCircleShape(engine) {
    await engine.addShape("circle", new _CircleDrawer__WEBPACK_IMPORTED_MODULE_0__["CircleDrawer"]());
}


/***/ })

}]);