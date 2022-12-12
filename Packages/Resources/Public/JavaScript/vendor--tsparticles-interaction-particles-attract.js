(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-particles-attract"],{

/***/ "./node_modules/tsparticles-interaction-particles-attract/esm/Attractor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-attract/esm/Attractor.js ***!
  \*********************************************************************************/
/*! exports provided: Attractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attractor", function() { return Attractor; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Attractor extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ParticlesInteractorBase"] {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
    }
    async interact(p1) {
        var _a;
        const container = this.container, distance = (_a = p1.retina.attractDistance) !== null && _a !== void 0 ? _a : container.retina.attractDistance, pos1 = p1.getPosition(), query = container.particles.quadTree.queryCircle(pos1, distance);
        for (const p2 of query) {
            if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition(), { dx, dy } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(pos1, pos2), rotate = p1.options.move.attract.rotate, ax = dx / (rotate.x * 1000), ay = dy / (rotate.y * 1000), p1Factor = p2.size.value / p1.size.value, p2Factor = 1 / p1Factor;
            p1.velocity.x -= ax * p1Factor;
            p1.velocity.y -= ay * p1Factor;
            p2.velocity.x += ax * p2Factor;
            p2.velocity.y += ay * p2Factor;
        }
    }
    isEnabled(particle) {
        return particle.options.move.attract.enable;
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-attract/esm/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-attract/esm/index.js ***!
  \*****************************************************************************/
/*! exports provided: loadParticlesAttractInteraction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadParticlesAttractInteraction", function() { return loadParticlesAttractInteraction; });
/* harmony import */ var _Attractor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attractor */ "./node_modules/tsparticles-interaction-particles-attract/esm/Attractor.js");

async function loadParticlesAttractInteraction(engine) {
    await engine.addInteractor("particlesAttract", (container) => new _Attractor__WEBPACK_IMPORTED_MODULE_0__["Attractor"](container));
}


/***/ })

}]);