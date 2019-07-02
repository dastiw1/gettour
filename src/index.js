/* eslint-disable prefer-rest-params */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* global window */
/* global document */
/* global history */
import introJs from './intro-chat';

import ChangesListener from './ChangesListener';
import { showError, loadCss } from './utils';

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
    (bounds.bottom >= viewport.top && bounds.bottom <= viewport.bottom)
    || (bounds.top <= viewport.bottom && bounds.top >= viewport.top)
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
  stylesFilePath: 'http://localhost:3000/gettour-styles.css',
  selector: '.getchat-widget__frame',
  expandClass: 'getchat-widget--expanded',
  active: false,
  __intro: null,
  widgetHash: null,
  autoShowConditions: [],
  domain: null,
  block: null,
  setOptions,
  stylesLoaded: false,
  __observers: {},

  /**
   *
   * @param {string} hash
   */
  init(hash) {
    const self = this;
    this.hash = hash;
    this.loadWidgetData().then((data) => {
      this.domain = data.domain;
      this.active = data.widget_active;
      this.autoShowConditions = data.conditions;
      if (this.domain !== window.location.host) {
        showError('[Ошибка] Виджет не для этого домена');
        return;
      }
      if (!this.active) {
        return;
      }
      this.__intro = introJs();

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
      window.addEventListener('message', (event) => {
        this.__listenForHighlightRequests.call(this, event);
      });

      // Слушать события кнопок чата
      window.addEventListener('message', (event) => {
        this.__listenForActionClickedRequests.call(this, event);
      });

      // Слушать события для Observer-а
      window.addEventListener('message', (event) => {
        this.__listenForObserveRequests.call(this, event);
      });

      this.loadCondition();

      // Слущать изменение URL
      this.listenForLocationChange();
    });

    return this;
  },
  loadCondition() {
    this.autoShowConditions.forEach((cond) => {
      const regex = new RegExp(cond.urlRegex, 'i');
      if (regex.test(window.location.pathname)) {
        setTimeout(() => {
          this.renderWidget(cond.src);
          if (!this.stylesLoaded) {
            this.loadStyles();
          }
          this.initEventListeners();
        }, cond.timeInterval * 1000);
      }
    });
  },
  listenForLocationChange() {
    /* This modifies these three functions so that all fire
    a custom locationchange event for you to use,
    and also pushstate and replacestate events if you want to use those:
    From: https://stackoverflow.com/a/52809105/3939853 */
    history.pushState = (f => function pushState() {
      const ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('pushState'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.pushState);

    history.replaceState = (f => function replaceState() {
      const ret = f.apply(this, arguments);
      window.dispatchEvent(new Event('replaceState'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    })(history.replaceState);

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'));
    });

    /**
     * Слушать изменение URL
     */
    window.addEventListener('locationchange', () => {
      this.reset();
      this.loadCondition();
    });
  },
  /**
   * Если приходят такие экшны, то убирать highlight
   * @param {object} e
   */
  __listenForActionClickedRequests(e) {
    if (isMessageFromWidget(e) && e.data.action === 'ACTION_CLICKED') {
      const { answer_id } = e.data;
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
  highlight({ selector, closeEvent, highlightEventAnswerId }) {
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
      },
      { once: true }
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
  sendMessage(msg) {
    this.__intro.exit();
    const iframe = document.querySelector(this.selector);
    if (!iframe) {
      showError("Widget's iframe not found!");
      return;
    }

    iframe.contentWindow.postMessage(Object.assign(msg, { source: 'get-tour-library' }));
  },
  reset() {
    this.__intro._options.steps = [];
    this.__intro.refresh();
    this.destroyWidget();
  },
  destroyWidget() {
    if (this.block) {
      this.block.remove();
    }
  },
  renderWidget(widgetUrl) {
    this.block = document.createElement('div');
    this.block.className = 'getchat-widget getchat-widget--expanded';
    const widgetHtml = '<button type="button" class="getchat-widget__btn--icon" >'
      + '<i aria-hidden="true" class="getchat-widget__icon--close"></i></button>'
      + `<iframe src="${widgetUrl}" class="getchat-widget__frame"></iframe>`;

    this.block.innerHTML = widgetHtml;

    document.body.appendChild(this.block);
  },
  loadStyles() {
    loadCss(this.stylesFilePath);
    this.stylesLoaded = true;
  },
  initEventListeners() {
    const $closeBtn = document.querySelector('.getchat-widget__btn--icon');
    $closeBtn.addEventListener('click', () => {
      if (this.block.classList.contains(this.expandClass)) {
        this.hideBlock();
      } else {
        this.showBlock();
      }
    });
  },
  hideBlock() {
    const $closeBtn = document.querySelector('.getchat-widget__btn--icon');
    const $icon = $closeBtn.children[0];
    this.block.classList.remove(this.expandClass);
    $icon.className = 'getchat-widget__icon--expand';
  },
  expandBlock() {
    const $closeBtn = document.querySelector('.getchat-widget__btn--icon');
    const $icon = $closeBtn.children[0];
    this.block.classList.add(this.expandClass);
    $icon.className = 'getchat-widget__icon--close';
  },
  loadWidgetData() {
    // const url = `https://getchat.me/api/the-bot/widget/${this.hash}/data`;
    const url = `http://localhost:3000/api/the-bot/widget/${this.hash}/data`;

    return new Promise((resolve, reject) => fetch(url, {
      method: 'GET', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        showError(`[Ошибка] ${res.statusText}`);
        return {};
      })
      .then(response => resolve(response))
      .catch((error) => {
        showError(error);
        reject(error);
      }));
  }
};

export default onboarding;
