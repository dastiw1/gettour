/**
 * Вывод ошибок в консоль
 * @param {String} msg
 */
export function showError(msg) {
  // eslint-disable-next-line no-console
  console.error(msg);
}

const utils = {
  showError
};

export default utils;
