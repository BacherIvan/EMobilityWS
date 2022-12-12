(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["vendor--tsparticles-shape-image"],{

/***/ "./node_modules/tsparticles-shape-image/esm/ImageDrawer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/tsparticles-shape-image/esm/ImageDrawer.js ***!
  \*****************************************************************/
/*! exports provided: ImageDrawer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageDrawer", function() { return ImageDrawer; });
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils */ "./node_modules/tsparticles-shape-image/esm/Utils.js");

class ImageDrawer {
    constructor() {
        this._images = [];
    }
    addImage(container, image) {
        const containerImages = this.getImages(container);
        containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
    }
    destroy() {
        this._images = [];
    }
    draw(context, particle, radius, opacity) {
        var _a;
        const image = particle.image, element = image === null || image === void 0 ? void 0 : image.element;
        if (!element) {
            return;
        }
        const ratio = (_a = image === null || image === void 0 ? void 0 : image.ratio) !== null && _a !== void 0 ? _a : 1, pos = {
            x: -radius,
            y: -radius,
        };
        context.globalAlpha = opacity;
        context.drawImage(element, pos.x, pos.y, radius * 2, (radius * 2) / ratio);
        context.globalAlpha = 1;
    }
    getImages(container) {
        const containerImages = this._images.find((t) => t.id === container.id);
        if (!containerImages) {
            this._images.push({
                id: container.id,
                images: [],
            });
            return this.getImages(container);
        }
        else {
            return containerImages;
        }
    }
    getSidesCount() {
        return 12;
    }
    loadShape(particle) {
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }
        const container = particle.container, images = this.getImages(container).images, imageData = particle.shapeData, image = images.find((t) => t.source === imageData.src);
        if (!image) {
            this.loadImageShape(container, imageData).then(() => {
                this.loadShape(particle);
            });
        }
    }
    particleInit(container, particle) {
        var _a;
        if (particle.shape !== "image" && particle.shape !== "images") {
            return;
        }
        const images = this.getImages(container).images, imageData = particle.shapeData, color = particle.getFillColor(), replaceColor = (_a = imageData.replaceColor) !== null && _a !== void 0 ? _a : imageData.replace_color, image = images.find((t) => t.source === imageData.src);
        if (!image) {
            return;
        }
        if (image.loading) {
            setTimeout(() => {
                this.particleInit(container, particle);
            });
            return;
        }
        (async () => {
            var _a, _b;
            let imageRes;
            if (image.svgData && color) {
                imageRes = await Object(_Utils__WEBPACK_IMPORTED_MODULE_0__["replaceImageColor"])(image, imageData, color, particle);
            }
            else {
                imageRes = {
                    color,
                    data: image,
                    element: image.element,
                    loaded: true,
                    ratio: imageData.width / imageData.height,
                    replaceColor: replaceColor,
                    source: imageData.src,
                };
            }
            if (!imageRes.ratio) {
                imageRes.ratio = 1;
            }
            const fill = (_a = imageData.fill) !== null && _a !== void 0 ? _a : particle.fill, close = (_b = imageData.close) !== null && _b !== void 0 ? _b : particle.close, imageShape = {
                image: imageRes,
                fill,
                close,
            };
            particle.image = imageShape.image;
            particle.fill = imageShape.fill;
            particle.close = imageShape.close;
        })();
    }
    async loadImageShape(container, imageShape) {
        var _a;
        const source = imageShape.src;
        if (!source) {
            throw new Error("Error tsParticles - No image.src");
        }
        try {
            const image = {
                source: source,
                type: source.substring(source.length - 3),
                error: false,
                loading: true,
            };
            this.addImage(container, image);
            const imageFunc = ((_a = imageShape.replaceColor) !== null && _a !== void 0 ? _a : imageShape.replace_color) ? _Utils__WEBPACK_IMPORTED_MODULE_0__["downloadSvgImage"] : _Utils__WEBPACK_IMPORTED_MODULE_0__["loadImage"];
            await imageFunc(image);
        }
        catch (_b) {
            throw new Error(`tsParticles error - ${imageShape.src} not found`);
        }
    }
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-image/esm/Utils.js":
/*!***********************************************************!*\
  !*** ./node_modules/tsparticles-shape-image/esm/Utils.js ***!
  \***********************************************************/
/*! exports provided: loadImage, downloadSvgImage, replaceImageColor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImage", function() { return loadImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "downloadSvgImage", function() { return downloadSvgImage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceImageColor", function() { return replaceImageColor; });
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");

const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
function replaceColorSvg(imageShape, color, opacity) {
    const { svgData } = imageShape;
    if (!svgData) {
        return "";
    }
    const colorStyle = Object(tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__["getStyleFromHsl"])(color, opacity);
    if (svgData.includes("fill")) {
        return svgData.replace(currentColorRegex, () => colorStyle);
    }
    const preFillIndex = svgData.indexOf(">");
    return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
async function loadImage(image) {
    return new Promise((resolve) => {
        image.loading = true;
        const img = new Image();
        image.element = img;
        img.addEventListener("load", () => {
            image.loading = false;
            resolve();
        });
        img.addEventListener("error", () => {
            image.element = undefined;
            image.error = true;
            image.loading = false;
            console.error(`Error tsParticles - loading image: ${image.source}`);
            resolve();
        });
        img.src = image.source;
    });
}
async function downloadSvgImage(image) {
    if (image.type !== "svg") {
        await loadImage(image);
        return;
    }
    image.loading = true;
    const response = await fetch(image.source);
    if (!response.ok) {
        console.error("Error tsParticles - Image not found");
        image.error = true;
    }
    if (!image.error) {
        image.svgData = await response.text();
    }
    image.loading = false;
}
function replaceImageColor(image, imageData, color, particle) {
    var _a, _b, _c;
    const svgColoredData = replaceColorSvg(image, color, (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1), imageRes = {
        color,
        data: Object.assign(Object.assign({}, image), { svgData: svgColoredData }),
        loaded: false,
        ratio: imageData.width / imageData.height,
        replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
        source: imageData.src,
    };
    return new Promise((resolve) => {
        const svg = new Blob([svgColoredData], { type: "image/svg+xml" }), domUrl = URL || window.URL || window.webkitURL || window, url = domUrl.createObjectURL(svg), img = new Image();
        img.addEventListener("load", () => {
            imageRes.loaded = true;
            imageRes.element = img;
            resolve(imageRes);
            domUrl.revokeObjectURL(url);
        });
        img.addEventListener("error", async () => {
            domUrl.revokeObjectURL(url);
            const img2 = Object.assign(Object.assign({}, image), { error: false, loading: true });
            await loadImage(img2);
            imageRes.loaded = true;
            imageRes.element = img2.element;
            resolve(imageRes);
        });
        img.src = url;
    });
}


/***/ }),

/***/ "./node_modules/tsparticles-shape-image/esm/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/tsparticles-shape-image/esm/index.js ***!
  \***********************************************************/
/*! exports provided: loadImageShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadImageShape", function() { return loadImageShape; });
/* harmony import */ var _ImageDrawer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImageDrawer */ "./node_modules/tsparticles-shape-image/esm/ImageDrawer.js");

async function loadImageShape(engine) {
    const imageDrawer = new _ImageDrawer__WEBPACK_IMPORTED_MODULE_0__["ImageDrawer"]();
    await engine.addShape("image", imageDrawer);
    await engine.addShape("images", imageDrawer);
}


/***/ })

}]);