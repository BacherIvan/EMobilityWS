/*  ==========================================================================
    FIRST-USER-INTERACTION
    Helper for doing things on first user input
    ========================================================================== */


/* CODE
 * --------------------------------------------------------------------------- */

/**
 * A flag, which indicates if the listeners were already registered or not
 * @type {boolean}
 */
let areListenerRegistered = false;

/**
 * A flag, which indicates if the event was already triggered or not
 * @type {boolean}
 */
let wasAlreadyTriggered = false;

/**
 * Event name for 'FIRST-USER-INTERACTION'
 * @type {string}
 */
const firstUserInteractionEvent = 'first-user-interaction';

/**
 * Registers and fires an event on first user input (like click, keydown, mousemove, etc)
 */
function registerEventListeners() {
    const eventDispatchFunc = (event) => {
        if (!wasAlreadyTriggered) {
            window.dispatchEvent(new Event(firstUserInteractionEvent));
            console.log(`FIRST-USER-INTERACTION: event '${firstUserInteractionEvent}' was »triggered« on user event '${event.type}'`);
            wasAlreadyTriggered = true;
        } else {
            console.log(`FIRST-USER-INTERACTION: »ignored« event '${event.type}'`);
        }
    };

    window.addEventListener('click', eventDispatchFunc, { once: true });
    window.addEventListener('keydown', eventDispatchFunc, { once: true });
    window.addEventListener('mousemove', eventDispatchFunc, { once: true });
    window.addEventListener('scroll', eventDispatchFunc, { once: true, passive: false });
    window.addEventListener('touchstart', eventDispatchFunc, { once: true, passive: false });
    areListenerRegistered = true;
}

/**
 * Resolves a promise when the user has made some kind of interaction
 * @return Promise
 */
export function onFirstUserAction() {
    return new Promise((resolve) => {
        if (wasAlreadyTriggered) {
            resolve();
        } else {
            window.addEventListener(firstUserInteractionEvent, () => resolve(), { once: true });
            if (!areListenerRegistered) {
                registerEventListeners();
            }
        }
    });
}
