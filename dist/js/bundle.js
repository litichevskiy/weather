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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(6);
var isBuffer = __webpack_require__(18);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var instance = void 0;

module.exports = function () {
    function PubSub() {
        _classCallCheck(this, PubSub);

        if (instance) return instance;
        this.storage = {};
        instance = this;
    }

    _createClass(PubSub, [{
        key: "subscribe",
        value: function subscribe(eventName, func) {
            if (!this.storage.hasOwnProperty(eventName)) {
                this.storage[eventName] = [];
            }

            this.storage[eventName].push(func);
        }
    }, {
        key: "publish",
        value: function publish(eventName, data) {
            (this.storage[eventName] || []).forEach(function (func) {
                func(data);
            });
        }
    }, {
        key: "unSubscribe",
        value: function unSubscribe(eventName, func) {
            var index = this.storage[eventName].indexOf(func);
            if (index > -1) {
                this.storage[eventName].splice(index, 1);
            };
        }
    }]);

    return PubSub;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CLASSNAME = 'defaultBtn';
var DEFAULT_FILL = '#FFF';
var DEFAULT_WIDTH = '23px';
var DEFAULT_HEIGHT = '23px';

var buttons = {
  plus: '<svg\n          xmlns="http://www.w3.org/2000/svg"\n          viewBox="0 0 512 512"\n          x="0px"\n          y="0px"\n          fill=' + DEFAULT_FILL + '\n          height=' + DEFAULT_HEIGHT + '\n          width=' + DEFAULT_WIDTH + '>\n          <path d="M492,236H276V20c0-11.046-8.954-20-20-20c-11.046,0-20,8.954-20,20v216H20c-11.046,0-20,8.954-20,20s8.954,20,20,20h216    v216c0,11.046,8.954,20,20,20s20-8.954,20-20V276h216c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>\n        </svg>',
  back: '<svg\n          xmlns="http://www.w3.org/2000/svg"\n          viewBox="0 0 240.823 240.823"\n          x="0px"\n          y="0px"\n          fill=' + DEFAULT_FILL + '\n          height=' + DEFAULT_HEIGHT + '\n          width=' + DEFAULT_WIDTH + ' >\n            <path d="M57.633,129.007L165.93,237.268c4.752,4.74,12.451,4.74,17.215,0c4.752-4.74,4.752-12.439,0-17.179\n            l-99.707-99.671l99.695-99.671c4.752-4.74,4.752-12.439,0-17.191c-4.752-4.74-12.463-4.74-17.215,0L57.621,111.816\n            C52.942,116.507,52.942,124.327,57.633,129.007z"/>\n        </svg>',
  cancel: '<svg\n            xmlns="http://www.w3.org/2000/svg"\n            viewBox="0 0 15.642 15.642"\n            x="0"\n            y="0"\n            fill="#1f1d1d"\n            height=' + DEFAULT_HEIGHT + '\n            width=' + DEFAULT_WIDTH + ' >\n              <path fill-rule="evenodd" d="M8.882,7.821l6.541-6.541c0.293-0.293,0.293-0.768,0-1.061  c-0.293-0.293-0.768-0.293-1.061,0L7.821,6.76L1.28,0.22c-0.293-0.293-0.768-0.293-1.061,0c-0.293,0.293-0.293,0.768,0,1.061  l6.541,6.541L0.22,14.362c-0.293,0.293-0.293,0.768,0,1.061c0.147,0.146,0.338,0.22,0.53,0.22s0.384-0.073,0.53-0.22l6.541-6.541  l6.541,6.541c0.147,0.146,0.338,0.22,0.53,0.22c0.192,0,0.384-0.073,0.53-0.22c0.293-0.293,0.293-0.768,0-1.061L8.882,7.821z"/>\n          </svg>',
  refresh: '<svg\n              xmlns="http://www.w3.org/2000/svg"\n              viewBox="0 0 322.447 322.447"\n              x="0px"\n              y="0px"\n              fill=' + DEFAULT_FILL + '\n              height=' + DEFAULT_HEIGHT + '\n              width=' + DEFAULT_WIDTH + ' >\n                <path d="M321.832,230.327c-2.133-6.565-9.184-10.154-15.75-8.025l-16.254,5.281C299.785,206.991,305,184.347,305,161.224   c0-84.089-68.41-152.5-152.5-152.5C68.411,8.724,0,77.135,0,161.224s68.411,152.5,152.5,152.5c6.903,0,12.5-5.597,12.5-12.5   c0-6.902-5.597-12.5-12.5-12.5c-70.304,0-127.5-57.195-127.5-127.5c0-70.304,57.196-127.5,127.5-127.5   c70.305,0,127.5,57.196,127.5,127.5c0,19.372-4.371,38.337-12.723,55.568l-5.553-17.096c-2.133-6.564-9.186-10.156-15.75-8.025   c-6.566,2.134-10.16,9.186-8.027,15.751l14.74,45.368c1.715,5.283,6.615,8.642,11.885,8.642c1.279,0,2.582-0.198,3.865-0.614   l45.369-14.738C320.371,243.946,323.965,236.895,321.832,230.327z"/>\n            </svg>',
  settings: '<svg\n              xmlns="http://www.w3.org/2000/svg"\n              x="0px"\n              y="0px"\n              viewBox="0 0 369.793 369.792"\n              fill=' + DEFAULT_FILL + '\n              height=' + DEFAULT_HEIGHT + '\n              width=' + DEFAULT_WIDTH + '>\n                <path d="M320.83,140.434l-1.759-0.627l-6.87-16.399l0.745-1.685c20.812-47.201,19.377-48.609,15.925-52.031L301.11,42.61     c-1.135-1.126-3.128-1.918-4.846-1.918c-1.562,0-6.293,0-47.294,18.57L247.326,60l-16.916-6.812l-0.679-1.684     C210.45,3.762,208.475,3.762,203.677,3.762h-39.205c-4.78,0-6.957,0-24.836,47.825l-0.673,1.741l-16.828,6.86l-1.609-0.669     C92.774,47.819,76.57,41.886,72.346,41.886c-1.714,0-3.714,0.769-4.854,1.892l-27.787,27.16     c-3.525,3.477-4.987,4.933,16.915,51.149l0.805,1.714l-6.881,16.381l-1.684,0.651C0,159.715,0,161.556,0,166.474v38.418     c0,4.931,0,6.979,48.957,24.524l1.75,0.618l6.882,16.333l-0.739,1.669c-20.812,47.223-19.492,48.501-15.949,52.025L68.62,327.18     c1.162,1.117,3.173,1.915,4.888,1.915c1.552,0,6.272,0,47.3-18.561l1.643-0.769l16.927,6.846l0.658,1.693     c19.293,47.726,21.275,47.726,26.076,47.726h39.217c4.924,0,6.966,0,24.859-47.857l0.667-1.742l16.855-6.814l1.604,0.654     c27.729,11.733,43.925,17.654,48.122,17.654c1.699,0,3.717-0.745,4.876-1.893l27.832-27.219     c3.501-3.495,4.96-4.924-16.981-51.096l-0.816-1.734l6.869-16.31l1.64-0.643c48.938-18.981,48.938-20.831,48.938-25.755v-38.395     C369.793,159.95,369.793,157.914,320.83,140.434z M184.896,247.203c-35.038,0-63.542-27.959-63.542-62.3     c0-34.342,28.505-62.264,63.542-62.264c35.023,0,63.522,27.928,63.522,62.264C248.419,219.238,219.92,247.203,184.896,247.203z" fill="#FFFFFF"/>\n            </svg>',
  selectedLocation: '<svg\n                      xmlns="http://www.w3.org/2000/svg"\n                      viewBox="0 0 55.757 55.757"\n                      x="0px"\n                      y="0px"\n                      fill=' + DEFAULT_FILL + '\n                      height=' + DEFAULT_HEIGHT + '\n                      width=' + DEFAULT_WIDTH + '>\n                        <path d="M38.055,29.757c-7.168,0-13,5.832-13,13s5.832,13,13,13s13-5.832,13-13S45.224,29.757,38.055,29.757z M38.055,53.757   c-6.065,0-11-4.935-11-11s4.935-11,11-11s11,4.935,11,11S44.121,53.757,38.055,53.757z"/>\n                        <path d="M43.234,37.186l-5.596,8.04l-3.949-3.241c-0.427-0.352-1.056-0.288-1.407,0.138c-0.351,0.427-0.289,1.058,0.139,1.407   l4.786,3.929c0.18,0.148,0.404,0.228,0.634,0.228c0.045,0,0.091-0.003,0.137-0.01c0.276-0.038,0.524-0.19,0.684-0.419l6.214-8.929   c0.315-0.453,0.204-1.076-0.25-1.392C44.172,36.618,43.55,36.731,43.234,37.186z"/>\n                        <path d="M38.702,26.757c1.129,0,2.23,0.121,3.294,0.345c2.336-7.301,0.713-16.215-4.557-21.484C33.816,1.995,29.001,0,23.879,0   c-5.123,0-9.938,1.995-13.56,5.617c-6.703,6.702-7.536,19.312-1.804,26.952l15.363,22.188l1.85-2.672   c-1.896-2.63-3.027-5.846-3.027-9.328C22.702,33.935,29.879,26.757,38.702,26.757z M17.055,19c0-3.859,3.141-7,7-7s7,3.141,7,7   s-3.141,7-7,7S17.055,22.859,17.055,19z"/>\n                    </svg>'
};

var ButtonImg = function () {
  function ButtonImg(data) {
    _classCallCheck(this, ButtonImg);

    this.btn = this.createButton(data);
    this.btn.addEventListener('click', data.handlerClick);
    data.parent.appendChild(this.btn);
  }

  _createClass(ButtonImg, [{
    key: 'createButton',
    value: function createButton(conf) {
      var btn = document.createElement('button');
      btn.className = conf.className + ' ' + DEFAULT_CLASSNAME;
      if (conf.title) btn.setAttribute('title', conf.title);

      btn.innerHTML = buttons[conf.name];

      return btn;
    }
  }]);

  return ButtonImg;
}();

;

module.exports = ButtonImg;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LAST_UPDATE_TIME = 1800000; // ((1000 * 60) * 30) 30 min in ms
var pubsub = new (__webpack_require__(1))();
var serverApi = __webpack_require__(15);
var storage = __webpack_require__(36);
var units = { distance: "mi", pressure: "in", speed: "mph", temperature: "F" };
var errorMessages = {
  unknow: function unknow() {
    return 'Oops! \n Something went wrong. \n Please try again';
  },
  unknowCiti: function unknowCiti(siti) {
    return 'Weather for "' + siti + '" is not available';
  },
  weatherAdded: function weatherAdded(siti) {
    return 'Weather for "' + siti + '" already exists';
  },
  offline: function offline() {
    return 'Connection state: \n offline';
  }
};

var store = {
  settings: { temperature: 'c', speed: 'km', timeFormat: '24' },
  isShowBlockSearch: false,
  listSities: [],
  memoryCities: {},
  weatherFor: [],
  notFound: false,
  onlineStatus: navigator.onLine || window.navigator.onLine,
  isCardWeather: undefined,
  currentCitiId: undefined,
  lastUpdateTime: undefined,
  invisibilityTime: 0,

  addNewCiti: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(link, name, geonameid) {
      var city, weather;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              city = void 0, weather = void 0;
              _context.prev = 1;

              name = name.split(',');
              name = name[0] + ',' + (name[2] || name[1]);
              _context.next = 6;
              return serverApi.getWeather(name);

            case 6:
              weather = _context.sent;

              if (weather) {
                _context.next = 9;
                break;
              }

              throw new Error();

            case 9:
              weather = weather.data;
              weather._name = name;
              weather.geonameid = geonameid;
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](1);

              console.error(_context.t0);
              weather = false;

            case 18:
              return _context.abrupt('return', weather);

            case 19:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 14]]);
    }));

    function addNewCiti(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return addNewCiti;
  }(),
  getWeatherForCity: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var weatherList, response, itemWeather;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              weatherList = void 0, response = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return storage.getStorage();

            case 4:
              weatherList = _context2.sent;

              if (weatherList) {
                _context2.next = 7;
                break;
              }

              throw new Error();

            case 7:
              weatherList = weatherList.listWeather;

              itemWeather = getItemWeatherByKey(weatherList, 'id', this.currentCitiId);
              _context2.next = 11;
              return serverApi.getWeather(itemWeather._name);

            case 11:
              response = _context2.sent;

              if (response) {
                _context2.next = 14;
                break;
              }

              throw new Error();

            case 14:

              response = response.data;
              response.id = itemWeather.id;
              response.geonameid = itemWeather.geonameid;
              response._name = itemWeather._name;

              _context2.next = 24;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2['catch'](1);

              console.error(_context2.t0);
              response = false;

            case 24:
              return _context2.abrupt('return', response);

            case 25:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 20]]);
    }));

    function getWeatherForCity() {
      return _ref2.apply(this, arguments);
    }

    return getWeatherForCity;
  }(),
  setWeatherCard: function setWeatherCard(response, num) {
    var _name = response._name,
        location = response.location,
        geonameid = response.geonameid;
    var _response$current_obs = response.current_observation,
        astronomy = _response$current_obs.astronomy,
        atmosphere = _response$current_obs.atmosphere,
        wind = _response$current_obs.wind,
        localTime = _response$current_obs.localTime;

    var condition = response.current_observation.condition;
    var id = num || createId();
    var _updated = Date.now();
    var lastUpdate = new Date(response.current_observation.pubDate * 1000); //1000 because pubDate in seconds
    var forecast = response.forecasts.splice(0, 6);
    return {
      units: units,
      astronomy: astronomy, atmosphere: atmosphere,
      item: { condition: condition, forecast: forecast },
      location: location, wind: wind, localTime: localTime,
      lastUpdate: lastUpdate, id: id, geonameid: geonameid, _name: _name, _updated: _updated
    };
  },
  getCitiesBySubstring: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(substring) {
      var response, list;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (substring) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt('return', console.error('substring can not be empty'));

            case 2:
              response = void 0, list = void 0;
              _context3.prev = 3;
              _context3.next = 6;
              return serverApi.getCitiesBySubstring(substring);

            case 6:
              response = _context3.sent;

              if (response) {
                _context3.next = 9;
                break;
              }

              throw new Error();

            case 9:
              list = response._embedded['city:search-results'];
              if (response.count > 0) this.memoryCities[substring] = list;
              _context3.next = 16;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3['catch'](3);

              console.error(_context3.t0);

            case 16:
              return _context3.abrupt('return', list);

            case 17:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[3, 13]]);
    }));

    function getCitiesBySubstring(_x4) {
      return _ref3.apply(this, arguments);
    }

    return getCitiesBySubstring;
  }(),
  showHidePulsing: function showHidePulsing(bol) {
    if (bol) {
      document.querySelector('.pulsingContainer').style.display = 'none';
      this.isCardWeather = true;
    } else {
      document.querySelector('.pulsingContainer').style.display = 'block';
      this.isCardWeather = false;
    }
  },
  init: function init() {
    var _this = this;

    document.addEventListener('visibilitychange', function () {
      if (!document.hidden) {
        if (Date.now() - _this.invisibilityTime > LAST_UPDATE_TIME) {
          _this.updateWeather();
        }
      } else _this.invisibilityTime = Date.now();
    }, false);

    window.addEventListener('online', function () {
      _this.onlineStatus = true;
    });

    window.addEventListener('offline', function () {
      _this.onlineStatus = false;
      _this.listSities = [];
      _this.memoryCities = {};
      pubsub.publish('create-list-cityes', _this.listSities);
      pubsub.publish('show-message', { message: errorMessages.offline() });
    });

    pubsub.subscribe('clicked-close-block-search', function () {
      _this.isShowBlockSearch = !_this.isShowBlockSearch;
      pubsub.publish('hide-block-search');
      pubsub.publish('disabled-cityes-not-found');
      pubsub.publish('create-list-cityes', []);
      _this.memoryCities = {};
    });

    pubsub.subscribe('add-card-weather', function () {
      _this.isShowBlockSearch = !_this.isShowBlockSearch;
      pubsub.publish('show-block-search');
      if (!_this.isCardWeather) _this.showHidePulsing(true);
    });

    pubsub.subscribe('new-substring-on-search-cityes', function (data) {
      if (!_this.onlineStatus) return showMessage('offline');
      pubsub.publish('disabled-cityes-not-found');
      _this.notFound = false;
      var substring = data.key;
      if (!substring) pubsub.publish('create-list-cityes', []);else if (_this.memoryCities[substring]) {
        _this.listSities = _this.memoryCities[substring];
        pubsub.publish('create-list-cityes', _this.listSities);
      } else {
        _this.listSities = [];
        pubsub.publish('create-list-cityes', _this.listSities);
        pubsub.publish('start-load-list-sities');
        _this.getCitiesBySubstring(substring).then(function (response) {
          pubsub.publish('stop-load-list-sities');
          if (!response) {
            pubsub.publish('hide-block-search');
            pubsub.publish('show-message', { message: errorMessages.unknow() });
          } else if (response.length > 0) {
            _this.listSities = response;
            pubsub.publish('create-list-cityes', _this.listSities);
          } else if (response.length < 1) {
            pubsub.publish('enabled-cityes-not-found');
            _this.notFound = true;
          }
        });
      }
    });

    pubsub.subscribe('selected-city', function (data) {
      if (_this.notFound) return;
      _this.memoryCities = {};
      var selectedSiti = _this.listSities[+data.index];
      var link = selectedSiti['_links']['city:item']['href'];
      var geoId = getGeonameId(link);
      var fullName = selectedSiti['matching_full_name'];
      _this.listSities = [];
      pubsub.publish('hide-block-search');
      pubsub.publish('create-list-cityes', _this.listSities);
      if (_this.weatherFor.includes(geoId)) {
        pubsub.publish('show-message', { message: errorMessages.weatherAdded(fullName) });
        return;
      }
      pubsub.publish('start-load-card-weather');
      _this.addNewCiti(link, fullName, geoId).then(function (response) {
        pubsub.publish('end-load-card-weather');
        if (!response) return showMessage('unknow');
        if (!response.current_observation) {
          showMessage('unknowCiti', response._name);
          pubsub.publish('show-block-search');
          if (_this.currentCitiId) _this.setNewCity(_this.currentCitiId);
        } else {
          var weatherCard = _this.setWeatherCard(response);
          storage.setItem(weatherCard).then(function (response) {
            if (!response) showMessage('unknow');else {
              _this.lastUpdateTime = weatherCard._updated;
              _this.weatherFor.push(geoId);
              pubsub.publish('create-card-weater', weatherCard);
              pubsub.publish('create-list-saved-sities', [weatherCard]);
              _this.changeCurrentCity(weatherCard.id);
            }
          });
        }
      });
    });

    pubsub.subscribe('update-weather-card', function () {
      _this.updateWeather();
    });

    pubsub.subscribe('input-searh-cleared', function () {
      _this.listSities = [];
      pubsub.publish('create-list-cityes', _this.listSities);
    });

    pubsub.subscribe('delete-card', function (data) {
      var id = data.id;
      if (typeof id !== 'number') return console.error('id must be a number');
      storage.deleteItem(id).then(function (response) {
        if (!response) showMessage('unknow');else {
          var card = response[0];
          if (card.id === _this.currentCitiId) {
            _this.currentCitiId = undefined;
            _this.lastUpdateTime = undefined;
            pubsub.publish('delete-weather-card');
          }
          var index = _this.weatherFor.indexOf(card.geonameid);
          if (index < 0) console.error('non-existent geographical name ' + card);else {
            _this.weatherFor.splice(index, 1);
            if (!_this.weatherFor.length) pubsub.publish('hide-saved-cities');
          }
        }
      });
    });

    pubsub.subscribe('clicked-open-settings', function () {
      pubsub.publish('open-settings');
    });

    pubsub.subscribe('new-settings', function (data) {
      if (!_this.settings[data.key]) throw new Error(data.key + ' unknow value');
      storage.setSettings(data).then(function (response) {
        var _loop = function _loop(key) {
          if (_this.settings[key] !== response.settings[key]) {
            _this.settings[key] = response.settings[key];
            response.listWeather.some(function (item) {
              if (item.id === _this.currentCitiId) {
                pubsub.publish('update-units-' + key, [item]);
                return true;
              } else return false;
            });
          }
        };

        for (var key in response.settings) {
          _loop(key);
        }
      });
    });

    pubsub.subscribe('clicked-saved-cities', function () {
      pubsub.publish('show-saved-cities');
    });

    pubsub.subscribe('change-current-city', function (data) {
      var id = data.id;

      if (!id) {
        console.error('unknow id ' + id);
        showMessage('unknow');
      }
      if (_this.currentCitiId === id) return;
      _this.setNewCity(id);
    });

    pubsub.subscribe('saved-cityes-closed', function () {
      if (_this.currentCitiId) return;
      storage.getStorage().then(function (response) {
        var city = response.listWeather[0];
        if (city) _this.setNewCity(city.id);
      });
    });
  },
  setNewCity: function setNewCity(id) {
    var _this2 = this;

    storage.setCurrentSity(id).then(function (response) {
      if (!response) showMessage('unknow');
      _this2.currentCitiId = response.id;
      _this2.lastUpdateTime = response.city._updated;
      pubsub.publish('create-card-weater', response.city);
      var isUpdate = isTimeToUpdate(_this2.lastUpdateTime);
      if (isUpdate) _this2.updateWeather();
    });
  },
  updateWeather: function updateWeather() {
    var _this3 = this;

    if (!this.onlineStatus) return showMessage('offline');
    pubsub.publish('start-updated-weather-card');
    this.getWeatherForCity().then(function (response) {
      if (!response) {
        pubsub.publish('end-updated-weather-card');
        return showMessage('unknow');
      } else {
        response = _this3.setWeatherCard(response, response.id);
        storage.updateItemWeather(response).then(function (response) {
          if (!response) return showMessage('unknow');
          _this3.lastUpdateTime = response._updated;
          pubsub.publish('update-card-weater', response);
        });
        pubsub.publish('end-updated-weather-card');
      }
    });
  },
  changeCurrentCity: function changeCurrentCity(id) {
    var _this4 = this;

    storage.setCurrentSity(id).then(function (response) {
      if (!response) showMessage('unknow');
      _this4.currentCitiId = response.id;
    });
  },
  initApp: function initApp() {
    var _this5 = this;

    storage.init(this.settings).then(function (response) {
      var settings = response.settings,
          listWeather = response.listWeather;


      _this5.settings = settings;
      _this5.weatherFor = listWeather.map(function (item) {
        return item.geonameid;
      });
      _this5.isCardWeather = listWeather.length > 0 ? true : false;
      _this5.showHidePulsing(_this5.isCardWeather);

      if (response.currentSity) _this5.currentCitiId = response.currentSity;
      if (listWeather.length > 0) {

        pubsub.publish('create-list-saved-sities', listWeather);
        var itemWeather = getItemWeatherByKey(listWeather, 'id', _this5.currentCitiId);
        _this5.lastUpdateTime = itemWeather._updated;
        pubsub.publish('create-card-weater', itemWeather);
        var isUpdate = isTimeToUpdate(_this5.lastUpdateTime);
        if (isUpdate) _this5.updateWeather();
      }
      pubsub.publish('set-current-settings', { settings: settings });
    });
  }
};

store.init();

var showMessage = function showMessage(key, message) {
  if (message) pubsub.publish('show-message', { message: errorMessages[key](message) });else pubsub.publish('show-message', { message: errorMessages[key]() });
};
var createId = function createId() {
  return Date.now();
};

var getGeonameId = function getGeonameId(str) {
  return str.match(/geonameid:(\d{1,})\//)[1];
};

var getItemWeatherByKey = function getItemWeatherByKey(list, key, id) {
  return list.reduce(function (itemWeather, item) {
    if (item[key] === id) itemWeather = item;
    return itemWeather;
  }, {});
};

var isTimeToUpdate = function isTimeToUpdate(ms) {
  return Date.now() - ms > LAST_UPDATE_TIME;
};

module.exports = store;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(21);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(7);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(7);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function getParentNode(target, tagName) {
    if (!tagName) return;

    while (target.tagName) {
        if (target.tagName === tagName) return target;else target = target.parentElement;
    }
};

module.exports = getParentNode;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(22);
var buildURL = __webpack_require__(24);
var parseHeaders = __webpack_require__(25);
var isURLSameOrigin = __webpack_require__(26);
var createError = __webpack_require__(8);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(27);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(28);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(23);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preloader = function () {
  function Preloader(data) {
    _classCallCheck(this, Preloader);

    this.preloader = this.createLoader();
    data.parent.appendChild(this.preloader);
  }

  _createClass(Preloader, [{
    key: 'disabled',
    value: function disabled() {
      this.preloader.hidden = true;
    }
  }, {
    key: 'enabled',
    value: function enabled() {
      this.preloader.hidden = false;
    }
  }, {
    key: 'deletePreloader',
    value: function deletePreloader() {
      this.preloader = null;
    }
  }, {
    key: 'createLoader',
    value: function createLoader() {
      var div = document.createElement('div');
      div.className = 'preloader';
      div.setAttribute('hidden', true);
      div.innerHTML = '<svg\n      class="circle"\n      xmlns="http://www.w3.org/2000/svg"\n      width="35px"\n      height="35px"\n      viewBox="0 0 516.727 516.727" >\n      <g>\n          <path fill="#c9cce6" d="M516.727,266.696c-0.665-34.825-8.221-69.54-22.175-101.283c-13.908-31.771-34.094-60.551-58.876-84.333   c-24.767-23.8-54.139-42.615-85.929-55.027c-31.773-12.46-65.937-18.412-99.687-17.69c-33.755,0.668-67.36,8.007-98.091,21.539   c-30.754,13.488-58.615,33.058-81.632,57.071c-23.033,24.001-41.229,52.452-53.222,83.229C5.077,200.962-0.66,234.013,0.06,266.696   c0.67,32.688,7.793,65.182,20.903,94.899c13.067,29.738,32.019,56.681,55.266,78.931c23.234,22.268,50.766,39.846,80.528,51.417   c29.749,11.616,61.69,17.136,93.303,16.419c31.62-0.671,63.001-7.58,91.707-20.268c28.724-12.646,54.747-30.979,76.231-53.461   c21.503-22.469,38.461-49.08,49.611-77.827c6.79-17.427,11.396-35.624,13.824-54.062c0.649,0.037,1.302,0.063,1.96,0.063   c18.409,0,33.333-14.923,33.333-33.333c0-0.936-0.049-1.861-0.124-2.777L516.727,266.696L516.727,266.696z M463.762,355.21   c-12.226,27.71-29.94,52.812-51.655,73.532c-21.703,20.732-47.396,37.076-75.127,47.807c-27.724,10.77-57.443,15.859-86.919,15.146   c-29.481-0.677-58.644-7.154-85.323-18.997c-26.692-11.806-50.877-28.901-70.83-49.849c-19.968-20.938-35.691-45.711-46.001-72.427   c-10.349-26.712-15.223-55.321-14.512-83.728c0.678-28.413,6.941-56.465,18.361-82.131c11.384-25.677,27.863-48.943,48.045-68.13   c20.172-19.202,44.026-34.307,69.726-44.195c25.697-9.928,53.195-14.587,80.534-13.877c27.343,0.68,54.286,6.728,78.939,17.726   c24.662,10.963,47.008,26.824,65.429,46.241c18.436,19.405,32.922,42.341,42.391,67.025c9.504,24.684,13.948,51.072,13.241,77.342   h0.125c-0.076,0.916-0.125,1.841-0.125,2.777c0,17.193,13.018,31.34,29.732,33.137C476.551,320.747,471.184,338.453,463.762,355.21   z"/>\n      </g>\n    </svg>';
      return div;
    }
  }]);

  return Preloader;
}();

module.exports = Preloader;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();
var INCLINE = 60; //px

var Swipedetect = function () {
  function Swipedetect(data) {
    _classCallCheck(this, Swipedetect);

    this.container = data.container;
    this.init(data.swipedMove, data.swipedEnd);
  }

  _createClass(Swipedetect, [{
    key: 'init',
    value: function init(swipedMove, swipedEnd) {
      var startX = 0;
      var startY = 0;
      var deltaY = 0;
      var deltaX = 0;
      var touches = void 0;
      this.container.addEventListener('touchstart', function (event) {
        touches = event.changedTouches[0];
        startX = touches.pageX;
        startY = touches.pageY;
      }, { passive: true });

      this.container.addEventListener('touchmove', function (event) {
        touches = event.changedTouches[0];
        deltaY = touches.pageY - startY;
        deltaX = touches.pageX - startX;
        deltaY = -deltaY;

        if (deltaY > 100) return;
        if (touches.pageX > startX) swipedMove('right', deltaX, event.target);else swipedMove('left', deltaX, event.target);
      }, { passive: true });

      this.container.addEventListener('touchend', function (event) {
        touches = event.changedTouches[0];
        deltaX = touches.pageX - startX;
        swipedEnd(event.target, deltaX);
      });
    }
  }]);

  return Swipedetect;
}();

;

module.exports = Swipedetect;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
module.exports = __webpack_require__(51);


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(3);
var WeatherCard = __webpack_require__(39);
var Header = __webpack_require__(42);
var BlockSearch = __webpack_require__(43);
var ListSities = __webpack_require__(45);
var Message = __webpack_require__(47);
var NotFound = __webpack_require__(48);
var Menu = __webpack_require__(49);
var SavedCities = __webpack_require__(50);

new BlockSearch({ container: document.querySelector('.blockSearch') });
new Header({ container: document.querySelector('.header') });
new ListSities({ container: document.querySelector('.listSities') });
new Message({ container: document.querySelector('.containerMessage') });
new WeatherCard({ container: document.querySelector('.listCardWeater') });
new NotFound({
  container: document.querySelector('.containerNotFound'),
  eventName: 'cityes-not-found'
});

new Menu({
  container: document.querySelector('.containerMenu'),
  form: document.querySelector('.containerSettings')
});

new SavedCities({ container: document.querySelector('.blockSavedCities') });

store.initApp();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').then(function (response) {
    response.update();
  }).catch(function (error) {
    return console.error(error);
  });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getServerData = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return axios.get(url);

          case 2:
            return _context4.abrupt('return', _context4.sent);

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getServerData(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = __webpack_require__(16);
var LIMIT_CITIES_BY_SUBSTRING = 18; // max - 25

var serverApi = {
  getCitiesBySubstring: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(substring) {
      var response, url;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              response = void 0;
              url = 'https://api.teleport.org/api/cities/?search=' + substring + '&limit=' + LIMIT_CITIES_BY_SUBSTRING;
              _context.prev = 2;
              _context.next = 5;
              return getServerData(url);

            case 5:
              response = _context.sent;

              if (!(response.status !== 200)) {
                _context.next = 8;
                break;
              }

              throw new Error('unknow error');

            case 8:
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context['catch'](2);

              console.error(_context.t0);
              response = false;

            case 14:
              return _context.abrupt('return', response.data || false);

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 10]]);
    }));

    function getCitiesBySubstring(_x) {
      return _ref.apply(this, arguments);
    }

    return getCitiesBySubstring;
  }(),
  getCity: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(link) {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              response = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return getServerData(link);

            case 4:
              response = _context2.sent;

              if (!(response.status !== 200)) {
                _context2.next = 7;
                break;
              }

              throw new Error('unknow error');

            case 7:
              _context2.next = 13;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](1);

              console.error(_context2.t0);
              response = false;

            case 13:
              return _context2.abrupt('return', response.data || false);

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 9]]);
    }));

    function getCity(_x2) {
      return _ref2.apply(this, arguments);
    }

    return getCity;
  }(),
  getWeather: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(place) {
      var response;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              response = void 0;
              _context3.prev = 1;
              _context3.next = 4;
              return getServerData('/get-weather?location=' + place);

            case 4:
              response = _context3.sent;

              if (!(response.status !== 200)) {
                _context3.next = 7;
                break;
              }

              throw new Error('unknow error');

            case 7:
              _context3.next = 13;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](1);

              console.error(_context3.t0);
              response = false;

            case 13:
              return _context3.abrupt('return', response.data || false);

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 9]]);
    }));

    function getWeather(_x3) {
      return _ref3.apply(this, arguments);
    }

    return getWeather;
  }()
};

;

module.exports = serverApi;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(6);
var Axios = __webpack_require__(19);
var defaults = __webpack_require__(4);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(34);
axios.isCancel = __webpack_require__(9);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(35);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(4);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(29);
var dispatchRequest = __webpack_require__(30);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(8);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(31);
var isCancel = __webpack_require__(9);
var defaults = __webpack_require__(4);
var isAbsoluteURL = __webpack_require__(32);
var combineURLs = __webpack_require__(33);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var localforage = __webpack_require__(37);
var STORAGE_NAME = 'storage_weather';

module.exports = {
  setItem: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              response = void 0;
              _context.prev = 1;
              _context.next = 4;
              return this.getStorage();

            case 4:
              response = _context.sent;

              response.listWeather.push(data);
              _context.next = 8;
              return localforage.setItem(STORAGE_NAME, response);

            case 8:
              response = _context.sent;
              _context.next = 15;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](1);

              console.error(_context.t0);
              response = false;

            case 15:
              return _context.abrupt('return', response);

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 11]]);
    }));

    function setItem(_x) {
      return _ref.apply(this, arguments);
    }

    return setItem;
  }(),
  getStorage: function getStorage() {
    return localforage.getItem(STORAGE_NAME).then(function (response) {
      return response;
    }).catch(function (error) {
      return console.log(error);
    });
  },
  updateItemWeather: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(newWeather) {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              response = void 0;
              _context2.prev = 1;
              _context2.next = 4;
              return this.getStorage();

            case 4:
              response = _context2.sent;


              response.listWeather = response.listWeather.map(function (item) {
                if (item.id === newWeather.id) item = newWeather;
                return item;
              });

              _context2.next = 8;
              return localforage.setItem(STORAGE_NAME, response);

            case 8:
              response = _context2.sent;

              if (response) {
                _context2.next = 11;
                break;
              }

              throw new Error('unknown error');

            case 11:
              _context2.next = 17;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](1);

              console.error(_context2.t0);
              response = false;

            case 17:
              return _context2.abrupt('return', response ? newWeather : response);

            case 18:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 13]]);
    }));

    function updateItemWeather(_x2) {
      return _ref2.apply(this, arguments);
    }

    return updateItemWeather;
  }(),
  deleteItem: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
      var response, index, card;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              response = void 0, index = void 0, card = void 0;
              _context3.prev = 1;
              _context3.next = 4;
              return this.getStorage();

            case 4:
              response = _context3.sent;

              response.listWeather.some(function (item, i) {
                if (item.id === id) {
                  index = i;
                  return true;
                }
              });
              card = response.listWeather.splice(index, 1);
              response.currentSity = '';
              _context3.next = 10;
              return localforage.setItem(STORAGE_NAME, response);

            case 10:
              response = _context3.sent;
              _context3.next = 17;
              break;

            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3['catch'](1);

              console.log(_context3.t0);
              card = false;

            case 17:
              return _context3.abrupt('return', card);

            case 18:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[1, 13]]);
    }));

    function deleteItem(_x3) {
      return _ref3.apply(this, arguments);
    }

    return deleteItem;
  }(),
  setSettings: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
      var response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              response = void 0;
              _context4.prev = 1;
              _context4.next = 4;
              return this.getStorage();

            case 4:
              response = _context4.sent;

              response.settings[data.key] = data.value;
              _context4.next = 8;
              return localforage.setItem(STORAGE_NAME, response);

            case 8:
              response = _context4.sent;
              _context4.next = 14;
              break;

            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4['catch'](1);

              console.error(_context4.t0);

            case 14:
              return _context4.abrupt('return', response);

            case 15:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1, 11]]);
    }));

    function setSettings(_x4) {
      return _ref4.apply(this, arguments);
    }

    return setSettings;
  }(),
  setCurrentSity: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      var response, isId, city;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              response = void 0, isId = void 0, city = void 0;
              _context5.prev = 1;
              _context5.next = 4;
              return this.getStorage();

            case 4:
              response = _context5.sent;

              isId = response.listWeather.some(function (item) {
                if (item.id === id) return city = item;else return false;
              });

              if (isId) {
                _context5.next = 10;
                break;
              }

              throw new Error(id + ' unknow id');

            case 10:
              response.currentSity = id;

            case 11:
              _context5.next = 13;
              return localforage.setItem(STORAGE_NAME, response);

            case 13:
              response = _context5.sent;
              _context5.next = 20;
              break;

            case 16:
              _context5.prev = 16;
              _context5.t0 = _context5['catch'](1);

              console.log(_context5.t0);
              response = false;

            case 20:
              return _context5.abrupt('return', response ? { id: id, city: city } : false);

            case 21:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[1, 16]]);
    }));

    function setCurrentSity(_x5) {
      return _ref5.apply(this, arguments);
    }

    return setCurrentSity;
  }(),
  init: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(settings) {
      var response;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              response = void 0;
              _context6.prev = 1;
              _context6.next = 4;
              return this.getStorage();

            case 4:
              response = _context6.sent;

              if (response) {
                _context6.next = 9;
                break;
              }

              _context6.next = 8;
              return localforage.setItem(STORAGE_NAME, { settings: settings, listWeather: [], currentSity: '' });

            case 8:
              response = _context6.sent;

            case 9:
              _context6.next = 15;
              break;

            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6['catch'](1);

              console.log(_context6.t0);
              response = false;

            case 15:
              return _context6.abrupt('return', response);

            case 16:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this, [[1, 11]]);
    }));

    function init(_x6) {
      return _ref6.apply(this, arguments);
    }

    return init;
  }()
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.7.2
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support (#5572)
        // since Safari 10.1 shipped with fetch, we can use that to detect it
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

function getCallback() {
    if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
        return arguments[arguments.length - 1];
    }
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs = void 0;
var dbContexts = {};
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve, reject) {
        deferredOperation.resolve = resolve;
        deferredOperation.reject = reject;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
        return deferredOperation.promise;
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
        return deferredOperation.promise;
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {
        dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        var forage = forages[i];
        if (forage._dbInfo.db) {
            forage._dbInfo.db.close();
            forage._dbInfo.db = null;
        }
    }
    dbInfo.db = null;

    return _getOriginalConnection(dbInfo).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        // store the latest db reference
        // in case the db was upgraded
        dbInfo.db = dbContext.db = db;
        for (var i = 0; i < forages.length; i++) {
            forages[i]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback, retries) {
    if (retries === undefined) {
        retries = 1;
    }

    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
            return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                    // increase the db version, to create the new ObjectStore
                    if (dbInfo.db) {
                        dbInfo.version = dbInfo.db.version + 1;
                    }
                    // Reopen the database for upgrading.
                    return _getUpgradedConnection(dbInfo);
                }
            }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                    createTransaction(dbInfo, mode, callback, retries - 1);
                });
            })["catch"](callback);
        }

        callback(err);
    }
}

function createDbContext() {
    return {
        // Running localForages sharing a database.
        forages: [],
        // Shared database.
        db: null,
        // Database readiness (promise).
        dbReady: null,
        // Deferred operations on the database.
        deferredOperations: []
    };
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = createDbContext();
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback retuns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    var req = store.put(value, key);

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;

        var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
            var dbContext = dbContexts[options.name];
            var forages = dbContext.forages;
            dbContext.db = db;
            for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
            }
            return db;
        });

        if (!options.storeName) {
            promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.deleteDatabase(options.name);

                    req.onerror = req.onblocked = function (err) {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        reject(err);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        if (db) {
                            db.close();
                        }
                        resolve(db);
                    };
                });

                return dropDBPromise.then(function (db) {
                    dbContext.db = db;
                    for (var i = 0; i < forages.length; i++) {
                        var _forage = forages[i];
                        _advanceReadiness(_forage._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        } else {
            promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                    return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;

                db.close();
                for (var i = 0; i < forages.length; i++) {
                    var forage = forages[i];
                    forage._dbInfo.db = null;
                    forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                    var req = idb.open(options.name, newVersion);

                    req.onerror = function (err) {
                        var db = req.result;
                        db.close();
                        reject(err);
                    };

                    req.onupgradeneeded = function () {
                        var db = req.result;
                        db.deleteObjectStore(options.storeName);
                    };

                    req.onsuccess = function () {
                        var db = req.result;
                        db.close();
                        resolve(db);
                    };
                });

                return dropObjectPromise.then(function (db) {
                    dbContext.db = db;
                    for (var j = 0; j < forages.length; j++) {
                        var _forage2 = forages[j];
                        _forage2._dbInfo.db = db;
                        _advanceReadiness(_forage2._dbInfo);
                    }
                })["catch"](function (err) {
                    (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                    throw err;
                });
            });
        }
    }

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys,
    dropInstance: dropInstance
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */

function createDbTable(t, dbInfo, callback, errorCallback) {
    t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
}

// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        }, reject);
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
    t.executeSql(sqlStatement, args, callback, function (t, error) {
        if (error.code === error.SYNTAX_ERR) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                    // if the table is missing (was deleted)
                    // re-create it table and retry
                    createDbTable(t, dbInfo, function () {
                        t.executeSql(sqlStatement, args, callback, errorCallback);
                    }, errorCallback);
                } else {
                    errorCallback(t, error);
                }
            }, errorCallback);
        } else {
            errorCallback(t, error);
        }
    }, errorCallback);
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// https://www.w3.org/TR/webdatabase/#databases
// > There is no way to enumerate or delete the databases available for an origin from this API.
function getAllStoreNames(db) {
    return new Promise$1(function (resolve, reject) {
        db.transaction(function (t) {
            t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                    storeNames.push(results.rows.item(i).name);
                }

                resolve({
                    db: db,
                    storeNames: storeNames
                });
            }, function (t, error) {
                reject(error);
            });
        }, function (sqlError) {
            reject(sqlError);
        });
    });
}

function dropInstance$1(options, callback) {
    callback = getCallback.apply(this, arguments);

    var currentConfig = this.config();
    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            var db;
            if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
            } else {
                db = openDatabase(options.name, '', '', 0);
            }

            if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
            } else {
                resolve({
                    db: db,
                    storeNames: [options.storeName]
                });
            }
        }).then(function (operationInfo) {
            return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                    function dropTable(storeName) {
                        return new Promise$1(function (resolve, reject) {
                            t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                                resolve();
                            }, function (t, error) {
                                reject(error);
                            });
                        });
                    }

                    var operations = [];
                    for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                        operations.push(dropTable(operationInfo.storeNames[i]));
                    }

                    Promise$1.all(operations).then(function () {
                        resolve();
                    })["catch"](function (e) {
                        reject(e);
                    });
                }, function (sqlError) {
                    reject(sqlError);
                });
            });
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1,
    dropInstance: dropInstance$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage &&
        // in IE8 typeof localStorage.setItem === 'object'
        !!localStorage.setItem;
    } catch (e) {
        return false;
    }
}

function _getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + '/';

    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + '/';
    }
    return keyPrefix;
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

function dropInstance$2(options, callback) {
    callback = getCallback.apply(this, arguments);

    options = typeof options !== 'function' && options || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }

    var self = this;
    var promise;
    if (!options.name) {
        promise = Promise$1.reject('Invalid arguments');
    } else {
        promise = new Promise$1(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + '/');
            } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
            }
        }).then(function (keyPrefix) {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                    localStorage.removeItem(key);
                }
            }
        });
    }

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2,
    dropInstance: dropInstance$2
};

var sameValue = function sameValue(x, y) {
    return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
};

var includes = function includes(array, searchElement) {
    var len = array.length;
    var i = 0;
    while (i < len) {
        if (sameValue(array[i], searchElement)) {
            return true;
        }
        i++;
    }

    return false;
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var OptionalDriverMethods = ['dropInstance'];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var driverMethodName = driverMethods[i];

                    // when the property is there,
                    // it should be a method even when optional
                    var isRequired = !includes(OptionalDriverMethods, driverMethodName);
                    if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var configureMissingMethods = function configureMissingMethods() {
                    var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                        return function () {
                            var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                            var promise = Promise$1.reject(error);
                            executeCallback(promise, arguments[arguments.length - 1]);
                            return promise;
                        };
                    };

                    for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                        var optionalDriverMethod = OptionalDriverMethods[_i];
                        if (!driverObject[optionalDriverMethod]) {
                            driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                        }
                    }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)))

/***/ }),
/* 38 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();
var getParentNode = __webpack_require__(5);
var format = __webpack_require__(40);
var store = __webpack_require__(3);
var Preloader = __webpack_require__(11);
var CODES = __webpack_require__(41);
var INTERVAL = 60000; // 1 min in ms
var MAX_TIME_UPDATED = 2; // hours

var WeatherCard = function () {
  function WeatherCard(data) {
    _classCallCheck(this, WeatherCard);

    this.container = data.container;
    this.intervalId = undefined;
    this.updatedTimeElem;
    this.createCardWeater = this.createCardWeater.bind(this);
    this.enabledPreload = this.enabledPreload.bind(this);
    this.disabledPreload = this.disabledPreload.bind(this);
    this.updateTemperature = this.updateTemperature.bind(this);
    this.updateSpeed = this.updateSpeed.bind(this);
    this.updateTimeFormat = this.updateTimeFormat.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    pubsub.subscribe('create-card-weater', this.createCardWeater);
    pubsub.subscribe('update-card-weater', this.createCardWeater);
    pubsub.subscribe('start-load-card-weather', this.enabledPreload);
    pubsub.subscribe('end-load-card-weather', this.disabledPreload);
    pubsub.subscribe('update-units-temperature', this.updateTemperature);
    pubsub.subscribe('update-units-speed', this.updateSpeed);
    pubsub.subscribe('update-units-timeFormat', this.updateTimeFormat);
    pubsub.subscribe('delete-weather-card', this.deleteCard);

    this.preload = new Preloader({
      parent: document.querySelector('.containerCardWeater')
    });
  }

  _createClass(WeatherCard, [{
    key: 'createCardWeater',
    value: function createCardWeater(data) {
      var card = document.createElement('li');
      card.classList.add('itemCardWeather');
      card.setAttribute('data-id', data.id);
      card.innerHTML = templateCard(data);
      this.container.appendChild(card);
      this.deleteCard(true);

      this.updatedTimeElem = card.querySelector('.updatedTime .time');
      this.getLastUpdateTime();
      this.addIntervalUpdateTime();
    }
  }, {
    key: 'getLastUpdateTime',
    value: function getLastUpdateTime() {
      var time = format.convertMS(Date.now() - store.lastUpdateTime);
      if (time.hours < MAX_TIME_UPDATED) {
        if (time.minutes >= 1) {
          time = time.hours < 1 ? time.minutes + 'm ago' : time.hours + 'h ' + time.minutes + 'm ago';
        } else time = 'less than a minute ago';
      } else {
        clearInterval(this.intervalId);
        time = 'over ' + MAX_TIME_UPDATED + ' hours ago';
      }
      this.updatedTimeElem.innerHTML = time;
    }
  }, {
    key: 'addIntervalUpdateTime',
    value: function addIntervalUpdateTime() {
      var _this = this;

      this.intervalId = setInterval(function () {
        return _this.getLastUpdateTime();
      }, INTERVAL);
    }
  }, {
    key: 'deleteCard',
    value: function deleteCard(isAnimation) {
      if (this.intervalId !== undefined) clearInterval(this.intervalId);
      if (!isAnimation) this.container.innerHTML = '';
      if (this.container.children[1]) this.container.children[0].remove();
    }
  }, {
    key: 'enabledPreload',
    value: function enabledPreload() {
      this.deleteCard();
      this.preload.enabled();
    }
  }, {
    key: 'disabledPreload',
    value: function disabledPreload() {
      this.preload.disabled();
    }
  }, {
    key: 'updateTemperature',
    value: function updateTemperature(list) {
      var _this2 = this;

      var card = void 0,
          forecastList = void 0,
          forecastItems = void 0,
          todayMinMax = void 0;
      var temperature = store.settings.temperature;

      list.forEach(function (data) {
        card = _this2.container.querySelector('[data-id="' + data.id + '"]');
        forecastItems = card.querySelectorAll('.itemForecast');
        forecastList = data.item.forecast.slice(1);
        todayMinMax = data.item.forecast[0];

        card.querySelector('.temperatureToday').innerHTML = format.convertTemperature(+data.item.condition.temperature, temperature);
        card.querySelector('.minToday').innerHTML = format.convertTemperature(+todayMinMax.low, temperature);
        card.querySelector('.maxToday').innerHTML = format.convertTemperature(+todayMinMax.high, temperature);

        forecastList.forEach(function (item, index) {
          forecastItems[index].querySelector('.minT').innerHTML = format.convertTemperature(+item.low, temperature);
          forecastItems[index].querySelector('.maxT').innerHTML = format.convertTemperature(+item.high, temperature);
        });
      });
    }
  }, {
    key: 'updateSpeed',
    value: function updateSpeed(list) {
      var _this3 = this;

      var card = void 0;
      var speed = store.settings.speed;
      list.forEach(function (data) {
        card = _this3.container.querySelector('[data-id="' + data.id + '"]');
        card.querySelector('.visibility').innerHTML = format.getWindStrength(data.atmosphere.visibility, speed, '');
        card.querySelector('.wind').innerHTML = format.getWindStrength(data.wind.speed, speed, '/h');
      });
    }
  }, {
    key: 'updateTimeFormat',
    value: function updateTimeFormat(list) {
      var _this4 = this;

      var card = void 0;
      var timeFormat = store.settings.timeFormat;
      list.forEach(function (data) {
        card = _this4.container.querySelector('[data-id="' + data.id + '"]');

        card.querySelector('[data-time-update="time-update"]').innerHTML = format.getCurrentTime(data.lastUpdate, timeFormat);
        card.querySelector('.sunrise').innerHTML = format.getTimeSunriseSunset(data.astronomy.sunrise, timeFormat, 'am');
        card.querySelector('.sunset').innerHTML = format.getTimeSunriseSunset(data.astronomy.sunset, timeFormat, 'pm');
      });
    }
  }]);

  return WeatherCard;
}();

;

function getRising(num) {
  if (!num) return '';else if (num > 1) '<span>&#8595;</span>';else if (num < 2) '<span>&#8593;</span>';
};

function createForecast(list, tempFormat) {
  return list.reduce(function (previousValue, item) {
    return previousValue + ('\n      <li class="itemForecast">\n        <div class="cellForecast">\n          <div class="containerDate">\n            <time class="dateForecast">' + format.formateDateForecast(item.date * 1000) + '</time>\n          </div>\n          <span class="descriptionForecast">' + item.text + '</span>\n        </div>\n        <div class="cellForecast">\n          <img class="imgForecast" src="images/weather/' + CODES[item.code] + '.png" alt=""/>\n          <div class="containerMinMax">\n            <div class="maxTemperature">\n              <span class="minIcon monospaceNumber">&#8595;</span>\n              <span class="minT monospaceNumber">' + format.convertTemperature(+item.low, tempFormat) + '</span>\n            </div>\n            <div class="minTemperature">\n              <span class="maxIcon">&#8593;</span>\n              <span class="maxT">' + format.convertTemperature(+item.high, tempFormat) + '</span>\n            </div>\n          </div>\n        </div>\n      </li>');
  }, '');
};

function templateCard(data) {
  var location = data.location,
      item = data.item,
      atmosphere = data.atmosphere,
      wind = data.wind,
      astronomy = data.astronomy;

  var date = data.lastUpdate;
  var _store$settings = store.settings,
      temperature = _store$settings.temperature,
      speed = _store$settings.speed,
      timeFormat = _store$settings.timeFormat;

  var forecast = item.forecast.slice(1);
  var todayMinMax = item.forecast[0];
  var template = '<div class="row">\n        <div class="cell">\n        <div class="cityName">' + location.city + '</div>\n        <div class="regionName">' + location.country + ' ' + location.region + '</div>\n        <div class="containerDate">\n          <small class="content">' + format.formateToday(date) + '</small>\n          <small class="content monospaceNumber">\n            <small data-time-update="time-update">' + format.getCurrentTime(new Date(data.localTime), timeFormat) + '</small>\n            <small class="descriptionTime">( local time )</small>\n          </small>\n          <small class="updatedTime">\n            updated: <small class="time"></small>\n          </small>\n        </div>\n        <div class="blockTemperature">\n          <div class="containerTemperatureToday">\n            <div class="temperatureToday monospaceNumber">' + format.convertTemperature(+item.condition.temperature, temperature) + '</div>\n            <div class="containerMinMaxToday">\n              <div class="wrapper">\n                <small>&#8595;</small>\n                <span class="minToday monospaceNumber">' + format.convertTemperature(+todayMinMax.low, temperature) + '</span>\n              </div>\n              <div class="wrapper">\n                <small>&#8593;</small>\n                <span class="maxToday monospaceNumber">' + format.convertTemperature(+todayMinMax.high, temperature) + '</span>\n              </div>\n            </div>\n          </div>\n          <div class="condition">\n            <img class="imgToday" src="images/weather/' + CODES[item.condition.code] + '.png" alt="" />\n            <div>' + item.condition.text + '</div>\n          </div>\n        </div>\n        </div>\n        <div class="cell descriptionAtmosphere">\n          <div class="content">\n            <span class="title">humidity</span>\n            <span class="humidity monospaceNumber">' + atmosphere.humidity + '%</span>\n          </div>\n          <div class="content">\n            <span class="title">pressure</span>\n            <span class="pressure monospaceNumber">\n              ' + atmosphere.pressure + '\n              mbar ' + getRising(+atmosphere.rising) + '\n            </span>\n          </div>\n          <div class="content">\n            <span class="title">visibility</span>\n            <span class="visibility monospaceNumber">' + format.getWindStrength(atmosphere.visibility, speed, '') + '</span>\n          </div>\n          <div class="content">\n            <span class="title">wind</span>\n            <span class="wind monospaceNumber">' + format.getWindStrength(wind.speed, speed, '/h') + '</span>\n            <span class="windDirection">' + format.getDirectionWind(+wind.direction) + '</span>\n          </div>\n          <div class="content">\n            <span class="title">sunrise</span>\n            <span class="sunrise monospaceNumber">' + format.getTimeSunriseSunset(astronomy.sunrise, timeFormat, 'am') + '</span>\n          </div>\n          <div class="content">\n            <span class="title">sunset</span>\n            <span class="sunset monospaceNumber">' + format.getTimeSunriseSunset(astronomy.sunset, timeFormat, 'pm') + '</span>\n          </div>\n        </div>\n        <div class="wrapperForecast">\n          <div class="blockForecast">\n            <div class="titleForecast">Forecast</div>\n            <ul class="listForecast">\n              ' + createForecast(forecast, temperature) + '\n            </ul>\n          </div>\n        </div>\n      </div>';
  return template;
};

module.exports = WeatherCard;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var DIRECTION_WIND = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
var MILE = 0.621371; // 1 km in miles

var format = {
  getCurrentTime: function getCurrentTime(date, format) {
    var minutes = date.getMinutes();
    var hours = date.getHours();
    minutes = isAddZero(minutes);
    if (format === '24') {
      hours = isAddZero(hours);
      return hours + ':' + minutes;
    } else {
      var amPm = hours > 11 ? 'PM' : 'AM';
      if (hours > 12) hours -= 12;else if (hours === 0) hours = '12';
      return hours + ':' + minutes + ' ' + amPm;
    }
  },
  getTimeSunriseSunset: function getTimeSunriseSunset(str, format, prefix) {
    var minutes = void 0;
    var hours = void 0;
    minutes = str.match(/:(\d{1,2})/)[1];
    minutes = isAddZero(+minutes);

    if (format === '12') {
      hours = str.match(/(\d{1,2}):/)[1];
      return hours + ':' + minutes + ' ' + prefix;
    } else {
      hours = str.match(/(\d{1,2}):/)[1];
      if (prefix === 'am') hours = isAddZero(+hours);else hours = +hours + 12;
      return hours + ':' + minutes;
    }
  },
  convertTemperature: function convertTemperature(deg, prefix) {
    if (prefix === 'c') return ((deg - 32) / 1.8).toFixed(0) + ' °C';else return deg + ' °F';
  },
  getWindStrength: function getWindStrength(windSpeed, prefix, inHours) {
    if (prefix === 'km') return windSpeed + ' km' + inHours;else return (+windSpeed * MILE).toFixed(1) + ' m' + inHours;
  },
  getDirectionWind: function getDirectionWind(num) {
    var val = Math.floor(num / 22.5 + 0.5);
    return DIRECTION_WIND[val % 16];
  },
  formateToday: function formateToday(date) {
    var weekDay = DAYS[date.getDay()];
    var monthDay = date.getDate();
    var month = MONTH[date.getMonth()];
    var year = date.getFullYear();
    return weekDay + ', ' + monthDay + ' ' + month + ' ' + year;
  },
  formateDateForecast: function formateDateForecast(ms) {
    var date = new Date(ms).toString().split(' ');
    return date[0] + ' ' + date[2] + ' ' + date[1] + ' ' + date[3];
  },
  convertMS: function convertMS(ms) {
    var hours = void 0,
        minutes = void 0,
        seconds = void 0;
    seconds = Math.floor(ms / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    hours = hours % 24;

    return { hours: hours, minutes: minutes, seconds: seconds };
  }
};

function isAddZero(num) {
  return num < 10 ? '0' + num : num;
}

module.exports = format;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  0: "tornado",
  1: "wind",
  2: "tornado",
  3: "thunderstorm",
  4: "thunderstorm",
  5: "rain-and-snow",
  6: "rain-and-snow",
  7: "rain-and-snow",
  8: "freezing",
  9: "freezing",
  10: "freezing",
  11: "rain",
  12: "rain",
  13: "snow",
  14: "snow",
  15: "snow",
  16: "snow",
  17: "hail",
  18: "rain-and-snow",
  19: "fog",
  20: "fog",
  21: "fog",
  22: "fog",
  23: "wind",
  24: "wind",
  25: "freezing",
  26: "cloudy",
  27: "partly-cloudy",
  28: "partly-cloudy",
  29: "partly-cloudy",
  30: "partly-cloudy",
  31: "sunny",
  32: "sunny",
  33: "sunny",
  34: "sunny",
  35: "hail",
  36: "sunny",
  37: "thunderstorm",
  38: "thunderstorm",
  39: "rain",
  40: "rain",
  41: "rain",
  42: "snow",
  43: "snow",
  44: "not-available",
  45: "rain",
  46: "rain",
  47: "rain"
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();
var ButtonImg = __webpack_require__(2);

var Header = function () {
  function Header(data) {
    _classCallCheck(this, Header);

    this.container = data.container;
    var wrapper = this.container.querySelector('.wrapperButtons');
    this.cancelUpdated = this.cancelUpdated.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.startUpdated = this.startUpdated.bind(this);
    this.savedCities = this.savedCities.bind(this);
    pubsub.subscribe('end-updated-weather-card', this.cancelUpdated);
    pubsub.subscribe('start-updated-weather-card', this.startUpdated);
    new ButtonImg({
      parent: this.container.querySelector('.btnMenu'),
      name: 'settings',
      className: 'settings',
      title: 'Settings',
      handlerClick: this.openSettings
    });
    new ButtonImg({
      parent: wrapper,
      className: 'savedCities',
      name: 'selectedLocation',
      title: 'saved-cities',
      handlerClick: this.savedCities
    });
    this.btnUpdate = new ButtonImg({
      parent: wrapper,
      className: 'updateCard',
      name: 'refresh',
      title: 'Update weather',
      handlerClick: this.updateCard
    });
    new ButtonImg({
      parent: wrapper,
      name: 'plus',
      className: 'addCard',
      title: 'Add city',
      handlerClick: this.addCard
    });
  }

  _createClass(Header, [{
    key: 'addCard',
    value: function addCard(event) {
      pubsub.publish('add-card-weather');
    }
  }, {
    key: 'updateCard',
    value: function updateCard(event) {
      pubsub.publish('update-weather-card');
    }
  }, {
    key: 'cancelUpdated',
    value: function cancelUpdated() {
      this.btnUpdate.btn.classList.remove('activeUpdate');
    }
  }, {
    key: 'startUpdated',
    value: function startUpdated() {
      this.btnUpdate.btn.classList.add('activeUpdate');
    }
  }, {
    key: 'openSettings',
    value: function openSettings() {
      pubsub.publish('clicked-open-settings');
    }
  }, {
    key: 'savedCities',
    value: function savedCities() {
      pubsub.publish('clicked-saved-cities');
    }
  }]);

  return Header;
}();

;

module.exports = Header;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();
var InputSearch = __webpack_require__(44);
var ButtonImg = __webpack_require__(2);
var Preloader = __webpack_require__(11);
var ESC = 27; // keyCode;
var TIME_ANIMATION = 250; //ms

var BlockSearch = function () {
  function BlockSearch(data) {
    _classCallCheck(this, BlockSearch);

    this.container = data.container;
    this.disabledBlockSearch = this.disabledBlockSearch.bind(this);
    this.enabledBlockSearch = this.enabledBlockSearch.bind(this);
    this.newSubstring = this.newSubstring.bind(this);
    this.checkKeyCode = this.checkKeyCode.bind(this);
    this.enabledPreload = this.enabledPreload.bind(this);
    this.disabledPreload = this.disabledPreload.bind(this);
    pubsub.subscribe('hide-block-search', this.disabledBlockSearch);
    pubsub.subscribe('show-block-search', this.enabledBlockSearch);
    pubsub.subscribe('start-load-list-sities', this.enabledPreload);
    pubsub.subscribe('stop-load-list-sities', this.disabledPreload);

    this.inputSearch = new InputSearch({
      parent: this.container.querySelector('.containerSearch'),
      inputHandler: this.newSubstring
    });
    this.preload = new Preloader({
      parent: this.container.querySelector('.containerListSities')
    });
    new ButtonImg({
      parent: this.container.querySelector('.wrapper'),
      className: 'btnBack',
      name: 'back',
      handlerClick: this.closeBlock
    });
  }

  _createClass(BlockSearch, [{
    key: 'enabledPreload',
    value: function enabledPreload() {
      this.preload.enabled();
    }
  }, {
    key: 'disabledPreload',
    value: function disabledPreload() {
      this.preload.disabled();
    }
  }, {
    key: 'closeBlock',
    value: function closeBlock() {
      pubsub.publish('clicked-close-block-search');
    }
  }, {
    key: 'disabledBlockSearch',
    value: function disabledBlockSearch() {
      var _this = this;

      this.container.classList.add('animationOpacity');
      setTimeout(function () {
        _this.container.classList.add('disabled');
        _this.container.classList.remove('animationOpacity');
      }, TIME_ANIMATION);

      document.removeEventListener('keydown', this.checkKeyCode);
      this.inputSearch.disabled();
    }
  }, {
    key: 'enabledBlockSearch',
    value: function enabledBlockSearch() {
      this.container.classList.remove('disabled');
      document.addEventListener('keydown', this.checkKeyCode);
      this.inputSearch.setFocus();
    }
  }, {
    key: 'checkKeyCode',
    value: function checkKeyCode(event) {
      if (event.keyCode === ESC) this.closeBlock();
    }
  }, {
    key: 'newSubstring',
    value: function newSubstring(event) {
      var substring = event.target.value;
      substring = substring.trim();
      pubsub.publish('new-substring-on-search-cityes', { key: substring });
    }
  }]);

  return BlockSearch;
}();

module.exports = BlockSearch;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ButtonImg = __webpack_require__(2);
var pubsub = new (__webpack_require__(1))();

var InputSearch = function () {
  function InputSearch(data) {
    _classCallCheck(this, InputSearch);

    var wrapper = this.createInput();
    this.input = wrapper.querySelector('.inputSearch');
    data.parent.appendChild(wrapper);
    this.clearInput = this.clearInput.bind(this);
    this.close = new ButtonImg({
      parent: wrapper,
      className: 'buttonClear',
      name: 'cancel',
      handlerClick: this.clearInput
    });
    this.input.addEventListener('input', data.inputHandler);
  }

  _createClass(InputSearch, [{
    key: 'createInput',
    value: function createInput() {
      var div = document.createElement('div');
      var input = document.createElement('input');
      div.appendChild(input);
      div.className = 'containerInput';
      input.className = 'inputSearch';
      input.setAttribute('type', 'text');
      input.setAttribute('aria-label', 'search city');
      input.setAttribute('placeholder', 'City name');
      return div;
    }
  }, {
    key: 'clearInput',
    value: function clearInput() {
      if (!this.input.value) return this.setFocus();
      this.input.value = '';
      this.setFocus();
      pubsub.publish('input-searh-cleared');
    }
  }, {
    key: 'disabled',
    value: function disabled() {
      this.input.value = '';
      this.input.blur();
    }
  }, {
    key: 'setFocus',
    value: function setFocus() {
      this.input.focus();
    }
  }]);

  return InputSearch;
}();

;

module.exports = InputSearch;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();
var SelectItemList = __webpack_require__(46);

var ListSities = function () {
  function ListSities(data) {
    _classCallCheck(this, ListSities);

    this.container = data.container;
    this.selectedCity = this.selectedCity.bind(this);
    this.createListCityes = this.createListCityes.bind(this);
    pubsub.subscribe('create-list-cityes', this.createListCityes);
    this.container.addEventListener('click', this.selectedCity);

    this.selectItemList = new SelectItemList({
      list: this.container,
      selectHandler: this.selectedCity
    });
  }

  _createClass(ListSities, [{
    key: 'createListCityes',
    value: function createListCityes(list) {
      list = list || [];
      var result = list.reduce(function (previousItem, item, index) {
        previousItem += '<li class="itemListSities" data-index=' + index + '>' + item.matching_full_name + '</li>';
        return previousItem;
      }, '');
      this.container.innerHTML = result;
      if (list.length >= 1) this.selectItemList.enabled();
    }
  }, {
    key: 'selectedCity',
    value: function selectedCity(event) {
      this.selectItemList.disabled();
      pubsub.publish('selected-city', { index: event.target.getAttribute('data-index') });
    }
  }]);

  return ListSities;
}();

;

module.exports = ListSities;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UP = 38;
var DOWN = 40;
var ENTER = 13;

var SelectItemList = function () {
  function SelectItemList(data) {
    _classCallCheck(this, SelectItemList);

    this.list = data.list;
    this.activeItem;
    this.selectItemList = data.selectHandler;
    this.checkKeyCode = this.checkKeyCode.bind(this);
  }

  _createClass(SelectItemList, [{
    key: 'disabled',
    value: function disabled() {
      this.activeItem.classList.remove('active');
      this.activeItem = null;
      document.removeEventListener('keydown', this.checkKeyCode);
    }
  }, {
    key: 'enabled',
    value: function enabled() {
      this.activeItem = this.list.children[0];
      this.activeItem.classList.add('active');
      document.addEventListener('keydown', this.checkKeyCode);
    }
  }, {
    key: 'checkKeyCode',
    value: function checkKeyCode(event) {
      var code = event.keyCode;
      if (code === UP) this.selectPreviousItem();else if (code === DOWN) this.selectNextItem();else if (code === ENTER) this.selectItem();
    }
  }, {
    key: 'selectPreviousItem',
    value: function selectPreviousItem() {

      if (this.activeItem.previousElementSibling) {
        var prevElem = this.activeItem.previousElementSibling;
        this.activeItem.classList.remove('active');
        prevElem.classList.add('active');
        this.activeItem = prevElem;
      }
    }
  }, {
    key: 'selectNextItem',
    value: function selectNextItem() {

      if (this.activeItem.nextElementSibling) {
        var nextElem = this.activeItem.nextElementSibling;
        this.activeItem.classList.remove('active');
        nextElem.classList.add('active');
        this.activeItem = nextElem;
      }
    }
  }, {
    key: 'selectItem',
    value: function selectItem() {
      if (!this.activeItem) return;
      this.selectItemList({ target: this.activeItem });
    }
  }]);

  return SelectItemList;
}();

module.exports = SelectItemList;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();
var ButtonImg = __webpack_require__(2);
var ESC = 27; //key code
var TIME_HIDE_MESSAGE = 12000; //ms

var Message = function () {
  function Message(data) {
    _classCallCheck(this, Message);

    this.container = data.container;
    this.message = this.container.querySelector('.message');
    this.deleteMessage = this.deleteMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.checkKeyCode = this.checkKeyCode.bind(this);
    this.close = new ButtonImg({
      parent: this.container,
      className: 'deleteMessage',
      name: 'cancel',
      handlerClick: this.deleteMessage
    });
    pubsub.subscribe('show-message', this.showMessage);
  }

  _createClass(Message, [{
    key: 'showMessage',
    value: function showMessage(data) {
      var _this = this;

      this.message.innerHTML = data.message;
      this.container.classList.add('active');
      setTimeout(function () {
        return _this.hideMessage();
      }, TIME_HIDE_MESSAGE);
      document.addEventListener('keydown', this.checkKeyCode);
    }
  }, {
    key: 'hideMessage',
    value: function hideMessage() {
      document.removeEventListener('keydown', this.checkKeyCode);
      this.container.classList.remove('active');
      this.message.innerHTML = '';
    }
  }, {
    key: 'deleteMessage',
    value: function deleteMessage() {
      this.hideMessage();
    }
  }, {
    key: 'checkKeyCode',
    value: function checkKeyCode(event) {
      if (event.keyCode === ESC) this.hideMessage();
    }
  }]);

  return Message;
}();

;

module.exports = Message;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();

var NotFound = function () {
  function NotFound(data) {
    _classCallCheck(this, NotFound);

    this.container = data.container;
    this.disabled();
    this.enabled = this.enabled.bind(this);
    this.disabled = this.disabled.bind(this);
    pubsub.subscribe('disabled-' + data.eventName, this.disabled);
    pubsub.subscribe('enabled-' + data.eventName, this.enabled);
  }

  _createClass(NotFound, [{
    key: 'disabled',
    value: function disabled() {
      this.container.hidden = true;
    }
  }, {
    key: 'enabled',
    value: function enabled() {
      this.container.hidden = false;
    }
  }]);

  return NotFound;
}();

;

module.exports = NotFound;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getParentNode = __webpack_require__(5);
var pubsub = new (__webpack_require__(1))();
var ButtonImg = __webpack_require__(2);
var Swipedetect = __webpack_require__(12);
var ESC = 27; // keyCode
var ANIMATION_TIME = 200; // ms

var Menu = function () {
  function Menu(data) {
    _classCallCheck(this, Menu);

    this.container = data.container;
    this.active = 0;
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
    this.setCurrentValue = this.setCurrentValue.bind(this);
    this.checkKeyCode = this.checkKeyCode.bind(this);
    this.swipedMove = this.swipedMove.bind(this);
    this.swipedEnd = this.swipedEnd.bind(this);
    pubsub.subscribe('open-settings', this.openMenu);
    pubsub.subscribe('close-menu', this.closeMenu);
    pubsub.subscribe('set-current-settings', this.setCurrentValue);
    new ButtonImg({
      parent: this.container.querySelector('.headerMenu'),
      name: 'back',
      className: 'cancel',
      title: 'Close',
      handlerClick: this.closeMenu
    });

    new Swipedetect({
      container: this.container,
      swipedMove: this.swipedMove,
      swipedEnd: this.swipedEnd
    });

    data.form.addEventListener('click', this.saveSettings);
  }

  _createClass(Menu, [{
    key: 'closeMenu',
    value: function closeMenu() {
      var _this = this;

      setTimeout(function () {
        _this.container.classList.remove('enabled');
        _this.container.classList.remove('disabled');
      }, ANIMATION_TIME);
      this.container.classList.add('disabled');
      document.removeEventListener('keydown', this.checkKeyCode);
    }
  }, {
    key: 'openMenu',
    value: function openMenu() {
      this.container.classList.add('enabled');
      document.addEventListener('keydown', this.checkKeyCode);
    }
  }, {
    key: 'saveSettings',
    value: function saveSettings(event) {
      var target = event.target;
      if (target.tagName !== 'INPUT') return;
      pubsub.publish('new-settings', { key: target.name, value: target.value });
    }
  }, {
    key: 'setCurrentValue',
    value: function setCurrentValue(data) {
      var settings = data.settings;
      var item = void 0;
      var key = void 0;
      for (key in settings) {
        item = this.container.querySelector('input[value="' + settings[key] + '"]');
        if (item) item.checked = true;
      };
    }
  }, {
    key: 'checkKeyCode',
    value: function checkKeyCode(event) {
      if (event.keyCode === ESC) this.closeMenu();
    }
  }, {
    key: 'swipedMove',
    value: function swipedMove(direction, pageX, target) {
      var _pageX = pageX < 0 ? -pageX : pageX;
      if (_pageX < 20) return;

      if (direction === 'right') this.openMenu();else this.closeMenu();
    }
  }, {
    key: 'swipedEnd',
    value: function swipedEnd(target, pageX) {}
  }]);

  return Menu;
}();

module.exports = Menu;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var pubsub = new (__webpack_require__(1))();
var ButtonImg = __webpack_require__(2);
var Swipedetect = __webpack_require__(12);
var getParentNode = __webpack_require__(5);
var TIME_ANIMATION = 250; //ms
var MAX_OFFSET = 60; // percent
var ESC = 27; // keyCode
var store = __webpack_require__(3);

var SavedCities = function () {
  function SavedCities(data) {
    var _this = this;

    _classCallCheck(this, SavedCities);

    this.container = data.container;
    this.listSities = this.container.querySelector('.listSavedCities');
    this.activeItem;
    this.showBlock = this.showBlock.bind(this);
    this.hideBlock = this.hideBlock.bind(this);
    this.swipedEnd = this.swipedEnd.bind(this);
    this.swipedMove = this.swipedMove.bind(this);
    this.checkKeyCode = this.checkKeyCode.bind(this);
    this.createItemList = this.createItemList.bind(this);
    pubsub.subscribe('show-saved-cities', this.showBlock);
    pubsub.subscribe('hide-saved-cities', this.hideBlock);
    pubsub.subscribe('create-list-saved-sities', this.createItemList);

    new ButtonImg({
      parent: this.container.querySelector('.header .wrapper'),
      className: 'btnBack',
      name: 'back',
      title: '',
      handlerClick: this.hideBlock
    });

    new Swipedetect({
      container: this.listSities,
      swipedMove: this.swipedMove,
      swipedEnd: this.swipedEnd
    });

    this.listSities.addEventListener('click', function (event) {
      var target = event.target;
      if (target === _this.listSities) return;
      if (target.tagName === 'LI') {
        _this.toggleActiveItem(_this.activeItem);
        _this.activeItem = target;
        _this.toggleActiveItem(_this.activeItem);
        pubsub.publish('change-current-city', { id: +target.getAttribute('data-id') });
        _this.hideBlock();
      } else _this.deleteItemList(target);
    });

    if ('ontouchstart' in document || 'ontouchstart' in window) {
      this.listSities.classList.add('touch-detected');
    }
  }

  _createClass(SavedCities, [{
    key: 'deleteItemList',
    value: function deleteItemList(target) {
      target = getParentNode(target, 'LI');
      pubsub.publish('delete-card', { id: +target.getAttribute('data-id') });
      target.classList.add('minHeight');
      this.remove(target, 'minHeight', true);
    }
  }, {
    key: 'swipedMove',
    value: function swipedMove(direction, pageX, target) {
      var _pageX = pageX < 0 ? -pageX : pageX;
      if (_pageX < 20) return;

      target.style.transform = 'translateZ(0) translateX(' + pageX + 'px)';
      target.style.opacity = '' + (1 - getPercent(1000, _pageX) / 20);
    }
  }, {
    key: 'swipedEnd',
    value: function swipedEnd(target, pageX) {
      if (pageX < 0) pageX = -pageX;
      var offset = getPercent(target.clientWidth, pageX);
      if (offset > MAX_OFFSET) {
        this.deleteItemList(target);
      } else {
        target.classList.add('animation');
        target.style.transform = 'translateZ(0) translateX(0px)';
        target.style.opacity = '1';
        this.remove(target, 'animation');
      }
    }
  }, {
    key: 'remove',
    value: function remove(el, className, isDelele) {
      setTimeout(function () {
        el.classList.remove(className);
        if (isDelele) el.remove();
      }, TIME_ANIMATION);
    }
  }, {
    key: 'showBlock',
    value: function showBlock() {
      var target = this.listSities.querySelector('[data-id="' + store.currentCitiId + '"]');
      if (target) {
        this.activeItem = target;
        this.toggleActiveItem(target);
      }
      this.container.classList.add('enabled');
      document.addEventListener('keydown', this.checkKeyCode);
    }
  }, {
    key: 'hideBlock',
    value: function hideBlock() {
      var _this2 = this;

      pubsub.publish('saved-cityes-closed');
      if (this.activeItem) {
        this.toggleActiveItem(this.activeItem);
        this.activeItem = undefined;
      }
      this.container.classList.add('animationOpacity');
      setTimeout(function () {
        _this2.container.classList.remove('animationOpacity');
        _this2.container.classList.remove('enabled');
      }, TIME_ANIMATION);
      document.removeEventListener('keydown', this.checkKeyCode);
    }
  }, {
    key: 'createItemList',
    value: function createItemList(list) {
      var location = void 0;
      this.listSities.innerHTML += list.reduce(function (total, item) {
        location = item.location;
        return total += '<li class="itemListSavedCities" data-id=' + item.id + '>\n        ' + location.city + ' ' + location.country + ' ' + location.region + '\n        <div class="wrapperBtnDel">\n          <button class="defaultBtn">\n            <svg width="25px" height="25px" fill="#1f1d1d" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 774.266 774.266">\n              <path d="M640.35,91.169H536.971V23.991C536.971,10.469,526.064,0,512.543,0c-1.312,0-2.187,0.438-2.614,0.875    C509.491,0.438,508.616,0,508.179,0H265.212h-1.74h-1.75c-13.521,0-23.99,10.469-23.99,23.991v67.179H133.916    c-29.667,0-52.783,23.116-52.783,52.783v38.387v47.981h45.803v491.6c0,29.668,22.679,52.346,52.346,52.346h415.703    c29.667,0,52.782-22.678,52.782-52.346v-491.6h45.366v-47.981v-38.387C693.133,114.286,670.008,91.169,640.35,91.169z     M285.713,47.981h202.84v43.188h-202.84V47.981z M599.349,721.922c0,3.061-1.312,4.363-4.364,4.363H179.282    c-3.052,0-4.364-1.303-4.364-4.363V230.32h424.431V721.922z M644.715,182.339H129.551v-38.387c0-3.053,1.312-4.802,4.364-4.802    H640.35c3.053,0,4.365,1.749,4.365,4.802V182.339z"/>\n              <rect x="475.031" y="286.593" width="48.418" height="396.942"/>\n              <rect x="363.361" y="286.593" width="48.418" height="396.942"/>\n              <rect x="251.69" y="286.593" width="48.418" height="396.942"/>\n            </svg>\n          </button>\n        </div>\n      </li>';
      }, '');
    }
  }, {
    key: 'deleteActiveItem',
    value: function deleteActiveItem(target) {
      target.classList.remove('active');
    }
  }, {
    key: 'toggleActiveItem',
    value: function toggleActiveItem(target) {
      target.classList.toggle('active');
    }
  }, {
    key: 'checkKeyCode',
    value: function checkKeyCode(event) {
      if (event.keyCode === ESC) this.hideBlock();
    }
  }]);

  return SavedCities;
}();

;

var getPercent = function getPercent(a, b) {
  return 100 / (a / b);
};

module.exports = SavedCities;

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map