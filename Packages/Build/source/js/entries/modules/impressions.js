// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { inView } from 'tk-source-root/js/utilities/in-view';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'impressions';

// initialize module
const $modules = $(`.${vars.CLASSNAMES.mod}[data-id="${identifier}"]`);
inView($modules.get(), (item) => {
    const $container = $(item.target);
    // add fade in
    $container.addClass('JS-fade-in');

    // SLIDER
    const images = document.querySelectorAll(".JS-impression-item");
    const wrapper = document.querySelector(".JS-impression-wrap");
    const imagesAndChilds = [];
    const animationoptions = {
        duration: 850,
        easing: "ease-in-out",
        fill: "forwards"
    };

    let position = 0;

    $container.on('click', '.JS-arrow-right', () => {
        position++;
        imagesAndChilds.forEach((element, index) => {
            setTransfrom(element, baseRotation * (index + position));
        });
    });

    $container.on('click', '.JS-arrow-left', () => {
        position--;
        imagesAndChilds.forEach((element, index) => {
            setTransfrom(element, baseRotation * (index + position));
        });
    });

    images.forEach((parent) => {
        const child = parent.querySelector("img");
        imagesAndChilds.push({ parent, child });
    });

    const baseRotation = 360 / imagesAndChilds.length;

    imagesAndChilds.forEach((element, index) => {
        setTransfrom(element, baseRotation * index, true);
        animateImg(element.child, index !== 0);
    });

    function setTransfrom(element, deg, noAnimation = false) {
        if (noAnimation) {
            element.parent.style.transform = `rotate(${deg}deg)`;
        } else {
            element.parent.animate(
                {
                    transform: `rotate(${deg}deg)`
                },
                animationoptions
            );
            animateImg(element.child, deg % 360);
        }
    }

    function animateImg(img, inactive) {
        if (inactive) {
            img.animate(
                {
                    transform: `scale(0.7)`,
                    opacity: 0.9
                },
                animationoptions
            );
        } else {
            img.animate(
                {
                    transform: `scale(1)`,
                    opacity: 1
                },
                animationoptions
            );
        }
    }
}, {
    rootMargin: '0px',
});
