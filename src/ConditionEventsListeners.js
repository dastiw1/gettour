'use strict';

class ConditionEventsListeners {
  constructor(conditions) {
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
    setInterval(() => {
      this.start();
    }, 1000);
    this.clickCallback = this.clickListener.bind(this);
    document.addEventListener('click', this.clickCallback);
  }

  testForPathname(cond) {
    const regex = new RegExp(cond.page_url.value, 'i');

    return regex.test(window.location.pathname);
  }

  start() {
    let matches = 0;

    Object.keys(this.autoConditions).forEach(uuid => {
      let cond = this.autoConditions[uuid];

      if (cond.page_url == null || (this.active !== uuid && this.testForPathname(cond))) {
        if (this.matchDate(cond)) {
          window.getTourEventBus.dispatchEvent('ConditionMatched', { uuid });
          this.active = uuid;
          return;
        }
      } else {
        console.log('false');
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
          window.getTourEventBus.dispatchEvent('ConditionMatched', { uuid });
        }
      }
    });
  }
}

export default ConditionEventsListeners;
