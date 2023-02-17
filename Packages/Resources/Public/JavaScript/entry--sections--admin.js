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
/* harmony import */ var flatpickr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flatpickr */ "./node_modules/flatpickr/dist/esm/index.js");
/* harmony import */ var tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tk-source-root/js/variables/variables */ "./source/js/variables/variables.js");
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
const $section = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`.${tk_source_root_js_variables_variables__WEBPACK_IMPORTED_MODULE_2__["CLASSNAMES"].sect}[data-id="${identifier}"]`);
if ($section.length) {
  // Kalender Variablen definieren
  var calender = document.getElementById('JS-calendar');
  var newEntryCalendar = document.getElementById('JS-new-entry-calendar');
  var fromTime = document.getElementById('JS-fromTime');
  var toTime = document.getElementById('JS-toTime');
  var fromTime_value = "";
  var toTime_value = "";
  var newEntryCalendar_value = "";

  // Kalender beim Neuen Eintrag
  newEntryCalendar.flatpickr({
    maxDate: "today",
    disableMobile: "true",
    altInput: true,
    altFormat: "d.m.Y",
    onChange: function (selectedDates, dateStr, instance) {
      newEntryCalendar_value = dateStr;
    }
  });
  fromTime.flatpickr({
    noCalendar: true,
    enableTime: true,
    dateFormat: "H:i",
    time_24hr: true,
    onChange: function (selectedDates, dateStr, instance) {
      fromTime_value = dateStr;
    }
  });
  toTime.flatpickr({
    noCalendar: true,
    enableTime: true,
    dateFormat: "H:i",
    time_24hr: true,
    onChange: function (selectedDates, dateStr, instance) {
      toTime_value = dateStr;
    }
  });
  function getTagebuch(datum) {
    // Tagebuch-Einträge
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var rows = JSON.parse(xhttp.responseText);
        const wrap = document.getElementById('JS-eintrag');
        wrap.innerHTML = '';
        for (const item of rows) {
          // Alle empfangenen Attribute in 'div' Klassen schreiben, um sie anschließend zu stylen
          var name = `<div class="EBIL-section__name">${item.vorname} ${item.nachname}</div>`;
          wrap.innerHTML += name;
          var time = `<div class="EBIL-section__time">${item.startzeit} - ${item.entzeit}</div>`;
          wrap.innerHTML += time;
          var entry = `<div class="EBIL-section__entry">${item.eintrag}</div>`;
          wrap.innerHTML += entry;
          var linebreak = document.createElement('br');
          wrap.appendChild(linebreak);
        }
      }
    };
    xhttp.open("GET", "/config/db/Tagebuch.php?datum=" + datum);
    xhttp.send(null);
  }

  // Datum empfangen
  var dates = [];
  var xhttpDates = new XMLHttpRequest();
  xhttpDates.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var rows = JSON.parse(xhttpDates.responseText);
      for (const item of rows) {
        dates.push(item["datum"]);
      }
      var displayDate = document.getElementById('JS-datum');
      displayDate.innerHTML = '';
      calender.flatpickr({
        enable: dates,
        defaultDate: dates[dates.length - 1],
        altInput: true,
        altFormat: "d.m.Y",
        onChange: function (selectedDates, dateStr, instance) {
          getTagebuch(dateStr);
          displayDate.innerHTML = '';
          const dateString = dateStr.split("-");
          displayDate.innerHTML = "Datum: " + dateString[2] + "." + dateString[1] + "." + dateString[0];
        }
      });
      // Letzten Eintrag Standartmäßig übergeben
      getTagebuch(dates[dates.length - 1]);
      const letzterEintrag = dates[dates.length - 1].split("-");
      displayDate.innerHTML = "Letzter Eintrag: " + letzterEintrag[2] + "." + letzterEintrag[1] + "." + letzterEintrag[0];
    }
  };
  xhttpDates.open("GET", "/config/db/Dates.php");
  xhttpDates.send(null);
  var c50element = document.getElementById('c50');
  var c51element = document.getElementById('c51');
  var newEntry = document.getElementById('JS-newEntry');
  // Auf den Menüpunkt, der gecklickt wurde, die Klasse 'JS-act' setzen
  $section.find('.JS-anchor').on('click', function () {
    $section.find('.JS-act').removeClass('JS-act');
    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('JS-act');
    const target = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-target'),
      $element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`#${target}`);
    if (target == 'c51') {
      c50element.classList.remove('JS-act');
      c51element.classList.add('JS-act');
      calender.classList.remove('JS-act');
      newEntry.classList.remove('JS-act');
    } else {
      c51element.classList.remove('JS-act');
      c50element.classList.add('JS-act');
      calender.classList.add('JS-act');
      newEntry.classList.add('JS-act');
    }
  });
  function clearInputs() {
    document.getElementById('JS-person1').checked = false;
    document.getElementById('JS-person2').checked = false;
    document.getElementById('JS-person3').checked = false;
    document.getElementById('JS-person4').checked = false;
    document.getElementById('JS-person5').checked = false;
    document.getElementById('JS-person6').checked = false;
    document.getElementById('JS-message').value = '';
    $section.attr('data-person-required', 0);
    $section.attr('data-date-time-required', 0);
    $section.attr('data-text-required', 0);
    $section.attr('data-entry-success', 0);
  }

  // Neuer Eintrag "Menü" öffnen
  var openEntry = 0;
  $section.on('click', '.JS-entry', () => {
    $section.attr('data-new-entry', openEntry = 1 - openEntry);
    clearInputs();
  });

  // Wenn enter gedrückt wird, einen Button click "simulieren"
  var input = document.getElementById('JS-newEntry');
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      document.getElementById("JS-submit-button").click();
    }
  });
  $section.on('click', '.JS-submit-button', () => {
    // Alle Fehlermeldungen ausblenden
    $section.attr('data-person-required', 0);
    $section.attr('data-date-time-required', 0);
    $section.attr('data-text-required', 0);
    $section.attr('data-entry-success', 0);
    var checked = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()("input[type=checkbox]:checked");
    var text = document.getElementById('JS-message').value;
    var displayError = false;
    // Überprüfen, ob alle Felder ausgefüllt sind, sonst das enstsprechende attribut für eine Fehlermeldung ändern
    if (checked.length === 0) {
      $section.attr('data-person-required', 1);
      displayError = true;
    }
    if (newEntryCalendar_value === "" || fromTime_value === "" || toTime_value === "") {
      $section.attr('data-date-time-required', 1);
      displayError = true;
    }
    if (text.length === 0) {
      $section.attr('data-text-required', 1);
      displayError = true;
    }
    if (displayError) {
      return false;
    }
    var checkedVal = [];
    for (const item of checked) {
      checkedVal.push(item.value);
    }
    clearInputs();
    var xhttpNewEntry = new XMLHttpRequest();
    xhttpNewEntry.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var rows = JSON.parse(xhttpNewEntry.responseText);
        console.log(rows);
        if (rows === 0) {
          $section.attr('data-entry-success', 1);
        }
      }
    };
    xhttpNewEntry.open("GET", "/config/db/CreateEntry.php?persons=" + checkedVal + "&datum=" + newEntryCalendar_value + "&startzeit=" + fromTime_value + "&endzeit=" + toTime_value + "&eintrag=" + text);
    xhttpNewEntry.send(null);
  });
}

/***/ })

},[["./source/js/entries/sections/admin.js","webpack--runtime","vendor--cash-dom","tk-internal-functions","vendor--flatpickr"]]]);