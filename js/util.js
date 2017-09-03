'use strict';

(function () {
  /**
   * Случайное кол-во элементов из массива
   *
   * @param {array} array
   * @return массив элементов
   */

  var resortItems = function (array) {
    var tmpArray = [];
    var currentLength = getRandomInt(1, array.length);
    for (var i = 0; i < currentLength; i++) {
      tmpArray.push(getUniqueItem(array, i));
    }
    return tmpArray;
  };

  /**
   * Случайное целое число в диапазоне min max
   *
   * @param {int} min минимальное значение
   * @param {int} max максимальное значение
   * @return случайное число
   */

  var getRandomInt = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

  /**
   * Случайные элемент массива
   *
   * @param {array} array принимает массив
   * @return случайный элемент массива
   */

  var getRandomItem = function (array) {
    var length = array.length;
    var randomItem = getRandomInt(0, length - 1);
    return array[randomItem];
  };

  /**
   * Возвращает уникальный элемент из массива
   *
   * @param {array} array принимает массив
   * @param {int} i число
   * @return уникальный элемент из массива
   */

  var getUniqueItem = function (array, i) {
    var currentIndex = i || 0;
    var index = getRandomInt(currentIndex, array.length - 1);
    var tmp = null;
    var value = array[index];
    tmp = array[currentIndex];
    array[currentIndex] = array[index];
    array[index] = tmp;
    return value;
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

  var keysCodes = {
    ESC: 27,
    ENTER: 13
  };

  function escPressHandler(callback) {
    if (typeof callback === 'function' && escPressHandler.handlers.indexOf(callback) === -1) {
      escPressHandler.handlers.push(callback);
    }
    return function (event) {
      if (event.keyCode === keysCodes['ESC']) {
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

  /* callback функция обрабатывающая нажатие клавиатуры */
  var entterPressHandler = function (callback) {
    return function (event) {
      if (event.keyCode === keysCodes['ENTER']) {
        callback(event);
      }
    };
  };

  /* экспортируем в глобальную область видимости */
  window.resortItems = resortItems;
  window.getRandomInt = getRandomInt;
  window.getRandomItem = getRandomItem;
  window.getUniqueItem = getUniqueItem;
  window.getParentBySelector = getParentBySelector;
  window.escPressHandler = escPressHandler;
  window.entterPressHandler = entterPressHandler;
  window.clickHandler = clickHandler;
})();
