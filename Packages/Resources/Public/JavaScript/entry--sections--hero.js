(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entry--sections--hero"],{

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./source/js/entries/sections/hero.js":
/*!********************************************!*\
  !*** ./source/js/entries/sections/hero.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tsparticles-engine */ "./node_modules/tsparticles-engine/esm/index.js");
/* harmony import */ var tsparticles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tsparticles */ "./node_modules/tsparticles/esm/index.js");
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
/* harmony import */ var tk_source_root_js_utilities_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tk-source-root/js/utilities/slider */ "./source/js/utilities/slider.js");
/* harmony import */ var tk_source_root_js_utilities_first_user_interaction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tk-source-root/js/utilities/first-user-interaction */ "./source/js/utilities/first-user-interaction.js");
/* harmony import */ var tk_source_root_js_utilities_pixel_warper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tk-source-root/js/utilities/pixel-warper */ "./source/js/utilities/pixel-warper.js");
/* harmony import */ var tk_source_root_js_utilities_in_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tk-source-root/js/utilities/in-view */ "./source/js/utilities/in-view.js");
/*  ==========================================================================
    HERO
    ========================================================================== */

// node modules imports




// local imports






/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'hero';

// initialize module
const $section = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_3__["CLASSNAMES"].sect}[data-id="${identifier}"]`);
if ($section.length) {
  $section.find('.JS-scrolldown').on('click', function (e) {
    Object(tk_source_root_js_utilities_pixel_warper__WEBPACK_IMPORTED_MODULE_6__["pixelWarp"])(cash_dom__WEBPACK_IMPORTED_MODULE_0___default()('#EBIL-section--main')[0], {
      speed: 2000
    });
  });

  // confetti effect
  const $slogan = $section.find('.JS-slogan');

  // show only confetti effect when slogan is clicked
  $slogan.on('click', function () {
    $section.find('.JS-confetti-effect').removeClass('hidden');
  });
  let particlesContainer;
  const particlesOptions = {
    fpsLimit: 60,
    particles: {
      number: {
        value: 0
      },
      color: {
        value: '#c59960',
        animation: {
          enable: false
        }
      },
      shape: {
        type: ['circle', 'square', 'polygon'],
        options: {
          polygon: {
            sides: 6
          }
        }
      },
      opacity: {
        value: {
          min: 0,
          max: 1
        },
        animation: {
          enable: true,
          speed: 1,
          startValue: 'max',
          destroy: 'min'
        }
      },
      size: {
        value: {
          min: 3,
          max: 7
        }
      },
      life: {
        duration: {
          sync: true,
          value: 7
        },
        count: 1
      },
      move: {
        enable: true,
        gravity: {
          enable: true
        },
        drift: {
          min: -2,
          max: 2
        },
        speed: {
          min: 10,
          max: 30
        },
        decay: 0.1,
        direction: 'none',
        random: false,
        straight: false,
        outModes: {
          default: 'destroy',
          top: 'none'
        }
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: 'random',
        move: true,
        animation: {
          enable: true,
          speed: 60
        }
      },
      tilt: {
        direction: 'random',
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 60
        }
      },
      roll: {
        darken: {
          enable: true,
          value: 25
        },
        enable: true,
        speed: {
          min: 15,
          max: 25
        }
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -15,
          max: 15
        }
      }
    },
    detectRetina: true,
    emitters: {
      direction: 'none',
      spawnColor: {
        value: '#c59960',
        animation: {
          enable: false,
          h: {
            enable: true,
            offset: {
              min: -1.4,
              max: 1.4
            },
            speed: 0.1,
            sync: false
          },
          l: {
            enable: true,
            offset: {
              min: 20,
              max: 80
            },
            speed: 0,
            sync: false
          }
        }
      },
      life: {
        count: 0,
        duration: 0.1,
        delay: 0.6
      },
      rate: {
        delay: 0.1,
        quantity: 100
      },
      size: {
        width: 0,
        height: 0
      }
    }
  };
  (async () => {
    await Object(tsparticles__WEBPACK_IMPORTED_MODULE_2__["loadFull"])(tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["tsParticles"]); // this is needed to load all the features and can be done everywhere before using tsParticles.load

    await tsparticles_engine__WEBPACK_IMPORTED_MODULE_1__["tsParticles"].load('particle-animation', particlesOptions);
  })();

  // initialize the slider and what it needs after the first user interaction
  Object(tk_source_root_js_utilities_first_user_interaction__WEBPACK_IMPORTED_MODULE_5__["onFirstUserAction"])().then(() => {
    // slider
    const $slider = $section.find('.JS-vista');
    const sliderOverrides = {
      mode: 'gallery',
      loop: false,
      rewind: true
    };
    const sliderItems = {
      desktop: 1,
      tablet: 1,
      mobile: 1
    };
    const sliderInstance = Object(tk_source_root_js_utilities_slider__WEBPACK_IMPORTED_MODULE_4__["initSlider"])($slider, sliderOverrides, sliderItems);
    return {
      $slider,
      sliderInstance
    };
  });
}

/***/ })

},[["./source/js/entries/sections/hero.js","webpack--runtime","vendor--cash-dom","tk-internal-functions","vendor--lodash-es","vendor--animated-scroll-to","vendor--tsparticles-engine","vendor--tiny-slider","vendor--tsparticles-plugin-emitters","vendor--tsparticles-interaction-particles-links","vendor--tsparticles-interaction-external-bubble","vendor--tsparticles-interaction-external-repulse","vendor--tsparticles-plugin-absorbers","vendor--tsparticles-updater-destroy","vendor--tsparticles-updater-out-modes","vendor--tsparticles-interaction-external-connect","vendor--tsparticles-interaction-external-grab","vendor--tsparticles-interaction-particles-collisions","vendor--tsparticles-updater-life","vendor--tsparticles-interaction-external-attract","vendor--tsparticles-interaction-external-bounce","vendor--tsparticles-interaction-external-push","vendor--tsparticles-interaction-external-remove","vendor--tsparticles-interaction-external-slow","vendor--tsparticles-interaction-external-trail","vendor--tsparticles-shape-polygon","vendor--tsparticles-updater-angle","vendor--tsparticles-updater-roll","vendor--tsparticles-updater-tilt","vendor--tsparticles-updater-twinkle","vendor--tsparticles-updater-wobble","vendor--tsparticles-move-base","vendor--tsparticles-shape-image","vendor--tsparticles-interaction-external-pause","vendor--tsparticles-interaction-particles-attract","vendor--tsparticles-move-parallax","vendor--tsparticles-shape-circle","vendor--tsparticles-shape-line","vendor--tsparticles-shape-square","vendor--tsparticles-shape-star","vendor--tsparticles-shape-text","vendor--tsparticles-updater-color","vendor--tsparticles-updater-opacity","vendor--tsparticles-updater-size","vendor--tsparticles-updater-stroke-color","vendor--tsparticles-particles-js","vendor--tsparticles-slim","vendor--tsparticles"]]]);