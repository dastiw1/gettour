/* eslint-disable prefer-rest-params */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* global window */
/* global document */
/* global history */

import Cookies from 'js-cookie';

import introJs from './intro-chat';
import WindowStateManager from './WindowStateManager';
import ChangesListener from './ChangesListener';
import ConditionEventsListeners from './ConditionEventsListeners';
import EventBus from './EventBus';
import { showError, loadCss, isObject, isMobileDevice } from './utils';
import widgetStyles from './functions/widgetStyles';
import DispatcherEvent from './DispatcherEvent';
const widgetTemplateLoader = require('./templates/widget.mst');

window.getTourEventBus = new EventBus();
/**
 * Warning. options - это свойсто объекта
 * @param {object} param0
 */
function setOptions({ options }) {
  if (typeof options === 'object') {
    this.__intro.setOptions(options);
  } else {
    this.__intro.setOptions(this.config);
  }
}

/* function url_domain(url) {
  let a = document.createElement('a');

  a.href = url;
  return a.hostname;
} */

function isAnyPartOfElementInViewport(el) {
  const scroll = window.scrollY || window.pageYOffset;
  const boundsTop = el.getBoundingClientRect().top + scroll;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight
  };

  const bounds = {
    top: boundsTop,
    bottom: boundsTop + el.clientHeight
  };

  return (
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom) ||
    (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
  );
}

function isInViewport(elem) {
  var bounding = elem.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isElementVisible(elem) {
  return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
}

function isMessageFromWidget(event) {
  // IMPORTANT: Check the origin of the data!
  if (
    event.origin.indexOf('https://getchat.me') > -1 ||
    event.origin.indexOf(this.options.devHost) > -1
  ) {
    // The data has been sent from your site

    // The data sent with postMessage is stored in event.data
    if (
      typeof event.data !== 'object' ||
      event.data.source !== 'getchat-widget'
    ) {
      return false;
    }

    return true;
  }

  return false;
}

const STYLEPATH = {
  development: 'http://gettour/dist/css/styles.css',
  production: 'https://cdn.jsdelivr.net/npm/gettour@0.4.7/dist/css/styles.min.css'
  /* development: 'https://cdn.jsdelivr.net/npm/gettour@0.4.6/dist/css/styles.min.css',
  production: 'https://cdn.jsdelivr.net/npm/gettour@0.4.6/dist/css/styles.min.css' */
};

/**
 * Ловушка (Proxy) для парметров свойства options.
 */
let optionsChangesHandler = {
  set(target, prop, val) {
    target[prop] = val;
    switch (prop) {
      case 'alignment':
        // eslint-disable-next-line no-use-before-define
        onboarding.changeWidgetAlignment(val);
        break;

      default:
        break;
    }
    return true;
  }
};
/**
 * Ловушка для параметров свойства states
 */
let statesChangesHandlers = {
  set(target, prop, val) {
    target[prop] = val;
    switch (prop) {
      case 'isLoading':
        // eslint-disable-next-line no-use-before-define
        onboarding.loadingStateToggle(val);
        break;

      default:
        break;
    }
    return true;
  }
};
/**
 * Основной объект Gettour
 */
const onboarding = Object.assign(
  {
    rootClass: 'getchat-widget',
    selector: '.getchat-widget__frame',
    expandClass: 'getchat-widget--expanded',
    loadingClass: 'getchat-widget--loading',
    hasMsgClass: 'getchat-widget--has-msgs',
    expandCookieKey: 'gw-state',
    active: {
      status: false,
      listenerId: null,
      condition: {
        get() {
          return this.ConditionEventsListeners.active;
        },
        set(val) {
          this.ConditionEventsListeners.active = val;
        }
      }
    },
    events: {},
    _states: new Proxy(
      {
        isLoading: false // Boolean
      },
      statesChangesHandlers
    ),
    __intro: null,
    widgetHash: null, // String
    autoShowConditions: {},
    hash: null,
    domain: null,
    block: null,
    setOptions,
    stylesLoaded: false,
    triggeredCount: 0,
    __observers: {},
    listenersList: new Map(),

    options: new Proxy(
      {
        env: 'production',
        preview: false,
        devHost: 'http://localhost',
        alignment: 'left-bottom',
        mobile: true
      },
      optionsChangesHandler
    ),
    ConditionEventsListeners: null,

    /**
     * =============================
     * METHODS
     * ===============================
     */
    /**
     *
     * @param {string} hash
     * @param {object} options
     */
    init(hash, options = {}) {
      const self = this;

      this.hash = hash;
      // this.options = Object.assign(this.options, options);
      Object.keys(options).forEach(key => {
        this.options[key] = options[key];
      });

      if (this.options.mobile === false && isMobileDevice()) {
        return false;
      }
      this.loadWidgetData().then(data => {
        if (Object.keys(data.conditions).length === 0) {
          showError('ERROR! Widget data not recieved!');
          return;
        }
        this.domain = data.domain;
        this.active.status = data.widget_active;

        // this.options = Object.assign(this.options, data.widget_options);
        if (isObject(data.widget_options)) {
          Object.keys(data.widget_options).forEach(key => {
            this.options[key] = data.widget_options[key];
          });
        }

        Object.keys(data.conditions).forEach(key => {
          data.conditions[key] = Object.assign({options: {
            alignment: this.options.alignment
          }}, data.conditions[key]);
        });
        this.autoShowConditions = data.conditions;

        if (!this.active.status && Object.keys(this.autoShowConditions).includes(this.active.condition)) {
          return;
        }
        this.__intro = introJs();
        this.ConditionEventsListeners = new ConditionEventsListeners(
          this.autoShowConditions
        );
        this.ConditionEventsListeners.watchForMatch(true);

        this.__intro.onchange(() => {
          self.__intro.refresh();
          return this;
        });
        this.__intro.onbeforechange(() => {
          if (this.__intro._introItems.length) {
            const step = this.__intro._introItems[0];

            self.setOptions(step);
          }

          //
          const closeBtn = document.querySelector(
            '.getchat-widget > .getchat-widget__btn--icon'
          );

          if (closeBtn) {
            closeBtn.style.display = 'none';
          }
        });

        this.__intro.onexit(() => {
          const closeBtn = document.querySelector(
            '.getchat-widget > .getchat-widget__btn--icon'
          );

          if (closeBtn) {
            closeBtn.style.display = 'inline-flex';
          }
        });

        if (!this.listenForMessages) {
          this.listenForMessages = function (event) {
            if (isMessageFromWidget.call(this, event)) {
              switch (event.data.action) {
                case 'HIGHLIGHT':
                  // Слушать события выделения
                  this.__listenForHighlightRequests.call(this, event);
                  break;
                case 'ACTION_CLICKED':
                  // Слушать события кнопок чата
                  this.__listenForActionClickedRequests.call(this, event);
                  break;
                case 'OBSERVE':
                  // Слушать события для Observer-а
                  this.__listenForObserveRequests.call(this, event);
                  break;
                case 'EVALUATE':
                  // Слушать события для EVALUATE для выполнения userScript
                  this.__listenForUserScriptEvaluateRequests.call(this, event);
                  break;
                case 'NEW_MESSAGE':
                  // Слушать события наличия новых сообщении
                  this.__listenForNewMessages.call(this, event);
                  break;
                case 'BOT_DATA':
                  // Слушать события подгрузки нового бота
                  this.__listenForBotInfo.call(this, event);
                  break;
                case 'DATALAYER_PUSH':
                  // Слушать события подгрузки нового бота
                  this.__listenForDataLayerPushes.call(this, event);
                  break;
              }
            }
          }.bind(this);
          window.addEventListener('message', this.listenForMessages);
        }

        // Подписка на событие "когда условия виджета выполнены"
        window.getTourEventBus.addEventListener('ConditionMatched', this.conditionMatchHandler);

        // Если не подходит под условия
        window.getTourEventBus.addEventListener('NoMatchedConditions', e => {
          this.reset();
        });

        // Слущать изменение URL
        this.listenForLocationChange();
      });

      /**
       *  Когда закрывается последняя вкладка очищать значение expand cookie
       */
      if (this.windowStateManager == null) {
        this.windowStateManager = new WindowStateManager(false, function () {});
      }

      return this;
    },

    conditionMatchHandler(e) {
      let self = window.gettour;

      if (
        e != null &&
        self.autoShowConditions[e.detail.uuid].onClick &&
        self.active.condition === e.detail.uuid &&
        self.active.condition
      ) {
        // Если нажали на элемент вызывающий данный виджет, но виджет уже подгружен
        if (self.block.classList.contains(self.expandClass)) {
          self.hideBlock();
        } else {
          self.expandBlock();
        }
      } else {
        self.loadCondition(e.detail.uuid);
      }
    },
    /**
     * Подгрузка виджета если попадает под одну из условии
     */

    loadCondition(uuid) {
      if (event != null) {
        this.active.condition = uuid;
      } else {
        this.active.condition = null;
      }

      if (this.active.condition) {
        let oldVal = Cookies.get(this.expandCookieKey);
        let asExpanded = oldVal === 'true';

        if (this.autoShowConditions[this.active.condition] == null) {
          console.error('Attempt to load incorrect action uuid: ' + uuid);
          return;
        }
        this.renderWidget(
          this.autoShowConditions[this.active.condition].link,
          asExpanded
        );

        if (!this.stylesLoaded) {
          this.loadStyles();
        }

        if (
          this.triggeredCount === 0 &&
          this.options.launchAsExpanded &&
          asExpanded
        ) {
          this.expandBlock();
        }

        this.triggeredCount += 1;
      }
    },
    listenForLocationChange() {
      /* This modifies these three functions so that all fire
    a custom locationchange event for you to use,
    and also pushstate and replacestate events if you want to use those:
    From: https://stackoverflow.com/a/52809105/3939853 */

      const evt = 'locationchange';

      history.pushState = (f =>
        function pushState() {
          const ret = f.apply(this, arguments);

          window.dispatchEvent(new Event('pushState'));
          window.dispatchEvent(new Event(evt));
          return ret;
        })(history.pushState);

      history.replaceState = (f =>
        function replaceState() {
          const ret = f.apply(this, arguments);

          window.dispatchEvent(new Event('replaceState'));
          window.dispatchEvent(new Event(evt));
          return ret;
        })(history.replaceState);

      window.addEventListener('popstate', () => {
        window.dispatchEvent(new Event(evt));
      });

      /**
       * Слушать изменение URL. watchForMatch запускает по условию loadCondition
       */
      window.addEventListener('locationchange', () => {
        clearInterval(this.ConditionEventsListeners.interval);
        this.reset();

        if (Object.keys(this.autoShowConditions).length) {
          this.ConditionEventsListeners.watchForMatch();
        }
      });
    },
    /**
     * Если приходят такие экшны, то убирать highlight
     * @param {object} e
     */
    __listenForActionClickedRequests(e) {
      const { answer_id } = e.data;
      let { steps } = this.__intro._options;

      if (
        steps &&
        steps.length &&
        steps.find(s => s.highlightEventAnswerId === answer_id)
      ) {
        this.__intro.exit(true);
        this.__intro.clearSteps();
      }
    },
    /**
     * Запустить прослушнивание событии которые выстреливают listener_id
     * @param {Object} e
     */
    __listenForObserveRequests(e) {
      let { data } = e;
      // let activeListener = this.active.listenerId;
      let id = data.answer_id;

      this.__setActiveListener(data.active_listener_id || null);

      if (!this.listenersList.has(id)) {
        let listener = new ChangesListener(data);

        listener.tourJs = this;
        listener.init();
        this.__registerListener(listener);
      }
    },
    /**
     * Запустить прослушнивание событии userScript
     * @param {Object} e
     */
    __listenForUserScriptEvaluateRequests(e) {
      let { data } = e;

      // eslint-disable-next-line no-eval
      eval(data.script);
    },
    /**
     * Добавляет экземпляр ChangesListener в список
     * @param {ChangesListener} listener
     */
    __registerListener(listener) {
      let id = listener.answer_id;

      if (!this.listenersList.has(id)) {
        this.listenersList.set(id, listener);
      }
    },

    /**
     * Если приходят такие экшны, то на основе значения value
     * говорим виджету мигать или нет.
     * @param {object} e
     */
    __listenForNewMessages(e) {
      const { value } = e.data;
      let widget = document.querySelector('.getchat-widget');

      if (value) {
        if (
          !widget.classList.contains(this.hasMsgClass) &&
          !widget.classList.contains(this.expandClass)
        ) {
          widget.classList.add(this.hasMsgClass);
        }
      } else {
        widget.classList.remove(this.hasMsgClass);
      }
    },
    /**
     * Получаем объект с данными бота
     * @param {object} e - Event
     */
    __listenForBotInfo(e) {
      let widgetAvaImg = document.querySelector(
        '.getchat-widget .getchat-widget__header-ava > img'
      );

      if (widgetAvaImg && e.data.bot.style.avatar) {
        let host;

        if (this.options.env === 'development') {
          host = this.options.devHost;
        } else {
          host = 'https://getchat.me';
        }

        let avatarSrc = `${host}${e.data.bot.style.avatar}`;

        widgetAvaImg.setAttribute('src', avatarSrc);
      }
    },
    /**
     * Запустить прослушивание закрытия выделения элемента
     * @param {Object} e
     */
    __listenForHighlightRequests(e) {
      if (e.data.selector) {
        this.highlight(e.data);
      }
    },

    __listenForDataLayerPushes(e) {
      if (e.data.payload) {
        this.dispatch('chat-event:ga', e.data.payload);
      }
    },
    /**
     *
     * @param {*} selector
     */
    __getElementForHighlight(selector) {
      const elements = document.querySelectorAll(selector);
      const elementsArray = Array.from(elements);

      const el = elementsArray.find(isAnyPartOfElementInViewport);

      if (el != null && isElementVisible(el)) {
        return el;
      }
      return null;
    },
    highlight({ selector, closeEvent, highlightEventAnswerId }) {
      let waitTime = 0.05;
      const step = {
        element: selector,
        fixed: true,
        closeEvent,
        highlightEventAnswerId
      };
      const introElement = this.__getElementForHighlight(selector);

      if (introElement == null) {
        showError(`Element doesn't exist on DOM: ${selector}`);
        return;
      }

      const isInVP = isInViewport(introElement);

      if (!isInVP) {
        introElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center'
        });
        waitTime = 1.5;
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
      this.__intro.addStep(step);

      // Listen to event
      if (closeEvent !== 'chatListenerClick') {
        introElement.addEventListener(
          closeEvent,
          () => {
            this.__intro.exit(true);
            this.__intro.clearSteps();
          },
          {
            once: true
          }
        );
      }

      // Close
      if (this.__intro._introItems.length) {
        this.__intro.goToStepNumber(0);
      }
      this.__intro.exit();

      setTimeout(() => {
        this.__intro.start(step);
      }, waitTime * 1000);
    },
    sendMessage(msg, msgType = 'trigger', exit = true) {
      if (exit) {
        this.__intro.exit();
      }

      const frame = document.querySelector(this.selector);

      if (!frame) {
        showError("Widget's iframe not found!");
        return;
      }

      frame.contentWindow.postMessage(
        Object.assign(msg, {
          source: 'get-tour-library',
          msgType
        }),
        '*'
      );
    },
    reset() {
      this.__intro._options.steps = [];
      this.__intro.refresh();
      this.destroyWidget();
      // this.triggeredCount = 0;
    },
    destroyWidget(removeOldListeners = false) {
      // window.removeEventListener('message', this.listenForMessages);
      if (this.block && this.block.parentNode) {
        this.block.parentNode.removeChild(this.block);
      }
      window.getTourEventBus.clearListeners();
      if (removeOldListeners) {
        window.getTourEventBus.removeEventListener('ConditionMatched', this.conditionMatchHandler);
      }
    },
    __getAlignmentValue() {
      let uuid = this.active.condition;

      return this.autoShowConditions[uuid].options.alignment;
    },
    /**
     *
     * @param {string} chatUrl
     * @param {boolean} asExpanded
     * @returns {void}
     */
    renderWidget(chatUrl, asExpanded) {
      let widgetClass = 'getchat-widget';
      let styles = {};

      this.startLoading();

      this.block = document.createElement('div');

      this.block.className = widgetClass;

      // Указать выравнивание
      if (this.options.alignment) {
        this.block.className += ` ${widgetClass}--${this.__getAlignmentValue()}`;
      }

      // Указать в режиме preview или нет
      if (this.options.preview) {
        this.block.className += `${widgetClass}--preview`;
      }

      // Задать background шапки
      if (this.options.style.color) {
        styles.header = `background: ${this.options.style.color}`;
      }

      (() => (new Image().src = chatUrl))();

      const vars = {
        widgetUrl: chatUrl,
        asExpanded,
        styles
      };

      const widgetHtml = widgetTemplateLoader(vars);

      this.block.innerHTML = widgetHtml;

      document.body.appendChild(this.block);

      let frame = document.querySelector('.getchat-widget__frame');

      frame.onload = () => {
        if (!this.block.classList.contains(this.expandClass) && asExpanded) {
          this.expandBlock();
        }
      };

      this.initSystemEventListeners();
    },
    /**
     * Закрытие текущего и подгрузка нового чата
     * @param {String} url
     */
    loadChatBot(url, expand = true) {
      this.hideBlock();
      setTimeout(() => {
        this.destroyWidget();
        this.renderWidget(url, expand);
      }, 500);
    },
    /**
     * Возвращает путь к CSS
     */
    stylesFilePath() {
      return STYLEPATH[this.options.env];
    },
    loadStyles() {
      loadCss(this.stylesFilePath());
      this.stylesLoaded = true;
    },
    /**
     * Задает активный listener_id в чате.
     * Эта инфомрация нужна чтобы не срабатывали события из прошлых листенеров
     */
    __setActiveListener(listenerId) {
      this.active.listenerId = listenerId;
    },
    /**
     * Подписывается на системные события виджета такие как открыти/закрытие по нажатию на иконку
     */
    initSystemEventListeners() {
      const widget = document.querySelector('.getchat-widget');
      const $menuBtn = document.querySelector(
        '.getchat-widget__btn--action-menu'
      );
      const $closeBtn = document.querySelector(
        '.getchat-widget__btn--action-close'
      );
      const $launcher = document.querySelector('.getchat-widget__launcher');

      $closeBtn.addEventListener('click', (event) => {
        if (widget.classList.contains(this.expandClass)) {
          this.hideBlock(event);
        }
      });

      $menuBtn.addEventListener('click', () => {
        this.showAvailableBots();
      });

      $launcher.addEventListener('click', (event) => {
        if (!widget.classList.contains(this.expandClass)) {
          this.expandBlock(event);
        }
      });

      window.addEventListener('beforeunload', () => {
        clearInterval(this.ConditionEventsListeners.interval);
        Cookies.remove('gw_last_path');
      });
    },
    /**
     * Скрыть основной блок
     * @param userClickEvent null|Event
     */
    hideBlock(userClickEvent = null) {
      this.block.classList.remove(this.expandClass);
      Cookies.set(this.expandCookieKey, false, {
        expires: 2147483647
      });

      setTimeout(() => {
        this.__intro.exit();
      }, 500);

      if (userClickEvent != null) {
        this.dispatch('closed:on-click', userClickEvent);
      } else {
        this.dispatch('closed:auto', userClickEvent);
      }
    },
    /**
     * Расскрыть основной блок
     * @param userClickEvent null|Event
     */
    expandBlock(userClickEvent = null) {
      this.block.classList.add(this.expandClass);
      Cookies.set(this.expandCookieKey, true, {
        expires: 2147483647
      });

      if (userClickEvent != null) {
        this.dispatch('opened:on-click', userClickEvent);
      } else {
        this.dispatch('opened:auto', userClickEvent);
      }
    },
    startLoading() {
      this._states.isLoading = true;
    },
    stopLoading() {
      this._states.isLoading = false;
    },

    showAvailableBots() {
      let answers = this.ConditionEventsListeners.filterByPath(
        this.autoShowConditions,
        true
      ).map(uuid => {
        let minimum = 9000000000000000;
        let maximum = 9007199254740991;
        let answer_id =
          Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

        const { bot_id, name, start } = this.autoShowConditions[uuid];

        return {
          answer: {
            answer_id,
            bot_id,
            listener_id: start,
            text: name,
            type: 'botLoader'
          },
          type: 'actionAnswer'
        };
      });

      this.sendMessage(
        {
          answers
        },
        'botSelector',
        false
      );
    },
    loadWidgetData() {
      if (!this.hash) {
        const err = '[Ошибка] hash отсутствует';

        throw err;
      }
      let host = 'https://getchat.me';
      let url = `${host}/api/the-bot/widget/${this.hash}/data`;

      if (this.options.env === 'development') {
        url = url.replace(host, this.options.devHost);
      }

      return new Promise((resolve, reject) => {
        const init = {
          method: 'GET',
          credentials: 'omit',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          cache: 'no-cache',
          dataType: 'jsonp'
        };

        return fetch(url, init)
          .then(res => {
            if (res.status === 200) {
              return res.json();
            }
            showError(`[Ошибка] ${res.statusText}`);
            return {};
          })
          .then(response => resolve(response))
          .catch(error => {
            showError(error);
            reject(error);
          });
      });
    },

    /* ======================================================
    ==================  EVENT SYSTEM METHODS  ===============
    ========================================================= */
    dispatch(eventName, data) {
      const event = this.events[eventName];

      if (event) {
        event.fire(data);
      }
    },

    on(eventName, callback) {
      let event = this.events[eventName];

      if (!event) {
        event = new DispatcherEvent(eventName);
        this.events[eventName] = event;
      }
      event.registerCallback(callback);
    },

    off(eventName, callback) {
      const event = this.events[eventName];

      if (event && event.callbacks.indexOf(callback) > -1) {
        event.unregisterCallback(callback);
        if (event.callbacks.length === 0) {
          delete this.events[eventName];
        }
      }
    }
  },
  widgetStyles
);

export default onboarding;
