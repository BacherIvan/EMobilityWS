(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-wobble"],{

/***/ "./node_modules/tsparticles-updater-wobble/esm/Options/Classes/Wobble.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-wobble/esm/Options/Classes/Wobble.js ***!
  \*******************************************************************************/
/*! exports provided: Wobble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wobble", function() { return Wobble; });
/* harmony import */ var _WobbleSpeed__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WobbleSpeed */ "./node_modules/tsparticles-updater-wobble/esm/Options/Classes/WobbleSpeed.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


class Wobble {
    constructor() {
        this.distance = 5;
        this.enable = false;
        this.speed = new _WobbleSpeed__WEBPACK_IMPORTED_MODULE_0__["WobbleSpeed"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["setRangeValue"])(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            if (typeof data.speed === "number") {
                this.speed.load({ angle: data.speed });
            }
            else {
                const rangeSpeed = data.speed;
                if (rangeSpeed.min !== undefined) {
                    this.speed.load({ angle: rangeSpeed });
                }
                else {
                    this.speed.load(data.speed);
                }
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-wobble/esm/Options/Classes/WobbleSpeed.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-wobble/esm/Options/Classes/WobbleSpeed.js ***!
  \************************************************************************************/
/*! exports provided: WobbleSpeed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WobbleSpeed", function() { return WobbleSpeed; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class WobbleSpeed {
    constructor() {
        this.angle = 50;
        this.move = 10;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.angle !== undefined) {
            this.angle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.angle);
        }
        if (data.move !== undefined) {
            this.move = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.move);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-wobble/esm/WobbleUpdater.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-wobble/esm/WobbleUpdater.js ***!
  \**********************************************************************/
/*! exports provided: WobbleUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WobbleUpdater", function() { return WobbleUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Wobble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Wobble */ "./node_modules/tsparticles-updater-wobble/esm/Options/Classes/Wobble.js");


function updateWobble(particle, delta) {
    var _a;
    const wobble = particle.options.wobble;
    if (!(wobble === null || wobble === void 0 ? void 0 : wobble.enable) || !particle.wobble) {
        return;
    }
    const angleSpeed = particle.wobble.angleSpeed * delta.factor, moveSpeed = particle.wobble.moveSpeed * delta.factor, distance = (moveSpeed * (((_a = particle.retina.wobbleDistance) !== null && _a !== void 0 ? _a : 0) * delta.factor)) / (1000 / 60), max = 2 * Math.PI;
    particle.wobble.angle += angleSpeed;
    if (particle.wobble.angle > max) {
        particle.wobble.angle -= max;
    }
    particle.position.x += distance * Math.cos(particle.wobble.angle);
    particle.position.y += distance * Math.abs(Math.sin(particle.wobble.angle));
}
class WobbleUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        var _a;
        const wobbleOpt = particle.options.wobble;
        if (wobbleOpt === null || wobbleOpt === void 0 ? void 0 : wobbleOpt.enable) {
            particle.wobble = {
                angle: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * Math.PI * 2,
                angleSpeed: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(wobbleOpt.speed.angle) / 360,
                moveSpeed: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(wobbleOpt.speed.move) / 10,
            };
        }
        else {
            particle.wobble = {
                angle: 0,
                angleSpeed: 0,
                moveSpeed: 0,
            };
        }
        particle.retina.wobbleDistance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])((_a = wobbleOpt === null || wobbleOpt === void 0 ? void 0 : wobbleOpt.distance) !== null && _a !== void 0 ? _a : 0) * this.container.retina.pixelRatio;
    }
    isEnabled(particle) {
        var _a;
        return !particle.destroyed && !particle.spawning && !!((_a = particle.options.wobble) === null || _a === void 0 ? void 0 : _a.enable);
    }
    loadOptions(options, ...sources) {
        if (!options.wobble) {
            options.wobble = new _Options_Classes_Wobble__WEBPACK_IMPORTED_MODULE_1__["Wobble"]();
        }
        for (const source of sources) {
            options.wobble.load(source === null || source === void 0 ? void 0 : source.wobble);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateWobble(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-wobble/esm/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/tsparticles-updater-wobble/esm/index.js ***!
  \**************************************************************/
/*! exports provided: loadWobbleUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadWobbleUpdater", function() { return loadWobbleUpdater; });
/* harmony import */ var _WobbleUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WobbleUpdater */ "./node_modules/tsparticles-updater-wobble/esm/WobbleUpdater.js");

async function loadWobbleUpdater(engine) {
    await engine.addParticleUpdater("wobble", (container) => new _WobbleUpdater__WEBPACK_IMPORTED_MODULE_0__["WobbleUpdater"](container));
}


/***/ })

}]);