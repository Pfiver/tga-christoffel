var ScriptBundle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(5);

var _stringify2 = _interopRequireDefault(_stringify);

exports.show = show;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var yql = "http://query.yahooapis.com/v1/public/yql";
var yql_urls_query = function yql_urls_query(urls) {
    return "q=" + encodeURIComponent("select * from html where url in (" + urls.map(_stringify2.default) + ")");
};

var dates = ["2017-05", "2017-07", "2017-09", "2017-11", "2018-01", "2018-03"];

var savognin_calendar = "http://shop.savognin.ch/Savognin/ukv/ajax/calendar/TDS00020010019636959?date=";

function show(section) {

    if (section.childElementCount > 0) {
        return;
    }

    var calendar_urls = dates.map(function (date) {
        return savognin_calendar + date;
    });
    var query_url = yql + "?" + yql_urls_query(calendar_urls);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var div = void 0;
            var results = getElementsByXpath(this.responseXML, "//query/results/body");
            for (var result = results.iterateNext(); result; result = results.iterateNext()) {
                div = document.createElement("div");
                div.setAttribute("class", "tt-cal-legend-hide");
                div.innerHTML += result.innerHTML;
                section.appendChild(div);
            }
            div.removeAttribute("class");
        }
    };

    // request.open('GET', query_url, true);
    request.open('GET', "calendar-data.xml", true);
    request.send(null);
}

function getElementsByXpath(doc, expr) {
    return doc.evaluate(expr, doc, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(3);

__webpack_require__(0);

__webpack_require__(4);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// http://purecss.io/layouts/tucked-menu-vertical/

window.addEventListener("load", function () {

    var menu = document.getElementById('menu');

    document.getElementById('toggle').addEventListener('click', toggleMenu);
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', closeMenu);

    function toggleMenu() {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            setTimeout(toggleHorizontal, 500);
        } else {
            toggleHorizontal();
        }
        menu.classList.toggle('open');
        document.getElementById('toggle').classList.toggle('x');
        localStorage.setItem('menu', menu.classList.contains('open') ? 'open' : 'closed');
    }

    function toggleHorizontal() {
        (toggleHorizontal = function toggleHorizontal() {
            Array.prototype.forEach.call(document.getElementById('menu').querySelectorAll('.tucked-vertical-menu-can-transform'), function (el) {
                el.classList.toggle('pure-menu-horizontal');
            });
        })();
        initStyle();
    }

    function closeMenu() {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    var style = document.createElement('style');
    style.type = 'text/css';
    document.querySelector('head').appendChild(style);
    function initStyle() {
        var h = parseInt(window.getComputedStyle(menu.firstElementChild.firstElementChild.firstElementChild, null).getPropertyValue('padding-top'), 10);
        var ch = menu.firstElementChild.firstElementChild.firstElementChild.clientHeight;
        var nh = (ch - h) * 7;
        style.appendChild(document.createTextNode('.tucked-vertical-menu-wrapper.open {height:' + nh + 'px;}'));
    }
    initStyle();

    if (localStorage.getItem('menu') === 'open') {
        // http://stackoverflow.com/a/6850319
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
        if (width > 768) {
            localStorage.setItem('menu', 'closed');
        } else {
            toggleMenu();
        }
    }
    setTimeout(function () {
        menu.classList.add('animated');
    }, 0);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _calendar = __webpack_require__(0);

var calendar = _interopRequireWildcard(_calendar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var current_link = void 0,
    current_section = void 0;

(window.onpopstate = function (event) {

    var hash = event.state || "#";

    if (current_link) {
        current_link.classList.remove("target");
    }
    current_link = document.querySelector("#menu [href=\"" + hash + "\"]");
    current_link.classList.add("target");

    if (current_section) {
        current_section.classList.remove("current");
    }
    current_section = document.getElementById(hash.substring(1) || "index");
    current_section.classList.add("current");

    if (hash === '#belegungskalender') {
        calendar.show(current_section);
    }
})({ state: window.location.hash === "" ? "#" : window.location.hash });

document.getElementById("center").classList.add("page-by-page");

[].forEach.call(document.querySelectorAll("#menu a"), function (a) {
    return a.onclick = a.onkeyup = function (event) {
        if (event.type === "click" || event.type === "keyup" && event.which === 13) {
            var hash = event.currentTarget.getAttribute("href");
            window.history.pushState(hash, hash, hash);
            window.onpopstate({ state: hash });
        }
        return false;
    };
});

if (location.hash) {
    window.setTimeout(function () {
        window.scrollTo(0, 0);
    }, 0);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(6), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var core  = __webpack_require__(7)
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ })
/******/ ]);
//# sourceMappingURL=target.js.map