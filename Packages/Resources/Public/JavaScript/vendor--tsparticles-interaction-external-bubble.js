(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-bubble"],{

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Bubbler.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Bubbler.js ***!
  \*****************************************************************************/
/*! exports provided: Bubbler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bubbler", function() { return Bubbler; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Bubble */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/Bubble.js");


function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
    if (modeValue >= optionsValue) {
        const value = particleValue + (modeValue - optionsValue) * ratio;
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(value, particleValue, modeValue);
    }
    else if (modeValue < optionsValue) {
        const value = particleValue - (optionsValue - modeValue) * ratio;
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(value, modeValue, particleValue);
    }
}
class Bubbler extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
        if (!container.bubble) {
            container.bubble = {};
        }
        this.handleClickMode = (mode) => {
            if (mode !== "bubble") {
                return;
            }
            if (!container.bubble) {
                container.bubble = {};
            }
            container.bubble.clicking = true;
        };
    }
    clear(particle, delta, force) {
        if (particle.bubble.inRange && !force) {
            return;
        }
        delete particle.bubble.div;
        delete particle.bubble.opacity;
        delete particle.bubble.radius;
        delete particle.bubble.color;
    }
    init() {
        const container = this.container, bubble = container.actualOptions.interactivity.modes.bubble;
        if (!bubble) {
            return;
        }
        container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;
        if (bubble.size !== undefined) {
            container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
        }
    }
    async interact(delta) {
        const options = this.container.actualOptions, events = options.interactivity.events, onHover = events.onHover, onClick = events.onClick, hoverEnabled = onHover.enable, hoverMode = onHover.mode, clickEnabled = onClick.enable, clickMode = onClick.mode, divs = events.onDiv;
        if (hoverEnabled && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("bubble", hoverMode)) {
            this.hoverBubble(delta);
        }
        else if (clickEnabled && Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("bubble", clickMode)) {
            this.clickBubble(delta);
        }
        else {
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["divModeExecute"])("bubble", divs, (selector, div) => this.singleSelectorHover(delta, selector, div));
        }
    }
    isEnabled(particle) {
        var _a;
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events, divs = events.onDiv, divBubble = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isDivModeEnabled"])("bubble", divs);
        if (!(divBubble || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;
        return Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("bubble", hoverMode) || Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])("bubble", clickMode) || divBubble;
    }
    loadModeOptions(options, ...sources) {
        if (!options.bubble) {
            options.bubble = new _Options_Classes_Bubble__WEBPACK_IMPORTED_MODULE_1__["Bubble"]();
        }
        for (const source of sources) {
            options.bubble.load(source === null || source === void 0 ? void 0 : source.bubble);
        }
    }
    reset(particle) {
        particle.bubble.inRange = false;
    }
    clickBubble(delta) {
        var _a, _b;
        const container = this.container, options = container.actualOptions, mouseClickPos = container.interactivity.mouse.clickPosition, bubble = options.interactivity.modes.bubble;
        if (!bubble || !mouseClickPos) {
            return;
        }
        if (!container.bubble) {
            container.bubble = {};
        }
        const distance = container.retina.bubbleModeDistance;
        if (!distance || distance < 0) {
            return;
        }
        const query = container.particles.quadTree.queryCircle(mouseClickPos, distance, (p) => this.isEnabled(p));
        for (const particle of query) {
            if (!container.bubble.clicking) {
                continue;
            }
            particle.bubble.inRange = !container.bubble.durationEnd;
            const pos = particle.getPosition(), distMouse = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos, mouseClickPos), timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;
            if (timeSpent > bubble.duration) {
                container.bubble.durationEnd = true;
            }
            if (timeSpent > bubble.duration * 2) {
                container.bubble.clicking = false;
                container.bubble.durationEnd = false;
            }
            const sizeData = {
                bubbleObj: {
                    optValue: container.retina.bubbleModeSize,
                    value: particle.bubble.radius,
                },
                particlesObj: {
                    optValue: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(particle.options.size.value) * container.retina.pixelRatio,
                    value: particle.size.value,
                },
                type: "size",
            };
            this.process(particle, distMouse, timeSpent, sizeData);
            const opacityData = {
                bubbleObj: {
                    optValue: bubble.opacity,
                    value: particle.bubble.opacity,
                },
                particlesObj: {
                    optValue: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(particle.options.opacity.value),
                    value: (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1,
                },
                type: "opacity",
            };
            this.process(particle, distMouse, timeSpent, opacityData);
            if (!container.bubble.durationEnd) {
                if (distMouse <= distance) {
                    this.hoverBubbleColor(particle, distMouse);
                }
                else {
                    delete particle.bubble.color;
                }
            }
            else {
                delete particle.bubble.color;
            }
        }
    }
    hoverBubble(delta) {
        const container = this.container, mousePos = container.interactivity.mouse.position, distance = container.retina.bubbleModeDistance;
        if (!distance || distance < 0 || mousePos === undefined) {
            return;
        }
        const query = container.particles.quadTree.queryCircle(mousePos, distance, (p) => this.isEnabled(p));
        for (const particle of query) {
            particle.bubble.inRange = true;
            const pos = particle.getPosition(), pointDistance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos, mousePos), ratio = 1 - pointDistance / distance;
            if (pointDistance <= distance) {
                if (ratio >= 0 && container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["mouseMoveEvent"]) {
                    this.hoverBubbleSize(particle, ratio);
                    this.hoverBubbleOpacity(particle, ratio);
                    this.hoverBubbleColor(particle, ratio);
                }
            }
            else {
                this.reset(particle);
            }
            if (container.interactivity.status === tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["mouseLeaveEvent"]) {
                this.reset(particle);
            }
        }
    }
    hoverBubbleColor(particle, ratio, divBubble) {
        const options = this.container.actualOptions;
        const bubbleOptions = divBubble !== null && divBubble !== void 0 ? divBubble : options.interactivity.modes.bubble;
        if (!bubbleOptions) {
            return;
        }
        if (!particle.bubble.finalColor) {
            const modeColor = bubbleOptions.color;
            if (!modeColor) {
                return;
            }
            const bubbleColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromSingleOrMultiple"])(modeColor);
            particle.bubble.finalColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rangeColorToHsl"])(bubbleColor);
        }
        if (!particle.bubble.finalColor) {
            return;
        }
        if (bubbleOptions.mix) {
            particle.bubble.color = undefined;
            const pColor = particle.getFillColor();
            particle.bubble.color = pColor
                ? Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rgbToHsl"])(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["colorMix"])(pColor, particle.bubble.finalColor, 1 - ratio, ratio))
                : particle.bubble.finalColor;
        }
        else {
            particle.bubble.color = particle.bubble.finalColor;
        }
    }
    hoverBubbleOpacity(particle, ratio, divBubble) {
        var _a, _b, _c, _d;
        const container = this.container, options = container.actualOptions, modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : (_b = options.interactivity.modes.bubble) === null || _b === void 0 ? void 0 : _b.opacity;
        if (!modeOpacity) {
            return;
        }
        const optOpacity = particle.options.opacity.value;
        const pOpacity = (_d = (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1;
        const opacity = calculateBubbleValue(pOpacity, modeOpacity, Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(optOpacity), ratio);
        if (opacity !== undefined) {
            particle.bubble.opacity = opacity;
        }
    }
    hoverBubbleSize(particle, ratio, divBubble) {
        const container = this.container, modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;
        if (modeSize === undefined) {
            return;
        }
        const optSize = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(particle.options.size.value) * container.retina.pixelRatio;
        const pSize = particle.size.value;
        const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
        if (size !== undefined) {
            particle.bubble.radius = size;
        }
    }
    process(particle, distMouse, timeSpent, data) {
        const container = this.container, bubbleParam = data.bubbleObj.optValue, options = container.actualOptions, bubble = options.interactivity.modes.bubble;
        if (!bubble || bubbleParam === undefined) {
            return;
        }
        const bubbleDuration = bubble.duration, bubbleDistance = container.retina.bubbleModeDistance, particlesParam = data.particlesObj.optValue, pObjBubble = data.bubbleObj.value, pObj = data.particlesObj.value || 0, type = data.type;
        if (!bubbleDistance || bubbleDistance < 0 || bubbleParam === particlesParam) {
            return;
        }
        if (!container.bubble) {
            container.bubble = {};
        }
        if (!container.bubble.durationEnd) {
            if (distMouse <= bubbleDistance) {
                const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;
                if (obj !== bubbleParam) {
                    const value = pObj - (timeSpent * (pObj - bubbleParam)) / bubbleDuration;
                    if (type === "size") {
                        particle.bubble.radius = value;
                    }
                    if (type === "opacity") {
                        particle.bubble.opacity = value;
                    }
                }
            }
            else {
                if (type === "size") {
                    delete particle.bubble.radius;
                }
                if (type === "opacity") {
                    delete particle.bubble.opacity;
                }
            }
        }
        else if (pObjBubble) {
            if (type === "size") {
                delete particle.bubble.radius;
            }
            if (type === "opacity") {
                delete particle.bubble.opacity;
            }
        }
    }
    singleSelectorHover(delta, selector, div) {
        const container = this.container, selectors = document.querySelectorAll(selector), bubble = container.actualOptions.interactivity.modes.bubble;
        if (!bubble || !selectors.length) {
            return;
        }
        selectors.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, repulseRadius = (elem.offsetWidth / 2) * pxRatio, area = div.type === "circle"
                ? new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](pos.x, pos.y, repulseRadius)
                : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Rectangle"](elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), query = container.particles.quadTree.query(area, (p) => this.isEnabled(p));
            for (const particle of query) {
                if (!area.contains(particle.getPosition())) {
                    continue;
                }
                particle.bubble.inRange = true;
                const divs = bubble.divs;
                const divBubble = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["divMode"])(divs, elem);
                if (!particle.bubble.div || particle.bubble.div !== elem) {
                    this.clear(particle, delta, true);
                    particle.bubble.div = elem;
                }
                this.hoverBubbleSize(particle, 1, divBubble);
                this.hoverBubbleOpacity(particle, 1, divBubble);
                this.hoverBubbleColor(particle, 1, divBubble);
            }
        });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/Bubble.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/Bubble.js ***!
  \********************************************************************************************/
/*! exports provided: Bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bubble", function() { return Bubble; });
/* harmony import */ var _BubbleBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BubbleBase */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleBase.js");
/* harmony import */ var _BubbleDiv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BubbleDiv */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleDiv.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");



class Bubble extends _BubbleBase__WEBPACK_IMPORTED_MODULE_0__["BubbleBase"] {
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        this.divs = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__["executeOnSingleOrMultiple"])(data.divs, (div) => {
            const tmp = new _BubbleDiv__WEBPACK_IMPORTED_MODULE_1__["BubbleDiv"]();
            tmp.load(div);
            return tmp;
        });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleBase.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleBase.js ***!
  \************************************************************************************************/
/*! exports provided: BubbleBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BubbleBase", function() { return BubbleBase; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class BubbleBase {
    constructor() {
        this.distance = 200;
        this.duration = 0.4;
        this.mix = false;
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
        if (data.mix !== undefined) {
            this.mix = data.mix;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.color !== undefined) {
            const sourceColor = this.color instanceof Array ? undefined : this.color;
            this.color = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(data.color, (color) => {
                return tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(sourceColor, color);
            });
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleDiv.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleDiv.js ***!
  \***********************************************************************************************/
/*! exports provided: BubbleDiv */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BubbleDiv", function() { return BubbleDiv; });
/* harmony import */ var _BubbleBase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BubbleBase */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleBase.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


class BubbleDiv extends _BubbleBase__WEBPACK_IMPORTED_MODULE_0__["BubbleBase"] {
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

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubble.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubble.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubbleBase.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubbleBase.js ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubbleDiv.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubbleDiv.js ***!
  \***************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-bubble/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-bubble/esm/index.js ***!
  \***************************************************************************/
/*! exports provided: loadExternalBubbleInteraction, BubbleBase, BubbleDiv, Bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalBubbleInteraction", function() { return loadExternalBubbleInteraction; });
/* harmony import */ var _Bubbler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bubbler */ "./node_modules/tsparticles-interaction-external-bubble/esm/Bubbler.js");
/* harmony import */ var _Options_Classes_BubbleBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/BubbleBase */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BubbleBase", function() { return _Options_Classes_BubbleBase__WEBPACK_IMPORTED_MODULE_1__["BubbleBase"]; });

/* harmony import */ var _Options_Classes_BubbleDiv__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/BubbleDiv */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/BubbleDiv.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BubbleDiv", function() { return _Options_Classes_BubbleDiv__WEBPACK_IMPORTED_MODULE_2__["BubbleDiv"]; });

/* harmony import */ var _Options_Classes_Bubble__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Options/Classes/Bubble */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Classes/Bubble.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Bubble", function() { return _Options_Classes_Bubble__WEBPACK_IMPORTED_MODULE_3__["Bubble"]; });

/* harmony import */ var _Options_Interfaces_IBubbleBase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Options/Interfaces/IBubbleBase */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubbleBase.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IBubbleDiv__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Options/Interfaces/IBubbleDiv */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubbleDiv.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IBubble__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Options/Interfaces/IBubble */ "./node_modules/tsparticles-interaction-external-bubble/esm/Options/Interfaces/IBubble.js");
/* empty/unused harmony star reexport */
async function loadExternalBubbleInteraction(engine) {
    await engine.addInteractor("externalBubble", (container) => new _Bubbler__WEBPACK_IMPORTED_MODULE_0__["Bubbler"](container));
}








/***/ })

}]);