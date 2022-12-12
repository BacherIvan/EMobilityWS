(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-slow"],{

/***/ "./node_modules/tsparticles-interaction-external-slow/esm/Options/Classes/Slow.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-slow/esm/Options/Classes/Slow.js ***!
  \****************************************************************************************/
/*! exports provided: Slow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slow", function() { return Slow; });
class Slow {
    constructor() {
        this.factor = 3;
        this.radius = 200;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-slow/esm/Options/Interfaces/ISlow.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-slow/esm/Options/Interfaces/ISlow.js ***!
  \********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-slow/esm/Slower.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-slow/esm/Slower.js ***!
  \**************************************************************************/
/*! exports provided: Slower */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Slower", function() { return Slower; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Slow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Slow */ "./node_modules/tsparticles-interaction-external-slow/esm/Options/Classes/Slow.js");


class Slower extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
    }
    clear(particle, delta, force) {
        if (particle.slow.inRange && !force) {
            return;
        }
        particle.slow.factor = 1;
    }
    init() {
        const container = this.container, slow = container.actualOptions.interactivity.modes.slow;
        if (!slow) {
            return;
        }
        container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
    }
    async interact() {
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity).events;
        return events.onHover.enable && !!mouse.position && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("slow", events.onHover.mode);
    }
    loadModeOptions(options, ...sources) {
        if (!options.slow) {
            options.slow = new _Options_Classes_Slow__WEBPACK_IMPORTED_MODULE_1__["Slow"]();
        }
        for (const source of sources) {
            options.slow.load(source === null || source === void 0 ? void 0 : source.slow);
        }
    }
    reset(particle) {
        particle.slow.inRange = false;
        const container = this.container, options = container.actualOptions, mousePos = container.interactivity.mouse.position, radius = container.retina.slowModeRadius, slow = options.interactivity.modes.slow;
        if (!slow || !radius || radius < 0 || !mousePos) {
            return;
        }
        const particlePos = particle.getPosition(), dist = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(mousePos, particlePos), proximityFactor = dist / radius, slowFactor = slow.factor;
        if (dist <= radius) {
            particle.slow.inRange = true;
            particle.slow.factor = proximityFactor / slowFactor;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-slow/esm/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-slow/esm/index.js ***!
  \*************************************************************************/
/*! exports provided: loadExternalSlowInteraction, Slow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalSlowInteraction", function() { return loadExternalSlowInteraction; });
/* harmony import */ var _Slower__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Slower */ "./node_modules/tsparticles-interaction-external-slow/esm/Slower.js");
/* harmony import */ var _Options_Classes_Slow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Slow */ "./node_modules/tsparticles-interaction-external-slow/esm/Options/Classes/Slow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Slow", function() { return _Options_Classes_Slow__WEBPACK_IMPORTED_MODULE_1__["Slow"]; });

/* harmony import */ var _Options_Interfaces_ISlow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Interfaces/ISlow */ "./node_modules/tsparticles-interaction-external-slow/esm/Options/Interfaces/ISlow.js");
/* empty/unused harmony star reexport */
async function loadExternalSlowInteraction(engine) {
    await engine.addInteractor("externalSlow", (container) => new _Slower__WEBPACK_IMPORTED_MODULE_0__["Slower"](container));
}




/***/ })

}]);