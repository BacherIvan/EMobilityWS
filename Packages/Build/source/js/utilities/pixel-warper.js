/*  ==========================================================================
    PIXEL WARPER
    Helper to scroll (warp) to a certain element or position with a smooth animation

    ___________________          _-_
    \==============_=_/ ____.---'---`---.____
                \_ \    \----._________.----/
                  \ \   /  /    `-_-'
              __,--`.`-'..'-_
             /____          ||
                  `--.____,-'

    INFO:
        - Call this util within the window 'onload' event to prevent 'unwanted behaviour'
          (or, if you have a custom event, you can use that too)
        - If you want to change the easing (animation), you will find some options in this
          local file: `bn-source-root/js/utilities/pixel-warper`
        - It's just a wrapper for `https://www.npmjs.com/package/animated-scroll-to`

    REQUIREMENTS:
        `npm i animated-scroll-to`

    OPTIONS:
        same as: https://www.npmjs.com/package/animated-scroll-to
    ```
        const defaultOptions = {
          // Indicated if scroll animation should be canceled on user action (scroll/keypress/touch)
          // if set to "false" user input will be disabled until scroll animation is complete
          cancelOnUserAction: true,

          // Animation easing function, with "easeOutCubic" as default
          easing: t => (--t) * t * t + 1,

          // DOM element that should be scrolled
          // Example: document.querySelector('#element-to-scroll'),
          elementToScroll: window,

          // Horizontal scroll offset
          // Practical when you are scrolling to a DOM element and want to add some padding
          horizontalOffset: 0,

          // Maximum duration of the scroll animation
          maxDuration: 3000,

          // Minimum duration of the scroll animation
          minDuration: 250,

          // Duration of the scroll per 1000px
          speed: 500,

          // Vertical scroll offset
          // Practical when you are scrolling to a DOM element and want to add some padding
          verticalOffset: 0,
        };
    ```

    EXAMPLE:
    ```
        import { EasingFunctions } from 'bn-source-root/js/utilities/pixel-warper'
        pixelWarp($('#DNA-main')[0], {
            speed: 5000,
            verticalOffset: -100,
            easing: EasingFunctions.easeInOutQuad,
        });
    ```
    ========================================================================== */

// node module imports
import animateScrollTo from 'animated-scroll-to';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Helper to scroll (warp) to a certain element or position with a smooth animation
 *
 * @param {(Element|int|Array)} to - the destination to warp (=scroll), either a vanilla DOM
 *                                   Element, an integer as desired vertical position or an array
 *                                   with exactly 2 values, the horizontal and vertical position,
 *                                   both as integer.
 * @param {Object} [options] -       the configuration object from `animateScrollTo` library
 */
export function pixelWarp(to, options) {
    animateScrollTo(to, options);
}

/*
    EASING FUNCTIONS
      from https://gist.github.com/gre/1650294

    USE:
    1) import it in your file
        `import { EasingFunctions } from 'bn-source-root/js/utilities/pixel-warper';`
    2) give it to the `pixel-warp` function as `function value` (call without parentheses)
        `pixelWarp({ easing: EasingFunctions.linear });`
*/

export const EasingFunctions = {
    // no easing, no acceleration
    linear: (t) => t,
    // accelerating from zero velocity
    easeInQuad: (t) => t * t,
    // decelerating to zero velocity
    easeOutQuad: (t) => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
    // accelerating from zero velocity
    easeInCubic: (t) => t * t * t,
    // decelerating to zero velocity
    easeOutCubic: (t) => (--t) * t * t + 1,
    // acceleration until halfway, then deceleration
    easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
    // accelerating from zero velocity
    easeInQuart: (t) => t * t * t * t,
    // decelerating to zero velocity
    easeOutQuart: (t) => 1 - (--t) * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),
    // accelerating from zero velocity
    easeInQuint: (t) => t * t * t * t * t,
    // decelerating to zero velocity
    easeOutQuint: (t) => 1 + (--t) * t * t * t * t,
    // acceleration until halfway, then deceleration
    easeInOutQuint: (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t),
};
