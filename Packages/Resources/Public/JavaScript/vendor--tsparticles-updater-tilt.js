(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-tilt"],{

/***/ "./node_modules/tsparticles-updater-tilt/esm/Options/Classes/Tilt.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-tilt/esm/Options/Classes/Tilt.js ***!
  \***************************************************************************/
/*! exports provided: Tilt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tilt", function() { return Tilt; });
/* harmony import */ var _TiltAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TiltAnimation */ "./node_modules/tsparticles-updater-tilt/esm/Options/Classes/TiltAnimation.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


class Tilt extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["ValueWithRandom"] {
    constructor() {
        super();
        this.animation = new _TiltAnimation__WEBPACK_IMPORTED_MODULE_0__["TiltAnimation"]();
        this.direction = "clockwise";
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        this.animation.load(data.animation);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-tilt/esm/Options/Classes/TiltAnimation.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-tilt/esm/Options/Classes/TiltAnimation.js ***!
  \************************************************************************************/
/*! exports provided: TiltAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TiltAnimation", function() { return TiltAnimation; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class TiltAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.decay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-tilt/esm/TiltUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-tilt/esm/TiltUpdater.js ***!
  \******************************************************************/
/*! exports provided: TiltUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TiltUpdater", function() { return TiltUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Tilt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Tilt */ "./node_modules/tsparticles-updater-tilt/esm/Options/Classes/Tilt.js");


function updateTilt(particle, delta) {
    var _a, _b;
    if (!particle.tilt || !particle.options.tilt) {
        return;
    }
    const tilt = particle.options.tilt, tiltAnimation = tilt.animation, speed = ((_a = particle.tilt.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor, max = 2 * Math.PI, decay = (_b = particle.tilt.decay) !== null && _b !== void 0 ? _b : 1;
    if (!tiltAnimation.enable) {
        return;
    }
    switch (particle.tilt.status) {
        case "increasing":
            particle.tilt.value += speed;
            if (particle.tilt.value > max) {
                particle.tilt.value -= max;
            }
            break;
        case "decreasing":
        default:
            particle.tilt.value -= speed;
            if (particle.tilt.value < 0) {
                particle.tilt.value += max;
            }
            break;
    }
    if (particle.tilt.velocity && decay !== 1) {
        particle.tilt.velocity *= decay;
    }
}
class TiltUpdater {
    constructor(container) {
        this.container = container;
    }
    getTransformValues(particle) {
        var _a;
        const tilt = ((_a = particle.tilt) === null || _a === void 0 ? void 0 : _a.enable) && particle.tilt;
        return {
            b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
            c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined,
        };
    }
    init(particle) {
        var _a;
        const tiltOptions = particle.options.tilt;
        if (!tiltOptions) {
            return;
        }
        particle.tilt = {
            enable: tiltOptions.enable,
            value: (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(tiltOptions.value) * Math.PI) / 180,
            sinDirection: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() >= 0.5 ? 1 : -1,
            cosDirection: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() >= 0.5 ? 1 : -1,
        };
        let tiltDirection = tiltOptions.direction;
        if (tiltDirection === "random") {
            const index = Math.floor(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * 2);
            tiltDirection = index > 0 ? "counter-clockwise" : "clockwise";
        }
        switch (tiltDirection) {
            case "counter-clockwise":
            case "counterClockwise":
                particle.tilt.status = "decreasing";
                break;
            case "clockwise":
                particle.tilt.status = "increasing";
                break;
        }
        const tiltAnimation = (_a = particle.options.tilt) === null || _a === void 0 ? void 0 : _a.animation;
        if (tiltAnimation === null || tiltAnimation === void 0 ? void 0 : tiltAnimation.enable) {
            particle.tilt.decay = 1 - Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(tiltAnimation.decay);
            particle.tilt.velocity = (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(tiltAnimation.speed) / 360) * this.container.retina.reduceFactor;
            if (!tiltAnimation.sync) {
                particle.tilt.velocity *= Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
            }
        }
    }
    isEnabled(particle) {
        var _a;
        const tiltAnimation = (_a = particle.options.tilt) === null || _a === void 0 ? void 0 : _a.animation;
        return !particle.destroyed && !particle.spawning && !!(tiltAnimation === null || tiltAnimation === void 0 ? void 0 : tiltAnimation.enable);
    }
    loadOptions(options, ...sources) {
        if (!options.tilt) {
            options.tilt = new _Options_Classes_Tilt__WEBPACK_IMPORTED_MODULE_1__["Tilt"]();
        }
        for (const source of sources) {
            options.tilt.load(source === null || source === void 0 ? void 0 : source.tilt);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateTilt(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-tilt/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-tilt/esm/index.js ***!
  \************************************************************/
/*! exports provided: loadTiltUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTiltUpdater", function() { return loadTiltUpdater; });
/* harmony import */ var _TiltUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TiltUpdater */ "./node_modules/tsparticles-updater-tilt/esm/TiltUpdater.js");

async function loadTiltUpdater(engine) {
    await engine.addParticleUpdater("tilt", (container) => new _TiltUpdater__WEBPACK_IMPORTED_MODULE_0__["TiltUpdater"](container));
}


/***/ })

}]);