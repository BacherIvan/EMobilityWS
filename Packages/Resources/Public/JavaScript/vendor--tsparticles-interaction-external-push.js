(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-interaction-external-push"],{

/***/ "./node_modules/tsparticles-interaction-external-push/esm/Options/Classes/Push.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-push/esm/Options/Classes/Push.js ***!
  \****************************************************************************************/
/*! exports provided: Push */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Push", function() { return Push; });
class Push {
    constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4;
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
        if (data.default !== undefined) {
            this.default = data.default;
        }
        if (data.groups !== undefined) {
            this.groups = data.groups.map((t) => t);
        }
        if (!this.groups.length) {
            this.default = true;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
            this.quantity = quantity;
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-push/esm/Options/Interfaces/IPush.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-push/esm/Options/Interfaces/IPush.js ***!
  \********************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-push/esm/Pusher.js":
/*!**************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-push/esm/Pusher.js ***!
  \**************************************************************************/
/*! exports provided: Pusher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pusher", function() { return Pusher; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var _Options_Classes_Push__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Push */ "./node_modules/tsparticles-interaction-external-push/esm/Options/Classes/Push.js");



class Pusher extends tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["ExternalInteractorBase"] {
    constructor(container) {
        super(container);
        this.handleClickMode = (mode) => {
            if (mode !== "push") {
                return;
            }
            const container = this.container, options = container.actualOptions, pushOptions = options.interactivity.modes.push;
            if (!pushOptions) {
                return;
            }
            const pushNb = pushOptions.quantity;
            if (pushNb <= 0) {
                return;
            }
            const group = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromArray"])([undefined, ...pushOptions.groups]), groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
            container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
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
        if (!options.push) {
            options.push = new _Options_Classes_Push__WEBPACK_IMPORTED_MODULE_1__["Push"]();
        }
        for (const source of sources) {
            options.push.load(source === null || source === void 0 ? void 0 : source.push);
        }
    }
    reset() {
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-interaction-external-push/esm/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/tsparticles-interaction-external-push/esm/index.js ***!
  \*************************************************************************/
/*! exports provided: loadExternalPushInteraction, Push */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExternalPushInteraction", function() { return loadExternalPushInteraction; });
/* harmony import */ var _Pusher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pusher */ "./node_modules/tsparticles-interaction-external-push/esm/Pusher.js");
/* harmony import */ var _Options_Classes_Push__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Options/Classes/Push */ "./node_modules/tsparticles-interaction-external-push/esm/Options/Classes/Push.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Push", function() { return _Options_Classes_Push__WEBPACK_IMPORTED_MODULE_1__["Push"]; });

/* harmony import */ var _Options_Interfaces_IPush__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Options/Interfaces/IPush */ "./node_modules/tsparticles-interaction-external-push/esm/Options/Interfaces/IPush.js");
/* empty/unused harmony star reexport */
async function loadExternalPushInteraction(engine) {
    await engine.addInteractor("externalPush", (container) => new _Pusher__WEBPACK_IMPORTED_MODULE_0__["Pusher"](container));
}




/***/ })

}]);