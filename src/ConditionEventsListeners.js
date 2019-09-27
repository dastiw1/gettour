'use strict';
import Cookies from 'js-cookie';

let pathKey = 'gw_last_path';

class ConditionEventsListeners {
  constructor(conditions) {
    this.interval = null;
    this.autoConditions = {};
    this.manualConditions = {};
    this.metrics = {
      siteEnterTime: new Date(),
      pageEnterTime: new Date()
    };

    this.active = null;
    Object.keys(conditions).forEach(key => {
      const cond = conditions[key];

      if (cond.onClick) {
        this.manualConditions[key] = cond;
      } else {
        this.autoConditions[key] = cond;
      }
    });
  }
  watchForMatch() {
    this.interval = setInterval(() => {
      this.start();
    }, 1000);
    this.clickCallback = this.clickListener.bind(this);
    document.addEventListener('click', this.clickCallback);
  }

  testForPathname(cond, path = null) {
    const regex = new RegExp(cond.page_url.value, 'i');
    let pathname = path === null ? window.location.pathname : path;

    return regex.test(pathname);
  }
  /**
   * Фильтрует условия по URL адресу
   * @param {Array} conds Список условии
   */
  filterByPath(conds) {
    return Object.keys(conds).filter(uuid => {
      let cond = conds[uuid];
      let path = window.location.pathname;
      let prevPath = Cookies.get(pathKey);

      return (cond.page_url == null || (prevPath !== path && this.testForPathname(cond, path)));
    });

  }

  start() {
    let matches = 0;

    this.filterByPath(this.autoConditions).forEach(uuid => {

      let cond = this.autoConditions[uuid];

      if (this.matchDate(cond)) {
        window.getTourEventBus.dispatchEvent('ConditionMatched', {
          uuid
        });
        this.active = uuid;
        Cookies.set(pathKey, window.location.pathname);
        return;
      }

    });

    if (matches === 0 && this.active != null) {
      const regex = new RegExp(this.autoConditions[this.active].page_url.value, 'i');

      if (!regex.test(window.location.pathname)) {
        this.active = null;
      }
    }
  }

  /**
   * Проверяет action.condition на условие по времени
   * @param {Date} d - время в формате Date
   * @param {Object} cond - объект condition.{time_on_page|time_on_site|etc}
   */
  isMatchDateCondition(d, cond) {
    let date = d.getTime() / 1000;
    const now = new Date().getTime() / 1000;
    const value = parseInt(cond.value, 10);

    switch (cond.operator) {
      case '<':
        return now < date + value;

      case '>':
        return now > date + value;
      default:
        return false;
    }
  }
  /**
   * Проверят проходит ли condition по условиям времени
   * @param {Object} cond - объект condition
   */
  matchDate(cond) {
    let condResults = [];

    condResults[0] =
      cond.time_on_page == null || this.isMatchDateCondition(this.metrics.siteEnterTime, cond.time_on_page);

    condResults[1] =
      cond.time_on_site == null || this.isMatchDateCondition(this.metrics.pageEnterTime, cond.time_on_site);

    return condResults.every(val => val === true);
  }

  /**
   * Listener который слушает клики. Если нажатый элемент соответсвтует хоть одной
   * выборке из списка manualConditions-ов,
   * то выстреливаем событие ConditionMatched EventBus-а
   * @param {Event} jsEvent - JavaScript событие клика
   */
  clickListener(jsEvent) {
    Object.keys(this.manualConditions).forEach(uuid => {
      const cond = this.manualConditions[uuid];

      if (this.testForPathname(cond) && jsEvent.target.matches(cond.click_on_element.value)) {
        if (this.matchDate(cond)) {
          window.getTourEventBus.dispatchEvent('ConditionMatched', {
            uuid
          });
        }
      }
    });
  }
}

export default ConditionEventsListeners;
