(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-move-parallax"],{

/***/ "./node_modules/tsparticles-move-parallax/esm/ParallaxMover.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-move-parallax/esm/ParallaxMover.js ***!
  \*********************************************************************/
/*! exports provided: ParallaxMover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParallaxMover", function() { return ParallaxMover; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class ParallaxMover {
    init() {
    }
    isEnabled(particle) {
        return (!Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isSsr"])() &&
            !particle.destroyed &&
            particle.container.actualOptions.interactivity.events.onHover.parallax.enable);
    }
    move(particle) {
        const container = particle.container, options = container.actualOptions;
        if (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isSsr"])() || !options.interactivity.events.onHover.parallax.enable) {
            return;
        }
        const parallaxForce = options.interactivity.events.onHover.parallax.force, mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const canvasCenter = {
            x: container.canvas.size.width / 2,
            y: container.canvas.size.height / 2,
        }, parallaxSmooth = options.interactivity.events.onHover.parallax.smooth, factor = particle.getRadius() / parallaxForce, centerDistance = {
            x: (mousePos.x - canvasCenter.x) * factor,
            y: (mousePos.y - canvasCenter.y) * factor,
        };
        particle.offset.x += (centerDistance.x - particle.offset.x) / parallaxSmooth;
        particle.offset.y += (centerDistance.y - particle.offset.y) / parallaxSmooth;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-move-parallax/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-move-parallax/esm/index.js ***!
  \*************************************************************/
/*! exports provided: loadParallaxMover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadParallaxMover", function() { return loadParallaxMover; });
/* harmony import */ var _ParallaxMover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParallaxMover */ "./node_modules/tsparticles-move-parallax/esm/ParallaxMover.js");

async function loadParallaxMover(engine) {
    engine.addMover("parallax", () => new _ParallaxMover__WEBPACK_IMPORTED_MODULE_0__["ParallaxMover"]());
}


/***/ })

}]);