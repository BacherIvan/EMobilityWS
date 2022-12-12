(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-repulse"],{

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/Repulse.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/Repulse.js ***!
  \**********************************************************************************************/
/*! exports provided: Repulse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Repulse", function() { return Repulse; });
/* harmony import */ var _RepulseBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RepulseBase */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseBase.js");
/* harmony import */ var _RepulseDiv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RepulseDiv */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseDiv.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");



class Repulse extends _RepulseBase__WEBPACK_IMPORTED_MODULE_0__["RepulseBase"] {
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        this.divs = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__["executeOnSingleOrMultiple"])(data.divs, (div) => {
            const tmp = new _RepulseDiv__WEBPACK_IMPORTED_MODULE_1__["RepulseDiv"]();
            tmp.load(div);
            return tmp;
        });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseBase.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseBase.js ***!
  \**************************************************************************************************/
/*! exports provided: RepulseBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepulseBase", function() { return RepulseBase; });
class RepulseBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.factor = 100;
        this.speed = 1;
        this.maxSpeed = 50;
        this.easing = "ease-out-quad";
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
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = data.maxSpeed;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseDiv.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseDiv.js ***!
  \*************************************************************************************************/
/*! exports provided: RepulseDiv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepulseDiv", function() { return RepulseDiv; });
/* harmony import */ var _RepulseBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RepulseBase */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseBase.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


class RepulseDiv extends _RepulseBase__WEBPACK_IMPORTED_MODULE_0__["RepulseBase"] {
    constructor() {
        super();
        this.selectors = [];
    }
    get ids() {
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["executeOnSingleOrMultiple"])(this.selectors, (t) => t.replace("#", ""));
    }
    set ids(value) {
        this.selectors = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["executeOnSingleOrMultiple"])(value, (t) => `#${t}`);
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.ids !== undefined) {
            this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulse.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulse.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulseBase.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulseBase.js ***!
  \******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulseDiv.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulseDiv.js ***!
  \*****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/Repulser.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/Repulser.js ***!
  \*******************************************************************************/
/*! exports provided: Repulser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Repulser", function() { return Repulser; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Repulse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Repulse */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/Repulse.js");


class Repulser extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(engine, container) {
        super(container);
        this._engine = engine;
        if (!container.repulse) {
            container.repulse = { particles: [] };
        }
        this.handleClickMode = (mode) => {
            const options = this.container.actualOptions, repulse = options.interactivity.modes.repulse;
            if (!repulse || mode !== "repulse") {
                return;
            }
            if (!container.repulse) {
                container.repulse = { particles: [] };
            }
            container.repulse.clicking = true;
            container.repulse.count = 0;
            for (const particle of container.repulse.particles) {
                if (!this.isEnabled(particle)) {
                    continue;
                }
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.repulse.particles = [];
            container.repulse.finish = false;
            setTimeout(() => {
                if (!container.destroyed) {
                    if (!container.repulse) {
                        container.repulse = { particles: [] };
                    }
                    container.repulse.clicking = false;
                }
            }, repulse.duration * 1000);
        };
    }
    clear() {
    }
    init() {
        const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
        if (!repulse) {
            return;
        }
        container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
    }
    async interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["mouseMoveEvent"], events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("repulse", hoverMode)) {
            this.hoverRepulse();
        }
        else if (clickEnabled && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("repulse", clickMode)) {
            this.clickRepulse();
        }
        else {
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["divModeExecute"])("repulse", divs, (selector, div) => this.singleSelectorRepulse(selector, div));
        }
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events, divs = events.onDiv, divRepulse = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isDivModeEnabled"])("repulse", divs);
        if (!(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("repulse", hoverMode) || Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("repulse", clickMode) || divRepulse;
    }
    loadModeOptions(options, ...sources) {
        if (!options.repulse) {
            options.repulse = new _Options_Classes_Repulse__WEBPACK_IMPORTED_MODULE_1__["Repulse"]();
        }
        for (const source of sources) {
            options.repulse.load(source === null || source === void 0 ? void 0 : source.repulse);
        }
    }
    reset() {
    }
    clickRepulse() {
        const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
        if (!repulse) {
            return;
        }
        if (!container.repulse) {
            container.repulse = { particles: [] };
        }
        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }
            container.repulse.count++;
            if (container.repulse.count === container.particles.count) {
                container.repulse.finish = true;
            }
        }
        if (container.repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance;
            if (!repulseDistance || repulseDistance < 0) {
                return;
            }
            const repulseRadius = Math.pow(repulseDistance / 6, 3), mouseClickPos = container.interactivity.mouse.clickPosition;
            if (mouseClickPos === undefined) {
                return;
            }
            const range = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container.particles.quadTree.query(range, (p) => this.isEnabled(p));
            for (const particle of query) {
                const { dx, dy, distance } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(mouseClickPos, particle.position), d = distance ** 2, velocity = repulse.speed, force = (-repulseRadius * velocity) / d;
                if (d <= repulseRadius) {
                    container.repulse.particles.push(particle);
                    const vect = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(dx, dy);
                    vect.length = force;
                    particle.velocity.setTo(vect);
                }
            }
        }
        else if (container.repulse.clicking === false) {
            for (const particle of container.repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.repulse.particles = [];
        }
    }
    hoverRepulse() {
        const container = this.container, mousePos = container.interactivity.mouse.position, repulseRadius = container.retina.repulseModeDistance;
        if (!repulseRadius || repulseRadius < 0 || !mousePos) {
            return;
        }
        this.processRepulse(mousePos, repulseRadius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](mousePos.x, mousePos.y, repulseRadius));
    }
    processRepulse(position, repulseRadius, area, divRepulse) {
        var _a;
        const container = this.container, query = container.particles.quadTree.query(area, (p) => this.isEnabled(p)), repulseOptions = container.actualOptions.interactivity.modes.repulse;
        if (!repulseOptions) {
            return;
        }
        for (const particle of query) {
            const { dx, dy, distance } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(particle.position, position), velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor, repulseFactor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getEasing"])(repulseOptions.easing)(1 - distance / repulseRadius) * velocity, 0, repulseOptions.maxSpeed), normVec = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(distance === 0 ? velocity : (dx / distance) * repulseFactor, distance === 0 ? velocity : (dy / distance) * repulseFactor);
            particle.position.addTo(normVec);
        }
    }
    singleSelectorRepulse(selector, div) {
        const container = this.container, repulse = container.actualOptions.interactivity.modes.repulse;
        if (!repulse) {
            return;
        }
        const query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, repulseRadius = (elem.offsetWidth / 2) * pxRatio, area = div.type === "circle"
                ? new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](pos.x, pos.y, repulseRadius)
                : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Rectangle"](elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = repulse.divs, divRepulse = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["divMode"])(divs, elem);
            this.processRepulse(pos, repulseRadius, area, divRepulse);
        });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-repulse/esm/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-repulse/esm/index.js ***!
  \****************************************************************************/
/*! exports provided: loadExternalRepulseInteraction, RepulseBase, RepulseDiv, Repulse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalRepulseInteraction", function() { return loadExternalRepulseInteraction; });
/* harmony import */ var _Repulser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Repulser */ "./node_modules/tsparticles-interaction-external-repulse/esm/Repulser.js");
/* harmony import */ var _Options_Classes_RepulseBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/RepulseBase */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RepulseBase", function() { return _Options_Classes_RepulseBase__WEBPACK_IMPORTED_MODULE_1__["RepulseBase"]; });

/* harmony import */ var _Options_Classes_RepulseDiv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/RepulseDiv */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/RepulseDiv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RepulseDiv", function() { return _Options_Classes_RepulseDiv__WEBPACK_IMPORTED_MODULE_2__["RepulseDiv"]; });

/* harmony import */ var _Options_Classes_Repulse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Options/Classes/Repulse */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Classes/Repulse.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Repulse", function() { return _Options_Classes_Repulse__WEBPACK_IMPORTED_MODULE_3__["Repulse"]; });

/* harmony import */ var _Options_Interfaces_IRepulseBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Options/Interfaces/IRepulseBase */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulseBase.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IRepulseDiv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Options/Interfaces/IRepulseDiv */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulseDiv.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IRepulse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Options/Interfaces/IRepulse */ "./node_modules/tsparticles-interaction-external-repulse/esm/Options/Interfaces/IRepulse.js");
/* empty/unused harmony star reexport */
async function loadExternalRepulseInteraction(engine) {
    await engine.addInteractor("externalRepulse", (container) => new _Repulser__WEBPACK_IMPORTED_MODULE_0__["Repulser"](engine, container));
}








/***/ })

}]);