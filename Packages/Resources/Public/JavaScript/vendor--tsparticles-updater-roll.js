(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-roll"],{

/***/ "./node_modules/tsparticles-updater-roll/esm/Options/Classes/Roll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-roll/esm/Options/Classes/Roll.js ***!
  \***************************************************************************/
/*! exports provided: Roll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Roll", function() { return Roll; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _RollLight__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RollLight */ "./node_modules/tsparticles-updater-roll/esm/Options/Classes/RollLight.js");


class Roll {
    constructor() {
        this.darken = new _RollLight__WEBPACK_IMPORTED_MODULE_1__["RollLight"]();
        this.enable = false;
        this.enlighten = new _RollLight__WEBPACK_IMPORTED_MODULE_1__["RollLight"]();
        this.mode = "vertical";
        this.speed = 25;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.backColor !== undefined) {
            this.backColor = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.backColor, data.backColor);
        }
        this.darken.load(data.darken);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.enlighten.load(data.enlighten);
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.speed !== undefined) {
            this.speed = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.speed);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-roll/esm/Options/Classes/RollLight.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-roll/esm/Options/Classes/RollLight.js ***!
  \********************************************************************************/
/*! exports provided: RollLight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RollLight", function() { return RollLight; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class RollLight {
    constructor() {
        this.enable = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.value !== undefined) {
            this.value = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.value);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-roll/esm/RollUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-roll/esm/RollUpdater.js ***!
  \******************************************************************/
/*! exports provided: RollUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RollUpdater", function() { return RollUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Roll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Roll */ "./node_modules/tsparticles-updater-roll/esm/Options/Classes/Roll.js");


function updateRoll(particle, delta) {
    const roll = particle.options.roll;
    if (!particle.roll || !(roll === null || roll === void 0 ? void 0 : roll.enable)) {
        return;
    }
    const speed = particle.roll.speed * delta.factor, max = 2 * Math.PI;
    particle.roll.angle += speed;
    if (particle.roll.angle > max) {
        particle.roll.angle -= max;
    }
}
class RollUpdater {
    getTransformValues(particle) {
        var _a;
        const roll = ((_a = particle.roll) === null || _a === void 0 ? void 0 : _a.enable) && particle.roll, rollHorizontal = roll && roll.horizontal, rollVertical = roll && roll.vertical;
        return {
            a: rollHorizontal ? Math.cos(roll.angle) : undefined,
            d: rollVertical ? Math.sin(roll.angle) : undefined,
        };
    }
    init(particle) {
        const rollOpt = particle.options.roll;
        if (rollOpt === null || rollOpt === void 0 ? void 0 : rollOpt.enable) {
            particle.roll = {
                enable: rollOpt.enable,
                horizontal: rollOpt.mode === "horizontal" || rollOpt.mode === "both",
                vertical: rollOpt.mode === "vertical" || rollOpt.mode === "both",
                angle: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * Math.PI * 2,
                speed: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rollOpt.speed) / 360,
            };
            if (rollOpt.backColor) {
                particle.backColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rangeColorToHsl"])(rollOpt.backColor);
            }
            else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
                const alterType = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() >= 0.5 ? "darken" : "enlighten";
                particle.roll.alter = {
                    type: alterType,
                    value: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(alterType === "darken" ? rollOpt.darken.value : rollOpt.enlighten.value),
                };
            }
            else if (rollOpt.darken.enable) {
                particle.roll.alter = {
                    type: "darken",
                    value: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rollOpt.darken.value),
                };
            }
            else if (rollOpt.enlighten.enable) {
                particle.roll.alter = {
                    type: "enlighten",
                    value: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rollOpt.enlighten.value),
                };
            }
        }
        else {
            particle.roll = {
                enable: false,
                horizontal: false,
                vertical: false,
                angle: 0,
                speed: 0,
            };
        }
    }
    isEnabled(particle) {
        const roll = particle.options.roll;
        return !particle.destroyed && !particle.spawning && !!(roll === null || roll === void 0 ? void 0 : roll.enable);
    }
    loadOptions(options, ...sources) {
        if (!options.roll) {
            options.roll = new _Options_Classes_Roll__WEBPACK_IMPORTED_MODULE_1__["Roll"]();
        }
        for (const source of sources) {
            options.roll.load(source === null || source === void 0 ? void 0 : source.roll);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateRoll(particle, delta);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-roll/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-roll/esm/index.js ***!
  \************************************************************/
/*! exports provided: loadRollUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadRollUpdater", function() { return loadRollUpdater; });
/* harmony import */ var _RollUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RollUpdater */ "./node_modules/tsparticles-updater-roll/esm/RollUpdater.js");

async function loadRollUpdater(engine) {
    await engine.addParticleUpdater("roll", () => new _RollUpdater__WEBPACK_IMPORTED_MODULE_0__["RollUpdater"]());
}


/***/ })

}]);