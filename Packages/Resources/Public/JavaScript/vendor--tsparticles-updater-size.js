(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-size"],{

/***/ "./node_modules/tsparticles-updater-size/esm/SizeUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-size/esm/SizeUpdater.js ***!
  \******************************************************************/
/*! exports provided: SizeUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SizeUpdater", function() { return SizeUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function checkDestroy(particle, value, minValue, maxValue) {
    switch (particle.options.size.animation.destroy) {
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
function updateSize(particle, delta) {
    var _a, _b, _c, _d, _e;
    const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor, minValue = particle.size.min, maxValue = particle.size.max, decay = (_b = particle.size.decay) !== null && _b !== void 0 ? _b : 1;
    if (particle.destroyed ||
        !particle.size.enable ||
        (((_c = particle.size.maxLoops) !== null && _c !== void 0 ? _c : 0) > 0 && ((_d = particle.size.loops) !== null && _d !== void 0 ? _d : 0) > ((_e = particle.size.maxLoops) !== null && _e !== void 0 ? _e : 0))) {
        return;
    }
    switch (particle.size.status) {
        case "increasing":
            if (particle.size.value >= maxValue) {
                particle.size.status = "decreasing";
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value += sizeVelocity;
            }
            break;
        case "decreasing":
            if (particle.size.value <= minValue) {
                particle.size.status = "increasing";
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value -= sizeVelocity;
            }
    }
    if (particle.size.velocity && decay !== 1) {
        particle.size.velocity *= decay;
    }
    checkDestroy(particle, particle.size.value, minValue, maxValue);
    if (!particle.destroyed) {
        particle.size.value = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(particle.size.value, minValue, maxValue);
    }
}
class SizeUpdater {
    init(particle) {
        var _a;
        const container = particle.container, sizeOptions = particle.options.size, sizeAnimation = sizeOptions.animation;
        if (sizeAnimation.enable) {
            particle.size.velocity =
                (((_a = particle.retina.sizeAnimationSpeed) !== null && _a !== void 0 ? _a : container.retina.sizeAnimationSpeed) / 100) *
                    container.retina.reduceFactor;
            if (!sizeAnimation.sync) {
                particle.size.velocity *= Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
            }
        }
    }
    isEnabled(particle) {
        var _a, _b, _c, _d;
        return (!particle.destroyed &&
            !particle.spawning &&
            particle.size.enable &&
            (((_a = particle.size.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 ||
                (((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0))));
    }
    reset(particle) {
        particle.size.loops = 0;
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateSize(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-size/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-size/esm/index.js ***!
  \************************************************************/
/*! exports provided: loadSizeUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadSizeUpdater", function() { return loadSizeUpdater; });
/* harmony import */ var _SizeUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SizeUpdater */ "./node_modules/tsparticles-updater-size/esm/SizeUpdater.js");

async function loadSizeUpdater(engine) {
    await engine.addParticleUpdater("size", () => new _SizeUpdater__WEBPACK_IMPORTED_MODULE_0__["SizeUpdater"]());
}


/***/ })

}]);