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
  stylesFilePath: 'http://localhost:3000/gettour-styles.css',
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

  /**
   *
   * @param {string} hash
   */
  init: function init(hash) {
    var _this = this;

    var self = this;
    this.hash = hash;
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
    // const url = `https://getchat.me/api/the-bot/widget/${this.hash}/data`;
    var url = "http://localhost:3000/api/the-bot/widget/".concat(this.hash, "/data");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0b3VyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9nZXR0b3VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dldHRvdXIvLi9zcmMvQ2hhbmdlc0xpc3RlbmVyLmpzIiwid2VicGFjazovL2dldHRvdXIvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZ2V0dG91ci8uL3NyYy9pbnRyby1jaGF0LmpzIiwid2VicGFjazovL2dldHRvdXIvLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiX19pc05hdGl2ZUV2ZW50IiwiZXZlbnQiLCJkZWZhdWx0RXZlbnRzIiwiaW5kZXhPZiIsIkNoYW5nZXNMaXN0ZW5lciIsImxpc3RlbmVyX2lkIiwic2VsZWN0b3IiLCJhdHRyaWJ1dGVOYW1lIiwiX190b3VyT2JqZWN0IiwidG91ckpzIiwiaXNCb2R5IiwiY29uZmlnIiwiYXR0cmlidXRlcyIsImNoaWxkTGlzdCIsImNoYXJhY3RlckRhdGEiLCJ0YXJnZXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjYWxsYmFjayIsIm5hdGl2ZUNsaWNrTGlzdGVuZXIiLCJiaW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm5hdGl2ZUV2ZW50TGlzdGVuZXIiLCJib2R5Iiwic3VidHJlZSIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uU2hvd0NhbGxiYWNrIiwiSW50ZXJzZWN0aW9uSGlkZUNhbGxiYWNrIiwiY2xhc3NDaGFuZ2VDYWxsYmFjayIsImF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrIiwiT2JqZWN0IiwiYXNzaWduIiwiYXR0cmlidXRlT2xkVmFsdWUiLCJjaGFyYWN0ZXJEYXRhT2xkVmFsdWUiLCJjaGFyYWN0ZXJEYXRhQ2hhbmdlQ2FsbGJhY2siLCJjaGlsZHJlbkNoYW5nZUNhbGxiYWNrIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJlbnRyaWVzIiwiY29udGV4dCIsImZvckVhY2giLCJNdXRhdGlvbk9ic2VydmVyIiwibXV0YXRpb25zIiwiX19vYnNlcnZlcnMiLCJvYnNlcnZlIiwic2hvd0NhbGxiYWNrIiwiaGlkZUNhbGxiYWNrIiwiZGlzY29ubmVjdExpc3RlbmVyIiwibGlzdGVuZXIiLCJkaXNjb25uZWN0Iiwic2VuZE1lc3NhZ2UiLCJqc0V2ZW50IiwibWF0Y2hlcyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjaGFuZ2VMaXN0ZW5lciIsImlzSW50ZXJzZWN0aW5nIiwiaW50ZXJzZWN0aW9uUmF0aW8iLCJ0eXBlIiwiYWRkZWROb2RlcyIsImxlbmd0aCIsImVsIiwiaXNTYW1lTm9kZSIsInJlbW92ZWROb2RlcyIsIm5vZGUiLCJub2RlVHlwZSIsInZhbCIsInNldE9wdGlvbnMiLCJvcHRpb25zIiwiX19pbnRybyIsImlzQW55UGFydE9mRWxlbWVudEluVmlld3BvcnQiLCJzY3JvbGwiLCJ3aW5kb3ciLCJzY3JvbGxZIiwicGFnZVlPZmZzZXQiLCJib3VuZHNUb3AiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJ2aWV3cG9ydCIsImJvdHRvbSIsImlubmVySGVpZ2h0IiwiYm91bmRzIiwiY2xpZW50SGVpZ2h0IiwiaXNNZXNzYWdlRnJvbVdpZGdldCIsIm9yaWdpbiIsImRhdGEiLCJzb3VyY2UiLCJvbmJvYXJkaW5nIiwic3R5bGVzRmlsZVBhdGgiLCJleHBhbmRDbGFzcyIsImFjdGl2ZSIsIndpZGdldEhhc2giLCJhdXRvU2hvd0NvbmRpdGlvbnMiLCJoYXNoIiwiZG9tYWluIiwiYmxvY2siLCJzdHlsZXNMb2FkZWQiLCJpbml0Iiwic2VsZiIsImxvYWRXaWRnZXREYXRhIiwidGhlbiIsIndpZGdldF9hY3RpdmUiLCJjb25kaXRpb25zIiwibG9jYXRpb24iLCJob3N0Iiwib25jaGFuZ2UiLCJyZWZyZXNoIiwib25iZWZvcmVjaGFuZ2UiLCJfaW50cm9JdGVtcyIsInN0ZXAiLCJjbG9zZUJ0biIsInN0eWxlIiwiZGlzcGxheSIsIm9uZXhpdCIsIl9fbGlzdGVuRm9ySGlnaGxpZ2h0UmVxdWVzdHMiLCJjYWxsIiwiX19saXN0ZW5Gb3JBY3Rpb25DbGlja2VkUmVxdWVzdHMiLCJfX2xpc3RlbkZvck9ic2VydmVSZXF1ZXN0cyIsImxvYWRDb25kaXRpb24iLCJsaXN0ZW5Gb3JMb2NhdGlvbkNoYW5nZSIsImNvbmQiLCJyZWdleCIsIlJlZ0V4cCIsInVybFJlZ2V4IiwidGVzdCIsInBhdGhuYW1lIiwic2V0VGltZW91dCIsInJlbmRlcldpZGdldCIsInNyYyIsImxvYWRTdHlsZXMiLCJpbml0RXZlbnRMaXN0ZW5lcnMiLCJ0aW1lSW50ZXJ2YWwiLCJoaXN0b3J5IiwicHVzaFN0YXRlIiwiZiIsInJldCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwicmVwbGFjZVN0YXRlIiwicmVzZXQiLCJlIiwiYWN0aW9uIiwiYW5zd2VyX2lkIiwiX29wdGlvbnMiLCJzdGVwcyIsImhpZ2hsaWdodEV2ZW50QW5zd2VySWQiLCJleGl0IiwiaGlnaGxpZ2h0IiwiX19nZXRFbGVtZW50Rm9ySGlnaGxpZ2h0IiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWxlbWVudHNBcnJheSIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJjbG9zZUV2ZW50IiwiZWxlbWVudCIsImZpeGVkIiwiaW50cm9FbGVtZW50IiwiZXhpdE9uRXNjIiwiZXhpdE9uT3ZlcmxheUNsaWNrIiwiZGlzYWJsZUludGVyYWN0aW9uIiwiYWRkU3RlcCIsIm9uY2UiLCJnb1RvU3RlcE51bWJlciIsInN0YXJ0IiwibXNnIiwiaWZyYW1lIiwiY29udGVudFdpbmRvdyIsInBvc3RNZXNzYWdlIiwiZGVzdHJveVdpZGdldCIsInJlbW92ZSIsIndpZGdldFVybCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJ3aWRnZXRIdG1sIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCIkY2xvc2VCdG4iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImhpZGVCbG9jayIsImV4cGFuZEJsb2NrIiwiJGljb24iLCJjaGlsZHJlbiIsImFkZCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmV0Y2giLCJtZXRob2QiLCJjcmVkZW50aWFscyIsImhlYWRlcnMiLCJtb2RlIiwiY2FjaGUiLCJkYXRhVHlwZSIsInJlcyIsInN0YXR1cyIsImpzb24iLCJzdGF0dXNUZXh0IiwicmVzcG9uc2UiLCJjYXRjaCIsImVycm9yIiwiZXhwb3J0cyIsIm1vZHVsZSIsImludHJvSnMiLCJjb25zb2xlIiwid2FybiIsImRlZmluZSIsIlZFUlNJT04iLCJJbnRyb0pzIiwib2JqIiwiX3RhcmdldEVsZW1lbnQiLCJoaWdobGlnaHRDbGFzcyIsImtleWJvYXJkTmF2aWdhdGlvbiIsInNjcm9sbFRvRWxlbWVudCIsInNjcm9sbFRvIiwic2Nyb2xsUGFkZGluZyIsIm92ZXJsYXlPcGFjaXR5IiwicG9zaXRpb25QcmVjZWRlbmNlIiwiaGVscGVyRWxlbWVudFBhZGRpbmciLCJidXR0b25DbGFzcyIsIl9pbnRyb0ZvckVsZW1lbnQiLCJ0YXJnZXRFbG0iLCJpbnRyb0l0ZW1zIiwiY3VycmVudEl0ZW0iLCJfY2xvbmVPYmplY3QiLCJmbG9hdGluZ0VsZW1lbnRRdWVyeSIsInBvc2l0aW9uIiwiX2FkZE92ZXJsYXlMYXllciIsIl9uZXh0U3RlcCIsIkRPTUV2ZW50Iiwib24iLCJfb25LZXlEb3duIiwiX29uUmVzaXplIiwiY29kZSIsIndoaWNoIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwiX2V4aXRJbnRybyIsIm9iamVjdCIsInRlbXAiLCJrZXkiLCJqUXVlcnkiLCJfZ29Ub1N0ZXAiLCJfY3VycmVudFN0ZXAiLCJfZ29Ub1N0ZXBOdW1iZXIiLCJfY3VycmVudFN0ZXBOdW1iZXIiLCJfZGlyZWN0aW9uIiwiX2ZvckVhY2giLCJpdGVtIiwiaSIsInVuZGVmaW5lZCIsIm5leHRTdGVwIiwiY29udGludWVTdGVwIiwiX2ludHJvQmVmb3JlQ2hhbmdlQ2FsbGJhY2siLCJfaW50cm9Db21wbGV0ZUNhbGxiYWNrIiwiX3Nob3dFbGVtZW50IiwiX3JlZnJlc2giLCJfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbiIsInRhcmdldEVsZW1lbnQiLCJmb3JjZSIsImNvbnRpbnVlRXhpdCIsIl9pbnRyb0JlZm9yZUV4aXRDYWxsYmFjayIsIm92ZXJsYXlMYXllcnMiLCJvdmVybGF5TGF5ZXIiLCJvcGFjaXR5IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiaGVscGVyTGF5ZXIiLCJyZWZlcmVuY2VMYXllciIsImRpc2FibGVJbnRlcmFjdGlvbkxheWVyIiwiZmxvYXRpbmdFbGVtZW50IiwiX3JlbW92ZVNob3dFbGVtZW50IiwiZml4UGFyZW50cyIsInBhcmVudCIsIl9yZW1vdmVDbGFzcyIsIm9mZiIsIl9pbnRyb0V4aXRDYWxsYmFjayIsIl9jaGVja1JpZ2h0IiwidGFyZ2V0T2Zmc2V0IiwidG9vbHRpcExheWVyU3R5bGVMZWZ0IiwidG9vbHRpcE9mZnNldCIsIndpbmRvd1NpemUiLCJ0b29sdGlwTGF5ZXIiLCJsZWZ0Iiwid2lkdGgiLCJfY2hlY2tMZWZ0IiwidG9vbHRpcExheWVyU3R5bGVSaWdodCIsInJpZ2h0IiwiX2RldGVybWluZUF1dG9Qb3NpdGlvbiIsImRlc2lyZWRUb29sdGlwUG9zaXRpb24iLCJwb3NzaWJsZVBvc2l0aW9ucyIsInNsaWNlIiwiX2dldFdpblNpemUiLCJ0b29sdGlwSGVpZ2h0IiwiX2dldE9mZnNldCIsImhlaWdodCIsInRvb2x0aXBXaWR0aCIsInRhcmdldEVsZW1lbnRSZWN0IiwiY2FsY3VsYXRlZFBvc2l0aW9uIiwiX3JlbW92ZUVudHJ5IiwiZGVzaXJlZEFsaWdubWVudCIsInBvcyIsImh5cGhlbkluZGV4Iiwic3Vic3RyIiwic3BsaXQiLCJfZGV0ZXJtaW5lQXV0b0FsaWdubWVudCIsIm9mZnNldExlZnQiLCJoYWxmVG9vbHRpcFdpZHRoIiwid2luV2lkdGgiLCJNYXRoIiwibWluIiwic2NyZWVuIiwicG9zc2libGVBbGlnbm1lbnRzIiwiY2FsY3VsYXRlZEFsaWdubWVudCIsInN0cmluZ0FycmF5Iiwic3RyaW5nVG9SZW1vdmUiLCJzcGxpY2UiLCJjdXJyZW50RWxlbWVudCIsImVsZW1lbnRQb3NpdGlvbiIsIndpZHRoSGVpZ2h0UGFkZGluZyIsIl9pc0ZpeGVkIiwiX2FkZENsYXNzIiwiY3NzVGV4dCIsIl9zZXRDbGlwUGF0aE9mSGVscGVyIiwiX2Rpc2FibGVJbnRlcmFjdGlvbiIsIl9zZXRBbmNob3JBc0J1dHRvbiIsImFuY2hvciIsInNldEF0dHJpYnV0ZSIsInRhYkluZGV4IiwiX2dldERpbWVuc2lvbnMiLCJoZWxwZXIiLCJvZmZzZXRXaWR0aCIsIm9mZnNldEhlaWdodCIsIm9mZnNldFRvcCIsIm92ZXJsYXkiLCJjb29yZHMiLCJ4IiwieSIsImNsaXBQYXRoIiwibWFwIiwiam9pbiIsInZpc2liaWxpdHkiLCJfaW50cm9DaGFuZ2VDYWxsYmFjayIsIm9sZEhlbHBlckxheWVyIiwib2xkUmVmZXJlbmNlTGF5ZXIiLCJzY3JvbGxQYXJlbnQiLCJfZ2V0U2Nyb2xsUGFyZW50IiwiX3Njcm9sbFBhcmVudFRvRWxlbWVudCIsIl9sYXN0U2hvd0VsZW1lbnRUaW1lciIsImNsZWFyVGltZW91dCIsIl9zY3JvbGxUbyIsIl9zZXRTaG93RWxlbWVudCIsIl9pbnRyb0FmdGVyQ2hhbmdlQ2FsbGJhY2siLCJyZWN0IiwiX2VsZW1lbnRJblZpZXdwb3J0Iiwid2luSGVpZ2h0Iiwic2Nyb2xsQnkiLCJlbG1zIiwiZWxtIiwicGFyZW50RWxtIiwiU1ZHRWxlbWVudCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImN1cnJlbnRFbGVtZW50UG9zaXRpb24iLCJfZ2V0UHJvcFZhbHVlIiwiekluZGV4IiwicGFyc2VGbG9hdCIsInRyYW5zZm9ybSIsImFyciIsImZvckVhY2hGbmMiLCJjb21wbGV0ZUZuYyIsImxlbiIsIl9zdGFtcCIsImtleXMiLCJzdGFtcCIsImV2ZW50c19rZXkiLCJfaWQiLCJ1c2VDYXB0dXJlIiwiaWQiLCJoYW5kbGVyIiwiYXR0YWNoRXZlbnQiLCJkZXRhY2hFdmVudCIsInByZSIsImdldEF0dHJpYnV0ZSIsImNsYXNzZXMiLCJjbHMiLCJtYXRjaCIsImNsYXNzTmFtZVJlZ2V4IiwicmVwbGFjZSIsInByb3BOYW1lIiwicHJvcFZhbHVlIiwiY3VycmVudFN0eWxlIiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInAiLCJub2RlTmFtZSIsImlubmVyV2lkdGgiLCJEIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJzdHlsZVRleHQiLCJvbmNsaWNrIiwidG9TdHJpbmciLCJkb2NFbCIsInNjcm9sbFRvcCIsInNjcm9sbExlZnQiLCJwYWdlWE9mZnNldCIsImV4Y2x1ZGVTdGF0aWNQYXJlbnQiLCJvdmVyZmxvd1JlZ2V4IiwicGFyZW50RWxlbWVudCIsIm92ZXJmbG93Iiwib3ZlcmZsb3dZIiwib3ZlcmZsb3dYIiwiX21lcmdlT3B0aW9ucyIsIm9iajEiLCJvYmoyIiwib2JqMyIsImF0dHJuYW1lIiwiaW5zdGFuY2UiLCJFcnJvciIsImluc3RhbmNlcyIsInZlcnNpb24iLCJmbiIsInByb3RvdHlwZSIsImNsb25lIiwic2V0T3B0aW9uIiwib3B0aW9uIiwidmFsdWUiLCJnb1RvU3RlcCIsInB1c2giLCJwcm92aWRlZENhbGxiYWNrIiwib25hZnRlcmNoYW5nZSIsIm9uY29tcGxldGUiLCJvbmJlZm9yZWV4aXQiLCJzaG93RXJyb3IiLCJsb2FkQ3NzIiwicGF0aCIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxpbmsiLCJyZWwiLCJocmVmIiwidXRpbHMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFD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O0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxJQUFJWCxLQUFKLENBQVUsa0RBQVYsQ0FBTjtBQUNEOztBQUNELGFBQU8sSUFBUDtBQUNELEtBMUY4QjtBQTJGL0JjLGdCQUFZLEVBQUUsc0JBQVNILGdCQUFULEVBQTJCO0FBQ3ZDLFVBQUksT0FBT0EsZ0JBQVAsS0FBNEIsVUFBaEMsRUFBNEM7QUFDMUMsYUFBSzFLLHdCQUFMLEdBQWdDMEssZ0JBQWhDO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxJQUFJWCxLQUFKLENBQ0osd0RBREksQ0FBTjtBQUdEOztBQUNELGFBQU8sSUFBUDtBQUNEO0FBcEc4QixHQUFqQztBQXVHQSxTQUFPek4sT0FBUDtBQUNELENBL2lERCxFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTs7OztBQUlPLFNBQVN3TyxTQUFULENBQW1CaFIsR0FBbkIsRUFBd0I7QUFDN0I7QUFDQXlDLFNBQU8sQ0FBQ0osS0FBUixDQUFjckMsR0FBZDtBQUNEOztBQUVNLFNBQVNpUixPQUFULENBQWlCQyxJQUFqQixFQUF1QjtBQUM1QixNQUFNQyxJQUFJLEdBQUd6YSxRQUFRLENBQUMwYSxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUFiO0FBQ0EsTUFBTUMsSUFBSSxHQUFHM2EsUUFBUSxDQUFDNkosYUFBVCxDQUF1QixNQUF2QixDQUFiO0FBRUE4USxNQUFJLENBQUNDLEdBQUwsR0FBVyxZQUFYO0FBRUFELE1BQUksQ0FBQ25ZLElBQUwsR0FBWSxVQUFaO0FBRUFtWSxNQUFJLENBQUNFLElBQUwsR0FBWUwsSUFBWjtBQUNBQyxNQUFJLENBQUN4USxXQUFMLENBQWlCMFEsSUFBakI7QUFDRDs7QUFDRCxJQUFNRyxLQUFLLEdBQUc7QUFDWlIsV0FBUyxFQUFUQSxTQURZO0FBRVpDLFNBQU8sRUFBUEE7QUFGWSxDQUFkO2VBS2VPLEsiLCJmaWxlIjoiZ2V0dG91ci5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZ2V0dG91clwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJnZXR0b3VyXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImdldHRvdXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG4vKiBnbG9iYWwgTXV0YXRpb25PYnNlcnZlciAqL1xuLyogZ2xvYmFsIEludGVyc2VjdGlvbk9ic2VydmVyICovXG4vKiBnbG9iYWwgZG9jdW1lbnQgKi9cbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gX19pc05hdGl2ZUV2ZW50KGV2ZW50KSB7XG4gIGNvbnN0IGRlZmF1bHRFdmVudHMgPSBbJ2NsaWNrJywgJ21vdXNlb3ZlcicsICdtb3VzZW91dCcsICdrZXl1cCcsICdrZXlwcmVzcycsICdjaGFuZ2UnLCAnZm9jdXMnLCAnc3VibWl0J107XG5cbiAgcmV0dXJuIGRlZmF1bHRFdmVudHMuaW5kZXhPZihldmVudCkgPiAtMTtcbn1cblxuY2xhc3MgQ2hhbmdlc0xpc3RlbmVyIHtcbiAgY29uc3RydWN0b3IoeyBsaXN0ZW5lcl9pZCwgc2VsZWN0b3IsIGV2ZW50LCBhdHRyaWJ1dGVOYW1lIH0pIHtcbiAgICB0aGlzLl9fdG91ck9iamVjdCA9IG51bGw7XG4gICAgdGhpcy5saXN0ZW5lcl9pZCA9IGxpc3RlbmVyX2lkO1xuICAgIHRoaXMuc2VsZWN0b3IgPSBzZWxlY3RvcjtcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQ7XG4gICAgdGhpcy5hdHRyaWJ1dGVOYW1lID0gYXR0cmlidXRlTmFtZTtcbiAgfVxuXG4gIGdldCB0b3VySnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX190b3VyT2JqZWN0O1xuICB9XG5cbiAgc2V0IHRvdXJKcyh2YWwpIHtcbiAgICB0aGlzLl9fdG91ck9iamVjdCA9IHZhbDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYgKHRoaXMudG91ckpzID09IG51bGwpIHtcbiAgICAgIHNob3dFcnJvcign0KHQv9C10YDQstCwINC30LDQtNCw0LnRgtC1INC30L3QsNGH0LXQvdC40LUgdG91ckpzJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBpc0JvZHkgPSBmYWxzZTtcbiAgICBjb25zdCB7IGV2ZW50IH0gPSB0aGlzO1xuICAgIC8vINC60L7QvdGE0LjQs9GD0YDQsNGG0LjRjyDQvdCw0YjQtdCz0L4gb2JzZXJ2ZXI6XG4gICAgbGV0IGNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiBmYWxzZSB9O1xuICAgIC8vINCy0YvQsdC40YDQsNC10Lwg0YbQtdC70LXQstC+0Lkg0Y3Qu9C10LzQtdC90YJcbiAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKTtcblxuICAgIGlmIChfX2lzTmF0aXZlRXZlbnQoZXZlbnQpKSB7XG4gICAgICAvLyDQntCx0YDQsNCx0L7RgtC60LAg0LrQu9C40LrQsFxuICAgICAgaWYgKGV2ZW50ID09PSAnY2xpY2snKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSB0aGlzLm5hdGl2ZUNsaWNrTGlzdGVuZXIuYmluZCh0aGlzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5jYWxsYmFjaywgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICAvLyDQntCx0YDQsNCx0L7RgtC60LAg0L7RgdGC0LDQu9GM0L3QvtCz0L5cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IHRoaXMubmF0aXZlRXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpO1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy5jYWxsYmFjaywgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgICBzaG93RXJyb3IoJ9Ce0YjQuNCx0LrQsDog0K3Qu9C10LzQtdC90YIg0L7RgtGB0YPRgtGB0YLQstGD0LXRgiDQsiBET00nKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vINCV0YHQu9C4INGN0LvQtdC80LXQvdGCINC90LUg0L3QsNC50LTQtdC9INCyIERPTSDQtNC10YDQtdCy0LVcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIGNvbmZpZy5zdWJ0cmVlID0gdHJ1ZTtcbiAgICAgIGlzQm9keSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGlzQm9keSA9PT0gZmFsc2UpIHtcbiAgICAgIGxldCBvYnNlcnZlcjtcbiAgICAgIGxldCBjYWxsYmFjaztcblxuICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICBjYXNlICdzaG93JzpcbiAgICAgICAgICBjYWxsYmFjayA9IHRoaXMuSW50ZXJzZWN0aW9uU2hvd0NhbGxiYWNrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdoaWRlJzpcbiAgICAgICAgICBjYWxsYmFjayA9IHRoaXMuSW50ZXJzZWN0aW9uSGlkZUNhbGxiYWNrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjbGFzc19jaGFuZ2UnOlxuICAgICAgICAgIGNhbGxiYWNrID0gdGhpcy5jbGFzc0NoYW5nZUNhbGxiYWNrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdhdHRyX2NoYW5nZSc6XG4gICAgICAgICAgY2FsbGJhY2sgPSB0aGlzLmF0dHJpYnV0ZUNoYW5nZUNhbGxiYWNrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0ZXh0X2NoYW5nZSc6XG4gICAgICAgICAgY29uZmlnID0gT2JqZWN0LmFzc2lnbihjb25maWcsIHtcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgICAgICAgICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjYWxsYmFjayA9IHRoaXMuY2hhcmFjdGVyRGF0YUNoYW5nZUNhbGxiYWNrO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjaGlsZHJlbl9jaGFuZ2UnOlxuICAgICAgICAgIGNvbmZpZy5zdWJ0cmVlID0gdHJ1ZTtcbiAgICAgICAgICBjYWxsYmFjayA9IHRoaXMuY2hpbGRyZW5DaGFuZ2VDYWxsYmFjaztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzaG93RXJyb3IoYNCd0LUg0L/QvtC/0LDQuyDQv9C+0LQg0YPRgdC70L7QstC40Y86ICR7dGhpcy5zZWxlY3Rvcn0gLSAke2V2ZW50fWApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgLy8gYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgc2hvd0Vycm9yKCdDYWxsYmFjayDRhNGD0L3QutGG0LjRjyDQvdC1INC+0L/RgNC10LTQtdC70LXQvdCwIScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vINC10YHQu9C4INC40YHQv9C+0LvRjNC30YPQtdGC0YHRjyBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICAgICAgaWYgKFsnc2hvdycsICdoaWRlJ10uaW5kZXhPZihldmVudCkgPiAtMSkge1xuICAgICAgICBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcywgY29udGV4dCkgPT4ge1xuICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChjYWxsYmFjay5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyDQldGB0LvQuCDQuNGB0L/QvtC70YzQt9GD0LXRgtGB0Y8gTXV0YXRpb25PYnNlcnZlclxuICAgICAgICBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChjYWxsYmFjay5iaW5kKGNvbnRleHQpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnRvdXJKcy5fX29ic2VydmVyc1t0aGlzLmxpc3RlbmVyX2lkXSA9IG9ic2VydmVyO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIGNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vINGB0L7Qt9C00LDRkdC8INGN0LrQt9C10LzQv9C70Y/RgCBNdXRhdGlvbk9ic2VydmVyXG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgIGNhc2UgJ3Nob3cnOlxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2godGhpcy5zaG93Q2FsbGJhY2suYmluZChjb250ZXh0KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdoaWRlJzpcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKHRoaXMuaGlkZUNhbGxiYWNrLmJpbmQoY29udGV4dCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHNob3dFcnJvcihg0J3QtSDQv9C+0L/QsNC7INC/0L7QtCDRg9GB0LvQvtCy0LjRjzogJHt0aGlzLnNlbGVjdG9yfSAtICR7dGhpcy5ldmVudH1gKTtcbiAgICAgICAgICAgIHRoaXMuZGlzY29ubmVjdExpc3RlbmVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vINC/0LXRgNC10LTQsNGR0Lwg0LIg0LrQsNGH0LXRgdGC0LLQtSDQsNGA0LPRg9C80LXQvdGC0L7QsiDRhtC10LvQtdCy0L7QuSDRjdC70LXQvNC10L3RgiDQuCDQtdCz0L4g0LrQvtC90YTQuNCz0YPRgNCw0YbQuNGOXG4gICAgICB0aGlzLnRvdXJKcy5fX29ic2VydmVyc1t0aGlzLmxpc3RlbmVyX2lkXSA9IG9ic2VydmVyO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIGNvbmZpZyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBkaXNjb25uZWN0TGlzdGVuZXIoKSB7XG4gICAgY29uc3QgbGlzdGVuZXIgPSB0aGlzLnRvdXJKcy5fX29ic2VydmVyc1t0aGlzLmxpc3RlbmVyX2lkXTtcblxuICAgIGlmICghbGlzdGVuZXIpIHtcbiAgICAgIHNob3dFcnJvcihgTGlzdGVuZXIg0YEgaWQgJHt0aGlzLmxpc3RlbmVyX2lkfSDQvdC1INC90LDQudC00LXQvWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxpc3RlbmVyLmRpc2Nvbm5lY3QoKTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlKCkge1xuICAgIHRoaXMudG91ckpzLnNlbmRNZXNzYWdlKHtcbiAgICAgIGxpc3RlbmVyX2lkOiB0aGlzLmxpc3RlbmVyX2lkXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sg0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtGB0LvRg9GI0LjQstCw0L3QuNGPINC90LDRgtC40LLQvdGL0YUg0YHQvtCx0YvRgtC40LggSmF2YVNjcmlwdFxuICAgKiBAcGFyYW0ge0V2ZW50fSBqc0V2ZW50XG4gICAqL1xuICBuYXRpdmVFdmVudExpc3RlbmVyKGpzRXZlbnQpIHtcbiAgICBpZiAoanNFdmVudC50YXJnZXQubWF0Y2hlcyh0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgdGhpcy5zZW5kTWVzc2FnZSgpO1xuICAgICAganNFdmVudC50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqQ2FsbGJhY2sg0YTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtGB0LvRg9GI0LjQstCw0L3QuNGPINC90LDRgtC40LLQvdGL0YUgQ0xJQ0sg0YHQvtCx0YvRgtC40LggSmF2YVNjcmlwdFxuICAgKiBAcGFyYW0ge0V2ZW50fSBqc0V2ZW50XG4gICAqL1xuICBuYXRpdmVDbGlja0xpc3RlbmVyKGpzRXZlbnQpIHtcbiAgICBpZiAoanNFdmVudC50YXJnZXQubWF0Y2hlcyh0aGlzLnNlbGVjdG9yKSkge1xuICAgICAgdGhpcy5zZW5kTWVzc2FnZSgpO1xuXG4gICAgICBqc0V2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2ssIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBJbnRlcnNlY3Rpb25TaG93Q2FsbGJhY2soY2hhbmdlTGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5pc0ludGVyc2VjdGluZykge1xuICAgICAgY2hhbmdlTGlzdGVuZXIuc2VuZE1lc3NhZ2UoKTtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLmRpc2Nvbm5lY3RMaXN0ZW5lcigpO1xuICAgIH1cbiAgfVxuXG4gIEludGVyc2VjdGlvbkhpZGVDYWxsYmFjayhjaGFuZ2VMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLmludGVyc2VjdGlvblJhdGlvID09PSAwICYmIHRoaXMuaXNJbnRlcnNlY3RpbmcgPT09IGZhbHNlKSB7XG4gICAgICBjaGFuZ2VMaXN0ZW5lci5zZW5kTWVzc2FnZSgpO1xuICAgICAgY2hhbmdlTGlzdGVuZXIuZGlzY29ubmVjdExpc3RlbmVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrINGE0YPQvdC60YbQuNGPINC60L7Qs9C00LAgZXZlbnQgPT0gJ3Nob3cnICjQv9C+0LrQsNC3KSDQuCDRjdGC0L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0L3QtdGCINCyIERPTVxuICAgKi9cbiAgc2hvd0NhbGxiYWNrKGNoYW5nZUxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NoaWxkTGlzdCcgJiYgdGhpcy5hZGRlZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihjaGFuZ2VMaXN0ZW5lci5zZWxlY3Rvcik7XG5cbiAgICAgIGlmICh0aGlzLmFkZGVkTm9kZXNbMF0uaXNTYW1lTm9kZShlbCkpIHtcbiAgICAgICAgY2hhbmdlTGlzdGVuZXIuc2VuZE1lc3NhZ2UoKTtcbiAgICAgICAgcmV0dXJuIGNoYW5nZUxpc3RlbmVyLmRpc2Nvbm5lY3RMaXN0ZW5lcigpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhpZGVDYWxsYmFjayhjaGFuZ2VMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdjaGlsZExpc3QnICYmIHRoaXMucmVtb3ZlZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnJlbW92ZWROb2Rlc1swXTtcblxuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEgJiYgbm9kZS5tYXRjaGVzKGNoYW5nZUxpc3RlbmVyLnNlbGVjdG9yKSkge1xuICAgICAgICBjaGFuZ2VMaXN0ZW5lci5zZW5kTWVzc2FnZSgpO1xuICAgICAgICByZXR1cm4gY2hhbmdlTGlzdGVuZXIuZGlzY29ubmVjdExpc3RlbmVyKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNsYXNzQ2hhbmdlQ2FsbGJhY2soY2hhbmdlTGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy50eXBlID09PSAnYXR0cmlidXRlcycgJiYgdGhpcy5hdHRyaWJ1dGVOYW1lID09PSAnY2xhc3MnKSB7XG4gICAgICBjaGFuZ2VMaXN0ZW5lci5zZW5kTWVzc2FnZSgpO1xuICAgICAgcmV0dXJuIGNoYW5nZUxpc3RlbmVyLmRpc2Nvbm5lY3RMaXN0ZW5lcigpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VDYWxsYmFjayhjaGFuZ2VMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLnR5cGUgPT09ICdhdHRyaWJ1dGVzJyAmJiB0aGlzLmF0dHJpYnV0ZU5hbWUgPT09IGNoYW5nZUxpc3RlbmVyLmF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLnNlbmRNZXNzYWdlKCk7XG4gICAgICByZXR1cm4gY2hhbmdlTGlzdGVuZXIuZGlzY29ubmVjdExpc3RlbmVyKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2hhcmFjdGVyRGF0YUNoYW5nZUNhbGxiYWNrKGNoYW5nZUxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NoYXJhY3RlckRhdGEnIHx8IHRoaXMudHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLnNlbmRNZXNzYWdlKCk7XG4gICAgICBjaGFuZ2VMaXN0ZW5lci5kaXNjb25uZWN0TGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cblxuICBjaGlsZHJlbkNoYW5nZUNhbGxiYWNrKGNoYW5nZUxpc3RlbmVyKSB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NoaWxkTGlzdCcpIHtcbiAgICAgIGNoYW5nZUxpc3RlbmVyLnNlbmRNZXNzYWdlKCk7XG4gICAgICBjaGFuZ2VMaXN0ZW5lci5kaXNjb25uZWN0TGlzdGVuZXIoKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hhbmdlc0xpc3RlbmVyO1xuIiwiLyogZXNsaW50LWRpc2FibGUgcHJlZmVyLXJlc3QtcGFyYW1zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4vKiBnbG9iYWwgd2luZG93ICovXG4vKiBnbG9iYWwgZG9jdW1lbnQgKi9cbi8qIGdsb2JhbCBoaXN0b3J5ICovXG5pbXBvcnQgaW50cm9KcyBmcm9tICcuL2ludHJvLWNoYXQnO1xuXG5pbXBvcnQgQ2hhbmdlc0xpc3RlbmVyIGZyb20gJy4vQ2hhbmdlc0xpc3RlbmVyJztcbmltcG9ydCB7IHNob3dFcnJvciwgbG9hZENzcyB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIFdhcm5pbmcuIG9wdGlvbnMgLSDRjdGC0L4g0YHQstC+0LnRgdGC0L4g0L7QsdGK0LXQutGC0LBcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbTBcbiAqL1xuZnVuY3Rpb24gc2V0T3B0aW9ucyh7IG9wdGlvbnMgfSkge1xuICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgdGhpcy5fX2ludHJvLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fX2ludHJvLnNldE9wdGlvbnModGhpcy5jb25maWcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzQW55UGFydE9mRWxlbWVudEluVmlld3BvcnQoZWwpIHtcbiAgY29uc3Qgc2Nyb2xsID0gd2luZG93LnNjcm9sbFkgfHwgd2luZG93LnBhZ2VZT2Zmc2V0O1xuICBjb25zdCBib3VuZHNUb3AgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzY3JvbGw7XG5cbiAgY29uc3Qgdmlld3BvcnQgPSB7XG4gICAgdG9wOiBzY3JvbGwsXG4gICAgYm90dG9tOiBzY3JvbGwgKyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgfTtcblxuICBjb25zdCBib3VuZHMgPSB7XG4gICAgdG9wOiBib3VuZHNUb3AsXG4gICAgYm90dG9tOiBib3VuZHNUb3AgKyBlbC5jbGllbnRIZWlnaHRcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIChib3VuZHMuYm90dG9tID49IHZpZXdwb3J0LnRvcCAmJiBib3VuZHMuYm90dG9tIDw9IHZpZXdwb3J0LmJvdHRvbSkgfHxcbiAgICAoYm91bmRzLnRvcCA8PSB2aWV3cG9ydC5ib3R0b20gJiYgYm91bmRzLnRvcCA+PSB2aWV3cG9ydC50b3ApXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzTWVzc2FnZUZyb21XaWRnZXQoZXZlbnQpIHtcbiAgLy8gSU1QT1JUQU5UOiBDaGVjayB0aGUgb3JpZ2luIG9mIHRoZSBkYXRhIVxuICBpZiAoZXZlbnQub3JpZ2luLmluZGV4T2YoJ2h0dHBzOi8vZ2V0Y2hhdC5tZScpIHx8IGV2ZW50Lm9yaWdpbi5pbmRleE9mKCdodHRwOi8vbG9jYWxob3N0OjMwMDAnKSkge1xuICAgIC8vIFRoZSBkYXRhIGhhcyBiZWVuIHNlbnQgZnJvbSB5b3VyIHNpdGVcblxuICAgIC8vIFRoZSBkYXRhIHNlbnQgd2l0aCBwb3N0TWVzc2FnZSBpcyBzdG9yZWQgaW4gZXZlbnQuZGF0YVxuICAgIGlmICh0eXBlb2YgZXZlbnQuZGF0YSAhPT0gJ29iamVjdCcgfHwgZXZlbnQuZGF0YS5zb3VyY2UgIT09ICdnZXRjaGF0LXdpZGdldCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuY29uc3Qgb25ib2FyZGluZyA9IHtcbiAgc3R5bGVzRmlsZVBhdGg6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvZ2V0dG91ci1zdHlsZXMuY3NzJyxcbiAgc2VsZWN0b3I6ICcuZ2V0Y2hhdC13aWRnZXRfX2ZyYW1lJyxcbiAgZXhwYW5kQ2xhc3M6ICdnZXRjaGF0LXdpZGdldC0tZXhwYW5kZWQnLFxuICBhY3RpdmU6IGZhbHNlLFxuICBfX2ludHJvOiBudWxsLFxuICB3aWRnZXRIYXNoOiBudWxsLFxuICBhdXRvU2hvd0NvbmRpdGlvbnM6IFtdLFxuICBoYXNoOiBudWxsLFxuICBkb21haW46IG51bGwsXG4gIGJsb2NrOiBudWxsLFxuICBzZXRPcHRpb25zLFxuICBzdHlsZXNMb2FkZWQ6IGZhbHNlLFxuICBfX29ic2VydmVyczoge30sXG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYXNoXG4gICAqL1xuICBpbml0KGhhc2gpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuaGFzaCA9IGhhc2g7XG4gICAgdGhpcy5sb2FkV2lkZ2V0RGF0YSgpLnRoZW4oZGF0YSA9PiB7XG4gICAgICB0aGlzLmRvbWFpbiA9IGRhdGEuZG9tYWluO1xuICAgICAgdGhpcy5hY3RpdmUgPSBkYXRhLndpZGdldF9hY3RpdmU7XG4gICAgICB0aGlzLmF1dG9TaG93Q29uZGl0aW9ucyA9IGRhdGEuY29uZGl0aW9ucztcbiAgICAgIGlmICh0aGlzLmRvbWFpbiAhPT0gd2luZG93LmxvY2F0aW9uLmhvc3QpIHtcbiAgICAgICAgc2hvd0Vycm9yKCdb0J7RiNC40LHQutCwXSDQktC40LTQttC10YIg0L3QtSDQtNC70Y8g0Y3RgtC+0LPQviDQtNC+0LzQtdC90LAnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9faW50cm8gPSBpbnRyb0pzKCk7XG5cbiAgICAgIHRoaXMuX19pbnRyby5vbmNoYW5nZSgoKSA9PiB7XG4gICAgICAgIHNlbGYuX19pbnRyby5yZWZyZXNoKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9faW50cm8ub25iZWZvcmVjaGFuZ2UoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fX2ludHJvLl9pbnRyb0l0ZW1zLmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLl9faW50cm8uX2ludHJvSXRlbXNbMF07XG5cbiAgICAgICAgICBzZWxmLnNldE9wdGlvbnMoc3RlcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZXRjaGF0LXdpZGdldCA+IC5nZXRjaGF0LXdpZGdldF9fYnRuLS1pY29uJyk7XG5cbiAgICAgICAgaWYgKGNsb3NlQnRuKSB7XG4gICAgICAgICAgY2xvc2VCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX19pbnRyby5vbmV4aXQoKCkgPT4ge1xuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZXRjaGF0LXdpZGdldCA+IC5nZXRjaGF0LXdpZGdldF9fYnRuLS1pY29uJyk7XG5cbiAgICAgICAgaWYgKGNsb3NlQnRuKSB7XG4gICAgICAgICAgY2xvc2VCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtZmxleCc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyDQodC70YPRiNCw0YLRjCDRgdC+0LHRi9GC0LjRjyDQstGL0LTQtdC70LXQvdC40Y9cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLl9fbGlzdGVuRm9ySGlnaGxpZ2h0UmVxdWVzdHMuY2FsbCh0aGlzLCBldmVudCk7XG4gICAgICB9KTtcblxuICAgICAgLy8g0KHQu9GD0YjQsNGC0Ywg0YHQvtCx0YvRgtC40Y8g0LrQvdC+0L/QvtC6INGH0LDRgtCwXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGV2ZW50ID0+IHtcbiAgICAgICAgdGhpcy5fX2xpc3RlbkZvckFjdGlvbkNsaWNrZWRSZXF1ZXN0cy5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyDQodC70YPRiNCw0YLRjCDRgdC+0LHRi9GC0LjRjyDQtNC70Y8gT2JzZXJ2ZXIt0LBcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZXZlbnQgPT4ge1xuICAgICAgICB0aGlzLl9fbGlzdGVuRm9yT2JzZXJ2ZVJlcXVlc3RzLmNhbGwodGhpcywgZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubG9hZENvbmRpdGlvbigpO1xuXG4gICAgICAvLyDQodC70YPRidCw0YLRjCDQuNC30LzQtdC90LXQvdC40LUgVVJMXG4gICAgICB0aGlzLmxpc3RlbkZvckxvY2F0aW9uQ2hhbmdlKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgbG9hZENvbmRpdGlvbigpIHtcbiAgICB0aGlzLmF1dG9TaG93Q29uZGl0aW9ucy5mb3JFYWNoKGNvbmQgPT4ge1xuICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKGNvbmQudXJsUmVnZXgsICdpJyk7XG5cbiAgICAgIGlmIChyZWdleC50ZXN0KHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5yZW5kZXJXaWRnZXQoY29uZC5zcmMpO1xuICAgICAgICAgIGlmICghdGhpcy5zdHlsZXNMb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZFN0eWxlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xuICAgICAgICB9LCBjb25kLnRpbWVJbnRlcnZhbCAqIDEwMDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBsaXN0ZW5Gb3JMb2NhdGlvbkNoYW5nZSgpIHtcbiAgICAvKiBUaGlzIG1vZGlmaWVzIHRoZXNlIHRocmVlIGZ1bmN0aW9ucyBzbyB0aGF0IGFsbCBmaXJlXG4gICAgYSBjdXN0b20gbG9jYXRpb25jaGFuZ2UgZXZlbnQgZm9yIHlvdSB0byB1c2UsXG4gICAgYW5kIGFsc28gcHVzaHN0YXRlIGFuZCByZXBsYWNlc3RhdGUgZXZlbnRzIGlmIHlvdSB3YW50IHRvIHVzZSB0aG9zZTpcbiAgICBGcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTI4MDkxMDUvMzkzOTg1MyAqL1xuICAgIGhpc3RvcnkucHVzaFN0YXRlID0gKGYgPT5cbiAgICAgIGZ1bmN0aW9uIHB1c2hTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgcmV0ID0gZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgncHVzaFN0YXRlJykpO1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfSkoaGlzdG9yeS5wdXNoU3RhdGUpO1xuXG4gICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUgPSAoZiA9PlxuICAgICAgZnVuY3Rpb24gcmVwbGFjZVN0YXRlKCkge1xuICAgICAgICBjb25zdCByZXQgPSBmLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdyZXBsYWNlU3RhdGUnKSk7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9jYXRpb25jaGFuZ2UnKSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9KShoaXN0b3J5LnJlcGxhY2VTdGF0ZSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCAoKSA9PiB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvY2F0aW9uY2hhbmdlJykpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICog0KHQu9GD0YjQsNGC0Ywg0LjQt9C80LXQvdC10L3QuNC1IFVSTFxuICAgICAqL1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2NhdGlvbmNoYW5nZScsICgpID0+IHtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIHRoaXMubG9hZENvbmRpdGlvbigpO1xuICAgIH0pO1xuICB9LFxuICAvKipcbiAgICog0JXRgdC70Lgg0L/RgNC40YXQvtC00Y/RgiDRgtCw0LrQuNC1INGN0LrRiNC90YssINGC0L4g0YPQsdC40YDQsNGC0YwgaGlnaGxpZ2h0XG4gICAqIEBwYXJhbSB7b2JqZWN0fSBlXG4gICAqL1xuICBfX2xpc3RlbkZvckFjdGlvbkNsaWNrZWRSZXF1ZXN0cyhlKSB7XG4gICAgaWYgKGlzTWVzc2FnZUZyb21XaWRnZXQoZSkgJiYgZS5kYXRhLmFjdGlvbiA9PT0gJ0FDVElPTl9DTElDS0VEJykge1xuICAgICAgY29uc3QgeyBhbnN3ZXJfaWQgfSA9IGUuZGF0YTtcblxuICAgICAgaWYgKGFuc3dlcl9pZCA9PT0gdGhpcy5fX2ludHJvLl9vcHRpb25zLnN0ZXBzWzBdLmhpZ2hsaWdodEV2ZW50QW5zd2VySWQpIHtcbiAgICAgICAgdGhpcy5fX2ludHJvLmV4aXQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiDQl9Cw0L/Rg9GB0YLQuNGC0Ywg0L/RgNC+0YHQu9GD0YjQvdC40LLQsNC90LjQtSDRgdC+0LHRi9GC0LjQuCDQutC+0YLQvtGA0YvQtSDQstGL0YHRgtGA0LXQu9C40LLQsNGO0YIgbGlzdGVuZXJfaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IGVcbiAgICovXG4gIF9fbGlzdGVuRm9yT2JzZXJ2ZVJlcXVlc3RzKGUpIHtcbiAgICBpZiAoaXNNZXNzYWdlRnJvbVdpZGdldChlKSAmJiBlLmRhdGEuYWN0aW9uID09PSAnT0JTRVJWRScpIHtcbiAgICAgIGNvbnN0IGxpc3RlbmVyID0gbmV3IENoYW5nZXNMaXN0ZW5lcihlLmRhdGEpO1xuXG4gICAgICBsaXN0ZW5lci50b3VySnMgPSB0aGlzO1xuICAgICAgbGlzdGVuZXIuaW5pdCgpO1xuICAgIH1cbiAgfSxcbiAgLyoqXG4gICAqINCX0LDQv9GD0YHRgtC40YLRjCDQv9GA0L7RgdC70YPRiNC40LLQsNC90LjQtSDQt9Cw0LrRgNGL0YLQuNGPINCy0YvQtNC10LvQtdC90LjRjyDRjdC70LXQvNC10L3RgtCwXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlXG4gICAqL1xuICBfX2xpc3RlbkZvckhpZ2hsaWdodFJlcXVlc3RzKGUpIHtcbiAgICBpZiAoaXNNZXNzYWdlRnJvbVdpZGdldChlKSAmJiBlLmRhdGEuYWN0aW9uID09PSAnSElHSExJR0hUJykge1xuICAgICAgaWYgKGUuZGF0YS5zZWxlY3Rvcikge1xuICAgICAgICB0aGlzLmhpZ2hsaWdodChlLmRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgX19nZXRFbGVtZW50Rm9ySGlnaGxpZ2h0KHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICBjb25zdCBlbGVtZW50c0FycmF5ID0gQXJyYXkuZnJvbShlbGVtZW50cyk7XG5cbiAgICByZXR1cm4gZWxlbWVudHNBcnJheS5maW5kKGlzQW55UGFydE9mRWxlbWVudEluVmlld3BvcnQpO1xuICB9LFxuICBoaWdobGlnaHQoeyBzZWxlY3RvciwgY2xvc2VFdmVudCwgaGlnaGxpZ2h0RXZlbnRBbnN3ZXJJZCB9KSB7XG4gICAgY29uc3Qgc3RlcCA9IHtcbiAgICAgIGVsZW1lbnQ6IHNlbGVjdG9yLFxuICAgICAgZml4ZWQ6IHRydWUsXG4gICAgICBjbG9zZUV2ZW50LFxuICAgICAgaGlnaGxpZ2h0RXZlbnRBbnN3ZXJJZFxuICAgIH07XG4gICAgY29uc3QgaW50cm9FbGVtZW50ID0gdGhpcy5fX2dldEVsZW1lbnRGb3JIaWdobGlnaHQoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGludHJvRWxlbWVudCA9PSBudWxsKSB7XG4gICAgICBzaG93RXJyb3IoXCJFbGVtZW50IGRvZXNuJ3QgZXhpc3Qgb24gRE9NXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjbG9zZUV2ZW50ID09PSAnY2hhdExpc3RlbmVyQ2xpY2snKSB7XG4gICAgICB0aGlzLnNldE9wdGlvbnMoe1xuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgZXhpdE9uRXNjOiBmYWxzZSxcbiAgICAgICAgICBleGl0T25PdmVybGF5Q2xpY2s6IGZhbHNlLFxuICAgICAgICAgIGRpc2FibGVJbnRlcmFjdGlvbjogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRPcHRpb25zKHtcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGV4aXRPbkVzYzogdHJ1ZSxcbiAgICAgICAgICBleGl0T25PdmVybGF5Q2xpY2s6IGZhbHNlLFxuICAgICAgICAgIGRpc2FibGVJbnRlcmFjdGlvbjogZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX19pbnRyby5hZGRTdGVwKHN0ZXApO1xuXG4gICAgLy8gTGlzdGVuIHRvIGV2ZW50XG4gICAgaW50cm9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICBjbG9zZUV2ZW50LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGlzLl9faW50cm8uZXhpdCgpO1xuICAgICAgfSxcbiAgICAgIHsgb25jZTogdHJ1ZSB9XG4gICAgKTtcbiAgICAvLyBDbG9zZVxuICAgIGlmICh0aGlzLl9faW50cm8uX2ludHJvSXRlbXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLl9faW50cm8uZ29Ub1N0ZXBOdW1iZXIoMCk7XG4gICAgfVxuICAgIHRoaXMuX19pbnRyby5leGl0KCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX19pbnRyby5zdGFydChzdGVwKTtcbiAgICB9LCA1MCk7XG4gIH0sXG4gIHNlbmRNZXNzYWdlKG1zZykge1xuICAgIHRoaXMuX19pbnRyby5leGl0KCk7XG4gICAgY29uc3QgaWZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnNlbGVjdG9yKTtcblxuICAgIGlmICghaWZyYW1lKSB7XG4gICAgICBzaG93RXJyb3IoXCJXaWRnZXQncyBpZnJhbWUgbm90IGZvdW5kIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShPYmplY3QuYXNzaWduKG1zZywgeyBzb3VyY2U6ICdnZXQtdG91ci1saWJyYXJ5JyB9KSk7XG4gIH0sXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuX19pbnRyby5fb3B0aW9ucy5zdGVwcyA9IFtdO1xuICAgIHRoaXMuX19pbnRyby5yZWZyZXNoKCk7XG4gICAgdGhpcy5kZXN0cm95V2lkZ2V0KCk7XG4gIH0sXG4gIGRlc3Ryb3lXaWRnZXQoKSB7XG4gICAgaWYgKHRoaXMuYmxvY2spIHtcbiAgICAgIHRoaXMuYmxvY2sucmVtb3ZlKCk7XG4gICAgfVxuICB9LFxuICByZW5kZXJXaWRnZXQod2lkZ2V0VXJsKSB7XG4gICAgdGhpcy5ibG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMuYmxvY2suY2xhc3NOYW1lID0gJ2dldGNoYXQtd2lkZ2V0IGdldGNoYXQtd2lkZ2V0LS1leHBhbmRlZCc7XG4gICAgY29uc3Qgd2lkZ2V0SHRtbCA9XG4gICAgICAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJnZXRjaGF0LXdpZGdldF9fYnRuIGdldGNoYXQtd2lkZ2V0X19idG4tLWljb25cIiA+JyArXG4gICAgICAnPGkgYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3M9XCJnZXRjaGF0LXdpZGdldF9faWNvbi0tY2xvc2VcIj48L2k+PC9idXR0b24+JyArXG4gICAgICBgPGlmcmFtZSBzcmM9XCIke3dpZGdldFVybH1cIiBjbGFzcz1cImdldGNoYXQtd2lkZ2V0X19mcmFtZVwiPjwvaWZyYW1lPmA7XG5cbiAgICB0aGlzLmJsb2NrLmlubmVySFRNTCA9IHdpZGdldEh0bWw7XG5cbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYmxvY2spO1xuICB9LFxuICBsb2FkU3R5bGVzKCkge1xuICAgIGxvYWRDc3ModGhpcy5zdHlsZXNGaWxlUGF0aCk7XG4gICAgdGhpcy5zdHlsZXNMb2FkZWQgPSB0cnVlO1xuICB9LFxuICBpbml0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgY29uc3QgJGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdldGNoYXQtd2lkZ2V0X19idG4tLWljb24nKTtcblxuICAgICRjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLmJsb2NrLmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmV4cGFuZENsYXNzKSkge1xuICAgICAgICB0aGlzLmhpZGVCbG9jaygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5leHBhbmRCbG9jaygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBoaWRlQmxvY2soKSB7XG4gICAgY29uc3QgJGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdldGNoYXQtd2lkZ2V0X19idG4tLWljb24nKTtcbiAgICBjb25zdCAkaWNvbiA9ICRjbG9zZUJ0bi5jaGlsZHJlblswXTtcblxuICAgIHRoaXMuYmxvY2suY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmV4cGFuZENsYXNzKTtcbiAgICAkaWNvbi5jbGFzc05hbWUgPSAnZ2V0Y2hhdC13aWRnZXRfX2ljb24tLWV4cGFuZCc7XG4gIH0sXG4gIGV4cGFuZEJsb2NrKCkge1xuICAgIGNvbnN0ICRjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nZXRjaGF0LXdpZGdldF9fYnRuLS1pY29uJyk7XG4gICAgY29uc3QgJGljb24gPSAkY2xvc2VCdG4uY2hpbGRyZW5bMF07XG5cbiAgICB0aGlzLmJsb2NrLmNsYXNzTGlzdC5hZGQodGhpcy5leHBhbmRDbGFzcyk7XG4gICAgJGljb24uY2xhc3NOYW1lID0gJ2dldGNoYXQtd2lkZ2V0X19pY29uLS1jbG9zZSc7XG4gIH0sXG4gIGxvYWRXaWRnZXREYXRhKCkge1xuICAgIC8vIGNvbnN0IHVybCA9IGBodHRwczovL2dldGNoYXQubWUvYXBpL3RoZS1ib3Qvd2lkZ2V0LyR7dGhpcy5oYXNofS9kYXRhYDtcbiAgICBjb25zdCB1cmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS90aGUtYm90L3dpZGdldC8ke3RoaXMuaGFzaH0vZGF0YWA7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIGZldGNoKHVybCwge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBjcmVkZW50aWFsczogJ29taXQnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICBjYWNoZTogJ25vLWNhY2hlJyxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29ucCdcbiAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNob3dFcnJvcihgW9Ce0YjQuNCx0LrQsF0gJHtyZXMuc3RhdHVzVGV4dH1gKTtcbiAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc29sdmUocmVzcG9uc2UpKVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIHNob3dFcnJvcihlcnJvcik7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBvbmJvYXJkaW5nO1xuIiwiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qKlxuICogSW50cm8uanMgdjIuOS4zICBmb3JrLiBvbmx5IGhpZ2hsaWdodCBlbGVtZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vdXNhYmxpY2EvaW50cm8uanNcbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTcgQWZzaGluIE1laHJhYmFuaSAoQGFmc2hpbm1laClcbiAqL1xuXG4oZnVuY3Rpb24oZikge1xuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmKCk7XG4gICAgLy8gZGVwcmVjYXRlZCBmdW5jdGlvblxuICAgIC8vIEBzaW5jZSAyLjguMFxuICAgIG1vZHVsZS5leHBvcnRzLmludHJvSnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ0RlcHJlY2F0ZWQ6IHBsZWFzZSB1c2UgcmVxdWlyZShcImludHJvLmpzXCIpIGRpcmVjdGx5LCBpbnN0ZWFkIG9mIHRoZSBpbnRyb0pzIG1ldGhvZCBvZiB0aGUgZnVuY3Rpb24nXG4gICAgICApO1xuICAgICAgLy8gaW50cm9KcygpXG4gICAgICByZXR1cm4gZigpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGYpO1xuICB9IGVsc2Uge1xuICAgIHZhciBnO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgZyA9IHdpbmRvdztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBnID0gZ2xvYmFsO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBnID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgZyA9IHRoaXM7XG4gICAgfVxuICAgIGcuaW50cm9KcyA9IGYoKTtcbiAgfVxufSkoZnVuY3Rpb24oKSB7XG4gIC8vRGVmYXVsdCBjb25maWcvdmFyaWFibGVzXG4gIHZhciBWRVJTSU9OID0gJzIuOS4zJztcblxuICAvKipcbiAgICogSW50cm9KcyBtYWluIGNsYXNzXG4gICAqXG4gICAqIEBjbGFzcyBJbnRyb0pzXG4gICAqL1xuICBmdW5jdGlvbiBJbnRyb0pzKG9iaikge1xuICAgIHRoaXMuX3RhcmdldEVsZW1lbnQgPSBvYmo7XG4gICAgdGhpcy5faW50cm9JdGVtcyA9IFtdO1xuXG4gICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgIC8qIENTUyBjbGFzcyB0aGF0IGlzIGFkZGVkIHRvIHRoZSBoZWxwZXJMYXllciAqL1xuICAgICAgaGlnaGxpZ2h0Q2xhc3M6ICcnLFxuICAgICAgLyogQ2xvc2UgaW50cm9kdWN0aW9uIHdoZW4gcHJlc3NpbmcgRXNjYXBlIGJ1dHRvbj8gKi9cbiAgICAgIGV4aXRPbkVzYzogdHJ1ZSxcbiAgICAgIC8qIENsb3NlIGludHJvZHVjdGlvbiB3aGVuIGNsaWNraW5nIG9uIG92ZXJsYXkgbGF5ZXI/ICovXG4gICAgICBleGl0T25PdmVybGF5Q2xpY2s6IHRydWUsXG4gICAgICAvKiBMZXQgdXNlciB1c2Uga2V5Ym9hcmQgdG8gbmF2aWdhdGUgdGhlIHRvdXI/ICovXG4gICAgICBrZXlib2FyZE5hdmlnYXRpb246IGZhbHNlLFxuXG4gICAgICAvKiBTY3JvbGwgdG8gaGlnaGxpZ2h0ZWQgZWxlbWVudD8gKi9cbiAgICAgIHNjcm9sbFRvRWxlbWVudDogdHJ1ZSxcbiAgICAgIC8qXG4gICAgICAgKiBTaG91bGQgd2Ugc2Nyb2xsIHRoZSB0b29sdGlwIG9yIHRhcmdldCBlbGVtZW50P1xuICAgICAgICpcbiAgICAgICAqIE9wdGlvbnMgYXJlOiAnZWxlbWVudCcgb3IgJ3Rvb2x0aXAnXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbFRvOiAnZWxlbWVudCcsXG4gICAgICAvKiBQYWRkaW5nIHRvIGFkZCBhZnRlciBzY3JvbGxpbmcgd2hlbiBlbGVtZW50IGlzIG5vdCBpbiB0aGUgdmlld3BvcnQgKGluIHBpeGVscykgKi9cbiAgICAgIHNjcm9sbFBhZGRpbmc6IDMwLFxuICAgICAgLyogU2V0IHRoZSBvdmVybGF5IG9wYWNpdHkgKi9cbiAgICAgIG92ZXJsYXlPcGFjaXR5OiAwLjksXG4gICAgICAvKiBQcmVjZWRlbmNlIG9mIHBvc2l0aW9ucywgd2hlbiBhdXRvIGlzIGVuYWJsZWQgKi9cbiAgICAgIHBvc2l0aW9uUHJlY2VkZW5jZTogWydib3R0b20nLCAndG9wJywgJ3JpZ2h0JywgJ2xlZnQnXSxcbiAgICAgIC8qIERpc2FibGUgYW4gaW50ZXJhY3Rpb24gd2l0aCBlbGVtZW50PyAqL1xuICAgICAgZGlzYWJsZUludGVyYWN0aW9uOiBmYWxzZSxcbiAgICAgIC8qIFNldCBob3cgbXVjaCBwYWRkaW5nIHRvIGJlIHVzZWQgYXJvdW5kIGhlbHBlciBlbGVtZW50ICovXG4gICAgICBoZWxwZXJFbGVtZW50UGFkZGluZzogMCxcblxuICAgICAgLyogYWRkaXRpb25hbCBjbGFzc2VzIHRvIHB1dCBvbiB0aGUgYnV0dG9ucyAqL1xuICAgICAgYnV0dG9uQ2xhc3M6ICdpbnRyb2pzLWJ1dHRvbidcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYXRlIGEgbmV3IGludHJvZHVjdGlvbi9ndWlkZSBmcm9tIGFuIGVsZW1lbnQgaW4gdGhlIHBhZ2VcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2ludHJvRm9yRWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0RWxtXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBncm91cFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gU3VjY2VzcyBvciBub3Q/XG4gICAqL1xuICBmdW5jdGlvbiBfaW50cm9Gb3JFbGVtZW50KHRhcmdldEVsbSwgc3RlcCkge1xuICAgIHZhciBpbnRyb0l0ZW1zID0gW107XG4gICAgdmFyIGN1cnJlbnRJdGVtID0gX2Nsb25lT2JqZWN0KHN0ZXApO1xuXG4gICAgLy9zZXQgdGhlIHN0ZXBcbiAgICBjdXJyZW50SXRlbS5zdGVwID0gaW50cm9JdGVtcy5sZW5ndGggKyAxO1xuXG4gICAgLy91c2UgcXVlcnlTZWxlY3RvciBmdW5jdGlvbiBvbmx5IHdoZW4gZGV2ZWxvcGVyIHVzZWQgQ1NTIHNlbGVjdG9yXG4gICAgaWYgKHR5cGVvZiBjdXJyZW50SXRlbS5lbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgLy9ncmFiIHRoZSBlbGVtZW50IHdpdGggZ2l2ZW4gc2VsZWN0b3IgZnJvbSB0aGUgcGFnZVxuICAgICAgY3VycmVudEl0ZW0uZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY3VycmVudEl0ZW0uZWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy9pbnRybyB3aXRob3V0IGVsZW1lbnRcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgY3VycmVudEl0ZW0uZWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgIGN1cnJlbnRJdGVtLmVsZW1lbnQgPT09IG51bGxcbiAgICApIHtcbiAgICAgIHZhciBmbG9hdGluZ0VsZW1lbnRRdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICcuaW50cm9qc0Zsb2F0aW5nRWxlbWVudCdcbiAgICAgICk7XG5cbiAgICAgIGlmIChmbG9hdGluZ0VsZW1lbnRRdWVyeSA9PT0gbnVsbCkge1xuICAgICAgICBmbG9hdGluZ0VsZW1lbnRRdWVyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmbG9hdGluZ0VsZW1lbnRRdWVyeS5jbGFzc05hbWUgPSAnaW50cm9qc0Zsb2F0aW5nRWxlbWVudCc7XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmbG9hdGluZ0VsZW1lbnRRdWVyeSk7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRJdGVtLmVsZW1lbnQgPSBmbG9hdGluZ0VsZW1lbnRRdWVyeTtcbiAgICAgIGN1cnJlbnRJdGVtLnBvc2l0aW9uID0gJ2Zsb2F0aW5nJztcbiAgICB9XG5cbiAgICBjdXJyZW50SXRlbS5zY3JvbGxUbyA9IGN1cnJlbnRJdGVtLnNjcm9sbFRvIHx8IHRoaXMuX29wdGlvbnMuc2Nyb2xsVG87XG5cbiAgICBpZiAodHlwZW9mIGN1cnJlbnRJdGVtLmRpc2FibGVJbnRlcmFjdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN1cnJlbnRJdGVtLmRpc2FibGVJbnRlcmFjdGlvbiA9IHRoaXMuX29wdGlvbnMuZGlzYWJsZUludGVyYWN0aW9uO1xuICAgIH1cblxuICAgIGlmIChjdXJyZW50SXRlbS5lbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpbnRyb0l0ZW1zID0gW2N1cnJlbnRJdGVtXTtcbiAgICB9XG5cbiAgICAvL3NldCBpdCB0byB0aGUgaW50cm9KcyBvYmplY3RcbiAgICB0aGlzLl9pbnRyb0l0ZW1zID0gaW50cm9JdGVtcztcblxuICAgIC8vYWRkIG92ZXJsYXkgbGF5ZXIgdG8gdGhlIHBhZ2VcbiAgICBpZiAoX2FkZE92ZXJsYXlMYXllci5jYWxsKHRoaXMsIHRhcmdldEVsbSkpIHtcbiAgICAgIC8vdGhlbiwgc3RhcnQgdGhlIHNob3dcbiAgICAgIF9uZXh0U3RlcC5jYWxsKHRoaXMpO1xuXG4gICAgICBpZiAodGhpcy5fb3B0aW9ucy5rZXlib2FyZE5hdmlnYXRpb24pIHtcbiAgICAgICAgRE9NRXZlbnQub24od2luZG93LCAna2V5ZG93bicsIF9vbktleURvd24sIHRoaXMsIHRydWUpO1xuICAgICAgfVxuICAgICAgLy9mb3Igd2luZG93IHJlc2l6ZVxuICAgICAgRE9NRXZlbnQub24od2luZG93LCAncmVzaXplJywgX29uUmVzaXplLCB0aGlzLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gX29uUmVzaXplKCkge1xuICAgIHRoaXMucmVmcmVzaC5jYWxsKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIG9uIGtleUNvZGU6XG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9LZXlib2FyZEV2ZW50L2tleUNvZGVcbiAgICogVGhpcyBmZWF0dXJlIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgV2ViIHN0YW5kYXJkcy5cbiAgICogVGhvdWdoIHNvbWUgYnJvd3NlcnMgbWF5IHN0aWxsIHN1cHBvcnQgaXQsIGl0IGlzIGluXG4gICAqIHRoZSBwcm9jZXNzIG9mIGJlaW5nIGRyb3BwZWQuXG4gICAqIEluc3RlYWQsIHlvdSBzaG91bGQgdXNlIEtleWJvYXJkRXZlbnQuY29kZSxcbiAgICogaWYgaXQncyBpbXBsZW1lbnRlZC5cbiAgICpcbiAgICogalF1ZXJ5J3MgYXBwcm9hY2ggaXMgdG8gdGVzdCBmb3JcbiAgICogICAoMSkgZS53aGljaCwgdGhlblxuICAgKiAgICgyKSBlLmNoYXJDb2RlLCB0aGVuXG4gICAqICAgKDMpIGUua2V5Q29kZVxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL2E2YjA3MDUyOTRkMzM2YWUyZjYzZjcyNzZkZTBkYTExOTU0OTUzNjMvc3JjL2V2ZW50LmpzI0w2MzhcbiAgICpcbiAgICogQHBhcmFtIHR5cGUgdmFyXG4gICAqIEByZXR1cm4gdHlwZVxuICAgKi9cbiAgZnVuY3Rpb24gX29uS2V5RG93bihlKSB7XG4gICAgdmFyIGNvZGUgPSBlLmNvZGUgPT09IG51bGwgPyBlLndoaWNoIDogZS5jb2RlO1xuXG4gICAgLy8gaWYgY29kZS9lLndoaWNoIGlzIG51bGxcbiAgICBpZiAoY29kZSA9PT0gbnVsbCkge1xuICAgICAgY29kZSA9IGUuY2hhckNvZGUgPT09IG51bGwgPyBlLmtleUNvZGUgOiBlLmNoYXJDb2RlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIChjb2RlID09PSAnRXNjYXBlJyB8fCBjb2RlID09PSAyNykgJiZcbiAgICAgIHRoaXMuX29wdGlvbnMuZXhpdE9uRXNjID09PSB0cnVlXG4gICAgKSB7XG4gICAgICAvL2VzY2FwZSBrZXkgcHJlc3NlZCwgZXhpdCB0aGUgaW50cm9cbiAgICAgIC8vY2hlY2sgaWYgZXhpdCBjYWxsYmFjayBpcyBkZWZpbmVkXG4gICAgICBfZXhpdEludHJvLmNhbGwodGhpcywgdGhpcy5fdGFyZ2V0RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICogbWFrZXMgYSBjb3B5IG9mIHRoZSBvYmplY3RcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2Nsb25lT2JqZWN0XG4gICAqL1xuICBmdW5jdGlvbiBfY2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gICAgaWYgKFxuICAgICAgb2JqZWN0ID09PSBudWxsIHx8XG4gICAgICB0eXBlb2Ygb2JqZWN0ICE9PSAnb2JqZWN0JyB8fFxuICAgICAgdHlwZW9mIG9iamVjdC5ub2RlVHlwZSAhPT0gJ3VuZGVmaW5lZCdcbiAgICApIHtcbiAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgfVxuICAgIHZhciB0ZW1wID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2Ygd2luZG93LmpRdWVyeSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqZWN0W2tleV0gaW5zdGFuY2VvZiB3aW5kb3cualF1ZXJ5XG4gICAgICApIHtcbiAgICAgICAgdGVtcFtrZXldID0gb2JqZWN0W2tleV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wW2tleV0gPSBfY2xvbmVPYmplY3Qob2JqZWN0W2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGVtcDtcbiAgfVxuICAvKipcbiAgICogR28gdG8gc3BlY2lmaWMgc3RlcCBvZiBpbnRyb2R1Y3Rpb25cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2dvVG9TdGVwXG4gICAqL1xuICBmdW5jdGlvbiBfZ29Ub1N0ZXAoc3RlcCkge1xuICAgIC8vYmVjYXVzZSBzdGVwcyBzdGFydHMgd2l0aCB6ZXJvXG4gICAgdGhpcy5fY3VycmVudFN0ZXAgPSBzdGVwIC0gMjtcbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludHJvSXRlbXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBfbmV4dFN0ZXAuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR28gdG8gdGhlIHNwZWNpZmljIHN0ZXAgb2YgaW50cm9kdWN0aW9uIHdpdGggdGhlIGV4cGxpY2l0IFtkYXRhLXN0ZXBdIG51bWJlclxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfZ29Ub1N0ZXBOdW1iZXJcbiAgICovXG4gIGZ1bmN0aW9uIF9nb1RvU3RlcE51bWJlcihzdGVwKSB7XG4gICAgdGhpcy5fY3VycmVudFN0ZXBOdW1iZXIgPSBzdGVwO1xuICAgIGlmICh0eXBlb2YgdGhpcy5faW50cm9JdGVtcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIF9uZXh0U3RlcC5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHbyB0byBuZXh0IHN0ZXAgb24gaW50cm9cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX25leHRTdGVwXG4gICAqL1xuICBmdW5jdGlvbiBfbmV4dFN0ZXAoKSB7XG4gICAgdGhpcy5fZGlyZWN0aW9uID0gJ2ZvcndhcmQnO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9jdXJyZW50U3RlcE51bWJlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIF9mb3JFYWNoKFxuICAgICAgICB0aGlzLl9pbnRyb0l0ZW1zLFxuICAgICAgICBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgICAgaWYgKGl0ZW0uc3RlcCA9PT0gdGhpcy5fY3VycmVudFN0ZXBOdW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGVwID0gaSAtIDE7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RlcE51bWJlciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2N1cnJlbnRTdGVwID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5fY3VycmVudFN0ZXAgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICArK3RoaXMuX2N1cnJlbnRTdGVwO1xuICAgIH1cblxuICAgIC8vIGNvbW1lbnQg0L7RgdGC0YvQu9GMIHZhciBuZXh0U3RlcCA9IHRoaXMuX2ludHJvSXRlbXNbdGhpcy5fY3VycmVudFN0ZXBdO1xuICAgIHZhciBuZXh0U3RlcCA9IHRoaXMuX2ludHJvSXRlbXNbMF07XG4gICAgdmFyIGNvbnRpbnVlU3RlcCA9IHRydWU7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludHJvQmVmb3JlQ2hhbmdlQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb250aW51ZVN0ZXAgPSB0aGlzLl9pbnRyb0JlZm9yZUNoYW5nZUNhbGxiYWNrLmNhbGwoXG4gICAgICAgIHRoaXMsXG4gICAgICAgIG5leHRTdGVwLmVsZW1lbnRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gaWYgYG9uYmVmb3JlY2hhbmdlYCByZXR1cm5lZCBgZmFsc2VgLCBzdG9wIGRpc3BsYXlpbmcgdGhlIGVsZW1lbnRcbiAgICBpZiAoY29udGludWVTdGVwID09PSBmYWxzZSkge1xuICAgICAgLS10aGlzLl9jdXJyZW50U3RlcDtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW50cm9JdGVtcy5sZW5ndGggPD0gdGhpcy5fY3VycmVudFN0ZXApIHtcbiAgICAgIC8vZW5kIG9mIHRoZSBpbnRyb1xuICAgICAgLy9jaGVjayBpZiBhbnkgY2FsbGJhY2sgaXMgZGVmaW5lZFxuICAgICAgaWYgKHR5cGVvZiB0aGlzLl9pbnRyb0NvbXBsZXRlQ2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5faW50cm9Db21wbGV0ZUNhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgICB9XG4gICAgICBfZXhpdEludHJvLmNhbGwodGhpcywgdGhpcy5fdGFyZ2V0RWxlbWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgX3Nob3dFbGVtZW50LmNhbGwodGhpcywgbmV4dFN0ZXApO1xuICB9XG4gXG4gIC8qKlxuICAgKiBVcGRhdGUgcGxhY2VtZW50IG9mIHRoZSBpbnRybyBvYmplY3RzIG9uIHRoZSBzY3JlZW5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBfcmVmcmVzaCgpIHtcbiAgICAvLyByZS1hbGlnbiBpbnRyb3NcbiAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKFxuICAgICAgdGhpcyxcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRyb2pzLWhlbHBlckxheWVyJylcbiAgICApO1xuICAgIF9zZXRIZWxwZXJMYXllclBvc2l0aW9uLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvanMtdG9vbHRpcFJlZmVyZW5jZUxheWVyJylcbiAgICApO1xuICAgIF9zZXRIZWxwZXJMYXllclBvc2l0aW9uLmNhbGwoXG4gICAgICB0aGlzLFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvanMtZGlzYWJsZUludGVyYWN0aW9uJylcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogRXhpdCBmcm9tIGludHJvXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9leGl0SW50cm9cbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldEVsZW1lbnRcbiAgICogQHBhcmFtIHtCb29sZWFufSBmb3JjZSAtIFNldHRpbmcgdG8gYHRydWVgIHdpbGwgc2tpcCB0aGUgcmVzdWx0IG9mIGJlZm9yZUV4aXQgY2FsbGJhY2tcbiAgICovXG4gIGZ1bmN0aW9uIF9leGl0SW50cm8odGFyZ2V0RWxlbWVudCwgZm9yY2UpIHtcbiAgICB2YXIgY29udGludWVFeGl0ID0gdHJ1ZTtcblxuICAgIC8vIGNhbGxpbmcgb25iZWZvcmVleGl0IGNhbGxiYWNrXG4gICAgLy9cbiAgICAvLyBJZiB0aGlzIGNhbGxiYWNrIHJldHVybiBgZmFsc2VgLCBpdCB3b3VsZCBoYWx0IHRoZSBwcm9jZXNzXG4gICAgaWYgKHRoaXMuX2ludHJvQmVmb3JlRXhpdENhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRpbnVlRXhpdCA9IHRoaXMuX2ludHJvQmVmb3JlRXhpdENhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgLy8gc2tpcCB0aGlzIGNoZWNrIGlmIGBmb3JjZWAgcGFyYW1ldGVyIGlzIGB0cnVlYFxuICAgIC8vIG90aGVyd2lzZSwgaWYgYG9uYmVmb3JlZXhpdGAgcmV0dXJuZWQgYGZhbHNlYCwgZG9uJ3QgZXhpdCB0aGUgaW50cm9cbiAgICBpZiAoIWZvcmNlICYmIGNvbnRpbnVlRXhpdCA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIC8vcmVtb3ZlIG92ZXJsYXkgbGF5ZXJzIGZyb20gdGhlIHBhZ2VcbiAgICB2YXIgb3ZlcmxheUxheWVycyA9IHRhcmdldEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmludHJvanMtb3ZlcmxheScpO1xuXG4gICAgaWYgKG92ZXJsYXlMYXllcnMgJiYgb3ZlcmxheUxheWVycy5sZW5ndGgpIHtcbiAgICAgIF9mb3JFYWNoKFxuICAgICAgICBvdmVybGF5TGF5ZXJzLFxuICAgICAgICBmdW5jdGlvbihvdmVybGF5TGF5ZXIpIHtcbiAgICAgICAgICBvdmVybGF5TGF5ZXIuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoXG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfS5iaW5kKG92ZXJsYXlMYXllciksXG4gICAgICAgICAgICA1MDBcbiAgICAgICAgICApO1xuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy9yZW1vdmUgYWxsIGhlbHBlciBsYXllcnNcbiAgICB2YXIgaGVscGVyTGF5ZXIgPSB0YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnRyb2pzLWhlbHBlckxheWVyJyk7XG4gICAgaWYgKGhlbHBlckxheWVyKSB7XG4gICAgICBoZWxwZXJMYXllci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGhlbHBlckxheWVyKTtcbiAgICB9XG5cbiAgICB2YXIgcmVmZXJlbmNlTGF5ZXIgPSB0YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmludHJvanMtdG9vbHRpcFJlZmVyZW5jZUxheWVyJ1xuICAgICk7XG4gICAgaWYgKHJlZmVyZW5jZUxheWVyKSB7XG4gICAgICByZWZlcmVuY2VMYXllci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHJlZmVyZW5jZUxheWVyKTtcbiAgICB9XG5cbiAgICAvL3JlbW92ZSBkaXNhYmxlSW50ZXJhY3Rpb25MYXllclxuICAgIHZhciBkaXNhYmxlSW50ZXJhY3Rpb25MYXllciA9IHRhcmdldEVsZW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcuaW50cm9qcy1kaXNhYmxlSW50ZXJhY3Rpb24nXG4gICAgKTtcbiAgICBpZiAoZGlzYWJsZUludGVyYWN0aW9uTGF5ZXIpIHtcbiAgICAgIGRpc2FibGVJbnRlcmFjdGlvbkxheWVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZGlzYWJsZUludGVyYWN0aW9uTGF5ZXIpO1xuICAgIH1cblxuICAgIC8vcmVtb3ZlIGludHJvIGZsb2F0aW5nIGVsZW1lbnRcbiAgICB2YXIgZmxvYXRpbmdFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvanNGbG9hdGluZ0VsZW1lbnQnKTtcbiAgICBpZiAoZmxvYXRpbmdFbGVtZW50KSB7XG4gICAgICBmbG9hdGluZ0VsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmbG9hdGluZ0VsZW1lbnQpO1xuICAgIH1cblxuICAgIF9yZW1vdmVTaG93RWxlbWVudCgpO1xuXG4gICAgLy9yZW1vdmUgYGludHJvanMtZml4UGFyZW50YCBjbGFzcyBmcm9tIHRoZSBlbGVtZW50c1xuICAgIHZhciBmaXhQYXJlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmludHJvanMtZml4UGFyZW50Jyk7XG4gICAgX2ZvckVhY2goZml4UGFyZW50cywgZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgICBfcmVtb3ZlQ2xhc3MocGFyZW50LCAvaW50cm9qcy1maXhQYXJlbnQvZyk7XG4gICAgfSk7XG5cbiAgICAvL2NsZWFuIGxpc3RlbmVyc1xuICAgIERPTUV2ZW50Lm9mZih3aW5kb3csICdrZXlkb3duJywgX29uS2V5RG93biwgdGhpcywgdHJ1ZSk7XG4gICAgRE9NRXZlbnQub2ZmKHdpbmRvdywgJ3Jlc2l6ZScsIF9vblJlc2l6ZSwgdGhpcywgdHJ1ZSk7XG5cbiAgICAvL2NoZWNrIGlmIGFueSBjYWxsYmFjayBpcyBkZWZpbmVkXG4gICAgaWYgKHRoaXMuX2ludHJvRXhpdENhbGxiYWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2ludHJvRXhpdENhbGxiYWNrLmNhbGwodGhpcyk7XG4gICAgfVxuXG4gICAgLy9zZXQgdGhlIHN0ZXAgdG8gemVyb1xuICAgIHRoaXMuX2N1cnJlbnRTdGVwID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0b29sdGlwIGxlZnQgc28gaXQgZG9lc24ndCBnbyBvZmYgdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHdpbmRvd1xuICAgKlxuICAgKiBAcmV0dXJuIGJvb2xlYW4gdHJ1ZSwgaWYgdG9vbHRpcExheWVyU3R5bGVMZWZ0IGlzIG9rLiAgZmFsc2UsIG90aGVyd2lzZS5cbiAgICovXG4gIGZ1bmN0aW9uIF9jaGVja1JpZ2h0KFxuICAgIHRhcmdldE9mZnNldCxcbiAgICB0b29sdGlwTGF5ZXJTdHlsZUxlZnQsXG4gICAgdG9vbHRpcE9mZnNldCxcbiAgICB3aW5kb3dTaXplLFxuICAgIHRvb2x0aXBMYXllclxuICApIHtcbiAgICBpZiAoXG4gICAgICB0YXJnZXRPZmZzZXQubGVmdCArIHRvb2x0aXBMYXllclN0eWxlTGVmdCArIHRvb2x0aXBPZmZzZXQud2lkdGggPlxuICAgICAgd2luZG93U2l6ZS53aWR0aFxuICAgICkge1xuICAgICAgLy8gb2ZmIHRoZSByaWdodCBzaWRlIG9mIHRoZSB3aW5kb3dcbiAgICAgIHRvb2x0aXBMYXllci5zdHlsZS5sZWZ0ID1cbiAgICAgICAgd2luZG93U2l6ZS53aWR0aCAtIHRvb2x0aXBPZmZzZXQud2lkdGggLSB0YXJnZXRPZmZzZXQubGVmdCArICdweCc7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRvb2x0aXBMYXllci5zdHlsZS5sZWZ0ID0gdG9vbHRpcExheWVyU3R5bGVMZWZ0ICsgJ3B4JztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdG9vbHRpcCByaWdodCBzbyBpdCBkb2Vzbid0IGdvIG9mZiB0aGUgbGVmdCBzaWRlIG9mIHRoZSB3aW5kb3dcbiAgICpcbiAgICogQHJldHVybiBib29sZWFuIHRydWUsIGlmIHRvb2x0aXBMYXllclN0eWxlUmlnaHQgaXMgb2suICBmYWxzZSwgb3RoZXJ3aXNlLlxuICAgKi9cbiAgZnVuY3Rpb24gX2NoZWNrTGVmdChcbiAgICB0YXJnZXRPZmZzZXQsXG4gICAgdG9vbHRpcExheWVyU3R5bGVSaWdodCxcbiAgICB0b29sdGlwT2Zmc2V0LFxuICAgIHRvb2x0aXBMYXllclxuICApIHtcbiAgICBpZiAoXG4gICAgICB0YXJnZXRPZmZzZXQubGVmdCArXG4gICAgICAgIHRhcmdldE9mZnNldC53aWR0aCAtXG4gICAgICAgIHRvb2x0aXBMYXllclN0eWxlUmlnaHQgLVxuICAgICAgICB0b29sdGlwT2Zmc2V0LndpZHRoIDxcbiAgICAgIDBcbiAgICApIHtcbiAgICAgIC8vIG9mZiB0aGUgbGVmdCBzaWRlIG9mIHRoZSB3aW5kb3dcbiAgICAgIHRvb2x0aXBMYXllci5zdHlsZS5sZWZ0ID0gLXRhcmdldE9mZnNldC5sZWZ0ICsgJ3B4JztcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdG9vbHRpcExheWVyLnN0eWxlLnJpZ2h0ID0gdG9vbHRpcExheWVyU3R5bGVSaWdodCArICdweCc7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB0aGUgcG9zaXRpb24gb2YgdGhlIHRvb2x0aXAgYmFzZWQgb24gdGhlIHBvc2l0aW9uIHByZWNlZGVuY2UgYW5kIGF2YWlsYWJpbGl0eVxuICAgKiBvZiBzY3JlZW4gc3BhY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICB0YXJnZXRFbGVtZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgICB0b29sdGlwTGF5ZXJcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgIGRlc2lyZWRUb29sdGlwUG9zaXRpb25cbiAgICogQHJldHVybiB7U3RyaW5nfSAgIGNhbGN1bGF0ZWRQb3NpdGlvblxuICAgKi9cbiAgZnVuY3Rpb24gX2RldGVybWluZUF1dG9Qb3NpdGlvbihcbiAgICB0YXJnZXRFbGVtZW50LFxuICAgIHRvb2x0aXBMYXllcixcbiAgICBkZXNpcmVkVG9vbHRpcFBvc2l0aW9uXG4gICkge1xuICAgIC8vIFRha2UgYSBjbG9uZSBvZiBwb3NpdGlvbiBwcmVjZWRlbmNlLiBUaGVzZSB3aWxsIGJlIHRoZSBhdmFpbGFibGVcbiAgICB2YXIgcG9zc2libGVQb3NpdGlvbnMgPSB0aGlzLl9vcHRpb25zLnBvc2l0aW9uUHJlY2VkZW5jZS5zbGljZSgpO1xuXG4gICAgdmFyIHdpbmRvd1NpemUgPSBfZ2V0V2luU2l6ZSgpO1xuICAgIHZhciB0b29sdGlwSGVpZ2h0ID0gX2dldE9mZnNldCh0b29sdGlwTGF5ZXIpLmhlaWdodCArIDEwO1xuICAgIHZhciB0b29sdGlwV2lkdGggPSBfZ2V0T2Zmc2V0KHRvb2x0aXBMYXllcikud2lkdGggKyAyMDtcbiAgICB2YXIgdGFyZ2V0RWxlbWVudFJlY3QgPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gSWYgd2UgY2hlY2sgYWxsIHRoZSBwb3NzaWJsZSBhcmVhcywgYW5kIHRoZXJlIGFyZSBubyB2YWxpZCBwbGFjZXMgZm9yIHRoZSB0b29sdGlwLCB0aGUgZWxlbWVudFxuICAgIC8vIG11c3QgdGFrZSB1cCBtb3N0IG9mIHRoZSBzY3JlZW4gcmVhbCBlc3RhdGUuIFNob3cgdGhlIHRvb2x0aXAgZmxvYXRpbmcgaW4gdGhlIG1pZGRsZSBvZiB0aGUgc2NyZWVuLlxuICAgIHZhciBjYWxjdWxhdGVkUG9zaXRpb24gPSAnZmxvYXRpbmcnO1xuXG4gICAgLypcbiAgICAgKiBhdXRvIGRldGVybWluZSBwb3NpdGlvblxuICAgICAqL1xuXG4gICAgLy8gQ2hlY2sgZm9yIHNwYWNlIGJlbG93XG4gICAgaWYgKFxuICAgICAgdGFyZ2V0RWxlbWVudFJlY3QuYm90dG9tICsgdG9vbHRpcEhlaWdodCArIHRvb2x0aXBIZWlnaHQgPlxuICAgICAgd2luZG93U2l6ZS5oZWlnaHRcbiAgICApIHtcbiAgICAgIF9yZW1vdmVFbnRyeShwb3NzaWJsZVBvc2l0aW9ucywgJ2JvdHRvbScpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBzcGFjZSBhYm92ZVxuICAgIGlmICh0YXJnZXRFbGVtZW50UmVjdC50b3AgLSB0b29sdGlwSGVpZ2h0IDwgMCkge1xuICAgICAgX3JlbW92ZUVudHJ5KHBvc3NpYmxlUG9zaXRpb25zLCAndG9wJyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHNwYWNlIHRvIHRoZSByaWdodFxuICAgIGlmICh0YXJnZXRFbGVtZW50UmVjdC5yaWdodCArIHRvb2x0aXBXaWR0aCA+IHdpbmRvd1NpemUud2lkdGgpIHtcbiAgICAgIF9yZW1vdmVFbnRyeShwb3NzaWJsZVBvc2l0aW9ucywgJ3JpZ2h0Jyk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIHNwYWNlIHRvIHRoZSBsZWZ0XG4gICAgaWYgKHRhcmdldEVsZW1lbnRSZWN0LmxlZnQgLSB0b29sdGlwV2lkdGggPCAwKSB7XG4gICAgICBfcmVtb3ZlRW50cnkocG9zc2libGVQb3NpdGlvbnMsICdsZWZ0Jyk7XG4gICAgfVxuXG4gICAgLy8gQHZhciB7U3RyaW5nfSAgZXg6ICdyaWdodC1hbGlnbmVkJ1xuICAgIHZhciBkZXNpcmVkQWxpZ25tZW50ID0gKGZ1bmN0aW9uKHBvcykge1xuICAgICAgdmFyIGh5cGhlbkluZGV4ID0gcG9zLmluZGV4T2YoJy0nKTtcbiAgICAgIGlmIChoeXBoZW5JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgLy8gaGFzIGFsaWdubWVudFxuICAgICAgICByZXR1cm4gcG9zLnN1YnN0cihoeXBoZW5JbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfSkoZGVzaXJlZFRvb2x0aXBQb3NpdGlvbiB8fCAnJyk7XG5cbiAgICAvLyBzdHJpcCBhbGlnbm1lbnQgZnJvbSBwb3NpdGlvblxuICAgIGlmIChkZXNpcmVkVG9vbHRpcFBvc2l0aW9uKSB7XG4gICAgICAvLyBleDogXCJib3R0b20tcmlnaHQtYWxpZ25lZFwiXG4gICAgICAvLyBzaG91bGQgcmV0dXJuICdib3R0b20nXG4gICAgICBkZXNpcmVkVG9vbHRpcFBvc2l0aW9uID0gZGVzaXJlZFRvb2x0aXBQb3NpdGlvbi5zcGxpdCgnLScpWzBdO1xuICAgIH1cblxuICAgIGlmIChwb3NzaWJsZVBvc2l0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZGVzaXJlZFRvb2x0aXBQb3NpdGlvbiAhPT0gJ2F1dG8nICYmXG4gICAgICAgIHBvc3NpYmxlUG9zaXRpb25zLmluZGV4T2YoZGVzaXJlZFRvb2x0aXBQb3NpdGlvbikgPiAtMVxuICAgICAgKSB7XG4gICAgICAgIC8vIElmIHRoZSByZXF1ZXN0ZWQgcG9zaXRpb24gaXMgaW4gdGhlIGxpc3QsIGNob29zZSB0aGF0XG4gICAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbiA9IGRlc2lyZWRUb29sdGlwUG9zaXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBQaWNrIHRoZSBmaXJzdCB2YWxpZCBwb3NpdGlvbiwgaW4gb3JkZXJcbiAgICAgICAgY2FsY3VsYXRlZFBvc2l0aW9uID0gcG9zc2libGVQb3NpdGlvbnNbMF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gb25seSB0b3AgYW5kIGJvdHRvbSBwb3NpdGlvbnMgaGF2ZSBvcHRpb25hbCBhbGlnbm1lbnRzXG4gICAgaWYgKFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YoY2FsY3VsYXRlZFBvc2l0aW9uKSAhPT0gLTEpIHtcbiAgICAgIGNhbGN1bGF0ZWRQb3NpdGlvbiArPSBfZGV0ZXJtaW5lQXV0b0FsaWdubWVudChcbiAgICAgICAgdGFyZ2V0RWxlbWVudFJlY3QubGVmdCxcbiAgICAgICAgdG9vbHRpcFdpZHRoLFxuICAgICAgICB3aW5kb3dTaXplLFxuICAgICAgICBkZXNpcmVkQWxpZ25tZW50XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBjYWxjdWxhdGVkUG9zaXRpb247XG4gIH1cblxuICAvKipcbiAgICogYXV0by1kZXRlcm1pbmUgYWxpZ25tZW50XG4gICAqIEBwYXJhbSB7SW50ZWdlcn0gIG9mZnNldExlZnRcbiAgICogQHBhcmFtIHtJbnRlZ2VyfSAgdG9vbHRpcFdpZHRoXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAgIHdpbmRvd1NpemVcbiAgICogQHBhcmFtIHtTdHJpbmd9ICAgZGVzaXJlZEFsaWdubWVudFxuICAgKiBAcmV0dXJuIHtTdHJpbmd9ICBjYWxjdWxhdGVkQWxpZ25tZW50XG4gICAqL1xuICBmdW5jdGlvbiBfZGV0ZXJtaW5lQXV0b0FsaWdubWVudChcbiAgICBvZmZzZXRMZWZ0LFxuICAgIHRvb2x0aXBXaWR0aCxcbiAgICB3aW5kb3dTaXplLFxuICAgIGRlc2lyZWRBbGlnbm1lbnRcbiAgKSB7XG4gICAgdmFyIGhhbGZUb29sdGlwV2lkdGggPSB0b29sdGlwV2lkdGggLyAyLFxuICAgICAgd2luV2lkdGggPSBNYXRoLm1pbih3aW5kb3dTaXplLndpZHRoLCB3aW5kb3cuc2NyZWVuLndpZHRoKSxcbiAgICAgIHBvc3NpYmxlQWxpZ25tZW50cyA9IFtcbiAgICAgICAgJy1sZWZ0LWFsaWduZWQnLFxuICAgICAgICAnLW1pZGRsZS1hbGlnbmVkJyxcbiAgICAgICAgJy1yaWdodC1hbGlnbmVkJ1xuICAgICAgXSxcbiAgICAgIGNhbGN1bGF0ZWRBbGlnbm1lbnQgPSAnJztcblxuICAgIC8vIHZhbGlkIGxlZnQgbXVzdCBiZSBhdCBsZWFzdCBhIHRvb2x0aXBXaWR0aFxuICAgIC8vIGF3YXkgZnJvbSByaWdodCBzaWRlXG4gICAgaWYgKHdpbldpZHRoIC0gb2Zmc2V0TGVmdCA8IHRvb2x0aXBXaWR0aCkge1xuICAgICAgX3JlbW92ZUVudHJ5KHBvc3NpYmxlQWxpZ25tZW50cywgJy1sZWZ0LWFsaWduZWQnKTtcbiAgICB9XG5cbiAgICAvLyB2YWxpZCBtaWRkbGUgbXVzdCBiZSBhdCBsZWFzdCBoYWxmXG4gICAgLy8gd2lkdGggYXdheSBmcm9tIGJvdGggc2lkZXNcbiAgICBpZiAoXG4gICAgICBvZmZzZXRMZWZ0IDwgaGFsZlRvb2x0aXBXaWR0aCB8fFxuICAgICAgd2luV2lkdGggLSBvZmZzZXRMZWZ0IDwgaGFsZlRvb2x0aXBXaWR0aFxuICAgICkge1xuICAgICAgX3JlbW92ZUVudHJ5KHBvc3NpYmxlQWxpZ25tZW50cywgJy1taWRkbGUtYWxpZ25lZCcpO1xuICAgIH1cblxuICAgIC8vIHZhbGlkIHJpZ2h0IG11c3QgYmUgYXQgbGVhc3QgYSB0b29sdGlwV2lkdGhcbiAgICAvLyB3aWR0aCBhd2F5IGZyb20gbGVmdCBzaWRlXG4gICAgaWYgKG9mZnNldExlZnQgPCB0b29sdGlwV2lkdGgpIHtcbiAgICAgIF9yZW1vdmVFbnRyeShwb3NzaWJsZUFsaWdubWVudHMsICctcmlnaHQtYWxpZ25lZCcpO1xuICAgIH1cblxuICAgIGlmIChwb3NzaWJsZUFsaWdubWVudHMubGVuZ3RoKSB7XG4gICAgICBpZiAocG9zc2libGVBbGlnbm1lbnRzLmluZGV4T2YoZGVzaXJlZEFsaWdubWVudCkgIT09IC0xKSB7XG4gICAgICAgIC8vIHRoZSBkZXNpcmVkIGFsaWdubWVudCBpcyB2YWxpZFxuICAgICAgICBjYWxjdWxhdGVkQWxpZ25tZW50ID0gZGVzaXJlZEFsaWdubWVudDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHBpY2sgdGhlIGZpcnN0IHZhbGlkIHBvc2l0aW9uLCBpbiBvcmRlclxuICAgICAgICBjYWxjdWxhdGVkQWxpZ25tZW50ID0gcG9zc2libGVBbGlnbm1lbnRzWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBpZiBzY3JlZW4gd2lkdGggaXMgdG9vIHNtYWxsXG4gICAgICAvLyBmb3IgQU5ZIGFsaWdubWVudCwgbWlkZGxlIGlzXG4gICAgICAvLyBwcm9iYWJseSB0aGUgYmVzdCBmb3IgdmlzaWJpbGl0eVxuICAgICAgY2FsY3VsYXRlZEFsaWdubWVudCA9ICctbWlkZGxlLWFsaWduZWQnO1xuICAgIH1cblxuICAgIHJldHVybiBjYWxjdWxhdGVkQWxpZ25tZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhbiBlbnRyeSBmcm9tIGEgc3RyaW5nIGFycmF5IGlmIGl0J3MgdGhlcmUsIGRvZXMgbm90aGluZyBpZiBpdCBpc24ndCB0aGVyZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gc3RyaW5nQXJyYXlcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1RvUmVtb3ZlXG4gICAqL1xuICBmdW5jdGlvbiBfcmVtb3ZlRW50cnkoc3RyaW5nQXJyYXksIHN0cmluZ1RvUmVtb3ZlKSB7XG4gICAgaWYgKHN0cmluZ0FycmF5LmluZGV4T2Yoc3RyaW5nVG9SZW1vdmUpID4gLTEpIHtcbiAgICAgIHN0cmluZ0FycmF5LnNwbGljZShzdHJpbmdBcnJheS5pbmRleE9mKHN0cmluZ1RvUmVtb3ZlKSwgMSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgcG9zaXRpb24gb2YgdGhlIGhlbHBlciBsYXllciBvbiB0aGUgc2NyZWVuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9zZXRIZWxwZXJMYXllclBvc2l0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBoZWxwZXJMYXllclxuICAgKi9cbiAgZnVuY3Rpb24gX3NldEhlbHBlckxheWVyUG9zaXRpb24oaGVscGVyTGF5ZXIpIHtcbiAgICBpZiAoaGVscGVyTGF5ZXIpIHtcbiAgICAgIC8vcHJldmVudCBlcnJvciB3aGVuIGB0aGlzLl9jdXJyZW50U3RlcGAgaW4gdW5kZWZpbmVkXG4gICAgICBpZiAoIXRoaXMuX2ludHJvSXRlbXNbdGhpcy5fY3VycmVudFN0ZXBdKSByZXR1cm47XG5cbiAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9IHRoaXMuX2ludHJvSXRlbXNbdGhpcy5fY3VycmVudFN0ZXBdLFxuICAgICAgICBlbGVtZW50UG9zaXRpb24gPSBfZ2V0T2Zmc2V0KGN1cnJlbnRFbGVtZW50LmVsZW1lbnQpLFxuICAgICAgICB3aWR0aEhlaWdodFBhZGRpbmcgPSB0aGlzLl9vcHRpb25zLmhlbHBlckVsZW1lbnRQYWRkaW5nO1xuXG4gICAgICAvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgZml4ZWQsIHRoZSB0b29sdGlwIHNob3VsZCBiZSBmaXhlZCBhcyB3ZWxsLlxuICAgICAgLy8gT3RoZXJ3aXNlLCByZW1vdmUgYSBmaXhlZCBjbGFzcyB0aGF0IG1heSBiZSBsZWZ0IG92ZXIgZnJvbSB0aGUgcHJldmlvdXNcbiAgICAgIC8vIHN0ZXAuXG4gICAgICBpZiAoX2lzRml4ZWQoY3VycmVudEVsZW1lbnQuZWxlbWVudCkpIHtcbiAgICAgICAgX2FkZENsYXNzKGhlbHBlckxheWVyLCAnaW50cm9qcy1maXhlZFRvb2x0aXAnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9yZW1vdmVDbGFzcyhoZWxwZXJMYXllciwgJ2ludHJvanMtZml4ZWRUb29sdGlwJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50RWxlbWVudC5wb3NpdGlvbiA9PT0gJ2Zsb2F0aW5nJykge1xuICAgICAgICB3aWR0aEhlaWdodFBhZGRpbmcgPSAwO1xuICAgICAgfVxuXG4gICAgICAvL3NldCBuZXcgcG9zaXRpb24gdG8gaGVscGVyIGxheWVyXG4gICAgICBoZWxwZXJMYXllci5zdHlsZS5jc3NUZXh0ID1cbiAgICAgICAgJ3dpZHRoOiAnICtcbiAgICAgICAgKGVsZW1lbnRQb3NpdGlvbi53aWR0aCArIHdpZHRoSGVpZ2h0UGFkZGluZykgK1xuICAgICAgICAncHg7ICcgK1xuICAgICAgICAnaGVpZ2h0OicgK1xuICAgICAgICAoZWxlbWVudFBvc2l0aW9uLmhlaWdodCArIHdpZHRoSGVpZ2h0UGFkZGluZykgK1xuICAgICAgICAncHg7ICcgK1xuICAgICAgICAndG9wOicgK1xuICAgICAgICAoZWxlbWVudFBvc2l0aW9uLnRvcCAtIHdpZHRoSGVpZ2h0UGFkZGluZyAvIDIpICtcbiAgICAgICAgJ3B4OycgK1xuICAgICAgICAnbGVmdDogJyArXG4gICAgICAgIChlbGVtZW50UG9zaXRpb24ubGVmdCAtIHdpZHRoSGVpZ2h0UGFkZGluZyAvIDIpICtcbiAgICAgICAgJ3B4Oyc7XG5cbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgX3NldENsaXBQYXRoT2ZIZWxwZXIuY2FsbCh0aGlzLCBoZWxwZXJMYXllcik7XG4gICAgICB9LCAzNSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBkaXNhYmxlaW50ZXJhY3Rpb24gbGF5ZXIgYW5kIGFkanVzdCB0aGUgc2l6ZSBhbmQgcG9zaXRpb24gb2YgdGhlIGxheWVyXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9kaXNhYmxlSW50ZXJhY3Rpb25cbiAgICovXG4gIGZ1bmN0aW9uIF9kaXNhYmxlSW50ZXJhY3Rpb24oKSB7XG4gICAgdmFyIGRpc2FibGVJbnRlcmFjdGlvbkxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICcuaW50cm9qcy1kaXNhYmxlSW50ZXJhY3Rpb24nXG4gICAgKTtcblxuICAgIGlmIChkaXNhYmxlSW50ZXJhY3Rpb25MYXllciA9PT0gbnVsbCkge1xuICAgICAgZGlzYWJsZUludGVyYWN0aW9uTGF5ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpc2FibGVJbnRlcmFjdGlvbkxheWVyLmNsYXNzTmFtZSA9ICdpbnRyb2pzLWRpc2FibGVJbnRlcmFjdGlvbic7XG4gICAgICB0aGlzLl90YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGRpc2FibGVJbnRlcmFjdGlvbkxheWVyKTtcbiAgICB9XG5cbiAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKHRoaXMsIGRpc2FibGVJbnRlcmFjdGlvbkxheWVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR0aW5nIGFuY2hvcnMgdG8gYmVoYXZlIGxpa2UgYnV0dG9uc1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfc2V0QW5jaG9yQXNCdXR0b25cbiAgICovXG4gIGZ1bmN0aW9uIF9zZXRBbmNob3JBc0J1dHRvbihhbmNob3IpIHtcbiAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xuICAgIGFuY2hvci50YWJJbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2dldERpbWVuc2lvbnNcbiAgICovXG4gIGZ1bmN0aW9uIF9nZXREaW1lbnNpb25zKGhlbHBlcikge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogaGVscGVyLm9mZnNldFdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWxwZXIub2Zmc2V0SGVpZ2h0LFxuICAgICAgbGVmdDogaGVscGVyLm9mZnNldExlZnQsXG4gICAgICB0b3A6IGhlbHBlci5vZmZzZXRUb3BcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9zZXRDbGlwUGF0aE9mSGVscGVyXG4gICAqL1xuICBmdW5jdGlvbiBfc2V0Q2xpcFBhdGhPZkhlbHBlcihoZWxwZXJMYXllcikge1xuICAgIC8vINC60L7RgdGC0YvQu9GMIGNvbnN0IHN0ZXAgPSB0aGlzLl9pbnRyb0l0ZW1zW3RoaXMuX2N1cnJlbnRTdGVwXTtcbiAgICBjb25zdCBzdGVwID0gdGhpcy5faW50cm9JdGVtc1swXTtcbiAgICBcbiAgICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvanMtb3ZlcmxheScpO1xuICAgIGlmIChzdGVwLmZpeGVkKSB7XG4gICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcCB9ID0gX2dldERpbWVuc2lvbnMuY2FsbChcbiAgICAgICAgdGhpcyxcbiAgICAgICAgaGVscGVyTGF5ZXJcbiAgICAgICk7XG4gICAgICBjb25zdCBjb29yZHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB4OiAnMCUnLFxuICAgICAgICAgIHk6ICcwJSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcwJScsXG4gICAgICAgICAgeTogJzEwMCUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBsZWZ0ICsgJ3B4JyxcbiAgICAgICAgICB5OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6IGxlZnQgKyAncHgnLFxuICAgICAgICAgIHk6IHRvcCArICdweCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6IGxlZnQgKyB3aWR0aCArICdweCcsXG4gICAgICAgICAgeTogdG9wICsgJ3B4J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgeDogbGVmdCArIHdpZHRoICsgJ3B4JyxcbiAgICAgICAgICB5OiB0b3AgKyBoZWlnaHQgKyAncHgnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBsZWZ0ICsgJ3B4JyxcbiAgICAgICAgICB5OiB0b3AgKyBoZWlnaHQgKyAncHgnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB4OiBsZWZ0ICsgJ3B4JyxcbiAgICAgICAgICB5OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcxMDAlJyxcbiAgICAgICAgICB5OiAnMTAwJSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6ICcxMDAlJyxcbiAgICAgICAgICB5OiAnMCUnXG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIGlmIChvdmVybGF5KSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuY2xpcFBhdGggPSBgcG9seWdvbigke2Nvb3Jkc1xuICAgICAgICAgIC5tYXAoKHsgeCwgeSB9KSA9PiB4ICsgJyAnICsgeSlcbiAgICAgICAgICAuam9pbignLCAnKX0pYDtcbiAgICAgIH1cblxuICAgICAgaGVscGVyTGF5ZXIuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdmVybGF5LnN0eWxlLmNsaXBQYXRoID0gJyc7XG4gICAgICBoZWxwZXJMYXllci5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTaG93IGFuIGVsZW1lbnQgb24gdGhlIHBhZ2VcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX3Nob3dFbGVtZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRFbGVtZW50XG4gICAqL1xuICBmdW5jdGlvbiBfc2hvd0VsZW1lbnQodGFyZ2V0RWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5faW50cm9DaGFuZ2VDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuX2ludHJvQ2hhbmdlQ2FsbGJhY2suY2FsbCh0aGlzLCB0YXJnZXRFbGVtZW50LmVsZW1lbnQpO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIG9sZEhlbHBlckxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmludHJvanMtaGVscGVyTGF5ZXInKSxcbiAgICAgIG9sZFJlZmVyZW5jZUxheWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgJy5pbnRyb2pzLXRvb2x0aXBSZWZlcmVuY2VMYXllcidcbiAgICAgICksXG4gICAgICBoaWdobGlnaHRDbGFzcyA9ICdpbnRyb2pzLWhlbHBlckxheWVyJyxcbiAgICAgIHNjcm9sbFBhcmVudDtcblxuICAgIC8vY2hlY2sgZm9yIGEgY3VycmVudCBzdGVwIGhpZ2hsaWdodCBjbGFzc1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0RWxlbWVudC5oaWdobGlnaHRDbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGhpZ2hsaWdodENsYXNzICs9ICcgJyArIHRhcmdldEVsZW1lbnQuaGlnaGxpZ2h0Q2xhc3M7XG4gICAgfVxuICAgIC8vY2hlY2sgZm9yIG9wdGlvbnMgaGlnaGxpZ2h0IGNsYXNzXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9vcHRpb25zLmhpZ2hsaWdodENsYXNzID09PSAnc3RyaW5nJykge1xuICAgICAgaGlnaGxpZ2h0Q2xhc3MgKz0gJyAnICsgdGhpcy5fb3B0aW9ucy5oaWdobGlnaHRDbGFzcztcbiAgICB9XG5cbiAgICBpZiAob2xkSGVscGVyTGF5ZXIgIT09IG51bGwpIHtcbiAgICAgIFxuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudFxuICAgICAgc2Nyb2xsUGFyZW50ID0gX2dldFNjcm9sbFBhcmVudCh0YXJnZXRFbGVtZW50LmVsZW1lbnQpO1xuXG4gICAgICBpZiAoc2Nyb2xsUGFyZW50ICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIC8vIHRhcmdldCBpcyB3aXRoaW4gYSBzY3JvbGxhYmxlIGVsZW1lbnRcbiAgICAgICAgX3Njcm9sbFBhcmVudFRvRWxlbWVudChzY3JvbGxQYXJlbnQsIHRhcmdldEVsZW1lbnQuZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIC8vIHNldCBuZXcgcG9zaXRpb24gdG8gaGVscGVyIGxheWVyXG4gICAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKHNlbGYsIG9sZEhlbHBlckxheWVyKTtcbiAgICAgIF9zZXRIZWxwZXJMYXllclBvc2l0aW9uLmNhbGwoc2VsZiwgb2xkUmVmZXJlbmNlTGF5ZXIpO1xuXG4gICAgICAvL3JlbW92ZSBgaW50cm9qcy1maXhQYXJlbnRgIGNsYXNzIGZyb20gdGhlIGVsZW1lbnRzXG4gICAgICB2YXIgZml4UGFyZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnRyb2pzLWZpeFBhcmVudCcpO1xuICAgICAgX2ZvckVhY2goZml4UGFyZW50cywgZnVuY3Rpb24ocGFyZW50KSB7XG4gICAgICAgIF9yZW1vdmVDbGFzcyhwYXJlbnQsIC9pbnRyb2pzLWZpeFBhcmVudC9nKTtcbiAgICAgIH0pO1xuXG4gICAgICAvL3JlbW92ZSBvbGQgY2xhc3NlcyBpZiB0aGUgZWxlbWVudCBzdGlsbCBleGlzdFxuICAgICAgX3JlbW92ZVNob3dFbGVtZW50KCk7XG5cbiAgICAgIC8vd2Ugc2hvdWxkIHdhaXQgdW50aWwgdGhlIENTUzMgdHJhbnNpdGlvbiBpcyBjb21wZXRlZCAoaXQncyAwLjMgc2VjKSB0byBwcmV2ZW50IGluY29ycmVjdCBgaGVpZ2h0YCBhbmQgYHdpZHRoYCBjYWxjdWxhdGlvblxuICAgICAgaWYgKHNlbGYuX2xhc3RTaG93RWxlbWVudFRpbWVyKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc2VsZi5fbGFzdFNob3dFbGVtZW50VGltZXIpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLl9sYXN0U2hvd0VsZW1lbnRUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjaGFuZ2UgdGhlIHNjcm9sbCBvZiB0aGUgd2luZG93LCBpZiBuZWVkZWRcbiAgICAgICAgX3Njcm9sbFRvLmNhbGwoc2VsZiwgdGFyZ2V0RWxlbWVudC5zY3JvbGxUbywgdGFyZ2V0RWxlbWVudCk7XG4gICAgICB9LCAzNTApO1xuXG4gICAgICAvLyBlbmQgb2Ygb2xkIGVsZW1lbnQgaWYtZWxzZSBjb25kaXRpb25cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGhlbHBlckxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICAgIHJlZmVyZW5jZUxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIGhlbHBlckxheWVyLmNsYXNzTmFtZSA9IGhpZ2hsaWdodENsYXNzO1xuICAgICAgcmVmZXJlbmNlTGF5ZXIuY2xhc3NOYW1lID0gJ2ludHJvanMtdG9vbHRpcFJlZmVyZW5jZUxheWVyJztcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnRcbiAgICAgIHNjcm9sbFBhcmVudCA9IF9nZXRTY3JvbGxQYXJlbnQodGFyZ2V0RWxlbWVudC5lbGVtZW50KTtcblxuICAgICAgaWYgKHNjcm9sbFBhcmVudCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgICAvLyB0YXJnZXQgaXMgd2l0aGluIGEgc2Nyb2xsYWJsZSBlbGVtZW50XG4gICAgICAgIF9zY3JvbGxQYXJlbnRUb0VsZW1lbnQoc2Nyb2xsUGFyZW50LCB0YXJnZXRFbGVtZW50LmVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICAvL3NldCBuZXcgcG9zaXRpb24gdG8gaGVscGVyIGxheWVyXG4gICAgICBfc2V0SGVscGVyTGF5ZXJQb3NpdGlvbi5jYWxsKHNlbGYsIGhlbHBlckxheWVyKTtcbiAgICAgIF9zZXRIZWxwZXJMYXllclBvc2l0aW9uLmNhbGwoc2VsZiwgcmVmZXJlbmNlTGF5ZXIpO1xuXG4gICAgICAvL2FkZCBoZWxwZXIgbGF5ZXIgdG8gdGFyZ2V0IGVsZW1lbnRcbiAgICAgIHRoaXMuX3RhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVscGVyTGF5ZXIpO1xuICAgICAgdGhpcy5fdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChyZWZlcmVuY2VMYXllcik7XG4gXG4gICAgICAvLyBjaGFuZ2UgdGhlIHNjcm9sbCBvZiB0aGUgd2luZG93LCBpZiBuZWVkZWRcbiAgICAgIF9zY3JvbGxUby5jYWxsKHRoaXMsIHRhcmdldEVsZW1lbnQuc2Nyb2xsVG8sIHRhcmdldEVsZW1lbnQpO1xuXG4gICAgICAvL2VuZCBvZiBuZXcgZWxlbWVudCBpZi1lbHNlIGNvbmRpdGlvblxuICAgIH1cblxuICAgIC8vIHJlbW92aW5nIHByZXZpb3VzIGRpc2FibGUgaW50ZXJhY3Rpb24gbGF5ZXJcbiAgICB2YXIgZGlzYWJsZUludGVyYWN0aW9uTGF5ZXIgPSBzZWxmLl90YXJnZXRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmludHJvanMtZGlzYWJsZUludGVyYWN0aW9uJ1xuICAgICk7XG4gICAgaWYgKGRpc2FibGVJbnRlcmFjdGlvbkxheWVyKSB7XG4gICAgICBkaXNhYmxlSW50ZXJhY3Rpb25MYXllci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRpc2FibGVJbnRlcmFjdGlvbkxheWVyKTtcbiAgICB9XG5cbiAgICAvL2Rpc2FibGUgaW50ZXJhY3Rpb25cbiAgICBpZiAodGFyZ2V0RWxlbWVudC5kaXNhYmxlSW50ZXJhY3Rpb24pIHtcbiAgICAgIF9kaXNhYmxlSW50ZXJhY3Rpb24uY2FsbChzZWxmKTtcbiAgICB9XG5cbiAgICBfc2V0U2hvd0VsZW1lbnQodGFyZ2V0RWxlbWVudCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuX2ludHJvQWZ0ZXJDaGFuZ2VDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuX2ludHJvQWZ0ZXJDaGFuZ2VDYWxsYmFjay5jYWxsKHRoaXMsIHRhcmdldEVsZW1lbnQuZWxlbWVudCk7XG4gICAgfVxuICAgIFxuICB9XG5cbiAgLyoqXG4gICAqIFRvIGNoYW5nZSB0aGUgc2Nyb2xsIG9mIGB3aW5kb3dgIGFmdGVyIGhpZ2hsaWdodGluZyBhbiBlbGVtZW50XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9zY3JvbGxUb1xuICAgKiBAcGFyYW0ge1N0cmluZ30gc2Nyb2xsVG9cbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldEVsZW1lbnRcbiAgICovXG4gIGZ1bmN0aW9uIF9zY3JvbGxUbyhzY3JvbGxUbywgdGFyZ2V0RWxlbWVudCkge1xuICAgIGlmIChzY3JvbGxUbyA9PT0gJ29mZicpIHJldHVybjtcbiAgICB2YXIgcmVjdDtcblxuICAgIGlmICghdGhpcy5fb3B0aW9ucy5zY3JvbGxUb0VsZW1lbnQpIHJldHVybjtcblxuICAgIHJlY3QgPSB0YXJnZXRFbGVtZW50LmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZiAoIV9lbGVtZW50SW5WaWV3cG9ydCh0YXJnZXRFbGVtZW50LmVsZW1lbnQpKSB7XG4gICAgICB2YXIgd2luSGVpZ2h0ID0gX2dldFdpblNpemUoKS5oZWlnaHQ7XG4gICAgICB2YXIgdG9wID0gcmVjdC5ib3R0b20gLSAocmVjdC5ib3R0b20gLSByZWN0LnRvcCk7XG5cbiAgICAgIC8vIFRPRE8gKGFmc2hpbm0pOiBkbyB3ZSBuZWVkIHNjcm9sbCBwYWRkaW5nIG5vdz9cbiAgICAgIC8vIEkgaGF2ZSBjaGFuZ2VkIHRoZSBzY3JvbGwgb3B0aW9uIGFuZCBub3cgaXQgc2Nyb2xscyB0aGUgd2luZG93IHRvXG4gICAgICAvLyB0aGUgY2VudGVyIG9mIHRoZSB0YXJnZXQgZWxlbWVudCBvciB0b29sdGlwLlxuXG4gICAgICBpZiAodG9wIDwgMCB8fCB0YXJnZXRFbGVtZW50LmVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gd2luSGVpZ2h0KSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxCeShcbiAgICAgICAgICAwLFxuICAgICAgICAgIHJlY3QudG9wIC1cbiAgICAgICAgICAgICh3aW5IZWlnaHQgLyAyIC0gcmVjdC5oZWlnaHQgLyAyKSAtXG4gICAgICAgICAgICB0aGlzLl9vcHRpb25zLnNjcm9sbFBhZGRpbmdcbiAgICAgICAgKTsgLy8gMzBweCBwYWRkaW5nIGZyb20gZWRnZSB0byBsb29rIG5pY2VcblxuICAgICAgICAvL1Njcm9sbCBkb3duXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsQnkoXG4gICAgICAgICAgMCxcbiAgICAgICAgICByZWN0LnRvcCAtXG4gICAgICAgICAgICAod2luSGVpZ2h0IC8gMiAtIHJlY3QuaGVpZ2h0IC8gMikgK1xuICAgICAgICAgICAgdGhpcy5fb3B0aW9ucy5zY3JvbGxQYWRkaW5nXG4gICAgICAgICk7IC8vIDMwcHggcGFkZGluZyBmcm9tIGVkZ2UgdG8gbG9vayBuaWNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRvIHJlbW92ZSBhbGwgc2hvdyBlbGVtZW50KHMpXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9yZW1vdmVTaG93RWxlbWVudFxuICAgKi9cbiAgZnVuY3Rpb24gX3JlbW92ZVNob3dFbGVtZW50KCkge1xuICAgIHZhciBlbG1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmludHJvanMtc2hvd0VsZW1lbnQnKTtcblxuICAgIF9mb3JFYWNoKGVsbXMsIGZ1bmN0aW9uKGVsbSkge1xuICAgICAgX3JlbW92ZUNsYXNzKGVsbSwgL2ludHJvanMtW2EtekEtWl0rL2cpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvIHNldCB0aGUgc2hvdyBlbGVtZW50XG4gICAqIFRoaXMgZnVuY3Rpb24gc2V0IGEgcmVsYXRpdmUgKGluIG1vc3QgY2FzZXMpIHBvc2l0aW9uIGFuZCBjaGFuZ2VzIHRoZSB6LWluZGV4XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9zZXRTaG93RWxlbWVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0RWxlbWVudFxuICAgKi9cbiAgZnVuY3Rpb24gX3NldFNob3dFbGVtZW50KHRhcmdldEVsZW1lbnQpIHtcbiAgICB2YXIgcGFyZW50RWxtO1xuICAgIC8vIHdlIG5lZWQgdG8gYWRkIHRoaXMgc2hvdyBlbGVtZW50IGNsYXNzIHRvIHRoZSBwYXJlbnQgb2YgU1ZHIGVsZW1lbnRzXG4gICAgLy8gYmVjYXVzZSB0aGUgU1ZHIGVsZW1lbnRzIGNhbid0IGhhdmUgaW5kZXBlbmRlbnQgei1pbmRleFxuICAgIGlmICh0YXJnZXRFbGVtZW50LmVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICBwYXJlbnRFbG0gPSB0YXJnZXRFbGVtZW50LmVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgICAgd2hpbGUgKHRhcmdldEVsZW1lbnQuZWxlbWVudC5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAgIGlmICghcGFyZW50RWxtLnRhZ05hbWUgfHwgcGFyZW50RWxtLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2JvZHknKVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGlmIChwYXJlbnRFbG0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc3ZnJykge1xuICAgICAgICAgIF9hZGRDbGFzcyhwYXJlbnRFbG0sICdpbnRyb2pzLXNob3dFbGVtZW50IGludHJvanMtcmVsYXRpdmVQb3NpdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50RWxtID0gcGFyZW50RWxtLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgX2FkZENsYXNzKHRhcmdldEVsZW1lbnQuZWxlbWVudCwgJ2ludHJvanMtc2hvd0VsZW1lbnQnKTtcblxuICAgIHZhciBjdXJyZW50RWxlbWVudFBvc2l0aW9uID0gX2dldFByb3BWYWx1ZShcbiAgICAgIHRhcmdldEVsZW1lbnQuZWxlbWVudCxcbiAgICAgICdwb3NpdGlvbidcbiAgICApO1xuICAgIGlmIChcbiAgICAgIGN1cnJlbnRFbGVtZW50UG9zaXRpb24gIT09ICdhYnNvbHV0ZScgJiZcbiAgICAgIGN1cnJlbnRFbGVtZW50UG9zaXRpb24gIT09ICdyZWxhdGl2ZScgJiZcbiAgICAgIGN1cnJlbnRFbGVtZW50UG9zaXRpb24gIT09ICdmaXhlZCdcbiAgICApIHtcbiAgICAgIC8vY2hhbmdlIHRvIG5ldyBpbnRybyBpdGVtXG4gICAgICBfYWRkQ2xhc3ModGFyZ2V0RWxlbWVudC5lbGVtZW50LCAnaW50cm9qcy1yZWxhdGl2ZVBvc2l0aW9uJyk7XG4gICAgfVxuXG4gICAgcGFyZW50RWxtID0gdGFyZ2V0RWxlbWVudC5lbGVtZW50LnBhcmVudE5vZGU7XG4gICAgd2hpbGUgKHBhcmVudEVsbSAhPT0gbnVsbCkge1xuICAgICAgaWYgKCFwYXJlbnRFbG0udGFnTmFtZSB8fCBwYXJlbnRFbG0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYm9keScpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvL2ZpeCBUaGUgU3RhY2tpbmcgQ29udGV4dCBwcm9ibGVtLlxuICAgICAgLy9Nb3JlIGRldGFpbDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvR3VpZGUvQ1NTL1VuZGVyc3RhbmRpbmdfel9pbmRleC9UaGVfc3RhY2tpbmdfY29udGV4dFxuICAgICAgdmFyIHpJbmRleCA9IF9nZXRQcm9wVmFsdWUocGFyZW50RWxtLCAnei1pbmRleCcpO1xuICAgICAgdmFyIG9wYWNpdHkgPSBwYXJzZUZsb2F0KF9nZXRQcm9wVmFsdWUocGFyZW50RWxtLCAnb3BhY2l0eScpKTtcbiAgICAgIHZhciB0cmFuc2Zvcm0gPVxuICAgICAgICBfZ2V0UHJvcFZhbHVlKHBhcmVudEVsbSwgJ3RyYW5zZm9ybScpIHx8XG4gICAgICAgIF9nZXRQcm9wVmFsdWUocGFyZW50RWxtLCAnLXdlYmtpdC10cmFuc2Zvcm0nKSB8fFxuICAgICAgICBfZ2V0UHJvcFZhbHVlKHBhcmVudEVsbSwgJy1tb3otdHJhbnNmb3JtJykgfHxcbiAgICAgICAgX2dldFByb3BWYWx1ZShwYXJlbnRFbG0sICctbXMtdHJhbnNmb3JtJykgfHxcbiAgICAgICAgX2dldFByb3BWYWx1ZShwYXJlbnRFbG0sICctby10cmFuc2Zvcm0nKTtcbiAgICAgIGlmIChcbiAgICAgICAgL1swLTldKy8udGVzdCh6SW5kZXgpIHx8XG4gICAgICAgIG9wYWNpdHkgPCAxIHx8XG4gICAgICAgICh0cmFuc2Zvcm0gIT09ICdub25lJyAmJiB0cmFuc2Zvcm0gIT09IHVuZGVmaW5lZClcbiAgICAgICkge1xuICAgICAgICBfYWRkQ2xhc3MocGFyZW50RWxtLCAnaW50cm9qcy1maXhQYXJlbnQnKTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50RWxtID0gcGFyZW50RWxtLnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIGFycmF5c1xuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm9yRWFjaEZuY1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZUZuY1xuICAgKiBAcmV0dXJuIHtOdWxsfVxuICAgKi9cbiAgZnVuY3Rpb24gX2ZvckVhY2goYXJyLCBmb3JFYWNoRm5jLCBjb21wbGV0ZUZuYykge1xuICAgIC8vIGluIGNhc2UgYXJyIGlzIGFuIGVtcHR5IHF1ZXJ5IHNlbGVjdG9yIG5vZGUgbGlzdFxuICAgIGlmIChhcnIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZm9yRWFjaEZuYyhhcnJbaV0sIGkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29tcGxldGVGbmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbXBsZXRlRm5jKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsgYW55IG9iamVjdCB3aXRoIGFuIGluY3JlbWVudGluZyBudW1iZXJcbiAgICogdXNlZCBmb3Iga2VlcGluZyB0cmFjayBvZiBvYmplY3RzXG4gICAqXG4gICAqIEBwYXJhbSBPYmplY3Qgb2JqICAgQW55IG9iamVjdCBvciBET00gRWxlbWVudFxuICAgKiBAcGFyYW0gU3RyaW5nIGtleVxuICAgKiBAcmV0dXJuIE9iamVjdFxuICAgKi9cbiAgdmFyIF9zdGFtcCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5cyA9IHt9O1xuICAgIHJldHVybiBmdW5jdGlvbiBzdGFtcChvYmosIGtleSkge1xuICAgICAgLy8gZ2V0IGdyb3VwIGtleVxuICAgICAga2V5ID0ga2V5IHx8ICdpbnRyb2pzLXN0YW1wJztcblxuICAgICAgLy8gZWFjaCBncm91cCBpbmNyZW1lbnRzIGZyb20gMFxuICAgICAga2V5c1trZXldID0ga2V5c1trZXldIHx8IDA7XG5cbiAgICAgIC8vIHN0YW1wIG9ubHkgb25jZSBwZXIgb2JqZWN0XG4gICAgICBpZiAob2JqW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBpbmNyZW1lbnQga2V5IGZvciBlYWNoIG5ldyBvYmplY3RcbiAgICAgICAgb2JqW2tleV0gPSBrZXlzW2tleV0rKztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH0pKCk7XG5cbiAgLyoqXG4gICAqIERPTUV2ZW50IEhhbmRsZXMgYWxsIERPTSBldmVudHNcbiAgICpcbiAgICogbWV0aG9kczpcbiAgICpcbiAgICogb24gLSBhZGQgZXZlbnQgaGFuZGxlclxuICAgKiBvZmYgLSByZW1vdmUgZXZlbnRcbiAgICovXG4gIHZhciBET01FdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBET01FdmVudCgpIHtcbiAgICAgIHZhciBldmVudHNfa2V5ID0gJ2ludHJvanNfZXZlbnQnO1xuXG4gICAgICAvKipcbiAgICAgICAqIEdldHMgYSB1bmlxdWUgSUQgZm9yIGFuIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIE9iamVjdCBvYmpcbiAgICAgICAqIEBwYXJhbSBTdHJpbmcgdHlwZSAgICAgICAgZXZlbnQgdHlwZVxuICAgICAgICogQHBhcmFtIEZ1bmN0aW9uIGxpc3RlbmVyXG4gICAgICAgKiBAcGFyYW0gT2JqZWN0IGNvbnRleHRcbiAgICAgICAqIEByZXR1cm4gU3RyaW5nXG4gICAgICAgKi9cbiAgICAgIHRoaXMuX2lkID0gZnVuY3Rpb24ob2JqLCB0eXBlLCBsaXN0ZW5lciwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdHlwZSArIF9zdGFtcChsaXN0ZW5lcikgKyAoY29udGV4dCA/ICdfJyArIF9zdGFtcChjb250ZXh0KSA6ICcnKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQWRkcyBldmVudCBsaXN0ZW5lclxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSBPYmplY3Qgb2JqXG4gICAgICAgKiBAcGFyYW0gU3RyaW5nIHR5cGUgICAgICAgIGV2ZW50IHR5cGVcbiAgICAgICAqIEBwYXJhbSBGdW5jdGlvbiBsaXN0ZW5lclxuICAgICAgICogQHBhcmFtIE9iamVjdCBjb250ZXh0XG4gICAgICAgKiBAcGFyYW0gQm9vbGVhbiB1c2VDYXB0dXJlXG4gICAgICAgKiBAcmV0dXJuIG51bGxcbiAgICAgICAqL1xuICAgICAgdGhpcy5vbiA9IGZ1bmN0aW9uKG9iaiwgdHlwZSwgbGlzdGVuZXIsIGNvbnRleHQsIHVzZUNhcHR1cmUpIHtcbiAgICAgICAgdmFyIGlkID0gdGhpcy5faWQuYXBwbHkodGhpcywgYXJndW1lbnRzKSxcbiAgICAgICAgICBoYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmVyLmNhbGwoY29udGV4dCB8fCBvYmosIGUgfHwgd2luZG93LmV2ZW50KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgIGlmICgnYWRkRXZlbnRMaXN0ZW5lcicgaW4gb2JqKSB7XG4gICAgICAgICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2F0dGFjaEV2ZW50JyBpbiBvYmopIHtcbiAgICAgICAgICBvYmouYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqW2V2ZW50c19rZXldID0gb2JqW2V2ZW50c19rZXldIHx8IHt9O1xuICAgICAgICBvYmpbZXZlbnRzX2tleV1baWRdID0gaGFuZGxlcjtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lclxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSBPYmplY3Qgb2JqXG4gICAgICAgKiBAcGFyYW0gU3RyaW5nIHR5cGUgICAgICAgIGV2ZW50IHR5cGVcbiAgICAgICAqIEBwYXJhbSBGdW5jdGlvbiBsaXN0ZW5lclxuICAgICAgICogQHBhcmFtIE9iamVjdCBjb250ZXh0XG4gICAgICAgKiBAcGFyYW0gQm9vbGVhbiB1c2VDYXB0dXJlXG4gICAgICAgKiBAcmV0dXJuIG51bGxcbiAgICAgICAqL1xuICAgICAgdGhpcy5vZmYgPSBmdW5jdGlvbihvYmosIHR5cGUsIGxpc3RlbmVyLCBjb250ZXh0LCB1c2VDYXB0dXJlKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXMuX2lkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksXG4gICAgICAgICAgaGFuZGxlciA9IG9ialtldmVudHNfa2V5XSAmJiBvYmpbZXZlbnRzX2tleV1baWRdO1xuXG4gICAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgncmVtb3ZlRXZlbnRMaXN0ZW5lcicgaW4gb2JqKSB7XG4gICAgICAgICAgb2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2RldGFjaEV2ZW50JyBpbiBvYmopIHtcbiAgICAgICAgICBvYmouZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2JqW2V2ZW50c19rZXldW2lkXSA9IG51bGw7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRE9NRXZlbnQoKTtcbiAgfSkoKTtcblxuICAvKipcbiAgICogQXBwZW5kIGEgY2xhc3MgdG8gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfYWRkQ2xhc3NcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzTmFtZVxuICAgKiBAcmV0dXJucyBudWxsXG4gICAqL1xuICBmdW5jdGlvbiBfYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSB7XG4gICAgICAvLyBzdmdcbiAgICAgIHZhciBwcmUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnY2xhc3MnKSB8fCAnJztcblxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgcHJlICsgJyAnICsgY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gY2hlY2sgZm9yIG1vZGVybiBjbGFzc0xpc3QgcHJvcGVydHlcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgX2ZvckVhY2goY2xhc3NlcywgZnVuY3Rpb24oY2xzKSB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICghZWxlbWVudC5jbGFzc05hbWUubWF0Y2goY2xhc3NOYW1lKSkge1xuICAgICAgICAvLyBjaGVjayBpZiBlbGVtZW50IGRvZXNuJ3QgYWxyZWFkeSBoYXZlIGNsYXNzTmFtZVxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIGNsYXNzIGZyb20gYW4gZWxlbWVudFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfcmVtb3ZlQ2xhc3NcbiAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnRcbiAgICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBjbGFzc05hbWVSZWdleCBjYW4gYmUgcmVnZXggb3Igc3RyaW5nXG4gICAqIEByZXR1cm5zIG51bGxcbiAgICovXG4gIGZ1bmN0aW9uIF9yZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWVSZWdleCkge1xuICAgIGlmIChlbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgdmFyIHByZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcbiAgICAgICAgJ2NsYXNzJyxcbiAgICAgICAgcHJlLnJlcGxhY2UoY2xhc3NOYW1lUmVnZXgsICcnKS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWVcbiAgICAgICAgLnJlcGxhY2UoY2xhc3NOYW1lUmVnZXgsICcnKVxuICAgICAgICAucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gZWxlbWVudCBDU1MgcHJvcGVydHkgb24gdGhlIHBhZ2VcbiAgICogVGhhbmtzIHRvIEphdmFTY3JpcHQgS2l0OiBodHRwOi8vd3d3LmphdmFzY3JpcHRraXQuY29tL2RodG1sdHV0b3JzL2RodG1sY2FzY2FkZTQuc2h0bWxcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqIEBtZXRob2QgX2dldFByb3BWYWx1ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAgICogQHJldHVybnMgRWxlbWVudCdzIHByb3BlcnR5IHZhbHVlXG4gICAqL1xuICBmdW5jdGlvbiBfZ2V0UHJvcFZhbHVlKGVsZW1lbnQsIHByb3BOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9ICcnO1xuICAgIGlmIChlbGVtZW50LmN1cnJlbnRTdHlsZSkge1xuICAgICAgLy9JRVxuICAgICAgcHJvcFZhbHVlID0gZWxlbWVudC5jdXJyZW50U3R5bGVbcHJvcE5hbWVdO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZGVmYXVsdFZpZXcgJiYgZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgLy9PdGhlcnNcbiAgICAgIHByb3BWYWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3XG4gICAgICAgIC5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpXG4gICAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKHByb3BOYW1lKTtcbiAgICB9XG5cbiAgICAvL1ByZXZlbnQgZXhjZXB0aW9uIGluIElFXG4gICAgaWYgKHByb3BWYWx1ZSAmJiBwcm9wVmFsdWUudG9Mb3dlckNhc2UpIHtcbiAgICAgIHJldHVybiBwcm9wVmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByb3BWYWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHRvIHNlZSBpZiB0YXJnZXQgZWxlbWVudCAob3IgcGFyZW50cykgcG9zaXRpb24gaXMgZml4ZWQgb3Igbm90XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9pc0ZpeGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50XG4gICAqIEByZXR1cm5zIEJvb2xlYW5cbiAgICovXG4gIGZ1bmN0aW9uIF9pc0ZpeGVkKGVsZW1lbnQpIHtcbiAgICB2YXIgcCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgIGlmICghcCB8fCBwLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoX2dldFByb3BWYWx1ZShlbGVtZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIF9pc0ZpeGVkKHApO1xuICB9XG5cbiAgLyoqXG4gICAqIFByb3ZpZGVzIGEgY3Jvc3MtYnJvd3NlciB3YXkgdG8gZ2V0IHRoZSBzY3JlZW4gZGltZW5zaW9uc1xuICAgKiB2aWE6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTg2NDQ2Ny9pbnRlcm5ldC1leHBsb3Jlci1pbm5lcmhlaWdodFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfZ2V0V2luU2l6ZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSB3aWR0aCBhbmQgaGVpZ2h0IGF0dHJpYnV0ZXNcbiAgICovXG4gIGZ1bmN0aW9uIF9nZXRXaW5TaXplKCkge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4geyB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBEID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgcmV0dXJuIHsgd2lkdGg6IEQuY2xpZW50V2lkdGgsIGhlaWdodDogRC5jbGllbnRIZWlnaHQgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50IGlzIGluIHRoZSB2aWV3cG9ydCBvciBub3RcbiAgICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMjM5OTkvaG93LXRvLXRlbGwtaWYtYS1kb20tZWxlbWVudC1pcy12aXNpYmxlLWluLXRoZS1jdXJyZW50LXZpZXdwb3J0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9lbGVtZW50SW5WaWV3cG9ydFxuICAgKiBAcGFyYW0ge09iamVjdH0gZWxcbiAgICovXG4gIGZ1bmN0aW9uIF9lbGVtZW50SW5WaWV3cG9ydChlbCkge1xuICAgIHZhciByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgcmVjdC50b3AgPj0gMCAmJlxuICAgICAgcmVjdC5sZWZ0ID49IDAgJiZcbiAgICAgIHJlY3QuYm90dG9tICsgODAgPD0gd2luZG93LmlubmVySGVpZ2h0ICYmIC8vIGFkZCA4MCB0byBnZXQgdGhlIHRleHQgcmlnaHRcbiAgICAgIHJlY3QucmlnaHQgPD0gd2luZG93LmlubmVyV2lkdGhcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBvdmVybGF5IGxheWVyIHRvIHRoZSBwYWdlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKiBAbWV0aG9kIF9hZGRPdmVybGF5TGF5ZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldEVsbVxuICAgKi9cbiAgZnVuY3Rpb24gX2FkZE92ZXJsYXlMYXllcih0YXJnZXRFbG0pIHtcbiAgICB2YXIgb3ZlcmxheUxheWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgICBzdHlsZVRleHQgPSAnJyxcbiAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgLy9zZXQgY3NzIGNsYXNzIG5hbWVcbiAgICBvdmVybGF5TGF5ZXIuY2xhc3NOYW1lID0gJ2ludHJvanMtb3ZlcmxheSc7XG5cbiAgICAvL2NoZWNrIGlmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBib2R5LCB3ZSBzaG91bGQgY2FsY3VsYXRlIHRoZSBzaXplIG9mIG92ZXJsYXkgbGF5ZXIgaW4gYSBiZXR0ZXIgd2F5XG4gICAgaWYgKCF0YXJnZXRFbG0udGFnTmFtZSB8fCB0YXJnZXRFbG0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYm9keScpIHtcbiAgICAgIHN0eWxlVGV4dCArPSAndG9wOiAwO2JvdHRvbTogMDsgbGVmdDogMDtyaWdodDogMDtwb3NpdGlvbjogZml4ZWQ7JztcbiAgICAgIG92ZXJsYXlMYXllci5zdHlsZS5jc3NUZXh0ID0gc3R5bGVUZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3NldCBvdmVybGF5IGxheWVyIHBvc2l0aW9uXG4gICAgICB2YXIgZWxlbWVudFBvc2l0aW9uID0gX2dldE9mZnNldCh0YXJnZXRFbG0pO1xuICAgICAgaWYgKGVsZW1lbnRQb3NpdGlvbikge1xuICAgICAgICBzdHlsZVRleHQgKz1cbiAgICAgICAgICAnd2lkdGg6ICcgK1xuICAgICAgICAgIGVsZW1lbnRQb3NpdGlvbi53aWR0aCArXG4gICAgICAgICAgJ3B4OyBoZWlnaHQ6JyArXG4gICAgICAgICAgZWxlbWVudFBvc2l0aW9uLmhlaWdodCArXG4gICAgICAgICAgJ3B4OyB0b3A6JyArXG4gICAgICAgICAgZWxlbWVudFBvc2l0aW9uLnRvcCArXG4gICAgICAgICAgJ3B4O2xlZnQ6ICcgK1xuICAgICAgICAgIGVsZW1lbnRQb3NpdGlvbi5sZWZ0ICtcbiAgICAgICAgICAncHg7JztcbiAgICAgICAgb3ZlcmxheUxheWVyLnN0eWxlLmNzc1RleHQgPSBzdHlsZVRleHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGFyZ2V0RWxtLmFwcGVuZENoaWxkKG92ZXJsYXlMYXllcik7XG5cbiAgICBvdmVybGF5TGF5ZXIub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNlbGYuX29wdGlvbnMuZXhpdE9uT3ZlcmxheUNsaWNrID09PSB0cnVlKSB7XG4gICAgICAgIF9leGl0SW50cm8uY2FsbChzZWxmLCB0YXJnZXRFbG0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIHN0eWxlVGV4dCArPSAnb3BhY2l0eTogJyArIHNlbGYuX29wdGlvbnMub3ZlcmxheU9wYWNpdHkudG9TdHJpbmcoKSArICc7JztcbiAgICAgIG92ZXJsYXlMYXllci5zdHlsZS5jc3NUZXh0ID0gc3R5bGVUZXh0O1xuICAgIH0sIDEwKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gZWxlbWVudCBwb3NpdGlvbiBvbiB0aGUgcGFnZVxuICAgKiBUaGFua3MgdG8gYG1lb3V3YDogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDQyNDc0LzM3NTk2NlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICogQG1ldGhvZCBfZ2V0T2Zmc2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50XG4gICAqIEByZXR1cm5zIEVsZW1lbnQncyBwb3NpdGlvbiBpbmZvXG4gICAqL1xuICBmdW5jdGlvbiBfZ2V0T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgdmFyIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHZhciBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIHZhciB4ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiB4LnRvcCArIHNjcm9sbFRvcCxcbiAgICAgIHdpZHRoOiB4LndpZHRoLFxuICAgICAgaGVpZ2h0OiB4LmhlaWdodCxcbiAgICAgIGxlZnQ6IHgubGVmdCArIHNjcm9sbExlZnRcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgdGhlIG5lYXJlc3Qgc2Nyb2xsYWJsZSBwYXJlbnRcbiAgICogY29waWVkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzU5Mzk4ODYvZmluZC1maXJzdC1zY3JvbGxhYmxlLXBhcmVudFxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudCBlbGVtZW50XG4gICAqIEByZXR1cm4gRWxlbWVudFxuICAgKi9cbiAgZnVuY3Rpb24gX2dldFNjcm9sbFBhcmVudChlbGVtZW50KSB7XG4gICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gICAgdmFyIGV4Y2x1ZGVTdGF0aWNQYXJlbnQgPSBzdHlsZS5wb3NpdGlvbiA9PT0gJ2Fic29sdXRlJztcbiAgICB2YXIgb3ZlcmZsb3dSZWdleCA9IC8oYXV0b3xzY3JvbGwpLztcblxuICAgIGlmIChzdHlsZS5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG5cbiAgICBmb3IgKHZhciBwYXJlbnQgPSBlbGVtZW50OyAocGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQpOyApIHtcbiAgICAgIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocGFyZW50KTtcbiAgICAgIGlmIChleGNsdWRlU3RhdGljUGFyZW50ICYmIHN0eWxlLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgb3ZlcmZsb3dSZWdleC50ZXN0KHN0eWxlLm92ZXJmbG93ICsgc3R5bGUub3ZlcmZsb3dZICsgc3R5bGUub3ZlcmZsb3dYKVxuICAgICAgKVxuICAgICAgICByZXR1cm4gcGFyZW50O1xuICAgIH1cblxuICAgIHJldHVybiBkb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgLyoqXG4gICAqIHNjcm9sbCBhIHNjcm9sbGFibGUgZWxlbWVudCB0byBhIGNoaWxkIGVsZW1lbnRcbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnQgcGFyZW50XG4gICAqIEBwYXJhbSBFbGVtZW50IGVsZW1lbnRcbiAgICogQHJldHVybiBOdWxsXG4gICAqL1xuICBmdW5jdGlvbiBfc2Nyb2xsUGFyZW50VG9FbGVtZW50KHBhcmVudCwgZWxlbWVudCkge1xuICAgIHBhcmVudC5zY3JvbGxUb3AgPSBlbGVtZW50Lm9mZnNldFRvcCAtIHBhcmVudC5vZmZzZXRUb3A7XG4gIH1cblxuICAvKipcbiAgICogT3ZlcndyaXRlcyBvYmoxJ3MgdmFsdWVzIHdpdGggb2JqMidzIGFuZCBhZGRzIG9iajIncyBpZiBub24gZXhpc3RlbnQgaW4gb2JqMVxuICAgKiB2aWE6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTcxMjUxL2hvdy1jYW4taS1tZXJnZS1wcm9wZXJ0aWVzLW9mLXR3by1qYXZhc2NyaXB0LW9iamVjdHMtZHluYW1pY2FsbHlcbiAgICpcbiAgICogQHBhcmFtIG9iajFcbiAgICogQHBhcmFtIG9iajJcbiAgICogQHJldHVybnMgb2JqMyBhIG5ldyBvYmplY3QgYmFzZWQgb24gb2JqMSBhbmQgb2JqMlxuICAgKi9cbiAgZnVuY3Rpb24gX21lcmdlT3B0aW9ucyhvYmoxLCBvYmoyKSB7XG4gICAgdmFyIG9iajMgPSB7fSxcbiAgICAgIGF0dHJuYW1lO1xuICAgIGZvciAoYXR0cm5hbWUgaW4gb2JqMSkge1xuICAgICAgb2JqM1thdHRybmFtZV0gPSBvYmoxW2F0dHJuYW1lXTtcbiAgICB9XG4gICAgZm9yIChhdHRybmFtZSBpbiBvYmoyKSB7XG4gICAgICBvYmozW2F0dHJuYW1lXSA9IG9iajJbYXR0cm5hbWVdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqMztcbiAgfVxuXG4gIHZhciBpbnRyb0pzID0gZnVuY3Rpb24odGFyZ2V0RWxtKSB7XG4gICAgdmFyIGluc3RhbmNlO1xuXG4gICAgaWYgKHR5cGVvZiB0YXJnZXRFbG0gPT09ICdvYmplY3QnKSB7XG4gICAgICAvL09rLCBjcmVhdGUgYSBuZXcgaW5zdGFuY2VcbiAgICAgIGluc3RhbmNlID0gbmV3IEludHJvSnModGFyZ2V0RWxtKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0YXJnZXRFbG0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAvL3NlbGVjdCB0aGUgdGFyZ2V0IGVsZW1lbnQgd2l0aCBxdWVyeSBzZWxlY3RvclxuICAgICAgdmFyIHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldEVsbSk7XG5cbiAgICAgIGlmICh0YXJnZXRFbGVtZW50KSB7XG4gICAgICAgIGluc3RhbmNlID0gbmV3IEludHJvSnModGFyZ2V0RWxlbWVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIGVsZW1lbnQgd2l0aCBnaXZlbiBzZWxlY3Rvci4nKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UgPSBuZXcgSW50cm9Kcyhkb2N1bWVudC5ib2R5KTtcbiAgICB9XG4gICAgLy8gYWRkIGluc3RhbmNlIHRvIGxpc3Qgb2YgX2luc3RhbmNlc1xuICAgIC8vIHBhc3NpbmcgZ3JvdXAgdG8gX3N0YW1wIHRvIGluY3JlbWVudFxuICAgIC8vIGZyb20gMCBvbndhcmQgc29tZXdoYXQgcmVsaWFibHlcbiAgICBpbnRyb0pzLmluc3RhbmNlc1tfc3RhbXAoaW5zdGFuY2UsICdpbnRyb2pzLWluc3RhbmNlJyldID0gaW5zdGFuY2U7XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgSW50cm9KcyB2ZXJzaW9uXG4gICAqXG4gICAqIEBwcm9wZXJ0eSB2ZXJzaW9uXG4gICAqIEB0eXBlIFN0cmluZ1xuICAgKi9cbiAgaW50cm9Kcy52ZXJzaW9uID0gVkVSU0lPTjtcblxuICAvKipcbiAgICoga2V5LXZhbCBvYmplY3QgaGVscGVyIGZvciBpbnRyb0pzIGluc3RhbmNlc1xuICAgKlxuICAgKiBAcHJvcGVydHkgaW5zdGFuY2VzXG4gICAqIEB0eXBlIE9iamVjdFxuICAgKi9cbiAgaW50cm9Kcy5pbnN0YW5jZXMgPSB7fTtcblxuICAvL1Byb3RvdHlwZVxuICBpbnRyb0pzLmZuID0gSW50cm9Kcy5wcm90b3R5cGUgPSB7XG4gICAgY2xvbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBJbnRyb0pzKHRoaXMpO1xuICAgIH0sXG4gICAgc2V0T3B0aW9uOiBmdW5jdGlvbihvcHRpb24sIHZhbHVlKSB7XG4gICAgICB0aGlzLl9vcHRpb25zW29wdGlvbl0gPSB2YWx1ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgc2V0T3B0aW9uczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdGhpcy5fb3B0aW9ucyA9IF9tZXJnZU9wdGlvbnModGhpcy5fb3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIHN0YXJ0OiBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgX2ludHJvRm9yRWxlbWVudC5jYWxsKHRoaXMsIHRoaXMuX3RhcmdldEVsZW1lbnQsIHNlbGVjdG9yKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZ29Ub1N0ZXA6IGZ1bmN0aW9uKHN0ZXApIHtcbiAgICAgIF9nb1RvU3RlcC5jYWxsKHRoaXMsIHN0ZXApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBhZGRTdGVwOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBpZiAoIXRoaXMuX29wdGlvbnMuc3RlcHMpIHtcbiAgICAgICAgdGhpcy5fb3B0aW9ucy5zdGVwcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9vcHRpb25zLnN0ZXBzLnB1c2gob3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIFxuICAgIGdvVG9TdGVwTnVtYmVyOiBmdW5jdGlvbihzdGVwKSB7XG4gICAgICBfZ29Ub1N0ZXBOdW1iZXIuY2FsbCh0aGlzLCBzdGVwKTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBuZXh0U3RlcDogZnVuY3Rpb24oKSB7XG4gICAgICBfbmV4dFN0ZXAuY2FsbCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgZXhpdDogZnVuY3Rpb24oZm9yY2UpIHtcbiAgICAgIF9leGl0SW50cm8uY2FsbCh0aGlzLCB0aGlzLl90YXJnZXRFbGVtZW50LCBmb3JjZSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uKCkge1xuICAgICAgX3JlZnJlc2guY2FsbCh0aGlzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgb25iZWZvcmVjaGFuZ2U6IGZ1bmN0aW9uKHByb3ZpZGVkQ2FsbGJhY2spIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdmlkZWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pbnRyb0JlZm9yZUNoYW5nZUNhbGxiYWNrID0gcHJvdmlkZWRDYWxsYmFjaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnUHJvdmlkZWQgY2FsbGJhY2sgZm9yIG9uYmVmb3JlY2hhbmdlIHdhcyBub3QgYSBmdW5jdGlvbidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgb25jaGFuZ2U6IGZ1bmN0aW9uKHByb3ZpZGVkQ2FsbGJhY2spIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdmlkZWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pbnRyb0NoYW5nZUNhbGxiYWNrID0gcHJvdmlkZWRDYWxsYmFjaztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvdmlkZWQgY2FsbGJhY2sgZm9yIG9uY2hhbmdlIHdhcyBub3QgYSBmdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgb25hZnRlcmNoYW5nZTogZnVuY3Rpb24ocHJvdmlkZWRDYWxsYmFjaykge1xuICAgICAgaWYgKHR5cGVvZiBwcm92aWRlZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2ludHJvQWZ0ZXJDaGFuZ2VDYWxsYmFjayA9IHByb3ZpZGVkQ2FsbGJhY2s7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Byb3ZpZGVkIGNhbGxiYWNrIGZvciBvbmFmdGVyY2hhbmdlIHdhcyBub3QgYSBmdW5jdGlvbidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgb25jb21wbGV0ZTogZnVuY3Rpb24ocHJvdmlkZWRDYWxsYmFjaykge1xuICAgICAgaWYgKHR5cGVvZiBwcm92aWRlZENhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX2ludHJvQ29tcGxldGVDYWxsYmFjayA9IHByb3ZpZGVkQ2FsbGJhY2s7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVkIGNhbGxiYWNrIGZvciBvbmNvbXBsZXRlIHdhcyBub3QgYSBmdW5jdGlvbi4nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICBvbmV4aXQ6IGZ1bmN0aW9uKHByb3ZpZGVkQ2FsbGJhY2spIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdmlkZWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pbnRyb0V4aXRDYWxsYmFjayA9IHByb3ZpZGVkQ2FsbGJhY2s7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb3ZpZGVkIGNhbGxiYWNrIGZvciBvbmV4aXQgd2FzIG5vdCBhIGZ1bmN0aW9uLicpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBvbmJlZm9yZWV4aXQ6IGZ1bmN0aW9uKHByb3ZpZGVkQ2FsbGJhY2spIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdmlkZWRDYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9pbnRyb0JlZm9yZUV4aXRDYWxsYmFjayA9IHByb3ZpZGVkQ2FsbGJhY2s7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Byb3ZpZGVkIGNhbGxiYWNrIGZvciBvbmJlZm9yZWV4aXQgd2FzIG5vdCBhIGZ1bmN0aW9uLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gaW50cm9Kcztcbn0pO1xuIiwiLyoqXG4gKiDQktGL0LLQvtC0INC+0YjQuNCx0L7QuiDQsiDQutC+0L3RgdC+0LvRjFxuICogQHBhcmFtIHtTdHJpbmd9IG1zZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICBjb25zb2xlLmVycm9yKG1zZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ3NzKHBhdGgpIHtcbiAgY29uc3QgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdIRUFEJylbMF07XG4gIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG5cbiAgbGluay5yZWwgPSAnc3R5bGVzaGVldCc7XG5cbiAgbGluay50eXBlID0gJ3RleHQvY3NzJztcblxuICBsaW5rLmhyZWYgPSBwYXRoO1xuICBoZWFkLmFwcGVuZENoaWxkKGxpbmspO1xufVxuY29uc3QgdXRpbHMgPSB7XG4gIHNob3dFcnJvcixcbiAgbG9hZENzc1xufTtcblxuZXhwb3J0IGRlZmF1bHQgdXRpbHM7XG4iXSwic291cmNlUm9vdCI6IiJ9