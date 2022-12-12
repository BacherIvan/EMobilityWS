(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-twinkle"],{

/***/ "./node_modules/tsparticles-updater-twinkle/esm/Options/Classes/Twinkle.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-twinkle/esm/Options/Classes/Twinkle.js ***!
  \*********************************************************************************/
/*! exports provided: Twinkle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Twinkle", function() { return Twinkle; });
/* harmony import */ var _TwinkleValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TwinkleValues */ "./node_modules/tsparticles-updater-twinkle/esm/Options/Classes/TwinkleValues.js");

class Twinkle {
    constructor() {
        this.lines = new _TwinkleValues__WEBPACK_IMPORTED_MODULE_0__["TwinkleValues"]();
        this.particles = new _TwinkleValues__WEBPACK_IMPORTED_MODULE_0__["TwinkleValues"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.lines.load(data.lines);
        this.particles.load(data.particles);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-twinkle/esm/Options/Classes/TwinkleValues.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-twinkle/esm/Options/Classes/TwinkleValues.js ***!
  \***************************************************************************************/
/*! exports provided: TwinkleValues */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwinkleValues", function() { return TwinkleValues; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class TwinkleValues {
    constructor() {
        this.enable = false;
        this.frequency = 0.05;
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.opacity);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-twinkle/esm/TwinkleUpdater.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-twinkle/esm/TwinkleUpdater.js ***!
  \************************************************************************/
/*! exports provided: TwinkleUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwinkleUpdater", function() { return TwinkleUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Twinkle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Twinkle */ "./node_modules/tsparticles-updater-twinkle/esm/Options/Classes/Twinkle.js");


class TwinkleUpdater {
    getColorStyles(particle, context, radius, opacity) {
        const pOptions = particle.options, twinkleOptions = pOptions.twinkle;
        if (!twinkleOptions) {
            return {};
        }
        const twinkle = twinkleOptions.particles, twinkling = twinkle.enable && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() < twinkle.frequency, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, twinklingOpacity = twinkling ? Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(twinkle.opacity) * zOpacityFactor : opacity, twinkleRgb = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rangeColorToHsl"])(twinkle.color), twinkleStyle = twinkleRgb ? Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromHsl"])(twinkleRgb, twinklingOpacity) : undefined, res = {}, needsTwinkle = twinkling && twinkleStyle;
        res.fill = needsTwinkle ? twinkleStyle : undefined;
        res.stroke = needsTwinkle ? twinkleStyle : undefined;
        return res;
    }
    init() {
    }
    isEnabled(particle) {
        const pOptions = particle.options, twinkleOptions = pOptions.twinkle;
        if (!twinkleOptions) {
            return false;
        }
        return twinkleOptions.particles.enable;
    }
    loadOptions(options, ...sources) {
        if (!options.twinkle) {
            options.twinkle = new _Options_Classes_Twinkle__WEBPACK_IMPORTED_MODULE_1__["Twinkle"]();
        }
        for (const source of sources) {
            options.twinkle.load(source === null || source === void 0 ? void 0 : source.twinkle);
        }
    }
    update() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-twinkle/esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-updater-twinkle/esm/index.js ***!
  \***************************************************************/
/*! exports provided: loadTwinkleUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTwinkleUpdater", function() { return loadTwinkleUpdater; });
/* harmony import */ var _TwinkleUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TwinkleUpdater */ "./node_modules/tsparticles-updater-twinkle/esm/TwinkleUpdater.js");

async function loadTwinkleUpdater(engine) {
    await engine.addParticleUpdater("twinkle", () => new _TwinkleUpdater__WEBPACK_IMPORTED_MODULE_0__["TwinkleUpdater"]());
}


/***/ })

}]);