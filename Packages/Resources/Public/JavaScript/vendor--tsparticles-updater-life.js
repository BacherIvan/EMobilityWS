(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-life"],{

/***/ "./node_modules/tsparticles-updater-life/esm/LifeUpdater.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-updater-life/esm/LifeUpdater.js ***!
  \******************************************************************/
/*! exports provided: LifeUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LifeUpdater", function() { return LifeUpdater; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Life__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Life */ "./node_modules/tsparticles-updater-life/esm/Options/Classes/Life.js");


class LifeUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const container = this.container, particlesOptions = particle.options, lifeOptions = particlesOptions.life;
        if (!lifeOptions) {
            return;
        }
        particle.life = {
            delay: container.retina.reduceFactor
                ? ((Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])())) /
                    container.retina.reduceFactor) *
                    1000
                : 0,
            delayTime: 0,
            duration: container.retina.reduceFactor
                ? ((Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])())) /
                    container.retina.reduceFactor) *
                    1000
                : 0,
            time: 0,
            count: lifeOptions.count,
        };
        if (particle.life.duration <= 0) {
            particle.life.duration = -1;
        }
        if (particle.life.count <= 0) {
            particle.life.count = -1;
        }
        if (particle.life) {
            particle.spawning = particle.life.delay > 0;
        }
    }
    isEnabled(particle) {
        return !particle.destroyed;
    }
    loadOptions(options, ...sources) {
        if (!options.life) {
            options.life = new _Options_Classes_Life__WEBPACK_IMPORTED_MODULE_1__["Life"]();
        }
        for (const source of sources) {
            options.life.load(source === null || source === void 0 ? void 0 : source.life);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle) || !particle.life) {
            return;
        }
        const life = particle.life;
        let justSpawned = false;
        if (particle.spawning) {
            life.delayTime += delta.value;
            if (life.delayTime >= particle.life.delay) {
                justSpawned = true;
                particle.spawning = false;
                life.delayTime = 0;
                life.time = 0;
            }
            else {
                return;
            }
        }
        if (life.duration === -1) {
            return;
        }
        if (particle.spawning) {
            return;
        }
        if (justSpawned) {
            life.time = 0;
        }
        else {
            life.time += delta.value;
        }
        if (life.time < life.duration) {
            return;
        }
        life.time = 0;
        if (particle.life.count > 0) {
            particle.life.count--;
        }
        if (particle.life.count === 0) {
            particle.destroy();
            return;
        }
        const canvasSize = this.container.canvas.size, widthRange = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(0, canvasSize.width), heightRange = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(0, canvasSize.width);
        particle.position.x = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(widthRange);
        particle.position.y = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(heightRange);
        particle.spawning = true;
        life.delayTime = 0;
        life.time = 0;
        particle.reset();
        const lifeOptions = particle.options.life;
        if (lifeOptions) {
            life.delay = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(lifeOptions.delay.value) * 1000;
            life.duration = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(lifeOptions.duration.value) * 1000;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-life/esm/Options/Classes/Life.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-life/esm/Options/Classes/Life.js ***!
  \***************************************************************************/
/*! exports provided: Life */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Life", function() { return Life; });
/* harmony import */ var _LifeDelay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LifeDelay */ "./node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDelay.js");
/* harmony import */ var _LifeDuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LifeDuration */ "./node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDuration.js");


class Life {
    constructor() {
        this.count = 0;
        this.delay = new _LifeDelay__WEBPACK_IMPORTED_MODULE_0__["LifeDelay"]();
        this.duration = new _LifeDuration__WEBPACK_IMPORTED_MODULE_1__["LifeDuration"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        this.delay.load(data.delay);
        this.duration.load(data.duration);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDelay.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDelay.js ***!
  \********************************************************************************/
/*! exports provided: LifeDelay */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LifeDelay", function() { return LifeDelay; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class LifeDelay extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"] {
    constructor() {
        super();
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDuration.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-life/esm/Options/Classes/LifeDuration.js ***!
  \***********************************************************************************/
/*! exports provided: LifeDuration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LifeDuration", function() { return LifeDuration; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class LifeDuration extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"] {
    constructor() {
        super();
        this.random.minimumValue = 0.0001;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-life/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-updater-life/esm/index.js ***!
  \************************************************************/
/*! exports provided: loadLifeUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadLifeUpdater", function() { return loadLifeUpdater; });
/* harmony import */ var _LifeUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LifeUpdater */ "./node_modules/tsparticles-updater-life/esm/LifeUpdater.js");

async function loadLifeUpdater(engine) {
    await engine.addParticleUpdater("life", (container) => new _LifeUpdater__WEBPACK_IMPORTED_MODULE_0__["LifeUpdater"](container));
}


/***/ })

}]);