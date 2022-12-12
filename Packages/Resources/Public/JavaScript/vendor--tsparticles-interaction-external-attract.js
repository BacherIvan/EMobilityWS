(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-attract"],{

/***/ "./node_modules/tsparticles-interaction-external-attract/esm/Attractor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-attract/esm/Attractor.js ***!
  \********************************************************************************/
/*! exports provided: Attractor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attractor", function() { return Attractor; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Attract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Attract */ "./node_modules/tsparticles-interaction-external-attract/esm/Options/Classes/Attract.js");


class Attractor extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(engine, container) {
        super(container);
        this._engine = engine;
        if (!container.attract) {
            container.attract = { particles: [] };
        }
        this.handleClickMode = (mode) => {
            const options = this.container.actualOptions, attract = options.interactivity.modes.attract;
            if (!attract || mode !== "attract") {
                return;
            }
            if (!container.attract) {
                container.attract = { particles: [] };
            }
            container.attract.clicking = true;
            container.attract.count = 0;
            for (const particle of container.attract.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.attract.particles = [];
            container.attract.finish = false;
            setTimeout(() => {
                if (!container.destroyed) {
                    if (!container.attract) {
                        container.attract = { particles: [] };
                    }
                    container.attract.clicking = false;
                }
            }, attract.duration * 1000);
        };
    }
    clear() {
    }
    init() {
        const container = this.container, attract = container.actualOptions.interactivity.modes.attract;
        if (!attract) {
            return;
        }
        container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
    }
    async interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["mouseMoveEvent"], events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode;
        if (mouseMoveStatus && hoverEnabled && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("attract", hoverMode)) {
            this.hoverAttract();
        }
        else if (clickEnabled && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("attract", clickMode)) {
            this.clickAttract();
        }
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events;
        if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("attract", hoverMode) || Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("attract", clickMode);
    }
    loadModeOptions(options, ...sources) {
        if (!options.attract) {
            options.attract = new _Options_Classes_Attract__WEBPACK_IMPORTED_MODULE_1__["Attract"]();
        }
        for (const source of sources) {
            options.attract.load(source === null || source === void 0 ? void 0 : source.attract);
        }
    }
    reset() {
    }
    clickAttract() {
        const container = this.container;
        if (!container.attract) {
            container.attract = { particles: [] };
        }
        if (!container.attract.finish) {
            if (!container.attract.count) {
                container.attract.count = 0;
            }
            container.attract.count++;
            if (container.attract.count === container.particles.count) {
                container.attract.finish = true;
            }
        }
        if (container.attract.clicking) {
            const mousePos = container.interactivity.mouse.clickPosition, attractRadius = container.retina.attractModeDistance;
            if (!attractRadius || attractRadius < 0 || !mousePos) {
                return;
            }
            this.processAttract(mousePos, attractRadius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](mousePos.x, mousePos.y, attractRadius));
        }
        else if (container.attract.clicking === false) {
            container.attract.particles = [];
        }
        return;
    }
    hoverAttract() {
        const container = this.container, mousePos = container.interactivity.mouse.position, attractRadius = container.retina.attractModeDistance;
        if (!attractRadius || attractRadius < 0 || !mousePos) {
            return;
        }
        this.processAttract(mousePos, attractRadius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](mousePos.x, mousePos.y, attractRadius));
    }
    processAttract(position, attractRadius, area) {
        const container = this.container, attractOptions = container.actualOptions.interactivity.modes.attract;
        if (!attractOptions) {
            return;
        }
        const query = container.particles.quadTree.query(area, (p) => this.isEnabled(p));
        for (const particle of query) {
            const { dx, dy, distance } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(particle.position, position);
            const velocity = attractOptions.speed * attractOptions.factor;
            const attractFactor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getEasing"])(attractOptions.easing)(1 - distance / attractRadius) * velocity, 0, attractOptions.maxSpeed);
            const normVec = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(distance === 0 ? velocity : (dx / distance) * attractFactor, distance === 0 ? velocity : (dy / distance) * attractFactor);
            particle.position.subFrom(normVec);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-attract/esm/Options/Classes/Attract.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-attract/esm/Options/Classes/Attract.js ***!
  \**********************************************************************************************/
/*! exports provided: Attract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attract", function() { return Attract; });
class Attract {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.easing = "ease-out-quad";
        this.factor = 1;
        this.maxSpeed = 50;
        this.speed = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.duration !== undefined) {
            this.duration = data.duration;
        }
        if (data.easing !== undefined) {
            this.easing = data.easing;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-attract/esm/Options/Interfaces/IAttract.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-attract/esm/Options/Interfaces/IAttract.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-attract/esm/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-attract/esm/index.js ***!
  \****************************************************************************/
/*! exports provided: loadExternalAttractInteraction, Attract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalAttractInteraction", function() { return loadExternalAttractInteraction; });
/* harmony import */ var _Attractor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Attractor */ "./node_modules/tsparticles-interaction-external-attract/esm/Attractor.js");
/* harmony import */ var _Options_Classes_Attract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Attract */ "./node_modules/tsparticles-interaction-external-attract/esm/Options/Classes/Attract.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Attract", function() { return _Options_Classes_Attract__WEBPACK_IMPORTED_MODULE_1__["Attract"]; });

/* harmony import */ var _Options_Interfaces_IAttract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Interfaces/IAttract */ "./node_modules/tsparticles-interaction-external-attract/esm/Options/Interfaces/IAttract.js");
/* empty/unused harmony star reexport */
async function loadExternalAttractInteraction(engine) {
    await engine.addInteractor("externalAttract", (container) => new _Attractor__WEBPACK_IMPORTED_MODULE_0__["Attractor"](engine, container));
}




/***/ })

}]);