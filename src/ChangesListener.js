/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* global MutationObserver */
/* global IntersectionObserver */
/* global document */
import { showError } from './utils';

export function __isNativeEvent(event) {
  const defaultEvents = [
    'click',
    'mouseover',
    'mouseout',
    'keyup',
    'keypress',
    'change',
    'focus',
    'submit'
  ];
  return defaultEvents.indexOf(event) > -1;
}

class ChangesListener {
  constructor({
    listener_id, selector, event, attributeName
  }) {
    this.__tourObject = null;
    this.listener_id = listener_id;
    this.selector = selector;
    this.event = event;
    this.attributeName = attributeName;
  }

  get tourJs() {
    return this.__tourObject;
  }

  set tourJs(val) {
    this.__tourObject = val;
  }

  init() {
    if (this.tourJs == null) {
      showError('Сперва задайте значение tourJs');
      return;
    }
    let isBody = false;
    const { event } = this;
    // конфигурация нашего observer:
    let config = { attributes: true, childList: true, characterData: false };
    // выбираем целевой элемент
    let target = document.querySelector(this.selector);

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
        showError('Ошибка: Элемент отсутствует в DOM');
      }

      return;
    }

    // Если элемент не найден в DOM дереве
    if (!target) {
      target = document.body;
      config.subtree = true;
      isBody = true;
    }

    if (isBody === false) {
      let observer;
      let callback;
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
          showError(`Не попал под условия: ${this.selector} - ${event}`);
          return;
        // break;
      }

      if (typeof callback !== 'function') {
        showError('Callback функция не определена!');
        return;
      }

      // если используется IntersectionObserver
      if (['show', 'hide'].indexOf(event) > -1) {
        observer = new IntersectionObserver((entries, context) => {
          entries.forEach(callback.bind(context));
        });
      } else {
        // Если используется MutationObserver
        observer = new MutationObserver((mutations, context) => {
          mutations.forEach(callback.bind(context));
        });
      }
      this.tourJs.__observers[this.listener_id] = observer;
      observer.observe(target, config);
    } else {
      // создаём экземпляр MutationObserver
      const observer = new MutationObserver((mutations, context) => {
        switch (event) {
          case 'show':
            mutations.forEach(this.showCallback.bind(context));
            break;
          case 'hide':
            mutations.forEach(this.hideCallback.bind(context));
            break;
          default:
            showError(`Не попал под условия: ${this.selector} - ${this.event}`);
            this.disconnectListener();
            break;
        }
      });

      // передаём в качестве аргументов целевой элемент и его конфигурацию
      this.tourJs.__observers[this.listener_id] = observer;
      observer.observe(target, config);
    }
  }

  /**
   *
   */
  disconnectListener() {
    const listener = this.tourJs.__observers[this.listener_id];
    if (!listener) {
      showError(`Listener с id ${this.listener_id} не найден`);
      return;
    }

    listener.disconnect();
  }

  sendMessage() {
    this.tourJs.sendMessage({
      listener_id: this.listener_id
    });
  }

  /**
   * Callback функция для прослушивания нативных событии JavaScript
   * @param {Event} jsEvent
   */
  nativeEventListener(jsEvent) {
    if (jsEvent.target.matches(this.selector)) {
      this.sendMessage();
      jsEvent.target.removeEventListener(this.event, this.callback, false);
    }
  }

  /**
   *Callback функция для прослушивания нативных CLICK событии JavaScript
   * @param {Event} jsEvent
   */
  nativeClickListener(jsEvent) {
    if (jsEvent.target.matches(this.selector)) {
      this.sendMessage();

      jsEvent.target.removeEventListener(this.event, this.callback, false);
    }
  }

  IntersectionShowCallback(changeListener) {
    if (this.isIntersecting) {
      changeListener.sendMessage();
      changeListener.disconnectListener();
    }
  }

  IntersectionHideCallback(changeListener) {
    if (this.intersectionRatio === 0 && this.isIntersecting === false) {
      changeListener.sendMessage();
      changeListener.disconnectListener();
    }
  }

  /**
   * Callback функция когда event == 'show' (показ) и этого элемента нет в DOM
   */
  showCallback(changeListener) {
    if (this.type === 'childList' && this.addedNodes.length > 0) {
      const el = document.querySelector(changeListener.selector);

      if (this.addedNodes[0].isSameNode(el)) {
        changeListener.sendMessage();
        return changeListener.disconnectListener();
      }
    }

    return false;
  }

  hideCallback(changeListener) {
    if (this.type === 'childList' && this.removedNodes.length > 0) {
      const node = this.removedNodes[0];

      if (node.nodeType === 1 && node.matches(changeListener.selector)) {
        changeListener.sendMessage();
        return changeListener.disconnectListener();
      }
    }
    return false;
  }

  classChangeCallback(changeListener) {
    if (this.type === 'attributes' && this.attributeName === 'class') {
      changeListener.sendMessage();
      return changeListener.disconnectListener();
    }
    return false;
  }

  attributeChangeCallback(changeListener) {
    if (this.type === 'attributes' && this.attributeName === changeListener.attributeName) {
      changeListener.sendMessage();
      return changeListener.disconnectListener();
    }

    return false;
  }

  characterDataChangeCallback(changeListener) {
    if (this.type === 'characterData' || this.type === 'childList') {
      changeListener.sendMessage();
      changeListener.disconnectListener();
    }
  }

  childrenChangeCallback(changeListener) {
    if (this.type === 'childList') {
      changeListener.sendMessage();
      changeListener.disconnectListener();
    }
  }
}

export default ChangesListener;
