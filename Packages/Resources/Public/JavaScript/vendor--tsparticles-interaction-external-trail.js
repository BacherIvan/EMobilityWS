(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-trail"],{

/***/ "./node_modules/tsparticles-interaction-external-trail/esm/Options/Classes/Trail.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-trail/esm/Options/Classes/Trail.js ***!
  \******************************************************************************************/
/*! exports provided: Trail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Trail", function() { return Trail; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Trail {
    constructor() {
        this.delay = 1;
        this.pauseOnStop = false;
        this.quantity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.quantity !== undefined) {
            this.quantity = data.quantity;
        }
        if (data.particles !== undefined) {
            this.particles = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, data.particles);
        }
        if (data.pauseOnStop !== undefined) {
            this.pauseOnStop = data.pauseOnStop;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-trail/esm/Options/Interfaces/ITrail.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-trail/esm/Options/Interfaces/ITrail.js ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-trail/esm/TrailMaker.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-trail/esm/TrailMaker.js ***!
  \*******************************************************************************/
/*! exports provided: TrailMaker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrailMaker", function() { return TrailMaker; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Trail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Trail */ "./node_modules/tsparticles-interaction-external-trail/esm/Options/Classes/Trail.js");


class TrailMaker extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
        this._delay = 0;
    }
    clear() {
    }
    init() {
    }
    async interact(delta) {
        var _a, _b, _c, _d;
        if (!this.container.retina.reduceFactor) {
            return;
        }
        const container = this.container, options = container.actualOptions, trailOptions = options.interactivity.modes.trail;
        if (!trailOptions) {
            return;
        }
        const optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;
        if (this._delay < optDelay) {
            this._delay += delta.value;
        }
        if (this._delay < optDelay) {
            return;
        }
        let canEmit = true;
        if (trailOptions.pauseOnStop) {
            if (container.interactivity.mouse.position === this._lastPosition ||
                (((_a = container.interactivity.mouse.position) === null || _a === void 0 ? void 0 : _a.x) === ((_b = this._lastPosition) === null || _b === void 0 ? void 0 : _b.x) &&
                    ((_c = container.interactivity.mouse.position) === null || _c === void 0 ? void 0 : _c.y) === ((_d = this._lastPosition) === null || _d === void 0 ? void 0 : _d.y))) {
                canEmit = false;
            }
        }
        if (container.interactivity.mouse.position) {
            this._lastPosition = {
                x: container.interactivity.mouse.position.x,
                y: container.interactivity.mouse.position.y,
            };
        }
        else {
            delete this._lastPosition;
        }
        if (canEmit) {
            container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }
        this._delay -= optDelay;
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events;
        return ((mouse.clicking && mouse.inside && !!mouse.position && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("trail", events.onClick.mode)) ||
            (mouse.inside && !!mouse.position && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("trail", events.onHover.mode)));
    }
    loadModeOptions(options, ...sources) {
        if (!options.trail) {
            options.trail = new _Options_Classes_Trail__WEBPACK_IMPORTED_MODULE_1__["Trail"]();
        }
        for (const source of sources) {
            options.trail.load(source === null || source === void 0 ? void 0 : source.trail);
        }
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-trail/esm/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-trail/esm/index.js ***!
  \**************************************************************************/
/*! exports provided: loadExternalTrailInteraction, Trail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalTrailInteraction", function() { return loadExternalTrailInteraction; });
/* harmony import */ var _TrailMaker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrailMaker */ "./node_modules/tsparticles-interaction-external-trail/esm/TrailMaker.js");
/* harmony import */ var _Options_Classes_Trail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Trail */ "./node_modules/tsparticles-interaction-external-trail/esm/Options/Classes/Trail.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Trail", function() { return _Options_Classes_Trail__WEBPACK_IMPORTED_MODULE_1__["Trail"]; });

/* harmony import */ var _Options_Interfaces_ITrail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Interfaces/ITrail */ "./node_modules/tsparticles-interaction-external-trail/esm/Options/Interfaces/ITrail.js");
/* empty/unused harmony star reexport */
async function loadExternalTrailInteraction(engine) {
    await engine.addInteractor("externalTrail", (container) => new _TrailMaker__WEBPACK_IMPORTED_MODULE_0__["TrailMaker"](container));
}




/***/ })

}]);