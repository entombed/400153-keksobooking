'use strict';
(function () {
  window.util = {
    /**
     * Случайное кол-во элементов из массива
     *
     * @param {array} array
     * @return массив элементов
     */

    resortItems: function (array) {
      var tmpArray = [];
      var currentLength = window.util.getRandomInt(1, array.length);
      for (var i = 0; i < currentLength; i++) {
        tmpArray.push(window.util.getUniqueItem(array, i));
      }
      return tmpArray;
    },

    /**
     * Случайное целое число в диапазоне min max
     *
     * @param {int} min минимальное значение
     * @param {int} max максимальное значение
     * @return случайное число
     */

    getRandomInt: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },

    /**
     * Случайные элемент массива
     *
     * @param {array} array принимает массив
     * @return случайный элемент массива
     */

    getRandomItem: function (array) {
      var length = array.length;
      var randomItem = window.util.getRandomInt(0, length - 1);
      return array[randomItem];
    },

    /**
     * Возвращает уникальный элемент из массива
     *
     * @param {array} array принимает массив
     * @param {int} i число
     * @return уникальный элемент из массива
     */

    getUniqueItem: function (array, i) {
      var currentIndex = i || 0;
      var index = window.util.getRandomInt(currentIndex, array.length - 1);
      var tmp = null;
      var value = array[index];
      tmp = array[currentIndex];
      array[currentIndex] = array[index];
      array[index] = tmp;
      return value;
    }
  };
})();
