(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-remove"],{

/***/ "./node_modules/tsparticles-interaction-external-remove/esm/Options/Classes/Remove.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-remove/esm/Options/Classes/Remove.js ***!
  \********************************************************************************************/
/*! exports provided: Remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Remove", function() { return Remove; });
class Remove {
    constructor() {
        this.quantity = 2;
    }
    get particles_nb() {
        return this.quantity;
    }
    set particles_nb(value) {
        this.quantity = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-remove/esm/Options/Interfaces/IRemove.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-remove/esm/Options/Interfaces/IRemove.js ***!
  \************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-remove/esm/Remover.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-remove/esm/Remover.js ***!
  \*****************************************************************************/
/*! exports provided: Remover */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Remover", function() { return Remover; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Remove__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Remove */ "./node_modules/tsparticles-interaction-external-remove/esm/Options/Classes/Remove.js");


class Remover extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            const container = this.container, options = container.actualOptions;
            if (!options.interactivity.modes.remove || mode !== "remove") {
                return;
            }
            const removeNb = options.interactivity.modes.remove.quantity;
            container.particles.removeQuantity(removeNb);
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
    loadModeOptions(options, ...sources) {
        if (!options.remove) {
            options.remove = new _Options_Classes_Remove__WEBPACK_IMPORTED_MODULE_1__["Remove"]();
        }
        for (const source of sources) {
            options.remove.load(source === null || source === void 0 ? void 0 : source.remove);
        }
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-remove/esm/index.js":
/*!***************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-remove/esm/index.js ***!
  \***************************************************************************/
/*! exports provided: loadExternalRemoveInteraction, Remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalRemoveInteraction", function() { return loadExternalRemoveInteraction; });
/* harmony import */ var _Remover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Remover */ "./node_modules/tsparticles-interaction-external-remove/esm/Remover.js");
/* harmony import */ var _Options_Classes_Remove__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Remove */ "./node_modules/tsparticles-interaction-external-remove/esm/Options/Classes/Remove.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Remove", function() { return _Options_Classes_Remove__WEBPACK_IMPORTED_MODULE_1__["Remove"]; });

/* harmony import */ var _Options_Interfaces_IRemove__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Interfaces/IRemove */ "./node_modules/tsparticles-interaction-external-remove/esm/Options/Interfaces/IRemove.js");
/* empty/unused harmony star reexport */
function loadExternalRemoveInteraction(engine) {
    engine.addInteractor("externalRemove", (container) => new _Remover__WEBPACK_IMPORTED_MODULE_0__["Remover"](container));
}




/***/ })

}]);