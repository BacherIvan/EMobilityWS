// node modules imports
import $ from 'cash-dom';

// local imports
import * as vars from 'tk-source-root/js/variables/variables';
import { inView } from 'tk-source-root/js/utilities/in-view';
import { initLightBoxGallery } from 'tk-source-root/js/utilities/lightbox';

/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'team';

// initialize team-module
const $modules = $(`.${vars.CLASSNAMES.mod}[data-id="${identifier}"]`);
inView($modules.get(), (item) => {
    const $container = $(item.target);
    // add fade in
    $container.addClass('JS-fade-in');


    // init Light Box Gallery
    $container.find('.JS-lbox').each(function () {
        initLightBoxGallery($(this).get(0));
    });


   // Add cards effect
    const cards = document.querySelectorAll(".JS-card");
    const wrapper = document.querySelector(".JS-cards");

    wrapper.addEventListener("mousemove", function ($event) {
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = $event.clientX - rect.left;
            const y = $event.clientY - rect.top;

            card.style.setProperty("--xPos", `${x}px`);
            card.style.setProperty("--yPos", `${y}px`);
        });
    });

}, {
    rootMargin: '0px',
});
