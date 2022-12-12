(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-particles-links"],{

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/CircleWarp.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/CircleWarp.js ***!
  \********************************************************************************/
/*! exports provided: CircleWarp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CircleWarp", function() { return CircleWarp; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class CircleWarp extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"] {
    constructor(x, y, radius, canvasSize) {
        super(x, y, radius);
        this.canvasSize = canvasSize;
        this.canvasSize = Object.assign({}, canvasSize);
    }
    contains(point) {
        if (super.contains(point)) {
            return true;
        }
        const posNE = {
            x: point.x - this.canvasSize.width,
            y: point.y,
        };
        if (super.contains(posNE)) {
            return true;
        }
        const posSE = {
            x: point.x - this.canvasSize.width,
            y: point.y - this.canvasSize.height,
        };
        if (super.contains(posSE)) {
            return true;
        }
        const posSW = {
            x: point.x,
            y: point.y - this.canvasSize.height,
        };
        return super.contains(posSW);
    }
    intersects(range) {
        if (super.intersects(range)) {
            return true;
        }
        const rect = range, circle = range, newPos = {
            x: range.position.x - this.canvasSize.width,
            y: range.position.y - this.canvasSize.height,
        };
        if (circle.radius !== undefined) {
            const biggerCircle = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](newPos.x, newPos.y, circle.radius * 2);
            return super.intersects(biggerCircle);
        }
        else if (rect.size !== undefined) {
            const rectSW = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Rectangle"](newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
            return super.intersects(rectSW);
        }
        return false;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/LinkInstance.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/LinkInstance.js ***!
  \**********************************************************************************/
/*! exports provided: LinkInstance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkInstance", function() { return LinkInstance; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-interaction-particles-links/esm/Utils.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");


function getLinkKey(ids) {
    ids.sort((a, b) => a - b);
    return ids.join("_");
}
function setLinkFrequency(particles, dictionary) {
    const key = getLinkKey(particles.map((t) => t.id));
    let res = dictionary.get(key);
    if (res === undefined) {
        res = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getRandom"])();
        dictionary.set(key, res);
    }
    return res;
}
class LinkInstance {
    constructor(container) {
        this.container = container;
        this._freqs = {
            links: new Map(),
            triangles: new Map(),
        };
    }
    drawParticle(context, particle) {
        var _a;
        const pOptions = particle.options;
        if (!particle.links || particle.links.length <= 0) {
            return;
        }
        const p1Links = particle.links.filter((l) => pOptions.links && this.getLinkFrequency(particle, l.destination) <= pOptions.links.frequency);
        for (const link of p1Links) {
            this.drawTriangles(pOptions, particle, link, p1Links);
            if (link.opacity > 0 && ((_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : 0) > 0) {
                this.drawLinkLine(particle, link);
            }
        }
    }
    async init() {
        this._freqs.links = new Map();
        this._freqs.triangles = new Map();
    }
    particleCreated(particle) {
        particle.links = [];
        if (!particle.options.links) {
            return;
        }
        const ratio = this.container.retina.pixelRatio;
        particle.retina.linksDistance = particle.options.links.distance * ratio;
        particle.retina.linksWidth = particle.options.links.width * ratio;
    }
    particleDestroyed(particle) {
        particle.links = [];
    }
    drawLinkLine(p1, link) {
        const container = this.container, options = container.actualOptions, p2 = link.destination, pos1 = p1.getPosition(), pos2 = p2.getPosition();
        let opacity = link.opacity;
        container.canvas.draw((ctx) => {
            var _a, _b, _c;
            if (!p1.options.links) {
                return;
            }
            let colorLine;
            const twinkle = (_a = p1.options.twinkle) === null || _a === void 0 ? void 0 : _a.lines;
            if (twinkle === null || twinkle === void 0 ? void 0 : twinkle.enable) {
                const twinkleFreq = twinkle.frequency, twinkleRgb = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["rangeColorToRgb"])(twinkle.color), twinkling = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getRandom"])() < twinkleFreq;
                if (twinkling && twinkleRgb) {
                    colorLine = twinkleRgb;
                    opacity = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getRangeValue"])(twinkle.opacity);
                }
            }
            if (!colorLine) {
                const linksOptions = p1.options.links, linkColor = (linksOptions === null || linksOptions === void 0 ? void 0 : linksOptions.id) !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;
                colorLine = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getLinkColor"])(p1, p2, linkColor);
            }
            if (!colorLine) {
                return;
            }
            const width = (_b = p1.retina.linksWidth) !== null && _b !== void 0 ? _b : 0, maxDistance = (_c = p1.retina.linksDistance) !== null && _c !== void 0 ? _c : 0;
            Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["drawLinkLine"])(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
        });
    }
    drawLinkTriangle(p1, link1, link2) {
        var _a;
        if (!p1.options.links) {
            return;
        }
        const container = this.container, options = container.actualOptions, p2 = link1.destination, p3 = link2.destination, triangleOptions = p1.options.links.triangles, opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;
        if (opacityTriangle <= 0) {
            return;
        }
        container.canvas.draw((ctx) => {
            var _a;
            const pos1 = p1.getPosition(), pos2 = p2.getPosition(), pos3 = p3.getPosition(), linksDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : 0;
            if (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getDistance"])(pos1, pos2) > linksDistance ||
                Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getDistance"])(pos3, pos2) > linksDistance ||
                Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getDistance"])(pos3, pos1) > linksDistance) {
                return;
            }
            let colorTriangle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["rangeColorToRgb"])(triangleOptions.color);
            if (!colorTriangle) {
                const linksOptions = p1.options.links, linkColor = (linksOptions === null || linksOptions === void 0 ? void 0 : linksOptions.id) !== undefined
                    ? container.particles.linksColors.get(linksOptions.id)
                    : container.particles.linksColor;
                colorTriangle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["getLinkColor"])(p1, p2, linkColor);
            }
            if (!colorTriangle) {
                return;
            }
            Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["drawLinkTriangle"])(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
        });
    }
    drawTriangles(options, p1, link, p1Links) {
        var _a, _b, _c;
        const p2 = link.destination;
        if (!(((_a = options.links) === null || _a === void 0 ? void 0 : _a.triangles.enable) && ((_b = p2.options.links) === null || _b === void 0 ? void 0 : _b.triangles.enable))) {
            return;
        }
        const vertices = (_c = p2.links) === null || _c === void 0 ? void 0 : _c.filter((t) => {
            const linkFreq = this.getLinkFrequency(p2, t.destination);
            return (p2.options.links &&
                linkFreq <= p2.options.links.frequency &&
                p1Links.findIndex((l) => l.destination === t.destination) >= 0);
        });
        if (!(vertices === null || vertices === void 0 ? void 0 : vertices.length)) {
            return;
        }
        for (const vertex of vertices) {
            const p3 = vertex.destination, triangleFreq = this.getTriangleFrequency(p1, p2, p3);
            if (triangleFreq > options.links.triangles.frequency) {
                continue;
            }
            this.drawLinkTriangle(p1, link, vertex);
        }
    }
    getLinkFrequency(p1, p2) {
        return setLinkFrequency([p1, p2], this._freqs.links);
    }
    getTriangleFrequency(p1, p2, p3) {
        return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Linker.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Linker.js ***!
  \****************************************************************************/
/*! exports provided: Linker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Linker", function() { return Linker; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _CircleWarp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CircleWarp */ "./node_modules/tsparticles-interaction-particles-links/esm/CircleWarp.js");
/* harmony import */ var _Options_Classes_Links__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/Links */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/Links.js");



function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
    let distance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos1, pos2);
    if (!warp || distance <= optDistance) {
        return distance;
    }
    const pos2NE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y,
    };
    distance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos1, pos2NE);
    if (distance <= optDistance) {
        return distance;
    }
    const pos2SE = {
        x: pos2.x - canvasSize.width,
        y: pos2.y - canvasSize.height,
    };
    distance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos1, pos2SE);
    if (distance <= optDistance) {
        return distance;
    }
    const pos2SW = {
        x: pos2.x,
        y: pos2.y - canvasSize.height,
    };
    distance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos1, pos2SW);
    return distance;
}
class Linker extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ParticlesInteractorBase"] {
    constructor(container) {
        super(container);
        this.linkContainer = container;
    }
    clear() {
    }
    init() {
        this.linkContainer.particles.linksColor = undefined;
        this.linkContainer.particles.linksColors = new Map();
    }
    async interact(p1) {
        var _a;
        if (!p1.options.links) {
            return;
        }
        p1.links = [];
        const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
        if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
            return;
        }
        const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : 0, warp = linkOpt1.warp, range = warp
            ? new _CircleWarp__WEBPACK_IMPORTED_MODULE_1__["CircleWarp"](pos1.x, pos1.y, optDistance, canvasSize)
            : new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Circle"](pos1.x, pos1.y, optDistance), query = container.particles.quadTree.query(range);
        for (const p2 of query) {
            const linkOpt2 = p2.options.links;
            if (p1 === p2 ||
                !(linkOpt2 === null || linkOpt2 === void 0 ? void 0 : linkOpt2.enable) ||
                linkOpt1.id !== linkOpt2.id ||
                p2.spawning ||
                p2.destroyed ||
                !p2.links ||
                p1.links.map((t) => t.destination).indexOf(p2) !== -1 ||
                p2.links.map((t) => t.destination).indexOf(p1) !== -1) {
                continue;
            }
            const pos2 = p2.getPosition();
            if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
                continue;
            }
            const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
            if (distance > optDistance) {
                return;
            }
            const opacityLine = (1 - distance / optDistance) * optOpacity;
            this.setColor(p1);
            p1.links.push({
                destination: p2,
                opacity: opacityLine,
            });
        }
    }
    isEnabled(particle) {
        var _a;
        return !!((_a = particle.options.links) === null || _a === void 0 ? void 0 : _a.enable);
    }
    loadParticlesOptions(options, ...sources) {
        var _a, _b;
        if (!options.links) {
            options.links = new _Options_Classes_Links__WEBPACK_IMPORTED_MODULE_2__["Links"]();
        }
        for (const source of sources) {
            options.links.load((_b = (_a = source === null || source === void 0 ? void 0 : source.links) !== null && _a !== void 0 ? _a : source === null || source === void 0 ? void 0 : source.lineLinked) !== null && _b !== void 0 ? _b : source === null || source === void 0 ? void 0 : source.line_linked);
        }
    }
    reset() {
    }
    setColor(p1) {
        if (!p1.options.links) {
            return;
        }
        const container = this.linkContainer, linksOptions = p1.options.links;
        let linkColor = linksOptions.id === undefined
            ? container.particles.linksColor
            : container.particles.linksColors.get(linksOptions.id);
        if (linkColor) {
            return;
        }
        const optColor = linksOptions.color;
        linkColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getLinkRandomColor"])(optColor, linksOptions.blink, linksOptions.consent);
        if (linksOptions.id === undefined) {
            container.particles.linksColor = linkColor;
        }
        else {
            container.particles.linksColors.set(linksOptions.id, linkColor);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/Links.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/Links.js ***!
  \*******************************************************************************************/
/*! exports provided: Links */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Links", function() { return Links; });
/* harmony import */ var _LinksShadow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinksShadow */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksShadow.js");
/* harmony import */ var _LinksTriangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LinksTriangle */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksTriangle.js");
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");



class Links {
    constructor() {
        this.blink = false;
        this.color = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__["OptionsColor"]();
        this.color.value = "#fff";
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.frequency = 1;
        this.opacity = 1;
        this.shadow = new _LinksShadow__WEBPACK_IMPORTED_MODULE_0__["LinksShadow"]();
        this.triangles = new _LinksTriangle__WEBPACK_IMPORTED_MODULE_1__["LinksTriangle"]();
        this.width = 1;
        this.warp = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.id !== undefined) {
            this.id = data.id;
        }
        if (data.blink !== undefined) {
            this.blink = data.blink;
        }
        this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_2__["OptionsColor"].create(this.color, data.color);
        if (data.consent !== undefined) {
            this.consent = data.consent;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        this.shadow.load(data.shadow);
        this.triangles.load(data.triangles);
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksShadow.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksShadow.js ***!
  \*************************************************************************************************/
/*! exports provided: LinksShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinksShadow", function() { return LinksShadow; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class LinksShadow {
    constructor() {
        this.blur = 5;
        this.color = new tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"]();
        this.color.value = "#000";
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.blur !== undefined) {
            this.blur = data.blur;
        }
        this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksTriangle.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksTriangle.js ***!
  \***************************************************************************************************/
/*! exports provided: LinksTriangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinksTriangle", function() { return LinksTriangle; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class LinksTriangle {
    constructor() {
        this.enable = false;
        this.frequency = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
            this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinks.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinks.js ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinksShadow.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinksShadow.js ***!
  \*****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinksTriangle.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinksTriangle.js ***!
  \*******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/Utils.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/Utils.js ***!
  \***************************************************************************/
/*! exports provided: drawLinkLine, drawLinkTriangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawLinkLine", function() { return drawLinkLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawLinkTriangle", function() { return drawLinkTriangle; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
    let drawn = false;
    if (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(begin, end) <= maxDistance) {
        Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["drawLine"])(context, begin, end);
        drawn = true;
    }
    else if (warp) {
        let pi1;
        let pi2;
        const endNE = {
            x: end.x - canvasSize.width,
            y: end.y,
        };
        const d1 = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(begin, endNE);
        if (d1.distance <= maxDistance) {
            const yi = begin.y - (d1.dy / d1.dx) * begin.x;
            pi1 = { x: 0, y: yi };
            pi2 = { x: canvasSize.width, y: yi };
        }
        else {
            const endSW = {
                x: end.x,
                y: end.y - canvasSize.height,
            };
            const d2 = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(begin, endSW);
            if (d2.distance <= maxDistance) {
                const yi = begin.y - (d2.dy / d2.dx) * begin.x;
                const xi = -yi / (d2.dy / d2.dx);
                pi1 = { x: xi, y: 0 };
                pi2 = { x: xi, y: canvasSize.height };
            }
            else {
                const endSE = {
                    x: end.x - canvasSize.width,
                    y: end.y - canvasSize.height,
                };
                const d3 = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(begin, endSE);
                if (d3.distance <= maxDistance) {
                    const yi = begin.y - (d3.dy / d3.dx) * begin.x;
                    const xi = -yi / (d3.dy / d3.dx);
                    pi1 = { x: xi, y: yi };
                    pi2 = { x: pi1.x + canvasSize.width, y: pi1.y + canvasSize.height };
                }
            }
        }
        if (pi1 && pi2) {
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["drawLine"])(context, begin, pi1);
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["drawLine"])(context, end, pi2);
            drawn = true;
        }
    }
    if (!drawn) {
        return;
    }
    context.lineWidth = width;
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    context.strokeStyle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromRgb"])(colorLine, opacity);
    if (shadow.enable) {
        const shadowColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["rangeColorToRgb"])(shadow.color);
        if (shadowColor) {
            context.shadowBlur = shadow.blur;
            context.shadowColor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromRgb"])(shadowColor);
        }
    }
    context.stroke();
}
function drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
    Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["drawTriangle"])(context, pos1, pos2, pos3);
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    context.fillStyle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromRgb"])(colorTriangle, opacityTriangle);
    context.fill();
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/index.js ***!
  \***************************************************************************/
/*! exports provided: loadParticlesLinksInteraction, Links, LinksShadow, LinksTriangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadParticlesLinksInteraction", function() { return loadParticlesLinksInteraction; });
/* harmony import */ var _interaction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interaction */ "./node_modules/tsparticles-interaction-particles-links/esm/interaction.js");
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin */ "./node_modules/tsparticles-interaction-particles-links/esm/plugin.js");
/* harmony import */ var _Options_Classes_Links__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Classes/Links */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/Links.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Links", function() { return _Options_Classes_Links__WEBPACK_IMPORTED_MODULE_2__["Links"]; });

/* harmony import */ var _Options_Classes_LinksShadow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Options/Classes/LinksShadow */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksShadow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinksShadow", function() { return _Options_Classes_LinksShadow__WEBPACK_IMPORTED_MODULE_3__["LinksShadow"]; });

/* harmony import */ var _Options_Classes_LinksTriangle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Options/Classes/LinksTriangle */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Classes/LinksTriangle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinksTriangle", function() { return _Options_Classes_LinksTriangle__WEBPACK_IMPORTED_MODULE_4__["LinksTriangle"]; });

/* harmony import */ var _Options_Interfaces_ILinks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Options/Interfaces/ILinks */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinks.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_ILinksShadow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Options/Interfaces/ILinksShadow */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinksShadow.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_ILinksTriangle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Options/Interfaces/ILinksTriangle */ "./node_modules/tsparticles-interaction-particles-links/esm/Options/Interfaces/ILinksTriangle.js");
/* empty/unused harmony star reexport */

async function loadParticlesLinksInteraction(engine) {
    await Object(_interaction__WEBPACK_IMPORTED_MODULE_0__["loadInteraction"])(engine);
    await Object(_plugin__WEBPACK_IMPORTED_MODULE_1__["loadPlugin"])(engine);
}








/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/interaction.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/interaction.js ***!
  \*********************************************************************************/
/*! exports provided: loadInteraction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadInteraction", function() { return loadInteraction; });
/* harmony import */ var _Linker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Linker */ "./node_modules/tsparticles-interaction-particles-links/esm/Linker.js");

async function loadInteraction(engine) {
    await engine.addInteractor("particlesLinks", (container) => new _Linker__WEBPACK_IMPORTED_MODULE_0__["Linker"](container));
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-links/esm/plugin.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-links/esm/plugin.js ***!
  \****************************************************************************/
/*! exports provided: loadPlugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPlugin", function() { return loadPlugin; });
/* harmony import */ var _LinkInstance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LinkInstance */ "./node_modules/tsparticles-interaction-particles-links/esm/LinkInstance.js");

class LinksPlugin {
    constructor() {
        this.id = "links";
    }
    getPlugin(container) {
        return new _LinkInstance__WEBPACK_IMPORTED_MODULE_0__["LinkInstance"](container);
    }
    loadOptions() {
    }
    needsPlugin() {
        return true;
    }
}
async function loadPlugin(engine) {
    const plugin = new LinksPlugin();
    await engine.addPlugin(plugin);
}


/***/ })

}]);