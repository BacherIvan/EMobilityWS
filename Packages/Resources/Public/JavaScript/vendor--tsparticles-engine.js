(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-engine"],{

/***/ "./node_modules/tsparticles-engine/esm/Core/Canvas.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Canvas.js ***!
  \************************************************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/CanvasUtils */ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");




function setTransformValue(factor, newFactor, key) {
    var _a;
    const newValue = newFactor[key];
    if (newValue !== undefined) {
        factor[key] = ((_a = factor[key]) !== null && _a !== void 0 ? _a : 1) * newValue;
    }
}
class Canvas {
    constructor(container) {
        this.container = container;
        this.size = {
            height: 0,
            width: 0,
        };
        this._context = null;
        this._generated = false;
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
        this._mutationObserver =
            !Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["isSsr"])() && typeof MutationObserver !== "undefined"
                ? new MutationObserver((records) => {
                    for (const record of records) {
                        if (record.type === "attributes" && record.attributeName === "style") {
                            this._repairStyle();
                        }
                    }
                })
                : undefined;
    }
    get _fullScreen() {
        return this.container.actualOptions.fullScreen.enable;
    }
    clear() {
        const options = this.container.actualOptions, trail = options.particles.move.trail;
        if (options.backgroundMask.enable) {
            this.paint();
        }
        else if (trail.enable && trail.length > 0 && this._trailFillColor) {
            this._paintBase(Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["getStyleFromRgb"])(this._trailFillColor, 1 / trail.length));
        }
        else {
            this.draw((ctx) => {
                Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__["clear"])(ctx, this.size);
            });
        }
    }
    destroy() {
        var _a, _b;
        (_a = this._mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        if (this._generated) {
            (_b = this.element) === null || _b === void 0 ? void 0 : _b.remove();
        }
        else {
            this._resetOriginalStyle();
        }
        this.draw((ctx) => {
            Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__["clear"])(ctx, this.size);
        });
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        this._resizePlugins = [];
        this._colorPlugins = [];
    }
    draw(cb) {
        if (!this._context) {
            return;
        }
        return cb(this._context);
    }
    drawParticle(particle, delta) {
        var _a;
        if (particle.spawning || particle.destroyed) {
            return;
        }
        const radius = particle.getRadius();
        if (radius <= 0) {
            return;
        }
        const pfColor = particle.getFillColor(), psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;
        let [fColor, sColor] = this._getPluginParticleColors(particle);
        if (!fColor) {
            fColor = pfColor;
        }
        if (!sColor) {
            sColor = psColor;
        }
        if (!fColor && !sColor) {
            return;
        }
        this.draw((ctx) => {
            var _a, _b, _c, _d, _e;
            const options = this.container.actualOptions, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, opacity = (_c = (_a = particle.bubble.opacity) !== null && _a !== void 0 ? _a : (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1, strokeOpacity = (_e = (_d = particle.stroke) === null || _d === void 0 ? void 0 : _d.opacity) !== null && _e !== void 0 ? _e : opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor, transform = {}, colorStyles = {
                fill: fColor ? Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["getStyleFromHsl"])(fColor, zOpacity) : undefined,
            };
            colorStyles.stroke = sColor ? Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["getStyleFromHsl"])(sColor, zStrokeOpacity) : colorStyles.fill;
            this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
            Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__["drawParticle"])({
                container: this.container,
                context: ctx,
                particle,
                delta,
                colorStyles,
                backgroundMask: options.backgroundMask.enable,
                composite: options.backgroundMask.composite,
                radius: radius * (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
                opacity: zOpacity,
                shadow: particle.options.shadow,
                transform,
            });
            this._applyPostDrawUpdaters(particle);
        });
    }
    drawParticlePlugin(plugin, particle, delta) {
        this.draw((ctx) => {
            Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__["drawParticlePlugin"])(ctx, plugin, particle, delta);
        });
    }
    drawPlugin(plugin, delta) {
        this.draw((ctx) => {
            Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__["drawPlugin"])(ctx, plugin, delta);
        });
    }
    init() {
        var _a;
        this.resize();
        this._initStyle();
        this._initCover();
        this._initTrail();
        this.initBackground();
        if (this.element) {
            (_a = this._mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.element, { attributes: true });
        }
        this.initUpdaters();
        this.initPlugins();
        this.paint();
    }
    initBackground() {
        const options = this.container.actualOptions, background = options.background, element = this.element, elementStyle = element === null || element === void 0 ? void 0 : element.style;
        if (!elementStyle) {
            return;
        }
        if (background.color) {
            const color = Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["rangeColorToRgb"])(background.color);
            elementStyle.backgroundColor = color ? Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["getStyleFromRgb"])(color, background.opacity) : "";
        }
        else {
            elementStyle.backgroundColor = "";
        }
        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
    }
    initPlugins() {
        this._resizePlugins = [];
        for (const [, plugin] of this.container.plugins) {
            if (plugin.resize) {
                this._resizePlugins.push(plugin);
            }
            if (plugin.particleFillColor || plugin.particleStrokeColor) {
                this._colorPlugins.push(plugin);
            }
        }
    }
    initUpdaters() {
        this._preDrawUpdaters = [];
        this._postDrawUpdaters = [];
        for (const updater of this.container.particles.updaters) {
            if (updater.afterDraw) {
                this._postDrawUpdaters.push(updater);
            }
            if (updater.getColorStyles || updater.getTransformValues || updater.beforeDraw) {
                this._preDrawUpdaters.push(updater);
            }
        }
    }
    loadCanvas(canvas) {
        var _a, _b;
        if (this._generated) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this._generated =
            canvas.dataset && _Utils_Constants__WEBPACK_IMPORTED_MODULE_3__["generatedAttribute"] in canvas.dataset
                ? canvas.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_3__["generatedAttribute"]] === "true"
                : this._generated;
        this.element = canvas;
        this.element.ariaHidden = "true";
        this._originalStyle = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["deepExtend"])({}, this.element.style);
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;
        this._context = this.element.getContext("2d");
        (_b = this._mutationObserver) === null || _b === void 0 ? void 0 : _b.observe(this.element, { attributes: true });
        this.container.retina.init();
        this.initBackground();
    }
    paint() {
        const options = this.container.actualOptions;
        this.draw((ctx) => {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__["clear"])(ctx, this.size);
                this._paintBase(this._coverColorStyle);
            }
            else {
                this._paintBase();
            }
        });
    }
    resize() {
        if (!this.element) {
            return;
        }
        const container = this.container, pxRatio = container.retina.pixelRatio, size = container.canvas.size, newSize = {
            width: this.element.offsetWidth * pxRatio,
            height: this.element.offsetHeight * pxRatio,
        };
        if (newSize.height === size.height &&
            newSize.width === size.width &&
            newSize.height === this.element.height &&
            newSize.width === this.element.width) {
            return;
        }
        const oldSize = Object.assign({}, size);
        this.element.width = size.width = this.element.offsetWidth * pxRatio;
        this.element.height = size.height = this.element.offsetHeight * pxRatio;
        if (this.container.started) {
            this.resizeFactor = {
                width: size.width / oldSize.width,
                height: size.height / oldSize.height,
            };
        }
    }
    async windowResize() {
        if (!this.element) {
            return;
        }
        this.resize();
        const container = this.container, needsRefresh = container.updateActualOptions();
        container.particles.setDensity();
        this._applyResizePlugins();
        if (needsRefresh) {
            await container.refresh();
        }
    }
    _applyPostDrawUpdaters(particle) {
        var _a;
        for (const updater of this._postDrawUpdaters) {
            (_a = updater.afterDraw) === null || _a === void 0 ? void 0 : _a.call(updater, particle);
        }
    }
    _applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform) {
        var _a;
        for (const updater of this._preDrawUpdaters) {
            if (updater.getColorStyles) {
                const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
                if (fill) {
                    colorStyles.fill = fill;
                }
                if (stroke) {
                    colorStyles.stroke = stroke;
                }
            }
            if (updater.getTransformValues) {
                const updaterTransform = updater.getTransformValues(particle);
                for (const key in updaterTransform) {
                    setTransformValue(transform, updaterTransform, key);
                }
            }
            (_a = updater.beforeDraw) === null || _a === void 0 ? void 0 : _a.call(updater, particle);
        }
    }
    _applyResizePlugins() {
        for (const plugin of this._resizePlugins) {
            if (plugin.resize) {
                plugin.resize();
            }
        }
    }
    _getPluginParticleColors(particle) {
        let fColor, sColor;
        for (const plugin of this._colorPlugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["rangeColorToHsl"])(plugin.particleFillColor(particle));
            }
            if (!sColor && plugin.particleStrokeColor) {
                sColor = Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["rangeColorToHsl"])(plugin.particleStrokeColor(particle));
            }
            if (fColor && sColor) {
                break;
            }
        }
        return [fColor, sColor];
    }
    _initCover() {
        const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color, coverRgb = Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["rangeColorToRgb"])(color);
        if (coverRgb) {
            const coverColor = {
                r: coverRgb.r,
                g: coverRgb.g,
                b: coverRgb.b,
                a: cover.opacity,
            };
            this._coverColorStyle = Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["getStyleFromRgb"])(coverColor, coverColor.a);
        }
    }
    _initStyle() {
        const element = this.element, options = this.container.actualOptions;
        if (!element) {
            return;
        }
        if (this._fullScreen) {
            this._originalStyle = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["deepExtend"])({}, element.style);
            this._setFullScreenStyle();
        }
        else {
            this._resetOriginalStyle();
        }
        for (const key in options.style) {
            if (!key || !options.style) {
                continue;
            }
            const value = options.style[key];
            if (!value) {
                continue;
            }
            element.style.setProperty(key, value, "important");
        }
    }
    _initTrail() {
        const options = this.container.actualOptions, trail = options.particles.move.trail, fillColor = Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["rangeColorToRgb"])(trail.fillColor);
        if (fillColor) {
            const trail = options.particles.move.trail;
            this._trailFillColor = Object.assign(Object.assign({}, fillColor), { a: 1 / trail.length });
        }
    }
    _paintBase(baseColor) {
        this.draw((ctx) => {
            Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_0__["paintBase"])(ctx, this.size, baseColor);
        });
    }
    _repairStyle() {
        var _a, _b;
        const element = this.element;
        if (!element) {
            return;
        }
        (_a = this._mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
        this._initStyle();
        this.initBackground();
        (_b = this._mutationObserver) === null || _b === void 0 ? void 0 : _b.observe(element, { attributes: true });
    }
    _resetOriginalStyle() {
        const element = this.element, originalStyle = this._originalStyle;
        if (!(element && originalStyle)) {
            return;
        }
        element.style.position = originalStyle.position;
        element.style.zIndex = originalStyle.zIndex;
        element.style.top = originalStyle.top;
        element.style.left = originalStyle.left;
        element.style.width = originalStyle.width;
        element.style.height = originalStyle.height;
    }
    _setFullScreenStyle() {
        const element = this.element;
        if (!element) {
            return;
        }
        const priority = "important";
        element.style.setProperty("position", "fixed", priority);
        element.style.setProperty("z-index", this.container.actualOptions.fullScreen.zIndex.toString(10), priority);
        element.style.setProperty("top", "0", priority);
        element.style.setProperty("left", "0", priority);
        element.style.setProperty("width", "100%", priority);
        element.style.setProperty("height", "100%", priority);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Container.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Container.js ***!
  \***************************************************************/
/*! exports provided: Container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Container", function() { return Container; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas */ "./node_modules/tsparticles-engine/esm/Core/Canvas.js");
/* harmony import */ var _Utils_EventListeners__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/EventListeners */ "./node_modules/tsparticles-engine/esm/Core/Utils/EventListeners.js");
/* harmony import */ var _Utils_FrameManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/FrameManager */ "./node_modules/tsparticles-engine/esm/Core/Utils/FrameManager.js");
/* harmony import */ var _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Options/Classes/Options */ "./node_modules/tsparticles-engine/esm/Options/Classes/Options.js");
/* harmony import */ var _Particles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Particles */ "./node_modules/tsparticles-engine/esm/Core/Particles.js");
/* harmony import */ var _Retina__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Retina */ "./node_modules/tsparticles-engine/esm/Core/Retina.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Utils/OptionsUtils */ "./node_modules/tsparticles-engine/esm/Utils/OptionsUtils.js");









function guardCheck(container) {
    return container && !container.destroyed;
}
function loadContainerOptions(engine, container, ...sourceOptionsArr) {
    const options = new _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_4__["Options"](engine, container);
    Object(_Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_8__["loadOptions"])(options, ...sourceOptionsArr);
    return options;
}
const defaultPathGeneratorKey = "default", defaultPathGenerator = {
    generate: (p) => {
        const v = p.velocity.copy();
        v.angle += (v.length * Math.PI) / 180;
        return v;
    },
    init: () => {
    },
    update: () => {
    },
    reset: () => {
    },
};
class Container {
    constructor(engine, id, sourceOptions) {
        this.id = id;
        this._engine = engine;
        this.fpsLimit = 120;
        this.smooth = false;
        this._delay = 0;
        this.duration = 0;
        this.lifeTime = 0;
        this._firstStart = true;
        this.started = false;
        this.destroyed = false;
        this._paused = true;
        this.lastFrameTime = 0;
        this.zLayers = 100;
        this.pageHidden = false;
        this._sourceOptions = sourceOptions;
        this._initialSourceOptions = sourceOptions;
        this.retina = new _Retina__WEBPACK_IMPORTED_MODULE_6__["Retina"](this);
        this.canvas = new _Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"](this);
        this.particles = new _Particles__WEBPACK_IMPORTED_MODULE_5__["Particles"](this._engine, this);
        this.frameManager = new _Utils_FrameManager__WEBPACK_IMPORTED_MODULE_3__["FrameManager"](this);
        this.pathGenerators = new Map();
        this.interactivity = {
            mouse: {
                clicking: false,
                inside: false,
            },
        };
        this.plugins = new Map();
        this.drawers = new Map();
        this._options = loadContainerOptions(this._engine, this);
        this.actualOptions = loadContainerOptions(this._engine, this);
        this._eventListeners = new _Utils_EventListeners__WEBPACK_IMPORTED_MODULE_2__["EventListeners"](this);
        if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
            this._intersectionObserver = new IntersectionObserver((entries) => this._intersectionManager(entries));
        }
        this._engine.dispatchEvent("containerBuilt", { container: this });
    }
    get options() {
        return this._options;
    }
    get sourceOptions() {
        return this._sourceOptions;
    }
    addClickHandler(callback) {
        if (!guardCheck(this)) {
            return;
        }
        const el = this.interactivity.element;
        if (!el) {
            return;
        }
        const clickOrTouchHandler = (e, pos, radius) => {
            if (!guardCheck(this)) {
                return;
            }
            const pxRatio = this.retina.pixelRatio, posRetina = {
                x: pos.x * pxRatio,
                y: pos.y * pxRatio,
            }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
            callback(e, particles);
        };
        const clickHandler = (e) => {
            if (!guardCheck(this)) {
                return;
            }
            const mouseEvent = e, pos = {
                x: mouseEvent.offsetX || mouseEvent.clientX,
                y: mouseEvent.offsetY || mouseEvent.clientY,
            };
            clickOrTouchHandler(e, pos, 1);
        };
        const touchStartHandler = () => {
            if (!guardCheck(this)) {
                return;
            }
            touched = true;
            touchMoved = false;
        };
        const touchMoveHandler = () => {
            if (!guardCheck(this)) {
                return;
            }
            touchMoved = true;
        };
        const touchEndHandler = (e) => {
            if (!guardCheck(this)) {
                return;
            }
            if (touched && !touchMoved) {
                const touchEvent = e;
                let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
                if (!lastTouch) {
                    lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
                    if (!lastTouch) {
                        return;
                    }
                }
                const element = this.canvas.element, canvasRect = element ? element.getBoundingClientRect() : undefined, pos = {
                    x: lastTouch.clientX - (canvasRect ? canvasRect.left : 0),
                    y: lastTouch.clientY - (canvasRect ? canvasRect.top : 0),
                };
                clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
            }
            touched = false;
            touchMoved = false;
        };
        const touchCancelHandler = () => {
            if (!guardCheck(this)) {
                return;
            }
            touched = false;
            touchMoved = false;
        };
        let touched = false, touchMoved = false;
        el.addEventListener("click", clickHandler);
        el.addEventListener("touchstart", touchStartHandler);
        el.addEventListener("touchmove", touchMoveHandler);
        el.addEventListener("touchend", touchEndHandler);
        el.addEventListener("touchcancel", touchCancelHandler);
    }
    addPath(key, generator, override = false) {
        if (!guardCheck(this) || (!override && this.pathGenerators.has(key))) {
            return false;
        }
        this.pathGenerators.set(key, generator !== null && generator !== void 0 ? generator : defaultPathGenerator);
        return true;
    }
    destroy() {
        if (!guardCheck(this)) {
            return;
        }
        this.stop();
        this.particles.destroy();
        this.canvas.destroy();
        for (const [, drawer] of this.drawers) {
            if (drawer.destroy) {
                drawer.destroy(this);
            }
        }
        for (const key of this.drawers.keys()) {
            this.drawers.delete(key);
        }
        this._engine.plugins.destroy(this);
        this.destroyed = true;
        const mainArr = this._engine.dom(), idx = mainArr.findIndex((t) => t === this);
        if (idx >= 0) {
            mainArr.splice(idx, 1);
        }
        this._engine.dispatchEvent("containerDestroyed", { container: this });
    }
    draw(force) {
        if (!guardCheck(this)) {
            return;
        }
        let refreshTime = force;
        this._drawAnimationFrame = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["animate"])()(async (timestamp) => {
            if (refreshTime) {
                this.lastFrameTime = undefined;
                refreshTime = false;
            }
            await this.frameManager.nextFrame(timestamp);
        });
    }
    exportConfiguration() {
        return JSON.stringify(this.actualOptions, (key, value) => {
            if (key === "_engine" || key === "_container") {
                return;
            }
            return value;
        }, 2);
    }
    exportImage(callback, type, quality) {
        const element = this.canvas.element;
        if (element) {
            element.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
        }
    }
    exportImg(callback) {
        this.exportImage(callback);
    }
    getAnimationStatus() {
        return !this._paused && !this.pageHidden && guardCheck(this);
    }
    handleClickMode(mode) {
        if (!guardCheck(this)) {
            return;
        }
        this.particles.handleClickMode(mode);
        for (const [, plugin] of this.plugins) {
            if (plugin.handleClickMode) {
                plugin.handleClickMode(mode);
            }
        }
    }
    async init() {
        if (!guardCheck(this)) {
            return;
        }
        const shapes = this._engine.plugins.getSupportedShapes();
        for (const type of shapes) {
            const drawer = this._engine.plugins.getShapeDrawer(type);
            if (drawer) {
                this.drawers.set(type, drawer);
            }
        }
        this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
        this.actualOptions = loadContainerOptions(this._engine, this, this._options);
        const availablePlugins = this._engine.plugins.getAvailablePlugins(this);
        for (const [id, plugin] of availablePlugins) {
            this.plugins.set(id, plugin);
        }
        this.retina.init();
        this.canvas.init();
        this.updateActualOptions();
        this.canvas.initBackground();
        this.canvas.resize();
        this.zLayers = this.actualOptions.zLayers;
        this.duration = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_7__["getRangeValue"])(this.actualOptions.duration) * 1000;
        this._delay = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_7__["getRangeValue"])(this.actualOptions.delay) * 1000;
        this.lifeTime = 0;
        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
        this.smooth = this.actualOptions.smooth;
        for (const [, drawer] of this.drawers) {
            if (drawer.init) {
                await drawer.init(this);
            }
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.init) {
                await plugin.init();
            }
        }
        this._engine.dispatchEvent("containerInit", { container: this });
        this.particles.init();
        this.particles.setDensity();
        for (const [, plugin] of this.plugins) {
            if (plugin.particlesSetup) {
                plugin.particlesSetup();
            }
        }
        this._engine.dispatchEvent("particlesSetup", { container: this });
    }
    async loadTheme(name) {
        if (!guardCheck(this)) {
            return;
        }
        this._currentTheme = name;
        await this.refresh();
    }
    pause() {
        if (!guardCheck(this)) {
            return;
        }
        if (this._drawAnimationFrame !== undefined) {
            Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["cancelAnimation"])()(this._drawAnimationFrame);
            delete this._drawAnimationFrame;
        }
        if (this._paused) {
            return;
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.pause) {
                plugin.pause();
            }
        }
        if (!this.pageHidden) {
            this._paused = true;
        }
        this._engine.dispatchEvent("containerPaused", { container: this });
    }
    play(force) {
        if (!guardCheck(this)) {
            return;
        }
        const needsUpdate = this._paused || force;
        if (this._firstStart && !this.actualOptions.autoPlay) {
            this._firstStart = false;
            return;
        }
        if (this._paused) {
            this._paused = false;
        }
        if (needsUpdate) {
            for (const [, plugin] of this.plugins) {
                if (plugin.play) {
                    plugin.play();
                }
            }
        }
        this._engine.dispatchEvent("containerPlay", { container: this });
        this.draw(needsUpdate || false);
    }
    async refresh() {
        if (!guardCheck(this)) {
            return;
        }
        this.stop();
        return this.start();
    }
    async reset() {
        if (!guardCheck(this)) {
            return;
        }
        this._options = loadContainerOptions(this._engine, this);
        return this.refresh();
    }
    setNoise(noiseOrGenerator, init, update) {
        if (!guardCheck(this)) {
            return;
        }
        this.setPath(noiseOrGenerator, init, update);
    }
    setPath(pathOrGenerator, init, update) {
        if (!pathOrGenerator || !guardCheck(this)) {
            return;
        }
        const pathGenerator = Object.assign({}, defaultPathGenerator);
        if (typeof pathOrGenerator === "function") {
            pathGenerator.generate = pathOrGenerator;
            if (init) {
                pathGenerator.init = init;
            }
            if (update) {
                pathGenerator.update = update;
            }
        }
        else {
            const oldGenerator = pathGenerator;
            pathGenerator.generate = pathOrGenerator.generate || oldGenerator.generate;
            pathGenerator.init = pathOrGenerator.init || oldGenerator.init;
            pathGenerator.update = pathOrGenerator.update || oldGenerator.update;
        }
        this.addPath(defaultPathGeneratorKey, pathGenerator, true);
    }
    async start() {
        if (!guardCheck(this) || this.started) {
            return;
        }
        await this.init();
        this.started = true;
        await new Promise((resolve) => {
            this._delayTimeout = setTimeout(async () => {
                this._eventListeners.addListeners();
                if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
                    this._intersectionObserver.observe(this.interactivity.element);
                }
                for (const [, plugin] of this.plugins) {
                    if (plugin.start) {
                        await plugin.start();
                    }
                }
                this._engine.dispatchEvent("containerStarted", { container: this });
                this.play();
                resolve();
            }, this._delay);
        });
    }
    stop() {
        if (!guardCheck(this) || !this.started) {
            return;
        }
        if (this._delayTimeout) {
            clearTimeout(this._delayTimeout);
            delete this._delayTimeout;
        }
        this._firstStart = true;
        this.started = false;
        this._eventListeners.removeListeners();
        this.pause();
        this.particles.clear();
        this.canvas.clear();
        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
            this._intersectionObserver.unobserve(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
            if (plugin.stop) {
                plugin.stop();
            }
        }
        for (const key of this.plugins.keys()) {
            this.plugins.delete(key);
        }
        this._sourceOptions = this._options;
        this._engine.dispatchEvent("containerStopped", { container: this });
    }
    updateActualOptions() {
        this.actualOptions.responsive = [];
        const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
        this.actualOptions.setTheme(this._currentTheme);
        if (this.responsiveMaxWidth === newMaxWidth) {
            return false;
        }
        this.responsiveMaxWidth = newMaxWidth;
        return true;
    }
    _intersectionManager(entries) {
        if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
            return;
        }
        for (const entry of entries) {
            if (entry.target !== this.interactivity.element) {
                continue;
            }
            (entry.isIntersecting ? this.play : this.pause)();
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/Colors.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/Colors.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBounds.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IBounds.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBubbleParticleData.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IBubbleParticleData.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICircleBouncer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/ICircleBouncer.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IColorManager.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IColorManager.js ***!
  \******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerInteractivity.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerInteractivity.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerPlugin.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerPlugin.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICoordinates.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/ICoordinates.js ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDelta.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IDelta.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDimension.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IDimension.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDistance.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IDistance.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IExternalInteractor.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IExternalInteractor.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IInteractor.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IInteractor.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMouseData.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IMouseData.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMovePathGenerator.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IMovePathGenerator.js ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticle.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticle.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleColorStyle.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleColorStyle.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleHslAnimation.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleHslAnimation.js ***!
  \**************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLife.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLife.js ***!
  \******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRetinaProps.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRetinaProps.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRoll.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRoll.js ***!
  \******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleTransformValues.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleTransformValues.js ***!
  \*****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleUpdater.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleUpdater.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleValueAnimation.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleValueAnimation.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleWobble.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleWobble.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesInteractor.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesInteractor.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesMover.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesMover.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IPlugin.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IPlugin.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRangeValue.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IRangeValue.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRectSideResult.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IRectSideResult.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeDrawer.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeDrawer.js ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js ***!
  \*****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ISlowParticleData.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Interfaces/ISlowParticleData.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Loader.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Loader.js ***!
  \************************************************************/
/*! exports provided: Loader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Loader", function() { return Loader; });
/* harmony import */ var _Container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Container */ "./node_modules/tsparticles-engine/esm/Core/Container.js");
/* harmony import */ var _Utils_Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils/Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");




async function getDataFromUrl(jsonUrl, index) {
    const url = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_3__["itemFromSingleOrMultiple"])(jsonUrl, index);
    if (!url) {
        return;
    }
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    console.error(`tsParticles - Error ${response.status} while retrieving config file`);
}
class Loader {
    constructor(engine) {
        this._engine = engine;
    }
    load(tagId, options, index) {
        const params = { index, remote: false };
        if (typeof tagId === "string") {
            params.tagId = tagId;
        }
        else {
            params.options = tagId;
        }
        if (typeof options === "number") {
            params.index = options;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    async loadJSON(tagId, jsonUrl, index) {
        let url, id;
        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
            url = tagId;
        }
        else {
            id = tagId;
            url = jsonUrl;
        }
        return this.loadRemoteOptions({ tagId: id, url, index, remote: true });
    }
    async loadOptions(params) {
        var _a, _b, _c;
        const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__["getRandom"])() * 10000)}`, { index, url: jsonUrl, remote } = params, options = remote ? await getDataFromUrl(jsonUrl, index) : params.options;
        let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);
        if (!domContainer) {
            domContainer = document.createElement("div");
            domContainer.id = tagId;
            (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
        }
        const currentOptions = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_3__["itemFromSingleOrMultiple"])(options, index), dom = this._engine.dom(), oldIndex = dom.findIndex((v) => v.id === tagId);
        if (oldIndex >= 0) {
            const old = this._engine.domItem(oldIndex);
            if (old && !old.destroyed) {
                old.destroy();
                dom.splice(oldIndex, 1);
            }
        }
        let canvasEl;
        if (domContainer.tagName.toLowerCase() === "canvas") {
            canvasEl = domContainer;
            canvasEl.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__["generatedAttribute"]] = "false";
        }
        else {
            const existingCanvases = domContainer.getElementsByTagName("canvas");
            if (existingCanvases.length) {
                canvasEl = existingCanvases[0];
                canvasEl.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__["generatedAttribute"]] = "false";
            }
            else {
                canvasEl = document.createElement("canvas");
                canvasEl.dataset[_Utils_Constants__WEBPACK_IMPORTED_MODULE_1__["generatedAttribute"]] = "true";
                domContainer.appendChild(canvasEl);
            }
        }
        if (!canvasEl.style.width) {
            canvasEl.style.width = "100%";
        }
        if (!canvasEl.style.height) {
            canvasEl.style.height = "100%";
        }
        const newItem = new _Container__WEBPACK_IMPORTED_MODULE_0__["Container"](this._engine, tagId, currentOptions);
        if (oldIndex >= 0) {
            dom.splice(oldIndex, 0, newItem);
        }
        else {
            dom.push(newItem);
        }
        newItem.canvas.loadCanvas(canvasEl);
        await newItem.start();
        return newItem;
    }
    async loadRemoteOptions(params) {
        return this.loadOptions(params);
    }
    async set(id, domContainer, options, index) {
        const params = { index, remote: false };
        if (typeof id === "string") {
            params.tagId = id;
        }
        else {
            params.element = id;
        }
        if (domContainer instanceof HTMLElement) {
            params.element = domContainer;
        }
        else {
            params.options = domContainer;
        }
        if (typeof options === "number") {
            params.index = options;
        }
        else {
            params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
    }
    async setJSON(id, domContainer, jsonUrl, index) {
        let url, newId, newIndex, element;
        if (id instanceof HTMLElement) {
            element = id;
            url = domContainer;
            newIndex = jsonUrl;
        }
        else {
            newId = id;
            element = domContainer;
            url = jsonUrl;
            newIndex = index;
        }
        return this.loadRemoteOptions({ tagId: newId, url, index: newIndex, element, remote: true });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Particle.js":
/*!**************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Particle.js ***!
  \**************************************************************/
/*! exports provided: Particle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particle", function() { return Particle; });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");
/* harmony import */ var _Options_Classes_Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Options/Classes/Interactivity/Interactivity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js");
/* harmony import */ var _Utils_Vector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");
/* harmony import */ var _Utils_Vector3d__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils/Vector3d */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js");
/* harmony import */ var _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Utils/CanvasUtils */ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js");
/* harmony import */ var _Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Utils/OptionsUtils */ "./node_modules/tsparticles-engine/esm/Utils/OptionsUtils.js");








const fixOutMode = (data) => {
    if (!Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["isInArray"])(data.outMode, data.checkModes)) {
        return;
    }
    if (data.coord > data.maxCoord - data.radius * 2) {
        data.setCb(-data.radius);
    }
    else if (data.coord < data.radius * 2) {
        data.setCb(data.radius);
    }
};
class Particle {
    constructor(engine, id, container, position, overrideOptions, group) {
        this.container = container;
        this._engine = engine;
        this.init(id, position, overrideOptions, group);
    }
    destroy(override) {
        var _a;
        if (this.unbreakable || this.destroyed) {
            return;
        }
        this.destroyed = true;
        this.bubble.inRange = false;
        this.slow.inRange = false;
        for (const [, plugin] of this.container.plugins) {
            if (plugin.particleDestroyed) {
                plugin.particleDestroyed(this, override);
            }
        }
        for (const updater of this.container.particles.updaters) {
            if (updater.particleDestroyed) {
                updater.particleDestroyed(this, override);
            }
        }
        (_a = this.pathGenerator) === null || _a === void 0 ? void 0 : _a.reset(this);
    }
    draw(delta) {
        const container = this.container;
        for (const [, plugin] of container.plugins) {
            container.canvas.drawParticlePlugin(plugin, this, delta);
        }
        container.canvas.drawParticle(this, delta);
    }
    getFillColor() {
        var _a, _b;
        const color = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["getHslFromAnimation"])(this.color);
        if (color && this.roll && (this.backColor || this.roll.alter)) {
            const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1, backSum = this.roll.horizontal ? Math.PI / 2 : 0, rolled = Math.floor((((_b = this.roll.angle) !== null && _b !== void 0 ? _b : 0) + backSum) / (Math.PI / backFactor)) % 2;
            if (rolled) {
                if (this.backColor) {
                    return this.backColor;
                }
                if (this.roll.alter) {
                    return Object(_Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_6__["alterHsl"])(color, this.roll.alter.type, this.roll.alter.value);
                }
            }
        }
        return color;
    }
    getMass() {
        return (this.getRadius() ** 2 * Math.PI) / 2;
    }
    getPosition() {
        return {
            x: this.position.x + this.offset.x,
            y: this.position.y + this.offset.y,
            z: this.position.z,
        };
    }
    getRadius() {
        var _a;
        return (_a = this.bubble.radius) !== null && _a !== void 0 ? _a : this.size.value;
    }
    getStrokeColor() {
        var _a, _b;
        return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["getHslFromAnimation"])(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
    }
    init(id, position, overrideOptions, group) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const container = this.container, engine = this._engine;
        this.id = id;
        this.group = group;
        this.fill = true;
        this.pathRotation = false;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.rotation = 0;
        this.misplaced = false;
        this.retina = {
            maxDistance: {},
        };
        this.outType = "normal";
        this.ignoresResizeRatio = true;
        const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = Object(_Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_7__["loadParticlesOptions"])(this._engine, container, mainOptions.particles), shapeType = particlesOptions.shape.type, { reduceDuplicates } = particlesOptions;
        this.shape = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["itemFromSingleOrMultiple"])(shapeType, this.id, reduceDuplicates);
        const shapeOptions = particlesOptions.shape;
        if (overrideOptions && overrideOptions.shape && overrideOptions.shape.type) {
            const overrideShapeType = overrideOptions.shape.type, shape = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["itemFromSingleOrMultiple"])(overrideShapeType, this.id, reduceDuplicates);
            if (shape) {
                this.shape = shape;
                shapeOptions.load(overrideOptions.shape);
            }
        }
        this.shapeData = this._loadShapeData(shapeOptions, reduceDuplicates);
        particlesOptions.load(overrideOptions);
        particlesOptions.load((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles);
        this.interactivity = new _Options_Classes_Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_3__["Interactivity"](engine, container);
        this.interactivity.load(container.actualOptions.interactivity);
        this.interactivity.load(particlesOptions.interactivity);
        this.fill = (_c = (_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.fill) !== null && _c !== void 0 ? _c : this.fill;
        this.close = (_e = (_d = this.shapeData) === null || _d === void 0 ? void 0 : _d.close) !== null && _e !== void 0 ? _e : this.close;
        this.options = particlesOptions;
        const pathOptions = this.options.move.path;
        this.pathDelay = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getValue"])(pathOptions.delay) * 1000;
        if (pathOptions.generator) {
            this.pathGenerator = this._engine.plugins.getPathGenerator(pathOptions.generator);
            if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
                this.pathGenerator.init(container);
            }
        }
        const zIndexValue = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(this.options.zIndex.value);
        container.retina.initParticle(this);
        const sizeOptions = this.options.size, sizeRange = sizeOptions.value, sizeAnimation = sizeOptions.animation;
        this.size = {
            enable: sizeOptions.animation.enable,
            value: Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(sizeOptions.value) * container.retina.pixelRatio,
            max: Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(sizeRange) * pxRatio,
            min: Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeMin"])(sizeRange) * pxRatio,
            loops: 0,
            maxLoops: Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(sizeOptions.animation.count),
        };
        if (sizeAnimation.enable) {
            this.size.status = "increasing";
            this.size.decay = 1 - Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(sizeAnimation.decay);
            switch (sizeAnimation.startValue) {
                case "min":
                    this.size.value = this.size.min;
                    this.size.status = "increasing";
                    break;
                case "random":
                    this.size.value = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(this.size) * pxRatio;
                    this.size.status = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() >= 0.5 ? "increasing" : "decreasing";
                    break;
                case "max":
                default:
                    this.size.value = this.size.max;
                    this.size.status = "decreasing";
                    break;
            }
        }
        this.bubble = {
            inRange: false,
        };
        this.slow = {
            inRange: false,
            factor: 1,
        };
        this.position = this._calcPosition(container, position, Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["clamp"])(zIndexValue, 0, container.zLayers));
        this.initialPosition = this.position.copy();
        const canvasSize = container.canvas.size, moveCenter = Object.assign({}, this.options.move.center), isCenterPercent = moveCenter.mode === "percent";
        this.moveCenter = {
            x: moveCenter.x * (isCenterPercent ? canvasSize.width / 100 : 1),
            y: moveCenter.y * (isCenterPercent ? canvasSize.height / 100 : 1),
            radius: (_f = this.options.move.center.radius) !== null && _f !== void 0 ? _f : 0,
            mode: (_g = this.options.move.center.mode) !== null && _g !== void 0 ? _g : "percent",
        };
        this.direction = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getParticleDirectionAngle"])(this.options.move.direction, this.position, this.moveCenter);
        switch (this.options.move.direction) {
            case "inside":
                this.outType = "inside";
                break;
            case "outside":
                this.outType = "outside";
                break;
        }
        this.initialVelocity = this._calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(this.options.move.decay);
        this.offset = _Utils_Vector__WEBPACK_IMPORTED_MODULE_4__["Vector"].origin;
        const particles = container.particles;
        particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
        particles.lastZIndex = this.position.z;
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
            drawer = this._engine.plugins.getShapeDrawer(this.shape);
            if (drawer) {
                container.drawers.set(this.shape, drawer);
            }
        }
        if (drawer === null || drawer === void 0 ? void 0 : drawer.loadShape) {
            drawer === null || drawer === void 0 ? void 0 : drawer.loadShape(this);
        }
        const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;
        if (sideCountFunc) {
            this.sides = sideCountFunc(this);
        }
        this.spawning = false;
        this.shadowColor = Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_2__["rangeColorToRgb"])(this.options.shadow.color);
        for (const updater of container.particles.updaters) {
            updater.init(this);
        }
        for (const mover of container.particles.movers) {
            (_h = mover.init) === null || _h === void 0 ? void 0 : _h.call(mover, this);
        }
        if (drawer === null || drawer === void 0 ? void 0 : drawer.particleInit) {
            drawer.particleInit(container, this);
        }
        for (const [, plugin] of container.plugins) {
            (_j = plugin.particleCreated) === null || _j === void 0 ? void 0 : _j.call(plugin, this);
        }
    }
    isInsideCanvas() {
        const radius = this.getRadius(), canvasSize = this.container.canvas.size;
        return (this.position.x >= -radius &&
            this.position.y >= -radius &&
            this.position.y <= canvasSize.height + radius &&
            this.position.x <= canvasSize.width + radius);
    }
    isVisible() {
        return !this.destroyed && !this.spawning && this.isInsideCanvas();
    }
    reset() {
        var _a;
        for (const updater of this.container.particles.updaters) {
            (_a = updater.reset) === null || _a === void 0 ? void 0 : _a.call(updater, this);
        }
    }
    _calcPosition(container, position, zIndex, tryCount = 0) {
        var _a, _b, _c, _d;
        for (const [, plugin] of container.plugins) {
            const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
            if (pluginPos !== undefined) {
                return _Utils_Vector3d__WEBPACK_IMPORTED_MODULE_5__["Vector3d"].create(pluginPos.x, pluginPos.y, zIndex);
            }
        }
        const canvasSize = container.canvas.size, exactPosition = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["calcExactPositionOrRandomFromSize"])({
            size: canvasSize,
            position: position,
        }), pos = _Utils_Vector3d__WEBPACK_IMPORTED_MODULE_5__["Vector3d"].create(exactPosition.x, exactPosition.y, zIndex), radius = this.getRadius(), outModes = this.options.move.outModes, fixHorizontal = (outMode) => {
            fixOutMode({
                outMode,
                checkModes: ["bounce", "bounce-horizontal"],
                coord: pos.x,
                maxCoord: container.canvas.size.width,
                setCb: (value) => (pos.x += value),
                radius,
            });
        }, fixVertical = (outMode) => {
            fixOutMode({
                outMode,
                checkModes: ["bounce", "bounce-vertical"],
                coord: pos.y,
                maxCoord: container.canvas.size.height,
                setCb: (value) => (pos.y += value),
                radius,
            });
        };
        fixHorizontal((_a = outModes.left) !== null && _a !== void 0 ? _a : outModes.default);
        fixHorizontal((_b = outModes.right) !== null && _b !== void 0 ? _b : outModes.default);
        fixVertical((_c = outModes.top) !== null && _c !== void 0 ? _c : outModes.default);
        fixVertical((_d = outModes.bottom) !== null && _d !== void 0 ? _d : outModes.default);
        if (this._checkOverlap(pos, tryCount)) {
            return this._calcPosition(container, undefined, zIndex, tryCount + 1);
        }
        return pos;
    }
    _calculateVelocity() {
        const baseVelocity = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getParticleBaseVelocity"])(this.direction), res = baseVelocity.copy(), moveOptions = this.options.move;
        if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
            return res;
        }
        const rad = (Math.PI / 180) * Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(moveOptions.angle.value), radOffset = (Math.PI / 180) * Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(moveOptions.angle.offset), range = {
            left: radOffset - rad / 2,
            right: radOffset + rad / 2,
        };
        if (!moveOptions.straight) {
            res.angle += Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(range.left, range.right));
        }
        if (moveOptions.random && typeof moveOptions.speed === "number") {
            res.length *= Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
        }
        return res;
    }
    _checkOverlap(pos, tryCount = 0) {
        const collisionsOptions = this.options.collisions, radius = this.getRadius();
        if (!collisionsOptions.enable) {
            return false;
        }
        const overlapOptions = collisionsOptions.overlap;
        if (overlapOptions.enable) {
            return false;
        }
        const retries = overlapOptions.retries;
        if (retries >= 0 && tryCount > retries) {
            throw new Error("Particle is overlapping and can't be placed");
        }
        let overlaps = false;
        for (const particle of this.container.particles.array) {
            if (Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos, particle.position) < radius + particle.getRadius()) {
                overlaps = true;
                break;
            }
        }
        return overlaps;
    }
    _loadShapeData(shapeOptions, reduceDuplicates) {
        const shapeData = shapeOptions.options[this.shape];
        if (shapeData) {
            return Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["deepExtend"])({}, Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["itemFromSingleOrMultiple"])(shapeData, this.id, reduceDuplicates));
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Particles.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Particles.js ***!
  \***************************************************************/
/*! exports provided: Particles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Particles", function() { return Particles; });
/* harmony import */ var _Utils_InteractionManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils/InteractionManager */ "./node_modules/tsparticles-engine/esm/Core/Utils/InteractionManager.js");
/* harmony import */ var _Particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Particle */ "./node_modules/tsparticles-engine/esm/Core/Particle.js");
/* harmony import */ var _Utils_Point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/Point */ "./node_modules/tsparticles-engine/esm/Core/Utils/Point.js");
/* harmony import */ var _Utils_QuadTree__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/QuadTree */ "./node_modules/tsparticles-engine/esm/Core/Utils/QuadTree.js");
/* harmony import */ var _Utils_Rectangle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils/Rectangle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");






class Particles {
    constructor(engine, container) {
        this.container = container;
        this._engine = engine;
        this.nextId = 0;
        this.array = [];
        this.zArray = [];
        this.pool = [];
        this.limit = 0;
        this.needsSort = false;
        this.lastZIndex = 0;
        this.interactionManager = new _Utils_InteractionManager__WEBPACK_IMPORTED_MODULE_0__["InteractionManager"](this._engine, container);
        const canvasSize = this.container.canvas.size;
        this.quadTree = new _Utils_QuadTree__WEBPACK_IMPORTED_MODULE_3__["QuadTree"](new _Utils_Rectangle__WEBPACK_IMPORTED_MODULE_4__["Rectangle"](-canvasSize.width / 4, -canvasSize.height / 4, (canvasSize.width * 3) / 2, (canvasSize.height * 3) / 2), 4);
        this.movers = this._engine.plugins.getMovers(container, true);
        this.updaters = this._engine.plugins.getUpdaters(container, true);
    }
    get count() {
        return this.array.length;
    }
    addManualParticles() {
        const container = this.container, options = container.actualOptions;
        for (const particle of options.manualParticles) {
            this.addParticle(Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_5__["calcPositionFromSize"])({
                size: container.canvas.size,
                position: particle.position,
            }), particle.options);
        }
    }
    addParticle(position, overrideOptions, group, initializer) {
        const container = this.container, options = container.actualOptions, limit = options.particles.number.limit;
        if (limit > 0) {
            const countToRemove = this.count + 1 - limit;
            if (countToRemove > 0) {
                this.removeQuantity(countToRemove);
            }
        }
        return this._pushParticle(position, overrideOptions, group, initializer);
    }
    clear() {
        this.array = [];
        this.zArray = [];
    }
    destroy() {
        this.array = [];
        this.zArray = [];
        this.movers = [];
        this.updaters = [];
    }
    async draw(delta) {
        const container = this.container, canvasSize = this.container.canvas.size;
        this.quadTree = new _Utils_QuadTree__WEBPACK_IMPORTED_MODULE_3__["QuadTree"](new _Utils_Rectangle__WEBPACK_IMPORTED_MODULE_4__["Rectangle"](-canvasSize.width / 4, -canvasSize.height / 4, (canvasSize.width * 3) / 2, (canvasSize.height * 3) / 2), 4);
        container.canvas.clear();
        await this.update(delta);
        if (this.needsSort) {
            this.zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
            this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
            this.needsSort = false;
        }
        for (const [, plugin] of container.plugins) {
            container.canvas.drawPlugin(plugin, delta);
        }
        for (const p of this.zArray) {
            p.draw(delta);
        }
    }
    handleClickMode(mode) {
        this.interactionManager.handleClickMode(mode);
    }
    init() {
        var _a;
        const container = this.container, options = container.actualOptions;
        this.lastZIndex = 0;
        this.needsSort = false;
        let handled = false;
        this.updaters = this._engine.plugins.getUpdaters(container, true);
        this.interactionManager.init();
        for (const [, plugin] of container.plugins) {
            if (plugin.particlesInitialization !== undefined) {
                handled = plugin.particlesInitialization();
            }
            if (handled) {
                break;
            }
        }
        this.interactionManager.init();
        for (const [, pathGenerator] of container.pathGenerators) {
            pathGenerator.init(container);
        }
        this.addManualParticles();
        if (!handled) {
            for (const group in options.particles.groups) {
                const groupOptions = options.particles.groups[group];
                for (let i = this.count, j = 0; j < ((_a = groupOptions.number) === null || _a === void 0 ? void 0 : _a.value) && i < options.particles.number.value; i++, j++) {
                    this.addParticle(undefined, groupOptions, group);
                }
            }
            for (let i = this.count; i < options.particles.number.value; i++) {
                this.addParticle();
            }
        }
    }
    push(nb, mouse, overrideOptions, group) {
        this.pushing = true;
        for (let i = 0; i < nb; i++) {
            this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions, group);
        }
        this.pushing = false;
    }
    async redraw() {
        this.clear();
        this.init();
        await this.draw({ value: 0, factor: 0 });
    }
    remove(particle, group, override) {
        this.removeAt(this.array.indexOf(particle), undefined, group, override);
    }
    removeAt(index, quantity = 1, group, override) {
        if (index < 0 || index > this.count) {
            return;
        }
        let deleted = 0;
        for (let i = index; deleted < quantity && i < this.count; i++) {
            const particle = this.array[i];
            if (!particle || particle.group !== group) {
                continue;
            }
            particle.destroy(override);
            this.array.splice(i--, 1);
            const zIdx = this.zArray.indexOf(particle);
            this.zArray.splice(zIdx, 1);
            this.pool.push(particle);
            deleted++;
            this._engine.dispatchEvent("particleRemoved", {
                container: this.container,
                data: {
                    particle,
                },
            });
        }
    }
    removeQuantity(quantity, group) {
        this.removeAt(0, quantity, group);
    }
    setDensity() {
        const options = this.container.actualOptions;
        for (const group in options.particles.groups) {
            this._applyDensity(options.particles.groups[group], 0, group);
        }
        this._applyDensity(options.particles, options.manualParticles.length);
    }
    async update(delta) {
        var _a, _b;
        const container = this.container, particlesToDelete = [];
        for (const [, pathGenerator] of container.pathGenerators) {
            pathGenerator.update();
        }
        for (const [, plugin] of container.plugins) {
            (_a = plugin.update) === null || _a === void 0 ? void 0 : _a.call(plugin, delta);
        }
        for (const particle of this.array) {
            const resizeFactor = container.canvas.resizeFactor;
            if (resizeFactor && !particle.ignoresResizeRatio) {
                particle.position.x *= resizeFactor.width;
                particle.position.y *= resizeFactor.height;
                particle.initialPosition.x *= resizeFactor.width;
                particle.initialPosition.y *= resizeFactor.height;
            }
            particle.ignoresResizeRatio = false;
            await this.interactionManager.reset(particle);
            for (const [, plugin] of this.container.plugins) {
                if (particle.destroyed) {
                    break;
                }
                (_b = plugin.particleUpdate) === null || _b === void 0 ? void 0 : _b.call(plugin, particle, delta);
            }
            for (const mover of this.movers) {
                if (mover.isEnabled(particle)) {
                    mover.move(particle, delta);
                }
            }
            if (particle.destroyed) {
                particlesToDelete.push(particle);
                continue;
            }
            this.quadTree.insert(new _Utils_Point__WEBPACK_IMPORTED_MODULE_2__["Point"](particle.getPosition(), particle));
        }
        for (const particle of particlesToDelete) {
            this.remove(particle);
        }
        await this.interactionManager.externalInteract(delta);
        for (const particle of this.array) {
            for (const updater of this.updaters) {
                updater.update(particle, delta);
            }
            if (!particle.destroyed && !particle.spawning) {
                await this.interactionManager.particlesInteract(particle, delta);
            }
        }
        delete container.canvas.resizeFactor;
    }
    _applyDensity(options, manualCount, group) {
        var _a;
        if (!((_a = options.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
            return;
        }
        const numberOptions = options.number, densityFactor = this._initDensityFactor(numberOptions.density), optParticlesNumber = numberOptions.value, optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber, particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount, particlesCount = Math.min(this.count, this.array.filter((t) => t.group === group).length);
        this.limit = numberOptions.limit * densityFactor;
        if (particlesCount < particlesNumber) {
            this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
        }
        else if (particlesCount > particlesNumber) {
            this.removeQuantity(particlesCount - particlesNumber, group);
        }
    }
    _initDensityFactor(densityOptions) {
        const container = this.container;
        if (!container.canvas.element || !densityOptions.enable) {
            return 1;
        }
        const canvas = container.canvas.element, pxRatio = container.retina.pixelRatio;
        return (canvas.width * canvas.height) / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
    }
    _pushParticle(position, overrideOptions, group, initializer) {
        try {
            let particle = this.pool.pop();
            if (particle) {
                particle.init(this.nextId, position, overrideOptions, group);
            }
            else {
                particle = new _Particle__WEBPACK_IMPORTED_MODULE_1__["Particle"](this._engine, this.nextId, this.container, position, overrideOptions, group);
            }
            let canAdd = true;
            if (initializer) {
                canAdd = initializer(particle);
            }
            if (!canAdd) {
                return;
            }
            this.array.push(particle);
            this.zArray.push(particle);
            this.nextId++;
            this._engine.dispatchEvent("particleAdded", {
                container: this.container,
                data: {
                    particle,
                },
            });
            return particle;
        }
        catch (e) {
            console.warn(`error adding particle: ${e}`);
            return;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Retina.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Retina.js ***!
  \************************************************************/
/*! exports provided: Retina */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Retina", function() { return Retina; });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


class Retina {
    constructor(container) {
        this.container = container;
    }
    init() {
        const container = this.container, options = container.actualOptions;
        this.pixelRatio = !options.detectRetina || Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["isSsr"])() ? 1 : window.devicePixelRatio;
        this.reduceFactor = 1;
        const ratio = this.pixelRatio;
        if (container.canvas.element) {
            const element = container.canvas.element;
            container.canvas.size.width = element.offsetWidth * ratio;
            container.canvas.size.height = element.offsetHeight * ratio;
        }
        const particles = options.particles;
        this.attractDistance = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(particles.move.attract.distance) * ratio;
        this.sizeAnimationSpeed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(particles.size.animation.speed) * ratio;
        this.maxSpeed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(particles.move.gravity.maxSpeed) * ratio;
    }
    initParticle(particle) {
        const options = particle.options, ratio = this.pixelRatio, moveDistance = options.move.distance, props = particle.retina;
        props.attractDistance = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(options.move.attract.distance) * ratio;
        props.moveDrift = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(options.move.drift) * ratio;
        props.moveSpeed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(options.move.speed) * ratio;
        props.sizeAnimationSpeed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(options.size.animation.speed) * ratio;
        const maxDistance = props.maxDistance;
        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
        props.maxSpeed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(options.move.gravity.maxSpeed) * ratio;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js ***!
  \******************************************************************/
/*! exports provided: Circle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Range */ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class Circle extends _Range__WEBPACK_IMPORTED_MODULE_0__["Range"] {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }
    contains(point) {
        return Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__["getDistance"])(point, this.position) <= this.radius;
    }
    intersects(range) {
        const rect = range, circle = range, pos1 = this.position, pos2 = range.position, distPos = { x: Math.abs(pos2.x - pos1.x), y: Math.abs(pos2.y - pos1.y) }, r = this.radius;
        if (circle.radius !== undefined) {
            const rSum = r + circle.radius, dist = Math.sqrt(distPos.x ** 2 + distPos.y ** 2);
            return rSum > dist;
        }
        else if (rect.size !== undefined) {
            const w = rect.size.width, h = rect.size.height, edges = Math.pow(distPos.x - w, 2) + Math.pow(distPos.y - h, 2);
            return edges <= r ** 2 || (distPos.x <= r + w && distPos.y <= r + h) || distPos.x <= w || distPos.y <= h;
        }
        return false;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js ***!
  \*********************************************************************/
/*! exports provided: generatedAttribute, touchEndEvent, mouseDownEvent, mouseUpEvent, mouseMoveEvent, touchStartEvent, touchMoveEvent, mouseLeaveEvent, mouseOutEvent, touchCancelEvent, resizeEvent, visibilityChangeEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generatedAttribute", function() { return generatedAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchEndEvent", function() { return touchEndEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseDownEvent", function() { return mouseDownEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseUpEvent", function() { return mouseUpEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseMoveEvent", function() { return mouseMoveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchStartEvent", function() { return touchStartEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchMoveEvent", function() { return touchMoveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseLeaveEvent", function() { return mouseLeaveEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mouseOutEvent", function() { return mouseOutEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "touchCancelEvent", function() { return touchCancelEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resizeEvent", function() { return resizeEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "visibilityChangeEvent", function() { return visibilityChangeEvent; });
const generatedAttribute = "generated";
const touchEndEvent = "touchend";
const mouseDownEvent = "pointerdown";
const mouseUpEvent = "pointerup";
const mouseMoveEvent = "pointermove";
const touchStartEvent = "touchstart";
const touchMoveEvent = "touchmove";
const mouseLeaveEvent = "pointerleave";
const mouseOutEvent = "pointerout";
const touchCancelEvent = "touchcancel";
const resizeEvent = "resize";
const visibilityChangeEvent = "visibilitychange";


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/EventListeners.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/EventListeners.js ***!
  \**************************************************************************/
/*! exports provided: EventListeners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventListeners", function() { return EventListeners; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");


function manageListener(element, event, handler, add, options) {
    if (add) {
        let addOptions = { passive: true };
        if (typeof options === "boolean") {
            addOptions.capture = options;
        }
        else if (options !== undefined) {
            addOptions = options;
        }
        element.addEventListener(event, handler, addOptions);
    }
    else {
        const removeOptions = options;
        element.removeEventListener(event, handler, removeOptions);
    }
}
class EventListeners {
    constructor(container) {
        this.container = container;
        this.canPush = true;
        this.handlers = {
            mouseMove: (e) => this.mouseTouchMove(e),
            touchStart: (e) => this.mouseTouchMove(e),
            touchMove: (e) => this.mouseTouchMove(e),
            touchEnd: () => this.mouseTouchFinish(),
            mouseLeave: () => this.mouseTouchFinish(),
            touchCancel: () => this.mouseTouchFinish(),
            touchEndClick: (e) => this.mouseTouchClick(e),
            mouseUp: (e) => this.mouseTouchClick(e),
            mouseDown: () => this.mouseDown(),
            visibilityChange: () => this.handleVisibilityChange(),
            themeChange: (e) => this.handleThemeChange(e),
            oldThemeChange: (e) => this.handleThemeChange(e),
            resize: () => this.handleWindowResize(),
        };
    }
    addListeners() {
        this.manageListeners(true);
    }
    removeListeners() {
        this.manageListeners(false);
    }
    doMouseTouchClick(e) {
        const container = this.container, options = container.actualOptions;
        if (this.canPush) {
            const mouseInteractivity = container.interactivity.mouse, mousePos = mouseInteractivity.position;
            if (!mousePos) {
                return;
            }
            mouseInteractivity.clickPosition = Object.assign({}, mousePos);
            mouseInteractivity.clickTime = new Date().getTime();
            const onClick = options.interactivity.events.onClick;
            Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(onClick.mode, (mode) => this.handleClickMode(mode));
        }
        if (e.type === "touchend") {
            setTimeout(() => this.mouseTouchFinish(), 500);
        }
    }
    handleClickMode(mode) {
        this.container.handleClickMode(mode);
    }
    handleThemeChange(e) {
        const mediaEvent = e, container = this.container, options = container.options, defaultThemes = options.defaultThemes, themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light, theme = options.themes.find((theme) => theme.name === themeName);
        if (theme && theme.default.auto) {
            container.loadTheme(themeName);
        }
    }
    handleVisibilityChange() {
        const container = this.container, options = container.actualOptions;
        this.mouseTouchFinish();
        if (!options.pauseOnBlur) {
            return;
        }
        if (document === null || document === void 0 ? void 0 : document.hidden) {
            container.pageHidden = true;
            container.pause();
        }
        else {
            container.pageHidden = false;
            if (container.getAnimationStatus()) {
                container.play(true);
            }
            else {
                container.draw(true);
            }
        }
    }
    handleWindowResize() {
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
            delete this.resizeTimeout;
        }
        this.resizeTimeout = setTimeout(async () => { var _a; return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize(); }, this.container.actualOptions.interactivity.events.resize.delay * 1000);
    }
    manageListeners(add) {
        var _a;
        const handlers = this.handlers, container = this.container, options = container.actualOptions, detectType = options.interactivity.detectsOn;
        let mouseLeaveTmpEvent = _Constants__WEBPACK_IMPORTED_MODULE_1__["mouseLeaveEvent"];
        if (detectType === "window") {
            container.interactivity.element = window;
            mouseLeaveTmpEvent = _Constants__WEBPACK_IMPORTED_MODULE_1__["mouseOutEvent"];
        }
        else if (detectType === "parent" && container.canvas.element) {
            const canvasEl = container.canvas.element;
            container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
        }
        else {
            container.interactivity.element = container.canvas.element;
        }
        const mediaMatch = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["safeMatchMedia"])("(prefers-color-scheme: dark)");
        if (mediaMatch) {
            if (mediaMatch.addEventListener !== undefined) {
                manageListener(mediaMatch, "change", handlers.themeChange, add);
            }
            else if (mediaMatch.addListener !== undefined) {
                if (add) {
                    mediaMatch.addListener(handlers.oldThemeChange);
                }
                else {
                    mediaMatch.removeListener(handlers.oldThemeChange);
                }
            }
        }
        const interactivityEl = container.interactivity.element;
        if (!interactivityEl) {
            return;
        }
        const html = interactivityEl;
        if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["mouseMoveEvent"], handlers.mouseMove, add);
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["touchStartEvent"], handlers.touchStart, add);
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["touchMoveEvent"], handlers.touchMove, add);
            if (!options.interactivity.events.onClick.enable) {
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["touchEndEvent"], handlers.touchEnd, add);
            }
            else {
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["touchEndEvent"], handlers.touchEndClick, add);
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["mouseUpEvent"], handlers.mouseUp, add);
                manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["mouseDownEvent"], handlers.mouseDown, add);
            }
            manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
            manageListener(interactivityEl, _Constants__WEBPACK_IMPORTED_MODULE_1__["touchCancelEvent"], handlers.touchCancel, add);
        }
        if (container.canvas.element) {
            container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
        }
        if (options.interactivity.events.resize) {
            if (typeof ResizeObserver !== "undefined") {
                if (this.resizeObserver && !add) {
                    if (container.canvas.element) {
                        this.resizeObserver.unobserve(container.canvas.element);
                    }
                    this.resizeObserver.disconnect();
                    delete this.resizeObserver;
                }
                else if (!this.resizeObserver && add && container.canvas.element) {
                    this.resizeObserver = new ResizeObserver((entries) => {
                        const entry = entries.find((e) => e.target === container.canvas.element);
                        if (!entry) {
                            return;
                        }
                        this.handleWindowResize();
                    });
                    this.resizeObserver.observe(container.canvas.element);
                }
            }
            else {
                manageListener(window, _Constants__WEBPACK_IMPORTED_MODULE_1__["resizeEvent"], handlers.resize, add);
            }
        }
        if (document) {
            manageListener(document, _Constants__WEBPACK_IMPORTED_MODULE_1__["visibilityChangeEvent"], handlers.visibilityChange, add, false);
        }
    }
    mouseDown() {
        const interactivity = this.container.interactivity;
        if (interactivity) {
            const mouse = interactivity.mouse;
            mouse.clicking = true;
            mouse.downPosition = mouse.position;
        }
    }
    mouseTouchClick(e) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse;
        mouse.inside = true;
        let handled = false;
        const mousePosition = mouse.position;
        if (!mousePosition || !options.interactivity.events.onClick.enable) {
            return;
        }
        for (const [, plugin] of container.plugins) {
            if (!plugin.clickPositionValid) {
                continue;
            }
            handled = plugin.clickPositionValid(mousePosition);
            if (handled) {
                break;
            }
        }
        if (!handled) {
            this.doMouseTouchClick(e);
        }
        mouse.clicking = false;
    }
    mouseTouchFinish() {
        const interactivity = this.container.interactivity;
        if (!interactivity) {
            return;
        }
        const mouse = interactivity.mouse;
        delete mouse.position;
        delete mouse.clickPosition;
        delete mouse.downPosition;
        interactivity.status = _Constants__WEBPACK_IMPORTED_MODULE_1__["mouseLeaveEvent"];
        mouse.inside = false;
        mouse.clicking = false;
    }
    mouseTouchMove(e) {
        var _a, _b, _c, _d, _e, _f, _g;
        const container = this.container, options = container.actualOptions;
        if (!((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element)) {
            return;
        }
        container.interactivity.mouse.inside = true;
        let pos;
        const canvas = container.canvas.element;
        if (e.type.startsWith("pointer")) {
            this.canPush = true;
            const mouseEvent = e;
            if (container.interactivity.element === window) {
                if (canvas) {
                    const clientRect = canvas.getBoundingClientRect();
                    pos = {
                        x: mouseEvent.clientX - clientRect.left,
                        y: mouseEvent.clientY - clientRect.top,
                    };
                }
            }
            else if (options.interactivity.detectsOn === "parent") {
                const source = mouseEvent.target, target = mouseEvent.currentTarget, canvasEl = container.canvas.element;
                if (source && target && canvasEl) {
                    const sourceRect = source.getBoundingClientRect(), targetRect = target.getBoundingClientRect(), canvasRect = canvasEl.getBoundingClientRect();
                    pos = {
                        x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
                        y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top),
                    };
                }
                else {
                    pos = {
                        x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
                        y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY,
                    };
                }
            }
            else if (mouseEvent.target === container.canvas.element) {
                pos = {
                    x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
                    y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY,
                };
            }
        }
        else {
            this.canPush = e.type !== "touchmove";
            const touchEvent = e, lastTouch = touchEvent.touches[touchEvent.touches.length - 1], canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
            pos = {
                x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
                y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0),
            };
        }
        const pxRatio = container.retina.pixelRatio;
        if (pos) {
            pos.x *= pxRatio;
            pos.y *= pxRatio;
        }
        container.interactivity.mouse.position = pos;
        container.interactivity.status = _Constants__WEBPACK_IMPORTED_MODULE_1__["mouseMoveEvent"];
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/ExternalInteractorBase.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/ExternalInteractorBase.js ***!
  \**********************************************************************************/
/*! exports provided: ExternalInteractorBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExternalInteractorBase", function() { return ExternalInteractorBase; });
class ExternalInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = "external";
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/FrameManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/FrameManager.js ***!
  \************************************************************************/
/*! exports provided: FrameManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FrameManager", function() { return FrameManager; });
function initDelta(value, fpsLimit = 60, smooth = false) {
    return {
        value,
        factor: smooth ? 60 / fpsLimit : (60 * value) / 1000,
    };
}
class FrameManager {
    constructor(container) {
        this.container = container;
    }
    async nextFrame(timestamp) {
        var _a;
        try {
            const container = this.container;
            if (!container.smooth &&
                container.lastFrameTime !== undefined &&
                timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
                container.draw(false);
                return;
            }
            (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : (container.lastFrameTime = timestamp);
            const delta = initDelta(timestamp - container.lastFrameTime, container.fpsLimit, container.smooth);
            container.lifeTime += delta.value;
            container.lastFrameTime = timestamp;
            if (delta.value > 1000) {
                container.draw(false);
                return;
            }
            await container.particles.draw(delta);
            if (container.duration > 0 && container.lifeTime > container.duration) {
                container.destroy();
                return;
            }
            if (container.getAnimationStatus()) {
                container.draw(false);
            }
        }
        catch (e) {
            console.error("tsParticles error in animation loop", e);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/InteractionManager.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/InteractionManager.js ***!
  \******************************************************************************/
/*! exports provided: InteractionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InteractionManager", function() { return InteractionManager; });
class InteractionManager {
    constructor(engine, container) {
        this.container = container;
        this._engine = engine;
        this._interactors = this._engine.plugins.getInteractors(this.container, true);
        this._externalInteractors = [];
        this._particleInteractors = [];
    }
    async externalInteract(delta) {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.interact(delta);
            }
        }
    }
    handleClickMode(mode) {
        for (const interactor of this._externalInteractors) {
            if (interactor.handleClickMode) {
                interactor.handleClickMode(mode);
            }
        }
    }
    init() {
        this._externalInteractors = [];
        this._particleInteractors = [];
        for (const interactor of this._interactors) {
            switch (interactor.type) {
                case "external":
                    this._externalInteractors.push(interactor);
                    break;
                case "particles":
                    this._particleInteractors.push(interactor);
                    break;
            }
            interactor.init();
        }
    }
    async particlesInteract(particle, delta) {
        for (const interactor of this._externalInteractors) {
            interactor.clear(particle, delta);
        }
        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                await interactor.interact(particle, delta);
            }
        }
    }
    async reset(particle) {
        for (const interactor of this._externalInteractors) {
            if (interactor.isEnabled()) {
                await interactor.reset(particle);
            }
        }
        for (const interactor of this._particleInteractors) {
            if (interactor.isEnabled(particle)) {
                await interactor.reset(particle);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/ParticlesInteractorBase.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/ParticlesInteractorBase.js ***!
  \***********************************************************************************/
/*! exports provided: ParticlesInteractorBase */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticlesInteractorBase", function() { return ParticlesInteractorBase; });
class ParticlesInteractorBase {
    constructor(container) {
        this.container = container;
        this.type = "particles";
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Plugins.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Plugins.js ***!
  \*******************************************************************/
/*! exports provided: Plugins */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Plugins", function() { return Plugins; });
function getItemsFromInitializer(container, map, initializers, force = false) {
    let res = map.get(container);
    if (!res || force) {
        res = [...initializers.values()].map((t) => t(container));
        map.set(container, res);
    }
    return res;
}
class Plugins {
    constructor(engine) {
        this._engine = engine;
        this.plugins = [];
        this._initializers = {
            interactors: new Map(),
            movers: new Map(),
            updaters: new Map(),
        };
        this.interactors = new Map();
        this.movers = new Map();
        this.updaters = new Map();
        this.presets = new Map();
        this.drawers = new Map();
        this.pathGenerators = new Map();
    }
    addInteractor(name, initInteractor) {
        this._initializers.interactors.set(name, initInteractor);
    }
    addParticleMover(name, initMover) {
        this._initializers.movers.set(name, initMover);
    }
    addParticleUpdater(name, initUpdater) {
        this._initializers.updaters.set(name, initUpdater);
    }
    addPathGenerator(type, pathGenerator) {
        if (!this.getPathGenerator(type)) {
            this.pathGenerators.set(type, pathGenerator);
        }
    }
    addPlugin(plugin) {
        if (!this.getPlugin(plugin.id)) {
            this.plugins.push(plugin);
        }
    }
    addPreset(presetKey, options, override = false) {
        if (override || !this.getPreset(presetKey)) {
            this.presets.set(presetKey, options);
        }
    }
    addShapeDrawer(type, drawer) {
        if (!this.getShapeDrawer(type)) {
            this.drawers.set(type, drawer);
        }
    }
    destroy(container) {
        this.updaters.delete(container);
        this.movers.delete(container);
        this.interactors.delete(container);
    }
    getAvailablePlugins(container) {
        const res = new Map();
        for (const plugin of this.plugins) {
            if (!plugin.needsPlugin(container.actualOptions)) {
                continue;
            }
            res.set(plugin.id, plugin.getPlugin(container));
        }
        return res;
    }
    getInteractors(container, force = false) {
        return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
    }
    getMovers(container, force = false) {
        return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
    }
    getPathGenerator(type) {
        return this.pathGenerators.get(type);
    }
    getPlugin(plugin) {
        return this.plugins.find((t) => t.id === plugin);
    }
    getPreset(preset) {
        return this.presets.get(preset);
    }
    getShapeDrawer(type) {
        return this.drawers.get(type);
    }
    getSupportedShapes() {
        return this.drawers.keys();
    }
    getUpdaters(container, force = false) {
        return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
    }
    loadOptions(options, sourceOptions) {
        for (const plugin of this.plugins) {
            plugin.loadOptions(options, sourceOptions);
        }
    }
    loadParticlesOptions(container, options, ...sourceOptions) {
        const updaters = this.updaters.get(container);
        if (!updaters) {
            return;
        }
        for (const updater of updaters) {
            if (updater.loadOptions) {
                updater.loadOptions(options, ...sourceOptions);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Point.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Point.js ***!
  \*****************************************************************/
/*! exports provided: Point */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return Point; });
class Point {
    constructor(position, particle) {
        this.position = position;
        this.particle = particle;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/QuadTree.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/QuadTree.js ***!
  \********************************************************************/
/*! exports provided: QuadTree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuadTree", function() { return QuadTree; });
/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Circle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js");
/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Rectangle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");



class QuadTree {
    constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this._points = [];
        this._divided = false;
    }
    insert(point) {
        var _a, _b, _c, _d, _e;
        if (!this.rectangle.contains(point.position)) {
            return false;
        }
        if (this._points.length < this.capacity) {
            this._points.push(point);
            return true;
        }
        if (!this._divided) {
            this.subdivide();
        }
        return ((_e = (((_a = this._NE) === null || _a === void 0 ? void 0 : _a.insert(point)) ||
            ((_b = this._NW) === null || _b === void 0 ? void 0 : _b.insert(point)) ||
            ((_c = this._SE) === null || _c === void 0 ? void 0 : _c.insert(point)) ||
            ((_d = this._SW) === null || _d === void 0 ? void 0 : _d.insert(point)))) !== null && _e !== void 0 ? _e : false);
    }
    query(range, check, found) {
        var _a, _b, _c, _d;
        const res = found !== null && found !== void 0 ? found : [];
        if (!range.intersects(this.rectangle)) {
            return [];
        }
        for (const p of this._points) {
            if (!range.contains(p.position) &&
                Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__["getDistance"])(range.position, p.position) > p.particle.getRadius() &&
                (!check || check(p.particle))) {
                continue;
            }
            res.push(p.particle);
        }
        if (this._divided) {
            (_a = this._NE) === null || _a === void 0 ? void 0 : _a.query(range, check, res);
            (_b = this._NW) === null || _b === void 0 ? void 0 : _b.query(range, check, res);
            (_c = this._SE) === null || _c === void 0 ? void 0 : _c.query(range, check, res);
            (_d = this._SW) === null || _d === void 0 ? void 0 : _d.query(range, check, res);
        }
        return res;
    }
    queryCircle(position, radius, check) {
        return this.query(new _Circle__WEBPACK_IMPORTED_MODULE_0__["Circle"](position.x, position.y, radius), check);
    }
    queryRectangle(position, size, check) {
        return this.query(new _Rectangle__WEBPACK_IMPORTED_MODULE_1__["Rectangle"](position.x, position.y, size.width, size.height), check);
    }
    subdivide() {
        const x = this.rectangle.position.x, y = this.rectangle.position.y, w = this.rectangle.size.width, h = this.rectangle.size.height, capacity = this.capacity;
        this._NE = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_1__["Rectangle"](x, y, w / 2, h / 2), capacity);
        this._NW = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_1__["Rectangle"](x + w / 2, y, w / 2, h / 2), capacity);
        this._SE = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_1__["Rectangle"](x, y + h / 2, w / 2, h / 2), capacity);
        this._SW = new QuadTree(new _Rectangle__WEBPACK_IMPORTED_MODULE_1__["Rectangle"](x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this._divided = true;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Range.js ***!
  \*****************************************************************/
/*! exports provided: Range */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return Range; });
class Range {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y,
        };
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js ***!
  \*********************************************************************/
/*! exports provided: Rectangle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
/* harmony import */ var _Circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Circle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js");
/* harmony import */ var _Range__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Range */ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js");


class Rectangle extends _Range__WEBPACK_IMPORTED_MODULE_1__["Range"] {
    constructor(x, y, width, height) {
        super(x, y);
        this.size = {
            height: height,
            width: width,
        };
    }
    contains(point) {
        const w = this.size.width, h = this.size.height, pos = this.position;
        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
    }
    intersects(range) {
        if (range instanceof _Circle__WEBPACK_IMPORTED_MODULE_0__["Circle"]) {
            range.intersects(this);
        }
        const w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position, size2 = range instanceof Rectangle ? range.size : { width: 0, height: 0 }, w2 = size2.width, h2 = size2.height;
        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js ***!
  \******************************************************************/
/*! exports provided: Vector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return Vector; });
/* harmony import */ var _Vector3d__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3d */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js");

class Vector extends _Vector3d__WEBPACK_IMPORTED_MODULE_0__["Vector3d"] {
    constructor(xOrCoords, y) {
        super(xOrCoords, y, 0);
    }
    static get origin() {
        return Vector.create(0, 0);
    }
    static clone(source) {
        return Vector.create(source.x, source.y);
    }
    static create(x, y) {
        return new Vector(x, y);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js ***!
  \********************************************************************/
/*! exports provided: Vector3d */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector3d", function() { return Vector3d; });
class Vector3d {
    constructor(xOrCoords, y, z) {
        if (typeof xOrCoords !== "number" && xOrCoords) {
            this.x = xOrCoords.x;
            this.y = xOrCoords.y;
            const coords3d = xOrCoords;
            this.z = coords3d.z ? coords3d.z : 0;
        }
        else if (xOrCoords !== undefined && y !== undefined) {
            this.x = xOrCoords;
            this.y = y;
            this.z = z !== null && z !== void 0 ? z : 0;
        }
        else {
            throw new Error("tsParticles - Vector3d not initialized correctly");
        }
    }
    static get origin() {
        return Vector3d.create(0, 0, 0);
    }
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    set angle(angle) {
        this.updateFromAngle(angle, this.length);
    }
    get length() {
        return Math.sqrt(this.getLengthSq());
    }
    set length(length) {
        this.updateFromAngle(this.angle, length);
    }
    static clone(source) {
        return Vector3d.create(source.x, source.y, source.z);
    }
    static create(x, y, z) {
        return new Vector3d(x, y, z);
    }
    add(v) {
        return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    addTo(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }
    copy() {
        return Vector3d.clone(this);
    }
    distanceTo(v) {
        return this.sub(v).length;
    }
    distanceToSq(v) {
        return this.sub(v).getLengthSq();
    }
    div(n) {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
    }
    divTo(n) {
        this.x /= n;
        this.y /= n;
        this.z /= n;
    }
    getLengthSq() {
        return this.x ** 2 + this.y ** 2;
    }
    mult(n) {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
    }
    multTo(n) {
        this.x *= n;
        this.y *= n;
        this.z *= n;
    }
    rotate(angle) {
        return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), 0);
    }
    setTo(c) {
        this.x = c.x;
        this.y = c.y;
        const v3d = c;
        this.z = v3d.z ? v3d.z : 0;
    }
    sub(v) {
        return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    subFrom(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }
    updateFromAngle(angle, length) {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/AnimationStatus.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/AnimationStatus.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Directions/MoveDirection.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Directions/MoveDirection.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Directions/OutModeDirection.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Directions/OutModeDirection.js ***!
  \**********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Directions/RotateDirection.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Directions/RotateDirection.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/InteractivityDetect.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/InteractivityDetect.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/ClickMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/ClickMode.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/CollisionMode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/CollisionMode.js ***!
  \**************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/DivMode.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/DivMode.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/HoverMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/HoverMode.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/OutMode.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/OutMode.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/ResponsiveMode.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/ResponsiveMode.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/SizeMode.js":
/*!*********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/SizeMode.js ***!
  \*********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Modes/ThemeMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Modes/ThemeMode.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/AlterType.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/AlterType.js ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/DestroyType.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/DestroyType.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/DivType.js":
/*!********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/DivType.js ***!
  \********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/EasingType.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/EasingType.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/GradientType.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/GradientType.js ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/InteractorType.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/InteractorType.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/ParticleOutType.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/ParticleOutType.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Enums/Types/StartValueType.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Enums/Types/StartValueType.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js ***!
  \********************************************************************************/
/*! exports provided: AnimatableColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatableColor", function() { return AnimatableColor; });
/* harmony import */ var _HslAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HslAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js");
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");


class AnimatableColor extends _OptionsColor__WEBPACK_IMPORTED_MODULE_1__["OptionsColor"] {
    constructor() {
        super();
        this.animation = new _HslAnimation__WEBPACK_IMPORTED_MODULE_0__["HslAnimation"]();
    }
    static create(source, data) {
        const color = new AnimatableColor();
        color.load(source);
        if (data !== undefined) {
            if (typeof data === "string" || data instanceof Array) {
                color.load({ value: data });
            }
            else {
                color.load(data);
            }
        }
        return color;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        const colorAnimation = data.animation;
        if (colorAnimation !== undefined) {
            if (colorAnimation.enable !== undefined) {
                this.animation.h.load(colorAnimation);
            }
            else {
                this.animation.load(data.animation);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js ***!
  \*********************************************************************************/
/*! exports provided: AnimationOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimationOptions", function() { return AnimationOptions; });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class AnimationOptions {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.decay = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.decay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js ***!
  \**************************************************************************************/
/*! exports provided: Background */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Background", function() { return Background; });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class Background {
    constructor() {
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"]();
        this.color.value = "";
        this.image = "";
        this.position = "";
        this.repeat = "";
        this.size = "";
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        }
        if (data.image !== undefined) {
            this.image = data.image;
        }
        if (data.position !== undefined) {
            this.position = data.position;
        }
        if (data.repeat !== undefined) {
            this.repeat = data.repeat;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js ***!
  \**********************************************************************************************/
/*! exports provided: BackgroundMask */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundMask", function() { return BackgroundMask; });
/* harmony import */ var _BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundMaskCover */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js");

class BackgroundMask {
    constructor() {
        this.composite = "destination-out";
        this.cover = new _BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_0__["BackgroundMaskCover"]();
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.composite !== undefined) {
            this.composite = data.composite;
        }
        if (data.cover !== undefined) {
            const cover = data.cover;
            const color = (typeof data.cover === "string" ? { color: data.cover } : data.cover);
            this.cover.load(cover.color !== undefined ? cover : { color: color });
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js ***!
  \***************************************************************************************************/
/*! exports provided: BackgroundMaskCover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundMaskCover", function() { return BackgroundMaskCover; });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class BackgroundMaskCover {
    constructor() {
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"]();
        this.color.value = "#fff";
        this.opacity = 1;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js ***!
  \*******************************************************************************/
/*! exports provided: ColorAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ColorAnimation", function() { return ColorAnimation; });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class ColorAnimation {
    constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.decay = 0;
        this.sync = true;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.count !== undefined) {
            this.count = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.count);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset !== undefined) {
            this.offset = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.offset);
        }
        if (data.speed !== undefined) {
            this.speed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.decay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js ***!
  \**************************************************************************************/
/*! exports provided: FullScreen */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullScreen", function() { return FullScreen; });
class FullScreen {
    constructor() {
        this.enable = true;
        this.zIndex = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.zIndex !== undefined) {
            this.zIndex = data.zIndex;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js ***!
  \*****************************************************************************/
/*! exports provided: HslAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HslAnimation", function() { return HslAnimation; });
/* harmony import */ var _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js");

class HslAnimation {
    constructor() {
        this.h = new _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__["ColorAnimation"]();
        this.s = new _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__["ColorAnimation"]();
        this.l = new _ColorAnimation__WEBPACK_IMPORTED_MODULE_0__["ColorAnimation"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.h.load(data.h);
        this.s.load(data.s);
        this.l.load(data.l);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js ***!
  \************************************************************************************************/
/*! exports provided: ClickEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClickEvent", function() { return ClickEvent; });
class ClickEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js ***!
  \**********************************************************************************************/
/*! exports provided: DivEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DivEvent", function() { return DivEvent; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

class DivEvent {
    constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = "circle";
    }
    get el() {
        return this.elementId;
    }
    set el(value) {
        this.elementId = value;
    }
    get elementId() {
        return this.ids;
    }
    set elementId(value) {
        this.ids = value;
    }
    get ids() {
        return Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(this.selectors, (t) => t.replace("#", ""));
    }
    set ids(value) {
        this.selectors = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(value, (t) => `#${t}`);
    }
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;
        if (ids !== undefined) {
            this.ids = ids;
        }
        if (data.selectors !== undefined) {
            this.selectors = data.selectors;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js ***!
  \********************************************************************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony import */ var _ClickEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js");
/* harmony import */ var _DivEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DivEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js");
/* harmony import */ var _HoverEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HoverEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js");
/* harmony import */ var _ResizeEvent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResizeEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ResizeEvent.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");





class Events {
    constructor() {
        this.onClick = new _ClickEvent__WEBPACK_IMPORTED_MODULE_0__["ClickEvent"]();
        this.onDiv = new _DivEvent__WEBPACK_IMPORTED_MODULE_1__["DivEvent"]();
        this.onHover = new _HoverEvent__WEBPACK_IMPORTED_MODULE_2__["HoverEvent"]();
        this.resize = new _ResizeEvent__WEBPACK_IMPORTED_MODULE_3__["ResizeEvent"]();
    }
    get onclick() {
        return this.onClick;
    }
    set onclick(value) {
        this.onClick = value;
    }
    get ondiv() {
        return this.onDiv;
    }
    set ondiv(value) {
        this.onDiv = value;
    }
    get onhover() {
        return this.onHover;
    }
    set onhover(value) {
        this.onHover = value;
    }
    load(data) {
        var _a, _b, _c;
        if (!data) {
            return;
        }
        this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
        const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;
        if (onDiv !== undefined) {
            this.onDiv = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_4__["executeOnSingleOrMultiple"])(onDiv, (t) => {
                const tmp = new _DivEvent__WEBPACK_IMPORTED_MODULE_1__["DivEvent"]();
                tmp.load(t);
                return tmp;
            });
        }
        this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
        if (typeof data.resize === "boolean") {
            this.resize.enable = data.resize;
        }
        else {
            this.resize.load(data.resize);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js ***!
  \************************************************************************************************/
/*! exports provided: HoverEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoverEvent", function() { return HoverEvent; });
/* harmony import */ var _Parallax__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parallax */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js");

class HoverEvent {
    constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new _Parallax__WEBPACK_IMPORTED_MODULE_0__["Parallax"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.parallax.load(data.parallax);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js ***!
  \**********************************************************************************************/
/*! exports provided: Parallax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Parallax", function() { return Parallax; });
class Parallax {
    constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.force !== undefined) {
            this.force = data.force;
        }
        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ResizeEvent.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ResizeEvent.js ***!
  \*************************************************************************************************/
/*! exports provided: ResizeEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeEvent", function() { return ResizeEvent; });
class ResizeEvent {
    constructor() {
        this.delay = 0.5;
        this.enable = true;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.delay !== undefined) {
            this.delay = data.delay;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js ***!
  \********************************************************************************************/
/*! exports provided: Interactivity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interactivity", function() { return Interactivity; });
/* harmony import */ var _Events_Events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Events/Events */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js");
/* harmony import */ var _Modes_Modes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modes/Modes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js");


class Interactivity {
    constructor(engine, container) {
        this.detectsOn = "window";
        this.events = new _Events_Events__WEBPACK_IMPORTED_MODULE_0__["Events"]();
        this.modes = new _Modes_Modes__WEBPACK_IMPORTED_MODULE_1__["Modes"](engine, container);
    }
    get detect_on() {
        return this.detectsOn;
    }
    set detect_on(value) {
        this.detectsOn = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;
        if (detectsOn !== undefined) {
            this.detectsOn = detectsOn;
        }
        this.events.load(data.events);
        this.modes.load(data.modes);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js ***!
  \******************************************************************************************/
/*! exports provided: Modes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modes", function() { return Modes; });
class Modes {
    constructor(engine, container) {
        this._engine = engine;
        this._container = container;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (this._container) {
            const interactors = this._engine.plugins.interactors.get(this._container);
            if (interactors) {
                for (const interactor of interactors) {
                    if (interactor.loadModeOptions) {
                        interactor.loadModeOptions(this, data);
                    }
                }
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js ***!
  \*******************************************************************************/
/*! exports provided: ManualParticle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManualParticle", function() { return ManualParticle; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

class ManualParticle {
    load(data) {
        var _a, _b;
        if (!data) {
            return;
        }
        if (data.position !== undefined) {
            this.position = {
                x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
                y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50,
            };
        }
        if (data.options !== undefined) {
            this.options = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Options.js":
/*!************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Options.js ***!
  \************************************************************************/
/*! exports provided: Options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return Options; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Background_Background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Background/Background */ "./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js");
/* harmony import */ var _BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BackgroundMask/BackgroundMask */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js");
/* harmony import */ var _FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FullScreen/FullScreen */ "./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js");
/* harmony import */ var _Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Interactivity/Interactivity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js");
/* harmony import */ var _ManualParticle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ManualParticle */ "./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js");
/* harmony import */ var _Responsive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Responsive */ "./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js");
/* harmony import */ var _Theme_Theme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Theme/Theme */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js");
/* harmony import */ var _Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Utils/OptionsUtils */ "./node_modules/tsparticles-engine/esm/Utils/OptionsUtils.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");










class Options {
    constructor(engine, container) {
        this._engine = engine;
        this._container = container;
        this.autoPlay = true;
        this.background = new _Background_Background__WEBPACK_IMPORTED_MODULE_1__["Background"]();
        this.backgroundMask = new _BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_2__["BackgroundMask"]();
        this.defaultThemes = {};
        this.delay = 0;
        this.fullScreen = new _FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_3__["FullScreen"]();
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new _Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_4__["Interactivity"](engine, container);
        this.manualParticles = [];
        this.particles = Object(_Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_8__["loadParticlesOptions"])(this._engine, this._container);
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.smooth = false;
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
    }
    get backgroundMode() {
        return this.fullScreen;
    }
    set backgroundMode(value) {
        this.fullScreen.load(value);
    }
    get fps_limit() {
        return this.fpsLimit;
    }
    set fps_limit(value) {
        this.fpsLimit = value;
    }
    get retina_detect() {
        return this.detectRetina;
    }
    set retina_detect(value) {
        this.detectRetina = value;
    }
    load(data) {
        var _a, _b, _c, _d, _e;
        if (!data) {
            return;
        }
        if (data.preset !== undefined) {
            Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(data.preset, (preset) => this._importPreset(preset));
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.delay !== undefined) {
            this.delay = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_9__["setRangeValue"])(data.delay);
        }
        const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
        if (detectRetina !== undefined) {
            this.detectRetina = detectRetina;
        }
        if (data.duration !== undefined) {
            this.duration = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_9__["setRangeValue"])(data.duration);
        }
        const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
        if (fpsLimit !== undefined) {
            this.fpsLimit = fpsLimit;
        }
        if (data.pauseOnBlur !== undefined) {
            this.pauseOnBlur = data.pauseOnBlur;
        }
        if (data.pauseOnOutsideViewport !== undefined) {
            this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }
        if (data.zLayers !== undefined) {
            this.zLayers = data.zLayers;
        }
        this.background.load(data.background);
        const fullScreen = (_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode;
        if (typeof fullScreen === "boolean") {
            this.fullScreen.enable = fullScreen;
        }
        else {
            this.fullScreen.load(fullScreen);
        }
        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles !== undefined) {
            this.manualParticles = data.manualParticles.map((t) => {
                const tmp = new _ManualParticle__WEBPACK_IMPORTED_MODULE_5__["ManualParticle"]();
                tmp.load(t);
                return tmp;
            });
        }
        this.particles.load(data.particles);
        this.style = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])(this.style, data.style);
        this._engine.plugins.loadOptions(this, data);
        if (data.smooth !== undefined) {
            this.smooth = data.smooth;
        }
        const interactors = this._engine.plugins.interactors.get(this._container);
        if (interactors) {
            for (const interactor of interactors) {
                if (interactor.loadOptions) {
                    interactor.loadOptions(this, data);
                }
            }
        }
        if (data.responsive !== undefined) {
            for (const responsive of data.responsive) {
                const optResponsive = new _Responsive__WEBPACK_IMPORTED_MODULE_6__["Responsive"]();
                optResponsive.load(responsive);
                this.responsive.push(optResponsive);
            }
        }
        this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);
        if (data.themes !== undefined) {
            for (const theme of data.themes) {
                const existingTheme = this.themes.find((t) => t.name === theme.name);
                if (!existingTheme) {
                    const optTheme = new _Theme_Theme__WEBPACK_IMPORTED_MODULE_7__["Theme"]();
                    optTheme.load(theme);
                    this.themes.push(optTheme);
                }
                else {
                    existingTheme.load(theme);
                }
            }
        }
        this.defaultThemes.dark = (_d = this._findDefaultTheme("dark")) === null || _d === void 0 ? void 0 : _d.name;
        this.defaultThemes.light = (_e = this._findDefaultTheme("light")) === null || _e === void 0 ? void 0 : _e.name;
    }
    setResponsive(width, pxRatio, defaultOptions) {
        this.load(defaultOptions);
        const responsiveOptions = this.responsive.find((t) => t.mode === "screen" && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
        this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
        return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
    }
    setTheme(name) {
        if (name) {
            const chosenTheme = this.themes.find((theme) => theme.name === name);
            if (chosenTheme) {
                this.load(chosenTheme.options);
            }
        }
        else {
            const mediaMatch = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["safeMatchMedia"])("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = this._findDefaultTheme(clientDarkMode ? "dark" : "light");
            if (defaultTheme) {
                this.load(defaultTheme.options);
            }
        }
    }
    _findDefaultTheme(mode) {
        var _a;
        return ((_a = this.themes.find((theme) => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find((theme) => theme.default.value && theme.default.mode === "any"));
    }
    _importPreset(preset) {
        this.load(this._engine.plugins.getPreset(preset));
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js ***!
  \*****************************************************************************/
/*! exports provided: OptionsColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsColor", function() { return OptionsColor; });
class OptionsColor {
    constructor() {
        this.value = "";
    }
    static create(source, data) {
        const color = new OptionsColor();
        color.load(source);
        if (data !== undefined) {
            if (typeof data === "string" || data instanceof Array) {
                color.load({ value: data });
            }
            else {
                color.load(data);
            }
        }
        return color;
    }
    load(data) {
        if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
            return;
        }
        this.value = data.value;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js ***!
  \*************************************************************************************************/
/*! exports provided: ParticlesBounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticlesBounce", function() { return ParticlesBounce; });
/* harmony import */ var _ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParticlesBounceFactor */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js");

class ParticlesBounce {
    constructor() {
        this.horizontal = new _ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_0__["ParticlesBounceFactor"]();
        this.vertical = new _ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_0__["ParticlesBounceFactor"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js ***!
  \*******************************************************************************************************/
/*! exports provided: ParticlesBounceFactor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticlesBounceFactor", function() { return ParticlesBounceFactor; });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class ParticlesBounceFactor extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"] {
    constructor() {
        super();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js ***!
  \************************************************************************************************/
/*! exports provided: Collisions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collisions", function() { return Collisions; });
/* harmony import */ var _CollisionsAbsorb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollisionsAbsorb */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsAbsorb.js");
/* harmony import */ var _CollisionsOverlap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollisionsOverlap */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js");
/* harmony import */ var _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Bounce/ParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js");



class Collisions {
    constructor() {
        this.absorb = new _CollisionsAbsorb__WEBPACK_IMPORTED_MODULE_0__["CollisionsAbsorb"]();
        this.bounce = new _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_2__["ParticlesBounce"]();
        this.enable = false;
        this.mode = "bounce";
        this.overlap = new _CollisionsOverlap__WEBPACK_IMPORTED_MODULE_1__["CollisionsOverlap"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        this.absorb.load(data.absorb);
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsAbsorb.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsAbsorb.js ***!
  \******************************************************************************************************/
/*! exports provided: CollisionsAbsorb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollisionsAbsorb", function() { return CollisionsAbsorb; });
class CollisionsAbsorb {
    constructor() {
        this.speed = 2;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js ***!
  \*******************************************************************************************************/
/*! exports provided: CollisionsOverlap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollisionsOverlap", function() { return CollisionsOverlap; });
class CollisionsOverlap {
    constructor() {
        this.enable = true;
        this.retries = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.retries !== undefined) {
            this.retries = data.retries;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js ***!
  \************************************************************************************/
/*! exports provided: Move */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Move", function() { return Move; });
/* harmony import */ var _MoveAngle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MoveAngle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js");
/* harmony import */ var _MoveAttract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MoveAttract */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js");
/* harmony import */ var _MoveCenter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MoveCenter */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveCenter.js");
/* harmony import */ var _MoveGravity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MoveGravity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js");
/* harmony import */ var _Path_MovePath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Path/MovePath */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js");
/* harmony import */ var _MoveTrail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MoveTrail */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js");
/* harmony import */ var _OutModes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./OutModes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js");
/* harmony import */ var _Spin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Spin */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");









class Move {
    constructor() {
        this.angle = new _MoveAngle__WEBPACK_IMPORTED_MODULE_0__["MoveAngle"]();
        this.attract = new _MoveAttract__WEBPACK_IMPORTED_MODULE_1__["MoveAttract"]();
        this.center = new _MoveCenter__WEBPACK_IMPORTED_MODULE_2__["MoveCenter"]();
        this.decay = 0;
        this.distance = {};
        this.direction = "none";
        this.drift = 0;
        this.enable = false;
        this.gravity = new _MoveGravity__WEBPACK_IMPORTED_MODULE_3__["MoveGravity"]();
        this.path = new _Path_MovePath__WEBPACK_IMPORTED_MODULE_4__["MovePath"]();
        this.outModes = new _OutModes__WEBPACK_IMPORTED_MODULE_6__["OutModes"]();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new _Spin__WEBPACK_IMPORTED_MODULE_7__["Spin"]();
        this.straight = false;
        this.trail = new _MoveTrail__WEBPACK_IMPORTED_MODULE_5__["MoveTrail"]();
        this.vibrate = false;
        this.warp = false;
    }
    get bounce() {
        return this.collisions;
    }
    set bounce(value) {
        this.collisions = value;
    }
    get collisions() {
        return false;
    }
    set collisions(_) {
    }
    get noise() {
        return this.path;
    }
    set noise(value) {
        this.path = value;
    }
    get outMode() {
        return this.outModes.default;
    }
    set outMode(value) {
        this.outModes.default = value;
    }
    get out_mode() {
        return this.outMode;
    }
    set out_mode(value) {
        this.outMode = value;
    }
    load(data) {
        var _a, _b, _c;
        if (!data) {
            return;
        }
        this.angle.load(typeof data.angle === "number" ? { value: data.angle } : data.angle);
        this.attract.load(data.attract);
        this.center.load(data.center);
        if (data.decay !== undefined) {
            this.decay = data.decay;
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.distance !== undefined) {
            this.distance =
                typeof data.distance === "number"
                    ? {
                        horizontal: data.distance,
                        vertical: data.distance,
                    }
                    : Object.assign({}, data.distance);
        }
        if (data.drift !== undefined) {
            this.drift = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_8__["setRangeValue"])(data.drift);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.gravity.load(data.gravity);
        const outModes = (_b = (_a = data.outModes) !== null && _a !== void 0 ? _a : data.outMode) !== null && _b !== void 0 ? _b : data.out_mode;
        if (outModes !== undefined) {
            if (typeof outModes === "object") {
                this.outModes.load(outModes);
            }
            else {
                this.outModes.load({
                    default: outModes,
                });
            }
        }
        this.path.load((_c = data.path) !== null && _c !== void 0 ? _c : data.noise);
        if (data.random !== undefined) {
            this.random = data.random;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.speed !== undefined) {
            this.speed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_8__["setRangeValue"])(data.speed);
        }
        this.spin.load(data.spin);
        if (data.straight !== undefined) {
            this.straight = data.straight;
        }
        this.trail.load(data.trail);
        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js ***!
  \*****************************************************************************************/
/*! exports provided: MoveAngle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveAngle", function() { return MoveAngle; });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class MoveAngle {
    constructor() {
        this.offset = 0;
        this.value = 90;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.offset);
        }
        if (data.value !== undefined) {
            this.value = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.value);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js ***!
  \*******************************************************************************************/
/*! exports provided: MoveAttract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveAttract", function() { return MoveAttract; });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class MoveAttract {
    constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
            x: 3000,
            y: 3000,
        };
    }
    get rotateX() {
        return this.rotate.x;
    }
    set rotateX(value) {
        this.rotate.x = value;
    }
    get rotateY() {
        return this.rotate.y;
    }
    set rotateY(value) {
        this.rotate.y = value;
    }
    load(data) {
        var _a, _b, _c, _d;
        if (!data) {
            return;
        }
        if (data.distance !== undefined) {
            this.distance = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.distance);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;
        if (rotateX !== undefined) {
            this.rotate.x = rotateX;
        }
        const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;
        if (rotateY !== undefined) {
            this.rotate.y = rotateY;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveCenter.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveCenter.js ***!
  \******************************************************************************************/
/*! exports provided: MoveCenter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveCenter", function() { return MoveCenter; });
class MoveCenter {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.mode = "percent";
        this.radius = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.x !== undefined) {
            this.x = data.x;
        }
        if (data.y !== undefined) {
            this.y = data.y;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.radius !== undefined) {
            this.radius = data.radius;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js ***!
  \*******************************************************************************************/
/*! exports provided: MoveGravity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveGravity", function() { return MoveGravity; });
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class MoveGravity {
    constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.inverse = false;
        this.maxSpeed = 50;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.inverse !== undefined) {
            this.inverse = data.inverse;
        }
        if (data.maxSpeed !== undefined) {
            this.maxSpeed = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(data.maxSpeed);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js ***!
  \*****************************************************************************************/
/*! exports provided: MoveTrail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveTrail", function() { return MoveTrail; });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class MoveTrail {
    constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"]();
        this.fillColor.value = "#000000";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.fillColor = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.fillColor, data.fillColor);
        if (data.length !== undefined) {
            this.length = data.length;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js ***!
  \****************************************************************************************/
/*! exports provided: OutModes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutModes", function() { return OutModes; });
class OutModes {
    constructor() {
        this.default = "out";
    }
    load(data) {
        var _a, _b, _c, _d;
        if (!data) {
            return;
        }
        if (data.default !== undefined) {
            this.default = data.default;
        }
        this.bottom = (_a = data.bottom) !== null && _a !== void 0 ? _a : data.default;
        this.left = (_b = data.left) !== null && _b !== void 0 ? _b : data.default;
        this.right = (_c = data.right) !== null && _c !== void 0 ? _c : data.default;
        this.top = (_d = data.top) !== null && _d !== void 0 ? _d : data.default;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js ***!
  \*********************************************************************************************/
/*! exports provided: MovePath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovePath", function() { return MovePath; });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


class MovePath {
    constructor() {
        this.clamp = true;
        this.delay = new _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"]();
        this.enable = false;
        this.options = {};
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.clamp !== undefined) {
            this.clamp = data.clamp;
        }
        this.delay.load(data.delay);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.generator = data.generator;
        if (data.options) {
            this.options = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["deepExtend"])(this.options, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js ***!
  \************************************************************************************/
/*! exports provided: Spin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Spin", function() { return Spin; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class Spin {
    constructor() {
        this.acceleration = 0;
        this.enable = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.acceleration !== undefined) {
            this.acceleration = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__["setRangeValue"])(data.acceleration);
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.position = data.position ? Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, data.position) : undefined;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js ***!
  \**************************************************************************************************/
/*! exports provided: ParticlesDensity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticlesDensity", function() { return ParticlesDensity; });
class ParticlesDensity {
    constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1000;
    }
    get value_area() {
        return this.area;
    }
    set value_area(value) {
        this.area = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;
        if (area !== undefined) {
            this.area = area;
        }
        if (data.factor !== undefined) {
            this.factor = data.factor;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js ***!
  \*************************************************************************************************/
/*! exports provided: ParticlesNumber */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticlesNumber", function() { return ParticlesNumber; });
/* harmony import */ var _ParticlesDensity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParticlesDensity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js");

class ParticlesNumber {
    constructor() {
        this.density = new _ParticlesDensity__WEBPACK_IMPORTED_MODULE_0__["ParticlesDensity"]();
        this.limit = 0;
        this.value = 100;
    }
    get max() {
        return this.limit;
    }
    set max(value) {
        this.limit = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        this.density.load(data.density);
        const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
        if (limit !== undefined) {
            this.limit = limit;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js ***!
  \******************************************************************************************/
/*! exports provided: Opacity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Opacity", function() { return Opacity; });
/* harmony import */ var _OpacityAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OpacityAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js");
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");



class Opacity extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__["ValueWithRandom"] {
    constructor() {
        super();
        this.animation = new _OpacityAnimation__WEBPACK_IMPORTED_MODULE_0__["OpacityAnimation"]();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__["setRangeValue"])(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js ***!
  \***************************************************************************************************/
/*! exports provided: OpacityAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpacityAnimation", function() { return OpacityAnimation; });
/* harmony import */ var _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AnimationOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js");

class OpacityAnimation extends _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__["AnimationOptions"] {
    constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 2;
        this.startValue = "random";
        this.sync = false;
    }
    get opacity_min() {
        return this.minimumValue;
    }
    set opacity_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js ***!
  \*******************************************************************************************/
/*! exports provided: ParticlesOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParticlesOptions", function() { return ParticlesOptions; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony import */ var _AnimatableColor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js");
/* harmony import */ var _Collisions_Collisions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Collisions/Collisions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js");
/* harmony import */ var _Move_Move__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Move/Move */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js");
/* harmony import */ var _Opacity_Opacity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Opacity/Opacity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js");
/* harmony import */ var _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Bounce/ParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js");
/* harmony import */ var _Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Number/ParticlesNumber */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js");
/* harmony import */ var _Shadow__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Shadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js");
/* harmony import */ var _Shape_Shape__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Shape/Shape */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js");
/* harmony import */ var _Size_Size__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Size/Size */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js");
/* harmony import */ var _Stroke__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Stroke */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js");
/* harmony import */ var _ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ZIndex/ZIndex */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js");












class ParticlesOptions {
    constructor(engine, container) {
        this._engine = engine;
        this._container = container;
        this.bounce = new _Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_5__["ParticlesBounce"]();
        this.collisions = new _Collisions_Collisions__WEBPACK_IMPORTED_MODULE_2__["Collisions"]();
        this.color = new _AnimatableColor__WEBPACK_IMPORTED_MODULE_1__["AnimatableColor"]();
        this.color.value = "#fff";
        this.groups = {};
        this.move = new _Move_Move__WEBPACK_IMPORTED_MODULE_3__["Move"]();
        this.number = new _Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_6__["ParticlesNumber"]();
        this.opacity = new _Opacity_Opacity__WEBPACK_IMPORTED_MODULE_4__["Opacity"]();
        this.reduceDuplicates = false;
        this.shadow = new _Shadow__WEBPACK_IMPORTED_MODULE_7__["Shadow"]();
        this.shape = new _Shape_Shape__WEBPACK_IMPORTED_MODULE_8__["Shape"]();
        this.size = new _Size_Size__WEBPACK_IMPORTED_MODULE_9__["Size"]();
        this.stroke = new _Stroke__WEBPACK_IMPORTED_MODULE_10__["Stroke"]();
        this.zIndex = new _ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_11__["ZIndex"]();
    }
    load(data) {
        var _a, _b, _c, _d, _e, _f;
        if (!data) {
            return;
        }
        this.bounce.load(data.bounce);
        this.color.load(_AnimatableColor__WEBPACK_IMPORTED_MODULE_1__["AnimatableColor"].create(this.color, data.color));
        if (data.groups !== undefined) {
            for (const group in data.groups) {
                const item = data.groups[group];
                if (item !== undefined) {
                    this.groups[group] = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])((_a = this.groups[group]) !== null && _a !== void 0 ? _a : {}, item);
                }
            }
        }
        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        if (data.reduceDuplicates !== undefined) {
            this.reduceDuplicates = data.reduceDuplicates;
        }
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.zIndex.load(data.zIndex);
        const collisions = (_c = (_b = data.move) === null || _b === void 0 ? void 0 : _b.collisions) !== null && _c !== void 0 ? _c : (_d = data.move) === null || _d === void 0 ? void 0 : _d.bounce;
        if (collisions !== undefined) {
            this.collisions.enable = collisions;
        }
        this.collisions.load(data.collisions);
        if (data.interactivity !== undefined) {
            this.interactivity = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, data.interactivity);
        }
        const strokeToLoad = (_e = data.stroke) !== null && _e !== void 0 ? _e : (_f = data.shape) === null || _f === void 0 ? void 0 : _f.stroke;
        if (strokeToLoad) {
            this.stroke = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(strokeToLoad, (t) => {
                const tmp = new _Stroke__WEBPACK_IMPORTED_MODULE_10__["Stroke"]();
                tmp.load(t);
                return tmp;
            });
        }
        if (this._container) {
            const updaters = this._engine.plugins.updaters.get(this._container);
            if (updaters) {
                for (const updater of updaters) {
                    if (updater.loadOptions) {
                        updater.loadOptions(this, data);
                    }
                }
            }
            const interactors = this._engine.plugins.interactors.get(this._container);
            if (interactors) {
                for (const interactor of interactors) {
                    if (interactor.loadParticlesOptions) {
                        interactor.loadParticlesOptions(this, data);
                    }
                }
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js ***!
  \*********************************************************************************/
/*! exports provided: Shadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return Shadow; });
/* harmony import */ var _OptionsColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");

class Shadow {
    constructor() {
        this.blur = 0;
        this.color = new _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"]();
        this.enable = false;
        this.offset = {
            x: 0,
            y: 0,
        };
        this.color.value = "#000";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.blur !== undefined) {
            this.blur = data.blur;
        }
        this.color = _OptionsColor__WEBPACK_IMPORTED_MODULE_0__["OptionsColor"].create(this.color, data.color);
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.offset === undefined) {
            return;
        }
        if (data.offset.x !== undefined) {
            this.offset.x = data.offset.x;
        }
        if (data.offset.y !== undefined) {
            this.offset.y = data.offset.y;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js ***!
  \**************************************************************************************/
/*! exports provided: Shape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return Shape; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

const charKey = "character", charAltKey = "char", imageKey = "image", imageAltKey = "images", polygonKey = "polygon", polygonAltKey = "star";
class Shape {
    constructor() {
        this.options = {};
        this.type = "circle";
    }
    get character() {
        var _a;
        return ((_a = this.options[charKey]) !== null && _a !== void 0 ? _a : this.options[charAltKey]);
    }
    set character(value) {
        this.options[charAltKey] = this.options[charKey] = value;
    }
    get custom() {
        return this.options;
    }
    set custom(value) {
        this.options = value;
    }
    get image() {
        var _a;
        return ((_a = this.options[imageKey]) !== null && _a !== void 0 ? _a : this.options[imageAltKey]);
    }
    set image(value) {
        this.options[imageAltKey] = this.options[imageKey] = value;
    }
    get images() {
        return this.image;
    }
    set images(value) {
        this.image = value;
    }
    get polygon() {
        var _a;
        return ((_a = this.options[polygonKey]) !== null && _a !== void 0 ? _a : this.options[polygonAltKey]);
    }
    set polygon(value) {
        this.options[polygonAltKey] = this.options[polygonKey] = value;
    }
    get stroke() {
        return [];
    }
    set stroke(_value) {
    }
    load(data) {
        var _a, _b, _c;
        if (!data) {
            return;
        }
        const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;
        if (options !== undefined) {
            for (const shape in options) {
                const item = options[shape];
                if (item) {
                    this.options[shape] = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
                }
            }
        }
        this.loadShape(data.character, charKey, charAltKey, true);
        this.loadShape(data.polygon, polygonKey, polygonAltKey, false);
        this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, imageKey, imageAltKey, true);
        if (data.type !== undefined) {
            this.type = data.type;
        }
    }
    loadShape(item, mainKey, altKey, altOverride) {
        var _a, _b;
        if (!item) {
            return;
        }
        const isArray = item instanceof Array;
        const emptyValue = isArray ? [] : {}, mainDifferentValues = isArray !== this.options[mainKey] instanceof Array, altDifferentValues = isArray !== this.options[altKey] instanceof Array;
        if (mainDifferentValues) {
            this.options[mainKey] = emptyValue;
        }
        if (altDifferentValues && altOverride) {
            this.options[altKey] = emptyValue;
        }
        this.options[mainKey] = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : emptyValue, item);
        if (!this.options[altKey] || altOverride) {
            this.options[altKey] = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : emptyValue, item);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js ***!
  \************************************************************************************/
/*! exports provided: Size */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return Size; });
/* harmony import */ var _SizeAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SizeAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js");
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");



class Size extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_1__["ValueWithRandom"] {
    constructor() {
        super();
        this.animation = new _SizeAnimation__WEBPACK_IMPORTED_MODULE_0__["SizeAnimation"]();
        this.random.minimumValue = 1;
        this.value = 3;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        super.load(data);
        if (!data) {
            return;
        }
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
            this.animation.load(animation);
            this.value = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_2__["setRangeValue"])(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js ***!
  \*********************************************************************************************/
/*! exports provided: SizeAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SizeAnimation", function() { return SizeAnimation; });
/* harmony import */ var _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AnimationOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js");

class SizeAnimation extends _AnimationOptions__WEBPACK_IMPORTED_MODULE_0__["AnimationOptions"] {
    constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 5;
        this.startValue = "random";
        this.sync = false;
    }
    get size_min() {
        return this.minimumValue;
    }
    set size_min(value) {
        this.minimumValue = value;
    }
    load(data) {
        var _a;
        super.load(data);
        if (!data) {
            return;
        }
        if (data.destroy !== undefined) {
            this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
            this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js ***!
  \*********************************************************************************/
/*! exports provided: Stroke */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stroke", function() { return Stroke; });
/* harmony import */ var _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js");

class Stroke {
    constructor() {
        this.width = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.color !== undefined) {
            this.color = _AnimatableColor__WEBPACK_IMPORTED_MODULE_0__["AnimatableColor"].create(this.color, data.color);
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js ***!
  \****************************************************************************************/
/*! exports provided: ZIndex */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZIndex", function() { return ZIndex; });
/* harmony import */ var _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");

class ZIndex extends _ValueWithRandom__WEBPACK_IMPORTED_MODULE_0__["ValueWithRandom"] {
    constructor() {
        super();
        this.opacityRate = 1;
        this.sizeRate = 1;
        this.velocityRate = 1;
    }
    load(data) {
        super.load(data);
        if (!data) {
            return;
        }
        if (data.opacityRate !== undefined) {
            this.opacityRate = data.opacityRate;
        }
        if (data.sizeRate !== undefined) {
            this.sizeRate = data.sizeRate;
        }
        if (data.velocityRate !== undefined) {
            this.velocityRate = data.velocityRate;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Random.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Random.js ***!
  \***********************************************************************/
/*! exports provided: Random */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Random", function() { return Random; });
class Random {
    constructor() {
        this.enable = false;
        this.minimumValue = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.minimumValue !== undefined) {
            this.minimumValue = data.minimumValue;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js ***!
  \***************************************************************************/
/*! exports provided: Responsive */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Responsive", function() { return Responsive; });
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");

class Responsive {
    constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = "canvas";
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.maxWidth !== undefined) {
            this.maxWidth = data.maxWidth;
        }
        if (data.mode !== undefined) {
            if (data.mode === "screen") {
                this.mode = "screen";
            }
            else {
                this.mode = "canvas";
            }
        }
        if (data.options !== undefined) {
            this.options = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_0__["deepExtend"])({}, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js ***!
  \****************************************************************************/
/*! exports provided: Theme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return Theme; });
/* harmony import */ var _ThemeDefault__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThemeDefault */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js");
/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


class Theme {
    constructor() {
        this.name = "";
        this.default = new _ThemeDefault__WEBPACK_IMPORTED_MODULE_0__["ThemeDefault"]();
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.name !== undefined) {
            this.name = data.name;
        }
        this.default.load(data.default);
        if (data.options !== undefined) {
            this.options = Object(_Utils_Utils__WEBPACK_IMPORTED_MODULE_1__["deepExtend"])({}, data.options);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js ***!
  \***********************************************************************************/
/*! exports provided: ThemeDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeDefault", function() { return ThemeDefault; });
class ThemeDefault {
    constructor() {
        this.auto = false;
        this.mode = "any";
        this.value = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.auto !== undefined) {
            this.auto = data.auto;
        }
        if (data.mode !== undefined) {
            this.mode = data.mode;
        }
        if (data.value !== undefined) {
            this.value = data.value;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js ***!
  \********************************************************************************/
/*! exports provided: ValueWithRandom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueWithRandom", function() { return ValueWithRandom; });
/* harmony import */ var _Random__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Random */ "./node_modules/tsparticles-engine/esm/Options/Classes/Random.js");
/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");


class ValueWithRandom {
    constructor() {
        this.random = new _Random__WEBPACK_IMPORTED_MODULE_0__["Random"]();
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (typeof data.random === "boolean") {
            this.random.enable = data.random;
        }
        else {
            this.random.load(data.random);
        }
        if (data.value !== undefined) {
            this.value = Object(_Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_1__["setRangeValue"])(data.value, this.random.enable ? this.random.minimumValue : undefined);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Background/IBackground.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Background/IBackground.js ***!
  \******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMask.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMask.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js ***!
  \*******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/FullScreen/IFullScreen.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/FullScreen/IFullScreen.js ***!
  \******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatable.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatable.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableColor.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableColor.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimation.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimation.js ***!
  \******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IColorAnimation.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IColorAnimation.js ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IHslAnimation.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IHslAnimation.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IManualParticle.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IManualParticle.js ***!
  \***********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionLoader.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionLoader.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptions.js":
/*!****************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptions.js ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsColor.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsColor.js ***!
  \*********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IResponsive.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IResponsive.js ***!
  \*******************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IValueWithRandom.js":
/*!************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/IValueWithRandom.js ***!
  \************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IClickEvent.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IClickEvent.js ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IDivEvent.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IDivEvent.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IEvents.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IEvents.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IHoverEvent.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IHoverEvent.js ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IParallax.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IParallax.js ***!
  \**************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/IInteractivity.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/IInteractivity.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModeDiv.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModeDiv.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModes.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModes.js ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Bounce/IParticlesBounce.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Bounce/IParticlesBounce.js ***!
  \*****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisions.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisions.js ***!
  \****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js ***!
  \***********************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IParticlesOptions.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IParticlesOptions.js ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IShadow.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IShadow.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IStroke.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IStroke.js ***!
  \*************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMove.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMove.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAngle.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAngle.js ***!
  \*********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAttract.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAttract.js ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveCenter.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveCenter.js ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveGravity.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveGravity.js ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveTrail.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveTrail.js ***!
  \*********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IOutModes.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IOutModes.js ***!
  \********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/ISpin.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/ISpin.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/Path/IMovePath.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/Path/IMovePath.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesDensity.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesDensity.js ***!
  \******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesNumber.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesNumber.js ***!
  \*****************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacity.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacity.js ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js ***!
  \*******************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/ICharacterShape.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/ICharacterShape.js ***!
  \***************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IImageShape.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IImageShape.js ***!
  \***********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IPolygonShape.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IPolygonShape.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShape.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShape.js ***!
  \******************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShapeValues.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShapeValues.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Core_Interfaces_IShapeValues__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Core/Interfaces/IShapeValues */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js");
/* empty/unused harmony star reexport */


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IStarShape.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IStarShape.js ***!
  \**********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISize.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISize.js ***!
  \****************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISizeAnimation.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISizeAnimation.js ***!
  \*************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/ZIndex/IZIndex.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/ZIndex/IZIndex.js ***!
  \********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/ITheme.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/ITheme.js ***!
  \********************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/IThemeDefault.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/IThemeDefault.js ***!
  \***************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/PathOptions.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/PathOptions.js ***!
  \******************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/RangeValue.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/RangeValue.js ***!
  \*****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/RecursivePartial.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/RecursivePartial.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/ShapeData.js":
/*!****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/ShapeData.js ***!
  \****************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/ShapeDrawerFunctions.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/ShapeDrawerFunctions.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Types/SingleOrMultiple.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Types/SingleOrMultiple.js ***!
  \***********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js ***!
  \******************************************************************/
/*! exports provided: drawLine, drawTriangle, paintBase, clear, drawParticle, drawShape, drawShapeAfterEffect, drawPlugin, drawParticlePlugin, alterHsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawLine", function() { return drawLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawTriangle", function() { return drawTriangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "paintBase", function() { return paintBase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return clear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawParticle", function() { return drawParticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawShape", function() { return drawShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawShapeAfterEffect", function() { return drawShapeAfterEffect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawPlugin", function() { return drawPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawParticlePlugin", function() { return drawParticlePlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alterHsl", function() { return alterHsl; });
/* harmony import */ var _ColorUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");

function drawLine(context, begin, end) {
    context.beginPath();
    context.moveTo(begin.x, begin.y);
    context.lineTo(end.x, end.y);
    context.closePath();
}
function drawTriangle(context, p1, p2, p3) {
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.closePath();
}
function paintBase(context, dimension, baseColor) {
    context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
    context.fillRect(0, 0, dimension.width, dimension.height);
}
function clear(context, dimension) {
    context.clearRect(0, 0, dimension.width, dimension.height);
}
function drawParticle(data) {
    var _a, _b, _c, _d, _e, _f;
    const { container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow, transform, } = data;
    const pos = particle.getPosition(), angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : 0), rotateData = {
        sin: Math.sin(angle),
        cos: Math.cos(angle),
    }, transformData = {
        a: rotateData.cos * ((_a = transform.a) !== null && _a !== void 0 ? _a : 1),
        b: rotateData.sin * ((_b = transform.b) !== null && _b !== void 0 ? _b : 1),
        c: -rotateData.sin * ((_c = transform.c) !== null && _c !== void 0 ? _c : 1),
        d: rotateData.cos * ((_d = transform.d) !== null && _d !== void 0 ? _d : 1),
    };
    context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
    context.beginPath();
    if (backgroundMask) {
        context.globalCompositeOperation = composite;
    }
    const shadowColor = particle.shadowColor;
    if (shadow.enable && shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = Object(_ColorUtils__WEBPACK_IMPORTED_MODULE_0__["getStyleFromRgb"])(shadowColor);
        context.shadowOffsetX = shadow.offset.x;
        context.shadowOffsetY = shadow.offset.y;
    }
    if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
    }
    const stroke = particle.stroke;
    context.lineWidth = (_e = particle.strokeWidth) !== null && _e !== void 0 ? _e : 0;
    if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
    }
    drawShape(container, context, particle, radius, opacity, delta);
    if (((_f = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _f !== void 0 ? _f : 0) > 0) {
        context.stroke();
    }
    if (particle.close) {
        context.closePath();
    }
    if (particle.fill) {
        context.fill();
    }
    drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
    context.globalCompositeOperation = "source-over";
    context.setTransform(1, 0, 0, 1, 0, 0);
}
function drawShape(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
        return;
    }
    const drawer = container.drawers.get(particle.shape);
    if (!drawer) {
        return;
    }
    drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
    if (!particle.shape) {
        return;
    }
    const drawer = container.drawers.get(particle.shape);
    if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
        return;
    }
    drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
}
function drawPlugin(context, plugin, delta) {
    if (!plugin.draw) {
        return;
    }
    plugin.draw(context, delta);
}
function drawParticlePlugin(context, plugin, particle, delta) {
    if (!plugin.drawParticle) {
        return;
    }
    plugin.drawParticle(context, particle, delta);
}
function alterHsl(color, type, value) {
    return {
        h: color.h,
        s: color.s,
        l: color.l + (type === "darken" ? -1 : 1) * value,
    };
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js ***!
  \*****************************************************************/
/*! exports provided: addColorManager, rangeColorToRgb, colorToRgb, colorToHsl, rangeColorToHsl, rgbToHsl, stringToAlpha, stringToRgb, hslToRgb, hslaToRgba, getRandomRgbColor, getStyleFromRgb, getStyleFromHsl, colorMix, getLinkColor, getLinkRandomColor, getHslFromAnimation, getHslAnimationFromHsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addColorManager", function() { return addColorManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeColorToRgb", function() { return rangeColorToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorToRgb", function() { return colorToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorToHsl", function() { return colorToHsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeColorToHsl", function() { return rangeColorToHsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbToHsl", function() { return rgbToHsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToAlpha", function() { return stringToAlpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringToRgb", function() { return stringToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslToRgb", function() { return hslToRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslaToRgba", function() { return hslaToRgba; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomRgbColor", function() { return getRandomRgbColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyleFromRgb", function() { return getStyleFromRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyleFromHsl", function() { return getStyleFromHsl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorMix", function() { return colorMix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLinkColor", function() { return getLinkColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLinkRandomColor", function() { return getLinkRandomColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHslFromAnimation", function() { return getHslFromAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHslAnimationFromHsl", function() { return getHslAnimationFromHsl; });
/* harmony import */ var _NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");


const randomColorValue = "random", midColorValue = "mid", colorManagers = new Map();
function addColorManager(manager) {
    colorManagers.set(manager.key, manager);
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
function stringToRgba(input) {
    for (const [, manager] of colorManagers) {
        if (input.startsWith(manager.stringPrefix)) {
            return manager.parseString(input);
        }
    }
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, hexFixed = input.replace(shorthandRegex, (_, r, g, b, a) => {
        return r + r + g + g + b + b + (a !== undefined ? a + a : "");
    }), regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, result = regex.exec(hexFixed);
    return result
        ? {
            a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
            b: parseInt(result[3], 16),
            g: parseInt(result[2], 16),
            r: parseInt(result[1], 16),
        }
        : undefined;
}
function rangeColorToRgb(input, index, useIndex = true) {
    if (!input) {
        return;
    }
    const color = typeof input === "string" ? { value: input } : input;
    if (typeof color.value === "string") {
        return colorToRgb(color.value, index, useIndex);
    }
    if (color.value instanceof Array) {
        return rangeColorToRgb({
            value: Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["itemFromArray"])(color.value, index, useIndex),
        });
    }
    for (const [, manager] of colorManagers) {
        const res = manager.handleRangeColor(color);
        if (res) {
            return res;
        }
    }
}
function colorToRgb(input, index, useIndex = true) {
    if (!input) {
        return;
    }
    const color = typeof input === "string" ? { value: input } : input;
    if (typeof color.value === "string") {
        return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
    }
    if (color.value instanceof Array) {
        return colorToRgb({
            value: Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["itemFromArray"])(color.value, index, useIndex),
        });
    }
    for (const [, manager] of colorManagers) {
        const res = manager.handleColor(color);
        if (res) {
            return res;
        }
    }
}
function colorToHsl(color, index, useIndex = true) {
    const rgb = colorToRgb(color, index, useIndex);
    return rgb ? rgbToHsl(rgb) : undefined;
}
function rangeColorToHsl(color, index, useIndex = true) {
    const rgb = rangeColorToRgb(color, index, useIndex);
    return rgb ? rgbToHsl(rgb) : undefined;
}
function rgbToHsl(color) {
    const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
        h: 0,
        l: (max + min) / 2,
        s: 0,
    };
    if (max !== min) {
        res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
        res.h =
            r1 === max
                ? (g1 - b1) / (max - min)
                : (res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min));
    }
    res.l *= 100;
    res.s *= 100;
    res.h *= 60;
    if (res.h < 0) {
        res.h += 360;
    }
    if (res.h >= 360) {
        res.h -= 360;
    }
    return res;
}
function stringToAlpha(input) {
    var _a;
    return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
}
function stringToRgb(input) {
    return stringToRgba(input);
}
function hslToRgb(hsl) {
    const result = { b: 0, g: 0, r: 0 }, hslPercent = {
        h: hsl.h / 360,
        l: hsl.l / 100,
        s: hsl.s / 100,
    };
    if (!hslPercent.s) {
        result.b = hslPercent.l;
        result.g = hslPercent.l;
        result.r = hslPercent.l;
    }
    else {
        const q = hslPercent.l < 0.5
            ? hslPercent.l * (1 + hslPercent.s)
            : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s, p = 2 * hslPercent.l - q;
        result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
        result.g = hue2rgb(p, q, hslPercent.h);
        result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
    }
    result.r = Math.floor(result.r * 255);
    result.g = Math.floor(result.g * 255);
    result.b = Math.floor(result.b * 255);
    return result;
}
function hslaToRgba(hsla) {
    const rgbResult = hslToRgb(hsla);
    return {
        a: hsla.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r,
    };
}
function getRandomRgbColor(min) {
    const fixedMin = min !== null && min !== void 0 ? min : 0;
    return {
        b: Math.floor(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(fixedMin, 256))),
        g: Math.floor(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(fixedMin, 256))),
        r: Math.floor(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["setRangeValue"])(fixedMin, 256))),
    };
}
function getStyleFromRgb(color, opacity) {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function getStyleFromHsl(color, opacity) {
    return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
function colorMix(color1, color2, size1, size2) {
    let rgb1 = color1, rgb2 = color2;
    if (rgb1.r === undefined) {
        rgb1 = hslToRgb(color1);
    }
    if (rgb2.r === undefined) {
        rgb2 = hslToRgb(color2);
    }
    return {
        b: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["mix"])(rgb1.b, rgb2.b, size1, size2),
        g: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["mix"])(rgb1.g, rgb2.g, size1, size2),
        r: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["mix"])(rgb1.r, rgb2.r, size1, size2),
    };
}
function getLinkColor(p1, p2, linkColor) {
    var _a, _b;
    if (linkColor === randomColorValue) {
        return getRandomRgbColor();
    }
    else if (linkColor === midColorValue) {
        const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor(), destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();
        if (sourceColor && destColor && p2) {
            return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
        }
        else {
            const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;
            if (hslColor) {
                return hslToRgb(hslColor);
            }
        }
    }
    else {
        return linkColor;
    }
}
function getLinkRandomColor(optColor, blink, consent) {
    const color = typeof optColor === "string" ? optColor : optColor.value;
    if (color === randomColorValue) {
        if (consent) {
            return rangeColorToRgb({
                value: color,
            });
        }
        if (blink) {
            return randomColorValue;
        }
        return midColorValue;
    }
    else if (color === midColorValue) {
        return midColorValue;
    }
    else {
        return rangeColorToRgb({
            value: color,
        });
    }
}
function getHslFromAnimation(animation) {
    return animation !== undefined
        ? {
            h: animation.h.value,
            s: animation.s.value,
            l: animation.l.value,
        }
        : undefined;
}
function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
    const resColor = {
        h: {
            enable: false,
            value: hsl.h,
        },
        s: {
            enable: false,
            value: hsl.s,
        },
        l: {
            enable: false,
            value: hsl.l,
        },
    };
    if (animationOptions) {
        setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
        setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
        setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
    }
    return resColor;
}
function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
    colorValue.enable = colorAnimation.enable;
    if (colorValue.enable) {
        colorValue.velocity = (Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(colorAnimation.speed) / 100) * reduceFactor;
        colorValue.decay = 1 - Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(colorAnimation.decay);
        colorValue.status = "increasing";
        if (!colorAnimation.sync) {
            colorValue.velocity *= Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
            colorValue.value *= Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
        }
    }
    else {
        colorValue.velocity = 0;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/EventDispatcher.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/EventDispatcher.js ***!
  \**********************************************************************/
/*! exports provided: EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
class EventDispatcher {
    constructor() {
        this._listeners = new Map();
    }
    addEventListener(type, listener) {
        var _a;
        this.removeEventListener(type, listener);
        if (!this._listeners.get(type)) {
            this._listeners.set(type, []);
        }
        (_a = this._listeners.get(type)) === null || _a === void 0 ? void 0 : _a.push(listener);
    }
    dispatchEvent(type, args) {
        var _a;
        (_a = this._listeners.get(type)) === null || _a === void 0 ? void 0 : _a.forEach((handler) => handler(args));
    }
    hasEventListener(type) {
        return !!this._listeners.get(type);
    }
    removeAllEventListeners(type) {
        if (!type) {
            this._listeners = new Map();
        }
        else {
            this._listeners.delete(type);
        }
    }
    removeEventListener(type, listener) {
        const arr = this._listeners.get(type);
        if (!arr) {
            return;
        }
        const length = arr.length, idx = arr.indexOf(listener);
        if (idx < 0) {
            return;
        }
        if (length === 1) {
            this._listeners.delete(type);
        }
        else {
            arr.splice(idx, 1);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/HslColorManager.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/HslColorManager.js ***!
  \**********************************************************************/
/*! exports provided: HslColorManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HslColorManager", function() { return HslColorManager; });
/* harmony import */ var _NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _ColorUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");


class HslColorManager {
    constructor() {
        this.key = "hsl";
        this.stringPrefix = "hsl";
    }
    handleColor(color) {
        var _a;
        const colorValue = color.value, hslColor = (_a = colorValue.hsl) !== null && _a !== void 0 ? _a : color.value;
        if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
            return Object(_ColorUtils__WEBPACK_IMPORTED_MODULE_1__["hslToRgb"])(hslColor);
        }
    }
    handleRangeColor(color) {
        var _a;
        const colorValue = color.value, hslColor = (_a = colorValue.hsl) !== null && _a !== void 0 ? _a : color.value;
        if (hslColor.h !== undefined && hslColor.l !== undefined) {
            return Object(_ColorUtils__WEBPACK_IMPORTED_MODULE_1__["hslToRgb"])({
                h: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(hslColor.h),
                l: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(hslColor.l),
                s: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(hslColor.s),
            });
        }
    }
    parseString(input) {
        if (!input.startsWith("hsl")) {
            return;
        }
        const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i, result = regex.exec(input);
        return result
            ? Object(_ColorUtils__WEBPACK_IMPORTED_MODULE_1__["hslaToRgba"])({
                a: result.length > 4 ? Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["parseAlpha"])(result[5]) : 1,
                h: parseInt(result[1], 10),
                l: parseInt(result[3], 10),
                s: parseInt(result[2], 10),
            })
            : undefined;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js":
/*!******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js ***!
  \******************************************************************/
/*! exports provided: addEasing, getEasing, setRandom, getRandom, clamp, mix, randomInRange, getRangeValue, getRangeMin, getRangeMax, setRangeValue, getValue, getDistances, getDistance, getParticleDirectionAngle, getParticleBaseVelocity, collisionVelocity, calcPositionFromSize, calcPositionOrRandomFromSize, calcPositionOrRandomFromSizeRanged, calcExactPositionOrRandomFromSize, calcExactPositionOrRandomFromSizeRanged, parseAlpha */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEasing", function() { return addEasing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEasing", function() { return getEasing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRandom", function() { return setRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandom", function() { return getRandom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mix", function() { return mix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randomInRange", function() { return randomInRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRangeValue", function() { return getRangeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRangeMin", function() { return getRangeMin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRangeMax", function() { return getRangeMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRangeValue", function() { return setRangeValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValue", function() { return getValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistances", function() { return getDistances; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistance", function() { return getDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParticleDirectionAngle", function() { return getParticleDirectionAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParticleBaseVelocity", function() { return getParticleBaseVelocity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collisionVelocity", function() { return collisionVelocity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcPositionFromSize", function() { return calcPositionFromSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcPositionOrRandomFromSize", function() { return calcPositionOrRandomFromSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcPositionOrRandomFromSizeRanged", function() { return calcPositionOrRandomFromSizeRanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcExactPositionOrRandomFromSize", function() { return calcExactPositionOrRandomFromSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calcExactPositionOrRandomFromSizeRanged", function() { return calcExactPositionOrRandomFromSizeRanged; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseAlpha", function() { return parseAlpha; });
/* harmony import */ var _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");

let _random = Math.random;
const easings = new Map();
function addEasing(name, easing) {
    if (!easings.get(name)) {
        easings.set(name, easing);
    }
}
function getEasing(name) {
    return easings.get(name) || ((value) => value);
}
function setRandom(rnd = Math.random) {
    _random = rnd;
}
function getRandom() {
    return clamp(_random(), 0, 1 - 1e-16);
}
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
    const max = getRangeMax(r);
    let min = getRangeMin(r);
    if (max === min) {
        min = 0;
    }
    return getRandom() * (max - min) + min;
}
function getRangeValue(value) {
    return typeof value === "number" ? value : randomInRange(value);
}
function getRangeMin(value) {
    return typeof value === "number" ? value : value.min;
}
function getRangeMax(value) {
    return typeof value === "number" ? value : value.max;
}
function setRangeValue(source, value) {
    if (source === value || (value === undefined && typeof source === "number")) {
        return source;
    }
    const min = getRangeMin(source), max = getRangeMax(source);
    return value !== undefined
        ? {
            min: Math.min(min, value),
            max: Math.max(max, value),
        }
        : setRangeValue(min, max);
}
function getValue(options) {
    const random = options.random, { enable, minimumValue } = typeof random === "boolean"
        ? {
            enable: random,
            minimumValue: 0,
        }
        : random;
    return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx ** 2 + dy ** 2) };
}
function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
function getParticleDirectionAngle(direction, position, center) {
    if (typeof direction === "number") {
        return (direction * Math.PI) / 180;
    }
    else {
        switch (direction) {
            case "top":
                return -Math.PI / 2;
            case "top-right":
                return -Math.PI / 4;
            case "right":
                return 0;
            case "bottom-right":
                return Math.PI / 4;
            case "bottom":
                return Math.PI / 2;
            case "bottom-left":
                return (3 * Math.PI) / 4;
            case "left":
                return Math.PI;
            case "top-left":
                return (-3 * Math.PI) / 4;
            case "inside":
                return Math.atan2(center.y - position.y, center.x - position.x);
            case "outside":
                return Math.atan2(position.y - center.y, position.x - center.x);
            default:
                return getRandom() * Math.PI * 2;
        }
    }
}
function getParticleBaseVelocity(direction) {
    const baseVelocity = _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
    return _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_0__["Vector"].create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}
function calcPositionFromSize(data) {
    return data.position && data.position.x !== undefined && data.position.y !== undefined
        ? {
            x: (data.position.x * data.size.width) / 100,
            y: (data.position.y * data.size.height) / 100,
        }
        : undefined;
}
function calcPositionOrRandomFromSize(data) {
    var _a, _b, _c, _d;
    return {
        x: (((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : getRandom() * 100) * data.size.width) / 100,
        y: (((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : getRandom() * 100) * data.size.height) / 100,
    };
}
function calcPositionOrRandomFromSizeRanged(data) {
    var _a, _b;
    const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcPositionOrRandomFromSize({ size: data.size, position });
}
function calcExactPositionOrRandomFromSize(data) {
    var _a, _b, _c, _d;
    return {
        x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : getRandom() * data.size.width,
        y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : getRandom() * data.size.height,
    };
}
function calcExactPositionOrRandomFromSizeRanged(data) {
    var _a, _b;
    const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcExactPositionOrRandomFromSize({ size: data.size, position });
}
function parseAlpha(input) {
    return input ? (input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input)) : 1;
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/OptionsUtils.js":
/*!*******************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/OptionsUtils.js ***!
  \*******************************************************************/
/*! exports provided: loadOptions, loadParticlesOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOptions", function() { return loadOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadParticlesOptions", function() { return loadParticlesOptions; });
/* harmony import */ var _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Options/Classes/Particles/ParticlesOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js");

function loadOptions(options, ...sourceOptionsArr) {
    for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
    }
}
function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
    const options = new _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_0__["ParticlesOptions"](engine, container);
    loadOptions(options, ...sourceOptionsArr);
    return options;
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/RgbColorManager.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/RgbColorManager.js ***!
  \**********************************************************************/
/*! exports provided: RgbColorManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RgbColorManager", function() { return RgbColorManager; });
/* harmony import */ var _NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");

class RgbColorManager {
    constructor() {
        this.key = "rgb";
        this.stringPrefix = "rgb";
    }
    handleColor(color) {
        var _a;
        const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
        if (rgbColor.r !== undefined) {
            return rgbColor;
        }
    }
    handleRangeColor(color) {
        var _a;
        const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
        if (rgbColor.r !== undefined) {
            return {
                r: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rgbColor.r),
                g: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rgbColor.g),
                b: Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(rgbColor.b),
            };
        }
    }
    parseString(input) {
        if (!input.startsWith(this.stringPrefix)) {
            return;
        }
        const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.%]+)\s*)?\)/i, result = regex.exec(input);
        return result
            ? {
                a: result.length > 4 ? Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["parseAlpha"])(result[5]) : 1,
                b: parseInt(result[3], 10),
                g: parseInt(result[2], 10),
                r: parseInt(result[1], 10),
            }
            : undefined;
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/Utils/Utils.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/Utils/Utils.js ***!
  \************************************************************/
/*! exports provided: isSsr, hasMatchMedia, safeMatchMedia, animate, cancelAnimation, isInArray, loadFont, arrayRandomIndex, itemFromArray, isPointInside, areBoundsInside, calculateBounds, deepExtend, isDivModeEnabled, divModeExecute, singleDivModeExecute, divMode, circleBounceDataFromParticle, circleBounce, rectBounce, executeOnSingleOrMultiple, itemFromSingleOrMultiple, findItemFromSingleOrMultiple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSsr", function() { return isSsr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasMatchMedia", function() { return hasMatchMedia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "safeMatchMedia", function() { return safeMatchMedia; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return animate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cancelAnimation", function() { return cancelAnimation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInArray", function() { return isInArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFont", function() { return loadFont; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayRandomIndex", function() { return arrayRandomIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "itemFromArray", function() { return itemFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPointInside", function() { return isPointInside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areBoundsInside", function() { return areBoundsInside; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateBounds", function() { return calculateBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepExtend", function() { return deepExtend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDivModeEnabled", function() { return isDivModeEnabled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divModeExecute", function() { return divModeExecute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "singleDivModeExecute", function() { return singleDivModeExecute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divMode", function() { return divMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleBounceDataFromParticle", function() { return circleBounceDataFromParticle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleBounce", function() { return circleBounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rectBounce", function() { return rectBounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeOnSingleOrMultiple", function() { return executeOnSingleOrMultiple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "itemFromSingleOrMultiple", function() { return itemFromSingleOrMultiple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findItemFromSingleOrMultiple", function() { return findItemFromSingleOrMultiple; });
/* harmony import */ var _NumberUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony import */ var _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");


function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
    const res = { bounced: false };
    if (pOtherSide.min < rectOtherSide.min ||
        pOtherSide.min > rectOtherSide.max ||
        pOtherSide.max < rectOtherSide.min ||
        pOtherSide.max > rectOtherSide.max) {
        return res;
    }
    if ((pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0) ||
        (pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0)) {
        res.velocity = velocity * -factor;
        res.bounced = true;
    }
    return res;
}
function checkSelector(element, selectors) {
    const res = executeOnSingleOrMultiple(selectors, (selector) => {
        return element.matches(selector);
    });
    return res instanceof Array ? res.some((t) => t) : res;
}
function isSsr() {
    return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function hasMatchMedia() {
    return !isSsr() && typeof matchMedia !== "undefined";
}
function safeMatchMedia(query) {
    if (!hasMatchMedia()) {
        return;
    }
    return matchMedia(query);
}
function animate() {
    return isSsr()
        ? (callback) => setTimeout(callback)
        : (callback) => (requestAnimationFrame || setTimeout)(callback);
}
function cancelAnimation() {
    return isSsr()
        ? (handle) => clearTimeout(handle)
        : (handle) => (cancelAnimationFrame || clearTimeout)(handle);
}
function isInArray(value, array) {
    return value === array || (array instanceof Array && array.indexOf(value) > -1);
}
async function loadFont(font, weight) {
    try {
        await document.fonts.load(`${weight !== null && weight !== void 0 ? weight : "400"} 36px '${font !== null && font !== void 0 ? font : "Verdana"}'`);
    }
    catch (_a) {
    }
}
function arrayRandomIndex(array) {
    return Math.floor(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
    return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
}
function isPointInside(point, size, offset, radius, direction) {
    return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, offset, direction);
}
function areBoundsInside(bounds, size, offset, direction) {
    let inside = true;
    if (!direction || direction === "bottom") {
        inside = bounds.top < size.height + offset.x;
    }
    if (inside && (!direction || direction === "left")) {
        inside = bounds.right > offset.x;
    }
    if (inside && (!direction || direction === "right")) {
        inside = bounds.left < size.width + offset.y;
    }
    if (inside && (!direction || direction === "top")) {
        inside = bounds.bottom > offset.y;
    }
    return inside;
}
function calculateBounds(point, radius) {
    return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius,
    };
}
function deepExtend(destination, ...sources) {
    for (const source of sources) {
        if (source === undefined || source === null) {
            continue;
        }
        if (typeof source !== "object") {
            destination = source;
            continue;
        }
        const sourceIsArray = Array.isArray(source);
        if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
            destination = [];
        }
        else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
            destination = {};
        }
        for (const key in source) {
            if (key === "__proto__") {
                continue;
            }
            const sourceDict = source, value = sourceDict[key], isObject = typeof value === "object", destDict = destination;
            destDict[key] =
                isObject && Array.isArray(value)
                    ? value.map((v) => deepExtend(destDict[key], v))
                    : deepExtend(destDict[key], value);
        }
    }
    return destination;
}
function isDivModeEnabled(mode, divs) {
    return !!findItemFromSingleOrMultiple(divs, (t) => t.enable && isInArray(mode, t.mode));
}
function divModeExecute(mode, divs, callback) {
    executeOnSingleOrMultiple(divs, (div) => {
        const divMode = div.mode, divEnabled = div.enable;
        if (divEnabled && isInArray(mode, divMode)) {
            singleDivModeExecute(div, callback);
        }
    });
}
function singleDivModeExecute(div, callback) {
    const selectors = div.selectors;
    executeOnSingleOrMultiple(selectors, (selector) => {
        callback(selector, div);
    });
}
function divMode(divs, element) {
    if (!element || !divs) {
        return;
    }
    return findItemFromSingleOrMultiple(divs, (div) => {
        return checkSelector(element, div.selectors);
    });
}
function circleBounceDataFromParticle(p) {
    return {
        position: p.getPosition(),
        radius: p.getRadius(),
        mass: p.getMass(),
        velocity: p.velocity,
        factor: _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_1__["Vector"].create(Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getValue"])(p.options.bounce.horizontal), Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getValue"])(p.options.bounce.vertical)),
    };
}
function circleBounce(p1, p2) {
    const { x: xVelocityDiff, y: yVelocityDiff } = p1.velocity.sub(p2.velocity), [pos1, pos2] = [p1.position, p2.position], { dx: xDist, dy: yDist } = Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(pos2, pos1);
    if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
        return;
    }
    const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["collisionVelocity"])(u1, u2, m1, m2), v2 = Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["collisionVelocity"])(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
    p1.velocity.x = vFinal1.x * p1.factor.x;
    p1.velocity.y = vFinal1.y * p1.factor.y;
    p2.velocity.x = vFinal2.x * p2.factor.x;
    p2.velocity.y = vFinal2.y * p2.factor.y;
}
function rectBounce(particle, divBounds) {
    const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size), resH = rectSideBounce({
        min: bounds.left,
        max: bounds.right,
    }, {
        min: bounds.top,
        max: bounds.bottom,
    }, {
        min: divBounds.left,
        max: divBounds.right,
    }, {
        min: divBounds.top,
        max: divBounds.bottom,
    }, particle.velocity.x, Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getValue"])(particle.options.bounce.horizontal));
    if (resH.bounced) {
        if (resH.velocity !== undefined) {
            particle.velocity.x = resH.velocity;
        }
        if (resH.position !== undefined) {
            particle.position.x = resH.position;
        }
    }
    const resV = rectSideBounce({
        min: bounds.top,
        max: bounds.bottom,
    }, {
        min: bounds.left,
        max: bounds.right,
    }, {
        min: divBounds.top,
        max: divBounds.bottom,
    }, {
        min: divBounds.left,
        max: divBounds.right,
    }, particle.velocity.y, Object(_NumberUtils__WEBPACK_IMPORTED_MODULE_0__["getValue"])(particle.options.bounce.vertical));
    if (resV.bounced) {
        if (resV.velocity !== undefined) {
            particle.velocity.y = resV.velocity;
        }
        if (resV.position !== undefined) {
            particle.position.y = resV.position;
        }
    }
}
function executeOnSingleOrMultiple(obj, callback) {
    return obj instanceof Array ? obj.map((item) => callback(item)) : callback(obj);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
    return obj instanceof Array ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
    return obj instanceof Array ? obj.find((t) => callback(t)) : callback(obj) ? obj : undefined;
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/engine.js":
/*!*******************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/engine.js ***!
  \*******************************************************/
/*! exports provided: Engine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Engine", function() { return Engine; });
/* harmony import */ var _Utils_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils/EventDispatcher */ "./node_modules/tsparticles-engine/esm/Utils/EventDispatcher.js");
/* harmony import */ var _Core_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Core/Loader */ "./node_modules/tsparticles-engine/esm/Core/Loader.js");
/* harmony import */ var _Core_Utils_Plugins__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Core/Utils/Plugins */ "./node_modules/tsparticles-engine/esm/Core/Utils/Plugins.js");



class Engine {
    constructor() {
        this._domArray = [];
        this._eventDispatcher = new _Utils_EventDispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]();
        this._initialized = false;
        this._loader = new _Core_Loader__WEBPACK_IMPORTED_MODULE_1__["Loader"](this);
        this.plugins = new _Core_Utils_Plugins__WEBPACK_IMPORTED_MODULE_2__["Plugins"](this);
    }
    addEventListener(type, listener) {
        this._eventDispatcher.addEventListener(type, listener);
    }
    async addInteractor(name, interactorInitializer) {
        this.plugins.addInteractor(name, interactorInitializer);
        await this.refresh();
    }
    async addMover(name, moverInitializer) {
        this.plugins.addParticleMover(name, moverInitializer);
        await this.refresh();
    }
    async addParticleUpdater(name, updaterInitializer) {
        this.plugins.addParticleUpdater(name, updaterInitializer);
        await this.refresh();
    }
    async addPathGenerator(name, generator) {
        this.plugins.addPathGenerator(name, generator);
        await this.refresh();
    }
    async addPlugin(plugin) {
        this.plugins.addPlugin(plugin);
        await this.refresh();
    }
    async addPreset(preset, options, override = false) {
        this.plugins.addPreset(preset, options, override);
        await this.refresh();
    }
    async addShape(shape, drawer, init, afterEffect, destroy) {
        let customDrawer;
        if (typeof drawer === "function") {
            customDrawer = {
                afterEffect: afterEffect,
                destroy: destroy,
                draw: drawer,
                init: init,
            };
        }
        else {
            customDrawer = drawer;
        }
        this.plugins.addShapeDrawer(shape, customDrawer);
        await this.refresh();
    }
    dispatchEvent(type, args) {
        this._eventDispatcher.dispatchEvent(type, args);
    }
    dom() {
        return this._domArray;
    }
    domItem(index) {
        const dom = this.dom(), item = dom[index];
        if (item && !item.destroyed) {
            return item;
        }
        dom.splice(index, 1);
    }
    init() {
        if (!this._initialized) {
            this._initialized = true;
        }
    }
    async load(tagId, options) {
        return this._loader.load(tagId, options);
    }
    async loadFromArray(tagId, options, index) {
        return this._loader.load(tagId, options, index);
    }
    async loadJSON(tagId, pathConfigJson, index) {
        return this._loader.loadJSON(tagId, pathConfigJson, index);
    }
    async refresh() {
        for (const instance of this.dom()) {
            await instance.refresh();
        }
    }
    removeEventListener(type, listener) {
        this._eventDispatcher.removeEventListener(type, listener);
    }
    async set(id, element, options) {
        return this._loader.set(id, element, options);
    }
    async setJSON(id, element, pathConfigJson, index) {
        return this._loader.setJSON(id, element, pathConfigJson, index);
    }
    setOnClickHandler(callback) {
        const dom = this.dom();
        if (!dom.length) {
            throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }
        for (const domItem of dom) {
            domItem.addClickHandler(callback);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-engine/esm/index.js":
/*!******************************************************!*\
  !*** ./node_modules/tsparticles-engine/esm/index.js ***!
  \******************************************************/
/*! exports provided: Circle, generatedAttribute, touchEndEvent, mouseDownEvent, mouseUpEvent, mouseMoveEvent, touchStartEvent, touchMoveEvent, mouseLeaveEvent, mouseOutEvent, touchCancelEvent, resizeEvent, visibilityChangeEvent, ExternalInteractorBase, ParticlesInteractorBase, Point, Range, Rectangle, Vector, Vector3d, AnimatableColor, AnimationOptions, Background, BackgroundMask, BackgroundMaskCover, ColorAnimation, FullScreen, HslAnimation, ClickEvent, DivEvent, Events, HoverEvent, Parallax, Interactivity, Modes, ManualParticle, Options, OptionsColor, ParticlesBounce, ParticlesBounceFactor, Collisions, CollisionsOverlap, ParticlesOptions, Shadow, Stroke, MoveAttract, Move, MoveAngle, MoveCenter, MoveGravity, OutModes, MovePath, Spin, MoveTrail, ParticlesNumber, ParticlesDensity, Opacity, OpacityAnimation, Shape, Size, SizeAnimation, ZIndex, Responsive, Theme, ThemeDefault, ValueWithRandom, drawLine, drawTriangle, paintBase, clear, drawParticle, drawShape, drawShapeAfterEffect, drawPlugin, drawParticlePlugin, alterHsl, addColorManager, rangeColorToRgb, colorToRgb, colorToHsl, rangeColorToHsl, rgbToHsl, stringToAlpha, stringToRgb, hslToRgb, hslaToRgba, getRandomRgbColor, getStyleFromRgb, getStyleFromHsl, colorMix, getLinkColor, getLinkRandomColor, getHslFromAnimation, getHslAnimationFromHsl, HslColorManager, addEasing, getEasing, setRandom, getRandom, clamp, mix, randomInRange, getRangeValue, getRangeMin, getRangeMax, setRangeValue, getValue, getDistances, getDistance, getParticleDirectionAngle, getParticleBaseVelocity, collisionVelocity, calcPositionFromSize, calcPositionOrRandomFromSize, calcPositionOrRandomFromSizeRanged, calcExactPositionOrRandomFromSize, calcExactPositionOrRandomFromSizeRanged, parseAlpha, loadOptions, loadParticlesOptions, RgbColorManager, isSsr, hasMatchMedia, safeMatchMedia, animate, cancelAnimation, isInArray, loadFont, arrayRandomIndex, itemFromArray, isPointInside, areBoundsInside, calculateBounds, deepExtend, isDivModeEnabled, divModeExecute, singleDivModeExecute, divMode, circleBounceDataFromParticle, circleBounce, rectBounce, executeOnSingleOrMultiple, itemFromSingleOrMultiple, findItemFromSingleOrMultiple, tsParticles, CollisionsAbsorb, ResizeEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tsParticles", function() { return tsParticles; });
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine */ "./node_modules/tsparticles-engine/esm/engine.js");
/* harmony import */ var _Utils_HslColorManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils/HslColorManager */ "./node_modules/tsparticles-engine/esm/Utils/HslColorManager.js");
/* harmony import */ var _Utils_RgbColorManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/RgbColorManager */ "./node_modules/tsparticles-engine/esm/Utils/RgbColorManager.js");
/* harmony import */ var _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/ColorUtils */ "./node_modules/tsparticles-engine/esm/Utils/ColorUtils.js");
/* harmony import */ var _Core_Interfaces_Colors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Core/Interfaces/Colors */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/Colors.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IBounds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Core/Interfaces/IBounds */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBounds.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IBubbleParticleData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Core/Interfaces/IBubbleParticleData */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IBubbleParticleData.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_ICircleBouncer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Core/Interfaces/ICircleBouncer */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICircleBouncer.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IColorManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Core/Interfaces/IColorManager */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IColorManager.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IContainerInteractivity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Core/Interfaces/IContainerInteractivity */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerInteractivity.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IContainerPlugin__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Core/Interfaces/IContainerPlugin */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IContainerPlugin.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_ICoordinates__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Core/Interfaces/ICoordinates */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ICoordinates.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IDelta__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Core/Interfaces/IDelta */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDelta.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IDimension__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Core/Interfaces/IDimension */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDimension.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IDistance__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Core/Interfaces/IDistance */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IDistance.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IExternalInteractor__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Core/Interfaces/IExternalInteractor */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IExternalInteractor.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IInteractor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Core/Interfaces/IInteractor */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IInteractor.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IMouseData__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Core/Interfaces/IMouseData */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMouseData.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IMovePathGenerator__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Core/Interfaces/IMovePathGenerator */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IMovePathGenerator.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticle__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Core/Interfaces/IParticle */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticle.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleColorStyle__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Core/Interfaces/IParticleColorStyle */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleColorStyle.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleHslAnimation__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Core/Interfaces/IParticleHslAnimation */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleHslAnimation.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticlesInteractor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Core/Interfaces/IParticlesInteractor */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesInteractor.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleLife__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Core/Interfaces/IParticleLife */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleLife.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleRetinaProps__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Core/Interfaces/IParticleRetinaProps */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRetinaProps.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleRoll__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Core/Interfaces/IParticleRoll */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleRoll.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleTransformValues__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./Core/Interfaces/IParticleTransformValues */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleTransformValues.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleUpdater__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Core/Interfaces/IParticleUpdater */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleUpdater.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleValueAnimation__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Core/Interfaces/IParticleValueAnimation */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleValueAnimation.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticleWobble__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Core/Interfaces/IParticleWobble */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticleWobble.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IParticlesMover__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Core/Interfaces/IParticlesMover */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IParticlesMover.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IPlugin__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Core/Interfaces/IPlugin */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IPlugin.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IRangeValue__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Core/Interfaces/IRangeValue */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRangeValue.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IRectSideResult__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./Core/Interfaces/IRectSideResult */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IRectSideResult.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IShapeDrawer__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Core/Interfaces/IShapeDrawer */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeDrawer.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_IShapeValues__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Core/Interfaces/IShapeValues */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/IShapeValues.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Interfaces_ISlowParticleData__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Core/Interfaces/ISlowParticleData */ "./node_modules/tsparticles-engine/esm/Core/Interfaces/ISlowParticleData.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Core_Utils_Circle__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Core/Utils/Circle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Circle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return _Core_Utils_Circle__WEBPACK_IMPORTED_MODULE_37__["Circle"]; });

/* harmony import */ var _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Core/Utils/Constants */ "./node_modules/tsparticles-engine/esm/Core/Utils/Constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generatedAttribute", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["generatedAttribute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touchEndEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["touchEndEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseDownEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["mouseDownEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseUpEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["mouseUpEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseMoveEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["mouseMoveEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touchStartEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["touchStartEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touchMoveEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["touchMoveEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseLeaveEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["mouseLeaveEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mouseOutEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["mouseOutEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "touchCancelEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["touchCancelEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resizeEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["resizeEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "visibilityChangeEvent", function() { return _Core_Utils_Constants__WEBPACK_IMPORTED_MODULE_38__["visibilityChangeEvent"]; });

/* harmony import */ var _Core_Utils_ExternalInteractorBase__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Core/Utils/ExternalInteractorBase */ "./node_modules/tsparticles-engine/esm/Core/Utils/ExternalInteractorBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExternalInteractorBase", function() { return _Core_Utils_ExternalInteractorBase__WEBPACK_IMPORTED_MODULE_39__["ExternalInteractorBase"]; });

/* harmony import */ var _Core_Utils_ParticlesInteractorBase__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./Core/Utils/ParticlesInteractorBase */ "./node_modules/tsparticles-engine/esm/Core/Utils/ParticlesInteractorBase.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParticlesInteractorBase", function() { return _Core_Utils_ParticlesInteractorBase__WEBPACK_IMPORTED_MODULE_40__["ParticlesInteractorBase"]; });

/* harmony import */ var _Core_Utils_Point__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./Core/Utils/Point */ "./node_modules/tsparticles-engine/esm/Core/Utils/Point.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Point", function() { return _Core_Utils_Point__WEBPACK_IMPORTED_MODULE_41__["Point"]; });

/* harmony import */ var _Core_Utils_Range__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Core/Utils/Range */ "./node_modules/tsparticles-engine/esm/Core/Utils/Range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Range", function() { return _Core_Utils_Range__WEBPACK_IMPORTED_MODULE_42__["Range"]; });

/* harmony import */ var _Core_Utils_Rectangle__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./Core/Utils/Rectangle */ "./node_modules/tsparticles-engine/esm/Core/Utils/Rectangle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return _Core_Utils_Rectangle__WEBPACK_IMPORTED_MODULE_43__["Rectangle"]; });

/* harmony import */ var _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./Core/Utils/Vector */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector", function() { return _Core_Utils_Vector__WEBPACK_IMPORTED_MODULE_44__["Vector"]; });

/* harmony import */ var _Core_Utils_Vector3d__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./Core/Utils/Vector3d */ "./node_modules/tsparticles-engine/esm/Core/Utils/Vector3d.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Vector3d", function() { return _Core_Utils_Vector3d__WEBPACK_IMPORTED_MODULE_45__["Vector3d"]; });

/* harmony import */ var _Enums_Directions_MoveDirection__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./Enums/Directions/MoveDirection */ "./node_modules/tsparticles-engine/esm/Enums/Directions/MoveDirection.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Directions_RotateDirection__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./Enums/Directions/RotateDirection */ "./node_modules/tsparticles-engine/esm/Enums/Directions/RotateDirection.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Directions_OutModeDirection__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./Enums/Directions/OutModeDirection */ "./node_modules/tsparticles-engine/esm/Enums/Directions/OutModeDirection.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_ClickMode__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./Enums/Modes/ClickMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/ClickMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_DivMode__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./Enums/Modes/DivMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/DivMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_HoverMode__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./Enums/Modes/HoverMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/HoverMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_CollisionMode__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./Enums/Modes/CollisionMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/CollisionMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_OutMode__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./Enums/Modes/OutMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/OutMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_SizeMode__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./Enums/Modes/SizeMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/SizeMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_ThemeMode__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./Enums/Modes/ThemeMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/ThemeMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Modes_ResponsiveMode__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./Enums/Modes/ResponsiveMode */ "./node_modules/tsparticles-engine/esm/Enums/Modes/ResponsiveMode.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_AlterType__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./Enums/Types/AlterType */ "./node_modules/tsparticles-engine/esm/Enums/Types/AlterType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_DestroyType__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./Enums/Types/DestroyType */ "./node_modules/tsparticles-engine/esm/Enums/Types/DestroyType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_GradientType__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./Enums/Types/GradientType */ "./node_modules/tsparticles-engine/esm/Enums/Types/GradientType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_InteractorType__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./Enums/Types/InteractorType */ "./node_modules/tsparticles-engine/esm/Enums/Types/InteractorType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_ParticleOutType__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./Enums/Types/ParticleOutType */ "./node_modules/tsparticles-engine/esm/Enums/Types/ParticleOutType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_StartValueType__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./Enums/Types/StartValueType */ "./node_modules/tsparticles-engine/esm/Enums/Types/StartValueType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_DivType__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./Enums/Types/DivType */ "./node_modules/tsparticles-engine/esm/Enums/Types/DivType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_Types_EasingType__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./Enums/Types/EasingType */ "./node_modules/tsparticles-engine/esm/Enums/Types/EasingType.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_AnimationStatus__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./Enums/AnimationStatus */ "./node_modules/tsparticles-engine/esm/Enums/AnimationStatus.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Enums_InteractivityDetect__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./Enums/InteractivityDetect */ "./node_modules/tsparticles-engine/esm/Enums/InteractivityDetect.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Classes_AnimatableColor__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./Options/Classes/AnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimatableColor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimatableColor", function() { return _Options_Classes_AnimatableColor__WEBPACK_IMPORTED_MODULE_67__["AnimatableColor"]; });

/* harmony import */ var _Options_Classes_AnimationOptions__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./Options/Classes/AnimationOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/AnimationOptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnimationOptions", function() { return _Options_Classes_AnimationOptions__WEBPACK_IMPORTED_MODULE_68__["AnimationOptions"]; });

/* harmony import */ var _Options_Classes_Background_Background__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./Options/Classes/Background/Background */ "./node_modules/tsparticles-engine/esm/Options/Classes/Background/Background.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Background", function() { return _Options_Classes_Background_Background__WEBPACK_IMPORTED_MODULE_69__["Background"]; });

/* harmony import */ var _Options_Classes_BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./Options/Classes/BackgroundMask/BackgroundMask */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMask.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BackgroundMask", function() { return _Options_Classes_BackgroundMask_BackgroundMask__WEBPACK_IMPORTED_MODULE_70__["BackgroundMask"]; });

/* harmony import */ var _Options_Classes_BackgroundMask_BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./Options/Classes/BackgroundMask/BackgroundMaskCover */ "./node_modules/tsparticles-engine/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BackgroundMaskCover", function() { return _Options_Classes_BackgroundMask_BackgroundMaskCover__WEBPACK_IMPORTED_MODULE_71__["BackgroundMaskCover"]; });

/* harmony import */ var _Options_Classes_ColorAnimation__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./Options/Classes/ColorAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/ColorAnimation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ColorAnimation", function() { return _Options_Classes_ColorAnimation__WEBPACK_IMPORTED_MODULE_72__["ColorAnimation"]; });

/* harmony import */ var _Options_Classes_FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./Options/Classes/FullScreen/FullScreen */ "./node_modules/tsparticles-engine/esm/Options/Classes/FullScreen/FullScreen.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FullScreen", function() { return _Options_Classes_FullScreen_FullScreen__WEBPACK_IMPORTED_MODULE_73__["FullScreen"]; });

/* harmony import */ var _Options_Classes_HslAnimation__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./Options/Classes/HslAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/HslAnimation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HslAnimation", function() { return _Options_Classes_HslAnimation__WEBPACK_IMPORTED_MODULE_74__["HslAnimation"]; });

/* harmony import */ var _Options_Classes_Interactivity_Events_ClickEvent__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/ClickEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ClickEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClickEvent", function() { return _Options_Classes_Interactivity_Events_ClickEvent__WEBPACK_IMPORTED_MODULE_75__["ClickEvent"]; });

/* harmony import */ var _Options_Classes_Interactivity_Events_DivEvent__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/DivEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/DivEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DivEvent", function() { return _Options_Classes_Interactivity_Events_DivEvent__WEBPACK_IMPORTED_MODULE_76__["DivEvent"]; });

/* empty/unused harmony star reexport *//* empty/unused harmony star reexport *//* harmony import */ var _Options_Classes_Interactivity_Events_Events__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/Events */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Events.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return _Options_Classes_Interactivity_Events_Events__WEBPACK_IMPORTED_MODULE_77__["Events"]; });

/* harmony import */ var _Options_Classes_Interactivity_Events_HoverEvent__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/HoverEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/HoverEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HoverEvent", function() { return _Options_Classes_Interactivity_Events_HoverEvent__WEBPACK_IMPORTED_MODULE_78__["HoverEvent"]; });

/* harmony import */ var _Options_Classes_Interactivity_Events_Parallax__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/Parallax */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/Parallax.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Parallax", function() { return _Options_Classes_Interactivity_Events_Parallax__WEBPACK_IMPORTED_MODULE_79__["Parallax"]; });

/* harmony import */ var _Options_Classes_Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Interactivity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Interactivity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Interactivity", function() { return _Options_Classes_Interactivity_Interactivity__WEBPACK_IMPORTED_MODULE_80__["Interactivity"]; });

/* harmony import */ var _Options_Classes_Interactivity_Modes_Modes__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Modes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Modes/Modes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modes", function() { return _Options_Classes_Interactivity_Modes_Modes__WEBPACK_IMPORTED_MODULE_81__["Modes"]; });

/* harmony import */ var _Options_Classes_ManualParticle__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./Options/Classes/ManualParticle */ "./node_modules/tsparticles-engine/esm/Options/Classes/ManualParticle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ManualParticle", function() { return _Options_Classes_ManualParticle__WEBPACK_IMPORTED_MODULE_82__["ManualParticle"]; });

/* harmony import */ var _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./Options/Classes/Options */ "./node_modules/tsparticles-engine/esm/Options/Classes/Options.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Options", function() { return _Options_Classes_Options__WEBPACK_IMPORTED_MODULE_83__["Options"]; });

/* harmony import */ var _Options_Classes_OptionsColor__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./Options/Classes/OptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Classes/OptionsColor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OptionsColor", function() { return _Options_Classes_OptionsColor__WEBPACK_IMPORTED_MODULE_84__["OptionsColor"]; });

/* harmony import */ var _Options_Classes_Particles_Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./Options/Classes/Particles/Bounce/ParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParticlesBounce", function() { return _Options_Classes_Particles_Bounce_ParticlesBounce__WEBPACK_IMPORTED_MODULE_85__["ParticlesBounce"]; });

/* harmony import */ var _Options_Classes_Particles_Bounce_ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./Options/Classes/Particles/Bounce/ParticlesBounceFactor */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParticlesBounceFactor", function() { return _Options_Classes_Particles_Bounce_ParticlesBounceFactor__WEBPACK_IMPORTED_MODULE_86__["ParticlesBounceFactor"]; });

/* harmony import */ var _Options_Classes_Particles_Collisions_Collisions__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/Collisions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/Collisions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Collisions", function() { return _Options_Classes_Particles_Collisions_Collisions__WEBPACK_IMPORTED_MODULE_87__["Collisions"]; });

/* harmony import */ var _Options_Classes_Particles_Collisions_CollisionsOverlap__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/CollisionsOverlap */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollisionsOverlap", function() { return _Options_Classes_Particles_Collisions_CollisionsOverlap__WEBPACK_IMPORTED_MODULE_88__["CollisionsOverlap"]; });

/* harmony import */ var _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./Options/Classes/Particles/ParticlesOptions */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ParticlesOptions.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParticlesOptions", function() { return _Options_Classes_Particles_ParticlesOptions__WEBPACK_IMPORTED_MODULE_89__["ParticlesOptions"]; });

/* harmony import */ var _Options_Classes_Particles_Shadow__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./Options/Classes/Particles/Shadow */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shadow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shadow", function() { return _Options_Classes_Particles_Shadow__WEBPACK_IMPORTED_MODULE_90__["Shadow"]; });

/* harmony import */ var _Options_Classes_Particles_Stroke__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./Options/Classes/Particles/Stroke */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Stroke.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stroke", function() { return _Options_Classes_Particles_Stroke__WEBPACK_IMPORTED_MODULE_91__["Stroke"]; });

/* harmony import */ var _Options_Classes_Particles_Move_MoveAttract__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveAttract */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAttract.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MoveAttract", function() { return _Options_Classes_Particles_Move_MoveAttract__WEBPACK_IMPORTED_MODULE_92__["MoveAttract"]; });

/* harmony import */ var _Options_Classes_Particles_Move_Move__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Move */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Move.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Move", function() { return _Options_Classes_Particles_Move_Move__WEBPACK_IMPORTED_MODULE_93__["Move"]; });

/* harmony import */ var _Options_Classes_Particles_Move_MoveAngle__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveAngle */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveAngle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MoveAngle", function() { return _Options_Classes_Particles_Move_MoveAngle__WEBPACK_IMPORTED_MODULE_94__["MoveAngle"]; });

/* harmony import */ var _Options_Classes_Particles_Move_MoveCenter__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveCenter */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveCenter.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MoveCenter", function() { return _Options_Classes_Particles_Move_MoveCenter__WEBPACK_IMPORTED_MODULE_95__["MoveCenter"]; });

/* harmony import */ var _Options_Classes_Particles_Move_MoveGravity__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveGravity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveGravity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MoveGravity", function() { return _Options_Classes_Particles_Move_MoveGravity__WEBPACK_IMPORTED_MODULE_96__["MoveGravity"]; });

/* harmony import */ var _Options_Classes_Particles_Move_OutModes__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/OutModes */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/OutModes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OutModes", function() { return _Options_Classes_Particles_Move_OutModes__WEBPACK_IMPORTED_MODULE_97__["OutModes"]; });

/* harmony import */ var _Options_Classes_Particles_Move_Path_MovePath__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Path/MovePath */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Path/MovePath.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MovePath", function() { return _Options_Classes_Particles_Move_Path_MovePath__WEBPACK_IMPORTED_MODULE_98__["MovePath"]; });

/* harmony import */ var _Options_Classes_Particles_Move_Spin__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Spin */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/Spin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Spin", function() { return _Options_Classes_Particles_Move_Spin__WEBPACK_IMPORTED_MODULE_99__["Spin"]; });

/* harmony import */ var _Options_Classes_Particles_Move_MoveTrail__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveTrail */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Move/MoveTrail.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MoveTrail", function() { return _Options_Classes_Particles_Move_MoveTrail__WEBPACK_IMPORTED_MODULE_100__["MoveTrail"]; });

/* harmony import */ var _Options_Classes_Particles_Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! ./Options/Classes/Particles/Number/ParticlesNumber */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesNumber.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParticlesNumber", function() { return _Options_Classes_Particles_Number_ParticlesNumber__WEBPACK_IMPORTED_MODULE_101__["ParticlesNumber"]; });

/* harmony import */ var _Options_Classes_Particles_Number_ParticlesDensity__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! ./Options/Classes/Particles/Number/ParticlesDensity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Number/ParticlesDensity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParticlesDensity", function() { return _Options_Classes_Particles_Number_ParticlesDensity__WEBPACK_IMPORTED_MODULE_102__["ParticlesDensity"]; });

/* harmony import */ var _Options_Classes_Particles_Opacity_Opacity__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! ./Options/Classes/Particles/Opacity/Opacity */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/Opacity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Opacity", function() { return _Options_Classes_Particles_Opacity_Opacity__WEBPACK_IMPORTED_MODULE_103__["Opacity"]; });

/* harmony import */ var _Options_Classes_Particles_Opacity_OpacityAnimation__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! ./Options/Classes/Particles/Opacity/OpacityAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OpacityAnimation", function() { return _Options_Classes_Particles_Opacity_OpacityAnimation__WEBPACK_IMPORTED_MODULE_104__["OpacityAnimation"]; });

/* harmony import */ var _Options_Classes_Particles_Shape_Shape__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! ./Options/Classes/Particles/Shape/Shape */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Shape/Shape.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Shape", function() { return _Options_Classes_Particles_Shape_Shape__WEBPACK_IMPORTED_MODULE_105__["Shape"]; });

/* harmony import */ var _Options_Classes_Particles_Size_Size__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! ./Options/Classes/Particles/Size/Size */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/Size.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Size", function() { return _Options_Classes_Particles_Size_Size__WEBPACK_IMPORTED_MODULE_106__["Size"]; });

/* harmony import */ var _Options_Classes_Particles_Size_SizeAnimation__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! ./Options/Classes/Particles/Size/SizeAnimation */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Size/SizeAnimation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SizeAnimation", function() { return _Options_Classes_Particles_Size_SizeAnimation__WEBPACK_IMPORTED_MODULE_107__["SizeAnimation"]; });

/* harmony import */ var _Options_Classes_Particles_ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! ./Options/Classes/Particles/ZIndex/ZIndex */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/ZIndex/ZIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZIndex", function() { return _Options_Classes_Particles_ZIndex_ZIndex__WEBPACK_IMPORTED_MODULE_108__["ZIndex"]; });

/* harmony import */ var _Options_Classes_Responsive__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! ./Options/Classes/Responsive */ "./node_modules/tsparticles-engine/esm/Options/Classes/Responsive.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Responsive", function() { return _Options_Classes_Responsive__WEBPACK_IMPORTED_MODULE_109__["Responsive"]; });

/* harmony import */ var _Options_Classes_Theme_Theme__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! ./Options/Classes/Theme/Theme */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/Theme.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Theme", function() { return _Options_Classes_Theme_Theme__WEBPACK_IMPORTED_MODULE_110__["Theme"]; });

/* harmony import */ var _Options_Classes_Theme_ThemeDefault__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! ./Options/Classes/Theme/ThemeDefault */ "./node_modules/tsparticles-engine/esm/Options/Classes/Theme/ThemeDefault.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ThemeDefault", function() { return _Options_Classes_Theme_ThemeDefault__WEBPACK_IMPORTED_MODULE_111__["ThemeDefault"]; });

/* harmony import */ var _Options_Classes_ValueWithRandom__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! ./Options/Classes/ValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Classes/ValueWithRandom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueWithRandom", function() { return _Options_Classes_ValueWithRandom__WEBPACK_IMPORTED_MODULE_112__["ValueWithRandom"]; });

/* harmony import */ var _Options_Interfaces_Background_IBackground__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! ./Options/Interfaces/Background/IBackground */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Background/IBackground.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_BackgroundMask_IBackgroundMask__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! ./Options/Interfaces/BackgroundMask/IBackgroundMask */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMask.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_BackgroundMask_IBackgroundMaskCover__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! ./Options/Interfaces/BackgroundMask/IBackgroundMaskCover */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_FullScreen_IFullScreen__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! ./Options/Interfaces/FullScreen/IFullScreen */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/FullScreen/IFullScreen.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IAnimatable__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! ./Options/Interfaces/IAnimatable */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatable.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IAnimatableColor__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! ./Options/Interfaces/IAnimatableColor */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimatableColor.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IAnimation__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! ./Options/Interfaces/IAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IAnimation.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IColorAnimation__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! ./Options/Interfaces/IColorAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IColorAnimation.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IHslAnimation__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! ./Options/Interfaces/IHslAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IHslAnimation.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IManualParticle__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! ./Options/Interfaces/IManualParticle */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IManualParticle.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IOptionLoader__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! ./Options/Interfaces/IOptionLoader */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionLoader.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IOptions__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! ./Options/Interfaces/IOptions */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptions.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IOptionsColor__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! ./Options/Interfaces/IOptionsColor */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IOptionsColor.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IResponsive__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! ./Options/Interfaces/IResponsive */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IResponsive.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_IValueWithRandom__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! ./Options/Interfaces/IValueWithRandom */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/IValueWithRandom.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_Events_IClickEvent__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IClickEvent */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IClickEvent.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_Events_IDivEvent__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IDivEvent */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IDivEvent.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_Events_IEvents__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IEvents */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IEvents.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_Events_IHoverEvent__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IHoverEvent */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IHoverEvent.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_Events_IParallax__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IParallax */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Events/IParallax.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_Modes_IModeDiv__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IModeDiv */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModeDiv.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_Modes_IModes__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IModes */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/Modes/IModes.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Interactivity_IInteractivity__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/IInteractivity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Interactivity/IInteractivity.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Bounce_IParticlesBounce__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Bounce/IParticlesBounce */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Bounce/IParticlesBounce.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Collisions_ICollisions__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Collisions/ICollisions */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisions.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Collisions_ICollisionsOverlap__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Collisions/ICollisionsOverlap */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_IParticlesOptions__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IParticlesOptions */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IParticlesOptions.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_IShadow__WEBPACK_IMPORTED_MODULE_140__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IShadow */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IShadow.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_IStroke__WEBPACK_IMPORTED_MODULE_141__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IStroke */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/IStroke.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_IMoveAttract__WEBPACK_IMPORTED_MODULE_142__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveAttract */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAttract.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_IMove__WEBPACK_IMPORTED_MODULE_143__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMove */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMove.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_IMoveAngle__WEBPACK_IMPORTED_MODULE_144__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveAngle */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveAngle.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_IMoveCenter__WEBPACK_IMPORTED_MODULE_145__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveCenter */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveCenter.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_IMoveGravity__WEBPACK_IMPORTED_MODULE_146__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveGravity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveGravity.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_Path_IMovePath__WEBPACK_IMPORTED_MODULE_147__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/Path/IMovePath */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/Path/IMovePath.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_IOutModes__WEBPACK_IMPORTED_MODULE_148__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IOutModes */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IOutModes.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_ISpin__WEBPACK_IMPORTED_MODULE_149__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/ISpin */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/ISpin.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Move_IMoveTrail__WEBPACK_IMPORTED_MODULE_150__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveTrail */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Move/IMoveTrail.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Number_IParticlesDensity__WEBPACK_IMPORTED_MODULE_151__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Number/IParticlesDensity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesDensity.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Number_IParticlesNumber__WEBPACK_IMPORTED_MODULE_152__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Number/IParticlesNumber */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Number/IParticlesNumber.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Opacity_IOpacity__WEBPACK_IMPORTED_MODULE_153__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Opacity/IOpacity */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacity.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Opacity_IOpacityAnimation__WEBPACK_IMPORTED_MODULE_154__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Opacity/IOpacityAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Shape_ICharacterShape__WEBPACK_IMPORTED_MODULE_155__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/ICharacterShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/ICharacterShape.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Shape_IImageShape__WEBPACK_IMPORTED_MODULE_156__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IImageShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IImageShape.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Shape_IPolygonShape__WEBPACK_IMPORTED_MODULE_157__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IPolygonShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IPolygonShape.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Shape_IShape__WEBPACK_IMPORTED_MODULE_158__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShape.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Shape_IShapeValues__WEBPACK_IMPORTED_MODULE_159__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IShapeValues */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IShapeValues.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Shape_IStarShape__WEBPACK_IMPORTED_MODULE_160__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IStarShape */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Shape/IStarShape.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Size_ISize__WEBPACK_IMPORTED_MODULE_161__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Size/ISize */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISize.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_Size_ISizeAnimation__WEBPACK_IMPORTED_MODULE_162__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Size/ISizeAnimation */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/Size/ISizeAnimation.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Particles_ZIndex_IZIndex__WEBPACK_IMPORTED_MODULE_163__ = __webpack_require__(/*! ./Options/Interfaces/Particles/ZIndex/IZIndex */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Particles/ZIndex/IZIndex.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Theme_ITheme__WEBPACK_IMPORTED_MODULE_164__ = __webpack_require__(/*! ./Options/Interfaces/Theme/ITheme */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/ITheme.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Options_Interfaces_Theme_IThemeDefault__WEBPACK_IMPORTED_MODULE_165__ = __webpack_require__(/*! ./Options/Interfaces/Theme/IThemeDefault */ "./node_modules/tsparticles-engine/esm/Options/Interfaces/Theme/IThemeDefault.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Types_RangeValue__WEBPACK_IMPORTED_MODULE_166__ = __webpack_require__(/*! ./Types/RangeValue */ "./node_modules/tsparticles-engine/esm/Types/RangeValue.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Types_RecursivePartial__WEBPACK_IMPORTED_MODULE_167__ = __webpack_require__(/*! ./Types/RecursivePartial */ "./node_modules/tsparticles-engine/esm/Types/RecursivePartial.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Types_ShapeData__WEBPACK_IMPORTED_MODULE_168__ = __webpack_require__(/*! ./Types/ShapeData */ "./node_modules/tsparticles-engine/esm/Types/ShapeData.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Types_ShapeDrawerFunctions__WEBPACK_IMPORTED_MODULE_169__ = __webpack_require__(/*! ./Types/ShapeDrawerFunctions */ "./node_modules/tsparticles-engine/esm/Types/ShapeDrawerFunctions.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Types_SingleOrMultiple__WEBPACK_IMPORTED_MODULE_170__ = __webpack_require__(/*! ./Types/SingleOrMultiple */ "./node_modules/tsparticles-engine/esm/Types/SingleOrMultiple.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Types_PathOptions__WEBPACK_IMPORTED_MODULE_171__ = __webpack_require__(/*! ./Types/PathOptions */ "./node_modules/tsparticles-engine/esm/Types/PathOptions.js");
/* empty/unused harmony star reexport *//* harmony import */ var _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__ = __webpack_require__(/*! ./Utils/CanvasUtils */ "./node_modules/tsparticles-engine/esm/Utils/CanvasUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawLine", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["drawLine"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawTriangle", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["drawTriangle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "paintBase", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["paintBase"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clear", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["clear"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawParticle", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["drawParticle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawShape", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["drawShape"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawShapeAfterEffect", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["drawShapeAfterEffect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawPlugin", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["drawPlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "drawParticlePlugin", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["drawParticlePlugin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "alterHsl", function() { return _Utils_CanvasUtils__WEBPACK_IMPORTED_MODULE_172__["alterHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addColorManager", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["addColorManager"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rangeColorToRgb", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["rangeColorToRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "colorToRgb", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["colorToRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "colorToHsl", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["colorToHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rangeColorToHsl", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["rangeColorToHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgbToHsl", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["rgbToHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToAlpha", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["stringToAlpha"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stringToRgb", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["stringToRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hslToRgb", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["hslToRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hslaToRgba", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["hslaToRgba"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomRgbColor", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["getRandomRgbColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStyleFromRgb", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["getStyleFromRgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStyleFromHsl", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["getStyleFromHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "colorMix", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["colorMix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLinkColor", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["getLinkColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getLinkRandomColor", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["getLinkRandomColor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHslFromAnimation", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["getHslFromAnimation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getHslAnimationFromHsl", function() { return _Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["getHslAnimationFromHsl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HslColorManager", function() { return _Utils_HslColorManager__WEBPACK_IMPORTED_MODULE_1__["HslColorManager"]; });

/* harmony import */ var _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__ = __webpack_require__(/*! ./Utils/NumberUtils */ "./node_modules/tsparticles-engine/esm/Utils/NumberUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addEasing", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["addEasing"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getEasing", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getEasing"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setRandom", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["setRandom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandom", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getRandom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["clamp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mix", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["mix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "randomInRange", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["randomInRange"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRangeValue", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getRangeValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRangeMin", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getRangeMin"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRangeMax", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getRangeMax"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setRangeValue", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["setRangeValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getValue", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getValue"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDistances", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getDistances"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getDistance", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getDistance"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getParticleDirectionAngle", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getParticleDirectionAngle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getParticleBaseVelocity", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["getParticleBaseVelocity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "collisionVelocity", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["collisionVelocity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcPositionFromSize", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["calcPositionFromSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcPositionOrRandomFromSize", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["calcPositionOrRandomFromSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcPositionOrRandomFromSizeRanged", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["calcPositionOrRandomFromSizeRanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcExactPositionOrRandomFromSize", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["calcExactPositionOrRandomFromSize"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calcExactPositionOrRandomFromSizeRanged", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["calcExactPositionOrRandomFromSizeRanged"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseAlpha", function() { return _Utils_NumberUtils__WEBPACK_IMPORTED_MODULE_173__["parseAlpha"]; });

/* harmony import */ var _Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_174__ = __webpack_require__(/*! ./Utils/OptionsUtils */ "./node_modules/tsparticles-engine/esm/Utils/OptionsUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadOptions", function() { return _Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_174__["loadOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadParticlesOptions", function() { return _Utils_OptionsUtils__WEBPACK_IMPORTED_MODULE_174__["loadParticlesOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RgbColorManager", function() { return _Utils_RgbColorManager__WEBPACK_IMPORTED_MODULE_2__["RgbColorManager"]; });

/* harmony import */ var _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__ = __webpack_require__(/*! ./Utils/Utils */ "./node_modules/tsparticles-engine/esm/Utils/Utils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isSsr", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["isSsr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hasMatchMedia", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["hasMatchMedia"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "safeMatchMedia", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["safeMatchMedia"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "animate", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["animate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cancelAnimation", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["cancelAnimation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isInArray", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["isInArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadFont", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["loadFont"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "arrayRandomIndex", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["arrayRandomIndex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "itemFromArray", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["itemFromArray"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPointInside", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["isPointInside"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "areBoundsInside", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["areBoundsInside"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "calculateBounds", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["calculateBounds"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepExtend", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["deepExtend"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isDivModeEnabled", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["isDivModeEnabled"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "divModeExecute", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["divModeExecute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "singleDivModeExecute", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["singleDivModeExecute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "divMode", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["divMode"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "circleBounceDataFromParticle", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["circleBounceDataFromParticle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "circleBounce", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["circleBounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rectBounce", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["rectBounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "executeOnSingleOrMultiple", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["executeOnSingleOrMultiple"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "itemFromSingleOrMultiple", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["itemFromSingleOrMultiple"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "findItemFromSingleOrMultiple", function() { return _Utils_Utils__WEBPACK_IMPORTED_MODULE_175__["findItemFromSingleOrMultiple"]; });

/* harmony import */ var _Options_Classes_Particles_Collisions_CollisionsAbsorb__WEBPACK_IMPORTED_MODULE_176__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/CollisionsAbsorb */ "./node_modules/tsparticles-engine/esm/Options/Classes/Particles/Collisions/CollisionsAbsorb.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CollisionsAbsorb", function() { return _Options_Classes_Particles_Collisions_CollisionsAbsorb__WEBPACK_IMPORTED_MODULE_176__["CollisionsAbsorb"]; });

/* harmony import */ var _Options_Classes_Interactivity_Events_ResizeEvent__WEBPACK_IMPORTED_MODULE_177__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/ResizeEvent */ "./node_modules/tsparticles-engine/esm/Options/Classes/Interactivity/Events/ResizeEvent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResizeEvent", function() { return _Options_Classes_Interactivity_Events_ResizeEvent__WEBPACK_IMPORTED_MODULE_177__["ResizeEvent"]; });





const rgbColorManager = new _Utils_RgbColorManager__WEBPACK_IMPORTED_MODULE_2__["RgbColorManager"](), hslColorManager = new _Utils_HslColorManager__WEBPACK_IMPORTED_MODULE_1__["HslColorManager"]();
Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["addColorManager"])(rgbColorManager);
Object(_Utils_ColorUtils__WEBPACK_IMPORTED_MODULE_3__["addColorManager"])(hslColorManager);
const tsParticles = new _engine__WEBPACK_IMPORTED_MODULE_0__["Engine"]();
tsParticles.init();






















































































































































































/***/ })

}]);