/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* global window */
/* global document */
import introJs from './intro-chat';

import ChangesListener from './ChangesListener';
import { showError } from './utils';

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
  selector: '.chat-widget__frame',
  __intro: null,
  setOptions,
  __observers: {},

  /**
   *
   * @param {*} context
   * @param {int} botId - Временно, bot id чтобы сделать проверку
   */
  init(context, botId) {
    if (botId !== process.env.MIX_ONBOARDING_BOT_ID) {
      return false;
    }
    const self = this;
    this.__intro = introJs();

    this.__intro.onchange(() => {
      context.$nextTick(() => {
        self.__intro.refresh();
      });

      return this;
    });

    this.__intro.onbeforechange(() => {
      const step = this._introItems[0];
      self.setOptions(step);

      //
      const closeBtn = document.querySelector('.chat-widget > #close-widget');
      if (closeBtn) {
        closeBtn.style.display = 'none';
      }
    });

    this.__intro.onexit(() => {
      const closeBtn = document.querySelector('.chat-widget > #close-widget');
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
    return this;
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
  }
};

export default onboarding;
