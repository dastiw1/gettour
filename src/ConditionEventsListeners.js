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

  start() {
    Object.keys(this.autoConditions).forEach(uuid => {
      let cond = this.autoConditions[uuid];
      const regex = new RegExp(cond.page_url.value, 'i');

      if (this.active !== uuid && regex.test(window.location.pathname)) {
        if (this.matchDate(cond)) {
          window.getTourEventBus.dispatchEvent('ConditionMatched', { uuid });
          this.active = uuid;
        }
      }
    });
  }

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
  matchDate(cond) {
    return (
      this.isMatchDateCondition(this.metrics.siteEnterTime, cond.time_on_page) &&
      this.isMatchDateCondition(this.metrics.pageEnterTime, cond.time_on_page)
    );
  }

  clickListener(jsEvent) {
    Object.keys(this.manualConditions).forEach(uuid => {
      const cond = this.manualConditions[uuid];

      if (jsEvent.target.matches(cond.click_on_element.value)) {
        if (this.matchDate(cond)) {
          window.getTourEventBus.dispatchEvent('ConditionMatched', { uuid });
        }
      }
    });
  }
}

export default ConditionEventsListeners;
