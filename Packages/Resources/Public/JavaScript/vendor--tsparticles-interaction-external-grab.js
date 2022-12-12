(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-grab"],{

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/Grabber.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/Grabber.js ***!
  \***************************************************************************/
/*! exports provided: drawGrabLine, Grabber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawGrabLine", function() { return drawGrabLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grabber", function() { return Grabber; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Grab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Grab */ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/Grab.js");


function drawGrabLine(context, width, begin, end, colorLine, opacity) {
    Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["drawLine"])(context, begin, end);
    context.strokeStyle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromRgb"])(colorLine, opacity);
    context.lineWidth = width;
    context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
    container.canvas.draw((ctx) => {
        var _a;
        const beginPos = particle.getPosition();
        drawGrabLine(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : 0, beginPos, mousePos, lineColor, opacity);
    });
}
class Grabber extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
        const container = this.container, grab = container.actualOptions.interactivity.modes.grab;
        if (!grab) {
            return;
        }
        container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
    }
    async interact() {
        var _a, _b;
        const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
        if (!interactivity.modes.grab ||
            !interactivity.events.onHover.enable ||
            container.interactivity.status !== tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["mouseMoveEvent"]) {
            return;
        }
        const mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const distance = container.retina.grabModeDistance;
        if (!distance || distance < 0) {
            return;
        }
        const query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
        for (const particle of query) {
            const pos = particle.getPosition(), pointDistance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos, mousePos);
            if (pointDistance > distance) {
                continue;
            }
            const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;
            if (opacityLine <= 0) {
                continue;
            }
            const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : (_b = particle.options.links) === null || _b === void 0 ? void 0 : _b.color;
            if (!container.particles.grabLineColor && optColor) {
                const linksOptions = interactivity.modes.grab.links;
                container.particles.grabLineColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getLinkRandomColor"])(optColor, linksOptions.blink, linksOptions.consent);
            }
            const colorLine = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getLinkColor"])(particle, undefined, container.particles.grabLineColor);
            if (!colorLine) {
                return;
            }
            drawGrab(container, particle, colorLine, opacityLine, mousePos);
        }
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity).events;
        return events.onHover.enable && !!mouse.position && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("grab", events.onHover.mode);
    }
    loadModeOptions(options, ...sources) {
        if (!options.grab) {
            options.grab = new _Options_Classes_Grab__WEBPACK_IMPORTED_MODULE_1__["Grab"]();
        }
        for (const source of sources) {
            options.grab.load(source === null || source === void 0 ? void 0 : source.grab);
        }
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/Grab.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/Grab.js ***!
  \****************************************************************************************/
/*! exports provided: Grab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grab", function() { return Grab; });
/* harmony import */ var _GrabLinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GrabLinks */ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/GrabLinks.js");

class Grab {
    constructor() {
        this.distance = 100;
        this.links = new _GrabLinks__WEBPACK_IMPORTED_MODULE_0__["GrabLinks"]();
    }
    get lineLinked() {
        return this.links;
    }
    set lineLinked(value) {
        this.links = value;
    }
    get line_linked() {
        return this.links;
    }
    set line_linked(value) {
        this.links = value;
    }
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/GrabLinks.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/GrabLinks.js ***!
  \*********************************************************************************************/
/*! exports provided: GrabLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GrabLinks", function() { return GrabLinks; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class GrabLinks {
    constructor() {
        this.blink = false;
        this.consent = false;
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        if (data.color !== undefined) {
            this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        }
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Interfaces/IGrab.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/Options/Interfaces/IGrab.js ***!
  \********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Interfaces/IGrabLinks.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/Options/Interfaces/IGrabLinks.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-grab/esm/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-grab/esm/index.js ***!
  \*************************************************************************/
/*! exports provided: loadExternalGrabInteraction, Grab, GrabLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalGrabInteraction", function() { return loadExternalGrabInteraction; });
/* harmony import */ var _Grabber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grabber */ "./node_modules/tsparticles-interaction-external-grab/esm/Grabber.js");
/* harmony import */ var _Options_Classes_Grab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Grab */ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/Grab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grab", function() { return _Options_Classes_Grab__WEBPACK_IMPORTED_MODULE_1__["Grab"]; });

/* harmony import */ var _Options_Classes_GrabLinks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/GrabLinks */ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Classes/GrabLinks.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GrabLinks", function() { return _Options_Classes_GrabLinks__WEBPACK_IMPORTED_MODULE_2__["GrabLinks"]; });

/* harmony import */ var _Options_Interfaces_IGrab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Options/Interfaces/IGrab */ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Interfaces/IGrab.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IGrabLinks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Options/Interfaces/IGrabLinks */ "./node_modules/tsparticles-interaction-external-grab/esm/Options/Interfaces/IGrabLinks.js");
/* empty/unused harmony star reexport */
async function loadExternalGrabInteraction(engine) {
    await engine.addInteractor("externalGrab", (container) => new _Grabber__WEBPACK_IMPORTED_MODULE_0__["Grabber"](container));
}






/***/ })

}]);