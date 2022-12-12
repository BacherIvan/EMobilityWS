(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles"],{

/***/ "./node_modules/tsparticles/esm/index.js":
/*!***********************************************!*\
  !*** ./node_modules/tsparticles/esm/index.js ***!
  \***********************************************/
/*! exports provided: loadFull */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFull", function() { return loadFull; });
/* harmony import */ var tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-plugin-absorbers */ "./node_modules/tsparticles-plugin-absorbers/esm/index.js");
/* harmony import */ var tsparticles_updater_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-updater-destroy */ "./node_modules/tsparticles-updater-destroy/esm/index.js");
/* harmony import */ var tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles-plugin-emitters */ "./node_modules/tsparticles-plugin-emitters/esm/index.js");
/* harmony import */ var tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tsparticles-interaction-external-trail */ "./node_modules/tsparticles-interaction-external-trail/esm/index.js");
/* harmony import */ var tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tsparticles-updater-roll */ "./node_modules/tsparticles-updater-roll/esm/index.js");
/* harmony import */ var tsparticles_slim__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tsparticles-slim */ "./node_modules/tsparticles-slim/esm/index.js");
/* harmony import */ var tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tsparticles-updater-tilt */ "./node_modules/tsparticles-updater-tilt/esm/index.js");
/* harmony import */ var tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tsparticles-updater-twinkle */ "./node_modules/tsparticles-updater-twinkle/esm/index.js");
/* harmony import */ var tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tsparticles-updater-wobble */ "./node_modules/tsparticles-updater-wobble/esm/index.js");









async function loadFull(engine) {
    await Object(tsparticles_slim__WEBPACK_IMPORTED_MODULE_5__["loadSlim"])(engine);
    await Object(tsparticles_updater_destroy__WEBPACK_IMPORTED_MODULE_1__["loadDestroyUpdater"])(engine);
    await Object(tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_4__["loadRollUpdater"])(engine);
    await Object(tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_6__["loadTiltUpdater"])(engine);
    await Object(tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_7__["loadTwinkleUpdater"])(engine);
    await Object(tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_8__["loadWobbleUpdater"])(engine);
    await Object(tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_3__["loadExternalTrailInteraction"])(engine);
    await Object(tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__["loadAbsorbersPlugin"])(engine);
    await Object(tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_2__["loadEmittersPlugin"])(engine);
}


/***/ })

}]);