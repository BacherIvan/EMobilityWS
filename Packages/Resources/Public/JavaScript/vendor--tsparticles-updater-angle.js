(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-angle"],{

/***/ "./node_modules/tsparticles-updater-angle/esm/Options/Classes/Rotate.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-angle/esm/Options/Classes/Rotate.js ***!
  \******************************************************************************/
/*! exports provided: Rotate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rotate", function() { return Rotate; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _RotateAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RotateAnimation */ "./node_modules/tsparticles-updater-angle/esm/Options/Classes/RotateAnimation.js");


class Rotate extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"] {
    constructor() {
        super();
        this.animation = new _RotateAnimation__WEBPACK_IMPORTED_MODULE_1__["RotateAnimation"]();
        this.direction = "clockwise";
        this.path = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.animation.load(data.animation);
        if (data.path !== undefined) {
            this.path = data.path;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-angle/esm/Options/Classes/RotateAnimation.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-angle/esm/Options/Classes/RotateAnimation.js ***!
  \***************************************************************************************/
/*! exports provided: RotateAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotateAnimation", function() { return RotateAnimation; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class RotateAnimation {
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

/***/ "./node_modules/tsparticles-updater-angle/esm/RotateUpdater.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-angle/esm/RotateUpdater.js ***!
  \*********************************************************************/
/*! exports provided: RotateUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotateUpdater", function() { return RotateUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Rotate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Rotate */ "./node_modules/tsparticles-updater-angle/esm/Options/Classes/Rotate.js");


function updateAngle(particle, delta) {
    var _a, _b;
    const rotate = particle.rotate, rotateOptions = particle.options.rotate;
    if (!rotate || !rotateOptions) {
        return;
    }
    const rotateAnimation = rotateOptions.animation, speed = ((_a = rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor, max = 2 * Math.PI, decay = (_b = rotate.decay) !== null && _b !== void 0 ? _b : 1;
    if (!rotateAnimation.enable) {
        return;
    }
    switch (rotate.status) {
        case "increasing":
            rotate.value += speed;
            if (rotate.value > max) {
                rotate.value -= max;
            }
            break;
        case "decreasing":
        default:
            rotate.value -= speed;
            if (rotate.value < 0) {
                rotate.value += max;
            }
            break;
    }
    if (rotate.velocity && decay !== 1) {
        rotate.velocity *= decay;
    }
}
class RotateUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const rotateOptions = particle.options.rotate;
        if (!rotateOptions) {
            return;
        }
        particle.rotate = {
            enable: rotateOptions.animation.enable,
            value: (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rotateOptions.value) * Math.PI) / 180,
        };
        particle.pathRotation = rotateOptions.path;
        let rotateDirection = rotateOptions.direction;
        if (rotateDirection === "random") {
            const index = Math.floor(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * 2);
            rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
        }
        switch (rotateDirection) {
            case "counter-clockwise":
            case "counterClockwise":
                particle.rotate.status = "decreasing";
                break;
            case "clockwise":
                particle.rotate.status = "increasing";
                break;
        }
        const rotateAnimation = rotateOptions.animation;
        if (rotateAnimation.enable) {
            particle.rotate.decay = 1 - Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rotateAnimation.decay);
            particle.rotate.velocity =
                (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rotateAnimation.speed) / 360) * this.container.retina.reduceFactor;
            if (!rotateAnimation.sync) {
                particle.rotate.velocity *= Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
            }
        }
        particle.rotation = particle.rotate.value;
    }
    isEnabled(particle) {
        const rotate = particle.options.rotate;
        if (!rotate) {
            return false;
        }
        return !particle.destroyed && !particle.spawning && rotate.animation.enable && !rotate.path;
    }
    loadOptions(options, ...sources) {
        if (!options.rotate) {
            options.rotate = new _Options_Classes_Rotate__WEBPACK_IMPORTED_MODULE_1__["Rotate"]();
        }
        for (const source of sources) {
            options.rotate.load(source === null || source === void 0 ? void 0 : source.rotate);
        }
    }
    update(particle, delta) {
        var _a, _b;
        if (!this.isEnabled(particle)) {
            return;
        }
        updateAngle(particle, delta);
        particle.rotation = (_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-angle/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-updater-angle/esm/index.js ***!
  \*************************************************************/
/*! exports provided: loadAngleUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAngleUpdater", function() { return loadAngleUpdater; });
/* harmony import */ var _RotateUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RotateUpdater */ "./node_modules/tsparticles-updater-angle/esm/RotateUpdater.js");

async function loadAngleUpdater(engine) {
    await engine.addParticleUpdater("rotate", (container) => new _RotateUpdater__WEBPACK_IMPORTED_MODULE_0__["RotateUpdater"](container));
}


/***/ })

}]);