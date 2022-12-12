(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-color"],{

/***/ "./node_modules/tsparticles-updater-color/esm/ColorUpdater.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-color/esm/ColorUpdater.js ***!
  \********************************************************************/
/*! exports provided: ColorUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorUpdater", function() { return ColorUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateColorValue(delta, value, valueAnimation, max, decrease) {
    var _a, _b;
    const colorValue = value;
    if (!colorValue || !valueAnimation.enable) {
        return;
    }
    const offset = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(valueAnimation.offset), velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6, decay = (_b = value.decay) !== null && _b !== void 0 ? _b : 1;
    if (!decrease || colorValue.status === "increasing") {
        colorValue.value += velocity;
        if (decrease && colorValue.value > max) {
            colorValue.status = "decreasing";
            colorValue.value -= colorValue.value % max;
        }
    }
    else {
        colorValue.value -= velocity;
        if (colorValue.value < 0) {
            colorValue.status = "increasing";
            colorValue.value += colorValue.value;
        }
    }
    if (colorValue.velocity && decay !== 1) {
        colorValue.velocity *= decay;
    }
    if (colorValue.value > max) {
        colorValue.value %= max;
    }
}
function updateColor(particle, delta) {
    var _a, _b, _c;
    const animationOptions = particle.options.color.animation;
    if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== undefined) {
        updateColorValue(delta, particle.color.h, animationOptions.h, 360, false);
    }
    if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== undefined) {
        updateColorValue(delta, particle.color.s, animationOptions.s, 100, true);
    }
    if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== undefined) {
        updateColorValue(delta, particle.color.l, animationOptions.l, 100, true);
    }
}
class ColorUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const hslColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rangeColorToHsl"])(particle.options.color, particle.id, particle.options.reduceDuplicates);
        if (hslColor) {
            particle.color = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getHslAnimationFromHsl"])(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
        }
    }
    isEnabled(particle) {
        var _a, _b, _c;
        const animationOptions = particle.options.color.animation;
        return (!particle.destroyed &&
            !particle.spawning &&
            ((((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h.value) !== undefined && animationOptions.h.enable) ||
                (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s.value) !== undefined && animationOptions.s.enable) ||
                (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l.value) !== undefined && animationOptions.l.enable)));
    }
    update(particle, delta) {
        updateColor(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-color/esm/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-updater-color/esm/index.js ***!
  \*************************************************************/
/*! exports provided: loadColorUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadColorUpdater", function() { return loadColorUpdater; });
/* harmony import */ var _ColorUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorUpdater */ "./node_modules/tsparticles-updater-color/esm/ColorUpdater.js");

async function loadColorUpdater(engine) {
    await engine.addParticleUpdater("color", (container) => new _ColorUpdater__WEBPACK_IMPORTED_MODULE_0__["ColorUpdater"](container));
}


/***/ })

}]);