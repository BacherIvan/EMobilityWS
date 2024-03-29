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
  var calendarWrap = document.getElementById('JS-calendar-wrap');
  // Auf den Menüpunkt, der gecklickt wurde, die Klasse 'JS-act' setzen
  $section.find('.JS-anchor').on('click', function () {
    $section.find('.JS-act').removeClass('JS-act');
    cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).addClass('JS-act');
    const target = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('data-target'),
      $element = cash_dom__WEBPACK_IMPORTED_MODULE_0___default()(`#${target}`);
    if (target == 'c51') {
      c50element.classList.remove('JS-act');
      c51element.classList.add('JS-act');
      calendarWrap.classList.remove('JS-act');
      newEntry.classList.remove('JS-act');
    } else {
      calendarWrap.classList.add('JS-act');
      c51element.classList.remove('JS-act');
      c50element.classList.add('JS-act');
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
        if (rows === 0) {
          $section.attr('data-entry-success', 1);
        }
      }
    };
    xhttpNewEntry.open("GET", "/config/db/CreateEntry.php?persons=" + checkedVal + "&datum=" + newEntryCalendar_value + "&startzeit=" + fromTime_value + "&endzeit=" + toTime_value + "&eintrag=" + text);
    xhttpNewEntry.send(null);
  });

  // Webservice (Client)
  const username = "admin";
  const password = "Test";
  const baseUrl = "http://10.11.11.77:5000";
  var rest_err = document.getElementById('JS-REST-Error');
  var rest_success = document.getElementById('JS-REST-Success');
  var globalRoadColor = "black";
  var globalBusStopColor = "yellow";
  var checkRoad = false;
  var checkBus = true;
  const roadColor = document.querySelector('.JS-roadColor');
  const busStopColor = document.querySelector('.JS-busStopColor');
  const lightMode = document.querySelector('.JS-lightMode');
  const autonomousMode = document.querySelector('.JS-autonomousMode');
  const speed = document.querySelector('.JS-speed');
  var lightSwitch = document.getElementById('JS-lightSwitch');
  var autonomousSwitch = document.getElementById('JS-autonomousSwitch');
  function updateStatus(status) {
    // Update the HTML elements with the status data
    roadColor.innerHTML = status.road_color;
    busStopColor.innerHTML = status.bus_stop_color;
    lightMode.innerHTML = status.light_on ? 'On' : 'Off';
    autonomousMode.innerHTML = status.autonomous_mode ? 'On' : 'Off';
    speed.innerHTML = status.speed;
    if (status.light_on) {
      lightSwitch.checked = true;
      lightMode.style.color = 'green';
    } else {
      lightSwitch.checked = false;
      lightMode.style.color = 'red';
    }
    if (status.autonomous_mode) {
      autonomousSwitch.checked = true;
      autonomousMode.style.color = 'green';
    } else {
      autonomousSwitch.checked = false;
      autonomousMode.style.color = 'red';
    }
    if (status.road_color) {
      document.getElementById(status.road_color).classList.add('JS-clrRoad-act');
      document.getElementById(status.road_color).style.borderColor = status.road_color;
      roadColor.style.color = status.road_color;
    }
    if (status.bus_stop_color) {
      let id = status.bus_stop_color + "1";
      document.getElementById(id).classList.add('JS-clrBus-act');
      document.getElementById(id).style.borderColor = status.bus_stop_color;
      busStopColor.style.color = status.bus_stop_color;
    }
  }
  function getStatus() {
    $section.attr('data-REST-Err', 0);
    $section.attr('data-REST-Success', 0);
    fetch(`${baseUrl}/status`, {
      headers: {
        Authorization: `Basic ${btoa(username + ":" + password)}`
      }
    }).then(response => response.json()).then(data => {
      updateStatus(data);
    }).catch(error => {
      $section.attr('data-REST-Err', 0);
      $section.attr('data-REST-Success', 0);
      rest_err.textContent = error.toString();
    });
  }
  function setLight(onOff) {
    $section.attr('data-REST-Err', 0);
    $section.attr('data-REST-Success', 0);
    fetch(`${baseUrl}/lights/${onOff}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(username + ":" + password)}`
      }
    }).then(response => {
      if (response.ok) {
        $section.attr('data-REST-Success', 1);
        rest_success.textContent = "Licht auf: " + onOff + "gesetzt.";
      } else {
        $section.attr('data-REST-Err', 1);
        rest_err.textContent = "Licht konnte nicht auf: " + onOff + " gesetzt werden.";
      }
    }).catch(error => {
      $section.attr('data-REST-Err', 1);
      rest_err.textContent = error.toString();
    });
  }
  function setAutonomousDrive(onOff) {
    $section.attr('data-REST-Err', 0);
    $section.attr('data-REST-Success', 0);
    fetch(`${baseUrl}/autonomousDrive/${onOff}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(username + ":" + password)}`
      }
    }).then(response => {
      if (response.ok) {
        $section.attr('data-REST-Success', 1);
        rest_success.textContent = "Autonomomes Fahren auf: " + onOff + " gesetzt.";
      } else {
        $section.attr('data-REST-Err', 1);
        rest_err.textContent = "Autonomomes Fahren konnte nicht auf: " + onOff + " gesetzt werden.";
      }
    }).catch(error => {
      $section.attr('data-REST-Err', 1);
      rest_err.textContent = error.toString();
    });
  }
  function drive(direction) {
    $section.attr('data-REST-Err', 0);
    $section.attr('data-REST-Success', 0);
    fetch(`${baseUrl}/drive/${direction}`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(username + ":" + password)}`
      }
    }).then(response => {
      if (response.ok) {
        $section.attr('data-REST-Success', 1);
        rest_success.textContent = "Es wird " + direction + " gefahren.";
      } else {
        $section.attr('data-REST-Err', 1);
        rest_err.textContent = "Es konnte nicht" + direction + " gefahren werden.";
      }
    }).catch(error => {
      $section.attr('data-REST-Err', 1);
      rest_err.textContent = error.toString();
    });
  }
  function setColors() {
    $section.attr('data-REST-Err', 0);
    $section.attr('data-REST-Success', 0);
    const colors = {
      road_color: globalRoadColor,
      bus_stop_color: globalBusStopColor
    };
    fetch(`${baseUrl}/colors`, {
      method: "POST",
      body: JSON.stringify(colors),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(username + ":" + password)}`
      }
    }).then(response => {
      if (response.ok && response.headers.get("content-type").includes("application/json")) {
        return response.json();
      } else {
        throw new Error("Fehler beim Setzen der Farben");
      }
    }).then(data => {
      $section.attr('data-REST-Success', 1);
      rest_success.textContent = "Farben gesetzt.";
    }).catch(error => {
      $section.attr('data-REST-Err', 1);
      rest_err.textContent = error.toString();
    });
  }

  // initial call to getStatus
  setColors();
  getStatus();

  // call getStatus every second
  setInterval(() => {
    getStatus();
  }, 2000);
  var stop = false;
  $section.on('click', '.JS-driveForwards-button', () => {
    if (!stop) {
      drive("forward");
      stop = true;
    } else {
      stop = false;
      drive("stop");
    }
  });
  $section.on('click', '.JS-driveBackwards-button', () => {
    if (!stop) {
      drive("backward");
      stop = true;
    } else {
      stop = false;
      drive("stop");
    }
  });
  lightSwitch.addEventListener("change", () => {
    if (lightSwitch.checked) {
      setLight('on');
    } else {
      setLight('off');
    }
  });
  autonomousSwitch.addEventListener("change", () => {
    if (autonomousSwitch.checked) {
      setAutonomousDrive('on');
    } else {
      setAutonomousDrive('off');
    }
  });
  const dropdownItems = document.querySelectorAll('.EBIL-section__dropdown-item');
  let selected = null;
  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      if (!checkRoad) {
        document.getElementById('black').classList.remove('JS-clrRoad-act');
        checkRoad = true;
      }
      if (selected) {
        selected.classList.remove('JS-clrRoad-act');
      }
      item.classList.add('JS-clrRoad-act');
      item.style.borderColor = item.id;
      selected = item;
      globalRoadColor = item.id;
      setColors();
    });
  });
  const dropdownBusItems = document.querySelectorAll('.EBIL-section__dropdown-bus-item');
  let selectedv2 = null;
  dropdownBusItems.forEach(item => {
    if (!checkBus) {
      document.getElementById('yellow1').classList.remove('JS-clrBus-act');
      checkBus = true;
    }
    item.addEventListener('click', () => {
      if (selectedv2) {
        selectedv2.classList.remove('JS-clrBus-act');
      }
      item.classList.add('JS-clrBus-act');
      let clr = item.id.toString();
      clr = clr.substring(0, clr.length - 1);
      console.log(clr);
      item.style.borderColor = clr;
      selectedv2 = item;
      globalBusStopColor = clr;
      setColors();
    });
  });
}

/***/ })

},[["./source/js/entries/sections/admin.js","webpack--runtime","vendor--cash-dom","tk-internal-functions","vendor--flatpickr"]]]);