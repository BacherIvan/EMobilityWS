(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entry--sections--admin"],{

/***/ "./source/js/entries/sections/admin.js":
/*!*********************************************!*\
  !*** ./source/js/entries/sections/admin.js ***!
  \*********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cash-dom */ "./node_modules/cash-dom/dist/cash.js");
/* harmony import */ var cash_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cash_dom__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
/*  ==========================================================================
    HERO
    ========================================================================== */

// node modules imports


// local imports


/* CODE
 * --------------------------------------------------------------------------- */

// define identifier
const identifier = 'admin';

// initialize module
const $section = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_1__["CLASSNAMES"].sect}[data-id="${identifier}"]`);
if ($section.length) {
  // Tagebuch-Einträge
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var rows = JSON.parse(xhttp.responseText);
      for (const item of rows) {
        const span = document.getElementById('JS-eintrag');
        var name = document.createTextNode(item['vorname'] + ' ' + item['nachname']);
        span.appendChild(name);
        var linebreak = document.createElement('br');
        span.appendChild(linebreak);
        var time = document.createTextNode(item['startzeit'] + ' - ' + item['entzeit']);
        span.appendChild(time);
        linebreak = document.createElement('br');
        span.appendChild(linebreak);
        var entry = document.createTextNode(item['eintrag']);
        span.appendChild(entry);
        linebreak = document.createElement('br');
        span.appendChild(linebreak);
      }
    }
  };
  xhttp.open("GET", "/config/db/Tagebuch.php?datum=" + "2022-11-21");
  xhttp.send(null);

  // Personen für Drop-Down Menü
  class Person {
    constructor(IDP, vorname, nachname) {
      this.IDP = IDP;
      this.vorname = vorname;
      this.nachname = nachname;
    }
  }
  class PersonList {
    constructor() {
      this.list = [];
    }
    addPerson(person) {
      this.list.push(person);
    }
    getPerson(index) {
      return this.list[index];
    }
    getPersonList() {
      return this.list;
    }
  }
  let personList = new PersonList();
  var xhttpPersons = new XMLHttpRequest();
  xhttpPersons.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var rows = JSON.parse(xhttpPersons.responseText);
      for (const item of rows) {
        let person = new Person(item["IDP"], item["vorname"], item["nachname"]);
        personList.addPerson(person);
      }
      console.log(personList.getPersonList());
    }
  };
  xhttpPersons.open("GET", "/config/db/Persons.php");
  xhttpPersons.send(null);

  // Auf den Menüpunkt, der gecklickt wurde, die Klasse 'JS-act' setzen
  $section.find('.JS-anchor').on('click', function () {
    $section.find('.JS-act').removeClass('JS-act');
    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('JS-act');
    const target = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-target'),
      $element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`#${target}`);
    if (target == 'c51') {
      var remove_element = document.getElementById('c50');
      var add_element = document.getElementById('c51');
      remove_element.classList.remove('JS-act');
      add_element.classList.add('JS-act');
    } else {
      var remove_element = document.getElementById('c51');
      var add_element = document.getElementById('c50');
      remove_element.classList.remove('JS-act');
      add_element.classList.add('JS-act');
    }
  });
}

/***/ })

},[["./source/js/entries/sections/admin.js","webpack--runtime","vendor--cash-dom","tk-internal-functions"]]]);