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
const utils = {
  showError,
  loadCss
};

export default utils;
