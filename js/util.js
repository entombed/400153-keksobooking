'use strict';

(function () {

  var KEYS_CODES = {
    ESC: 27,
    ENTER: 13
  };

  /**
   * Производит поиск по родителя содержащий искомый css класс
   * Поднимается вверж от child пока не встретит родтеля с классом selector
   *
   * @param {obj} child объект
   * @param {string} selector css class родителя
   * @returns возвращает найденный родитель с указанным css классом
   */

  var getParentBySelector = function (child, selector) {
    var node = child;
    while (node && !node.classList.contains(selector)) {
      node = node.parentElement;
    }
    return node;
  };

  /* функция обрабатывающая нажатие клавиаши ESC */
  function escPressHandler(callback) {
    if (typeof callback === 'function' && escPressHandler.handlers.indexOf(callback) === -1) {
      escPressHandler.handlers.push(callback);
    }
    return function (event) {
      if (event.keyCode === KEYS_CODES['ESC']) {
        escPressHandler.handlers.forEach(function (item) {
          item();
        });
      }
    };
  }
  escPressHandler.handlers = [];

  /* callback функция обрабатывающая клик мышки */
  var clickHandler = function clickHandler(calldack) {
    return function (event) {
      calldack(event);
    };
  };

  /* функция обрабатывающая нажатие клавиаши ENTER */
  var entterPressHandler = function (callback) {
    return function (event) {
      if (event.keyCode === KEYS_CODES['ENTER']) {
        callback(event);
      }
    };
  };

  /**
   * сообщение при отпраке запроса на сервер
   *
   * @param {string} errorMessage
   */

  var sendRequestHandler = function (errorMessage) {
    var msgBlock = document.createElement('div');
    msgBlock.classList.add('errorMsgBlock');
    msgBlock.style.padding = '10px';
    msgBlock.style.textAlign = 'center';
    msgBlock.style.backgroundColor = 'red';
    msgBlock.style.position = 'fixed';
    msgBlock.style.transform = 'translate(-50%, -50%)';
    msgBlock.style.left = '50%';
    msgBlock.style.top = '50%';
    msgBlock.style.fontSize = '25px';
    msgBlock.style.color = 'white';
    msgBlock.style.zIndex = '10';
    msgBlock.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', msgBlock);
    setTimeout(function () {
      msgBlock.remove();
    }, 2000);
  };

  /* экпортируем в глобальную зону видимости */
  window.util = {
    getParentBySelector: getParentBySelector,
    escPressHandler: escPressHandler,
    entterPressHandler: entterPressHandler,
    clickHandler: clickHandler,
    sendRequestHandler: sendRequestHandler
  };
})();
