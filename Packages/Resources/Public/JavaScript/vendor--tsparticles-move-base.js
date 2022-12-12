(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-move-base"],{

/***/ "./node_modules/tsparticles-move-base/esm/BaseMover.js":
/*!*************************************************************!*\
  !*** ./node_modules/tsparticles-move-base/esm/BaseMover.js ***!
  \*************************************************************/
/*! exports provided: BaseMover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseMover", function() { return BaseMover; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-move-base/esm/Utils.js");


class BaseMover {
    init(particle) {
        var _a;
        const container = particle.container, options = particle.options, gravityOptions = options.move.gravity, spinOptions = options.move.spin;
        particle.gravity = {
            enable: gravityOptions.enable,
            acceleration: Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(gravityOptions.acceleration),
            inverse: gravityOptions.inverse,
        };
        if (spinOptions.enable) {
            const spinPos = (_a = spinOptions.position) !== null && _a !== void 0 ? _a : { x: 50, y: 50 }, spinCenter = {
                x: (spinPos.x / 100) * container.canvas.size.width,
                y: (spinPos.y / 100) * container.canvas.size.height,
            }, pos = particle.getPosition(), distance = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos, spinCenter), spinAcceleration = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(spinOptions.acceleration);
            particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
            particle.spin = {
                center: spinCenter,
                direction: particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
                angle: particle.velocity.angle,
                radius: distance,
                acceleration: particle.retina.spinAcceleration,
            };
        }
    }
    isEnabled(particle) {
        return !particle.destroyed && particle.options.move.enable;
    }
    move(particle, delta) {
        var _a, _b, _c;
        var _d, _e;
        const particleOptions = particle.options, moveOptions = particleOptions.move;
        if (!moveOptions.enable) {
            return;
        }
        const container = particle.container, slowFactor = Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["getProximitySpeedFactor"])(particle), baseSpeed = ((_a = (_d = particle.retina).moveSpeed) !== null && _a !== void 0 ? _a : (_d.moveSpeed = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(moveOptions.speed) * container.retina.pixelRatio)) *
            container.retina.reduceFactor, moveDrift = ((_b = (_e = particle.retina).moveDrift) !== null && _b !== void 0 ? _b : (_e.moveDrift = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeValue"])(particle.options.move.drift) * container.retina.pixelRatio)), maxSize = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRangeMax"])(particleOptions.size.value) * container.retina.pixelRatio, sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1, speedFactor = sizeFactor * slowFactor * (delta.factor || 1), diffFactor = 2, moveSpeed = (baseSpeed * speedFactor) / diffFactor;
        if (moveOptions.spin.enable) {
            Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["spin"])(particle, moveSpeed);
        }
        else {
            Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["applyPath"])(particle, delta);
            const gravityOptions = particle.gravity, gravityFactor = (gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && gravityOptions.inverse ? -1 : 1;
            if ((gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && moveSpeed) {
                particle.velocity.y +=
                    (gravityFactor * (gravityOptions.acceleration * delta.factor)) / (60 * moveSpeed);
            }
            if (moveDrift && moveSpeed) {
                particle.velocity.x += (moveDrift * delta.factor) / (60 * moveSpeed);
            }
            const decay = particle.moveDecay;
            if (decay != 1) {
                particle.velocity.multTo(decay);
            }
            const velocity = particle.velocity.mult(moveSpeed), maxSpeed = (_c = particle.retina.maxSpeed) !== null && _c !== void 0 ? _c : container.retina.maxSpeed;
            if ((gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) &&
                maxSpeed > 0 &&
                ((!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed) ||
                    (gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed))) {
                velocity.y = gravityFactor * maxSpeed;
                if (moveSpeed) {
                    particle.velocity.y = velocity.y / moveSpeed;
                }
            }
            const zIndexOptions = particle.options.zIndex, zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
            if (zVelocityFactor != 1) {
                velocity.multTo(zVelocityFactor);
            }
            particle.position.addTo(velocity);
            if (moveOptions.vibrate) {
                particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
                particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
            }
        }
        Object(_Utils__WEBPACK_IMPORTED_MODULE_1__["applyDistance"])(particle);
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-move-base/esm/Utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/tsparticles-move-base/esm/Utils.js ***!
  \*********************************************************/
/*! exports provided: applyDistance, spin, applyPath, getProximitySpeedFactor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyDistance", function() { return applyDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spin", function() { return spin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyPath", function() { return applyPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProximitySpeedFactor", function() { return getProximitySpeedFactor; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function applyDistance(particle) {
    const initialPosition = particle.initialPosition, { dx, dy } = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistances"])(initialPosition, particle.position), dxFixed = Math.abs(dx), dyFixed = Math.abs(dy), hDistance = particle.retina.maxDistance.horizontal, vDistance = particle.retina.maxDistance.vertical;
    if (!hDistance && !vDistance) {
        return;
    }
    if (((hDistance && dxFixed >= hDistance) || (vDistance && dyFixed >= vDistance)) && !particle.misplaced) {
        particle.misplaced = (!!hDistance && dxFixed > hDistance) || (!!vDistance && dyFixed > vDistance);
        if (hDistance) {
            particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
        }
        if (vDistance) {
            particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
        }
    }
    else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
        particle.misplaced = false;
    }
    else if (particle.misplaced) {
        const pos = particle.position, vel = particle.velocity;
        if (hDistance && ((pos.x < initialPosition.x && vel.x < 0) || (pos.x > initialPosition.x && vel.x > 0))) {
            vel.x *= -Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
        }
        if (vDistance && ((pos.y < initialPosition.y && vel.y < 0) || (pos.y > initialPosition.y && vel.y > 0))) {
            vel.y *= -Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getRandom"])();
        }
    }
}
function spin(particle, moveSpeed) {
    const container = particle.container;
    if (!particle.spin) {
        return;
    }
    const updateFunc = {
        x: particle.spin.direction === "clockwise" ? Math.cos : Math.sin,
        y: particle.spin.direction === "clockwise" ? Math.sin : Math.cos,
    };
    particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
    particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
    particle.spin.radius += particle.spin.acceleration;
    const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);
    if (particle.spin.radius > maxCanvasSize / 2) {
        particle.spin.radius = maxCanvasSize / 2;
        particle.spin.acceleration *= -1;
    }
    else if (particle.spin.radius < 0) {
        particle.spin.radius = 0;
        particle.spin.acceleration *= -1;
    }
    particle.spin.angle += (moveSpeed / 100) * (1 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
    var _a;
    const particlesOptions = particle.options, pathOptions = particlesOptions.move.path, pathEnabled = pathOptions.enable;
    if (!pathEnabled) {
        return;
    }
    if (particle.lastPathTime <= particle.pathDelay) {
        particle.lastPathTime += delta.value;
        return;
    }
    const path = (_a = particle.pathGenerator) === null || _a === void 0 ? void 0 : _a.generate(particle);
    if (path) {
        particle.velocity.addTo(path);
    }
    if (pathOptions.clamp) {
        particle.velocity.x = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(particle.velocity.x, -1, 1);
        particle.velocity.y = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])(particle.velocity.y, -1, 1);
    }
    particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
    return particle.slow.inRange ? particle.slow.factor : 1;
}


/***/ }),

/***/ "./node_modules/tsparticles-move-base/esm/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/tsparticles-move-base/esm/index.js ***!
  \*********************************************************/
/*! exports provided: loadBaseMover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadBaseMover", function() { return loadBaseMover; });
/* harmony import */ var _BaseMover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseMover */ "./node_modules/tsparticles-move-base/esm/BaseMover.js");

async function loadBaseMover(engine) {
    engine.addMover("base", () => new _BaseMover__WEBPACK_IMPORTED_MODULE_0__["BaseMover"]());
}


/***/ })

}]);