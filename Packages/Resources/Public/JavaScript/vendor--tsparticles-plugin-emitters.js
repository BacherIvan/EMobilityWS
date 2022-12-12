(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-plugin-emitters"],{

/***/ "./node_modules/tsparticles-plugin-emitters/esm/EmitterContainer.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/EmitterContainer.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/EmitterInstance.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/EmitterInstance.js ***!
  \*************************************************************************/
/*! exports provided: EmitterInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitterInstance", function() { return EmitterInstance; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Emitter */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js");
/* harmony import */ var _Options_Classes_EmitterSize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/EmitterSize */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js");



class EmitterInstance {
    constructor(engine, emitters, container, options, position) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _h;
        this.emitters = emitters;
        this.container = container;
        this._engine = engine;
        this._currentDuration = 0;
        this._currentEmitDelay = 0;
        this._currentSpawnDelay = 0;
        this._initialPosition = position;
        if (options instanceof _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__["Emitter"]) {
            this.options = options;
        }
        else {
            this.options = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__["Emitter"]();
            this.options.load(options);
        }
        this._spawnDelay = (((_a = this.options.life.delay) !== null && _a !== void 0 ? _a : 0) * 1000) / this.container.retina.reduceFactor;
        this.position = (_b = this._initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
        this.name = this.options.name;
        this._shape = (_c = this._engine.emitterShapeManager) === null || _c === void 0 ? void 0 : _c.getShape(this.options.shape);
        this.fill = this.options.fill;
        this._firstSpawn = !this.options.life.wait;
        this._startParticlesAdded = false;
        let particlesOptions = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, this.options.particles);
        particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : (particlesOptions = {});
        (_d = particlesOptions.move) !== null && _d !== void 0 ? _d : (particlesOptions.move = {});
        (_e = (_h = particlesOptions.move).direction) !== null && _e !== void 0 ? _e : (_h.direction = this.options.direction);
        if (this.options.spawnColor) {
            this.spawnColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rangeColorToHsl"])(this.options.spawnColor);
        }
        this._paused = !this.options.autoPlay;
        this._particlesOptions = particlesOptions;
        this.size =
            (_f = this.options.size) !== null && _f !== void 0 ? _f : (() => {
                const size = new _Options_Classes_EmitterSize__WEBPACK_IMPORTED_MODULE_2__["EmitterSize"]();
                size.load({
                    height: 0,
                    mode: "percent",
                    width: 0,
                });
                return size;
            })();
        this._lifeCount = (_g = this.options.life.count) !== null && _g !== void 0 ? _g : -1;
        this._immortal = this._lifeCount <= 0;
        this._engine.dispatchEvent("emitterCreated", {
            container,
            data: {
                emitter: this,
            },
        });
        this.play();
    }
    externalPause() {
        this._paused = true;
        this.pause();
    }
    externalPlay() {
        this._paused = false;
        this.play();
    }
    getPosition() {
        if (this.options.domId) {
            const container = this.container, element = document.getElementById(this.options.domId);
            if (element) {
                const elRect = element.getBoundingClientRect();
                return {
                    x: (elRect.x + elRect.width / 2) * container.retina.pixelRatio,
                    y: (elRect.y + elRect.height / 2) * container.retina.pixelRatio,
                };
            }
        }
        return this.position;
    }
    getSize() {
        const container = this.container;
        if (this.options.domId) {
            const element = document.getElementById(this.options.domId);
            if (element) {
                const elRect = element.getBoundingClientRect();
                return {
                    width: elRect.width * container.retina.pixelRatio,
                    height: elRect.height * container.retina.pixelRatio,
                };
            }
        }
        return {
            width: this.size.mode === "percent"
                ? (container.canvas.size.width * this.size.width) / 100
                : this.size.width,
            height: this.size.mode === "percent"
                ? (container.canvas.size.height * this.size.height) / 100
                : this.size.height,
        };
    }
    pause() {
        if (this._paused) {
            return;
        }
        delete this._emitDelay;
    }
    play() {
        var _a;
        if (this._paused) {
            return;
        }
        if (!(this.container.retina.reduceFactor &&
            (this._lifeCount > 0 || this._immortal || !this.options.life.count) &&
            (this._firstSpawn || this._currentSpawnDelay >= ((_a = this._spawnDelay) !== null && _a !== void 0 ? _a : 0)))) {
            return;
        }
        if (this._emitDelay === undefined) {
            const delay = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(this.options.rate.delay);
            this._emitDelay = (1000 * delay) / this.container.retina.reduceFactor;
        }
        if (this._lifeCount > 0 || this._immortal) {
            this.prepareToDie();
        }
    }
    resize() {
        const initialPosition = this._initialPosition;
        this.position =
            initialPosition && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isPointInside"])(initialPosition, this.container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin)
                ? initialPosition
                : this.calcPosition();
    }
    update(delta) {
        var _a, _b, _c;
        if (this._paused) {
            return;
        }
        if (this._firstSpawn) {
            this._firstSpawn = false;
            this._currentSpawnDelay = (_a = this._spawnDelay) !== null && _a !== void 0 ? _a : 0;
            this._currentEmitDelay = (_b = this._emitDelay) !== null && _b !== void 0 ? _b : 0;
        }
        if (!this._startParticlesAdded) {
            this._startParticlesAdded = true;
            this.emitParticles(this.options.startCount);
        }
        if (this._duration !== undefined) {
            this._currentDuration += delta.value;
            if (this._currentDuration >= this._duration) {
                this.pause();
                if (this._spawnDelay !== undefined) {
                    delete this._spawnDelay;
                }
                if (!this._immortal) {
                    this._lifeCount--;
                }
                if (this._lifeCount > 0 || this._immortal) {
                    this.position = this.calcPosition();
                    this._spawnDelay = (((_c = this.options.life.delay) !== null && _c !== void 0 ? _c : 0) * 1000) / this.container.retina.reduceFactor;
                }
                else {
                    this.destroy();
                }
                this._currentDuration -= this._duration;
                delete this._duration;
            }
        }
        if (this._spawnDelay !== undefined) {
            this._currentSpawnDelay += delta.value;
            if (this._currentSpawnDelay >= this._spawnDelay) {
                this._engine.dispatchEvent("emitterPlay", {
                    container: this.container,
                });
                this.play();
                this._currentSpawnDelay -= this._currentSpawnDelay;
                delete this._spawnDelay;
            }
        }
        if (this._emitDelay !== undefined) {
            this._currentEmitDelay += delta.value;
            if (this._currentEmitDelay >= this._emitDelay) {
                this.emit();
                this._currentEmitDelay -= this._emitDelay;
            }
        }
    }
    calcPosition() {
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["calcPositionOrRandomFromSizeRanged"])({
            size: this.container.canvas.size,
            position: this.options.position,
        });
    }
    destroy() {
        this.emitters.removeEmitter(this);
        this._engine.dispatchEvent("emitterDestroyed", {
            container: this.container,
            data: {
                emitter: this,
            },
        });
    }
    emit() {
        if (this._paused) {
            return;
        }
        const quantity = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(this.options.rate.quantity);
        this.emitParticles(quantity);
    }
    emitParticles(quantity) {
        var _a, _b, _c;
        const position = this.getPosition(), size = this.getSize(), singleParticlesOptions = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromSingleOrMultiple"])(this._particlesOptions);
        for (let i = 0; i < quantity; i++) {
            const particlesOptions = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, singleParticlesOptions);
            if (this.spawnColor) {
                const hslAnimation = (_a = this.options.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;
                if (hslAnimation) {
                    this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
                    this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
                    this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
                }
                if (!particlesOptions.color) {
                    particlesOptions.color = {
                        value: this.spawnColor,
                    };
                }
                else {
                    particlesOptions.color.value = this.spawnColor;
                }
            }
            if (!position) {
                return;
            }
            const pPosition = (_c = (_b = this._shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, size, this.fill)) !== null && _c !== void 0 ? _c : position;
            this.container.particles.addParticle(pPosition, particlesOptions);
        }
    }
    prepareToDie() {
        var _a;
        if (this._paused) {
            return;
        }
        const duration = (_a = this.options.life) === null || _a === void 0 ? void 0 : _a.duration;
        if (this.container.retina.reduceFactor &&
            (this._lifeCount > 0 || this._immortal) &&
            duration !== undefined &&
            duration > 0) {
            this._duration = duration * 1000;
        }
    }
    setColorAnimation(animation, initValue, maxValue) {
        var _a;
        const container = this.container;
        if (!animation.enable) {
            return initValue;
        }
        const colorOffset = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(animation.offset), delay = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(this.options.rate.delay), emitFactor = (1000 * delay) / container.retina.reduceFactor, colorSpeed = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])((_a = animation.speed) !== null && _a !== void 0 ? _a : 0);
        return (initValue + (colorSpeed * container.fpsLimit) / emitFactor + colorOffset * 3.6) % maxValue;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Emitters.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Emitters.js ***!
  \******************************************************************/
/*! exports provided: Emitters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitters", function() { return Emitters; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Emitter */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js");
/* harmony import */ var _EmitterInstance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmitterInstance */ "./node_modules/tsparticles-plugin-emitters/esm/EmitterInstance.js");



class Emitters {
    constructor(engine, container) {
        this.container = container;
        this._engine = engine;
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = {
            random: {
                count: 1,
                enable: false,
            },
            value: [],
        };
        container.getEmitter = (idxOrName) => idxOrName === undefined || typeof idxOrName === "number"
            ? this.array[idxOrName || 0]
            : this.array.find((t) => t.name === idxOrName);
        container.addEmitter = (options, position) => this.addEmitter(options, position);
        container.removeEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                this.removeEmitter(emitter);
            }
        };
        container.playEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                emitter.externalPlay();
            }
        };
        container.pauseEmitter = (idxOrName) => {
            const emitter = container.getEmitter(idxOrName);
            if (emitter) {
                emitter.externalPause();
            }
        };
    }
    addEmitter(options, position) {
        const emitterOptions = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_1__["Emitter"]();
        emitterOptions.load(options);
        const emitter = new _EmitterInstance__WEBPACK_IMPORTED_MODULE_2__["EmitterInstance"](this._engine, this, this.container, emitterOptions, position);
        this.array.push(emitter);
        return emitter;
    }
    handleClickMode(mode) {
        const emitterOptions = this.emitters, modeEmitters = this.interactivityEmitters;
        if (mode === "emitter") {
            let emittersModeOptions;
            if (modeEmitters && modeEmitters.value instanceof Array) {
                if (modeEmitters.value.length > 0 && modeEmitters.random.enable) {
                    emittersModeOptions = [];
                    const usedIndexes = [];
                    for (let i = 0; i < modeEmitters.random.count; i++) {
                        const idx = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["arrayRandomIndex"])(modeEmitters.value);
                        if (usedIndexes.includes(idx) && usedIndexes.length < modeEmitters.value.length) {
                            i--;
                            continue;
                        }
                        usedIndexes.push(idx);
                        emittersModeOptions.push(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromArray"])(modeEmitters.value, idx));
                    }
                }
                else {
                    emittersModeOptions = modeEmitters.value;
                }
            }
            else {
                emittersModeOptions = modeEmitters === null || modeEmitters === void 0 ? void 0 : modeEmitters.value;
            }
            const emittersOptions = emittersModeOptions !== null && emittersModeOptions !== void 0 ? emittersModeOptions : emitterOptions, ePosition = this.container.interactivity.mouse.clickPosition;
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(emittersOptions, (emitter) => {
                this.addEmitter(emitter, ePosition);
            });
        }
    }
    async init() {
        this.emitters = this.container.actualOptions.emitters;
        this.interactivityEmitters = this.container.actualOptions.interactivity.modes.emitters;
        if (this.emitters instanceof Array) {
            for (const emitterOptions of this.emitters) {
                this.addEmitter(emitterOptions);
            }
        }
        else {
            this.addEmitter(this.emitters);
        }
    }
    pause() {
        for (const emitter of this.array) {
            emitter.pause();
        }
    }
    play() {
        for (const emitter of this.array) {
            emitter.play();
        }
    }
    removeEmitter(emitter) {
        const index = this.array.indexOf(emitter);
        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
    resize() {
        for (const emitter of this.array) {
            emitter.resize();
        }
    }
    stop() {
        this.array = [];
    }
    update(delta) {
        for (const emitter of this.array) {
            emitter.update(delta);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/EmittersEngine.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/EmittersEngine.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterClickMode.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterClickMode.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterShapeType.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterShapeType.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js ***!
  \*********************************************************************************/
/*! exports provided: Emitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return Emitter; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _EmitterLife__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EmitterLife */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterLife.js");
/* harmony import */ var _EmitterRate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmitterRate */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterRate.js");
/* harmony import */ var _EmitterSize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EmitterSize */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js");




class Emitter {
    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new _EmitterLife__WEBPACK_IMPORTED_MODULE_1__["EmitterLife"]();
        this.rate = new _EmitterRate__WEBPACK_IMPORTED_MODULE_2__["EmitterRate"]();
        this.shape = "square";
        this.startCount = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.size !== undefined) {
            if (this.size === undefined) {
                this.size = new _EmitterSize__WEBPACK_IMPORTED_MODULE_3__["EmitterSize"]();
            }
            this.size.load(data.size);
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.domId = data.domId;
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        this.life.load(data.life);
        this.name = data.name;
        this.particles = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(data.particles, (particles) => {
            return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, particles);
        });
        this.rate.load(data.rate);
        if (data.shape !== undefined) {
            this.shape = data.shape;
        }
        if (data.position !== undefined) {
            this.position = {};
            if (data.position.x !== undefined) {
                this.position.x = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.position.x);
            }
            if (data.position.y !== undefined) {
                this.position.y = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.position.y);
            }
        }
        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["AnimatableColor"]();
            }
            this.spawnColor.load(data.spawnColor);
        }
        if (data.startCount !== undefined) {
            this.startCount = data.startCount;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterLife.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterLife.js ***!
  \*************************************************************************************/
/*! exports provided: EmitterLife */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitterLife", function() { return EmitterLife; });
class EmitterLife {
    constructor() {
        this.wait = false;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.count !== undefined) {
            this.count = data.count;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.wait !== undefined) {
            this.wait = data.wait;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterRate.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterRate.js ***!
  \*************************************************************************************/
/*! exports provided: EmitterRate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitterRate", function() { return EmitterRate; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class EmitterRate {
    constructor() {
        this.quantity = 1;
        this.delay = 0.1;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.quantity !== undefined) {
            this.quantity = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.quantity);
        }
        if (data.delay !== undefined) {
            this.delay = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.delay);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/EmitterSize.js ***!
  \*************************************************************************************/
/*! exports provided: EmitterSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmitterSize", function() { return EmitterSize; });
class EmitterSize {
    constructor() {
        this.mode = "percent";
        this.height = 0;
        this.width = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.height !== undefined) {
            this.height = data.height;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/ShapeManager.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/ShapeManager.js ***!
  \**********************************************************************/
/*! exports provided: ShapeManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShapeManager", function() { return ShapeManager; });
const shapes = new Map();
class ShapeManager {
    constructor(engine) {
        this._engine = engine;
    }
    addShape(name, drawer) {
        if (!this.getShape(name)) {
            shapes.set(name, drawer);
        }
    }
    getShape(name) {
        return shapes.get(name);
    }
    getSupportedShapes() {
        return shapes.keys();
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Circle/CircleShape.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Shapes/Circle/CircleShape.js ***!
  \***********************************************************************************/
/*! exports provided: CircleShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleShape", function() { return CircleShape; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class CircleShape {
    randomPosition(position, size, fill) {
        const generateTheta = (x, y) => {
            const u = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() / 4.0, theta = Math.atan((y / x) * Math.tan(2 * Math.PI * u)), v = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
            if (v < 0.25) {
                return theta;
            }
            else if (v < 0.5) {
                return Math.PI - theta;
            }
            else if (v < 0.75) {
                return Math.PI + theta;
            }
            else {
                return -theta;
            }
        }, radius = (x, y, theta) => (x * y) / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2), [a, b] = [size.width / 2, size.height / 2], randomTheta = generateTheta(a, b), maxRadius = radius(a, b, randomTheta), randomRadius = fill ? maxRadius * Math.sqrt(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])()) : maxRadius;
        return {
            x: position.x + randomRadius * Math.cos(randomTheta),
            y: position.y + randomRadius * Math.sin(randomTheta),
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Square/SquareShape.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/Shapes/Square/SquareShape.js ***!
  \***********************************************************************************/
/*! exports provided: SquareShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SquareShape", function() { return SquareShape; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function randomSquareCoordinate(position, offset) {
    return position + offset * (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() - 0.5);
}
class SquareShape {
    randomPosition(position, size, fill) {
        if (fill) {
            return {
                x: randomSquareCoordinate(position.x, size.width),
                y: randomSquareCoordinate(position.y, size.height),
            };
        }
        else {
            const halfW = size.width / 2, halfH = size.height / 2, side = Math.floor(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * 4), v = (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() - 0.5) * 2;
            switch (side) {
                case 0:
                    return {
                        x: position.x + v * halfW,
                        y: position.y - halfH,
                    };
                case 1:
                    return {
                        x: position.x - halfW,
                        y: position.y + v * halfH,
                    };
                case 2:
                    return {
                        x: position.x + v * halfW,
                        y: position.y + halfH,
                    };
                case 3:
                default:
                    return {
                        x: position.x + halfW,
                        y: position.y + v * halfH,
                    };
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-emitters/esm/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-emitters/esm/index.js ***!
  \***************************************************************/
/*! exports provided: loadEmittersPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadEmittersPlugin", function() { return loadEmittersPlugin; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Shapes_Circle_CircleShape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shapes/Circle/CircleShape */ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Circle/CircleShape.js");
/* harmony import */ var _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/Emitter */ "./node_modules/tsparticles-plugin-emitters/esm/Options/Classes/Emitter.js");
/* harmony import */ var _Emitters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Emitters */ "./node_modules/tsparticles-plugin-emitters/esm/Emitters.js");
/* harmony import */ var _ShapeManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ShapeManager */ "./node_modules/tsparticles-plugin-emitters/esm/ShapeManager.js");
/* harmony import */ var _Shapes_Square_SquareShape__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Shapes/Square/SquareShape */ "./node_modules/tsparticles-plugin-emitters/esm/Shapes/Square/SquareShape.js");
/* harmony import */ var _EmitterContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EmitterContainer */ "./node_modules/tsparticles-plugin-emitters/esm/EmitterContainer.js");
/* empty/unused harmony star reexport *//* harmony import */ var _EmittersEngine__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EmittersEngine */ "./node_modules/tsparticles-plugin-emitters/esm/EmittersEngine.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_EmitterClickMode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Enums/EmitterClickMode */ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterClickMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_EmitterShapeType__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Enums/EmitterShapeType */ "./node_modules/tsparticles-plugin-emitters/esm/Enums/EmitterShapeType.js");
/* empty/unused harmony star reexport */





class EmittersPlugin {
    constructor(engine) {
        this._engine = engine;
        this.id = "emitters";
    }
    getPlugin(container) {
        return new _Emitters__WEBPACK_IMPORTED_MODULE_3__["Emitters"](this._engine, container);
    }
    loadOptions(options, source) {
        var _a, _b, _c, _d, _e, _f;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        if (source === null || source === void 0 ? void 0 : source.emitters) {
            options.emitters = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(source.emitters, (emitter) => {
                const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_2__["Emitter"]();
                tmp.load(emitter);
                return tmp;
            });
        }
        const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                options.interactivity.modes.emitters = {
                    random: {
                        count: 1,
                        enable: true,
                    },
                    value: interactivityEmitters.map((s) => {
                        const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_2__["Emitter"]();
                        tmp.load(s);
                        return tmp;
                    }),
                };
            }
            else {
                const emitterMode = interactivityEmitters;
                if (emitterMode.value !== undefined) {
                    if (emitterMode.value instanceof Array) {
                        options.interactivity.modes.emitters = {
                            random: {
                                count: (_c = emitterMode.random.count) !== null && _c !== void 0 ? _c : 1,
                                enable: (_d = emitterMode.random.enable) !== null && _d !== void 0 ? _d : false,
                            },
                            value: emitterMode.value.map((s) => {
                                const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_2__["Emitter"]();
                                tmp.load(s);
                                return tmp;
                            }),
                        };
                    }
                    else {
                        const tmp = new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_2__["Emitter"]();
                        tmp.load(emitterMode.value);
                        options.interactivity.modes.emitters = {
                            random: {
                                count: (_e = emitterMode.random.count) !== null && _e !== void 0 ? _e : 1,
                                enable: (_f = emitterMode.random.enable) !== null && _f !== void 0 ? _f : false,
                            },
                            value: tmp,
                        };
                    }
                }
                else {
                    const emitterOptions = (options.interactivity.modes.emitters = {
                        random: {
                            count: 1,
                            enable: false,
                        },
                        value: new _Options_Classes_Emitter__WEBPACK_IMPORTED_MODULE_2__["Emitter"](),
                    });
                    emitterOptions.value.load(interactivityEmitters);
                }
            }
        }
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (!options) {
            return false;
        }
        const emitters = options.emitters;
        return ((emitters instanceof Array && !!emitters.length) ||
            emitters !== undefined ||
            (!!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
                Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("emitter", options.interactivity.events.onClick.mode)));
    }
}
async function loadEmittersPlugin(engine) {
    if (!engine.emitterShapeManager) {
        engine.emitterShapeManager = new _ShapeManager__WEBPACK_IMPORTED_MODULE_4__["ShapeManager"](engine);
    }
    if (!engine.addEmitterShape) {
        engine.addEmitterShape = (name, shape) => {
            var _a;
            (_a = engine.emitterShapeManager) === null || _a === void 0 ? void 0 : _a.addShape(name, shape);
        };
    }
    const plugin = new EmittersPlugin(engine);
    await engine.addPlugin(plugin);
    engine.addEmitterShape("circle", new _Shapes_Circle_CircleShape__WEBPACK_IMPORTED_MODULE_1__["CircleShape"]());
    engine.addEmitterShape("square", new _Shapes_Square_SquareShape__WEBPACK_IMPORTED_MODULE_5__["SquareShape"]());
}






/***/ })

}]);