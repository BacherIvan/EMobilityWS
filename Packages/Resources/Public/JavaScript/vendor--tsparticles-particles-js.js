(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-particles-js"],{

/***/ "./node_modules/tsparticles-particles.js/esm/index.js":
/*!************************************************************!*\
  !*** ./node_modules/tsparticles-particles.js/esm/index.js ***!
  \************************************************************/
/*! exports provided: initPjs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPjs", function() { return initPjs; });
const initPjs = (engine) => {
    const particlesJS = (tagId, options) => {
        return engine.load(tagId, options);
    };
    particlesJS.load = (tagId, pathConfigJson, callback) => {
        engine
            .loadJSON(tagId, pathConfigJson)
            .then((container) => {
            if (container) {
                callback(container);
            }
        })
            .catch(() => {
            callback(undefined);
        });
    };
    particlesJS.setOnClickHandler = (callback) => {
        engine.setOnClickHandler(callback);
    };
    const pJSDom = engine.dom();
    return { particlesJS, pJSDom };
};



/***/ })

}]);