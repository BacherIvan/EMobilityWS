(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-shape-text"],{

/***/ "./node_modules/tsparticles-shape-text/esm/TextDrawer.js":
/*!***************************************************************!*\
  !*** ./node_modules/tsparticles-shape-text/esm/TextDrawer.js ***!
  \***************************************************************/
/*! exports provided: validTypes, TextDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validTypes", function() { return validTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextDrawer", function() { return TextDrawer; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

const validTypes = ["text", "character", "char"];
class TextDrawer {
    draw(context, particle, radius, opacity) {
        var _a, _b, _c;
        const character = particle.shapeData;
        if (character === undefined) {
            return;
        }
        const textData = character.value;
        if (textData === undefined) {
            return;
        }
        const textParticle = particle;
        if (textParticle.text === undefined) {
            textParticle.text = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["itemFromSingleOrMultiple"])(textData, particle.randomIndexData);
        }
        const text = textParticle.text, style = (_a = character.style) !== null && _a !== void 0 ? _a : "", weight = (_b = character.weight) !== null && _b !== void 0 ? _b : "400", size = Math.round(radius) * 2, font = (_c = character.font) !== null && _c !== void 0 ? _c : "Verdana", fill = particle.fill, offsetX = (text.length * radius) / 2;
        context.font = `${style} ${weight} ${size}px "${font}"`;
        const pos = {
            x: -offsetX,
            y: radius / 2,
        };
        context.globalAlpha = opacity;
        if (fill) {
            context.fillText(text, pos.x, pos.y);
        }
        else {
            context.strokeText(text, pos.x, pos.y);
        }
        context.globalAlpha = 1;
    }
    getSidesCount() {
        return 12;
    }
    async init(container) {
        const options = container.actualOptions;
        if (validTypes.find((t) => Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["isInArray"])(t, options.particles.shape.type))) {
            const shapeOptions = validTypes
                .map((t) => options.particles.shape.options[t])
                .find((t) => !!t), promises = [];
            Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["executeOnSingleOrMultiple"])(shapeOptions, (shape) => {
                promises.push(Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["loadFont"])(shape.font, shape.weight));
            });
            await Promise.all(promises);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-text/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/tsparticles-shape-text/esm/index.js ***!
  \**********************************************************/
/*! exports provided: loadTextShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadTextShape", function() { return loadTextShape; });
/* harmony import */ var _TextDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TextDrawer */ "./node_modules/tsparticles-shape-text/esm/TextDrawer.js");

async function loadTextShape(engine) {
    const drawer = new _TextDrawer__WEBPACK_IMPORTED_MODULE_0__["TextDrawer"]();
    for (const type of _TextDrawer__WEBPACK_IMPORTED_MODULE_0__["validTypes"]) {
        await engine.addShape(type, drawer);
    }
}


/***/ })

}]);