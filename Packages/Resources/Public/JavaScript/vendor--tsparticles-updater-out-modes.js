(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-updater-out-modes"],{

/***/ "./node_modules/tsparticles-updater-out-modes/esm/BounceOutMode.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/BounceOutMode.js ***!
  \*************************************************************************/
/*! exports provided: BounceOutMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BounceOutMode", function() { return BounceOutMode; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-updater-out-modes/esm/Utils.js");


class BounceOutMode {
    constructor(container) {
        this.container = container;
        this.modes = [
            "bounce",
            "bounce-vertical",
            "bounce-horizontal",
            "bounceVertical",
            "bounceHorizontal",
            "split",
        ];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        let handled = false;
        for (const [, plugin] of container.plugins) {
            if (plugin.particleBounce !== undefined) {
                handled = plugin.particleBounce(particle, delta, direction);
            }
            if (handled) {
                break;
            }
        }
        if (handled) {
            return;
        }
        const pos = particle.getPosition(), offset = particle.offset, size = particle.getRadius(), bounds = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["calculateBounds"])(pos, size), canvasSize = container.canvas.size;
        Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["bounceHorizontal"])({ particle, outMode, direction, bounds, canvasSize, offset, size });
        Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["bounceVertical"])({ particle, outMode, direction, bounds, canvasSize, offset, size });
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/DestroyOutMode.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/DestroyOutMode.js ***!
  \**************************************************************************/
/*! exports provided: DestroyOutMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DestroyOutMode", function() { return DestroyOutMode; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class DestroyOutMode {
    constructor(container) {
        this.container = container;
        this.modes = ["destroy"];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        switch (particle.outType) {
            case "normal":
            case "outside":
                if (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isPointInside"])(particle.position, container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin, particle.getRadius(), direction)) {
                    return;
                }
                break;
            case "inside": {
                const { dx, dy } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(particle.position, particle.moveCenter);
                const { x: vx, y: vy } = particle.velocity;
                if ((vx < 0 && dx > particle.moveCenter.radius) ||
                    (vy < 0 && dy > particle.moveCenter.radius) ||
                    (vx >= 0 && dx < -particle.moveCenter.radius) ||
                    (vy >= 0 && dy < -particle.moveCenter.radius)) {
                    return;
                }
                break;
            }
        }
        container.particles.remove(particle, undefined, true);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/NoneOutMode.js":
/*!***********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/NoneOutMode.js ***!
  \***********************************************************************/
/*! exports provided: NoneOutMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoneOutMode", function() { return NoneOutMode; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class NoneOutMode {
    constructor(container) {
        this.container = container;
        this.modes = ["none"];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        if ((particle.options.move.distance.horizontal &&
            (direction === "left" || direction === "right")) ||
            (particle.options.move.distance.vertical &&
                (direction === "top" || direction === "bottom"))) {
            return;
        }
        const gravityOptions = particle.options.move.gravity, container = this.container;
        const canvasSize = container.canvas.size;
        const pRadius = particle.getRadius();
        if (!gravityOptions.enable) {
            if ((particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius) ||
                (particle.velocity.y < 0 && particle.position.y >= -pRadius) ||
                (particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius) ||
                (particle.velocity.x < 0 && particle.position.x >= -pRadius)) {
                return;
            }
            if (!Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isPointInside"])(particle.position, container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin, pRadius, direction)) {
                container.particles.remove(particle);
            }
        }
        else {
            const position = particle.position;
            if ((!gravityOptions.inverse &&
                position.y > canvasSize.height + pRadius &&
                direction === "bottom") ||
                (gravityOptions.inverse && position.y < -pRadius && direction === "top")) {
                container.particles.remove(particle);
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/OutOfCanvasUpdater.js":
/*!******************************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/OutOfCanvasUpdater.js ***!
  \******************************************************************************/
/*! exports provided: OutOfCanvasUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutOfCanvasUpdater", function() { return OutOfCanvasUpdater; });
/* harmony import */ var _BounceOutMode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BounceOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/BounceOutMode.js");
/* harmony import */ var _DestroyOutMode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DestroyOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/DestroyOutMode.js");
/* harmony import */ var _NoneOutMode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NoneOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/NoneOutMode.js");
/* harmony import */ var _OutOutMode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./OutOutMode */ "./node_modules/tsparticles-updater-out-modes/esm/OutOutMode.js");




class OutOfCanvasUpdater {
    constructor(container) {
        this.container = container;
        this.updaters = [
            new _BounceOutMode__WEBPACK_IMPORTED_MODULE_0__["BounceOutMode"](container),
            new _DestroyOutMode__WEBPACK_IMPORTED_MODULE_1__["DestroyOutMode"](container),
            new _OutOutMode__WEBPACK_IMPORTED_MODULE_3__["OutOutMode"](container),
            new _NoneOutMode__WEBPACK_IMPORTED_MODULE_2__["NoneOutMode"](container),
        ];
    }
    init() {
    }
    isEnabled(particle) {
        return !particle.destroyed && !particle.spawning;
    }
    update(particle, delta) {
        var _a, _b, _c, _d;
        const outModes = particle.options.move.outModes;
        this.updateOutMode(particle, delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, "bottom");
        this.updateOutMode(particle, delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, "left");
        this.updateOutMode(particle, delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, "right");
        this.updateOutMode(particle, delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, "top");
    }
    updateOutMode(particle, delta, outMode, direction) {
        for (const updater of this.updaters) {
            updater.update(particle, direction, delta, outMode);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/OutOutMode.js":
/*!**********************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/OutOutMode.js ***!
  \**********************************************************************/
/*! exports provided: OutOutMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutOutMode", function() { return OutOutMode; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class OutOutMode {
    constructor(container) {
        this.container = container;
        this.modes = ["out"];
    }
    update(particle, direction, delta, outMode) {
        if (!this.modes.includes(outMode)) {
            return;
        }
        const container = this.container;
        switch (particle.outType) {
            case "inside": {
                const { x: vx, y: vy } = particle.velocity;
                const circVec = tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin;
                circVec.length = particle.moveCenter.radius;
                circVec.angle = particle.velocity.angle + Math.PI;
                circVec.addTo(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].create(particle.moveCenter));
                const { dx, dy } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(particle.position, circVec);
                if ((vx <= 0 && dx >= 0) || (vy <= 0 && dy >= 0) || (vx >= 0 && dx <= 0) || (vy >= 0 && dy <= 0)) {
                    return;
                }
                particle.position.x = Math.floor(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])({
                    min: 0,
                    max: container.canvas.size.width,
                }));
                particle.position.y = Math.floor(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])({
                    min: 0,
                    max: container.canvas.size.height,
                }));
                const { dx: newDx, dy: newDy } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(particle.position, particle.moveCenter);
                particle.direction = Math.atan2(-newDy, -newDx);
                particle.velocity.angle = particle.direction;
                break;
            }
            default: {
                if (Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isPointInside"])(particle.position, container.canvas.size, tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["Vector"].origin, particle.getRadius(), direction)) {
                    return;
                }
                switch (particle.outType) {
                    case "outside": {
                        particle.position.x =
                            Math.floor(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])({
                                min: -particle.moveCenter.radius,
                                max: particle.moveCenter.radius,
                            })) + particle.moveCenter.x;
                        particle.position.y =
                            Math.floor(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["randomInRange"])({
                                min: -particle.moveCenter.radius,
                                max: particle.moveCenter.radius,
                            })) + particle.moveCenter.y;
                        const { dx, dy } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(particle.position, particle.moveCenter);
                        if (particle.moveCenter.radius) {
                            particle.direction = Math.atan2(dy, dx);
                            particle.velocity.angle = particle.direction;
                        }
                        break;
                    }
                    case "normal": {
                        const wrap = particle.options.move.warp, canvasSize = container.canvas.size, newPos = {
                            bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                            left: -particle.getRadius() - particle.offset.x,
                            right: canvasSize.width + particle.getRadius() + particle.offset.x,
                            top: -particle.getRadius() - particle.offset.y,
                        }, sizeValue = particle.getRadius(), nextBounds = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["calculateBounds"])(particle.position, sizeValue);
                        if (direction === "right" &&
                            nextBounds.left > canvasSize.width + particle.offset.x) {
                            particle.position.x = newPos.left;
                            particle.initialPosition.x = particle.position.x;
                            if (!wrap) {
                                particle.position.y = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * canvasSize.height;
                                particle.initialPosition.y = particle.position.y;
                            }
                        }
                        else if (direction === "left" && nextBounds.right < -particle.offset.x) {
                            particle.position.x = newPos.right;
                            particle.initialPosition.x = particle.position.x;
                            if (!wrap) {
                                particle.position.y = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * canvasSize.height;
                                particle.initialPosition.y = particle.position.y;
                            }
                        }
                        if (direction === "bottom" &&
                            nextBounds.top > canvasSize.height + particle.offset.y) {
                            if (!wrap) {
                                particle.position.x = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * canvasSize.width;
                                particle.initialPosition.x = particle.position.x;
                            }
                            particle.position.y = newPos.top;
                            particle.initialPosition.y = particle.position.y;
                        }
                        else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
                            if (!wrap) {
                                particle.position.x = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])() * canvasSize.width;
                                particle.initialPosition.x = particle.position.x;
                            }
                            particle.position.y = newPos.bottom;
                            particle.initialPosition.y = particle.position.y;
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/Utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/Utils.js ***!
  \*****************************************************************/
/*! exports provided: bounceHorizontal, bounceVertical */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceHorizontal", function() { return bounceHorizontal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounceVertical", function() { return bounceVertical; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function bounceHorizontal(data) {
    if (data.outMode !== "bounce" &&
        data.outMode !== "bounce-horizontal" &&
        data.outMode !== "bounceHorizontal" &&
        data.outMode !== "split") {
        return;
    }
    if (data.bounds.right < 0) {
        data.particle.position.x = data.size + data.offset.x;
    }
    else if (data.bounds.left > data.canvasSize.width) {
        data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
    }
    const velocity = data.particle.velocity.x;
    let bounced = false;
    if ((data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0) ||
        (data.direction === "left" && data.bounds.left <= 0 && velocity < 0)) {
        const newVelocity = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getValue"])(data.particle.options.bounce.horizontal);
        data.particle.velocity.x *= -newVelocity;
        bounced = true;
    }
    if (!bounced) {
        return;
    }
    const minPos = data.offset.x + data.size;
    if (data.bounds.right >= data.canvasSize.width) {
        data.particle.position.x = data.canvasSize.width - minPos;
    }
    else if (data.bounds.left <= 0) {
        data.particle.position.x = minPos;
    }
    if (data.outMode === "split") {
        data.particle.destroy();
    }
}
function bounceVertical(data) {
    if (data.outMode !== "bounce" &&
        data.outMode !== "bounce-vertical" &&
        data.outMode !== "bounceVertical" &&
        data.outMode !== "split") {
        return;
    }
    if (data.bounds.bottom < 0) {
        data.particle.position.y = data.size + data.offset.y;
    }
    else if (data.bounds.top > data.canvasSize.height) {
        data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
    }
    const velocity = data.particle.velocity.y;
    let bounced = false;
    if ((data.direction === "bottom" && data.bounds.bottom >= data.canvasSize.height && velocity > 0) ||
        (data.direction === "top" && data.bounds.top <= 0 && velocity < 0)) {
        const newVelocity = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getValue"])(data.particle.options.bounce.vertical);
        data.particle.velocity.y *= -newVelocity;
        bounced = true;
    }
    if (!bounced) {
        return;
    }
    const minPos = data.offset.y + data.size;
    if (data.bounds.bottom >= data.canvasSize.height) {
        data.particle.position.y = data.canvasSize.height - minPos;
    }
    else if (data.bounds.top <= 0) {
        data.particle.position.y = minPos;
    }
    if (data.outMode === "split") {
        data.particle.destroy();
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-updater-out-modes/esm/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-updater-out-modes/esm/index.js ***!
  \*****************************************************************/
/*! exports provided: loadOutModesUpdater */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadOutModesUpdater", function() { return loadOutModesUpdater; });
/* harmony import */ var _OutOfCanvasUpdater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OutOfCanvasUpdater */ "./node_modules/tsparticles-updater-out-modes/esm/OutOfCanvasUpdater.js");

async function loadOutModesUpdater(engine) {
    await engine.addParticleUpdater("outModes", (container) => new _OutOfCanvasUpdater__WEBPACK_IMPORTED_MODULE_0__["OutOfCanvasUpdater"](container));
}


/***/ })

}]);