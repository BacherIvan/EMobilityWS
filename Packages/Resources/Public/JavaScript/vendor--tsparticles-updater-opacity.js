(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-opacity"],{

/***/ "./node_modules/tsparticles-updater-opacity/esm/OpacityUpdater.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-opacity/esm/OpacityUpdater.js ***!
  \************************************************************************/
/*! exports provided: OpacityUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpacityUpdater", function() { return OpacityUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function checkDestroy(particle, value, minValue, maxValue) {
    switch (particle.options.opacity.animation.destroy) {
        case "max":
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case "min":
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}
function updateOpacity(particle, delta) {
    var _a, _b, _c, _d, _e, _f;
    if (!particle.opacity) {
        return;
    }
    const minValue = particle.opacity.min, maxValue = particle.opacity.max, decay = (_a = particle.opacity.decay) !== null && _a !== void 0 ? _a : 1;
    if (particle.destroyed ||
        !particle.opacity.enable ||
        (((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) > ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0))) {
        return;
    }
    switch (particle.opacity.status) {
        case "increasing":
            if (particle.opacity.value >= maxValue) {
                particle.opacity.status = "decreasing";
                if (!particle.opacity.loops) {
                    particle.opacity.loops = 0;
                }
                particle.opacity.loops++;
            }
            else {
                particle.opacity.value += ((_e = particle.opacity.velocity) !== null && _e !== void 0 ? _e : 0) * delta.factor;
            }
            break;
        case "decreasing":
            if (particle.opacity.value <= minValue) {
                particle.opacity.status = "increasing";
                if (!particle.opacity.loops) {
                    particle.opacity.loops = 0;
                }
                particle.opacity.loops++;
            }
            else {
                particle.opacity.value -= ((_f = particle.opacity.velocity) !== null && _f !== void 0 ? _f : 0) * delta.factor;
            }
            break;
    }
    if (particle.opacity.velocity && particle.opacity.decay !== 1) {
        particle.opacity.velocity *= decay;
    }
    checkDestroy(particle, particle.opacity.value, minValue, maxValue);
    if (!particle.destroyed) {
        particle.opacity.value = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(particle.opacity.value, minValue, maxValue);
    }
}
class OpacityUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const opacityOptions = particle.options.opacity;
        particle.opacity = {
            enable: opacityOptions.animation.enable,
            max: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(opacityOptions.value),
            min: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMin"])(opacityOptions.value),
            value: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(opacityOptions.value),
            loops: 0,
            maxLoops: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(opacityOptions.animation.count),
        };
        const opacityAnimation = opacityOptions.animation;
        if (opacityAnimation.enable) {
            particle.opacity.decay = 1 - Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(opacityAnimation.decay);
            particle.opacity.status = "increasing";
            const opacityRange = opacityOptions.value;
            particle.opacity.min = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMin"])(opacityRange);
            particle.opacity.max = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(opacityRange);
            switch (opacityAnimation.startValue) {
                case "min":
                    particle.opacity.value = particle.opacity.min;
                    particle.opacity.status = "increasing";
                    break;
                case "random":
                    particle.opacity.value = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(particle.opacity);
                    particle.opacity.status =
                        Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() >= 0.5 ? "increasing" : "decreasing";
                    break;
                case "max":
                default:
                    particle.opacity.value = particle.opacity.max;
                    particle.opacity.status = "decreasing";
                    break;
            }
            particle.opacity.velocity =
                (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(opacityAnimation.speed) / 100) * this.container.retina.reduceFactor;
            if (!opacityAnimation.sync) {
                particle.opacity.velocity *= Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
            }
        }
    }
    isEnabled(particle) {
        var _a, _b, _c, _d;
        return (!particle.destroyed &&
            !particle.spawning &&
            !!particle.opacity &&
            particle.opacity.enable &&
            (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 ||
                (((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 &&
                    ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0))));
    }
    reset(particle) {
        if (particle.opacity) {
            particle.opacity.loops = 0;
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateOpacity(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-opacity/esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-updater-opacity/esm/index.js ***!
  \***************************************************************/
/*! exports provided: loadOpacityUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOpacityUpdater", function() { return loadOpacityUpdater; });
/* harmony import */ var _OpacityUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OpacityUpdater */ "./node_modules/tsparticles-updater-opacity/esm/OpacityUpdater.js");

async function loadOpacityUpdater(engine) {
    await engine.addParticleUpdater("opacity", (container) => new _OpacityUpdater__WEBPACK_IMPORTED_MODULE_0__["OpacityUpdater"](container));
}


/***/ })

}]);