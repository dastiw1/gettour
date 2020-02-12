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

const utils = {
  showError,
  loadCss,
  isObject
};

export default utils;
