/* eslint-disable prefer-rest-params */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* global window */
/* global document */
/* global history */

import Cookies from 'js-cookie';

import introJs from './intro-chat';
import ChangesListener from './ChangesListener';
import ConditionEventsListeners from './ConditionEventsListeners';
import EventBus from './EventBus';
import { showError, loadCss } from './utils';

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
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isElementHidden(el) {
  return typeof el === 'object' && el.offsetParent === null;
}

function isMessageFromWidget(event) {
  // IMPORTANT: Check the origin of the data!
  if (event.origin.indexOf('https://getchat.me') || event.origin.indexOf(this.options.devHost)) {
    // The data has been sent from your site

    // The data sent with postMessage is stored in event.data
    if (typeof event.data !== 'object' || event.data.source !== 'getchat-widget') {
      return false;
    }

    return true;
  }

  return false;
}

const STYLEPATH = {
  development: '/css/gettour.min.css',
  production: 'https://cdn.jsdelivr.net/npm/gettour/dist/css/styles.min.css'
};

const onboarding = {
  selector: '.getchat-widget__frame',
  expandClass: 'getchat-widget--expanded',
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
  __intro: null,
  widgetHash: null,
  autoShowConditions: {},
  hash: null,
  domain: null,
  block: null,
  setOptions,
  stylesLoaded: false,
  triggeredCount: 0,
  __observers: {},
  listenersList: new Map(),
  options: {
    env: 'production',
    preview: false,
    devHost: 'http://localhost'
  },
  ConditionEventsListeners: null,
  /**
   *
   * @param {string} hash
   * @param {object} options
   */
  init(hash, options = {}) {
    const self = this;

    this.hash = hash;
    this.options = Object.assign(this.options, options);

    this.loadWidgetData().then(data => {
      this.domain = data.domain;
      this.active.status = data.widget_active;
      this.autoShowConditions = data.conditions;

      this.options = Object.assign(this.options, data.widget_options);

      if (!this.active.status) {
        return;
      }
      this.__intro = introJs();

      this.ConditionEventsListeners = new ConditionEventsListeners(this.autoShowConditions);

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
        const closeBtn = document.querySelector('.getchat-widget > .getchat-widget__btn--icon');

        if (closeBtn) {
          closeBtn.style.display = 'none';
        }
      });

      this.__intro.onexit(() => {
        const closeBtn = document.querySelector('.getchat-widget > .getchat-widget__btn--icon');

        if (closeBtn) {
          closeBtn.style.display = 'inline-flex';
        }
      });

      // Слушать события выделения
      window.addEventListener('message', event => {
        this.__listenForHighlightRequests.call(this, event);
      });

      // Слушать события кнопок чата
      window.addEventListener('message', event => {
        this.__listenForActionClickedRequests.call(this, event);
      });

      // Слушать события для Observer-а
      window.addEventListener('message', event => {
        this.__listenForObserveRequests.call(this, event);
      });

      // Слушать события наличия новых сообщении
      window.addEventListener('message', event => {
        this.__listenForNewMessages.call(this, event);
      });

      // Слушать события наличия новых сообщении
      window.addEventListener('message', event => {
        this.__listenForBotInfo.call(this, event);
      });

      // bla
      window.getTourEventBus.addEventListener('ConditionMatched', e => {
        if (
          e != null &&
          this.autoShowConditions[e.detail.uuid].onClick &&
          this.active.condition === e.detail.uuid &&
          this.active.condition
        ) {
          // Если нажали на элемент вызывающий данный виджет, но виджет уже подгружен
          if (this.block.classList.contains(this.expandClass)) {
            this.hideBlock();
          } else {
            this.expandBlock();
          }
        } else {
          this.loadCondition(e);
        }
      });

      // Если не подходит под условия
      window.getTourEventBus.addEventListener('NoMatchedConditions', e => {
        this.reset();
      });

      // Слущать изменение URL
      this.listenForLocationChange();
    });

    return this;
  },
  /**
   * Подгрузка виджета если попадает под одну из условии
   */

  loadCondition(event) {
    if (event != null) {
      this.active.condition = event.detail.uuid;
    } else {
      this.active.condition = null;
    }

    if (this.active.condition) {
      let oldVal = Cookies.get(this.expandCookieKey);
      let asExpanded = oldVal === 'true';

      this.renderWidget(this.autoShowConditions[this.active.condition].link, asExpanded);

      if (!this.stylesLoaded) {
        this.loadStyles();
      }

      this.initSystemEventListeners();

      if (this.triggeredCount === 0 && this.options.launchAsExpanded && asExpanded) {
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
    if (isMessageFromWidget.call(this, e) && e.data.action === 'ACTION_CLICKED') {
      const { answer_id } = e.data;
      let { steps } = this.__intro._options;

      if (steps && steps.length && answer_id === steps[0].highlightEventAnswerId) {
        this.__intro._options.steps = [];
        this.__intro.exit();
      }
    }
  },
  /**
   * Запустить прослушнивание событии которые выстреливают listener_id
   * @param {Object} e
   */
  __listenForObserveRequests(e) {
    let { data } = e;

    if (isMessageFromWidget.call(this, e) && data.action === 'OBSERVE') {
      // let activeListener = this.active.listenerId;
      let id = data.answer_id;

      this.__setActiveListener(data.active_listener_id || null);

      if (!this.listenersList.has(id)) {
        let listener = new ChangesListener(data);

        listener.tourJs = this;
        listener.init();
        this.__registerListener(listener);
      }
    }
  },
  /**
   * Добавляет эзмпляр ChangesListener в список
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
    if (isMessageFromWidget.call(this, e) && e.data.action === 'NEW_MESSAGE') {
      const { value } = e.data;
      let widget = document.querySelector('.getchat-widget');

      if (value) {
        if (!widget.classList.contains(this.hasMsgClass) && !widget.classList.contains(this.expandClass)) {
          widget.classList.add(this.hasMsgClass);
        }
      } else {
        widget.classList.remove(this.hasMsgClass);
      }
    }
  },
  /**
   * Получаем объект с данными бота
   * @param {object} e - Event
   */
  __listenForBotInfo(e) {
    if (isMessageFromWidget.call(this, e) && e.data.action === 'BOT_DATA') {
      let widgetAvaImg = document.querySelector('.getchat-widget .getchat-widget__header-ava > img');

      if (widgetAvaImg && e.data.bot.style.avatar) {
        widgetAvaImg.setAttribute('src', e.data.bot.style.avatar);
      }
    }
  },
  /**
   * Запустить прослушивание закрытия выделения элемента
   * @param {Object} e
   */
  __listenForHighlightRequests(e) {
    if (isMessageFromWidget.call(this, e) && e.data.action === 'HIGHLIGHT') {
      if (e.data.selector) {
        this.highlight(e.data);
      }
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

    if (!isElementHidden(el)) {
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
      showError("Element doesn't exist on DOM");
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
    introElement.addEventListener(
      closeEvent,
      () => {
        this.__intro.exit();
      },
      {
        once: true
      }
    );
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
  destroyWidget() {
    if (this.block) {
      this.block.remove();
    }
  },
  /**
   *
   * @param {string} widgetUrl
   * @param {boolean} asExpanded
   * @returns {void}
   */
  renderWidget(widgetUrl, asExpanded) {
    let widgetClass = 'getchat-widget';
    let styles = {};

    this.block = document.createElement('div');

    this.block.className = widgetClass;

    // Указать выравнивание
    if (this.options.alignment) {
      this.block.className += ` ${widgetClass}--${this.options.alignment}`;
    }

    // Указать в режиме preview или нет
    if (this.options.preview) {
      this.block.className = `${this.block.className} ${this.block.className}--preview`;
    }

    // Задать background шапки
    if (this.options.style.color) {
      styles.header = `background: ${this.options.style.color}`;
    }

    const vars = {
      widgetUrl,
      asExpanded,
      styles
    };
    const widgetHtml = widgetTemplateLoader(vars);

    this.block.innerHTML = widgetHtml;

    document.body.appendChild(this.block);

    let frame = document.querySelector('.getchat-widget__frame');

    frame.onload = () => {
      if (asExpanded) {
        this.expandBlock();
      }
    };

    (function () {
      new Image().src = widgetUrl;
    })();
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
    const $menuBtn = document.querySelector('.getchat-widget__btn--action-menu');
    const $closeBtn = document.querySelector('.getchat-widget__btn--action-close');
    const $launcher = document.querySelector('.getchat-widget__launcher');

    $closeBtn.addEventListener('click', () => {
      if (widget.classList.contains(this.expandClass)) {
        this.hideBlock();
      }
    });

    $menuBtn.addEventListener('click', () => {
      this.showAvailableBots();
    });

    $launcher.addEventListener('click', () => {
      if (!widget.classList.contains(this.expandClass)) {
        this.expandBlock();
      }
    });

    window.addEventListener('beforeunload', () => {
      clearInterval(this.ConditionEventsListeners.interval);
      Cookies.remove('gw_last_path');
    });
  },
  hideBlock() {
    this.block.classList.remove(this.expandClass);
    Cookies.set(this.expandCookieKey, false, {
      expires: 2147483647
    });

    this.__intro.exit();
  },
  expandBlock() {
    this.block.classList.add(this.expandClass);
    Cookies.set(this.expandCookieKey, true, {
      expires: 2147483647
    });
  },

  showAvailableBots() {
    let answers = this.ConditionEventsListeners.filterByPath(this.autoShowConditions, true).map(uuid => {
      let minimum = 9000000000000000;
      let maximum = 9007199254740991;
      let answer_id = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

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
  }
};

export default onboarding;
