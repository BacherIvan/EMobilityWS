(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-destroy"],{

/***/ "./node_modules/tsparticles-updater-destroy/esm/DestroyUpdater.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-destroy/esm/DestroyUpdater.js ***!
  \************************************************************************/
/*! exports provided: DestroyUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DestroyUpdater", function() { return DestroyUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Destroy */ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/Destroy.js");


class DestroyUpdater {
    constructor(engine, container) {
        this.engine = engine;
        this.container = container;
    }
    init(particle) {
        const container = this.container, particlesOptions = particle.options, destroyOptions = particlesOptions.destroy;
        if (!destroyOptions) {
            return;
        }
        particle.splitCount = 0;
        const destroyBounds = destroyOptions.bounds;
        if (!particle.destroyBounds) {
            particle.destroyBounds = {};
        }
        if (destroyBounds.bottom) {
            particle.destroyBounds.bottom = (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(destroyBounds.bottom) * container.canvas.size.height) / 100;
        }
        if (destroyBounds.left) {
            particle.destroyBounds.left = (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(destroyBounds.left) * container.canvas.size.width) / 100;
        }
        if (destroyBounds.right) {
            particle.destroyBounds.right = (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(destroyBounds.right) * container.canvas.size.width) / 100;
        }
        if (destroyBounds.top) {
            particle.destroyBounds.top = (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(destroyBounds.top) * container.canvas.size.height) / 100;
        }
    }
    isEnabled(particle) {
        return !particle.destroyed;
    }
    loadOptions(options, ...sources) {
        if (!options.destroy) {
            options.destroy = new _Options_Classes_Destroy__WEBPACK_IMPORTED_MODULE_1__["Destroy"]();
        }
        for (const source of sources) {
            options.destroy.load(source === null || source === void 0 ? void 0 : source.destroy);
        }
    }
    particleDestroyed(particle, override) {
        if (override) {
            return;
        }
        const destroyOptions = particle.options.destroy;
        if (destroyOptions && destroyOptions.mode === "split") {
            this.split(particle);
        }
    }
    update(particle) {
        if (!this.isEnabled(particle)) {
            return;
        }
        const position = particle.getPosition(), bounds = particle.destroyBounds;
        if (!bounds) {
            return;
        }
        if ((bounds.bottom !== undefined && position.y >= bounds.bottom) ||
            (bounds.left !== undefined && position.x <= bounds.left) ||
            (bounds.right !== undefined && position.x >= bounds.right) ||
            (bounds.top !== undefined && position.y <= bounds.top)) {
            particle.destroy();
        }
    }
    addSplitParticle(parent, splitParticlesOptions) {
        const destroyOptions = parent.options.destroy;
        if (!destroyOptions) {
            return;
        }
        const splitOptions = destroyOptions.split, options = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["loadParticlesOptions"])(this.engine, this.container, parent.options), factor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getValue"])(splitOptions.factor);
        options.color.load({
            value: {
                hsl: parent.getFillColor(),
            },
        });
        options.move.load({
            center: {
                x: parent.position.x,
                y: parent.position.y,
                mode: "precise",
            },
        });
        if (typeof options.size.value === "number") {
            options.size.value /= factor;
        }
        else {
            options.size.value.min /= factor;
            options.size.value.max /= factor;
        }
        options.load(splitParticlesOptions);
        const offset = splitOptions.sizeOffset ? Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(-parent.size.value, parent.size.value) : 0, position = {
            x: parent.position.x + Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(offset),
            y: parent.position.y + Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(offset),
        };
        return this.container.particles.addParticle(position, options, parent.group, (particle) => {
            var _a;
            if (particle.size.value < 0.5) {
                return false;
            }
            particle.velocity.length = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(parent.velocity.length, particle.velocity.length));
            particle.splitCount = ((_a = parent.splitCount) !== null && _a !== void 0 ? _a : 0) + 1;
            particle.unbreakable = true;
            setTimeout(() => {
                particle.unbreakable = false;
            }, 500);
            return true;
        });
    }
    split(particle) {
        const destroyOptions = particle.options.destroy;
        if (!destroyOptions) {
            return;
        }
        const splitOptions = destroyOptions.split;
        if (splitOptions.count >= 0 &&
            (particle.splitCount === undefined || particle.splitCount++ > splitOptions.count)) {
            return;
        }
        const rate = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getValue"])(splitOptions.rate), particlesSplitOptions = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromSingleOrMultiple"])(splitOptions.particles);
        for (let i = 0; i < rate; i++) {
            this.addSplitParticle(particle, particlesSplitOptions);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/Destroy.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-destroy/esm/Options/Classes/Destroy.js ***!
  \*********************************************************************************/
/*! exports provided: Destroy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Destroy", function() { return Destroy; });
/* harmony import */ var _DestroyBounds__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DestroyBounds */ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/DestroyBounds.js");
/* harmony import */ var _Split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Split */ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/Split.js");


class Destroy {
    constructor() {
        this.bounds = new _DestroyBounds__WEBPACK_IMPORTED_MODULE_0__["DestroyBounds"]();
        this.mode = "none";
        this.split = new _Split__WEBPACK_IMPORTED_MODULE_1__["Split"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.mode) {
            this.mode = data.mode;
        }
        if (data.bounds) {
            this.bounds.load(data.bounds);
        }
        this.split.load(data.split);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/DestroyBounds.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-destroy/esm/Options/Classes/DestroyBounds.js ***!
  \***************************************************************************************/
/*! exports provided: DestroyBounds */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DestroyBounds", function() { return DestroyBounds; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class DestroyBounds {
    load(data) {
        if (!data) {
            return;
        }
        if (data.bottom !== undefined) {
            this.bottom = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.bottom);
        }
        if (data.left !== undefined) {
            this.left = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.left);
        }
        if (data.right !== undefined) {
            this.right = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.right);
        }
        if (data.top !== undefined) {
            this.top = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.top);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/Split.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-destroy/esm/Options/Classes/Split.js ***!
  \*******************************************************************************/
/*! exports provided: Split */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Split", function() { return Split; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _SplitFactor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SplitFactor */ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/SplitFactor.js");
/* harmony import */ var _SplitRate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SplitRate */ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/SplitRate.js");



class Split {
    constructor() {
        this.count = 1;
        this.factor = new _SplitFactor__WEBPACK_IMPORTED_MODULE_1__["SplitFactor"]();
        this.rate = new _SplitRate__WEBPACK_IMPORTED_MODULE_2__["SplitRate"]();
        this.sizeOffset = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.factor.load(data.factor);
        this.rate.load(data.rate);
        this.particles = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(data.particles, (particles) => {
            return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, particles);
        });
        if (data.sizeOffset !== undefined) {
            this.sizeOffset = data.sizeOffset;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/SplitFactor.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-destroy/esm/Options/Classes/SplitFactor.js ***!
  \*************************************************************************************/
/*! exports provided: SplitFactor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplitFactor", function() { return SplitFactor; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class SplitFactor extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"] {
    constructor() {
        super();
        this.value = 3;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-destroy/esm/Options/Classes/SplitRate.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-destroy/esm/Options/Classes/SplitRate.js ***!
  \***********************************************************************************/
/*! exports provided: SplitRate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplitRate", function() { return SplitRate; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class SplitRate extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"] {
    constructor() {
        super();
        this.value = { min: 4, max: 9 };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-destroy/esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-updater-destroy/esm/index.js ***!
  \***************************************************************/
/*! exports provided: loadDestroyUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDestroyUpdater", function() { return loadDestroyUpdater; });
/* harmony import */ var _DestroyUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DestroyUpdater */ "./node_modules/tsparticles-updater-destroy/esm/DestroyUpdater.js");

async function loadDestroyUpdater(engine) {
    await engine.addParticleUpdater("destroy", (container) => new _DestroyUpdater__WEBPACK_IMPORTED_MODULE_0__["DestroyUpdater"](engine, container));
}


/***/ })

}]);