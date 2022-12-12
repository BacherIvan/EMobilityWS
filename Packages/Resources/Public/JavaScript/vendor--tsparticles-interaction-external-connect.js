(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-connect"],{

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/Connector.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/Connector.js ***!
  \********************************************************************************/
/*! exports provided: Connector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connector", function() { return Connector; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Connect */ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/Connect.js");


function gradient(context, p1, p2, opacity) {
    const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
    if (!color1 || !color2) {
        return;
    }
    const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["colorMix"])(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
    grad.addColorStop(0, Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromHsl"])(color1, opacity));
    grad.addColorStop(gradStop > 1 ? 1 : gradStop, Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromRgb"])(midRgb, opacity));
    grad.addColorStop(1, Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromHsl"])(color2, opacity));
    return grad;
}
function drawConnectLine(context, width, lineStyle, begin, end) {
    Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["drawLine"])(context, begin, end);
    context.lineWidth = width;
    context.strokeStyle = lineStyle;
    context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
    const options = container.actualOptions, connectOptions = options.interactivity.modes.connect;
    if (!connectOptions) {
        return;
    }
    return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
    container.canvas.draw((ctx) => {
        var _a;
        const ls = lineStyle(container, ctx, p1, p2);
        if (!ls) {
            return;
        }
        const pos1 = p1.getPosition(), pos2 = p2.getPosition();
        drawConnectLine(ctx, (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : 0, ls, pos1, pos2);
    });
}
class Connector extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
        const container = this.container, connect = container.actualOptions.interactivity.modes.connect;
        if (!connect) {
            return;
        }
        container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
        container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
    }
    async interact() {
        const container = this.container, options = container.actualOptions;
        if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
            const mousePos = container.interactivity.mouse.position;
            if (!container.retina.connectModeDistance ||
                container.retina.connectModeDistance < 0 ||
                !container.retina.connectModeRadius ||
                container.retina.connectModeRadius < 0 ||
                !mousePos) {
                return;
            }
            const distance = Math.abs(container.retina.connectModeRadius), query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
            let i = 0;
            for (const p1 of query) {
                const pos1 = p1.getPosition();
                for (const p2 of query.slice(i + 1)) {
                    const pos2 = p2.getPosition(), distMax = Math.abs(container.retina.connectModeDistance), xDiff = Math.abs(pos1.x - pos2.x), yDiff = Math.abs(pos1.y - pos2.y);
                    if (xDiff < distMax && yDiff < distMax) {
                        drawConnection(container, p1, p2);
                    }
                }
                ++i;
            }
        }
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity).events;
        if (!(events.onHover.enable && mouse.position)) {
            return false;
        }
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("connect", events.onHover.mode);
    }
    loadModeOptions(options, ...sources) {
        if (!options.connect) {
            options.connect = new _Options_Classes_Connect__WEBPACK_IMPORTED_MODULE_1__["Connect"]();
        }
        for (const source of sources) {
            options.connect.load(source === null || source === void 0 ? void 0 : source.connect);
        }
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/Connect.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/Connect.js ***!
  \**********************************************************************************************/
/*! exports provided: Connect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connect", function() { return Connect; });
/* harmony import */ var _ConnectLinks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConnectLinks */ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/ConnectLinks.js");

class Connect {
    constructor() {
        this.distance = 80;
        this.links = new _ConnectLinks__WEBPACK_IMPORTED_MODULE_0__["ConnectLinks"]();
        this.radius = 60;
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
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/ConnectLinks.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/ConnectLinks.js ***!
  \***************************************************************************************************/
/*! exports provided: ConnectLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectLinks", function() { return ConnectLinks; });
class ConnectLinks {
    constructor() {
        this.opacity = 0.5;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Interfaces/IConnect.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/Options/Interfaces/IConnect.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Interfaces/IConnectLinks.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/Options/Interfaces/IConnectLinks.js ***!
  \*******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-connect/esm/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-connect/esm/index.js ***!
  \****************************************************************************/
/*! exports provided: loadExternalConnectInteraction, Connect, ConnectLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalConnectInteraction", function() { return loadExternalConnectInteraction; });
/* harmony import */ var _Connector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Connector */ "./node_modules/tsparticles-interaction-external-connect/esm/Connector.js");
/* harmony import */ var _Options_Classes_Connect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Connect */ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/Connect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Connect", function() { return _Options_Classes_Connect__WEBPACK_IMPORTED_MODULE_1__["Connect"]; });

/* harmony import */ var _Options_Classes_ConnectLinks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/ConnectLinks */ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Classes/ConnectLinks.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConnectLinks", function() { return _Options_Classes_ConnectLinks__WEBPACK_IMPORTED_MODULE_2__["ConnectLinks"]; });

/* harmony import */ var _Options_Interfaces_IConnect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Options/Interfaces/IConnect */ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Interfaces/IConnect.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IConnectLinks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Options/Interfaces/IConnectLinks */ "./node_modules/tsparticles-interaction-external-connect/esm/Options/Interfaces/IConnectLinks.js");
/* empty/unused harmony star reexport */
async function loadExternalConnectInteraction(engine) {
    await engine.addInteractor("externalConnect", (container) => new _Connector__WEBPACK_IMPORTED_MODULE_0__["Connector"](container));
}






/***/ })

}]);