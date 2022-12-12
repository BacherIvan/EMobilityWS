(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-plugin-absorbers"],{

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberContainer.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/AbsorberContainer.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberInstance.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/AbsorberInstance.js ***!
  \***************************************************************************/
/*! exports provided: AbsorberInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsorberInstance", function() { return AbsorberInstance; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Absorber */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js");


class AbsorberInstance {
    constructor(absorbers, container, options, position) {
        var _a, _b, _c;
        this.absorbers = absorbers;
        this.container = container;
        this.initialPosition = position ? tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(position.x, position.y) : undefined;
        if (options instanceof _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__["Absorber"]) {
            this.options = options;
        }
        else {
            this.options = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__["Absorber"]();
            this.options.load(options);
        }
        this.dragging = false;
        this.name = this.options.name;
        this.opacity = this.options.opacity;
        this.size = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(this.options.size.value) * container.retina.pixelRatio;
        this.mass = this.size * this.options.size.density * container.retina.reduceFactor;
        const limit = this.options.size.limit;
        this.limit = {
            radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
            mass: limit.mass,
        };
        this.color = (_a = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rangeColorToRgb"])(this.options.color)) !== null && _a !== void 0 ? _a : {
            b: 0,
            g: 0,
            r: 0,
        };
        this.position = (_c = (_b = this.initialPosition) === null || _b === void 0 ? void 0 : _b.copy()) !== null && _c !== void 0 ? _c : this.calcPosition();
    }
    attract(particle) {
        const container = this.container, options = this.options;
        if (options.draggable) {
            const mouse = container.interactivity.mouse;
            if (mouse.clicking && mouse.downPosition) {
                const mouseDist = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(this.position, mouse.downPosition);
                if (mouseDist <= this.size) {
                    this.dragging = true;
                }
            }
            else {
                this.dragging = false;
            }
            if (this.dragging && mouse.position) {
                this.position.x = mouse.position.x;
                this.position.y = mouse.position.y;
            }
        }
        const pos = particle.getPosition(), { dx, dy, distance } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(this.position, pos), v = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(dx, dy);
        v.length = (this.mass / Math.pow(distance, 2)) * container.retina.reduceFactor;
        if (distance < this.size + particle.getRadius()) {
            const sizeFactor = particle.getRadius() * 0.033 * container.retina.pixelRatio;
            if ((this.size > particle.getRadius() && distance < this.size - particle.getRadius()) ||
                (particle.absorberOrbit !== undefined && particle.absorberOrbit.length < 0)) {
                if (options.destroy) {
                    particle.destroy();
                }
                else {
                    particle.needsNewPosition = true;
                    this.updateParticlePosition(particle, v);
                }
            }
            else {
                if (options.destroy) {
                    particle.size.value -= sizeFactor;
                }
                this.updateParticlePosition(particle, v);
            }
            if (this.limit.radius <= 0 || this.size < this.limit.radius) {
                this.size += sizeFactor;
            }
            if (this.limit.mass <= 0 || this.mass < this.limit.mass) {
                this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
            }
        }
        else {
            this.updateParticlePosition(particle, v);
        }
    }
    draw(context) {
        context.translate(this.position.x, this.position.y);
        context.beginPath();
        context.arc(0, 0, this.size, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromRgb"])(this.color, this.opacity);
        context.fill();
    }
    resize() {
        const initialPosition = this.initialPosition;
        this.position =
            initialPosition && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isPointInside"])(initialPosition, this.container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin)
                ? initialPosition
                : this.calcPosition();
    }
    calcPosition() {
        const exactPosition = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["calcPositionOrRandomFromSizeRanged"])({
            size: this.container.canvas.size,
            position: this.options.position,
        });
        return tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(exactPosition.x, exactPosition.y);
    }
    updateParticlePosition(particle, v) {
        var _a;
        if (particle.destroyed) {
            return;
        }
        const container = this.container, canvasSize = container.canvas.size;
        if (particle.needsNewPosition) {
            const newPosition = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["calcPositionOrRandomFromSize"])({ size: canvasSize });
            particle.position.setTo(newPosition);
            particle.velocity.setTo(particle.initialVelocity);
            particle.absorberOrbit = undefined;
            particle.needsNewPosition = false;
        }
        if (this.options.orbits) {
            if (particle.absorberOrbit === undefined) {
                particle.absorberOrbit = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(0, 0);
                particle.absorberOrbit.length = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(particle.getPosition(), this.position);
                particle.absorberOrbit.angle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * Math.PI * 2;
            }
            if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
                const minSize = Math.min(canvasSize.width, canvasSize.height);
                particle.absorberOrbit.length = minSize * (1 + (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * 0.2 - 0.1));
            }
            if (particle.absorberOrbitDirection === undefined) {
                particle.absorberOrbitDirection =
                    particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise";
            }
            const orbitRadius = particle.absorberOrbit.length, orbitAngle = particle.absorberOrbit.angle, orbitDirection = particle.absorberOrbitDirection;
            particle.velocity.setTo(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin);
            const updateFunc = {
                x: orbitDirection === "clockwise" ? Math.cos : Math.sin,
                y: orbitDirection === "clockwise" ? Math.sin : Math.cos,
            };
            particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
            particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
            particle.absorberOrbit.length -= v.length;
            particle.absorberOrbit.angle +=
                ((((_a = particle.retina.moveSpeed) !== null && _a !== void 0 ? _a : 0) * container.retina.pixelRatio) / 100) *
                    container.retina.reduceFactor;
        }
        else {
            const addV = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin;
            addV.length = v.length;
            addV.angle = v.angle;
            particle.velocity.addTo(addV);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Absorbers.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Absorbers.js ***!
  \********************************************************************/
/*! exports provided: Absorbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Absorbers", function() { return Absorbers; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _AbsorberInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbsorberInstance */ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberInstance.js");


class Absorbers {
    constructor(container) {
        this.container = container;
        this.array = [];
        this.absorbers = [];
        this.interactivityAbsorbers = [];
        container.getAbsorber = (idxOrName) => idxOrName === undefined || typeof idxOrName === "number"
            ? this.array[idxOrName || 0]
            : this.array.find((t) => t.name === idxOrName);
        container.addAbsorber = (options, position) => this.addAbsorber(options, position);
    }
    addAbsorber(options, position) {
        const absorber = new _AbsorberInstance__WEBPACK_IMPORTED_MODULE_1__["AbsorberInstance"](this, this.container, options, position);
        this.array.push(absorber);
        return absorber;
    }
    draw(context) {
        for (const absorber of this.array) {
            absorber.draw(context);
        }
    }
    handleClickMode(mode) {
        const absorberOptions = this.absorbers, modeAbsorbers = this.interactivityAbsorbers;
        if (mode === "absorber") {
            const absorbersModeOptions = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromSingleOrMultiple"])(modeAbsorbers), absorbersOptions = absorbersModeOptions !== null && absorbersModeOptions !== void 0 ? absorbersModeOptions : Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromSingleOrMultiple"])(absorberOptions), aPosition = this.container.interactivity.mouse.clickPosition;
            this.addAbsorber(absorbersOptions, aPosition);
        }
    }
    async init() {
        this.absorbers = this.container.actualOptions.absorbers;
        this.interactivityAbsorbers = this.container.actualOptions.interactivity.modes.absorbers;
        Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(this.absorbers, (absorber) => {
            this.addAbsorber(absorber);
        });
    }
    particleUpdate(particle) {
        for (const absorber of this.array) {
            absorber.attract(particle);
            if (particle.destroyed) {
                break;
            }
        }
    }
    removeAbsorber(absorber) {
        const index = this.array.indexOf(absorber);
        if (index >= 0) {
            this.array.splice(index, 1);
        }
    }
    resize() {
        for (const absorber of this.array) {
            absorber.resize();
        }
    }
    stop() {
        this.array = [];
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Enums/AbsorberClickMode.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Enums/AbsorberClickMode.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js ***!
  \***********************************************************************************/
/*! exports provided: Absorber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Absorber", function() { return Absorber; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _AbsorberSize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AbsorberSize */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSize.js");


class Absorber {
    constructor() {
        this.color = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"]();
        this.color.value = "#000000";
        this.draggable = false;
        this.opacity = 1;
        this.destroy = true;
        this.orbits = false;
        this.size = new _AbsorberSize__WEBPACK_IMPORTED_MODULE_1__["AbsorberSize"]();
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.color !== undefined) {
            this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        }
        if (data.draggable !== undefined) {
            this.draggable = data.draggable;
        }
        this.name = data.name;
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
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
        if (data.size !== undefined) {
            this.size.load(data.size);
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.orbits !== undefined) {
            this.orbits = data.orbits;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSize.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSize.js ***!
  \***************************************************************************************/
/*! exports provided: AbsorberSize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsorberSize", function() { return AbsorberSize; });
/* harmony import */ var _AbsorberSizeLimit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AbsorberSizeLimit */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSizeLimit.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


class AbsorberSize extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["ValueWithRandom"] {
    constructor() {
        super();
        this.density = 5;
        this.value = 50;
        this.limit = new _AbsorberSizeLimit__WEBPACK_IMPORTED_MODULE_0__["AbsorberSizeLimit"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.density !== undefined) {
            this.density = data.density;
        }
        if (typeof data.limit === "number") {
            this.limit.radius = data.limit;
        }
        else {
            this.limit.load(data.limit);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSizeLimit.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/AbsorberSizeLimit.js ***!
  \********************************************************************************************/
/*! exports provided: AbsorberSizeLimit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbsorberSizeLimit", function() { return AbsorberSizeLimit; });
class AbsorberSizeLimit {
    constructor() {
        this.radius = 0;
        this.mass = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.mass !== undefined) {
            this.mass = data.mass;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-plugin-absorbers/esm/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/tsparticles-plugin-absorbers/esm/index.js ***!
  \****************************************************************/
/*! exports provided: loadAbsorbersPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadAbsorbersPlugin", function() { return loadAbsorbersPlugin; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Absorber */ "./node_modules/tsparticles-plugin-absorbers/esm/Options/Classes/Absorber.js");
/* harmony import */ var _Absorbers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Absorbers */ "./node_modules/tsparticles-plugin-absorbers/esm/Absorbers.js");
/* harmony import */ var _AbsorberContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AbsorberContainer */ "./node_modules/tsparticles-plugin-absorbers/esm/AbsorberContainer.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_AbsorberClickMode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Enums/AbsorberClickMode */ "./node_modules/tsparticles-plugin-absorbers/esm/Enums/AbsorberClickMode.js");
/* empty/unused harmony star reexport */


class AbsorbersPlugin {
    constructor() {
        this.id = "absorbers";
    }
    getPlugin(container) {
        return new _Absorbers__WEBPACK_IMPORTED_MODULE_2__["Absorbers"](container);
    }
    loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        if (source === null || source === void 0 ? void 0 : source.absorbers) {
            options.absorbers = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(source.absorbers, (absorber) => {
                const tmp = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__["Absorber"]();
                tmp.load(absorber);
                return tmp;
            });
        }
        options.interactivity.modes.absorbers = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])((_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.absorbers, (absorber) => {
            const tmp = new _Options_Classes_Absorber__WEBPACK_IMPORTED_MODULE_1__["Absorber"]();
            tmp.load(absorber);
            return tmp;
        });
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (!options) {
            return false;
        }
        const absorbers = options.absorbers;
        if (absorbers instanceof Array) {
            return !!absorbers.length;
        }
        else if (absorbers) {
            return true;
        }
        else if (((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("absorber", options.interactivity.events.onClick.mode)) {
            return true;
        }
        return false;
    }
}
async function loadAbsorbersPlugin(engine) {
    const plugin = new AbsorbersPlugin();
    await engine.addPlugin(plugin);
}




/***/ })

}]);