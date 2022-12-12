(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-bounce"],{

/***/ "./node_modules/tsparticles-interaction-external-bounce/esm/Bouncer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bounce/esm/Bouncer.js ***!
  \*****************************************************************************/
/*! exports provided: Bouncer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bouncer", function() { return Bouncer; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Bounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Bounce */ "./node_modules/tsparticles-interaction-external-bounce/esm/Options/Classes/Bounce.js");


class Bouncer extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
        const container = this.container, bounce = container.actualOptions.interactivity.modes.bounce;
        if (!bounce) {
            return;
        }
        container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
    }
    async interact() {
        const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["mouseMoveEvent"], hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("bounce", hoverMode)) {
            this.processMouseBounce();
        }
        else {
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["divModeExecute"])("bounce", divs, (selector, div) => this.singleSelectorBounce(selector, div));
        }
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events, divs = events.onDiv;
        return ((mouse.position && events.onHover.enable && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("bounce", events.onHover.mode)) ||
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isDivModeEnabled"])("bounce", divs));
    }
    loadModeOptions(options, ...sources) {
        if (!options.bounce) {
            options.bounce = new _Options_Classes_Bounce__WEBPACK_IMPORTED_MODULE_1__["Bounce"]();
        }
        for (const source of sources) {
            options.bounce.load(source === null || source === void 0 ? void 0 : source.bounce);
        }
    }
    reset() {
    }
    processBounce(position, radius, area) {
        const query = this.container.particles.quadTree.query(area, (p) => this.isEnabled(p));
        for (const particle of query) {
            if (area instanceof tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"]) {
                Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["circleBounce"])(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["circleBounceDataFromParticle"])(particle), {
                    position,
                    radius,
                    mass: (radius ** 2 * Math.PI) / 2,
                    velocity: tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin,
                    factor: tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin,
                });
            }
            else if (area instanceof tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Rectangle"]) {
                Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rectBounce"])(particle, Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["calculateBounds"])(position, radius));
            }
        }
    }
    processMouseBounce() {
        const container = this.container, pxRatio = container.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
        if (!radius || radius < 0 || !mousePos) {
            return;
        }
        this.processBounce(mousePos, radius, new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](mousePos.x, mousePos.y, radius + tolerance));
    }
    singleSelectorBounce(selector, div) {
        const container = this.container, query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, radius = (elem.offsetWidth / 2) * pxRatio, tolerance = 10 * pxRatio, area = div.type === "circle"
                ? new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](pos.x, pos.y, radius + tolerance)
                : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Rectangle"](elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
            this.processBounce(pos, radius, area);
        });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bounce/esm/Options/Classes/Bounce.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bounce/esm/Options/Classes/Bounce.js ***!
  \********************************************************************************************/
/*! exports provided: Bounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return Bounce; });
class Bounce {
    constructor() {
        this.distance = 200;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bounce/esm/Options/Interfaces/IBounce.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bounce/esm/Options/Interfaces/IBounce.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bounce/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bounce/esm/index.js ***!
  \***************************************************************************/
/*! exports provided: loadExternalBounceInteraction, Bounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalBounceInteraction", function() { return loadExternalBounceInteraction; });
/* harmony import */ var _Bouncer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bouncer */ "./node_modules/tsparticles-interaction-external-bounce/esm/Bouncer.js");
/* harmony import */ var _Options_Classes_Bounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Bounce */ "./node_modules/tsparticles-interaction-external-bounce/esm/Options/Classes/Bounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bounce", function() { return _Options_Classes_Bounce__WEBPACK_IMPORTED_MODULE_1__["Bounce"]; });

/* harmony import */ var _Options_Interfaces_IBounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Interfaces/IBounce */ "./node_modules/tsparticles-interaction-external-bounce/esm/Options/Interfaces/IBounce.js");
/* empty/unused harmony star reexport */
async function loadExternalBounceInteraction(engine) {
    await engine.addInteractor("externalBounce", (container) => new _Bouncer__WEBPACK_IMPORTED_MODULE_0__["Bouncer"](container));
}




/***/ })

}]);