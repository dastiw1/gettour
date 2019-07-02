(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("gettour", [], factory);
	else if(typeof exports === 'object')
		exports["gettour"] = factory();
	else
		root["gettour"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ChangesListener.js":
/*!********************************!*\
  !*** ./src/ChangesListener.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__isNativeEvent = __isNativeEvent;
exports.default = void 0;

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function __isNativeEvent(event) {
  var defaultEvents = ['click', 'mouseover', 'mouseout', 'keyup', 'keypress', 'change', 'focus', 'submit'];
  return defaultEvents.indexOf(event) > -1;
}

var ChangesListener =
/*#__PURE__*/
function () {
  function ChangesListener(_ref) {
    var listener_id = _ref.listener_id,
        selector = _ref.selector,
        event = _ref.event,
        attributeName = _ref.attributeName;

    _classCallCheck(this, ChangesListener);

    this.__tourObject = null;
    this.listener_id = listener_id;
    this.selector = selector;
    this.event = event;
    this.attributeName = attributeName;
  }

  _createClass(ChangesListener, [{
    key: "init",
    value: function init() {
      var _this = this;

      if (this.tourJs == null) {
        (0, _utils.showError)('Сперва задайте значение tourJs');
        return;
      }

      var isBody = false;
      var event = this.event; // конфигурация нашего observer:

      var config = {
        attributes: true,
        childList: true,
        characterData: false
      }; // выбираем целевой элемент

      var target = document.querySelector(this.selector);

      if (__isNativeEvent(event)) {
        // Обработка клика
        if (event === 'click') {
          this.callback = this.nativeClickListener.bind(this);
          document.addEventListener(event, this.callback, false);
        } else if (target != null) {
          // Обработка остального
          this.callback = this.nativeEventListener.bind(this);
          target.addEventListener(event, this.callback, false);
        } else if (target == null) {
          (0, _utils.showError)('Ошибка: Элемент отсутствует в DOM');
        }

        return;
      } // Если элемент не найден в DOM дереве


      if (!target) {
        target = document.body;
        config.subtree = true;
        isBody = true;
      }

      if (isBody === false) {
        var observer;
        var callback;

        switch (event) {
          case 'show':
            callback = this.IntersectionShowCallback;
            break;

          case 'hide':
            callback = this.IntersectionHideCallback;
            break;

          case 'class_change':
            callback = this.classChangeCallback;
            break;

          case 'attr_change':
            callback = this.attributeChangeCallback;
            break;

          case 'text_change':
            config = Object.assign(config, {
              subtree: true,
              characterData: true,
              attributeOldValue: true,
              characterDataOldValue: true
            });
            callback = this.characterDataChangeCallback;
            break;

          case 'children_change':
            config.subtree = true;
            callback = this.childrenChangeCallback;
            break;

          default:
            (0, _utils.showError)("\u041D\u0435 \u043F\u043E\u043F\u0430\u043B \u043F\u043E\u0434 \u0443\u0441\u043B\u043E\u0432\u0438\u044F: ".concat(this.selector, " - ").concat(event));
            return;
          // break;
        }

        if (typeof callback !== 'function') {
          (0, _utils.showError)('Callback функция не определена!');
          return;
        } // если используется IntersectionObserver


        if (['show', 'hide'].indexOf(event) > -1) {
          observer = new IntersectionObserver(function (entries, context) {
            entries.forEach(callback.bind(context));
          });
        } else {
          // Если используется MutationObserver
          observer = new MutationObserver(function (mutations, context) {
            mutations.forEach(callback.bind(context));
          });
        }

        this.tourJs.__observers[this.listener_id] = observer;
        observer.observe(target, config);
      } else {
        // создаём экземпляр MutationObserver
        var _observer = new MutationObserver(function (mutations, context) {
          switch (event) {
            case 'show':
              mutations.forEach(_this.showCallback.bind(context));
              break;

            case 'hide':
              mutations.forEach(_this.hideCallback.bind(context));
              break;

            default:
              (0, _utils.showError)("\u041D\u0435 \u043F\u043E\u043F\u0430\u043B \u043F\u043E\u0434 \u0443\u0441\u043B\u043E\u0432\u0438\u044F: ".concat(_this.selector, " - ").concat(_this.event));

              _this.disconnectListener();

              break;
          }
        }); // передаём в качестве аргументов целевой элемент и его конфигурацию


        this.tourJs.__observers[this.listener_id] = _observer;

        _observer.observe(target, config);
      }
    }
    /**
     *
     */

  }, {
    key: "disconnectListener",
    value: function disconnectListener() {
      var listener = this.tourJs.__observers[this.listener_id];

      if (!listener) {
        (0, _utils.showError)("Listener \u0441 id ".concat(this.listener_id, " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D"));
        return;
      }

      listener.disconnect();
    }
  }, {
    key: "sendMessage",
    value: function sendMessage() {
      this.tourJs.sendMessage({
        listener_id: this.listener_id
      });
    }
    /**
     * Callback функция для прослушивания нативных событии JavaScript
     * @param {Event} jsEvent
     */

  }, {
    key: "nativeEventListener",
    value: function nativeEventListener(jsEvent) {
      if (jsEvent.target.matches(this.selector)) {
        this.sendMessage();
        jsEvent.target.removeEventListener(this.event, this.callback, false);
      }
    }
    /**
     *Callback функция для прослушивания нативных CLICK событии JavaScript
     * @param {Event} jsEvent
     */

  }, {
    key: "nativeClickListener",
    value: function nativeClickListener(jsEvent) {
      if (jsEvent.target.matches(this.selector)) {
        this.sendMessage();
        jsEvent.target.removeEventListener(this.event, this.callback, false);
      }
    }
  }, {
    key: "IntersectionShowCallback",
    value: function IntersectionShowCallback(changeListener) {
      if (this.isIntersecting) {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
  }, {
    key: "IntersectionHideCallback",
    value: function IntersectionHideCallback(changeListener) {
      if (this.intersectionRatio === 0 && this.isIntersecting === false) {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
    /**
     * Callback функция когда event == 'show' (показ) и этого элемента нет в DOM
     */

  }, {
    key: "showCallback",
    value: function showCallback(changeListener) {
      if (this.type === 'childList' && this.addedNodes.length > 0) {
        var el = document.querySelector(changeListener.selector);

        if (this.addedNodes[0].isSameNode(el)) {
          changeListener.sendMessage();
          return changeListener.disconnectListener();
        }
      }

      return false;
    }
  }, {
    key: "hideCallback",
    value: function hideCallback(changeListener) {
      if (this.type === 'childList' && this.removedNodes.length > 0) {
        var node = this.removedNodes[0];

        if (node.nodeType === 1 && node.matches(changeListener.selector)) {
          changeListener.sendMessage();
          return changeListener.disconnectListener();
        }
      }

      return false;
    }
  }, {
    key: "classChangeCallback",
    value: function classChangeCallback(changeListener) {
      if (this.type === 'attributes' && this.attributeName === 'class') {
        changeListener.sendMessage();
        return changeListener.disconnectListener();
      }

      return false;
    }
  }, {
    key: "attributeChangeCallback",
    value: function attributeChangeCallback(changeListener) {
      if (this.type === 'attributes' && this.attributeName === changeListener.attributeName) {
        changeListener.sendMessage();
        return changeListener.disconnectListener();
      }

      return false;
    }
  }, {
    key: "characterDataChangeCallback",
    value: function characterDataChangeCallback(changeListener) {
      if (this.type === 'characterData' || this.type === 'childList') {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
  }, {
    key: "childrenChangeCallback",
    value: function childrenChangeCallback(changeListener) {
      if (this.type === 'childList') {
        changeListener.sendMessage();
        changeListener.disconnectListener();
      }
    }
  }, {
    key: "tourJs",
    get: function get() {
      return this.__tourObject;
    },
    set: function set(val) {
      this.__tourObject = val;
    }
  }]);

  return ChangesListener;
}();

var _default = ChangesListener;
exports.default = _default;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _introChat = _interopRequireDefault(__webpack_require__(/*! ./intro-chat */ "./src/intro-chat.js"));

var _ChangesListener = _interopRequireDefault(__webpack_require__(/*! ./ChangesListener */ "./src/ChangesListener.js"));

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Warning. options - это свойсто объекта
 * @param {object} param0
 */
function setOptions(_ref) {
  var options = _ref.options;

  if (_typeof(options) === 'object') {
    this.__intro.setOptions(options);
  } else {
    this.__intro.setOptions(this.config);
  }
}

function isAnyPartOfElementInViewport(el) {
  var scroll = window.scrollY || window.pageYOffset;
  var boundsTop = el.getBoundingClientRect().top + scroll;
  var viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };
  var bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight
  };
  return bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom || bounds.top <= viewport.bottom && bounds.top >= viewport.top;
}

function isMessageFromWidget(event) {
  // IMPORTANT: Check the origin of the data!
  if (event.origin.indexOf('https://getchat.me') || event.origin.indexOf('http://localhost:3000')) {
    // The data has been sent from your site
    // The data sent with postMessage is stored in event.data
    if (_typeof(event.data) !== 'object' || event.data.source !== 'getchat-widget') {
      return false;
    }

    return true;
  }

  return false;
}

var onboarding = {
  stylesFilePath: 'https://cdn.jsdelivr.net/npm/gettour/dist/gettour.min.js',
  selector: '.getchat-widget__frame',
  expandClass: 'getchat-widget--expanded',
  active: false,
  __intro: null,
  widgetHash: null,
  autoShowConditions: [],
  hash: null,
  domain: null,
  block: null,
  setOptions: setOptions,
  stylesLoaded: false,
  __observers: {},
  options: {
    env: 'production'
  },

  /**
   *
   * @param {string} hash
   * @param {object} options
   */
  init: function init(hash) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var self = this;
    this.hash = hash;
    this.options = Object.assign(this.options, options);
    this.loadWidgetData().then(function (data) {
      _this.domain = data.domain;
      _this.active = data.widget_active;
      _this.autoShowConditions = data.conditions;

      if (_this.domain !== window.location.host) {
        (0, _utils.showError)('[Ошибка] Виджет не для этого домена');
        return;
      }

      if (!_this.active) {
        return;
      }

      _this.__intro = (0, _introChat.default)();

      _this.__intro.onchange(function () {
        self.__intro.refresh();

        return _this;
      });

      _this.__intro.onbeforechange(function () {
        if (_this.__intro._introItems.length) {
          var step = _this.__intro._introItems[0];
          self.setOptions(step);
        } //


        var closeBtn = document.querySelector('.getchat-widget > .getchat-widget__btn--icon');

        if (closeBtn) {
          closeBtn.style.display = 'none';
        }
      });

      _this.__intro.onexit(function () {
        var closeBtn = document.querySelector('.getchat-widget > .getchat-widget__btn--icon');

        if (closeBtn) {
          closeBtn.style.display = 'inline-flex';
        }
      }); // Слушать события выделения


      window.addEventListener('message', function (event) {
        _this.__listenForHighlightRequests.call(_this, event);
      }); // Слушать события кнопок чата

      window.addEventListener('message', function (event) {
        _this.__listenForActionClickedRequests.call(_this, event);
      }); // Слушать события для Observer-а

      window.addEventListener('message', function (event) {
        _this.__listenForObserveRequests.call(_this, event);
      });

      _this.loadCondition(); // Слущать изменение URL


      _this.listenForLocationChange();
    });
    return this;
  },
  loadCondition: function loadCondition() {
    var _this2 = this;

    this.autoShowConditions.forEach(function (cond) {
      var regex = new RegExp(cond.urlRegex, 'i');

      if (regex.test(window.location.pathname)) {
        setTimeout(function () {
          _this2.renderWidget(cond.src);

          if (!_this2.stylesLoaded) {
            _this2.loadStyles();
          }

          _this2.initEventListeners();
        }, cond.timeInterval * 1000);
      }
    });
  },
  listenForLocationChange: function listenForLocationChange() {
    var _this3 = this;

    /* This modifies these three functions so that all fire
    a custom locationchange event for you to use,
    and also pushstate and replacestate events if you want to use those:
    From: https://stackoverflow.com/a/52809105/3939853 */
    history.pushState = function (f) {
      return function pushState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('pushState'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      };
    }(history.pushState);

    history.replaceState = function (f) {
      return function replaceState() {
        var ret = f.apply(this, arguments);
        window.dispatchEvent(new Event('replaceState'));
        window.dispatchEvent(new Event('locationchange'));
        return ret;
      };
    }(history.replaceState);

    window.addEventListener('popstate', function () {
      window.dispatchEvent(new Event('locationchange'));
    });
    /**
     * Слушать изменение URL
     */

    window.addEventListener('locationchange', function () {
      _this3.reset();

      _this3.loadCondition();
    });
  },

  /**
   * Если приходят такие экшны, то убирать highlight
   * @param {object} e
   */
  __listenForActionClickedRequests: function __listenForActionClickedRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'ACTION_CLICKED') {
      var answer_id = e.data.answer_id;

      if (answer_id === this.__intro._options.steps[0].highlightEventAnswerId) {
        this.__intro.exit();
      }
    }
  },

  /**
   * Запустить прослушнивание событии которые выстреливают listener_id
   * @param {Object} e
   */
  __listenForObserveRequests: function __listenForObserveRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'OBSERVE') {
      var listener = new _ChangesListener.default(e.data);
      listener.tourJs = this;
      listener.init();
    }
  },

  /**
   * Запустить прослушивание закрытия выделения элемента
   * @param {Object} e
   */
  __listenForHighlightRequests: function __listenForHighlightRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'HIGHLIGHT') {
      if (e.data.selector) {
        this.highlight(e.data);
      }
    }
  },
  __getElementForHighlight: function __getElementForHighlight(selector) {
    var elements = document.querySelectorAll(selector);
    var elementsArray = Array.from(elements);
    return elementsArray.find(isAnyPartOfElementInViewport);
  },
  highlight: function highlight(_ref2) {
    var _this4 = this;

    var selector = _ref2.selector,
        closeEvent = _ref2.closeEvent,
        highlightEventAnswerId = _ref2.highlightEventAnswerId;
    var step = {
      element: selector,
      fixed: true,
      closeEvent: closeEvent,
      highlightEventAnswerId: highlightEventAnswerId
    };

    var introElement = this.__getElementForHighlight(selector);

    if (introElement == null) {
      (0, _utils.showError)("Element doesn't exist on DOM");
      return;
    }

    if (closeEvent === 'chatListenerClick') {
      this.setOptions({
        options: {
          exitOnEsc: false,
          exitOnOverlayClick: false,
          disableInteraction: true
        }
      });
    } else {
      this.setOptions({
        options: {
          exitOnEsc: true,
          exitOnOverlayClick: false,
          disableInteraction: false
        }
      });
    }

    this.__intro.addStep(step); // Listen to event


    introElement.addEventListener(closeEvent, function () {
      _this4.__intro.exit();
    }, {
      once: true
    }); // Close

    if (this.__intro._introItems.length) {
      this.__intro.goToStepNumber(0);
    }

    this.__intro.exit();

    setTimeout(function () {
      _this4.__intro.start(step);
    }, 50);
  },
  sendMessage: function sendMessage(msg) {
    this.__intro.exit();

    var iframe = document.querySelector(this.selector);

    if (!iframe) {
      (0, _utils.showError)("Widget's iframe not found!");
      return;
    }

    iframe.contentWindow.postMessage(Object.assign(msg, {
      source: 'get-tour-library'
    }));
  },
  reset: function reset() {
    this.__intro._options.steps = [];

    this.__intro.refresh();

    this.destroyWidget();
  },
  destroyWidget: function destroyWidget() {
    if (this.block) {
      this.block.remove();
    }
  },
  renderWidget: function renderWidget(widgetUrl) {
    this.block = document.createElement('div');
    this.block.className = 'getchat-widget getchat-widget--expanded';
    var widgetHtml = '<button type="button" class="getchat-widget__btn getchat-widget__btn--icon" >' + '<i aria-hidden="true" class="getchat-widget__icon--close"></i></button>' + "<iframe src=\"".concat(widgetUrl, "\" class=\"getchat-widget__frame\"></iframe>");
    this.block.innerHTML = widgetHtml;
    document.body.appendChild(this.block);
  },
  loadStyles: function loadStyles() {
    (0, _utils.loadCss)(this.stylesFilePath);
    this.stylesLoaded = true;
  },
  initEventListeners: function initEventListeners() {
    var _this5 = this;

    var $closeBtn = document.querySelector('.getchat-widget__btn--icon');
    $closeBtn.addEventListener('click', function () {
      if (_this5.block.classList.contains(_this5.expandClass)) {
        _this5.hideBlock();
      } else {
        _this5.expandBlock();
      }
    });
  },
  hideBlock: function hideBlock() {
    var $closeBtn = document.querySelector('.getchat-widget__btn--icon');
    var $icon = $closeBtn.children[0];
    this.block.classList.remove(this.expandClass);
    $icon.className = 'getchat-widget__icon--expand';
  },
  expandBlock: function expandBlock() {
    var $closeBtn = document.querySelector('.getchat-widget__btn--icon');
    var $icon = $closeBtn.children[0];
    this.block.classList.add(this.expandClass);
    $icon.className = 'getchat-widget__icon--close';
  },
  loadWidgetData: function loadWidgetData() {
    var url = "https://getchat.me/api/the-bot/widget/".concat(this.hash, "/data");

    if (this.options.env === 'development') {
      url = url.replace('https://getchat.me', 'http://localhost:3000');
    }

    return new Promise(function (resolve, reject) {
      return fetch(url, {
        method: 'GET',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'cors',
        cache: 'no-cache',
        dataType: 'jsonp'
      }).then(function (res) {
        if (res.status === 200) {
          return res.json();
        }

        (0, _utils.showError)("[\u041E\u0448\u0438\u0431\u043A\u0430] ".concat(res.statusText));
        return {};
      }).then(function (response) {
        return resolve(response);
      }).catch(function (error) {
        (0, _utils.showError)(error);
        reject(error);
      });
    });
  }
};
var _default = onboarding;
exports.default = _default;
module.exports = exports["default"];

/***/ }),

/***/ "./src/intro-chat.js":
/*!***************************!*\
  !*** ./src/intro-chat.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable */

/**
 * Intro.js v2.9.3  fork. only highlight element
 * https://github.com/usablica/intro.js
 *
 * Copyright (C) 2017 Afshin Mehrabani (@afshinmeh)
 */
(function (f) {
  if (( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    module.exports = f(); // deprecated function
    // @since 2.8.0

    module.exports.introJs = function () {
      console.warn('Deprecated: please use require("intro.js") directly, instead of the introJs method of the function'); // introJs()

      return f().apply(this, arguments);
    };
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (f),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else { var g; }
})(function () {
  //Default config/variables
  var VERSION = '2.9.3';
  /**
   * IntroJs main class
   *
   * @class IntroJs
   */

  function IntroJs(obj) {
    this._targetElement = obj;
    this._introItems = [];
    this._options = {
      /* CSS class that is added to the helperLayer */
      highlightClass: '',

      /* Close introduction when pressing Escape button? */
      exitOnEsc: true,

      /* Close introduction when clicking on overlay layer? */
      exitOnOverlayClick: true,

      /* Let user use keyboard to navigate the tour? */
      keyboardNavigation: false,

      /* Scroll to highlighted element? */
      scrollToElement: true,

      /*
       * Should we scroll the tooltip or target element?
       *
       * Options are: 'element' or 'tooltip'
       */
      scrollTo: 'element',

      /* Padding to add after scrolling when element is not in the viewport (in pixels) */
      scrollPadding: 30,

      /* Set the overlay opacity */
      overlayOpacity: 0.9,

      /* Precedence of positions, when auto is enabled */
      positionPrecedence: ['bottom', 'top', 'right', 'left'],

      /* Disable an interaction with element? */
      disableInteraction: false,

      /* Set how much padding to be used around helper element */
      helperElementPadding: 0,

      /* additional classes to put on the buttons */
      buttonClass: 'introjs-button'
    };
  }
  /**
   * Initiate a new introduction/guide from an element in the page
   *
   * @api private
   * @method _introForElement
   * @param {Object} targetElm
   * @param {String} group
   * @returns {Boolean} Success or not?
   */


  function _introForElement(targetElm, step) {
    var introItems = [];

    var currentItem = _cloneObject(step); //set the step


    currentItem.step = introItems.length + 1; //use querySelector function only when developer used CSS selector

    if (typeof currentItem.element === 'string') {
      //grab the element with given selector from the page
      currentItem.element = document.querySelector(currentItem.element);
    } //intro without element


    if (typeof currentItem.element === 'undefined' || currentItem.element === null) {
      var floatingElementQuery = document.querySelector('.introjsFloatingElement');

      if (floatingElementQuery === null) {
        floatingElementQuery = document.createElement('div');
        floatingElementQuery.className = 'introjsFloatingElement';
        document.body.appendChild(floatingElementQuery);
      }

      currentItem.element = floatingElementQuery;
      currentItem.position = 'floating';
    }

    currentItem.scrollTo = currentItem.scrollTo || this._options.scrollTo;

    if (typeof currentItem.disableInteraction === 'undefined') {
      currentItem.disableInteraction = this._options.disableInteraction;
    }

    if (currentItem.element !== null) {
      introItems = [currentItem];
    } //set it to the introJs object


    this._introItems = introItems; //add overlay layer to the page

    if (_addOverlayLayer.call(this, targetElm)) {
      //then, start the show
      _nextStep.call(this);

      if (this._options.keyboardNavigation) {
        DOMEvent.on(window, 'keydown', _onKeyDown, this, true);
      } //for window resize


      DOMEvent.on(window, 'resize', _onResize, this, true);
    }

    return false;
  }

  function _onResize() {
    this.refresh.call(this);
  }
  /**
   * on keyCode:
   * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
   * This feature has been removed from the Web standards.
   * Though some browsers may still support it, it is in
   * the process of being dropped.
   * Instead, you should use KeyboardEvent.code,
   * if it's implemented.
   *
   * jQuery's approach is to test for
   *   (1) e.which, then
   *   (2) e.charCode, then
   *   (3) e.keyCode
   * https://github.com/jquery/jquery/blob/a6b0705294d336ae2f63f7276de0da1195495363/src/event.js#L638
   *
   * @param type var
   * @return type
   */


  function _onKeyDown(e) {
    var code = e.code === null ? e.which : e.code; // if code/e.which is null

    if (code === null) {
      code = e.charCode === null ? e.keyCode : e.charCode;
    }

    if ((code === 'Escape' || code === 27) && this._options.exitOnEsc === true) {
      //escape key pressed, exit the intro
      //check if exit callback is defined
      _exitIntro.call(this, this._targetElement);
    }
  }
  /*
   * makes a copy of the object
   * @api private
   * @method _cloneObject
   */


  function _cloneObject(object) {
    if (object === null || _typeof(object) !== 'object' || typeof object.nodeType !== 'undefined') {
      return object;
    }

    var temp = {};

    for (var key in object) {
      if (typeof window.jQuery !== 'undefined' && object[key] instanceof window.jQuery) {
        temp[key] = object[key];
      } else {
        temp[key] = _cloneObject(object[key]);
      }
    }

    return temp;
  }
  /**
   * Go to specific step of introduction
   *
   * @api private
   * @method _goToStep
   */


  function _goToStep(step) {
    //because steps starts with zero
    this._currentStep = step - 2;

    if (typeof this._introItems !== 'undefined') {
      _nextStep.call(this);
    }
  }
  /**
   * Go to the specific step of introduction with the explicit [data-step] number
   *
   * @api private
   * @method _goToStepNumber
   */


  function _goToStepNumber(step) {
    this._currentStepNumber = step;

    if (typeof this._introItems !== 'undefined') {
      _nextStep.call(this);
    }
  }
  /**
   * Go to next step on intro
   *
   * @api private
   * @method _nextStep
   */


  function _nextStep() {
    this._direction = 'forward';

    if (typeof this._currentStepNumber !== 'undefined') {
      _forEach(this._introItems, function (item, i) {
        if (item.step === this._currentStepNumber) {
          this._currentStep = i - 1;
          this._currentStepNumber = undefined;
        }
      }.bind(this));
    }

    if (typeof this._currentStep === 'undefined') {
      this._currentStep = 0;
    } else {
      ++this._currentStep;
    } // comment остыль var nextStep = this._introItems[this._currentStep];


    var nextStep = this._introItems[0];
    var continueStep = true;

    if (typeof this._introBeforeChangeCallback !== 'undefined') {
      continueStep = this._introBeforeChangeCallback.call(this, nextStep.element);
    } // if `onbeforechange` returned `false`, stop displaying the element


    if (continueStep === false) {
      --this._currentStep;
      return false;
    }

    if (this._introItems.length <= this._currentStep) {
      //end of the intro
      //check if any callback is defined
      if (typeof this._introCompleteCallback === 'function') {
        this._introCompleteCallback.call(this);
      }

      _exitIntro.call(this, this._targetElement);

      return;
    }

    _showElement.call(this, nextStep);
  }
  /**
   * Update placement of the intro objects on the screen
   * @api private
   */


  function _refresh() {
    // re-align intros
    _setHelperLayerPosition.call(this, document.querySelector('.introjs-helperLayer'));

    _setHelperLayerPosition.call(this, document.querySelector('.introjs-tooltipReferenceLayer'));

    _setHelperLayerPosition.call(this, document.querySelector('.introjs-disableInteraction'));

    return this;
  }
  /**
   * Exit from intro
   *
   * @api private
   * @method _exitIntro
   * @param {Object} targetElement
   * @param {Boolean} force - Setting to `true` will skip the result of beforeExit callback
   */


  function _exitIntro(targetElement, force) {
    var continueExit = true; // calling onbeforeexit callback
    //
    // If this callback return `false`, it would halt the process

    if (this._introBeforeExitCallback !== undefined) {
      continueExit = this._introBeforeExitCallback.call(this);
    } // skip this check if `force` parameter is `true`
    // otherwise, if `onbeforeexit` returned `false`, don't exit the intro


    if (!force && continueExit === false) return; //remove overlay layers from the page

    var overlayLayers = targetElement.querySelectorAll('.introjs-overlay');

    if (overlayLayers && overlayLayers.length) {
      _forEach(overlayLayers, function (overlayLayer) {
        overlayLayer.style.opacity = 0;
        window.setTimeout(function () {
          if (this.parentNode) {
            this.parentNode.removeChild(this);
          }
        }.bind(overlayLayer), 500);
      }.bind(this));
    } //remove all helper layers


    var helperLayer = targetElement.querySelector('.introjs-helperLayer');

    if (helperLayer) {
      helperLayer.parentNode.removeChild(helperLayer);
    }

    var referenceLayer = targetElement.querySelector('.introjs-tooltipReferenceLayer');

    if (referenceLayer) {
      referenceLayer.parentNode.removeChild(referenceLayer);
    } //remove disableInteractionLayer


    var disableInteractionLayer = targetElement.querySelector('.introjs-disableInteraction');

    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    } //remove intro floating element


    var floatingElement = document.querySelector('.introjsFloatingElement');

    if (floatingElement) {
      floatingElement.parentNode.removeChild(floatingElement);
    }

    _removeShowElement(); //remove `introjs-fixParent` class from the elements


    var fixParents = document.querySelectorAll('.introjs-fixParent');

    _forEach(fixParents, function (parent) {
      _removeClass(parent, /introjs-fixParent/g);
    }); //clean listeners


    DOMEvent.off(window, 'keydown', _onKeyDown, this, true);
    DOMEvent.off(window, 'resize', _onResize, this, true); //check if any callback is defined

    if (this._introExitCallback !== undefined) {
      this._introExitCallback.call(this);
    } //set the step to zero


    this._currentStep = undefined;
  }
  /**
   * Set tooltip left so it doesn't go off the right side of the window
   *
   * @return boolean true, if tooltipLayerStyleLeft is ok.  false, otherwise.
   */


  function _checkRight(targetOffset, tooltipLayerStyleLeft, tooltipOffset, windowSize, tooltipLayer) {
    if (targetOffset.left + tooltipLayerStyleLeft + tooltipOffset.width > windowSize.width) {
      // off the right side of the window
      tooltipLayer.style.left = windowSize.width - tooltipOffset.width - targetOffset.left + 'px';
      return false;
    }

    tooltipLayer.style.left = tooltipLayerStyleLeft + 'px';
    return true;
  }
  /**
   * Set tooltip right so it doesn't go off the left side of the window
   *
   * @return boolean true, if tooltipLayerStyleRight is ok.  false, otherwise.
   */


  function _checkLeft(targetOffset, tooltipLayerStyleRight, tooltipOffset, tooltipLayer) {
    if (targetOffset.left + targetOffset.width - tooltipLayerStyleRight - tooltipOffset.width < 0) {
      // off the left side of the window
      tooltipLayer.style.left = -targetOffset.left + 'px';
      return false;
    }

    tooltipLayer.style.right = tooltipLayerStyleRight + 'px';
    return true;
  }
  /**
   * Determines the position of the tooltip based on the position precedence and availability
   * of screen space.
   *
   * @param {Object}    targetElement
   * @param {Object}    tooltipLayer
   * @param {String}    desiredTooltipPosition
   * @return {String}   calculatedPosition
   */


  function _determineAutoPosition(targetElement, tooltipLayer, desiredTooltipPosition) {
    // Take a clone of position precedence. These will be the available
    var possiblePositions = this._options.positionPrecedence.slice();

    var windowSize = _getWinSize();

    var tooltipHeight = _getOffset(tooltipLayer).height + 10;
    var tooltipWidth = _getOffset(tooltipLayer).width + 20;
    var targetElementRect = targetElement.getBoundingClientRect(); // If we check all the possible areas, and there are no valid places for the tooltip, the element
    // must take up most of the screen real estate. Show the tooltip floating in the middle of the screen.

    var calculatedPosition = 'floating';
    /*
     * auto determine position
     */
    // Check for space below

    if (targetElementRect.bottom + tooltipHeight + tooltipHeight > windowSize.height) {
      _removeEntry(possiblePositions, 'bottom');
    } // Check for space above


    if (targetElementRect.top - tooltipHeight < 0) {
      _removeEntry(possiblePositions, 'top');
    } // Check for space to the right


    if (targetElementRect.right + tooltipWidth > windowSize.width) {
      _removeEntry(possiblePositions, 'right');
    } // Check for space to the left


    if (targetElementRect.left - tooltipWidth < 0) {
      _removeEntry(possiblePositions, 'left');
    } // @var {String}  ex: 'right-aligned'


    var desiredAlignment = function (pos) {
      var hyphenIndex = pos.indexOf('-');

      if (hyphenIndex !== -1) {
        // has alignment
        return pos.substr(hyphenIndex);
      }

      return '';
    }(desiredTooltipPosition || ''); // strip alignment from position


    if (desiredTooltipPosition) {
      // ex: "bottom-right-aligned"
      // should return 'bottom'
      desiredTooltipPosition = desiredTooltipPosition.split('-')[0];
    }

    if (possiblePositions.length) {
      if (desiredTooltipPosition !== 'auto' && possiblePositions.indexOf(desiredTooltipPosition) > -1) {
        // If the requested position is in the list, choose that
        calculatedPosition = desiredTooltipPosition;
      } else {
        // Pick the first valid position, in order
        calculatedPosition = possiblePositions[0];
      }
    } // only top and bottom positions have optional alignments


    if (['top', 'bottom'].indexOf(calculatedPosition) !== -1) {
      calculatedPosition += _determineAutoAlignment(targetElementRect.left, tooltipWidth, windowSize, desiredAlignment);
    }

    return calculatedPosition;
  }
  /**
   * auto-determine alignment
   * @param {Integer}  offsetLeft
   * @param {Integer}  tooltipWidth
   * @param {Object}   windowSize
   * @param {String}   desiredAlignment
   * @return {String}  calculatedAlignment
   */


  function _determineAutoAlignment(offsetLeft, tooltipWidth, windowSize, desiredAlignment) {
    var halfTooltipWidth = tooltipWidth / 2,
        winWidth = Math.min(windowSize.width, window.screen.width),
        possibleAlignments = ['-left-aligned', '-middle-aligned', '-right-aligned'],
        calculatedAlignment = ''; // valid left must be at least a tooltipWidth
    // away from right side

    if (winWidth - offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, '-left-aligned');
    } // valid middle must be at least half
    // width away from both sides


    if (offsetLeft < halfTooltipWidth || winWidth - offsetLeft < halfTooltipWidth) {
      _removeEntry(possibleAlignments, '-middle-aligned');
    } // valid right must be at least a tooltipWidth
    // width away from left side


    if (offsetLeft < tooltipWidth) {
      _removeEntry(possibleAlignments, '-right-aligned');
    }

    if (possibleAlignments.length) {
      if (possibleAlignments.indexOf(desiredAlignment) !== -1) {
        // the desired alignment is valid
        calculatedAlignment = desiredAlignment;
      } else {
        // pick the first valid position, in order
        calculatedAlignment = possibleAlignments[0];
      }
    } else {
      // if screen width is too small
      // for ANY alignment, middle is
      // probably the best for visibility
      calculatedAlignment = '-middle-aligned';
    }

    return calculatedAlignment;
  }
  /**
   * Remove an entry from a string array if it's there, does nothing if it isn't there.
   *
   * @param {Array} stringArray
   * @param {String} stringToRemove
   */


  function _removeEntry(stringArray, stringToRemove) {
    if (stringArray.indexOf(stringToRemove) > -1) {
      stringArray.splice(stringArray.indexOf(stringToRemove), 1);
    }
  }
  /**
   * Update the position of the helper layer on the screen
   *
   * @api private
   * @method _setHelperLayerPosition
   * @param {Object} helperLayer
   */


  function _setHelperLayerPosition(helperLayer) {
    var _this = this;

    if (helperLayer) {
      //prevent error when `this._currentStep` in undefined
      if (!this._introItems[this._currentStep]) return;

      var currentElement = this._introItems[this._currentStep],
          elementPosition = _getOffset(currentElement.element),
          widthHeightPadding = this._options.helperElementPadding; // If the target element is fixed, the tooltip should be fixed as well.
      // Otherwise, remove a fixed class that may be left over from the previous
      // step.


      if (_isFixed(currentElement.element)) {
        _addClass(helperLayer, 'introjs-fixedTooltip');
      } else {
        _removeClass(helperLayer, 'introjs-fixedTooltip');
      }

      if (currentElement.position === 'floating') {
        widthHeightPadding = 0;
      } //set new position to helper layer


      helperLayer.style.cssText = 'width: ' + (elementPosition.width + widthHeightPadding) + 'px; ' + 'height:' + (elementPosition.height + widthHeightPadding) + 'px; ' + 'top:' + (elementPosition.top - widthHeightPadding / 2) + 'px;' + 'left: ' + (elementPosition.left - widthHeightPadding / 2) + 'px;';
      window.setTimeout(function () {
        _setClipPathOfHelper.call(_this, helperLayer);
      }, 35);
    }
  }
  /**
   * Add disableinteraction layer and adjust the size and position of the layer
   *
   * @api private
   * @method _disableInteraction
   */


  function _disableInteraction() {
    var disableInteractionLayer = document.querySelector('.introjs-disableInteraction');

    if (disableInteractionLayer === null) {
      disableInteractionLayer = document.createElement('div');
      disableInteractionLayer.className = 'introjs-disableInteraction';

      this._targetElement.appendChild(disableInteractionLayer);
    }

    _setHelperLayerPosition.call(this, disableInteractionLayer);
  }
  /**
   * Setting anchors to behave like buttons
   *
   * @api private
   * @method _setAnchorAsButton
   */


  function _setAnchorAsButton(anchor) {
    anchor.setAttribute('role', 'button');
    anchor.tabIndex = 0;
  }
  /**
   * @api private
   * @method _getDimensions
   */


  function _getDimensions(helper) {
    return {
      width: helper.offsetWidth,
      height: helper.offsetHeight,
      left: helper.offsetLeft,
      top: helper.offsetTop
    };
  }
  /**
   * @api private
   * @method _setClipPathOfHelper
   */


  function _setClipPathOfHelper(helperLayer) {
    // костыль const step = this._introItems[this._currentStep];
    var step = this._introItems[0];
    var overlay = document.querySelector('.introjs-overlay');

    if (step.fixed) {
      var _getDimensions$call = _getDimensions.call(this, helperLayer),
          width = _getDimensions$call.width,
          height = _getDimensions$call.height,
          left = _getDimensions$call.left,
          top = _getDimensions$call.top;

      var coords = [{
        x: '0%',
        y: '0%'
      }, {
        x: '0%',
        y: '100%'
      }, {
        x: left + 'px',
        y: '100%'
      }, {
        x: left + 'px',
        y: top + 'px'
      }, {
        x: left + width + 'px',
        y: top + 'px'
      }, {
        x: left + width + 'px',
        y: top + height + 'px'
      }, {
        x: left + 'px',
        y: top + height + 'px'
      }, {
        x: left + 'px',
        y: '100%'
      }, {
        x: '100%',
        y: '100%'
      }, {
        x: '100%',
        y: '0%'
      }];

      if (overlay) {
        overlay.style.clipPath = "polygon(".concat(coords.map(function (_ref) {
          var x = _ref.x,
              y = _ref.y;
          return x + ' ' + y;
        }).join(', '), ")");
      }

      helperLayer.style.visibility = 'hidden';
    } else {
      overlay.style.clipPath = '';
      helperLayer.style.visibility = 'visible';
    }
  }
  /**
   * Show an element on the page
   *
   * @api private
   * @method _showElement
   * @param {Object} targetElement
   */


  function _showElement(targetElement) {
    if (typeof this._introChangeCallback !== 'undefined') {
      this._introChangeCallback.call(this, targetElement.element);
    }

    var self = this,
        oldHelperLayer = document.querySelector('.introjs-helperLayer'),
        oldReferenceLayer = document.querySelector('.introjs-tooltipReferenceLayer'),
        highlightClass = 'introjs-helperLayer',
        scrollParent; //check for a current step highlight class

    if (typeof targetElement.highlightClass === 'string') {
      highlightClass += ' ' + targetElement.highlightClass;
    } //check for options highlight class


    if (typeof this._options.highlightClass === 'string') {
      highlightClass += ' ' + this._options.highlightClass;
    }

    if (oldHelperLayer !== null) {
      // scroll to element
      scrollParent = _getScrollParent(targetElement.element);

      if (scrollParent !== document.body) {
        // target is within a scrollable element
        _scrollParentToElement(scrollParent, targetElement.element);
      } // set new position to helper layer


      _setHelperLayerPosition.call(self, oldHelperLayer);

      _setHelperLayerPosition.call(self, oldReferenceLayer); //remove `introjs-fixParent` class from the elements


      var fixParents = document.querySelectorAll('.introjs-fixParent');

      _forEach(fixParents, function (parent) {
        _removeClass(parent, /introjs-fixParent/g);
      }); //remove old classes if the element still exist


      _removeShowElement(); //we should wait until the CSS3 transition is competed (it's 0.3 sec) to prevent incorrect `height` and `width` calculation


      if (self._lastShowElementTimer) {
        window.clearTimeout(self._lastShowElementTimer);
      }

      self._lastShowElementTimer = window.setTimeout(function () {
        // change the scroll of the window, if needed
        _scrollTo.call(self, targetElement.scrollTo, targetElement);
      }, 350); // end of old element if-else condition
    } else {
      var helperLayer = document.createElement('div'),
          referenceLayer = document.createElement('div');
      helperLayer.className = highlightClass;
      referenceLayer.className = 'introjs-tooltipReferenceLayer'; // scroll to element

      scrollParent = _getScrollParent(targetElement.element);

      if (scrollParent !== document.body) {
        // target is within a scrollable element
        _scrollParentToElement(scrollParent, targetElement.element);
      } //set new position to helper layer


      _setHelperLayerPosition.call(self, helperLayer);

      _setHelperLayerPosition.call(self, referenceLayer); //add helper layer to target element


      this._targetElement.appendChild(helperLayer);

      this._targetElement.appendChild(referenceLayer); // change the scroll of the window, if needed


      _scrollTo.call(this, targetElement.scrollTo, targetElement); //end of new element if-else condition

    } // removing previous disable interaction layer


    var disableInteractionLayer = self._targetElement.querySelector('.introjs-disableInteraction');

    if (disableInteractionLayer) {
      disableInteractionLayer.parentNode.removeChild(disableInteractionLayer);
    } //disable interaction


    if (targetElement.disableInteraction) {
      _disableInteraction.call(self);
    }

    _setShowElement(targetElement);

    if (typeof this._introAfterChangeCallback !== 'undefined') {
      this._introAfterChangeCallback.call(this, targetElement.element);
    }
  }
  /**
   * To change the scroll of `window` after highlighting an element
   *
   * @api private
   * @method _scrollTo
   * @param {String} scrollTo
   * @param {Object} targetElement
   */


  function _scrollTo(scrollTo, targetElement) {
    if (scrollTo === 'off') return;
    var rect;
    if (!this._options.scrollToElement) return;
    rect = targetElement.element.getBoundingClientRect();

    if (!_elementInViewport(targetElement.element)) {
      var winHeight = _getWinSize().height;

      var top = rect.bottom - (rect.bottom - rect.top); // TODO (afshinm): do we need scroll padding now?
      // I have changed the scroll option and now it scrolls the window to
      // the center of the target element or tooltip.

      if (top < 0 || targetElement.element.clientHeight > winHeight) {
        window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) - this._options.scrollPadding); // 30px padding from edge to look nice
        //Scroll down
      } else {
        window.scrollBy(0, rect.top - (winHeight / 2 - rect.height / 2) + this._options.scrollPadding); // 30px padding from edge to look nice
      }
    }
  }
  /**
   * To remove all show element(s)
   *
   * @api private
   * @method _removeShowElement
   */


  function _removeShowElement() {
    var elms = document.querySelectorAll('.introjs-showElement');

    _forEach(elms, function (elm) {
      _removeClass(elm, /introjs-[a-zA-Z]+/g);
    });
  }
  /**
   * To set the show element
   * This function set a relative (in most cases) position and changes the z-index
   *
   * @api private
   * @method _setShowElement
   * @param {Object} targetElement
   */


  function _setShowElement(targetElement) {
    var parentElm; // we need to add this show element class to the parent of SVG elements
    // because the SVG elements can't have independent z-index

    if (targetElement.element instanceof SVGElement) {
      parentElm = targetElement.element.parentNode;

      while (targetElement.element.parentNode !== null) {
        if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break;

        if (parentElm.tagName.toLowerCase() === 'svg') {
          _addClass(parentElm, 'introjs-showElement introjs-relativePosition');
        }

        parentElm = parentElm.parentNode;
      }
    }

    _addClass(targetElement.element, 'introjs-showElement');

    var currentElementPosition = _getPropValue(targetElement.element, 'position');

    if (currentElementPosition !== 'absolute' && currentElementPosition !== 'relative' && currentElementPosition !== 'fixed') {
      //change to new intro item
      _addClass(targetElement.element, 'introjs-relativePosition');
    }

    parentElm = targetElement.element.parentNode;

    while (parentElm !== null) {
      if (!parentElm.tagName || parentElm.tagName.toLowerCase() === 'body') break; //fix The Stacking Context problem.
      //More detail: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context

      var zIndex = _getPropValue(parentElm, 'z-index');

      var opacity = parseFloat(_getPropValue(parentElm, 'opacity'));

      var transform = _getPropValue(parentElm, 'transform') || _getPropValue(parentElm, '-webkit-transform') || _getPropValue(parentElm, '-moz-transform') || _getPropValue(parentElm, '-ms-transform') || _getPropValue(parentElm, '-o-transform');

      if (/[0-9]+/.test(zIndex) || opacity < 1 || transform !== 'none' && transform !== undefined) {
        _addClass(parentElm, 'introjs-fixParent');
      }

      parentElm = parentElm.parentNode;
    }
  }
  /**
   * Iterates arrays
   *
   * @param {Array} arr
   * @param {Function} forEachFnc
   * @param {Function} completeFnc
   * @return {Null}
   */


  function _forEach(arr, forEachFnc, completeFnc) {
    // in case arr is an empty query selector node list
    if (arr) {
      for (var i = 0, len = arr.length; i < len; i++) {
        forEachFnc(arr[i], i);
      }
    }

    if (typeof completeFnc === 'function') {
      completeFnc();
    }
  }
  /**
   * Mark any object with an incrementing number
   * used for keeping track of objects
   *
   * @param Object obj   Any object or DOM Element
   * @param String key
   * @return Object
   */


  var _stamp = function () {
    var keys = {};
    return function stamp(obj, key) {
      // get group key
      key = key || 'introjs-stamp'; // each group increments from 0

      keys[key] = keys[key] || 0; // stamp only once per object

      if (obj[key] === undefined) {
        // increment key for each new object
        obj[key] = keys[key]++;
      }

      return obj[key];
    };
  }();
  /**
   * DOMEvent Handles all DOM events
   *
   * methods:
   *
   * on - add event handler
   * off - remove event
   */


  var DOMEvent = function () {
    function DOMEvent() {
      var events_key = 'introjs_event';
      /**
       * Gets a unique ID for an event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @return String
       */

      this._id = function (obj, type, listener, context) {
        return type + _stamp(listener) + (context ? '_' + _stamp(context) : '');
      };
      /**
       * Adds event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @param Boolean useCapture
       * @return null
       */


      this.on = function (obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments),
            handler = function handler(e) {
          return listener.call(context || obj, e || window.event);
        };

        if ('addEventListener' in obj) {
          obj.addEventListener(type, handler, useCapture);
        } else if ('attachEvent' in obj) {
          obj.attachEvent('on' + type, handler);
        }

        obj[events_key] = obj[events_key] || {};
        obj[events_key][id] = handler;
      };
      /**
       * Removes event listener
       *
       * @param Object obj
       * @param String type        event type
       * @param Function listener
       * @param Object context
       * @param Boolean useCapture
       * @return null
       */


      this.off = function (obj, type, listener, context, useCapture) {
        var id = this._id.apply(this, arguments),
            handler = obj[events_key] && obj[events_key][id];

        if (!handler) {
          return;
        }

        if ('removeEventListener' in obj) {
          obj.removeEventListener(type, handler, useCapture);
        } else if ('detachEvent' in obj) {
          obj.detachEvent('on' + type, handler);
        }

        obj[events_key][id] = null;
      };
    }

    return new DOMEvent();
  }();
  /**
   * Append a class to an element
   *
   * @api private
   * @method _addClass
   * @param {Object} element
   * @param {String} className
   * @returns null
   */


  function _addClass(element, className) {
    if (element instanceof SVGElement) {
      // svg
      var pre = element.getAttribute('class') || '';
      element.setAttribute('class', pre + ' ' + className);
    } else {
      if (element.classList !== undefined) {
        // check for modern classList property
        var classes = className.split(' ');

        _forEach(classes, function (cls) {
          element.classList.add(cls);
        });
      } else if (!element.className.match(className)) {
        // check if element doesn't already have className
        element.className += ' ' + className;
      }
    }
  }
  /**
   * Remove a class from an element
   *
   * @api private
   * @method _removeClass
   * @param {Object} element
   * @param {RegExp|String} classNameRegex can be regex or string
   * @returns null
   */


  function _removeClass(element, classNameRegex) {
    if (element instanceof SVGElement) {
      var pre = element.getAttribute('class') || '';
      element.setAttribute('class', pre.replace(classNameRegex, '').replace(/^\s+|\s+$/g, ''));
    } else {
      element.className = element.className.replace(classNameRegex, '').replace(/^\s+|\s+$/g, '');
    }
  }
  /**
   * Get an element CSS property on the page
   * Thanks to JavaScript Kit: http://www.javascriptkit.com/dhtmltutors/dhtmlcascade4.shtml
   *
   * @api private
   * @method _getPropValue
   * @param {Object} element
   * @param {String} propName
   * @returns Element's property value
   */


  function _getPropValue(element, propName) {
    var propValue = '';

    if (element.currentStyle) {
      //IE
      propValue = element.currentStyle[propName];
    } else if (document.defaultView && document.defaultView.getComputedStyle) {
      //Others
      propValue = document.defaultView.getComputedStyle(element, null).getPropertyValue(propName);
    } //Prevent exception in IE


    if (propValue && propValue.toLowerCase) {
      return propValue.toLowerCase();
    } else {
      return propValue;
    }
  }
  /**
   * Checks to see if target element (or parents) position is fixed or not
   *
   * @api private
   * @method _isFixed
   * @param {Object} element
   * @returns Boolean
   */


  function _isFixed(element) {
    var p = element.parentNode;

    if (!p || p.nodeName === 'HTML') {
      return false;
    }

    if (_getPropValue(element, 'position') === 'fixed') {
      return true;
    }

    return _isFixed(p);
  }
  /**
   * Provides a cross-browser way to get the screen dimensions
   * via: http://stackoverflow.com/questions/5864467/internet-explorer-innerheight
   *
   * @api private
   * @method _getWinSize
   * @returns {Object} width and height attributes
   */


  function _getWinSize() {
    if (window.innerWidth !== undefined) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    } else {
      var D = document.documentElement;
      return {
        width: D.clientWidth,
        height: D.clientHeight
      };
    }
  }
  /**
   * Check to see if the element is in the viewport or not
   * http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
   *
   * @api private
   * @method _elementInViewport
   * @param {Object} el
   */


  function _elementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom + 80 <= window.innerHeight && // add 80 to get the text right
    rect.right <= window.innerWidth;
  }
  /**
   * Add overlay layer to the page
   *
   * @api private
   * @method _addOverlayLayer
   * @param {Object} targetElm
   */


  function _addOverlayLayer(targetElm) {
    var overlayLayer = document.createElement('div'),
        styleText = '',
        self = this; //set css class name

    overlayLayer.className = 'introjs-overlay'; //check if the target element is body, we should calculate the size of overlay layer in a better way

    if (!targetElm.tagName || targetElm.tagName.toLowerCase() === 'body') {
      styleText += 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
      overlayLayer.style.cssText = styleText;
    } else {
      //set overlay layer position
      var elementPosition = _getOffset(targetElm);

      if (elementPosition) {
        styleText += 'width: ' + elementPosition.width + 'px; height:' + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
        overlayLayer.style.cssText = styleText;
      }
    }

    targetElm.appendChild(overlayLayer);

    overlayLayer.onclick = function () {
      if (self._options.exitOnOverlayClick === true) {
        _exitIntro.call(self, targetElm);
      }
    };

    window.setTimeout(function () {
      styleText += 'opacity: ' + self._options.overlayOpacity.toString() + ';';
      overlayLayer.style.cssText = styleText;
    }, 10);
    return true;
  }
  /**
   * Get an element position on the page
   * Thanks to `meouw`: http://stackoverflow.com/a/442474/375966
   *
   * @api private
   * @method _getOffset
   * @param {Object} element
   * @returns Element's position info
   */


  function _getOffset(element) {
    var body = document.body;
    var docEl = document.documentElement;
    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    var x = element.getBoundingClientRect();
    return {
      top: x.top + scrollTop,
      width: x.width,
      height: x.height,
      left: x.left + scrollLeft
    };
  }
  /**
   * Find the nearest scrollable parent
   * copied from https://stackoverflow.com/questions/35939886/find-first-scrollable-parent
   *
   * @param Element element
   * @return Element
   */


  function _getScrollParent(element) {
    var style = window.getComputedStyle(element);
    var excludeStaticParent = style.position === 'absolute';
    var overflowRegex = /(auto|scroll)/;
    if (style.position === 'fixed') return document.body;

    for (var parent = element; parent = parent.parentElement;) {
      style = window.getComputedStyle(parent);

      if (excludeStaticParent && style.position === 'static') {
        continue;
      }

      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) return parent;
    }

    return document.body;
  }
  /**
   * scroll a scrollable element to a child element
   *
   * @param Element parent
   * @param Element element
   * @return Null
   */


  function _scrollParentToElement(parent, element) {
    parent.scrollTop = element.offsetTop - parent.offsetTop;
  }
  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */


  function _mergeOptions(obj1, obj2) {
    var obj3 = {},
        attrname;

    for (attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }

    for (attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }

    return obj3;
  }

  var introJs = function introJs(targetElm) {
    var instance;

    if (_typeof(targetElm) === 'object') {
      //Ok, create a new instance
      instance = new IntroJs(targetElm);
    } else if (typeof targetElm === 'string') {
      //select the target element with query selector
      var targetElement = document.querySelector(targetElm);

      if (targetElement) {
        instance = new IntroJs(targetElement);
      } else {
        throw new Error('There is no element with given selector.');
      }
    } else {
      instance = new IntroJs(document.body);
    } // add instance to list of _instances
    // passing group to _stamp to increment
    // from 0 onward somewhat reliably


    introJs.instances[_stamp(instance, 'introjs-instance')] = instance;
    return instance;
  };
  /**
   * Current IntroJs version
   *
   * @property version
   * @type String
   */


  introJs.version = VERSION;
  /**
   * key-val object helper for introJs instances
   *
   * @property instances
   * @type Object
   */

  introJs.instances = {}; //Prototype

  introJs.fn = IntroJs.prototype = {
    clone: function clone() {
      return new IntroJs(this);
    },
    setOption: function setOption(option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function setOptions(options) {
      this._options = _mergeOptions(this._options, options);
      return this;
    },
    start: function start(selector) {
      _introForElement.call(this, this._targetElement, selector);

      return this;
    },
    goToStep: function goToStep(step) {
      _goToStep.call(this, step);

      return this;
    },
    addStep: function addStep(options) {
      if (!this._options.steps) {
        this._options.steps = [];
      }

      this._options.steps.push(options);

      return this;
    },
    goToStepNumber: function goToStepNumber(step) {
      _goToStepNumber.call(this, step);

      return this;
    },
    nextStep: function nextStep() {
      _nextStep.call(this);

      return this;
    },
    exit: function exit(force) {
      _exitIntro.call(this, this._targetElement, force);

      return this;
    },
    refresh: function refresh() {
      _refresh.call(this);

      return this;
    },
    onbeforechange: function onbeforechange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introBeforeChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onbeforechange was not a function');
      }

      return this;
    },
    onchange: function onchange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onchange was not a function.');
      }

      return this;
    },
    onafterchange: function onafterchange(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introAfterChangeCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onafterchange was not a function');
      }

      return this;
    },
    oncomplete: function oncomplete(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introCompleteCallback = providedCallback;
      } else {
        throw new Error('Provided callback for oncomplete was not a function.');
      }

      return this;
    },
    onexit: function onexit(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onexit was not a function.');
      }

      return this;
    },
    onbeforeexit: function onbeforeexit(providedCallback) {
      if (typeof providedCallback === 'function') {
        this._introBeforeExitCallback = providedCallback;
      } else {
        throw new Error('Provided callback for onbeforeexit was not a function.');
      }

      return this;
    }
  };
  return introJs;
});

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showError = showError;
exports.loadCss = loadCss;
exports.default = void 0;

/**
 * Вывод ошибок в консоль
 * @param {String} msg
 */
function showError(msg) {
  // eslint-disable-next-line no-console
  console.error(msg);
}

function loadCss(path) {
  var head = document.getElementsByTagName('HEAD')[0];
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = path;
  head.appendChild(link);
}

var utils = {
  showError: showError,
  loadCss: loadCss
};
var _default = utils;
exports.default = _default;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0b3VyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9nZXR0b3VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dldHRvdXIvLi9zcmMvQ2hhbmdlc0xpc3RlbmVyLmpzIiwid2VicGFjazovL2dldHRvdXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2V0dG91ci8uL3NyYy9pbnRyby1jaGF0LmpzIiwid2VicGFjazovL2dldHRvdXIvLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiX19pc05hdGl2ZUV2ZW50IiwiZXZlbnQiLCJkZWZhdWx0RXZlbnRzIiwiaW5kZXhPZiIsIkNoYW5nZXNMaXN0ZW5lciIsImxpc3RlbmVyX2lkIiwic2VsZWN0b3IiLCJhdHRyaWJ1dGVOYW1lIiwiX190b3VyT2JqZWN0IiwidG91ckpzIiwiaXNCb2R5IiwiY29uZmlnIiwiYXR0cmlidXRlcyIsImNoaWxkTGlzdCIsImNoYXJhY3RlckRhdGEiLCJ0YXJnZXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjYWxsYmFjayIsIm5hdGl2ZUNsaWNrTGlzdGVuZXIiLCJiaW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5hdGl2ZUV2ZW50TGlzdGVuZXIiLCJib2R5Iiwic3VidHJlZSIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uU2hvd0NhbGxiYWNrIiwiSW50ZXJzZWN0aW9uSGlkZUNhbGxiYWNrIiwiY2xhc3NDaGFuZ2VDYWxsYmFjayIsImF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrIiwiT2JqZWN0IiwiYXNzaWduIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJjaGFyYWN0ZXJEYXRhT2xkVmFsdWUiLCJjaGFyYWN0ZXJEYXRhQ2hhbmdlQ2FsbGJhY2siLCJjaGlsZHJlbkNoYW5nZUNhbGxiYWNrIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiY29udGV4dCIsImZvckVhY2giLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwiX19vYnNlcnZlcnMiLCJvYnNlcnZlIiwic2hvd0NhbGxiYWNrIiwiaGlkZUNhbGxiYWNrIiwiZGlzY29ubmVjdExpc3RlbmVyIiwibGlzdGVuZXIiLCJkaXNjb25uZWN0Iiwic2VuZE1lc3NhZ2UiLCJqc0V2ZW50IiwibWF0Y2hlcyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjaGFuZ2VMaXN0ZW5lciIsImlzSW50ZXJzZWN0aW5nIiwiaW50ZXJzZWN0aW9uUmF0aW8iLCJ0eXBlIiwiYWRkZWROb2RlcyIsImxlbmd0aCIsImVsIiwiaXNTYW1lTm9kZSIsInJlbW92ZWROb2RlcyIsIm5vZGUiLCJub2RlVHlwZSIsInZhbCIsInNldE9wdGlvbnMiLCJvcHRpb25zIiwiX19pbnRybyIsImlzQW55UGFydE9mRWxlbWVudEluVmlld3BvcnQiLCJzY3JvbGwiLCJ3aW5kb3ciLCJzY3JvbGxZIiwicGFnZVlPZmZzZXQiLCJib3VuZHNUb3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJ2aWV3cG9ydCIsImJvdHRvbSIsImlubmVySGVpZ2h0IiwiYm91bmRzIiwiY2xpZW50SGVpZ2h0IiwiaXNNZXNzYWdlRnJvbVdpZGdldCIsIm9yaWdpbiIsImRhdGEiLCJzb3VyY2UiLCJvbmJvYXJkaW5nIiwic3R5bGVzRmlsZVBhdGgiLCJleHBhbmRDbGFzcyIsImFjdGl2ZSIsIndpZGdldEhhc2giLCJhdXRvU2hvd0NvbmRpdGlvbnMiLCJoYXNoIiwiZG9tYWluIiwiYmxvY2siLCJzdHlsZXNMb2FkZWQiLCJlbnYiLCJpbml0Iiwic2VsZiIsImxvYWRXaWRnZXREYXRhIiwidGhlbiIsIndpZGdldF9hY3RpdmUiLCJjb25kaXRpb25zIiwibG9jYXRpb24iLCJob3N0Iiwib25jaGFuZ2UiLCJyZWZyZXNoIiwib25iZWZvcmVjaGFuZ2UiLCJfaW50cm9JdGVtcyIsInN0ZXAiLCJjbG9zZUJ0biIsInN0eWxlIiwiZGlzcGxheSIsIm9uZXhpdCIsIl9fbGlzdGVuRm9ySGlnaGxpZ2h0UmVxdWVzdHMiLCJjYWxsIiwiX19saXN0ZW5Gb3JBY3Rpb25DbGlja2VkUmVxdWVzdHMiLCJfX2xpc3RlbkZvck9ic2VydmVSZXF1ZXN0cyIsImxvYWRDb25kaXRpb24iLCJsaXN0ZW5Gb3JMb2NhdGlvbkNoYW5nZSIsImNvbmQiLCJyZWdleCIsIlJlZ0V4cCIsInVybFJlZ2V4IiwidGVzdCIsInBhdGhuYW1lIiwic2V0VGltZW91dCIsInJlbmRlcldpZGdldCIsInNyYyIsImxvYWRTdHlsZXMiLCJpbml0RXZlbnRMaXN0ZW5lcnMiLCJ0aW1lSW50ZXJ2YWwiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiZiIsInJldCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwicmVwbGFjZVN0YXRlIiwicmVzZXQiLCJlIiwiYWN0aW9uIiwiYW5zd2VyX2lkIiwiX29wdGlvbnMiLCJzdGVwcyIsImhpZ2hsaWdodEV2ZW50QW5zd2VySWQiLCJleGl0IiwiaGlnaGxpZ2h0IiwiX19nZXRFbGVtZW50Rm9ySGlnaGxpZ2h0IiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbWVudHNBcnJheSIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJjbG9zZUV2ZW50IiwiZWxlbWVudCIsImZpeGVkIiwiaW50cm9FbGVtZW50IiwiZXhpdE9uRXNjIiwiZXhpdE9uT3ZlcmxheUNsaWNrIiwiZGlzYWJsZUludGVyYWN0aW9uIiwiYWRkU3RlcCIsIm9uY2UiLCJnb1RvU3RlcE51bWJlciIsInN0YXJ0IiwibXNnIiwiaWZyYW1lIiwiY29udGVudFdpbmRvdyIsInBvc3RNZXNzYWdlIiwiZGVzdHJveVdpZGdldCIsInJlbW92ZSIsIndpZGdldFVybCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ3aWRnZXRIdG1sIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCIkY2xvc2VCdG4iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImhpZGVCbG9jayIsImV4cGFuZEJsb2NrIiwiJGljb24iLCJjaGlsZHJlbiIsImFkZCIsInVybCIsInJlcGxhY2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImZldGNoIiwibWV0aG9kIiwiY3JlZGVudGlhbHMiLCJoZWFkZXJzIiwibW9kZSIsImNhY2hlIiwiZGF0YVR5cGUiLCJyZXMiLCJzdGF0dXMiLCJqc29uIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlIiwiY2F0Y2giLCJlcnJvciIsImV4cG9ydHMiLCJtb2R1bGUiLCJpbnRyb0pzIiwiY29uc29sZSIsIndhcm4iLCJkZWZpbmUiLCJWRVJTSU9OIiwiSW50cm9KcyIsIm9iaiIsIl90YXJnZXRFbGVtZW50IiwiaGlnaGxpZ2h0Q2xhc3MiLCJrZXlib2FyZE5hdmlnYXRpb24iLCJzY3JvbGxUb0VsZW1lbnQiLCJzY3JvbGxUbyIsInNjcm9sbFBhZGRpbmciLCJvdmVybGF5T3BhY2l0eSIsInBvc2l0aW9uUHJlY2VkZW5jZSIsImhlbHBlckVsZW1lbnRQYWRkaW5nIiwiYnV0dG9uQ2xhc3MiLCJfaW50cm9Gb3JFbGVtZW50IiwidGFyZ2V0RWxtIiwiaW50cm9JdGVtcyIsImN1cnJlbnRJdGVtIiwiX2Nsb25lT2JqZWN0IiwiZmxvYXRpbmdFbGVtZW50UXVlcnkiLCJwb3NpdGlvbiIsIl9hZGRPdmVybGF5TGF5ZXIiLCJfbmV4dFN0ZXAiLCJET01FdmVudCIsIm9uIiwiX29uS2V5RG93biIsIl9vblJlc2l6ZSIsImNvZGUiLCJ3aGljaCIsImNoYXJDb2RlIiwia2V5Q29kZSIsIl9leGl0SW50cm8iLCJvYmplY3QiLCJ0ZW1wIiwia2V5IiwialF1ZXJ5IiwiX2dvVG9TdGVwIiwiX2N1cnJlbnRTdGVwIiwiX2dvVG9TdGVwTnVtYmVyIiwiX2N1cnJlbnRTdGVwTnVtYmVyIiwiX2RpcmVjdGlvbiIsIl9mb3JFYWNoIiwiaXRlbSIsImkiLCJ1bmRlZmluZWQiLCJuZXh0U3RlcCIsImNvbnRpbnVlU3RlcCIsIl9pbnRyb0JlZm9yZUNoYW5nZUNhbGxiYWNrIiwiX2ludHJvQ29tcGxldGVDYWxsYmFjayIsIl9zaG93RWxlbWVudCIsIl9yZWZyZXNoIiwiX3NldEhlbHBlckxheWVyUG9zaXRpb24iLCJ0YXJnZXRFbGVtZW50IiwiZm9yY2UiLCJjb250aW51ZUV4aXQiLCJfaW50cm9CZWZvcmVFeGl0Q2FsbGJhY2siLCJvdmVybGF5TGF5ZXJzIiwib3ZlcmxheUxheWVyIiwib3BhY2l0eSIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImhlbHBlckxheWVyIiwicmVmZXJlbmNlTGF5ZXIiLCJkaXNhYmxlSW50ZXJhY3Rpb25MYXllciIsImZsb2F0aW5nRWxlbWVudCIsIl9yZW1vdmVTaG93RWxlbWVudCIsImZpeFBhcmVudHMiLCJwYXJlbnQiLCJfcmVtb3ZlQ2xhc3MiLCJvZmYiLCJfaW50cm9FeGl0Q2FsbGJhY2siLCJfY2hlY2tSaWdodCIsInRhcmdldE9mZnNldCIsInRvb2x0aXBMYXllclN0eWxlTGVmdCIsInRvb2x0aXBPZmZzZXQiLCJ3aW5kb3dTaXplIiwidG9vbHRpcExheWVyIiwibGVmdCIsIndpZHRoIiwiX2NoZWNrTGVmdCIsInRvb2x0aXBMYXllclN0eWxlUmlnaHQiLCJyaWdodCIsIl9kZXRlcm1pbmVBdXRvUG9zaXRpb24iLCJkZXNpcmVkVG9vbHRpcFBvc2l0aW9uIiwicG9zc2libGVQb3NpdGlvbnMiLCJzbGljZSIsIl9nZXRXaW5TaXplIiwidG9vbHRpcEhlaWdodCIsIl9nZXRPZmZzZXQiLCJoZWlnaHQiLCJ0b29sdGlwV2lkdGgiLCJ0YXJnZXRFbGVtZW50UmVjdCIsImNhbGN1bGF0ZWRQb3NpdGlvbiIsIl9yZW1vdmVFbnRyeSIsImRlc2lyZWRBbGlnbm1lbnQiLCJwb3MiLCJoeXBoZW5JbmRleCIsInN1YnN0ciIsInNwbGl0IiwiX2RldGVybWluZUF1dG9BbGlnbm1lbnQiLCJvZmZzZXRMZWZ0IiwiaGFsZlRvb2x0aXBXaWR0aCIsIndpbldpZHRoIiwiTWF0aCIsIm1pbiIsInNjcmVlbiIsInBvc3NpYmxlQWxpZ25tZW50cyIsImNhbGN1bGF0ZWRBbGlnbm1lbnQiLCJzdHJpbmdBcnJheSIsInN0cmluZ1RvUmVtb3ZlIiwic3BsaWNlIiwiY3VycmVudEVsZW1lbnQiLCJlbGVtZW50UG9zaXRpb24iLCJ3aWR0aEhlaWdodFBhZGRpbmciLCJfaXNGaXhlZCIsIl9hZGRDbGFzcyIsImNzc1RleHQiLCJfc2V0Q2xpcFBhdGhPZkhlbHBlciIsIl9kaXNhYmxlSW50ZXJhY3Rpb24iLCJfc2V0QW5jaG9yQXNCdXR0b24iLCJhbmNob3IiLCJzZXRBdHRyaWJ1dGUiLCJ0YWJJbmRleCIsIl9nZXREaW1lbnNpb25zIiwiaGVscGVyIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvZmZzZXRUb3AiLCJvdmVybGF5IiwiY29vcmRzIiwieCIsInkiLCJjbGlwUGF0aCIsIm1hcCIsImpvaW4iLCJ2aXNpYmlsaXR5IiwiX2ludHJvQ2hhbmdlQ2FsbGJhY2siLCJvbGRIZWxwZXJMYXllciIsIm9sZFJlZmVyZW5jZUxheWVyIiwic2Nyb2xsUGFyZW50IiwiX2dldFNjcm9sbFBhcmVudCIsIl9zY3JvbGxQYXJlbnRUb0VsZW1lbnQiLCJfbGFzdFNob3dFbGVtZW50VGltZXIiLCJjbGVhclRpbWVvdXQiLCJfc2Nyb2xsVG8iLCJfc2V0U2hvd0VsZW1lbnQiLCJfaW50cm9BZnRlckNoYW5nZUNhbGxiYWNrIiwicmVjdCIsIl9lbGVtZW50SW5WaWV3cG9ydCIsIndpbkhlaWdodCIsInNjcm9sbEJ5IiwiZWxtcyIsImVsbSIsInBhcmVudEVsbSIsIlNWR0VsZW1lbnQiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJjdXJyZW50RWxlbWVudFBvc2l0aW9uIiwiX2dldFByb3BWYWx1ZSIsInpJbmRleCIsInBhcnNlRmxvYXQiLCJ0cmFuc2Zvcm0iLCJhcnIiLCJmb3JFYWNoRm5jIiwiY29tcGxldGVGbmMiLCJsZW4iLCJfc3RhbXAiLCJrZXlzIiwic3RhbXAiLCJldmVudHNfa2V5IiwiX2lkIiwidXNlQ2FwdHVyZSIsImlkIiwiaGFuZGxlciIsImF0dGFjaEV2ZW50IiwiZGV0YWNoRXZlbnQiLCJwcmUiLCJnZXRBdHRyaWJ1dGUiLCJjbGFzc2VzIiwiY2xzIiwibWF0Y2giLCJjbGFzc05hbWVSZWdleCIsInByb3BOYW1lIiwicHJvcFZhbHVlIiwiY3VycmVudFN0eWxlIiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInAiLCJub2RlTmFtZSIsImlubmVyV2lkdGgiLCJEIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJzdHlsZVRleHQiLCJvbmNsaWNrIiwidG9TdHJpbmciLCJkb2NFbCIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsImV4Y2x1ZGVTdGF0aWNQYXJlbnQiLCJvdmVyZmxvd1JlZ2V4IiwicGFyZW50RWxlbWVudCIsIm92ZXJmbG93Iiwib3ZlcmZsb3dZIiwib3ZlcmZsb3dYIiwiX21lcmdlT3B0aW9ucyIsIm9iajEiLCJvYmoyIiwib2JqMyIsImF0dHJuYW1lIiwiaW5zdGFuY2UiLCJFcnJvciIsImluc3RhbmNlcyIsInZlcnNpb24iLCJmbiIsInByb3RvdHlwZSIsImNsb25lIiwic2V0T3B0aW9uIiwib3B0aW9uIiwidmFsdWUiLCJnb1RvU3RlcCIsInB1c2giLCJwcm92aWRlZENhbGxiYWNrIiwib25hZnRlcmNoYW5nZSIsIm9uY29tcGxldGUiLCJvbmJlZm9yZWV4aXQiLCJzaG93RXJyb3IiLCJsb2FkQ3NzIiwicGF0aCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxpbmsiLCJyZWwiLCJocmVmIiwidXRpbHMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FB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TCxHQUFXLFlBQVg7QUFFQUQsTUFBSSxDQUFDcFksSUFBTCxHQUFZLFVBQVo7QUFFQW9ZLE1BQUksQ0FBQ0UsSUFBTCxHQUFZTCxJQUFaO0FBQ0FDLE1BQUksQ0FBQ3hRLFdBQUwsQ0FBaUIwUSxJQUFqQjtBQUNEOztBQUNELElBQU1HLEtBQUssR0FBRztBQUNaUixXQUFTLEVBQVRBLFNBRFk7QUFFWkMsU0FBTyxFQUFQQTtBQUZZLENBQWQ7ZUFLZU8sSyIsImZpbGUiOiJnZXR0b3VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJnZXR0b3VyXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImdldHRvdXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZ2V0dG91clwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cbi8qIGdsb2JhbCBNdXRhdGlvbk9ic2VydmVyICovXG4vKiBnbG9iYWwgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgKi9cbi8qIGdsb2JhbCBkb2N1bWVudCAqL1xuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBfX2lzTmF0aXZlRXZlbnQoZXZlbnQpIHtcbiAgY29uc3QgZGVmYXVsdEV2ZW50cyA9IFsnY2xpY2snLCAnbW91c2VvdmVyJywgJ21vdXNlb3V0JywgJ2tleXVwJywgJ2tleXByZXNzJywgJ2NoYW5nZScsICdmb2N1cycsICdzdWJtaXQnXTtcblxuICByZXR1cm4gZGVmYXVsdEV2ZW50cy5pbmRleE9mKGV2ZW50KSA+IC0xO1xufVxuXG5jbGFzcyBDaGFuZ2VzTGlzdGVuZXIge1xuICBjb25zdHJ1Y3Rvcih7IGxpc3RlbmVyX2lkLCBzZWxlY3RvciwgZXZlbnQsIGF0dHJpYnV0ZU5hbWUgfSkge1xuICAgIHRoaXMuX190b3VyT2JqZWN0ID0gbnVsbDtcbiAgICB0aGlzLmxpc3RlbmVyX2lkID0gbGlzdGVuZXJfaWQ7XG4gICAgdGhpcy5zZWxlY3RvciA9IHNlbGVjdG9yO1xuICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICB0aGlzLmF0dHJpYnV0ZU5hbWUgPSBhdHRyaWJ1dGVOYW1lO1xuICB9XG5cbiAgZ2V0IHRvdXJKcygpIHtcbiAgICByZXR1cm4gdGhpcy5fX3RvdXJPYmplY3Q7XG4gIH1cblxuICBzZXQgdG91ckpzKHZhbCkge1xuICAgIHRoaXMuX190b3VyT2JqZWN0ID0gdmFsO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZiAodGhpcy50b3VySnMgPT0gbnVsbCkge1xuICAgICAgc2hvd0Vycm9yKCfQodC/0LXRgNCy0LAg0LfQsNC00LDQudGC0LUg0LfQvdCw0YfQtdC90LjQtSB0b3VySnMnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGlzQm9keSA9IGZhbHNlO1xuICAgIGNvbnN0IHsgZXZlbnQgfSA9IHRoaXM7XG4gICAgLy8g0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGPINC90LDRiNC10LPQviBvYnNlcnZlcjpcbiAgICBsZXQgY29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IGZhbHNlIH07XG4gICAgLy8g0LLRi9Cx0LjRgNCw0LXQvCDRhtC10LvQtdCy0L7QuSDRjdC70LXQvNC10L3RglxuICAgIGxldCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2VsZWN0b3IpO1xuXG4gICAgaWYgKF9faXNOYXRpdmVFdmVudChldmVudCkpIHtcbiAgICAgIC8vINCe0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwXG4gICAgICBpZiAoZXZlbnQgPT09ICdjbGljaycpIHtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IHRoaXMubmF0aXZlQ2xpY2tMaXN0ZW5lci5iaW5kKHRoaXMpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgIC8vINCe0LHRgNCw0LHQvtGC0LrQsCDQvtGB0YLQsNC70YzQvdC+0LPQvlxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gdGhpcy5uYXRpdmVFdmVudExpc3RlbmVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLmNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgIHNob3dFcnJvcign0J7RiNC40LHQutCwOiDQrdC70LXQvNC10L3RgiDQvtGC0YHRg9GC0YHRgtCy0YPQtdGCINCyIERPTScpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8g0JXRgdC70Lgg0Y3Qu9C10LzQtdC90YIg0L3QtSDQvdCw0LnQtNC10L0g0LIgRE9NINC00LXRgNC10LLQtVxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgY29uZmlnLnN1YnRyZWUgPSB0cnVlO1xuICAgICAgaXNCb2R5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoaXNCb2R5ID09PSBmYWxzZSkge1xuICAgICAgbGV0IG9ic2VydmVyO1xuICAgICAgbGV0IGNhbGxiYWNrO1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgIGNhc2UgJ3Nob3cnOlxuICAgICAgICAgIGNhbGxiYWNrID0gdGhpcy5JbnRlcnNlY3Rpb25TaG93Q2FsbGJhY2s7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2hpZGUnOlxuICAgICAgICAgIGNhbGxiYWNrID0gdGhpcy5JbnRlcnNlY3Rpb25IaWRlQ2FsbGJhY2s7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NsYXNzX2NoYW5nZSc6XG4gICAgICAgICAgY2FsbGJhY2sgPSB0aGlzLmNsYXNzQ2hhbmdlQ2FsbGJhY2s7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2F0dHJfY2hhbmdlJzpcbiAgICAgICAgICBjYWxsYmFjayA9IHRoaXMuYXR0cmlidXRlQ2hhbmdlQ2FsbGJhY2s7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RleHRfY2hhbmdlJzpcbiAgICAgICAgICBjb25maWcgPSBPYmplY3QuYXNzaWduKGNvbmZpZywge1xuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IHRydWUsXG4gICAgICAgICAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGFPbGRWYWx1ZTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNhbGxiYWNrID0gdGhpcy5jaGFyYWN0ZXJEYXRhQ2hhbmdlQ2FsbGJhY2s7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2NoaWxkcmVuX2NoYW5nZSc6XG4gICAgICAgICAgY29uZmlnLnN1YnRyZWUgPSB0cnVlO1xuICAgICAgICAgIGNhbGxiYWNrID0gdGhpcy5jaGlsZHJlbkNoYW5nZUNhbGxiYWNrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHNob3dFcnJvcihg0J3QtSDQv9C+0L/QsNC7INC/0L7QtCDRg9GB0LvQvtCy0LjRjzogJHt0aGlzLnNlbGVjdG9yfSAtICR7ZXZlbnR9YCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICAvLyBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBzaG93RXJyb3IoJ0NhbGxiYWNrINGE0YPQvdC60YbQuNGPINC90LUg0L7Qv9GA0LXQtNC10LvQtdC90LAhJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8g0LXRgdC70Lgg0LjRgdC/0L7Qu9GM0LfRg9C10YLRgdGPIEludGVyc2VjdGlvbk9ic2VydmVyXG4gICAgICBpZiAoWydzaG93JywgJ2hpZGUnXS5pbmRleE9mKGV2ZW50KSA+IC0xKSB7XG4gICAgICAgIG9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgZW50cmllcy5mb3JFYWNoKGNhbGxiYWNrLmJpbmQoY29udGV4dCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vINCV0YHQu9C4INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyBNdXRhdGlvbk9ic2VydmVyXG4gICAgICAgIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgY29udGV4dCkgPT4ge1xuICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGNhbGxiYWNrLmJpbmQoY29udGV4dCkpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMudG91ckpzLl9fb2JzZXJ2ZXJzW3RoaXMubGlzdGVuZXJfaWRdID0gb2JzZXJ2ZXI7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8g0YHQvtC30LTQsNGR0Lwg0Y3QutC30LXQvNC/0LvRj9GAIE11dGF0aW9uT2JzZXJ2ZXJcbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucywgY29udGV4dCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50KSB7XG4gICAgICAgICAgY2FzZSAnc2hvdyc6XG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaCh0aGlzLnNob3dDYWxsYmFjay5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2hpZGUnOlxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2godGhpcy5oaWRlQ2FsbGJhY2suYmluZChjb250ZXh0KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc2hvd0Vycm9yKGDQndC1INC/0L7Qv9Cw0Lsg0L/QvtC0INGD0YHQu9C+0LLQuNGPOiAke3RoaXMuc2VsZWN0b3J9IC0gJHt0aGlzLmV2ZW50fWApO1xuICAgICAgICAgICAgdGhpcy5kaXNjb25uZWN0TGlzdGVuZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8g0L/QtdGA0LXQtNCw0ZHQvCDQsiDQutCw0YfQtdGB0YLQstC1INCw0YDQs9GD0LzQtdC90YLQvtCyINGG0LXQu9C10LLQvtC5INGN0LvQtdC80LXQvdGCINC4INC10LPQviDQutC+0L3RhNC40LPRg9GA0LDRhtC40Y5cbiAgICAgIHRoaXMudG91ckpzLl9fb2JzZXJ2ZXJzW3RoaXMubGlzdGVuZXJfaWRdID0gb2JzZXJ2ZXI7XG4gICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIGRpc2Nvbm5lY3RMaXN0ZW5lcigpIHtcbiAgICBjb25zdCBsaXN0ZW5lciA9IHRoaXMudG91ckpzLl9fb2JzZXJ2ZXJzW3RoaXMubGlzdGVuZXJfaWRdO1xuXG4gICAgaWYgKCFsaXN0ZW5lcikge1xuICAgICAgc2hvd0Vycm9yKGBMaXN0ZW5lciDRgSBpZCAke3RoaXMubGlzdGVuZXJfaWR9INC90LUg0L3QsNC50LTQtdC9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGlzdGVuZXIuZGlzY29ubmVjdCgpO1xuICB9XG5cbiAgc2VuZE1lc3NhZ2UoKSB7XG4gICAgdGhpcy50b3VySnMuc2VuZE1lc3NhZ2Uoe1xuICAgICAgbGlzdGVuZXJfaWQ6IHRoaXMubGlzdGVuZXJfaWRcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0YHQu9GD0YjQuNCy0LDQvdC40Y8g0L3QsNGC0LjQstC90YvRhSDRgdC+0LHRi9GC0LjQuCBKYXZhU2NyaXB0XG4gICAqIEBwYXJhbSB7RXZlbnR9IGpzRXZlbnRcbiAgICovXG4gIG5hdGl2ZUV2ZW50TGlzdGVuZXIoanNFdmVudCkge1xuICAgIGlmIChqc0V2ZW50LnRhcmdldC5tYXRjaGVzKHRoaXMuc2VsZWN0b3IpKSB7XG4gICAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG4gICAgICBqc0V2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2ssIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICpDYWxsYmFjayDRhNGD0L3QutGG0LjRjyDQtNC70Y8g0L/RgNC+0YHQu9GD0YjQuNCy0LDQvdC40Y8g0L3QsNGC0LjQstC90YvRhSBDTElDSyDRgdC+0LHRi9GC0LjQuCBKYXZhU2NyaXB0XG4gICAqIEBwYXJhbSB7RXZlbnR9IGpzRXZlbnRcbiAgICovXG4gIG5hdGl2ZUNsaWNrTGlzdGVuZXIoanNFdmVudCkge1xuICAgIGlmIChqc0V2ZW50LnRhcmdldC5tYXRjaGVzKHRoaXMuc2VsZWN0b3IpKSB7XG4gICAgICB0aGlzLnNlbmRNZXNzYWdlKCk7XG5cbiAgICAgIGpzRXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjaywgZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIEludGVyc2VjdGlvblNob3dDYWxsYmFjayhjaGFuZ2VMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLmlzSW50ZXJzZWN0aW5nKSB7XG4gICAgICBjaGFuZ2VMaXN0ZW5lci5zZW5kTWVzc2FnZSgpO1xuICAgICAgY2hhbmdlTGlzdGVuZXIuZGlzY29ubmVjdExpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgSW50ZXJzZWN0aW9uSGlkZUNhbGxiYWNrKGNoYW5nZUxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMuaW50ZXJzZWN0aW9uUmF0aW8gPT09IDAgJiYgdGhpcy5pc0ludGVyc2VjdGluZyA9PT0gZmFsc2UpIHtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLnNlbmRNZXNzYWdlKCk7XG4gICAgICBjaGFuZ2VMaXN0ZW5lci5kaXNjb25uZWN0TGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sg0YTRg9C90LrRhtC40Y8g0LrQvtCz0LTQsCBldmVudCA9PSAnc2hvdycgKNC/0L7QutCw0LcpINC4INGN0YLQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQvdC10YIg0LIgRE9NXG4gICAqL1xuICBzaG93Q2FsbGJhY2soY2hhbmdlTGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnY2hpbGRMaXN0JyAmJiB0aGlzLmFkZGVkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNoYW5nZUxpc3RlbmVyLnNlbGVjdG9yKTtcblxuICAgICAgaWYgKHRoaXMuYWRkZWROb2Rlc1swXS5pc1NhbWVOb2RlKGVsKSkge1xuICAgICAgICBjaGFuZ2VMaXN0ZW5lci5zZW5kTWVzc2FnZSgpO1xuICAgICAgICByZXR1cm4gY2hhbmdlTGlzdGVuZXIuZGlzY29ubmVjdExpc3RlbmVyKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaGlkZUNhbGxiYWNrKGNoYW5nZUxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NoaWxkTGlzdCcgJiYgdGhpcy5yZW1vdmVkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMucmVtb3ZlZE5vZGVzWzBdO1xuXG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMSAmJiBub2RlLm1hdGNoZXMoY2hhbmdlTGlzdGVuZXIuc2VsZWN0b3IpKSB7XG4gICAgICAgIGNoYW5nZUxpc3RlbmVyLnNlbmRNZXNzYWdlKCk7XG4gICAgICAgIHJldHVybiBjaGFuZ2VMaXN0ZW5lci5kaXNjb25uZWN0TGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2xhc3NDaGFuZ2VDYWxsYmFjayhjaGFuZ2VMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdhdHRyaWJ1dGVzJyAmJiB0aGlzLmF0dHJpYnV0ZU5hbWUgPT09ICdjbGFzcycpIHtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLnNlbmRNZXNzYWdlKCk7XG4gICAgICByZXR1cm4gY2hhbmdlTGlzdGVuZXIuZGlzY29ubmVjdExpc3RlbmVyKCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrKGNoYW5nZUxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2F0dHJpYnV0ZXMnICYmIHRoaXMuYXR0cmlidXRlTmFtZSA9PT0gY2hhbmdlTGlzdGVuZXIuYXR0cmlidXRlTmFtZSkge1xuICAgICAgY2hhbmdlTGlzdGVuZXIuc2VuZE1lc3NhZ2UoKTtcbiAgICAgIHJldHVybiBjaGFuZ2VMaXN0ZW5lci5kaXNjb25uZWN0TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjaGFyYWN0ZXJEYXRhQ2hhbmdlQ2FsbGJhY2soY2hhbmdlTGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnY2hhcmFjdGVyRGF0YScgfHwgdGhpcy50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgY2hhbmdlTGlzdGVuZXIuc2VuZE1lc3NhZ2UoKTtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLmRpc2Nvbm5lY3RMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIGNoaWxkcmVuQ2hhbmdlQ2FsbGJhY2soY2hhbmdlTGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnY2hpbGRMaXN0Jykge1xuICAgICAgY2hhbmdlTGlzdGVuZXIuc2VuZE1lc3NhZ2UoKTtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLmRpc2Nvbm5lY3RMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGFuZ2VzTGlzdGVuZXI7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItcmVzdC1wYXJhbXMgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbi8qIGdsb2JhbCB3aW5kb3cgKi9cbi8qIGdsb2JhbCBkb2N1bWVudCAqL1xuLyogZ2xvYmFsIGhpc3RvcnkgKi9cbmltcG9ydCBpbnRyb0pzIGZyb20gJy4vaW50cm8tY2hhdCc7XG5cbmltcG9ydCBDaGFuZ2VzTGlzdGVuZXIgZnJvbSAnLi9DaGFuZ2VzTGlzdGVuZXInO1xuaW1wb3J0IHsgc2hvd0Vycm9yLCBsb2FkQ3NzIH0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogV2FybmluZy4gb3B0aW9ucyAtINGN0YLQviDRgdCy0L7QudGB0YLQviDQvtCx0YrQtdC60YLQsFxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtMFxuICovXG5mdW5jdGlvbiBzZXRPcHRpb25zKHsgb3B0aW9ucyB9KSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICB0aGlzLl9faW50cm8uc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9faW50cm8uc2V0T3B0aW9ucyh0aGlzLmNvbmZpZyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBbnlQYXJ0T2ZFbGVtZW50SW5WaWV3cG9ydChlbCkge1xuICBjb25zdCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIGNvbnN0IGJvdW5kc1RvcCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHNjcm9sbDtcblxuICBjb25zdCB2aWV3cG9ydCA9IHtcbiAgICB0b3A6IHNjcm9sbCxcbiAgICBib3R0b206IHNjcm9sbCArIHdpbmRvdy5pbm5lckhlaWdodFxuICB9O1xuXG4gIGNvbnN0IGJvdW5kcyA9IHtcbiAgICB0b3A6IGJvdW5kc1RvcCxcbiAgICBib3R0b206IGJvdW5kc1RvcCArIGVsLmNsaWVudEhlaWdodFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgKGJvdW5kcy5ib3R0b20gPj0gdmlld3BvcnQudG9wICYmIGJvdW5kcy5ib3R0b20gPD0gdmlld3BvcnQuYm90dG9tKSB8fFxuICAgIChib3VuZHMudG9wIDw9IHZpZXdwb3J0LmJvdHRvbSAmJiBib3VuZHMudG9wID49IHZpZXdwb3J0LnRvcClcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNNZXNzYWdlRnJvbVdpZGdldChldmVudCkge1xuICAvLyBJTVBPUlRBTlQ6IENoZWNrIHRoZSBvcmlnaW4gb2YgdGhlIGRhdGEhXG4gIGlmIChldmVudC5vcmlnaW4uaW5kZXhPZignaHR0cHM6Ly9nZXRjaGF0Lm1lJykgfHwgZXZlbnQub3JpZ2luLmluZGV4T2YoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcpKSB7XG4gICAgLy8gVGhlIGRhdGEgaGFzIGJlZW4gc2VudCBmcm9tIHlvdXIgc2l0ZVxuXG4gICAgLy8gVGhlIGRhdGEgc2VudCB3aXRoIHBvc3RNZXNzYWdlIGlzIHN0b3JlZCBpbiBldmVudC5kYXRhXG4gICAgaWYgKHR5cGVvZiBldmVudC5kYXRhICE9PSAnb2JqZWN0JyB8fCBldmVudC5kYXRhLnNvdXJjZSAhPT0gJ2dldGNoYXQtd2lkZ2V0Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5jb25zdCBvbmJvYXJkaW5nID0ge1xuICBzdHlsZXNGaWxlUGF0aDogJ2h0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vZ2V0dG91ci9kaXN0L2dldHRvdXIubWluLmpzJyxcbiAgc2VsZWN0b3I6ICcuZ2V0Y2hhdC13aWRnZXRfX2ZyYW1lJyxcbiAgZXhwYW5kQ2xhc3M6ICdnZXRjaGF0LXdpZGdldC0tZXhwYW5kZWQnLFxuICBhY3RpdmU6IGZhbHNlLFxuICBfX2ludHJvOiBudWxsLFxuICB3aWRnZXRIYXNoOiBudWxsLFxuICBhdXRvU2hvd0NvbmRpdGlvbnM6IFtdLFxuICBoYXNoOiBudWxsLFxuICBkb21haW46IG51bGwsXG4gIGJsb2NrOiBudWxsLFxuICBzZXRPcHRpb25zLFxuICBzdHlsZXNMb2FkZWQ6IGZhbHNlLFxuICBfX29ic2VydmVyczoge30sXG4gIG9wdGlvbnM6IHtcbiAgICBlbnY6ICdwcm9kdWN0aW9uJ1xuICB9LFxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGFzaFxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgKi9cbiAgaW5pdChoYXNoLCBvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuaGFzaCA9IGhhc2g7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgIHRoaXMubG9hZFdpZGdldERhdGEoKS50aGVuKGRhdGEgPT4ge1xuICAgICAgdGhpcy5kb21haW4gPSBkYXRhLmRvbWFpbjtcbiAgICAgIHRoaXMuYWN0aXZlID0gZGF0YS53aWRnZXRfYWN0aXZlO1xuICAgICAgdGhpcy5hdXRvU2hvd0NvbmRpdGlvbnMgPSBkYXRhLmNvbmRpdGlvbnM7XG4gICAgICBpZiAodGhpcy5kb21haW4gIT09IHdpbmRvdy5sb2NhdGlvbi5ob3N0KSB7XG4gICAgICAgIHNob3dFcnJvcignW9Ce0YjQuNCx0LrQsF0g0JLQuNC00LbQtdGCINC90LUg0LTQu9GPINGN0YLQvtCz0L4g0LTQvtC80LXQvdCwJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fX2ludHJvID0gaW50cm9KcygpO1xuXG4gICAgICB0aGlzLl9faW50cm8ub25jaGFuZ2UoKCkgPT4ge1xuICAgICAgICBzZWxmLl9faW50cm8ucmVmcmVzaCgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fX2ludHJvLm9uYmVmb3JlY2hhbmdlKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX19pbnRyby5faW50cm9JdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5fX2ludHJvLl9pbnRyb0l0ZW1zWzBdO1xuXG4gICAgICAgICAgc2VsZi5zZXRPcHRpb25zKHN0ZXApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9cbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2V0Y2hhdC13aWRnZXQgPiAuZ2V0Y2hhdC13aWRnZXRfX2J0bi0taWNvbicpO1xuXG4gICAgICAgIGlmIChjbG9zZUJ0bikge1xuICAgICAgICAgIGNsb3NlQnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9faW50cm8ub25leGl0KCgpID0+IHtcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2V0Y2hhdC13aWRnZXQgPiAuZ2V0Y2hhdC13aWRnZXRfX2J0bi0taWNvbicpO1xuXG4gICAgICAgIGlmIChjbG9zZUJ0bikge1xuICAgICAgICAgIGNsb3NlQnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWZsZXgnO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8g0KHQu9GD0YjQsNGC0Ywg0YHQvtCx0YvRgtC40Y8g0LLRi9C00LXQu9C10L3QuNGPXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5fX2xpc3RlbkZvckhpZ2hsaWdodFJlcXVlc3RzLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vINCh0LvRg9GI0LDRgtGMINGB0L7QsdGL0YLQuNGPINC60L3QvtC/0L7QuiDRh9Cw0YLQsFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBldmVudCA9PiB7XG4gICAgICAgIHRoaXMuX19saXN0ZW5Gb3JBY3Rpb25DbGlja2VkUmVxdWVzdHMuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9KTtcblxuICAgICAgLy8g0KHQu9GD0YjQsNGC0Ywg0YHQvtCx0YvRgtC40Y8g0LTQu9GPIE9ic2VydmVyLdCwXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5fX2xpc3RlbkZvck9ic2VydmVSZXF1ZXN0cy5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmxvYWRDb25kaXRpb24oKTtcblxuICAgICAgLy8g0KHQu9GD0YnQsNGC0Ywg0LjQt9C80LXQvdC10L3QuNC1IFVSTFxuICAgICAgdGhpcy5saXN0ZW5Gb3JMb2NhdGlvbkNoYW5nZSgpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGxvYWRDb25kaXRpb24oKSB7XG4gICAgdGhpcy5hdXRvU2hvd0NvbmRpdGlvbnMuZm9yRWFjaChjb25kID0+IHtcbiAgICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChjb25kLnVybFJlZ2V4LCAnaScpO1xuXG4gICAgICBpZiAocmVnZXgudGVzdCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyV2lkZ2V0KGNvbmQuc3JjKTtcbiAgICAgICAgICBpZiAoIXRoaXMuc3R5bGVzTG9hZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRTdHlsZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pbml0RXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfSwgY29uZC50aW1lSW50ZXJ2YWwgKiAxMDAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgbGlzdGVuRm9yTG9jYXRpb25DaGFuZ2UoKSB7XG4gICAgLyogVGhpcyBtb2RpZmllcyB0aGVzZSB0aHJlZSBmdW5jdGlvbnMgc28gdGhhdCBhbGwgZmlyZVxuICAgIGEgY3VzdG9tIGxvY2F0aW9uY2hhbmdlIGV2ZW50IGZvciB5b3UgdG8gdXNlLFxuICAgIGFuZCBhbHNvIHB1c2hzdGF0ZSBhbmQgcmVwbGFjZXN0YXRlIGV2ZW50cyBpZiB5b3Ugd2FudCB0byB1c2UgdGhvc2U6XG4gICAgRnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzUyODA5MTA1LzM5Mzk4NTMgKi9cbiAgICBoaXN0b3J5LnB1c2hTdGF0ZSA9IChmID0+XG4gICAgICBmdW5jdGlvbiBwdXNoU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHJldCA9IGYuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3B1c2hTdGF0ZScpKTtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0pKGhpc3RvcnkucHVzaFN0YXRlKTtcblxuICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlID0gKGYgPT5cbiAgICAgIGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncmVwbGFjZVN0YXRlJykpO1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSkoaGlzdG9yeS5yZXBsYWNlU3RhdGUpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgKCkgPT4ge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdsb2NhdGlvbmNoYW5nZScpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqINCh0LvRg9GI0LDRgtGMINC40LfQvNC10L3QtdC90LjQtSBVUkxcbiAgICAgKi9cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9jYXRpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICB0aGlzLmxvYWRDb25kaXRpb24oKTtcbiAgICB9KTtcbiAgfSxcbiAgLyoqXG4gICAqINCV0YHQu9C4INC/0YDQuNGF0L7QtNGP0YIg0YLQsNC60LjQtSDRjdC60YjQvdGLLCDRgtC+INGD0LHQuNGA0LDRgtGMIGhpZ2hsaWdodFxuICAgKiBAcGFyYW0ge29iamVjdH0gZVxuICAgKi9cbiAgX19saXN0ZW5Gb3JBY3Rpb25DbGlja2VkUmVxdWVzdHMoZSkge1xuICAgIGlmIChpc01lc3NhZ2VGcm9tV2lkZ2V0KGUpICYmIGUuZGF0YS5hY3Rpb24gPT09ICdBQ1RJT05fQ0xJQ0tFRCcpIHtcbiAgICAgIGNvbnN0IHsgYW5zd2VyX2lkIH0gPSBlLmRhdGE7XG5cbiAgICAgIGlmIChhbnN3ZXJfaWQgPT09IHRoaXMuX19pbnRyby5fb3B0aW9ucy5zdGVwc1swXS5oaWdobGlnaHRFdmVudEFuc3dlcklkKSB7XG4gICAgICAgIHRoaXMuX19pbnRyby5leGl0KCk7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICAvKipcbiAgICog0JfQsNC/0YPRgdGC0LjRgtGMINC/0YDQvtGB0LvRg9GI0L3QuNCy0LDQvdC40LUg0YHQvtCx0YvRgtC40Lgg0LrQvtGC0L7RgNGL0LUg0LLRi9GB0YLRgNC10LvQuNCy0LDRjtGCIGxpc3RlbmVyX2lkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfX2xpc3RlbkZvck9ic2VydmVSZXF1ZXN0cyhlKSB7XG4gICAgaWYgKGlzTWVzc2FnZUZyb21XaWRnZXQoZSkgJiYgZS5kYXRhLmFjdGlvbiA9PT0gJ09CU0VSVkUnKSB7XG4gICAgICBjb25zdCBsaXN0ZW5lciA9IG5ldyBDaGFuZ2VzTGlzdGVuZXIoZS5kYXRhKTtcblxuICAgICAgbGlzdGVuZXIudG91ckpzID0gdGhpcztcbiAgICAgIGxpc3RlbmVyLmluaXQoKTtcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiDQl9Cw0L/Rg9GB0YLQuNGC0Ywg0L/RgNC+0YHQu9GD0YjQuNCy0LDQvdC40LUg0LfQsNC60YDRi9GC0LjRjyDQstGL0LTQtdC70LXQvdC40Y8g0Y3Qu9C10LzQtdC90YLQsFxuICAgKiBAcGFyYW0ge09iamVjdH0gZVxuICAgKi9cbiAgX19saXN0ZW5Gb3JIaWdobGlnaHRSZXF1ZXN0cyhlKSB7XG4gICAgaWYgKGlzTWVzc2FnZUZyb21XaWRnZXQoZSkgJiYgZS5kYXRhLmFjdGlvbiA9PT0gJ0hJR0hMSUdIVCcpIHtcbiAgICAgIGlmIChlLmRhdGEuc2VsZWN0b3IpIHtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoZS5kYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIF9fZ2V0RWxlbWVudEZvckhpZ2hsaWdodChzZWxlY3Rvcikge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgY29uc3QgZWxlbWVudHNBcnJheSA9IEFycmF5LmZyb20oZWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnRzQXJyYXkuZmluZChpc0FueVBhcnRPZkVsZW1lbnRJblZpZXdwb3J0KTtcbiAgfSxcbiAgaGlnaGxpZ2h0KHsgc2VsZWN0b3IsIGNsb3NlRXZlbnQsIGhpZ2hsaWdodEV2ZW50QW5zd2VySWQgfSkge1xuICAgIGNvbnN0IHN0ZXAgPSB7XG4gICAgICBlbGVtZW50OiBzZWxlY3RvcixcbiAgICAgIGZpeGVkOiB0cnVlLFxuICAgICAgY2xvc2VFdmVudCxcbiAgICAgIGhpZ2hsaWdodEV2ZW50QW5zd2VySWRcbiAgICB9O1xuICAgIGNvbnN0IGludHJvRWxlbWVudCA9IHRoaXMuX19nZXRFbGVtZW50Rm9ySGlnaGxpZ2h0KHNlbGVjdG9yKTtcblxuICAgIGlmIChpbnRyb0VsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgc2hvd0Vycm9yKFwiRWxlbWVudCBkb2Vzbid0IGV4aXN0IG9uIERPTVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2xvc2VFdmVudCA9PT0gJ2NoYXRMaXN0ZW5lckNsaWNrJykge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGV4aXRPbkVzYzogZmFsc2UsXG4gICAgICAgICAgZXhpdE9uT3ZlcmxheUNsaWNrOiBmYWxzZSxcbiAgICAgICAgICBkaXNhYmxlSW50ZXJhY3Rpb246IHRydWVcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0T3B0aW9ucyh7XG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBleGl0T25Fc2M6IHRydWUsXG4gICAgICAgICAgZXhpdE9uT3ZlcmxheUNsaWNrOiBmYWxzZSxcbiAgICAgICAgICBkaXNhYmxlSW50ZXJhY3Rpb246IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9faW50cm8uYWRkU3RlcChzdGVwKTtcblxuICAgIC8vIExpc3RlbiB0byBldmVudFxuICAgIGludHJvRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgY2xvc2VFdmVudCxcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5fX2ludHJvLmV4aXQoKTtcbiAgICAgIH0sXG4gICAgICB7IG9uY2U6IHRydWUgfVxuICAgICk7XG4gICAgLy8gQ2xvc2VcbiAgICBpZiAodGhpcy5fX2ludHJvLl9pbnRyb0l0ZW1zLmxlbmd0aCkge1xuICAgICAgdGhpcy5fX2ludHJvLmdvVG9TdGVwTnVtYmVyKDApO1xuICAgIH1cbiAgICB0aGlzLl9faW50cm8uZXhpdCgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9faW50cm8uc3RhcnQoc3RlcCk7XG4gICAgfSwgNTApO1xuICB9LFxuICBzZW5kTWVzc2FnZShtc2cpIHtcbiAgICB0aGlzLl9faW50cm8uZXhpdCgpO1xuICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zZWxlY3Rvcik7XG5cbiAgICBpZiAoIWlmcmFtZSkge1xuICAgICAgc2hvd0Vycm9yKFwiV2lkZ2V0J3MgaWZyYW1lIG5vdCBmb3VuZCFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWZyYW1lLmNvbnRlbnRXaW5kb3cucG9zdE1lc3NhZ2UoT2JqZWN0LmFzc2lnbihtc2csIHsgc291cmNlOiAnZ2V0LXRvdXItbGlicmFyeScgfSkpO1xuICB9LFxuICByZXNldCgpIHtcbiAgICB0aGlzLl9faW50cm8uX29wdGlvbnMuc3RlcHMgPSBbXTtcbiAgICB0aGlzLl9faW50cm8ucmVmcmVzaCgpO1xuICAgIHRoaXMuZGVzdHJveVdpZGdldCgpO1xuICB9LFxuICBkZXN0cm95V2lkZ2V0KCkge1xuICAgIGlmICh0aGlzLmJsb2NrKSB7XG4gICAgICB0aGlzLmJsb2NrLnJlbW92ZSgpO1xuICAgIH1cbiAgfSxcbiAgcmVuZGVyV2lkZ2V0KHdpZGdldFVybCkge1xuICAgIHRoaXMuYmxvY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLmJsb2NrLmNsYXNzTmFtZSA9ICdnZXRjaGF0LXdpZGdldCBnZXRjaGF0LXdpZGdldC0tZXhwYW5kZWQnO1xuICAgIGNvbnN0IHdpZGdldEh0bWwgPVxuICAgICAgJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiZ2V0Y2hhdC13aWRnZXRfX2J0biBnZXRjaGF0LXdpZGdldF9fYnRuLS1pY29uXCIgPicgK1xuICAgICAgJzxpIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzPVwiZ2V0Y2hhdC13aWRnZXRfX2ljb24tLWNsb3NlXCI+PC9pPjwvYnV0dG9uPicgK1xuICAgICAgYDxpZnJhbWUgc3JjPVwiJHt3aWRnZXRVcmx9XCIgY2xhc3M9XCJnZXRjaGF0LXdpZGdldF9fZnJhbWVcIj48L2lmcmFtZT5gO1xuXG4gICAgdGhpcy5ibG9jay5pbm5lckhUTUwgPSB3aWRnZXRIdG1sO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJsb2NrKTtcbiAgfSxcbiAgbG9hZFN0eWxlcygpIHtcbiAgICBsb2FkQ3NzKHRoaXMuc3R5bGVzRmlsZVBhdGgpO1xuICAgIHRoaXMuc3R5bGVzTG9hZGVkID0gdHJ1ZTtcbiAgfSxcbiAgaW5pdEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIGNvbnN0ICRjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZXRjaGF0LXdpZGdldF9fYnRuLS1pY29uJyk7XG5cbiAgICAkY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5ibG9jay5jbGFzc0xpc3QuY29udGFpbnModGhpcy5leHBhbmRDbGFzcykpIHtcbiAgICAgICAgdGhpcy5oaWRlQmxvY2soKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXhwYW5kQmxvY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcbiAgaGlkZUJsb2NrKCkge1xuICAgIGNvbnN0ICRjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZXRjaGF0LXdpZGdldF9fYnRuLS1pY29uJyk7XG4gICAgY29uc3QgJGljb24gPSAkY2xvc2VCdG4uY2hpbGRyZW5bMF07XG5cbiAgICB0aGlzLmJsb2NrLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5leHBhbmRDbGFzcyk7XG4gICAgJGljb24uY2xhc3NOYW1lID0gJ2dldGNoYXQtd2lkZ2V0X19pY29uLS1leHBhbmQnO1xuICB9LFxuICBleHBhbmRCbG9jaygpIHtcbiAgICBjb25zdCAkY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2V0Y2hhdC13aWRnZXRfX2J0bi0taWNvbicpO1xuICAgIGNvbnN0ICRpY29uID0gJGNsb3NlQnRuLmNoaWxkcmVuWzBdO1xuXG4gICAgdGhpcy5ibG9jay5jbGFzc0xpc3QuYWRkKHRoaXMuZXhwYW5kQ2xhc3MpO1xuICAgICRpY29uLmNsYXNzTmFtZSA9ICdnZXRjaGF0LXdpZGdldF9faWNvbi0tY2xvc2UnO1xuICB9LFxuICBsb2FkV2lkZ2V0RGF0YSgpIHtcbiAgICBsZXQgdXJsID0gYGh0dHBzOi8vZ2V0Y2hhdC5tZS9hcGkvdGhlLWJvdC93aWRnZXQvJHt0aGlzLmhhc2h9L2RhdGFgO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5lbnYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgIHVybCA9IHVybC5yZXBsYWNlKCdodHRwczovL2dldGNoYXQubWUnLCAnaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBmZXRjaCh1cmwsIHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgY3JlZGVudGlhbHM6ICdvbWl0JyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgY2FjaGU6ICduby1jYWNoZScsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnXG4gICAgICB9KVxuICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG93RXJyb3IoYFvQntGI0LjQsdC60LBdICR7cmVzLnN0YXR1c1RleHR9YCk7XG4gICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBzaG93RXJyb3IoZXJyb3IpO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pXG4gICAgKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgb25ib2FyZGluZztcbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIEludHJvLmpzIHYyLjkuMyAgZm9yay4gb25seSBoaWdobGlnaHQgZWxlbWVudFxuICogaHR0cHM6Ly9naXRodWIuY29tL3VzYWJsaWNhL2ludHJvLmpzXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDE3IEFmc2hpbiBNZWhyYWJhbmkgKEBhZnNoaW5tZWgpXG4gKi9cblxuKGZ1bmN0aW9uKGYpIHtcbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZigpO1xuICAgIC8vIGRlcHJlY2F0ZWQgZnVuY3Rpb25cbiAgICAvLyBAc2luY2UgMi44LjBcbiAgICBtb2R1bGUuZXhwb3J0cy5pbnRyb0pzID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICdEZXByZWNhdGVkOiBwbGVhc2UgdXNlIHJlcXVpcmUoXCJpbnRyby5qc1wiKSBkaXJlY3RseSwgaW5zdGVhZCBvZiB0aGUgaW50cm9KcyBtZXRob2Qgb2YgdGhlIGZ1bmN0aW9uJ1xuICAgICAgKTtcbiAgICAgIC8vIGludHJvSnMoKVxuICAgICAgcmV0dXJuIGYoKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZztcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGcgPSB3aW5kb3c7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZyA9IGdsb2JhbDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZyA9IHNlbGY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGcgPSB0aGlzO1xuICAgIH1cbiAgICBnLmludHJvSnMgPSBmKCk7XG4gIH1cbn0pKGZ1bmN0aW9uKCkge1xuICAvL0RlZmF1bHQgY29uZmlnL3ZhcmlhYmxlc1xuICB2YXIgVkVSU0lPTiA9ICcyLjkuMyc7XG5cbiAgLyoqXG4gICAqIEludHJvSnMgbWFpbiBjbGFzc1xuICAgKlxuICAgKiBAY2xhc3MgSW50cm9Kc1xuICAgKi9cbiAgZnVuY3Rpb24gSW50cm9KcyhvYmopIHtcbiAgICB0aGlzLl90YXJnZXRFbGVtZW50ID0gb2JqO1xuICAgIHRoaXMuX2ludHJvSXRlbXMgPSBbXTtcblxuICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAvKiBDU1MgY2xhc3MgdGhhdCBpcyBhZGRlZCB0byB0aGUgaGVscGVyTGF5ZXIgKi9cbiAgICAgIGhpZ2hsaWdodENsYXNzOiAnJyxcbiAgICAgIC8qIENsb3NlIGludHJvZHVjdGlvbiB3aGVuIHByZXNzaW5nIEVzY2FwZSBidXR0b24/ICovXG4gICAgICBleGl0T25Fc2M6IHRydWUsXG4gICAgICAvKiBDbG9zZSBpbnRyb2R1Y3Rpb24gd2hlbiBjbGlja2luZyBvbiBvdmVybGF5IGxheWVyPyAqL1xuICAgICAgZXhpdE9uT3ZlcmxheUNsaWNrOiB0cnVlLFxuICAgICAgLyogTGV0IHVzZXIgdXNlIGtleWJvYXJkIHRvIG5hdmlnYXRlIHRoZSB0b3VyPyAqL1xuICAgICAga2V5Ym9hcmROYXZpZ2F0aW9uOiBmYWxzZSxcblxuICAgICAgLyogU2Nyb2xsIHRvIGhpZ2hsaWdodGVkIGVsZW1lbnQ/ICovXG4gICAgICBzY3JvbGxUb0VsZW1lbnQ6IHRydWUsXG4gICAgICAvKlxuICAgICAgICogU2hvdWxkIHdlIHNjcm9sbCB0aGUgdG9vbHRpcCBvciB0YXJnZXQgZWxlbWVudD9cbiAgICAgICAqXG4gICAgICAgKiBPcHRpb25zIGFyZTogJ2VsZW1lbnQnIG9yICd0b29sdGlwJ1xuICAgICAgICovXG4gICAgICBzY3JvbGxUbzogJ2VsZW1lbnQnLFxuICAgICAgLyogUGFkZGluZyB0byBhZGQgYWZ0ZXIgc2Nyb2xsaW5nIHdoZW4gZWxlbWVudCBpcyBub3QgaW4gdGhlIHZpZXdwb3J0IChpbiBwaXhlbHMpICovXG4gICAgICBzY3JvbGxQYWRkaW5nOiAzMCxcbiAgICAgIC8qIFNldCB0aGUgb3ZlcmxheSBvcGFjaXR5ICovXG4gICAgICBvdmVybGF5T3BhY2l0eTogMC45LFxuICAgICAgLyogUHJlY2VkZW5jZSBvZiBwb3NpdGlvbnMsIHdoZW4gYXV0byBpcyBlbmFibGVkICovXG4gICAgICBwb3NpdGlvblByZWNlZGVuY2U6IFsnYm90dG9tJywgJ3RvcCcsICdyaWdodCcsICdsZWZ0J10sXG4gICAgICAvKiBEaXNhYmxlIGFuIGludGVyYWN0aW9uIHdpdGggZWxlbWVudD8gKi9cbiAgICAgIGRpc2FibGVJbnRlcmFjdGlvbjogZmFsc2UsXG4gICAgICAvKiBTZXQgaG93IG11Y2ggcGFkZGluZyB0byBiZSB1c2VkIGFyb3VuZCBoZWxwZXIgZWxlbWVudCAqL1xuICAgICAgaGVscGVyRWxlbWVudFBhZGRpbmc6IDAsXG5cbiAgICAgIC8qIGFkZGl0aW9uYWwgY2xhc3NlcyB0byBwdXQgb24gdGhlIGJ1dHRvbnMgKi9cbiAgICAgIGJ1dHRvbkNsYXNzOiAnaW50cm9qcy1idXR0b24nXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZSBhIG5ldyBpbnRyb2R1Y3Rpb24vZ3VpZGUgZnJvbSBhbiBlbGVtZW50IGluIHRoZSBwYWdlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9pbnRyb0ZvckVsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldEVsbVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZ3JvdXBcbiAgICogQHJldHVybnMge0Jvb2xlYW59IFN1Y2Nlc3Mgb3Igbm90P1xuICAgKi9cbiAgZnVuY3Rpb24gX2ludHJvRm9yRWxlbWVudCh0YXJnZXRFbG0sIHN0ZXApIHtcbiAgICB2YXIgaW50cm9JdGVtcyA9IFtdO1xuICAgIHZhciBjdXJyZW50SXRlbSA9IF9jbG9uZU9iamVjdChzdGVwKTtcblxuICAgIC8vc2V0IHRoZSBzdGVwXG4gICAgY3VycmVudEl0ZW0uc3RlcCA9IGludHJvSXRlbXMubGVuZ3RoICsgMTtcblxuICAgIC8vdXNlIHF1ZXJ5U2VsZWN0b3IgZnVuY3Rpb24gb25seSB3aGVuIGRldmVsb3BlciB1c2VkIENTUyBzZWxlY3RvclxuICAgIGlmICh0eXBlb2YgY3VycmVudEl0ZW0uZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vZ3JhYiB0aGUgZWxlbWVudCB3aXRoIGdpdmVuIHNlbGVjdG9yIGZyb20gdGhlIHBhZ2VcbiAgICAgIGN1cnJlbnRJdGVtLmVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGN1cnJlbnRJdGVtLmVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vaW50cm8gd2l0aG91dCBlbGVtZW50XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIGN1cnJlbnRJdGVtLmVsZW1lbnQgPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICBjdXJyZW50SXRlbS5lbGVtZW50ID09PSBudWxsXG4gICAgKSB7XG4gICAgICB2YXIgZmxvYXRpbmdFbGVtZW50UXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAnLmludHJvanNGbG9hdGluZ0VsZW1lbnQnXG4gICAgICApO1xuXG4gICAgICBpZiAoZmxvYXRpbmdFbGVtZW50UXVlcnkgPT09IG51bGwpIHtcbiAgICAgICAgZmxvYXRpbmdFbGVtZW50UXVlcnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZmxvYXRpbmdFbGVtZW50UXVlcnkuY2xhc3NOYW1lID0gJ2ludHJvanNGbG9hdGluZ0VsZW1lbnQnO1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZmxvYXRpbmdFbGVtZW50UXVlcnkpO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50SXRlbS5lbGVtZW50ID0gZmxvYXRpbmdFbGVtZW50UXVlcnk7XG4gICAgICBjdXJyZW50SXRlbS5wb3NpdGlvbiA9ICdmbG9hdGluZyc7XG4gICAgfVxuXG4gICAgY3VycmVudEl0ZW0uc2Nyb2xsVG8gPSBjdXJyZW50SXRlbS5zY3JvbGxUbyB8fCB0aGlzLl9vcHRpb25zLnNjcm9sbFRvO1xuXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50SXRlbS5kaXNhYmxlSW50ZXJhY3Rpb24gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdXJyZW50SXRlbS5kaXNhYmxlSW50ZXJhY3Rpb24gPSB0aGlzLl9vcHRpb25zLmRpc2FibGVJbnRlcmFjdGlvbjtcbiAgICB9XG5cbiAgICBpZiAoY3VycmVudEl0ZW0uZWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgaW50cm9JdGVtcyA9IFtjdXJyZW50SXRlbV07XG4gICAgfVxuXG4gICAgLy9zZXQgaXQgdG8gdGhlIGludHJvSnMgb2JqZWN0XG4gICAgdGhpcy5faW50cm9JdGVtcyA9IGludHJvSXRlbXM7XG5cbiAgICAvL2FkZCBvdmVybGF5IGxheWVyIHRvIHRoZSBwYWdlXG4gICAgaWYgKF9hZGRPdmVybGF5TGF5ZXIuY2FsbCh0aGlzLCB0YXJnZXRFbG0pKSB7XG4gICAgICAvL3RoZW4sIHN0YXJ0IHRoZSBzaG93XG4gICAgICBfbmV4dFN0ZXAuY2FsbCh0aGlzKTtcblxuICAgICAgaWYgKHRoaXMuX29wdGlvbnMua2V5Ym9hcmROYXZpZ2F0aW9uKSB7XG4gICAgICAgIERPTUV2ZW50Lm9uKHdpbmRvdywgJ2tleWRvd24nLCBfb25LZXlEb3duLCB0aGlzLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIC8vZm9yIHdpbmRvdyByZXNpemVcbiAgICAgIERPTUV2ZW50Lm9uKHdpbmRvdywgJ3Jlc2l6ZScsIF9vblJlc2l6ZSwgdGhpcywgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9vblJlc2l6ZSgpIHtcbiAgICB0aGlzLnJlZnJlc2guY2FsbCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBvbiBrZXlDb2RlOlxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvS2V5Ym9hcmRFdmVudC9rZXlDb2RlXG4gICAqIFRoaXMgZmVhdHVyZSBoYXMgYmVlbiByZW1vdmVkIGZyb20gdGhlIFdlYiBzdGFuZGFyZHMuXG4gICAqIFRob3VnaCBzb21lIGJyb3dzZXJzIG1heSBzdGlsbCBzdXBwb3J0IGl0LCBpdCBpcyBpblxuICAgKiB0aGUgcHJvY2VzcyBvZiBiZWluZyBkcm9wcGVkLlxuICAgKiBJbnN0ZWFkLCB5b3Ugc2hvdWxkIHVzZSBLZXlib2FyZEV2ZW50LmNvZGUsXG4gICAqIGlmIGl0J3MgaW1wbGVtZW50ZWQuXG4gICAqXG4gICAqIGpRdWVyeSdzIGFwcHJvYWNoIGlzIHRvIHRlc3QgZm9yXG4gICAqICAgKDEpIGUud2hpY2gsIHRoZW5cbiAgICogICAoMikgZS5jaGFyQ29kZSwgdGhlblxuICAgKiAgICgzKSBlLmtleUNvZGVcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9hNmIwNzA1Mjk0ZDMzNmFlMmY2M2Y3Mjc2ZGUwZGExMTk1NDk1MzYzL3NyYy9ldmVudC5qcyNMNjM4XG4gICAqXG4gICAqIEBwYXJhbSB0eXBlIHZhclxuICAgKiBAcmV0dXJuIHR5cGVcbiAgICovXG4gIGZ1bmN0aW9uIF9vbktleURvd24oZSkge1xuICAgIHZhciBjb2RlID0gZS5jb2RlID09PSBudWxsID8gZS53aGljaCA6IGUuY29kZTtcblxuICAgIC8vIGlmIGNvZGUvZS53aGljaCBpcyBudWxsXG4gICAgaWYgKGNvZGUgPT09IG51bGwpIHtcbiAgICAgIGNvZGUgPSBlLmNoYXJDb2RlID09PSBudWxsID8gZS5rZXlDb2RlIDogZS5jaGFyQ29kZTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAoY29kZSA9PT0gJ0VzY2FwZScgfHwgY29kZSA9PT0gMjcpICYmXG4gICAgICB0aGlzLl9vcHRpb25zLmV4aXRPbkVzYyA9PT0gdHJ1ZVxuICAgICkge1xuICAgICAgLy9lc2NhcGUga2V5IHByZXNzZWQsIGV4aXQgdGhlIGludHJvXG4gICAgICAvL2NoZWNrIGlmIGV4aXQgY2FsbGJhY2sgaXMgZGVmaW5lZFxuICAgICAgX2V4aXRJbnRyby5jYWxsKHRoaXMsIHRoaXMuX3RhcmdldEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qXG4gICAqIG1ha2VzIGEgY29weSBvZiB0aGUgb2JqZWN0XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9jbG9uZU9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gX2Nsb25lT2JqZWN0KG9iamVjdCkge1xuICAgIGlmIChcbiAgICAgIG9iamVjdCA9PT0gbnVsbCB8fFxuICAgICAgdHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHxcbiAgICAgIHR5cGVvZiBvYmplY3Qubm9kZVR5cGUgIT09ICd1bmRlZmluZWQnXG4gICAgKSB7XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgICB2YXIgdGVtcCA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHdpbmRvdy5qUXVlcnkgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iamVjdFtrZXldIGluc3RhbmNlb2Ygd2luZG93LmpRdWVyeVxuICAgICAgKSB7XG4gICAgICAgIHRlbXBba2V5XSA9IG9iamVjdFtrZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcFtrZXldID0gX2Nsb25lT2JqZWN0KG9iamVjdFtrZXldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRlbXA7XG4gIH1cbiAgLyoqXG4gICAqIEdvIHRvIHNwZWNpZmljIHN0ZXAgb2YgaW50cm9kdWN0aW9uXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9nb1RvU3RlcFxuICAgKi9cbiAgZnVuY3Rpb24gX2dvVG9TdGVwKHN0ZXApIHtcbiAgICAvL2JlY2F1c2Ugc3RlcHMgc3RhcnRzIHdpdGggemVyb1xuICAgIHRoaXMuX2N1cnJlbnRTdGVwID0gc3RlcCAtIDI7XG4gICAgaWYgKHR5cGVvZiB0aGlzLl9pbnRyb0l0ZW1zICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgX25leHRTdGVwLmNhbGwodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdvIHRvIHRoZSBzcGVjaWZpYyBzdGVwIG9mIGludHJvZHVjdGlvbiB3aXRoIHRoZSBleHBsaWNpdCBbZGF0YS1zdGVwXSBudW1iZXJcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2dvVG9TdGVwTnVtYmVyXG4gICAqL1xuICBmdW5jdGlvbiBfZ29Ub1N0ZXBOdW1iZXIoc3RlcCkge1xuICAgIHRoaXMuX2N1cnJlbnRTdGVwTnVtYmVyID0gc3RlcDtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludHJvSXRlbXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfbmV4dFN0ZXAuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gbmV4dCBzdGVwIG9uIGludHJvXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9uZXh0U3RlcFxuICAgKi9cbiAgZnVuY3Rpb24gX25leHRTdGVwKCkge1xuICAgIHRoaXMuX2RpcmVjdGlvbiA9ICdmb3J3YXJkJztcblxuICAgIGlmICh0eXBlb2YgdGhpcy5fY3VycmVudFN0ZXBOdW1iZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfZm9yRWFjaChcbiAgICAgICAgdGhpcy5faW50cm9JdGVtcyxcbiAgICAgICAgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICAgIGlmIChpdGVtLnN0ZXAgPT09IHRoaXMuX2N1cnJlbnRTdGVwTnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RlcCA9IGkgLSAxO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0ZXBOdW1iZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9jdXJyZW50U3RlcCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRTdGVwID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgKyt0aGlzLl9jdXJyZW50U3RlcDtcbiAgICB9XG5cbiAgICAvLyBjb21tZW50INC+0YHRgtGL0LvRjCB2YXIgbmV4dFN0ZXAgPSB0aGlzLl9pbnRyb0l0ZW1zW3RoaXMuX2N1cnJlbnRTdGVwXTtcbiAgICB2YXIgbmV4dFN0ZXAgPSB0aGlzLl9pbnRyb0l0ZW1zWzBdO1xuICAgIHZhciBjb250aW51ZVN0ZXAgPSB0cnVlO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9pbnRyb0JlZm9yZUNoYW5nZUNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29udGludWVTdGVwID0gdGhpcy5faW50cm9CZWZvcmVDaGFuZ2VDYWxsYmFjay5jYWxsKFxuICAgICAgICB0aGlzLFxuICAgICAgICBuZXh0U3RlcC5lbGVtZW50XG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIGlmIGBvbmJlZm9yZWNoYW5nZWAgcmV0dXJuZWQgYGZhbHNlYCwgc3RvcCBkaXNwbGF5aW5nIHRoZSBlbGVtZW50XG4gICAgaWYgKGNvbnRpbnVlU3RlcCA9PT0gZmFsc2UpIHtcbiAgICAgIC0tdGhpcy5fY3VycmVudFN0ZXA7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2ludHJvSXRlbXMubGVuZ3RoIDw9IHRoaXMuX2N1cnJlbnRTdGVwKSB7XG4gICAgICAvL2VuZCBvZiB0aGUgaW50cm9cbiAgICAgIC8vY2hlY2sgaWYgYW55IGNhbGxiYWNrIGlzIGRlZmluZWRcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5faW50cm9Db21wbGV0ZUNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2ludHJvQ29tcGxldGVDYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgICAgfVxuICAgICAgX2V4aXRJbnRyby5jYWxsKHRoaXMsIHRoaXMuX3RhcmdldEVsZW1lbnQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIF9zaG93RWxlbWVudC5jYWxsKHRoaXMsIG5leHRTdGVwKTtcbiAgfVxuIFxuICAvKipcbiAgICogVXBkYXRlIHBsYWNlbWVudCBvZiB0aGUgaW50cm8gb2JqZWN0cyBvbiB0aGUgc2NyZWVuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gX3JlZnJlc2goKSB7XG4gICAgLy8gcmUtYWxpZ24gaW50cm9zXG4gICAgX3NldEhlbHBlckxheWVyUG9zaXRpb24uY2FsbChcbiAgICAgIHRoaXMsXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm9qcy1oZWxwZXJMYXllcicpXG4gICAgKTtcbiAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKFxuICAgICAgdGhpcyxcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRyb2pzLXRvb2x0aXBSZWZlcmVuY2VMYXllcicpXG4gICAgKTtcbiAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKFxuICAgICAgdGhpcyxcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRyb2pzLWRpc2FibGVJbnRlcmFjdGlvbicpXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4aXQgZnJvbSBpbnRyb1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfZXhpdEludHJvXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRFbGVtZW50XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZm9yY2UgLSBTZXR0aW5nIHRvIGB0cnVlYCB3aWxsIHNraXAgdGhlIHJlc3VsdCBvZiBiZWZvcmVFeGl0IGNhbGxiYWNrXG4gICAqL1xuICBmdW5jdGlvbiBfZXhpdEludHJvKHRhcmdldEVsZW1lbnQsIGZvcmNlKSB7XG4gICAgdmFyIGNvbnRpbnVlRXhpdCA9IHRydWU7XG5cbiAgICAvLyBjYWxsaW5nIG9uYmVmb3JlZXhpdCBjYWxsYmFja1xuICAgIC8vXG4gICAgLy8gSWYgdGhpcyBjYWxsYmFjayByZXR1cm4gYGZhbHNlYCwgaXQgd291bGQgaGFsdCB0aGUgcHJvY2Vzc1xuICAgIGlmICh0aGlzLl9pbnRyb0JlZm9yZUV4aXRDYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250aW51ZUV4aXQgPSB0aGlzLl9pbnRyb0JlZm9yZUV4aXRDYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vIHNraXAgdGhpcyBjaGVjayBpZiBgZm9yY2VgIHBhcmFtZXRlciBpcyBgdHJ1ZWBcbiAgICAvLyBvdGhlcndpc2UsIGlmIGBvbmJlZm9yZWV4aXRgIHJldHVybmVkIGBmYWxzZWAsIGRvbid0IGV4aXQgdGhlIGludHJvXG4gICAgaWYgKCFmb3JjZSAmJiBjb250aW51ZUV4aXQgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAvL3JlbW92ZSBvdmVybGF5IGxheWVycyBmcm9tIHRoZSBwYWdlXG4gICAgdmFyIG92ZXJsYXlMYXllcnMgPSB0YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnRyb2pzLW92ZXJsYXknKTtcblxuICAgIGlmIChvdmVybGF5TGF5ZXJzICYmIG92ZXJsYXlMYXllcnMubGVuZ3RoKSB7XG4gICAgICBfZm9yRWFjaChcbiAgICAgICAgb3ZlcmxheUxheWVycyxcbiAgICAgICAgZnVuY3Rpb24ob3ZlcmxheUxheWVyKSB7XG4gICAgICAgICAgb3ZlcmxheUxheWVyLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0uYmluZChvdmVybGF5TGF5ZXIpLFxuICAgICAgICAgICAgNTAwXG4gICAgICAgICAgKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vcmVtb3ZlIGFsbCBoZWxwZXIgbGF5ZXJzXG4gICAgdmFyIGhlbHBlckxheWVyID0gdGFyZ2V0RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuaW50cm9qcy1oZWxwZXJMYXllcicpO1xuICAgIGlmIChoZWxwZXJMYXllcikge1xuICAgICAgaGVscGVyTGF5ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChoZWxwZXJMYXllcik7XG4gICAgfVxuXG4gICAgdmFyIHJlZmVyZW5jZUxheWVyID0gdGFyZ2V0RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5pbnRyb2pzLXRvb2x0aXBSZWZlcmVuY2VMYXllcidcbiAgICApO1xuICAgIGlmIChyZWZlcmVuY2VMYXllcikge1xuICAgICAgcmVmZXJlbmNlTGF5ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChyZWZlcmVuY2VMYXllcik7XG4gICAgfVxuXG4gICAgLy9yZW1vdmUgZGlzYWJsZUludGVyYWN0aW9uTGF5ZXJcbiAgICB2YXIgZGlzYWJsZUludGVyYWN0aW9uTGF5ZXIgPSB0YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmludHJvanMtZGlzYWJsZUludGVyYWN0aW9uJ1xuICAgICk7XG4gICAgaWYgKGRpc2FibGVJbnRlcmFjdGlvbkxheWVyKSB7XG4gICAgICBkaXNhYmxlSW50ZXJhY3Rpb25MYXllci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpc2FibGVJbnRlcmFjdGlvbkxheWVyKTtcbiAgICB9XG5cbiAgICAvL3JlbW92ZSBpbnRybyBmbG9hdGluZyBlbGVtZW50XG4gICAgdmFyIGZsb2F0aW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRyb2pzRmxvYXRpbmdFbGVtZW50Jyk7XG4gICAgaWYgKGZsb2F0aW5nRWxlbWVudCkge1xuICAgICAgZmxvYXRpbmdFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZmxvYXRpbmdFbGVtZW50KTtcbiAgICB9XG5cbiAgICBfcmVtb3ZlU2hvd0VsZW1lbnQoKTtcblxuICAgIC8vcmVtb3ZlIGBpbnRyb2pzLWZpeFBhcmVudGAgY2xhc3MgZnJvbSB0aGUgZWxlbWVudHNcbiAgICB2YXIgZml4UGFyZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnRyb2pzLWZpeFBhcmVudCcpO1xuICAgIF9mb3JFYWNoKGZpeFBhcmVudHMsIGZ1bmN0aW9uKHBhcmVudCkge1xuICAgICAgX3JlbW92ZUNsYXNzKHBhcmVudCwgL2ludHJvanMtZml4UGFyZW50L2cpO1xuICAgIH0pO1xuXG4gICAgLy9jbGVhbiBsaXN0ZW5lcnNcbiAgICBET01FdmVudC5vZmYod2luZG93LCAna2V5ZG93bicsIF9vbktleURvd24sIHRoaXMsIHRydWUpO1xuICAgIERPTUV2ZW50Lm9mZih3aW5kb3csICdyZXNpemUnLCBfb25SZXNpemUsIHRoaXMsIHRydWUpO1xuXG4gICAgLy9jaGVjayBpZiBhbnkgY2FsbGJhY2sgaXMgZGVmaW5lZFxuICAgIGlmICh0aGlzLl9pbnRyb0V4aXRDYWxsYmFjayAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLl9pbnRyb0V4aXRDYWxsYmFjay5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8vc2V0IHRoZSBzdGVwIHRvIHplcm9cbiAgICB0aGlzLl9jdXJyZW50U3RlcCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdG9vbHRpcCBsZWZ0IHNvIGl0IGRvZXNuJ3QgZ28gb2ZmIHRoZSByaWdodCBzaWRlIG9mIHRoZSB3aW5kb3dcbiAgICpcbiAgICogQHJldHVybiBib29sZWFuIHRydWUsIGlmIHRvb2x0aXBMYXllclN0eWxlTGVmdCBpcyBvay4gIGZhbHNlLCBvdGhlcndpc2UuXG4gICAqL1xuICBmdW5jdGlvbiBfY2hlY2tSaWdodChcbiAgICB0YXJnZXRPZmZzZXQsXG4gICAgdG9vbHRpcExheWVyU3R5bGVMZWZ0LFxuICAgIHRvb2x0aXBPZmZzZXQsXG4gICAgd2luZG93U2l6ZSxcbiAgICB0b29sdGlwTGF5ZXJcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgdGFyZ2V0T2Zmc2V0LmxlZnQgKyB0b29sdGlwTGF5ZXJTdHlsZUxlZnQgKyB0b29sdGlwT2Zmc2V0LndpZHRoID5cbiAgICAgIHdpbmRvd1NpemUud2lkdGhcbiAgICApIHtcbiAgICAgIC8vIG9mZiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgd2luZG93XG4gICAgICB0b29sdGlwTGF5ZXIuc3R5bGUubGVmdCA9XG4gICAgICAgIHdpbmRvd1NpemUud2lkdGggLSB0b29sdGlwT2Zmc2V0LndpZHRoIC0gdGFyZ2V0T2Zmc2V0LmxlZnQgKyAncHgnO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0b29sdGlwTGF5ZXIuc3R5bGUubGVmdCA9IHRvb2x0aXBMYXllclN0eWxlTGVmdCArICdweCc7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRvb2x0aXAgcmlnaHQgc28gaXQgZG9lc24ndCBnbyBvZmYgdGhlIGxlZnQgc2lkZSBvZiB0aGUgd2luZG93XG4gICAqXG4gICAqIEByZXR1cm4gYm9vbGVhbiB0cnVlLCBpZiB0b29sdGlwTGF5ZXJTdHlsZVJpZ2h0IGlzIG9rLiAgZmFsc2UsIG90aGVyd2lzZS5cbiAgICovXG4gIGZ1bmN0aW9uIF9jaGVja0xlZnQoXG4gICAgdGFyZ2V0T2Zmc2V0LFxuICAgIHRvb2x0aXBMYXllclN0eWxlUmlnaHQsXG4gICAgdG9vbHRpcE9mZnNldCxcbiAgICB0b29sdGlwTGF5ZXJcbiAgKSB7XG4gICAgaWYgKFxuICAgICAgdGFyZ2V0T2Zmc2V0LmxlZnQgK1xuICAgICAgICB0YXJnZXRPZmZzZXQud2lkdGggLVxuICAgICAgICB0b29sdGlwTGF5ZXJTdHlsZVJpZ2h0IC1cbiAgICAgICAgdG9vbHRpcE9mZnNldC53aWR0aCA8XG4gICAgICAwXG4gICAgKSB7XG4gICAgICAvLyBvZmYgdGhlIGxlZnQgc2lkZSBvZiB0aGUgd2luZG93XG4gICAgICB0b29sdGlwTGF5ZXIuc3R5bGUubGVmdCA9IC10YXJnZXRPZmZzZXQubGVmdCArICdweCc7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRvb2x0aXBMYXllci5zdHlsZS5yaWdodCA9IHRvb2x0aXBMYXllclN0eWxlUmlnaHQgKyAncHgnO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSB0b29sdGlwIGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBwcmVjZWRlbmNlIGFuZCBhdmFpbGFiaWxpdHlcbiAgICogb2Ygc2NyZWVuIHNwYWNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgdGFyZ2V0RWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gICAgdG9vbHRpcExheWVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgICBkZXNpcmVkVG9vbHRpcFBvc2l0aW9uXG4gICAqIEByZXR1cm4ge1N0cmluZ30gICBjYWxjdWxhdGVkUG9zaXRpb25cbiAgICovXG4gIGZ1bmN0aW9uIF9kZXRlcm1pbmVBdXRvUG9zaXRpb24oXG4gICAgdGFyZ2V0RWxlbWVudCxcbiAgICB0b29sdGlwTGF5ZXIsXG4gICAgZGVzaXJlZFRvb2x0aXBQb3NpdGlvblxuICApIHtcbiAgICAvLyBUYWtlIGEgY2xvbmUgb2YgcG9zaXRpb24gcHJlY2VkZW5jZS4gVGhlc2Ugd2lsbCBiZSB0aGUgYXZhaWxhYmxlXG4gICAgdmFyIHBvc3NpYmxlUG9zaXRpb25zID0gdGhpcy5fb3B0aW9ucy5wb3NpdGlvblByZWNlZGVuY2Uuc2xpY2UoKTtcblxuICAgIHZhciB3aW5kb3dTaXplID0gX2dldFdpblNpemUoKTtcbiAgICB2YXIgdG9vbHRpcEhlaWdodCA9IF9nZXRPZmZzZXQodG9vbHRpcExheWVyKS5oZWlnaHQgKyAxMDtcbiAgICB2YXIgdG9vbHRpcFdpZHRoID0gX2dldE9mZnNldCh0b29sdGlwTGF5ZXIpLndpZHRoICsgMjA7XG4gICAgdmFyIHRhcmdldEVsZW1lbnRSZWN0ID0gdGFyZ2V0RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIElmIHdlIGNoZWNrIGFsbCB0aGUgcG9zc2libGUgYXJlYXMsIGFuZCB0aGVyZSBhcmUgbm8gdmFsaWQgcGxhY2VzIGZvciB0aGUgdG9vbHRpcCwgdGhlIGVsZW1lbnRcbiAgICAvLyBtdXN0IHRha2UgdXAgbW9zdCBvZiB0aGUgc2NyZWVuIHJlYWwgZXN0YXRlLiBTaG93IHRoZSB0b29sdGlwIGZsb2F0aW5nIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcmVlbi5cbiAgICB2YXIgY2FsY3VsYXRlZFBvc2l0aW9uID0gJ2Zsb2F0aW5nJztcblxuICAgIC8qXG4gICAgICogYXV0byBkZXRlcm1pbmUgcG9zaXRpb25cbiAgICAgKi9cblxuICAgIC8vIENoZWNrIGZvciBzcGFjZSBiZWxvd1xuICAgIGlmIChcbiAgICAgIHRhcmdldEVsZW1lbnRSZWN0LmJvdHRvbSArIHRvb2x0aXBIZWlnaHQgKyB0b29sdGlwSGVpZ2h0ID5cbiAgICAgIHdpbmRvd1NpemUuaGVpZ2h0XG4gICAgKSB7XG4gICAgICBfcmVtb3ZlRW50cnkocG9zc2libGVQb3NpdGlvbnMsICdib3R0b20nKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3Igc3BhY2UgYWJvdmVcbiAgICBpZiAodGFyZ2V0RWxlbWVudFJlY3QudG9wIC0gdG9vbHRpcEhlaWdodCA8IDApIHtcbiAgICAgIF9yZW1vdmVFbnRyeShwb3NzaWJsZVBvc2l0aW9ucywgJ3RvcCcpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBzcGFjZSB0byB0aGUgcmlnaHRcbiAgICBpZiAodGFyZ2V0RWxlbWVudFJlY3QucmlnaHQgKyB0b29sdGlwV2lkdGggPiB3aW5kb3dTaXplLndpZHRoKSB7XG4gICAgICBfcmVtb3ZlRW50cnkocG9zc2libGVQb3NpdGlvbnMsICdyaWdodCcpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBzcGFjZSB0byB0aGUgbGVmdFxuICAgIGlmICh0YXJnZXRFbGVtZW50UmVjdC5sZWZ0IC0gdG9vbHRpcFdpZHRoIDwgMCkge1xuICAgICAgX3JlbW92ZUVudHJ5KHBvc3NpYmxlUG9zaXRpb25zLCAnbGVmdCcpO1xuICAgIH1cblxuICAgIC8vIEB2YXIge1N0cmluZ30gIGV4OiAncmlnaHQtYWxpZ25lZCdcbiAgICB2YXIgZGVzaXJlZEFsaWdubWVudCA9IChmdW5jdGlvbihwb3MpIHtcbiAgICAgIHZhciBoeXBoZW5JbmRleCA9IHBvcy5pbmRleE9mKCctJyk7XG4gICAgICBpZiAoaHlwaGVuSW5kZXggIT09IC0xKSB7XG4gICAgICAgIC8vIGhhcyBhbGlnbm1lbnRcbiAgICAgICAgcmV0dXJuIHBvcy5zdWJzdHIoaHlwaGVuSW5kZXgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH0pKGRlc2lyZWRUb29sdGlwUG9zaXRpb24gfHwgJycpO1xuXG4gICAgLy8gc3RyaXAgYWxpZ25tZW50IGZyb20gcG9zaXRpb25cbiAgICBpZiAoZGVzaXJlZFRvb2x0aXBQb3NpdGlvbikge1xuICAgICAgLy8gZXg6IFwiYm90dG9tLXJpZ2h0LWFsaWduZWRcIlxuICAgICAgLy8gc2hvdWxkIHJldHVybiAnYm90dG9tJ1xuICAgICAgZGVzaXJlZFRvb2x0aXBQb3NpdGlvbiA9IGRlc2lyZWRUb29sdGlwUG9zaXRpb24uc3BsaXQoJy0nKVswXTtcbiAgICB9XG5cbiAgICBpZiAocG9zc2libGVQb3NpdGlvbnMubGVuZ3RoKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGRlc2lyZWRUb29sdGlwUG9zaXRpb24gIT09ICdhdXRvJyAmJlxuICAgICAgICBwb3NzaWJsZVBvc2l0aW9ucy5pbmRleE9mKGRlc2lyZWRUb29sdGlwUG9zaXRpb24pID4gLTFcbiAgICAgICkge1xuICAgICAgICAvLyBJZiB0aGUgcmVxdWVzdGVkIHBvc2l0aW9uIGlzIGluIHRoZSBsaXN0LCBjaG9vc2UgdGhhdFxuICAgICAgICBjYWxjdWxhdGVkUG9zaXRpb24gPSBkZXNpcmVkVG9vbHRpcFBvc2l0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUGljayB0aGUgZmlyc3QgdmFsaWQgcG9zaXRpb24sIGluIG9yZGVyXG4gICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbiA9IHBvc3NpYmxlUG9zaXRpb25zWzBdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIG9ubHkgdG9wIGFuZCBib3R0b20gcG9zaXRpb25zIGhhdmUgb3B0aW9uYWwgYWxpZ25tZW50c1xuICAgIGlmIChbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKGNhbGN1bGF0ZWRQb3NpdGlvbikgIT09IC0xKSB7XG4gICAgICBjYWxjdWxhdGVkUG9zaXRpb24gKz0gX2RldGVybWluZUF1dG9BbGlnbm1lbnQoXG4gICAgICAgIHRhcmdldEVsZW1lbnRSZWN0LmxlZnQsXG4gICAgICAgIHRvb2x0aXBXaWR0aCxcbiAgICAgICAgd2luZG93U2l6ZSxcbiAgICAgICAgZGVzaXJlZEFsaWdubWVudFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FsY3VsYXRlZFBvc2l0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIGF1dG8tZGV0ZXJtaW5lIGFsaWdubWVudFxuICAgKiBAcGFyYW0ge0ludGVnZXJ9ICBvZmZzZXRMZWZ0XG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gIHRvb2x0aXBXaWR0aFxuICAgKiBAcGFyYW0ge09iamVjdH0gICB3aW5kb3dTaXplXG4gICAqIEBwYXJhbSB7U3RyaW5nfSAgIGRlc2lyZWRBbGlnbm1lbnRcbiAgICogQHJldHVybiB7U3RyaW5nfSAgY2FsY3VsYXRlZEFsaWdubWVudFxuICAgKi9cbiAgZnVuY3Rpb24gX2RldGVybWluZUF1dG9BbGlnbm1lbnQoXG4gICAgb2Zmc2V0TGVmdCxcbiAgICB0b29sdGlwV2lkdGgsXG4gICAgd2luZG93U2l6ZSxcbiAgICBkZXNpcmVkQWxpZ25tZW50XG4gICkge1xuICAgIHZhciBoYWxmVG9vbHRpcFdpZHRoID0gdG9vbHRpcFdpZHRoIC8gMixcbiAgICAgIHdpbldpZHRoID0gTWF0aC5taW4od2luZG93U2l6ZS53aWR0aCwgd2luZG93LnNjcmVlbi53aWR0aCksXG4gICAgICBwb3NzaWJsZUFsaWdubWVudHMgPSBbXG4gICAgICAgICctbGVmdC1hbGlnbmVkJyxcbiAgICAgICAgJy1taWRkbGUtYWxpZ25lZCcsXG4gICAgICAgICctcmlnaHQtYWxpZ25lZCdcbiAgICAgIF0sXG4gICAgICBjYWxjdWxhdGVkQWxpZ25tZW50ID0gJyc7XG5cbiAgICAvLyB2YWxpZCBsZWZ0IG11c3QgYmUgYXQgbGVhc3QgYSB0b29sdGlwV2lkdGhcbiAgICAvLyBhd2F5IGZyb20gcmlnaHQgc2lkZVxuICAgIGlmICh3aW5XaWR0aCAtIG9mZnNldExlZnQgPCB0b29sdGlwV2lkdGgpIHtcbiAgICAgIF9yZW1vdmVFbnRyeShwb3NzaWJsZUFsaWdubWVudHMsICctbGVmdC1hbGlnbmVkJyk7XG4gICAgfVxuXG4gICAgLy8gdmFsaWQgbWlkZGxlIG11c3QgYmUgYXQgbGVhc3QgaGFsZlxuICAgIC8vIHdpZHRoIGF3YXkgZnJvbSBib3RoIHNpZGVzXG4gICAgaWYgKFxuICAgICAgb2Zmc2V0TGVmdCA8IGhhbGZUb29sdGlwV2lkdGggfHxcbiAgICAgIHdpbldpZHRoIC0gb2Zmc2V0TGVmdCA8IGhhbGZUb29sdGlwV2lkdGhcbiAgICApIHtcbiAgICAgIF9yZW1vdmVFbnRyeShwb3NzaWJsZUFsaWdubWVudHMsICctbWlkZGxlLWFsaWduZWQnKTtcbiAgICB9XG5cbiAgICAvLyB2YWxpZCByaWdodCBtdXN0IGJlIGF0IGxlYXN0IGEgdG9vbHRpcFdpZHRoXG4gICAgLy8gd2lkdGggYXdheSBmcm9tIGxlZnQgc2lkZVxuICAgIGlmIChvZmZzZXRMZWZ0IDwgdG9vbHRpcFdpZHRoKSB7XG4gICAgICBfcmVtb3ZlRW50cnkocG9zc2libGVBbGlnbm1lbnRzLCAnLXJpZ2h0LWFsaWduZWQnKTtcbiAgICB9XG5cbiAgICBpZiAocG9zc2libGVBbGlnbm1lbnRzLmxlbmd0aCkge1xuICAgICAgaWYgKHBvc3NpYmxlQWxpZ25tZW50cy5pbmRleE9mKGRlc2lyZWRBbGlnbm1lbnQpICE9PSAtMSkge1xuICAgICAgICAvLyB0aGUgZGVzaXJlZCBhbGlnbm1lbnQgaXMgdmFsaWRcbiAgICAgICAgY2FsY3VsYXRlZEFsaWdubWVudCA9IGRlc2lyZWRBbGlnbm1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwaWNrIHRoZSBmaXJzdCB2YWxpZCBwb3NpdGlvbiwgaW4gb3JkZXJcbiAgICAgICAgY2FsY3VsYXRlZEFsaWdubWVudCA9IHBvc3NpYmxlQWxpZ25tZW50c1swXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaWYgc2NyZWVuIHdpZHRoIGlzIHRvbyBzbWFsbFxuICAgICAgLy8gZm9yIEFOWSBhbGlnbm1lbnQsIG1pZGRsZSBpc1xuICAgICAgLy8gcHJvYmFibHkgdGhlIGJlc3QgZm9yIHZpc2liaWxpdHlcbiAgICAgIGNhbGN1bGF0ZWRBbGlnbm1lbnQgPSAnLW1pZGRsZS1hbGlnbmVkJztcbiAgICB9XG5cbiAgICByZXR1cm4gY2FsY3VsYXRlZEFsaWdubWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZW50cnkgZnJvbSBhIHN0cmluZyBhcnJheSBpZiBpdCdzIHRoZXJlLCBkb2VzIG5vdGhpbmcgaWYgaXQgaXNuJ3QgdGhlcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHN0cmluZ0FycmF5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmdUb1JlbW92ZVxuICAgKi9cbiAgZnVuY3Rpb24gX3JlbW92ZUVudHJ5KHN0cmluZ0FycmF5LCBzdHJpbmdUb1JlbW92ZSkge1xuICAgIGlmIChzdHJpbmdBcnJheS5pbmRleE9mKHN0cmluZ1RvUmVtb3ZlKSA+IC0xKSB7XG4gICAgICBzdHJpbmdBcnJheS5zcGxpY2Uoc3RyaW5nQXJyYXkuaW5kZXhPZihzdHJpbmdUb1JlbW92ZSksIDEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHBvc2l0aW9uIG9mIHRoZSBoZWxwZXIgbGF5ZXIgb24gdGhlIHNjcmVlblxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gaGVscGVyTGF5ZXJcbiAgICovXG4gIGZ1bmN0aW9uIF9zZXRIZWxwZXJMYXllclBvc2l0aW9uKGhlbHBlckxheWVyKSB7XG4gICAgaWYgKGhlbHBlckxheWVyKSB7XG4gICAgICAvL3ByZXZlbnQgZXJyb3Igd2hlbiBgdGhpcy5fY3VycmVudFN0ZXBgIGluIHVuZGVmaW5lZFxuICAgICAgaWYgKCF0aGlzLl9pbnRyb0l0ZW1zW3RoaXMuX2N1cnJlbnRTdGVwXSkgcmV0dXJuO1xuXG4gICAgICB2YXIgY3VycmVudEVsZW1lbnQgPSB0aGlzLl9pbnRyb0l0ZW1zW3RoaXMuX2N1cnJlbnRTdGVwXSxcbiAgICAgICAgZWxlbWVudFBvc2l0aW9uID0gX2dldE9mZnNldChjdXJyZW50RWxlbWVudC5lbGVtZW50KSxcbiAgICAgICAgd2lkdGhIZWlnaHRQYWRkaW5nID0gdGhpcy5fb3B0aW9ucy5oZWxwZXJFbGVtZW50UGFkZGluZztcblxuICAgICAgLy8gSWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGZpeGVkLCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgZml4ZWQgYXMgd2VsbC5cbiAgICAgIC8vIE90aGVyd2lzZSwgcmVtb3ZlIGEgZml4ZWQgY2xhc3MgdGhhdCBtYXkgYmUgbGVmdCBvdmVyIGZyb20gdGhlIHByZXZpb3VzXG4gICAgICAvLyBzdGVwLlxuICAgICAgaWYgKF9pc0ZpeGVkKGN1cnJlbnRFbGVtZW50LmVsZW1lbnQpKSB7XG4gICAgICAgIF9hZGRDbGFzcyhoZWxwZXJMYXllciwgJ2ludHJvanMtZml4ZWRUb29sdGlwJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfcmVtb3ZlQ2xhc3MoaGVscGVyTGF5ZXIsICdpbnRyb2pzLWZpeGVkVG9vbHRpcCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQucG9zaXRpb24gPT09ICdmbG9hdGluZycpIHtcbiAgICAgICAgd2lkdGhIZWlnaHRQYWRkaW5nID0gMDtcbiAgICAgIH1cblxuICAgICAgLy9zZXQgbmV3IHBvc2l0aW9uIHRvIGhlbHBlciBsYXllclxuICAgICAgaGVscGVyTGF5ZXIuc3R5bGUuY3NzVGV4dCA9XG4gICAgICAgICd3aWR0aDogJyArXG4gICAgICAgIChlbGVtZW50UG9zaXRpb24ud2lkdGggKyB3aWR0aEhlaWdodFBhZGRpbmcpICtcbiAgICAgICAgJ3B4OyAnICtcbiAgICAgICAgJ2hlaWdodDonICtcbiAgICAgICAgKGVsZW1lbnRQb3NpdGlvbi5oZWlnaHQgKyB3aWR0aEhlaWdodFBhZGRpbmcpICtcbiAgICAgICAgJ3B4OyAnICtcbiAgICAgICAgJ3RvcDonICtcbiAgICAgICAgKGVsZW1lbnRQb3NpdGlvbi50b3AgLSB3aWR0aEhlaWdodFBhZGRpbmcgLyAyKSArXG4gICAgICAgICdweDsnICtcbiAgICAgICAgJ2xlZnQ6ICcgK1xuICAgICAgICAoZWxlbWVudFBvc2l0aW9uLmxlZnQgLSB3aWR0aEhlaWdodFBhZGRpbmcgLyAyKSArXG4gICAgICAgICdweDsnO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIF9zZXRDbGlwUGF0aE9mSGVscGVyLmNhbGwodGhpcywgaGVscGVyTGF5ZXIpO1xuICAgICAgfSwgMzUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZGlzYWJsZWludGVyYWN0aW9uIGxheWVyIGFuZCBhZGp1c3QgdGhlIHNpemUgYW5kIHBvc2l0aW9uIG9mIHRoZSBsYXllclxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfZGlzYWJsZUludGVyYWN0aW9uXG4gICAqL1xuICBmdW5jdGlvbiBfZGlzYWJsZUludGVyYWN0aW9uKCkge1xuICAgIHZhciBkaXNhYmxlSW50ZXJhY3Rpb25MYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmludHJvanMtZGlzYWJsZUludGVyYWN0aW9uJ1xuICAgICk7XG5cbiAgICBpZiAoZGlzYWJsZUludGVyYWN0aW9uTGF5ZXIgPT09IG51bGwpIHtcbiAgICAgIGRpc2FibGVJbnRlcmFjdGlvbkxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXNhYmxlSW50ZXJhY3Rpb25MYXllci5jbGFzc05hbWUgPSAnaW50cm9qcy1kaXNhYmxlSW50ZXJhY3Rpb24nO1xuICAgICAgdGhpcy5fdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChkaXNhYmxlSW50ZXJhY3Rpb25MYXllcik7XG4gICAgfVxuXG4gICAgX3NldEhlbHBlckxheWVyUG9zaXRpb24uY2FsbCh0aGlzLCBkaXNhYmxlSW50ZXJhY3Rpb25MYXllcik7XG4gIH1cblxuICAvKipcbiAgICogU2V0dGluZyBhbmNob3JzIHRvIGJlaGF2ZSBsaWtlIGJ1dHRvbnNcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX3NldEFuY2hvckFzQnV0dG9uXG4gICAqL1xuICBmdW5jdGlvbiBfc2V0QW5jaG9yQXNCdXR0b24oYW5jaG9yKSB7XG4gICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcbiAgICBhbmNob3IudGFiSW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9nZXREaW1lbnNpb25zXG4gICAqL1xuICBmdW5jdGlvbiBfZ2V0RGltZW5zaW9ucyhoZWxwZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IGhlbHBlci5vZmZzZXRXaWR0aCxcbiAgICAgIGhlaWdodDogaGVscGVyLm9mZnNldEhlaWdodCxcbiAgICAgIGxlZnQ6IGhlbHBlci5vZmZzZXRMZWZ0LFxuICAgICAgdG9wOiBoZWxwZXIub2Zmc2V0VG9wXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfc2V0Q2xpcFBhdGhPZkhlbHBlclxuICAgKi9cbiAgZnVuY3Rpb24gX3NldENsaXBQYXRoT2ZIZWxwZXIoaGVscGVyTGF5ZXIpIHtcbiAgICAvLyDQutC+0YHRgtGL0LvRjCBjb25zdCBzdGVwID0gdGhpcy5faW50cm9JdGVtc1t0aGlzLl9jdXJyZW50U3RlcF07XG4gICAgY29uc3Qgc3RlcCA9IHRoaXMuX2ludHJvSXRlbXNbMF07XG4gICAgXG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRyb2pzLW92ZXJsYXknKTtcbiAgICBpZiAoc3RlcC5maXhlZCkge1xuICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3AgfSA9IF9nZXREaW1lbnNpb25zLmNhbGwoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIGhlbHBlckxheWVyXG4gICAgICApO1xuICAgICAgY29uc3QgY29vcmRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgeDogJzAlJyxcbiAgICAgICAgICB5OiAnMCUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnMCUnLFxuICAgICAgICAgIHk6ICcxMDAlJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogbGVmdCArICdweCcsXG4gICAgICAgICAgeTogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBsZWZ0ICsgJ3B4JyxcbiAgICAgICAgICB5OiB0b3AgKyAncHgnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBsZWZ0ICsgd2lkdGggKyAncHgnLFxuICAgICAgICAgIHk6IHRvcCArICdweCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6IGxlZnQgKyB3aWR0aCArICdweCcsXG4gICAgICAgICAgeTogdG9wICsgaGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogbGVmdCArICdweCcsXG4gICAgICAgICAgeTogdG9wICsgaGVpZ2h0ICsgJ3B4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogbGVmdCArICdweCcsXG4gICAgICAgICAgeTogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnMTAwJScsXG4gICAgICAgICAgeTogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnMTAwJScsXG4gICAgICAgICAgeTogJzAlJ1xuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICBpZiAob3ZlcmxheSkge1xuICAgICAgICBvdmVybGF5LnN0eWxlLmNsaXBQYXRoID0gYHBvbHlnb24oJHtjb29yZHNcbiAgICAgICAgICAubWFwKCh7IHgsIHkgfSkgPT4geCArICcgJyArIHkpXG4gICAgICAgICAgLmpvaW4oJywgJyl9KWA7XG4gICAgICB9XG5cbiAgICAgIGhlbHBlckxheWVyLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB9IGVsc2Uge1xuICAgICAgb3ZlcmxheS5zdHlsZS5jbGlwUGF0aCA9ICcnO1xuICAgICAgaGVscGVyTGF5ZXIuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2hvdyBhbiBlbGVtZW50IG9uIHRoZSBwYWdlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9zaG93RWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0RWxlbWVudFxuICAgKi9cbiAgZnVuY3Rpb24gX3Nob3dFbGVtZW50KHRhcmdldEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludHJvQ2hhbmdlQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLl9pbnRyb0NoYW5nZUNhbGxiYWNrLmNhbGwodGhpcywgdGFyZ2V0RWxlbWVudC5lbGVtZW50KTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICBvbGRIZWxwZXJMYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRyb2pzLWhlbHBlckxheWVyJyksXG4gICAgICBvbGRSZWZlcmVuY2VMYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcuaW50cm9qcy10b29sdGlwUmVmZXJlbmNlTGF5ZXInXG4gICAgICApLFxuICAgICAgaGlnaGxpZ2h0Q2xhc3MgPSAnaW50cm9qcy1oZWxwZXJMYXllcicsXG4gICAgICBzY3JvbGxQYXJlbnQ7XG5cbiAgICAvL2NoZWNrIGZvciBhIGN1cnJlbnQgc3RlcCBoaWdobGlnaHQgY2xhc3NcbiAgICBpZiAodHlwZW9mIHRhcmdldEVsZW1lbnQuaGlnaGxpZ2h0Q2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBoaWdobGlnaHRDbGFzcyArPSAnICcgKyB0YXJnZXRFbGVtZW50LmhpZ2hsaWdodENsYXNzO1xuICAgIH1cbiAgICAvL2NoZWNrIGZvciBvcHRpb25zIGhpZ2hsaWdodCBjbGFzc1xuICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5oaWdobGlnaHRDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGhpZ2hsaWdodENsYXNzICs9ICcgJyArIHRoaXMuX29wdGlvbnMuaGlnaGxpZ2h0Q2xhc3M7XG4gICAgfVxuXG4gICAgaWYgKG9sZEhlbHBlckxheWVyICE9PSBudWxsKSB7XG4gICAgICBcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnRcbiAgICAgIHNjcm9sbFBhcmVudCA9IF9nZXRTY3JvbGxQYXJlbnQodGFyZ2V0RWxlbWVudC5lbGVtZW50KTtcblxuICAgICAgaWYgKHNjcm9sbFBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAvLyB0YXJnZXQgaXMgd2l0aGluIGEgc2Nyb2xsYWJsZSBlbGVtZW50XG4gICAgICAgIF9zY3JvbGxQYXJlbnRUb0VsZW1lbnQoc2Nyb2xsUGFyZW50LCB0YXJnZXRFbGVtZW50LmVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBzZXQgbmV3IHBvc2l0aW9uIHRvIGhlbHBlciBsYXllclxuICAgICAgX3NldEhlbHBlckxheWVyUG9zaXRpb24uY2FsbChzZWxmLCBvbGRIZWxwZXJMYXllcik7XG4gICAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKHNlbGYsIG9sZFJlZmVyZW5jZUxheWVyKTtcblxuICAgICAgLy9yZW1vdmUgYGludHJvanMtZml4UGFyZW50YCBjbGFzcyBmcm9tIHRoZSBlbGVtZW50c1xuICAgICAgdmFyIGZpeFBhcmVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW50cm9qcy1maXhQYXJlbnQnKTtcbiAgICAgIF9mb3JFYWNoKGZpeFBhcmVudHMsIGZ1bmN0aW9uKHBhcmVudCkge1xuICAgICAgICBfcmVtb3ZlQ2xhc3MocGFyZW50LCAvaW50cm9qcy1maXhQYXJlbnQvZyk7XG4gICAgICB9KTtcblxuICAgICAgLy9yZW1vdmUgb2xkIGNsYXNzZXMgaWYgdGhlIGVsZW1lbnQgc3RpbGwgZXhpc3RcbiAgICAgIF9yZW1vdmVTaG93RWxlbWVudCgpO1xuXG4gICAgICAvL3dlIHNob3VsZCB3YWl0IHVudGlsIHRoZSBDU1MzIHRyYW5zaXRpb24gaXMgY29tcGV0ZWQgKGl0J3MgMC4zIHNlYykgdG8gcHJldmVudCBpbmNvcnJlY3QgYGhlaWdodGAgYW5kIGB3aWR0aGAgY2FsY3VsYXRpb25cbiAgICAgIGlmIChzZWxmLl9sYXN0U2hvd0VsZW1lbnRUaW1lcikge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHNlbGYuX2xhc3RTaG93RWxlbWVudFRpbWVyKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi5fbGFzdFNob3dFbGVtZW50VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY2hhbmdlIHRoZSBzY3JvbGwgb2YgdGhlIHdpbmRvdywgaWYgbmVlZGVkXG4gICAgICAgIF9zY3JvbGxUby5jYWxsKHNlbGYsIHRhcmdldEVsZW1lbnQuc2Nyb2xsVG8sIHRhcmdldEVsZW1lbnQpO1xuICAgICAgfSwgMzUwKTtcblxuICAgICAgLy8gZW5kIG9mIG9sZCBlbGVtZW50IGlmLWVsc2UgY29uZGl0aW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBoZWxwZXJMYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgICByZWZlcmVuY2VMYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBoZWxwZXJMYXllci5jbGFzc05hbWUgPSBoaWdobGlnaHRDbGFzcztcbiAgICAgIHJlZmVyZW5jZUxheWVyLmNsYXNzTmFtZSA9ICdpbnRyb2pzLXRvb2x0aXBSZWZlcmVuY2VMYXllcic7XG5cbiAgICAgIC8vIHNjcm9sbCB0byBlbGVtZW50XG4gICAgICBzY3JvbGxQYXJlbnQgPSBfZ2V0U2Nyb2xsUGFyZW50KHRhcmdldEVsZW1lbnQuZWxlbWVudCk7XG5cbiAgICAgIGlmIChzY3JvbGxQYXJlbnQgIT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICAgICAgLy8gdGFyZ2V0IGlzIHdpdGhpbiBhIHNjcm9sbGFibGUgZWxlbWVudFxuICAgICAgICBfc2Nyb2xsUGFyZW50VG9FbGVtZW50KHNjcm9sbFBhcmVudCwgdGFyZ2V0RWxlbWVudC5lbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgLy9zZXQgbmV3IHBvc2l0aW9uIHRvIGhlbHBlciBsYXllclxuICAgICAgX3NldEhlbHBlckxheWVyUG9zaXRpb24uY2FsbChzZWxmLCBoZWxwZXJMYXllcik7XG4gICAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKHNlbGYsIHJlZmVyZW5jZUxheWVyKTtcblxuICAgICAgLy9hZGQgaGVscGVyIGxheWVyIHRvIHRhcmdldCBlbGVtZW50XG4gICAgICB0aGlzLl90YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGhlbHBlckxheWVyKTtcbiAgICAgIHRoaXMuX3RhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQocmVmZXJlbmNlTGF5ZXIpO1xuIFxuICAgICAgLy8gY2hhbmdlIHRoZSBzY3JvbGwgb2YgdGhlIHdpbmRvdywgaWYgbmVlZGVkXG4gICAgICBfc2Nyb2xsVG8uY2FsbCh0aGlzLCB0YXJnZXRFbGVtZW50LnNjcm9sbFRvLCB0YXJnZXRFbGVtZW50KTtcblxuICAgICAgLy9lbmQgb2YgbmV3IGVsZW1lbnQgaWYtZWxzZSBjb25kaXRpb25cbiAgICB9XG5cbiAgICAvLyByZW1vdmluZyBwcmV2aW91cyBkaXNhYmxlIGludGVyYWN0aW9uIGxheWVyXG4gICAgdmFyIGRpc2FibGVJbnRlcmFjdGlvbkxheWVyID0gc2VsZi5fdGFyZ2V0RWxlbWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgJy5pbnRyb2pzLWRpc2FibGVJbnRlcmFjdGlvbidcbiAgICApO1xuICAgIGlmIChkaXNhYmxlSW50ZXJhY3Rpb25MYXllcikge1xuICAgICAgZGlzYWJsZUludGVyYWN0aW9uTGF5ZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkaXNhYmxlSW50ZXJhY3Rpb25MYXllcik7XG4gICAgfVxuXG4gICAgLy9kaXNhYmxlIGludGVyYWN0aW9uXG4gICAgaWYgKHRhcmdldEVsZW1lbnQuZGlzYWJsZUludGVyYWN0aW9uKSB7XG4gICAgICBfZGlzYWJsZUludGVyYWN0aW9uLmNhbGwoc2VsZik7XG4gICAgfVxuXG4gICAgX3NldFNob3dFbGVtZW50KHRhcmdldEVsZW1lbnQpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9pbnRyb0FmdGVyQ2hhbmdlQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLl9pbnRyb0FmdGVyQ2hhbmdlQ2FsbGJhY2suY2FsbCh0aGlzLCB0YXJnZXRFbGVtZW50LmVsZW1lbnQpO1xuICAgIH1cbiAgICBcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBjaGFuZ2UgdGhlIHNjcm9sbCBvZiBgd2luZG93YCBhZnRlciBoaWdobGlnaHRpbmcgYW4gZWxlbWVudFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfc2Nyb2xsVG9cbiAgICogQHBhcmFtIHtTdHJpbmd9IHNjcm9sbFRvXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRFbGVtZW50XG4gICAqL1xuICBmdW5jdGlvbiBfc2Nyb2xsVG8oc2Nyb2xsVG8sIHRhcmdldEVsZW1lbnQpIHtcbiAgICBpZiAoc2Nyb2xsVG8gPT09ICdvZmYnKSByZXR1cm47XG4gICAgdmFyIHJlY3Q7XG5cbiAgICBpZiAoIXRoaXMuX29wdGlvbnMuc2Nyb2xsVG9FbGVtZW50KSByZXR1cm47XG5cbiAgICByZWN0ID0gdGFyZ2V0RWxlbWVudC5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYgKCFfZWxlbWVudEluVmlld3BvcnQodGFyZ2V0RWxlbWVudC5lbGVtZW50KSkge1xuICAgICAgdmFyIHdpbkhlaWdodCA9IF9nZXRXaW5TaXplKCkuaGVpZ2h0O1xuICAgICAgdmFyIHRvcCA9IHJlY3QuYm90dG9tIC0gKHJlY3QuYm90dG9tIC0gcmVjdC50b3ApO1xuXG4gICAgICAvLyBUT0RPIChhZnNoaW5tKTogZG8gd2UgbmVlZCBzY3JvbGwgcGFkZGluZyBub3c/XG4gICAgICAvLyBJIGhhdmUgY2hhbmdlZCB0aGUgc2Nyb2xsIG9wdGlvbiBhbmQgbm93IGl0IHNjcm9sbHMgdGhlIHdpbmRvdyB0b1xuICAgICAgLy8gdGhlIGNlbnRlciBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQgb3IgdG9vbHRpcC5cblxuICAgICAgaWYgKHRvcCA8IDAgfHwgdGFyZ2V0RWxlbWVudC5lbGVtZW50LmNsaWVudEhlaWdodCA+IHdpbkhlaWdodCkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoXG4gICAgICAgICAgMCxcbiAgICAgICAgICByZWN0LnRvcCAtXG4gICAgICAgICAgICAod2luSGVpZ2h0IC8gMiAtIHJlY3QuaGVpZ2h0IC8gMikgLVxuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zY3JvbGxQYWRkaW5nXG4gICAgICAgICk7IC8vIDMwcHggcGFkZGluZyBmcm9tIGVkZ2UgdG8gbG9vayBuaWNlXG5cbiAgICAgICAgLy9TY3JvbGwgZG93blxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnNjcm9sbEJ5KFxuICAgICAgICAgIDAsXG4gICAgICAgICAgcmVjdC50b3AgLVxuICAgICAgICAgICAgKHdpbkhlaWdodCAvIDIgLSByZWN0LmhlaWdodCAvIDIpICtcbiAgICAgICAgICAgIHRoaXMuX29wdGlvbnMuc2Nyb2xsUGFkZGluZ1xuICAgICAgICApOyAvLyAzMHB4IHBhZGRpbmcgZnJvbSBlZGdlIHRvIGxvb2sgbmljZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUbyByZW1vdmUgYWxsIHNob3cgZWxlbWVudChzKVxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfcmVtb3ZlU2hvd0VsZW1lbnRcbiAgICovXG4gIGZ1bmN0aW9uIF9yZW1vdmVTaG93RWxlbWVudCgpIHtcbiAgICB2YXIgZWxtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnRyb2pzLXNob3dFbGVtZW50Jyk7XG5cbiAgICBfZm9yRWFjaChlbG1zLCBmdW5jdGlvbihlbG0pIHtcbiAgICAgIF9yZW1vdmVDbGFzcyhlbG0sIC9pbnRyb2pzLVthLXpBLVpdKy9nKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUbyBzZXQgdGhlIHNob3cgZWxlbWVudFxuICAgKiBUaGlzIGZ1bmN0aW9uIHNldCBhIHJlbGF0aXZlIChpbiBtb3N0IGNhc2VzKSBwb3NpdGlvbiBhbmQgY2hhbmdlcyB0aGUgei1pbmRleFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfc2V0U2hvd0VsZW1lbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldEVsZW1lbnRcbiAgICovXG4gIGZ1bmN0aW9uIF9zZXRTaG93RWxlbWVudCh0YXJnZXRFbGVtZW50KSB7XG4gICAgdmFyIHBhcmVudEVsbTtcbiAgICAvLyB3ZSBuZWVkIHRvIGFkZCB0aGlzIHNob3cgZWxlbWVudCBjbGFzcyB0byB0aGUgcGFyZW50IG9mIFNWRyBlbGVtZW50c1xuICAgIC8vIGJlY2F1c2UgdGhlIFNWRyBlbGVtZW50cyBjYW4ndCBoYXZlIGluZGVwZW5kZW50IHotaW5kZXhcbiAgICBpZiAodGFyZ2V0RWxlbWVudC5lbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgcGFyZW50RWxtID0gdGFyZ2V0RWxlbWVudC5lbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAgIHdoaWxlICh0YXJnZXRFbGVtZW50LmVsZW1lbnQucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoIXBhcmVudEVsbS50YWdOYW1lIHx8IHBhcmVudEVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdib2R5JylcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBpZiAocGFyZW50RWxtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3N2ZycpIHtcbiAgICAgICAgICBfYWRkQ2xhc3MocGFyZW50RWxtLCAnaW50cm9qcy1zaG93RWxlbWVudCBpbnRyb2pzLXJlbGF0aXZlUG9zaXRpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmVudEVsbSA9IHBhcmVudEVsbS5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9hZGRDbGFzcyh0YXJnZXRFbGVtZW50LmVsZW1lbnQsICdpbnRyb2pzLXNob3dFbGVtZW50Jyk7XG5cbiAgICB2YXIgY3VycmVudEVsZW1lbnRQb3NpdGlvbiA9IF9nZXRQcm9wVmFsdWUoXG4gICAgICB0YXJnZXRFbGVtZW50LmVsZW1lbnQsXG4gICAgICAncG9zaXRpb24nXG4gICAgKTtcbiAgICBpZiAoXG4gICAgICBjdXJyZW50RWxlbWVudFBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmXG4gICAgICBjdXJyZW50RWxlbWVudFBvc2l0aW9uICE9PSAncmVsYXRpdmUnICYmXG4gICAgICBjdXJyZW50RWxlbWVudFBvc2l0aW9uICE9PSAnZml4ZWQnXG4gICAgKSB7XG4gICAgICAvL2NoYW5nZSB0byBuZXcgaW50cm8gaXRlbVxuICAgICAgX2FkZENsYXNzKHRhcmdldEVsZW1lbnQuZWxlbWVudCwgJ2ludHJvanMtcmVsYXRpdmVQb3NpdGlvbicpO1xuICAgIH1cblxuICAgIHBhcmVudEVsbSA9IHRhcmdldEVsZW1lbnQuZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIHdoaWxlIChwYXJlbnRFbG0gIT09IG51bGwpIHtcbiAgICAgIGlmICghcGFyZW50RWxtLnRhZ05hbWUgfHwgcGFyZW50RWxtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2JvZHknKVxuICAgICAgICBicmVhaztcblxuICAgICAgLy9maXggVGhlIFN0YWNraW5nIENvbnRleHQgcHJvYmxlbS5cbiAgICAgIC8vTW9yZSBkZXRhaWw6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0NTUy9VbmRlcnN0YW5kaW5nX3pfaW5kZXgvVGhlX3N0YWNraW5nX2NvbnRleHRcbiAgICAgIHZhciB6SW5kZXggPSBfZ2V0UHJvcFZhbHVlKHBhcmVudEVsbSwgJ3otaW5kZXgnKTtcbiAgICAgIHZhciBvcGFjaXR5ID0gcGFyc2VGbG9hdChfZ2V0UHJvcFZhbHVlKHBhcmVudEVsbSwgJ29wYWNpdHknKSk7XG4gICAgICB2YXIgdHJhbnNmb3JtID1cbiAgICAgICAgX2dldFByb3BWYWx1ZShwYXJlbnRFbG0sICd0cmFuc2Zvcm0nKSB8fFxuICAgICAgICBfZ2V0UHJvcFZhbHVlKHBhcmVudEVsbSwgJy13ZWJraXQtdHJhbnNmb3JtJykgfHxcbiAgICAgICAgX2dldFByb3BWYWx1ZShwYXJlbnRFbG0sICctbW96LXRyYW5zZm9ybScpIHx8XG4gICAgICAgIF9nZXRQcm9wVmFsdWUocGFyZW50RWxtLCAnLW1zLXRyYW5zZm9ybScpIHx8XG4gICAgICAgIF9nZXRQcm9wVmFsdWUocGFyZW50RWxtLCAnLW8tdHJhbnNmb3JtJyk7XG4gICAgICBpZiAoXG4gICAgICAgIC9bMC05XSsvLnRlc3QoekluZGV4KSB8fFxuICAgICAgICBvcGFjaXR5IDwgMSB8fFxuICAgICAgICAodHJhbnNmb3JtICE9PSAnbm9uZScgJiYgdHJhbnNmb3JtICE9PSB1bmRlZmluZWQpXG4gICAgICApIHtcbiAgICAgICAgX2FkZENsYXNzKHBhcmVudEVsbSwgJ2ludHJvanMtZml4UGFyZW50Jyk7XG4gICAgICB9XG5cbiAgICAgIHBhcmVudEVsbSA9IHBhcmVudEVsbS5wYXJlbnROb2RlO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlcyBhcnJheXNcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYXJyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZvckVhY2hGbmNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGxldGVGbmNcbiAgICogQHJldHVybiB7TnVsbH1cbiAgICovXG4gIGZ1bmN0aW9uIF9mb3JFYWNoKGFyciwgZm9yRWFjaEZuYywgY29tcGxldGVGbmMpIHtcbiAgICAvLyBpbiBjYXNlIGFyciBpcyBhbiBlbXB0eSBxdWVyeSBzZWxlY3RvciBub2RlIGxpc3RcbiAgICBpZiAoYXJyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGZvckVhY2hGbmMoYXJyW2ldLCBpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbXBsZXRlRm5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb21wbGV0ZUZuYygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrIGFueSBvYmplY3Qgd2l0aCBhbiBpbmNyZW1lbnRpbmcgbnVtYmVyXG4gICAqIHVzZWQgZm9yIGtlZXBpbmcgdHJhY2sgb2Ygb2JqZWN0c1xuICAgKlxuICAgKiBAcGFyYW0gT2JqZWN0IG9iaiAgIEFueSBvYmplY3Qgb3IgRE9NIEVsZW1lbnRcbiAgICogQHBhcmFtIFN0cmluZyBrZXlcbiAgICogQHJldHVybiBPYmplY3RcbiAgICovXG4gIHZhciBfc3RhbXAgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleXMgPSB7fTtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3RhbXAob2JqLCBrZXkpIHtcbiAgICAgIC8vIGdldCBncm91cCBrZXlcbiAgICAgIGtleSA9IGtleSB8fCAnaW50cm9qcy1zdGFtcCc7XG5cbiAgICAgIC8vIGVhY2ggZ3JvdXAgaW5jcmVtZW50cyBmcm9tIDBcbiAgICAgIGtleXNba2V5XSA9IGtleXNba2V5XSB8fCAwO1xuXG4gICAgICAvLyBzdGFtcCBvbmx5IG9uY2UgcGVyIG9iamVjdFxuICAgICAgaWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gaW5jcmVtZW50IGtleSBmb3IgZWFjaCBuZXcgb2JqZWN0XG4gICAgICAgIG9ialtrZXldID0ga2V5c1trZXldKys7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9O1xuICB9KSgpO1xuXG4gIC8qKlxuICAgKiBET01FdmVudCBIYW5kbGVzIGFsbCBET00gZXZlbnRzXG4gICAqXG4gICAqIG1ldGhvZHM6XG4gICAqXG4gICAqIG9uIC0gYWRkIGV2ZW50IGhhbmRsZXJcbiAgICogb2ZmIC0gcmVtb3ZlIGV2ZW50XG4gICAqL1xuICB2YXIgRE9NRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRE9NRXZlbnQoKSB7XG4gICAgICB2YXIgZXZlbnRzX2tleSA9ICdpbnRyb2pzX2V2ZW50JztcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXRzIGEgdW5pcXVlIElEIGZvciBhbiBldmVudCBsaXN0ZW5lclxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSBPYmplY3Qgb2JqXG4gICAgICAgKiBAcGFyYW0gU3RyaW5nIHR5cGUgICAgICAgIGV2ZW50IHR5cGVcbiAgICAgICAqIEBwYXJhbSBGdW5jdGlvbiBsaXN0ZW5lclxuICAgICAgICogQHBhcmFtIE9iamVjdCBjb250ZXh0XG4gICAgICAgKiBAcmV0dXJuIFN0cmluZ1xuICAgICAgICovXG4gICAgICB0aGlzLl9pZCA9IGZ1bmN0aW9uKG9iaiwgdHlwZSwgbGlzdGVuZXIsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUgKyBfc3RhbXAobGlzdGVuZXIpICsgKGNvbnRleHQgPyAnXycgKyBfc3RhbXAoY29udGV4dCkgOiAnJyk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gT2JqZWN0IG9ialxuICAgICAgICogQHBhcmFtIFN0cmluZyB0eXBlICAgICAgICBldmVudCB0eXBlXG4gICAgICAgKiBAcGFyYW0gRnVuY3Rpb24gbGlzdGVuZXJcbiAgICAgICAqIEBwYXJhbSBPYmplY3QgY29udGV4dFxuICAgICAgICogQHBhcmFtIEJvb2xlYW4gdXNlQ2FwdHVyZVxuICAgICAgICogQHJldHVybiBudWxsXG4gICAgICAgKi9cbiAgICAgIHRoaXMub24gPSBmdW5jdGlvbihvYmosIHR5cGUsIGxpc3RlbmVyLCBjb250ZXh0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuX2lkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksXG4gICAgICAgICAgaGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5lci5jYWxsKGNvbnRleHQgfHwgb2JqLCBlIHx8IHdpbmRvdy5ldmVudCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICBpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIG9iaikge1xuICAgICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICB9IGVsc2UgaWYgKCdhdHRhY2hFdmVudCcgaW4gb2JqKSB7XG4gICAgICAgICAgb2JqLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9ialtldmVudHNfa2V5XSA9IG9ialtldmVudHNfa2V5XSB8fCB7fTtcbiAgICAgICAgb2JqW2V2ZW50c19rZXldW2lkXSA9IGhhbmRsZXI7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gT2JqZWN0IG9ialxuICAgICAgICogQHBhcmFtIFN0cmluZyB0eXBlICAgICAgICBldmVudCB0eXBlXG4gICAgICAgKiBAcGFyYW0gRnVuY3Rpb24gbGlzdGVuZXJcbiAgICAgICAqIEBwYXJhbSBPYmplY3QgY29udGV4dFxuICAgICAgICogQHBhcmFtIEJvb2xlYW4gdXNlQ2FwdHVyZVxuICAgICAgICogQHJldHVybiBudWxsXG4gICAgICAgKi9cbiAgICAgIHRoaXMub2ZmID0gZnVuY3Rpb24ob2JqLCB0eXBlLCBsaXN0ZW5lciwgY29udGV4dCwgdXNlQ2FwdHVyZSkge1xuICAgICAgICB2YXIgaWQgPSB0aGlzLl9pZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICAgIGhhbmRsZXIgPSBvYmpbZXZlbnRzX2tleV0gJiYgb2JqW2V2ZW50c19rZXldW2lkXTtcblxuICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoJ3JlbW92ZUV2ZW50TGlzdGVuZXInIGluIG9iaikge1xuICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIHVzZUNhcHR1cmUpO1xuICAgICAgICB9IGVsc2UgaWYgKCdkZXRhY2hFdmVudCcgaW4gb2JqKSB7XG4gICAgICAgICAgb2JqLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9ialtldmVudHNfa2V5XVtpZF0gPSBudWxsO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IERPTUV2ZW50KCk7XG4gIH0pKCk7XG5cbiAgLyoqXG4gICAqIEFwcGVuZCBhIGNsYXNzIHRvIGFuIGVsZW1lbnRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2FkZENsYXNzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc05hbWVcbiAgICogQHJldHVybnMgbnVsbFxuICAgKi9cbiAgZnVuY3Rpb24gX2FkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgLy8gc3ZnXG4gICAgICB2YXIgcHJlID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJyc7XG5cbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIHByZSArICcgJyArIGNsYXNzTmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlbGVtZW50LmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIGNoZWNrIGZvciBtb2Rlcm4gY2xhc3NMaXN0IHByb3BlcnR5XG4gICAgICAgIHZhciBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgIF9mb3JFYWNoKGNsYXNzZXMsIGZ1bmN0aW9uKGNscykge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoIWVsZW1lbnQuY2xhc3NOYW1lLm1hdGNoKGNsYXNzTmFtZSkpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgZWxlbWVudCBkb2Vzbid0IGFscmVhZHkgaGF2ZSBjbGFzc05hbWVcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBjbGFzcyBmcm9tIGFuIGVsZW1lbnRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX3JlbW92ZUNsYXNzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50XG4gICAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gY2xhc3NOYW1lUmVnZXggY2FuIGJlIHJlZ2V4IG9yIHN0cmluZ1xuICAgKiBAcmV0dXJucyBudWxsXG4gICAqL1xuICBmdW5jdGlvbiBfcmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lUmVnZXgpIHtcbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpIHtcbiAgICAgIHZhciBwcmUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcblxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICdjbGFzcycsXG4gICAgICAgIHByZS5yZXBsYWNlKGNsYXNzTmFtZVJlZ2V4LCAnJykucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lXG4gICAgICAgIC5yZXBsYWNlKGNsYXNzTmFtZVJlZ2V4LCAnJylcbiAgICAgICAgLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGVsZW1lbnQgQ1NTIHByb3BlcnR5IG9uIHRoZSBwYWdlXG4gICAqIFRoYW5rcyB0byBKYXZhU2NyaXB0IEtpdDogaHR0cDovL3d3dy5qYXZhc2NyaXB0a2l0LmNvbS9kaHRtbHR1dG9ycy9kaHRtbGNhc2NhZGU0LnNodG1sXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9nZXRQcm9wVmFsdWVcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEByZXR1cm5zIEVsZW1lbnQncyBwcm9wZXJ0eSB2YWx1ZVxuICAgKi9cbiAgZnVuY3Rpb24gX2dldFByb3BWYWx1ZShlbGVtZW50LCBwcm9wTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSAnJztcbiAgICBpZiAoZWxlbWVudC5jdXJyZW50U3R5bGUpIHtcbiAgICAgIC8vSUVcbiAgICAgIHByb3BWYWx1ZSA9IGVsZW1lbnQuY3VycmVudFN0eWxlW3Byb3BOYW1lXTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRlZmF1bHRWaWV3ICYmIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICAgIC8vT3RoZXJzXG4gICAgICBwcm9wVmFsdWUgPSBkb2N1bWVudC5kZWZhdWx0Vmlld1xuICAgICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKVxuICAgICAgICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wTmFtZSk7XG4gICAgfVxuXG4gICAgLy9QcmV2ZW50IGV4Y2VwdGlvbiBpbiBJRVxuICAgIGlmIChwcm9wVmFsdWUgJiYgcHJvcFZhbHVlLnRvTG93ZXJDYXNlKSB7XG4gICAgICByZXR1cm4gcHJvcFZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwcm9wVmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0byBzZWUgaWYgdGFyZ2V0IGVsZW1lbnQgKG9yIHBhcmVudHMpIHBvc2l0aW9uIGlzIGZpeGVkIG9yIG5vdFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfaXNGaXhlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudFxuICAgKiBAcmV0dXJucyBCb29sZWFuXG4gICAqL1xuICBmdW5jdGlvbiBfaXNGaXhlZChlbGVtZW50KSB7XG4gICAgdmFyIHAgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICBpZiAoIXAgfHwgcC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKF9nZXRQcm9wVmFsdWUoZWxlbWVudCwgJ3Bvc2l0aW9uJykgPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBfaXNGaXhlZChwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm92aWRlcyBhIGNyb3NzLWJyb3dzZXIgd2F5IHRvIGdldCB0aGUgc2NyZWVuIGRpbWVuc2lvbnNcbiAgICogdmlhOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU4NjQ0NjcvaW50ZXJuZXQtZXhwbG9yZXItaW5uZXJoZWlnaHRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2dldFdpblNpemVcbiAgICogQHJldHVybnMge09iamVjdH0gd2lkdGggYW5kIGhlaWdodCBhdHRyaWJ1dGVzXG4gICAqL1xuICBmdW5jdGlvbiBfZ2V0V2luU2l6ZSgpIHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHsgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgRCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICAgIHJldHVybiB7IHdpZHRoOiBELmNsaWVudFdpZHRoLCBoZWlnaHQ6IEQuY2xpZW50SGVpZ2h0IH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRvIHNlZSBpZiB0aGUgZWxlbWVudCBpcyBpbiB0aGUgdmlld3BvcnQgb3Igbm90XG4gICAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTIzOTk5L2hvdy10by10ZWxsLWlmLWEtZG9tLWVsZW1lbnQtaXMtdmlzaWJsZS1pbi10aGUtY3VycmVudC12aWV3cG9ydFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfZWxlbWVudEluVmlld3BvcnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsXG4gICAqL1xuICBmdW5jdGlvbiBfZWxlbWVudEluVmlld3BvcnQoZWwpIHtcbiAgICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIHJlY3QudG9wID49IDAgJiZcbiAgICAgIHJlY3QubGVmdCA+PSAwICYmXG4gICAgICByZWN0LmJvdHRvbSArIDgwIDw9IHdpbmRvdy5pbm5lckhlaWdodCAmJiAvLyBhZGQgODAgdG8gZ2V0IHRoZSB0ZXh0IHJpZ2h0XG4gICAgICByZWN0LnJpZ2h0IDw9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgb3ZlcmxheSBsYXllciB0byB0aGUgcGFnZVxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfYWRkT3ZlcmxheUxheWVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRFbG1cbiAgICovXG4gIGZ1bmN0aW9uIF9hZGRPdmVybGF5TGF5ZXIodGFyZ2V0RWxtKSB7XG4gICAgdmFyIG92ZXJsYXlMYXllciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgICAgc3R5bGVUZXh0ID0gJycsXG4gICAgICBzZWxmID0gdGhpcztcblxuICAgIC8vc2V0IGNzcyBjbGFzcyBuYW1lXG4gICAgb3ZlcmxheUxheWVyLmNsYXNzTmFtZSA9ICdpbnRyb2pzLW92ZXJsYXknO1xuXG4gICAgLy9jaGVjayBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYm9keSwgd2Ugc2hvdWxkIGNhbGN1bGF0ZSB0aGUgc2l6ZSBvZiBvdmVybGF5IGxheWVyIGluIGEgYmV0dGVyIHdheVxuICAgIGlmICghdGFyZ2V0RWxtLnRhZ05hbWUgfHwgdGFyZ2V0RWxtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2JvZHknKSB7XG4gICAgICBzdHlsZVRleHQgKz0gJ3RvcDogMDtib3R0b206IDA7IGxlZnQ6IDA7cmlnaHQ6IDA7cG9zaXRpb246IGZpeGVkOyc7XG4gICAgICBvdmVybGF5TGF5ZXIuc3R5bGUuY3NzVGV4dCA9IHN0eWxlVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy9zZXQgb3ZlcmxheSBsYXllciBwb3NpdGlvblxuICAgICAgdmFyIGVsZW1lbnRQb3NpdGlvbiA9IF9nZXRPZmZzZXQodGFyZ2V0RWxtKTtcbiAgICAgIGlmIChlbGVtZW50UG9zaXRpb24pIHtcbiAgICAgICAgc3R5bGVUZXh0ICs9XG4gICAgICAgICAgJ3dpZHRoOiAnICtcbiAgICAgICAgICBlbGVtZW50UG9zaXRpb24ud2lkdGggK1xuICAgICAgICAgICdweDsgaGVpZ2h0OicgK1xuICAgICAgICAgIGVsZW1lbnRQb3NpdGlvbi5oZWlnaHQgK1xuICAgICAgICAgICdweDsgdG9wOicgK1xuICAgICAgICAgIGVsZW1lbnRQb3NpdGlvbi50b3AgK1xuICAgICAgICAgICdweDtsZWZ0OiAnICtcbiAgICAgICAgICBlbGVtZW50UG9zaXRpb24ubGVmdCArXG4gICAgICAgICAgJ3B4Oyc7XG4gICAgICAgIG92ZXJsYXlMYXllci5zdHlsZS5jc3NUZXh0ID0gc3R5bGVUZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRhcmdldEVsbS5hcHBlbmRDaGlsZChvdmVybGF5TGF5ZXIpO1xuXG4gICAgb3ZlcmxheUxheWVyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLl9vcHRpb25zLmV4aXRPbk92ZXJsYXlDbGljayA9PT0gdHJ1ZSkge1xuICAgICAgICBfZXhpdEludHJvLmNhbGwoc2VsZiwgdGFyZ2V0RWxtKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBzdHlsZVRleHQgKz0gJ29wYWNpdHk6ICcgKyBzZWxmLl9vcHRpb25zLm92ZXJsYXlPcGFjaXR5LnRvU3RyaW5nKCkgKyAnOyc7XG4gICAgICBvdmVybGF5TGF5ZXIuc3R5bGUuY3NzVGV4dCA9IHN0eWxlVGV4dDtcbiAgICB9LCAxMCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGVsZW1lbnQgcG9zaXRpb24gb24gdGhlIHBhZ2VcbiAgICogVGhhbmtzIHRvIGBtZW91d2A6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ0MjQ3NC8zNzU5NjZcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2dldE9mZnNldFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudFxuICAgKiBAcmV0dXJucyBFbGVtZW50J3MgcG9zaXRpb24gaW5mb1xuICAgKi9cbiAgZnVuY3Rpb24gX2dldE9mZnNldChlbGVtZW50KSB7XG4gICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIHZhciBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB2YXIgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcDtcbiAgICB2YXIgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcbiAgICB2YXIgeCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogeC50b3AgKyBzY3JvbGxUb3AsXG4gICAgICB3aWR0aDogeC53aWR0aCxcbiAgICAgIGhlaWdodDogeC5oZWlnaHQsXG4gICAgICBsZWZ0OiB4LmxlZnQgKyBzY3JvbGxMZWZ0XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIHRoZSBuZWFyZXN0IHNjcm9sbGFibGUgcGFyZW50XG4gICAqIGNvcGllZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM1OTM5ODg2L2ZpbmQtZmlyc3Qtc2Nyb2xsYWJsZS1wYXJlbnRcbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnQgZWxlbWVudFxuICAgKiBAcmV0dXJuIEVsZW1lbnRcbiAgICovXG4gIGZ1bmN0aW9uIF9nZXRTY3JvbGxQYXJlbnQoZWxlbWVudCkge1xuICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICAgIHZhciBleGNsdWRlU3RhdGljUGFyZW50ID0gc3R5bGUucG9zaXRpb24gPT09ICdhYnNvbHV0ZSc7XG4gICAgdmFyIG92ZXJmbG93UmVnZXggPSAvKGF1dG98c2Nyb2xsKS87XG5cbiAgICBpZiAoc3R5bGUucG9zaXRpb24gPT09ICdmaXhlZCcpIHJldHVybiBkb2N1bWVudC5ib2R5O1xuXG4gICAgZm9yICh2YXIgcGFyZW50ID0gZWxlbWVudDsgKHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50KTsgKSB7XG4gICAgICBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBhcmVudCk7XG4gICAgICBpZiAoZXhjbHVkZVN0YXRpY1BhcmVudCAmJiBzdHlsZS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIG92ZXJmbG93UmVnZXgudGVzdChzdHlsZS5vdmVyZmxvdyArIHN0eWxlLm92ZXJmbG93WSArIHN0eWxlLm92ZXJmbG93WClcbiAgICAgIClcbiAgICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzY3JvbGwgYSBzY3JvbGxhYmxlIGVsZW1lbnQgdG8gYSBjaGlsZCBlbGVtZW50XG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50IHBhcmVudFxuICAgKiBAcGFyYW0gRWxlbWVudCBlbGVtZW50XG4gICAqIEByZXR1cm4gTnVsbFxuICAgKi9cbiAgZnVuY3Rpb24gX3Njcm9sbFBhcmVudFRvRWxlbWVudChwYXJlbnQsIGVsZW1lbnQpIHtcbiAgICBwYXJlbnQuc2Nyb2xsVG9wID0gZWxlbWVudC5vZmZzZXRUb3AgLSBwYXJlbnQub2Zmc2V0VG9wO1xuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJ3cml0ZXMgb2JqMSdzIHZhbHVlcyB3aXRoIG9iajIncyBhbmQgYWRkcyBvYmoyJ3MgaWYgbm9uIGV4aXN0ZW50IGluIG9iajFcbiAgICogdmlhOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE3MTI1MS9ob3ctY2FuLWktbWVyZ2UtcHJvcGVydGllcy1vZi10d28tamF2YXNjcmlwdC1vYmplY3RzLWR5bmFtaWNhbGx5XG4gICAqXG4gICAqIEBwYXJhbSBvYmoxXG4gICAqIEBwYXJhbSBvYmoyXG4gICAqIEByZXR1cm5zIG9iajMgYSBuZXcgb2JqZWN0IGJhc2VkIG9uIG9iajEgYW5kIG9iajJcbiAgICovXG4gIGZ1bmN0aW9uIF9tZXJnZU9wdGlvbnMob2JqMSwgb2JqMikge1xuICAgIHZhciBvYmozID0ge30sXG4gICAgICBhdHRybmFtZTtcbiAgICBmb3IgKGF0dHJuYW1lIGluIG9iajEpIHtcbiAgICAgIG9iajNbYXR0cm5hbWVdID0gb2JqMVthdHRybmFtZV07XG4gICAgfVxuICAgIGZvciAoYXR0cm5hbWUgaW4gb2JqMikge1xuICAgICAgb2JqM1thdHRybmFtZV0gPSBvYmoyW2F0dHJuYW1lXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajM7XG4gIH1cblxuICB2YXIgaW50cm9KcyA9IGZ1bmN0aW9uKHRhcmdldEVsbSkge1xuICAgIHZhciBpbnN0YW5jZTtcblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0RWxtID09PSAnb2JqZWN0Jykge1xuICAgICAgLy9PaywgY3JlYXRlIGEgbmV3IGluc3RhbmNlXG4gICAgICBpbnN0YW5jZSA9IG5ldyBJbnRyb0pzKHRhcmdldEVsbSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0RWxtID09PSAnc3RyaW5nJykge1xuICAgICAgLy9zZWxlY3QgdGhlIHRhcmdldCBlbGVtZW50IHdpdGggcXVlcnkgc2VsZWN0b3JcbiAgICAgIHZhciB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXRFbG0pO1xuXG4gICAgICBpZiAodGFyZ2V0RWxlbWVudCkge1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBJbnRyb0pzKHRhcmdldEVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGVyZSBpcyBubyBlbGVtZW50IHdpdGggZ2l2ZW4gc2VsZWN0b3IuJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbmNlID0gbmV3IEludHJvSnMoZG9jdW1lbnQuYm9keSk7XG4gICAgfVxuICAgIC8vIGFkZCBpbnN0YW5jZSB0byBsaXN0IG9mIF9pbnN0YW5jZXNcbiAgICAvLyBwYXNzaW5nIGdyb3VwIHRvIF9zdGFtcCB0byBpbmNyZW1lbnRcbiAgICAvLyBmcm9tIDAgb253YXJkIHNvbWV3aGF0IHJlbGlhYmx5XG4gICAgaW50cm9Kcy5pbnN0YW5jZXNbX3N0YW1wKGluc3RhbmNlLCAnaW50cm9qcy1pbnN0YW5jZScpXSA9IGluc3RhbmNlO1xuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDdXJyZW50IEludHJvSnMgdmVyc2lvblxuICAgKlxuICAgKiBAcHJvcGVydHkgdmVyc2lvblxuICAgKiBAdHlwZSBTdHJpbmdcbiAgICovXG4gIGludHJvSnMudmVyc2lvbiA9IFZFUlNJT047XG5cbiAgLyoqXG4gICAqIGtleS12YWwgb2JqZWN0IGhlbHBlciBmb3IgaW50cm9KcyBpbnN0YW5jZXNcbiAgICpcbiAgICogQHByb3BlcnR5IGluc3RhbmNlc1xuICAgKiBAdHlwZSBPYmplY3RcbiAgICovXG4gIGludHJvSnMuaW5zdGFuY2VzID0ge307XG5cbiAgLy9Qcm90b3R5cGVcbiAgaW50cm9Kcy5mbiA9IEludHJvSnMucHJvdG90eXBlID0ge1xuICAgIGNsb25lOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgSW50cm9Kcyh0aGlzKTtcbiAgICB9LFxuICAgIHNldE9wdGlvbjogZnVuY3Rpb24ob3B0aW9uLCB2YWx1ZSkge1xuICAgICAgdGhpcy5fb3B0aW9uc1tvcHRpb25dID0gdmFsdWU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX29wdGlvbnMgPSBfbWVyZ2VPcHRpb25zKHRoaXMuX29wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgICAgIF9pbnRyb0ZvckVsZW1lbnQuY2FsbCh0aGlzLCB0aGlzLl90YXJnZXRFbGVtZW50LCBzZWxlY3Rvcik7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGdvVG9TdGVwOiBmdW5jdGlvbihzdGVwKSB7XG4gICAgICBfZ29Ub1N0ZXAuY2FsbCh0aGlzLCBzdGVwKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgYWRkU3RlcDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgaWYgKCF0aGlzLl9vcHRpb25zLnN0ZXBzKSB7XG4gICAgICAgIHRoaXMuX29wdGlvbnMuc3RlcHMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fb3B0aW9ucy5zdGVwcy5wdXNoKG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBcbiAgICBnb1RvU3RlcE51bWJlcjogZnVuY3Rpb24oc3RlcCkge1xuICAgICAgX2dvVG9TdGVwTnVtYmVyLmNhbGwodGhpcywgc3RlcCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgbmV4dFN0ZXA6IGZ1bmN0aW9uKCkge1xuICAgICAgX25leHRTdGVwLmNhbGwodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIGV4aXQ6IGZ1bmN0aW9uKGZvcmNlKSB7XG4gICAgICBfZXhpdEludHJvLmNhbGwodGhpcywgdGhpcy5fdGFyZ2V0RWxlbWVudCwgZm9yY2UpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICByZWZyZXNoOiBmdW5jdGlvbigpIHtcbiAgICAgIF9yZWZyZXNoLmNhbGwodGhpcyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG9uYmVmb3JlY2hhbmdlOiBmdW5jdGlvbihwcm92aWRlZENhbGxiYWNrKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3ZpZGVkQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faW50cm9CZWZvcmVDaGFuZ2VDYWxsYmFjayA9IHByb3ZpZGVkQ2FsbGJhY2s7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Byb3ZpZGVkIGNhbGxiYWNrIGZvciBvbmJlZm9yZWNoYW5nZSB3YXMgbm90IGEgZnVuY3Rpb24nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG9uY2hhbmdlOiBmdW5jdGlvbihwcm92aWRlZENhbGxiYWNrKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3ZpZGVkQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faW50cm9DaGFuZ2VDYWxsYmFjayA9IHByb3ZpZGVkQ2FsbGJhY2s7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVkIGNhbGxiYWNrIGZvciBvbmNoYW5nZSB3YXMgbm90IGEgZnVuY3Rpb24uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG9uYWZ0ZXJjaGFuZ2U6IGZ1bmN0aW9uKHByb3ZpZGVkQ2FsbGJhY2spIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdmlkZWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pbnRyb0FmdGVyQ2hhbmdlQ2FsbGJhY2sgPSBwcm92aWRlZENhbGxiYWNrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdQcm92aWRlZCBjYWxsYmFjayBmb3Igb25hZnRlcmNoYW5nZSB3YXMgbm90IGEgZnVuY3Rpb24nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIG9uY29tcGxldGU6IGZ1bmN0aW9uKHByb3ZpZGVkQ2FsbGJhY2spIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdmlkZWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pbnRyb0NvbXBsZXRlQ2FsbGJhY2sgPSBwcm92aWRlZENhbGxiYWNrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlZCBjYWxsYmFjayBmb3Igb25jb21wbGV0ZSB3YXMgbm90IGEgZnVuY3Rpb24uJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgb25leGl0OiBmdW5jdGlvbihwcm92aWRlZENhbGxiYWNrKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3ZpZGVkQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faW50cm9FeGl0Q2FsbGJhY2sgPSBwcm92aWRlZENhbGxiYWNrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm92aWRlZCBjYWxsYmFjayBmb3Igb25leGl0IHdhcyBub3QgYSBmdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgb25iZWZvcmVleGl0OiBmdW5jdGlvbihwcm92aWRlZENhbGxiYWNrKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3ZpZGVkQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faW50cm9CZWZvcmVFeGl0Q2FsbGJhY2sgPSBwcm92aWRlZENhbGxiYWNrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdQcm92aWRlZCBjYWxsYmFjayBmb3Igb25iZWZvcmVleGl0IHdhcyBub3QgYSBmdW5jdGlvbi4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGludHJvSnM7XG59KTtcbiIsIi8qKlxuICog0JLRi9Cy0L7QtCDQvtGI0LjQsdC+0Log0LIg0LrQvtC90YHQvtC70YxcbiAqIEBwYXJhbSB7U3RyaW5nfSBtc2dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgY29uc29sZS5lcnJvcihtc2cpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZENzcyhwYXRoKSB7XG4gIGNvbnN0IGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnSEVBRCcpWzBdO1xuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuXG4gIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnO1xuXG4gIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgbGluay5ocmVmID0gcGF0aDtcbiAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbn1cbmNvbnN0IHV0aWxzID0ge1xuICBzaG93RXJyb3IsXG4gIGxvYWRDc3Ncbn07XG5cbmV4cG9ydCBkZWZhdWx0IHV0aWxzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==