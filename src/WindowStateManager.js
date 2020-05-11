import Cookies from 'js-cookie';
const EXPAND_COOKIE_KEY = 'gw-state';
// Private variables
let _LOCALSTORAGE_KEY = 'WIDGET_WINDOW_VALIDATION';
let RECHECK_WINDOW_DELAY_MS = 100;
let _initialized = false;
let _isMainWindow = false;
let _unloaded = false;
let _windowArray;
let _windowId;
let _isNewWindowPromotedToMain = false;
let _onWindowUpdated;

// Remove the window from the global count
function removeWindow() {
  let __windowArray = JSON.parse(localStorage.getItem(_LOCALSTORAGE_KEY));

  for (let i = 0, length = __windowArray.length; i < length; i++) {
    if (__windowArray[i] === _windowId) {
      __windowArray.splice(i, 1);
      break;
    }
  }
  // Update the local storage with the new array
  localStorage.setItem(_LOCALSTORAGE_KEY, JSON.stringify(__windowArray));

  if (Cookies.get(EXPAND_COOKIE_KEY) !== 'true' && __windowArray.length < 1) {
    Cookies.set(EXPAND_COOKIE_KEY, true, {
      expires: 2147483647
    });
  }

}

// Bind unloading events
function bindUnload() {
  window.addEventListener('beforeunload', function () {
    if (!_unloaded) {
      removeWindow();
    }
  });
  window.addEventListener('unload', function () {
    if (!_unloaded) {
      removeWindow();
    }
  });
}

class WindowStateManager {
  constructor(isNewWindowPromotedToMain, onWindowUpdated) {
    // this.resetWindows();
    _onWindowUpdated = onWindowUpdated;
    _isNewWindowPromotedToMain = isNewWindowPromotedToMain;
    _windowId = Date.now().toString();

    bindUnload();

    this.determineWindowState();

    _initialized = true;

    _onWindowUpdated.call(this);
  }
  // Return _windowArray
  getWindowsArray() {
    return _windowArray;
  }

  /** Determine the state of the window If its a main or child window */
  determineWindowState() {
    let _previousState = _isMainWindow;

    _windowArray = localStorage.getItem(_LOCALSTORAGE_KEY);

    if (_windowArray === null || _windowArray === 'NaN') {
      _windowArray = [];
    } else {
      _windowArray = JSON.parse(_windowArray);
    }

    if (_initialized) {
      // Determine if this window should be promoted
      if (_windowArray.length <= 1 ||
        (_isNewWindowPromotedToMain ? _windowArray[_windowArray.length - 1] : _windowArray[0]) === _windowId) {
        _isMainWindow = true;
      } else {
        _isMainWindow = false;
      }
    } else {
      if (_windowArray.length === 0) {
        _isMainWindow = true;
        _windowArray[0] = _windowId;
        localStorage.setItem(_LOCALSTORAGE_KEY, JSON.stringify(_windowArray));
      } else {
        _isMainWindow = false;
        _windowArray.push(_windowId);
        localStorage.setItem(_LOCALSTORAGE_KEY, JSON.stringify(_windowArray));
      }
    }

    // If the window state has been updated invoke callback
    if (_previousState !== _isMainWindow) {
      _onWindowUpdated.call(this);
    }

    // Perform a recheck of the window on a delay
    setTimeout(() => {
      this.determineWindowState();
    }, RECHECK_WINDOW_DELAY_MS);
  }

  isMainWindow() {
    return _isMainWindow;
  }
  resetWindows() {
    localStorage.removeItem(_LOCALSTORAGE_KEY);
  }
}

export default WindowStateManager;
