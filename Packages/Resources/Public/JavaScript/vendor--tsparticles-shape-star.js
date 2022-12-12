(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-shape-star"],{

/***/ "./node_modules/tsparticles-shape-star/esm/StarDrawer.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-shape-star/esm/StarDrawer.js ***!
  \***************************************************************/
/*! exports provided: StarDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StarDrawer", function() { return StarDrawer; });
class StarDrawer {
    draw(context, particle, radius) {
        var _a;
        const star = particle.shapeData, sides = this.getSidesCount(particle), inset = (_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2;
        context.moveTo(0, 0 - radius);
        for (let i = 0; i < sides; i++) {
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius * inset);
            context.rotate(Math.PI / sides);
            context.lineTo(0, 0 - radius);
        }
    }
    getSidesCount(particle) {
        var _a, _b;
        const star = particle.shapeData;
        return (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-star/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tsparticles-shape-star/esm/index.js ***!
  \**********************************************************/
/*! exports provided: loadStarShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStarShape", function() { return loadStarShape; });
/* harmony import */ var _StarDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StarDrawer */ "./node_modules/tsparticles-shape-star/esm/StarDrawer.js");

async function loadStarShape(engine) {
    await engine.addShape("star", new _StarDrawer__WEBPACK_IMPORTED_MODULE_0__["StarDrawer"]());
}


/***/ })

}]);