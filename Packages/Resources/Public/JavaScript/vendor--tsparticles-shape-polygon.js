(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-shape-polygon"],{

/***/ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawer.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/PolygonDrawer.js ***!
  \*********************************************************************/
/*! exports provided: PolygonDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolygonDrawer", function() { return PolygonDrawer; });
/* harmony import */ var _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolygonDrawerBase */ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js");

class PolygonDrawer extends _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__["PolygonDrawerBase"] {
    getCenter(particle, radius) {
        const sides = this.getSidesCount(particle);
        return {
            x: -radius / (sides / 3.5),
            y: -radius / (2.66 / 3.5),
        };
    }
    getSidesData(particle, radius) {
        var _a, _b;
        const polygon = particle.shapeData;
        const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
        return {
            count: {
                denominator: 1,
                numerator: sides,
            },
            length: (radius * 2.66) / (sides / 3),
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js ***!
  \*************************************************************************/
/*! exports provided: PolygonDrawerBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PolygonDrawerBase", function() { return PolygonDrawerBase; });
class PolygonDrawerBase {
    draw(context, particle, radius) {
        const start = this.getCenter(particle, radius);
        const side = this.getSidesData(particle, radius);
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
        const interiorAngle = Math.PI - (Math.PI * interiorAngleDegrees) / 180;
        if (!context) {
            return;
        }
        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);
        for (let i = 0; i < sideCount; i++) {
            context.lineTo(side.length, 0);
            context.translate(side.length, 0);
            context.rotate(interiorAngle);
        }
    }
    getSidesCount(particle) {
        var _a, _b;
        const polygon = particle.shapeData;
        return (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-polygon/esm/TriangleDrawer.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/TriangleDrawer.js ***!
  \**********************************************************************/
/*! exports provided: TriangleDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TriangleDrawer", function() { return TriangleDrawer; });
/* harmony import */ var _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolygonDrawerBase */ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawerBase.js");

class TriangleDrawer extends _PolygonDrawerBase__WEBPACK_IMPORTED_MODULE_0__["PolygonDrawerBase"] {
    getCenter(particle, radius) {
        return {
            x: -radius,
            y: radius / 1.66,
        };
    }
    getSidesCount() {
        return 3;
    }
    getSidesData(particle, radius) {
        return {
            count: {
                denominator: 2,
                numerator: 3,
            },
            length: radius * 2,
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-polygon/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-shape-polygon/esm/index.js ***!
  \*************************************************************/
/*! exports provided: loadGenericPolygonShape, loadTriangleShape, loadPolygonShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadGenericPolygonShape", function() { return loadGenericPolygonShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTriangleShape", function() { return loadTriangleShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPolygonShape", function() { return loadPolygonShape; });
/* harmony import */ var _PolygonDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PolygonDrawer */ "./node_modules/tsparticles-shape-polygon/esm/PolygonDrawer.js");
/* harmony import */ var _TriangleDrawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TriangleDrawer */ "./node_modules/tsparticles-shape-polygon/esm/TriangleDrawer.js");


async function loadGenericPolygonShape(engine) {
    await engine.addShape("polygon", new _PolygonDrawer__WEBPACK_IMPORTED_MODULE_0__["PolygonDrawer"]());
}
async function loadTriangleShape(engine) {
    await engine.addShape("triangle", new _TriangleDrawer__WEBPACK_IMPORTED_MODULE_1__["TriangleDrawer"]());
}
async function loadPolygonShape(engine) {
    await loadGenericPolygonShape(engine);
    await loadTriangleShape(engine);
}


/***/ })

}]);