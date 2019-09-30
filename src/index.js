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
import {
  showError,
  loadCss
} from './utils';

const widgetTemplateLoader = require('./templates/widget.mst');

window.getTourEventBus = new EventBus();
/**
 * Warning. options - это свойсто объекта
 * @param {object} param0
 */
function setOptions({
  options
}) {
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

function isMessageFromWidget(event) {
  // IMPORTANT: Check the origin of the data!
  if (event.origin.indexOf('https://getchat.me') || event.origin.indexOf('http://localhost:3000')) {
    // The data has been sent from your site

    // The data sent with postMessage is stored in event.data
    if (typeof event.data !== 'object' || event.data.source !== 'getchat-widget') {
      return false;
    }

    return true;
  }

  return false;
}

const onboarding = {
  // stylesFilePath: 'https://cdn.jsdelivr.net/npm/gettour/dist/css/styles.css',
  stylesFilePath: '/css/gettour.min.css',
  selector: '.getchat-widget__frame',
  expandClass: 'getchat-widget--expanded',
  hasMsgClass: 'getchat-widget--has-msgs',
  expandCookieKey: 'gw-state',
  active: {
    status: false,
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
  autoShowConditions: [],
  hash: null,
  domain: null,
  block: null,
  setOptions,
  stylesLoaded: false,
  triggeredCount: 0,
  __observers: {},

  options: {
    env: 'production'
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

      this.options = data.widget_options;

      if (this.domain !== window.location.host) {
        showError('[Ошибка] Виджет не для этого домена');
        return;
      }
      if (!this.active.status) {
        return;
      }
      this.__intro = introJs();

      this.ConditionEventsListeners = new ConditionEventsListeners(this.autoShowConditions);

      this.ConditionEventsListeners.watchForMatch();

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

      if (this.triggeredCount === 0 && this.options.launchAsExpanded) {
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
      this.reset();
      if (this.autoShowConditions.length) {
        this.ConditionEventsListeners.watchForMatch();
      }
    });
  },
  /**
   * Если приходят такие экшны, то убирать highlight
   * @param {object} e
   */
  __listenForActionClickedRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'ACTION_CLICKED') {
      const {
        answer_id
      } = e.data;

      if (answer_id === this.__intro._options.steps[0].highlightEventAnswerId) {
        this.__intro.exit();
      }
    }
  },
  /**
   * Запустить прослушнивание событии которые выстреливают listener_id
   * @param {Object} e
   */
  __listenForObserveRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'OBSERVE') {
      const listener = new ChangesListener(e.data);

      listener.tourJs = this;
      listener.init();
    }
  },
  /**
   * Если приходят такие экшны, то на основе значения value
   * говорим виджету мигать или нет.
   * @param {object} e
   */
  __listenForNewMessages(e) {
    if (isMessageFromWidget(e) && e.data.action === 'NEW_MESSAGE') {
      // console.log('NEW_MESSAGE', e);
      const {
        value
      } = e.data;
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
   * Запустить прослушивание закрытия выделения элемента
   * @param {Object} e
   */
  __listenForHighlightRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'HIGHLIGHT') {
      if (e.data.selector) {
        this.highlight(e.data);
      }
    }
  },
  __getElementForHighlight(selector) {
    const elements = document.querySelectorAll(selector);
    const elementsArray = Array.from(elements);

    return elementsArray.find(isAnyPartOfElementInViewport);
  },
  highlight({
    selector,
    closeEvent,
    highlightEventAnswerId
  }) {
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
      }, {
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
    }, 50);
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

    frame.contentWindow.postMessage(Object.assign(msg, {
      source: 'get-tour-library',
      msgType
    }), '*');
  },
  reset() {
    this.__intro._options.steps = [];
    this.__intro.refresh();
    // this.triggeredCount = 0;
    this.destroyWidget();
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
    this.block = document.createElement('div');
    this.block.className = 'getchat-widget';

    const vars = {
      widgetUrl,
      asExpanded

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
  loadStyles() {
    loadCss(this.stylesFilePath);
    this.stylesLoaded = true;
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
  },
  expandBlock() {
    this.block.classList.add(this.expandClass);
    Cookies.set(this.expandCookieKey, true, {
      expires: 2147483647
    });
  },

  showAvailableBots() {
    let answers = this.ConditionEventsListeners.filterByPath(this.autoShowConditions, true)
      .map((uuid) => {
        let minimum = 9000000000000000;
        let maximum = 9007199254740991;
        let answer_id = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

        const {
          bot_id,
          name,
          start
        } = this.autoShowConditions[uuid];

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

    this.sendMessage({
      answers
    }, 'botSelector', false);
  },
  loadWidgetData() {
    if (!this.hash) {
      const err = '[Ошибка] hash отсутствует';

      throw err;
    }
    let host = 'https://getchat.me';
    let url = `${host}/api/the-bot/widget/${this.hash}/data`;

    if (this.options.env === 'development') {
      url = url.replace(host, 'http://localhost:3000');
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
