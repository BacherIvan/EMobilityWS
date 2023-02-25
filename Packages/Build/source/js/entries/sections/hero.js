/*  ==========================================================================
    HERO
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';
import { tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { initSlider } from 'tk-source-root/js/utilities/slider';
import { onFirstUserAction } from 'tk-source-root/js/utilities/first-user-interaction';
import { pixelWarp } from 'tk-source-root/js/utilities/pixel-warper';
import { inView } from 'tk-source-root/js/utilities/in-view';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'hero';

// initialize module
const $section = $(`.${vars.CLASSNAMES.sect}[data-id="${identifier}"]`);
if ($section.length) {
    $section.find('.JS-scrolldown').on('click', function (e) {
        pixelWarp($('#EBIL-section--main')[0], {
            speed: 2000,
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
                value: 0,
            },
            color: {
                value: '#c59960',
                animation: {
                    enable: false,
                },
            },
            shape: {
                type: ['circle', 'square', 'polygon'],
                options: {
                    polygon: {
                        sides: 6,
                    },
                },
            },
            opacity: {
                value: { min: 0, max: 1 },
                animation: {
                    enable: true,
                    speed: 1,
                    startValue: 'max',
                    destroy: 'min',
                },
            },
            size: {
                value: { min: 3, max: 7 },
            },
            life: {
                duration: {
                    sync: true,
                    value: 7,
                },
                count: 1,
            },
            move: {
                enable: true,
                gravity: {
                    enable: true,
                },
                drift: {
                    min: -2,
                    max: 2,
                },
                speed: { min: 10, max: 30 },
                decay: 0.1,
                direction: 'none',
                random: false,
                straight: false,
                outModes: {
                    default: 'destroy',
                    top: 'none',
                },
            },
            rotate: {
                value: {
                    min: 0,
                    max: 360,
                },
                direction: 'random',
                move: true,
                animation: {
                    enable: true,
                    speed: 60,
                },
            },
            tilt: {
                direction: 'random',
                enable: true,
                move: true,
                value: {
                    min: 0,
                    max: 360,
                },
                animation: {
                    enable: true,
                    speed: 60,
                },
            },
            roll: {
                darken: {
                    enable: true,
                    value: 25,
                },
                enable: true,
                speed: {
                    min: 15,
                    max: 25,
                },
            },
            wobble: {
                distance: 30,
                enable: true,
                move: true,
                speed: {
                    min: -15,
                    max: 15,
                },
            },
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
                            max: 1.4,
                        },
                        speed: 0.1,
                        sync: false,
                    },
                    l: {
                        enable: true,
                        offset: {
                            min: 20,
                            max: 80,
                        },
                        speed: 0,
                        sync: false,
                    },
                },
            },
            life: {
                count: 0,
                duration: 0.1,
                delay: 0.6,
            },
            rate: {
                delay: 0.1,
                quantity: 100,
            },
            size: {
                width: 0,
                height: 0,
            },
        },
    };

    (async () => {
        await loadFull(tsParticles); // this is needed to load all the features and can be done everywhere before using tsParticles.load

        await tsParticles.load('particle-animation', particlesOptions);
    })();
}
