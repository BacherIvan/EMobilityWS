(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-particles-collisions"],{

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Absorb.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Absorb.js ***!
  \*********************************************************************************/
/*! exports provided: absorb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absorb", function() { return absorb; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
    const factor = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["clamp"])((p1.options.collisions.absorb.speed * delta.factor) / 10, 0, r2);
    p1.size.value += factor / 2;
    p2.size.value -= factor;
    if (r2 <= pixelRatio) {
        p2.size.value = 0;
        p2.destroy();
    }
}
function absorb(p1, p2, delta, pixelRatio) {
    const r1 = p1.getRadius(), r2 = p2.getRadius();
    if (r1 === undefined && r2 !== undefined) {
        p1.destroy();
    }
    else if (r1 !== undefined && r2 === undefined) {
        p2.destroy();
    }
    else if (r1 !== undefined && r2 !== undefined) {
        if (r1 >= r2) {
            updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
        }
        else {
            updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js ***!
  \*********************************************************************************/
/*! exports provided: bounce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bounce", function() { return bounce; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

function bounce(p1, p2) {
    Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["circleBounce"])(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["circleBounceDataFromParticle"])(p1), Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["circleBounceDataFromParticle"])(p2));
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Collider.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Collider.js ***!
  \***********************************************************************************/
/*! exports provided: Collider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Collider", function() { return Collider; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _ResolveCollision__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ResolveCollision */ "./node_modules/tsparticles-interaction-particles-collisions/esm/ResolveCollision.js");


class Collider extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ParticlesInteractorBase"] {
    constructor(container) {
        super(container);
    }
    clear() {
    }
    init() {
    }
    async interact(p1, delta) {
        const container = this.container, pos1 = p1.getPosition(), radius1 = p1.getRadius(), query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);
        for (const p2 of query) {
            if (p1 === p2 ||
                !p2.options.collisions.enable ||
                p1.options.collisions.mode !== p2.options.collisions.mode ||
                p2.destroyed ||
                p2.spawning) {
                continue;
            }
            const pos2 = p2.getPosition(), radius2 = p2.getRadius();
            if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
                continue;
            }
            const dist = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getDistance"])(pos1, pos2), distP = radius1 + radius2;
            if (dist > distP) {
                continue;
            }
            Object(_ResolveCollision__WEBPACK_IMPORTED_MODULE_1__["resolveCollision"])(p1, p2, delta, container.retina.pixelRatio);
        }
    }
    isEnabled(particle) {
        return particle.options.collisions.enable;
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/Destroy.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/Destroy.js ***!
  \**********************************************************************************/
/*! exports provided: destroy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "destroy", function() { return destroy; });
/* harmony import */ var _Bounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bounce */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js");

function destroy(p1, p2) {
    if (!p1.unbreakable && !p2.unbreakable) {
        Object(_Bounce__WEBPACK_IMPORTED_MODULE_0__["bounce"])(p1, p2);
    }
    if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
        p1.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
        p2.destroy();
    }
    else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
        const deleteP = p1.getRadius() >= p2.getRadius() ? p1 : p2;
        deleteP.destroy();
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/ResolveCollision.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/ResolveCollision.js ***!
  \*******************************************************************************************/
/*! exports provided: resolveCollision */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveCollision", function() { return resolveCollision; });
/* harmony import */ var _Absorb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Absorb */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Absorb.js");
/* harmony import */ var _Bounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Bounce */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Bounce.js");
/* harmony import */ var _Destroy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Destroy */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Destroy.js");



function resolveCollision(p1, p2, delta, pixelRatio) {
    switch (p1.options.collisions.mode) {
        case "absorb": {
            Object(_Absorb__WEBPACK_IMPORTED_MODULE_0__["absorb"])(p1, p2, delta, pixelRatio);
            break;
        }
        case "bounce": {
            Object(_Bounce__WEBPACK_IMPORTED_MODULE_1__["bounce"])(p1, p2);
            break;
        }
        case "destroy": {
            Object(_Destroy__WEBPACK_IMPORTED_MODULE_2__["destroy"])(p1, p2);
            break;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-particles-collisions/esm/index.js":
/*!********************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-particles-collisions/esm/index.js ***!
  \********************************************************************************/
/*! exports provided: loadParticlesCollisionsInteraction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadParticlesCollisionsInteraction", function() { return loadParticlesCollisionsInteraction; });
/* harmony import */ var _Collider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Collider */ "./node_modules/tsparticles-interaction-particles-collisions/esm/Collider.js");

async function loadParticlesCollisionsInteraction(engine) {
    await engine.addInteractor("particlesCollisions", (container) => new _Collider__WEBPACK_IMPORTED_MODULE_0__["Collider"](container));
}


/***/ })

}]);