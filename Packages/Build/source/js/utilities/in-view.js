/*  ==========================================================================
    IN-VIEW
     a simple replacement for
        `$(...).on('inview', ...)`
            to
        `inView($(...).get(), (entry, direction) => { ... }, { options })`

    IntersectionObserver API Reference:
     (https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
    ========================================================================== */

// node modules imports
import { merge } from 'lodash-es';

/* CODE
 * --------------------------------------------------------------------------- */

/**
 * Helper function for callback handling
 * @param {Object} data
 */
function handleCallback(data) {
    data.callback(data.entry, data.direction);
    if (data.config.once === true) {
        data.observer.unobserve(data.entry.target);
    }
}

/**
 * Call this function with at least one element, and a callback function
 *
 * DEFAULT OPTIONS :
 *  - 'root'       : `null` -> top-level document's viewport.
 *  - 'rootMargin' : `100% 0 100% 0` -> should be a complete viewport height before and after the
 *                                      observed element comes in view ('vh' doesn't work, only '%')
 *  - 'threshold'  : `[0]`  -> you can add multiple trigger points, values from `0.0` till `1.0`.
 *  - 'once'       : `true` -> decide if the callback should be only triggered once or repeatedly.
 *
 * @param {Array, NodeList, Node} elements - either an array, a NodeList or a Node of DOM Elements.
 *                                           If you use `cash-dom`, don't forget to convert the
 *                                           object.
 * @param callback - a callback function when it's intersecting, you have the params `entry` and
 *                   `direction` available.
 * @param {Object} [options] - options from the Intersection API, plus a custom one 'once' for
 *                             single pass.
 */
export function inView(elements, callback, options = {}) {
    const defaults = {
        rootMargin: '100% 0% 100% 0%',
        once: true,
    };
    const config = merge(defaults, options);
    let previousYPosition = 0;
    let isLeaving = false;

    const observerInstance = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                const currentYPosition = entry.boundingClientRect.y;
                if (previousYPosition === 0) {
                    if (entry.isIntersecting) {
                        handleCallback({
                            observer, entry, config, callback, direction: 'initial',
                        });
                    }
                } else if (currentYPosition < previousYPosition) {
                    if (entry.isIntersecting) {
                        isLeaving = true;
                        handleCallback({
                            observer, entry, config, callback, direction: 'down-enter',
                        });
                    } else if (isLeaving) {
                        isLeaving = false;
                        handleCallback({
                            observer, entry, config, callback, direction: 'down-leave',
                        });
                    }
                } else if (currentYPosition > previousYPosition) {
                    if (entry.isIntersecting) {
                        isLeaving = true;
                        handleCallback({
                            observer, entry, config, callback, direction: 'up-enter',
                        });
                    } else if (isLeaving) {
                        isLeaving = false;
                        handleCallback({
                            observer, entry, config, callback, direction: 'up-leave',
                        });
                    }
                }
                previousYPosition = currentYPosition;
            });
        },
        config,
    );

    if (elements instanceof NodeList || Array.isArray(elements)) {
        elements.forEach((elem) => {
            observerInstance.observe(elem);
        });
        return;
    }

    if (elements instanceof Node) {
        observerInstance.observe(elements);
        return;
    }

    throw new Error("'in-view' Error: unknown type of given elements... convert it to either an Array, NodeList or Node");
}
