/**
 * Вывод ошибок в консоль
 * @param {String} msg
 */
export function showError(msg) {
  // eslint-disable-next-line no-console
  console.error(msg);
}

export function loadCss(path) {
  const head = document.getElementsByTagName('HEAD')[0];
  const link = document.createElement('link');

  link.rel = 'stylesheet';

  link.type = 'text/css';

  link.href = path;
  head.appendChild(link);
}

export function isObject(obj) {
  let type = typeof obj;

  return type === 'function' || (type === 'object' && !!obj);
}
/**
 * Check is user device is mobile
 */
export function isMobileDevice() {
  return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
export function detectClientLang() {
  let lang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    navigator.userLanguage;

  if (lang == null || typeof lang !== 'string') {
    return 'en';
  }

  if (lang.length < 2) {
    return 'en';
  }

  return lang.substr(0, 2);
}
const utils = {
  showError,
  loadCss,
  isObject,
  isMobileDevice
};

export default utils;
