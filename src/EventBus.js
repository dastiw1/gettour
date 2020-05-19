export default class EventBus {
  /**
   * Initialize a new event bus instance.
   */
  constructor() {
    this.busParent = document.createElement('fakeParent');
    this.bus = document.createElement('fakeelement');
    this.busParent.appendChild(this.bus);
  }

  /**
   * Add an event listener.
   */
  addEventListener(event, callback) {
    this.bus.addEventListener(event, callback);
  }

  /**
   * Remove an event listener.
   */
  removeEventListener(event, callback) {
    this.bus.removeEventListener(event, callback);
  }

  /**
   * Dispatch an event.
   */
  dispatchEvent(event, detail = {}) {
    this.bus.dispatchEvent(new CustomEvent(event, { detail }));
  }

  clearListeners() {
    let newBus = this.bus.cloneNode(true);

    this.busParent.replaceChild(newBus, this.bus);
  }
}
