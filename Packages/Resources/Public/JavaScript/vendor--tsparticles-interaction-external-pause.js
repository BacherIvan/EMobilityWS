(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-pause"],{

/***/ "./node_modules/tsparticles-interaction-external-pause/esm/Pauser.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-pause/esm/Pauser.js ***!
  \***************************************************************************/
/*! exports provided: Pauser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pauser", function() { return Pauser; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

class Pauser extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "pause") {
                return;
            }
            const container = this.container;
            if (container.getAnimationStatus()) {
                container.pause();
            }
            else {
                container.play();
            }
        };
    }
    clear() {
    }
    init() {
    }
    async interact() {
    }
    isEnabled() {
        return true;
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-pause/esm/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-pause/esm/index.js ***!
  \**************************************************************************/
/*! exports provided: loadExternalPauseInteraction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalPauseInteraction", function() { return loadExternalPauseInteraction; });
/* harmony import */ var _Pauser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pauser */ "./node_modules/tsparticles-interaction-external-pause/esm/Pauser.js");

function loadExternalPauseInteraction(engine) {
    engine.addInteractor("externalPause", (container) => new _Pauser__WEBPACK_IMPORTED_MODULE_0__["Pauser"](container));
}


/***/ })

}]);