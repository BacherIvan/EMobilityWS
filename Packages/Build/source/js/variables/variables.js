/*  ==========================================================================
    VARIABLES
    Global variables for the whole project

    INFO:
    - the "TS" object is coming from the ts2js converter
    - translations MUST NOT be defined here, generally don't make translations
     in javascript!
    - contributions for the kickstarter are welcome!
    ========================================================================== */

// node modules imports
import $ from 'cash-dom';


/* LAYOUT
 * --------------------------------------------------------------------------- */

export const LAYOUT = {
    $html: $('html'),
    $head: $('head'),
    $body: $('body'),
    $page: $('#EmoBILity'),
    $index: $('#EBIL-section--index'),
    $header: $('#EBIL-section--header'),
    $hero: $('#EBIL-section--hero'),
    $main: $('#EBIL-section--main'),
    $footer: $('#EBIL-section--footer'),
};


/* CLASS NAMES
 * --------------------------------------------------------------------------- */

export const CLASSNAMES = {
    loader: 'JS-loader',
    scroller: 'JS-scroller',
    noResult: 'JS-no-result',
    sliderArrows: 'JS-slider-arrows',
    sliderNav: 'JS-slider-nav',
    sliderPagination: 'JS-slider-pagination',
    sect: 'EBIL-section',
    mod: 'EBIL-module',
};


/* URL PARAMS
 *  Parses current url segments and save them into a constant
 *  For 'use' instructions see here: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
 * --------------------------------------------------------------------------- */

export const URL_PARAMS = new URLSearchParams(window.location.search);
