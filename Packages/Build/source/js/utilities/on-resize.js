/*  ==========================================================================
    ON-RESIZE
     a replacement for `mresize()`

     USE:
     `onResize($(...).get(), (entry) => { ... })`

    ResizeObserver API Reference:
     (https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)
    ========================================================================== */

/**
 * @param elements
 * @param callback
 */
export function onResize(elements, callback) {
    const observerInstance = new ResizeObserver(
        (entries) => {
            entries.forEach((entry) => {
                callback(entry);
            });
        },
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

    throw new Error("'on-resize' Error: unknown type of given elements... convert it to either an Array, NodeList or Node");
}
