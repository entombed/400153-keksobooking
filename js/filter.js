'use strict';

(function () {

  /* Переменная для работы с областью размещения pin */
  var avatarBlock = document.querySelector('.tokyo__pin-map');

  /**
   * Выбирает предложения соответствующие фильтрам
   *
   * @param {array} array массив содержащий данные по предложениям
   * @param {obj} filter форма содержащая фильтры
   */

  var filterPins = function (array, filter) {
    var doFilter1 = sortByType(array, filter['housing_type']['value'], 'type');
    var doFilter2 = getByPrice(doFilter1, filter['housing_price']['value'], 'price');
    var doFilter3 = sortArray(doFilter2, filter['housing_room-number']['value'], 'rooms');
    var doFilter4 = sortArray(doFilter3, filter['housing_guests-number']['value'], 'guests');
    /* очищаем все pin с карты */
    clearMap();

    /* задержка отрисовки pin на карте */
    window.debounce.debounce(window.pin.create, doFilter4, avatarBlock);

    /* вешаем обработчики на аватарки расположенные на карте. клик мышки на автарке, enter на автарке в фокусе */
    avatarBlock.onclick = window.util.clickHandler(window.showCard.open, doFilter4);
    avatarBlock.onkeydown = window.util.clickHandler(window.showCard.open, doFilter4);

  };

  /**
   * выбираем данные из массива предложений
   *
   * @param {any} array  массив
   * @param {any} data значение поля формы (данные string или int)
   * @param {any} it ключ в массиве array
   * @returns array найденные элементы
   */

  var sortArray = function (array, data, it) {
    var filterRezult = null;
    var tmpArray = array.filter(function (item) {
      if (data === 'any') {
        filterRezult = (item.offer[it] !== false);
      } else {
        filterRezult = (item.offer[it] === Number(data));
      }
      return filterRezult;
    });
    return tmpArray;
  };

  /**
   * выбираем данные из массива предложений
   *
   * @param {any} array  массив
   * @param {any} data значение поля формы (все данные string)
   * @param {any} it ключ в массиве array
   * @returns array найденные элементы
   */

  var sortByType = function (array, data, it) {
    var filterRezult = null;
    var tmpArray = array.filter(function (item) {
      if (data === 'any') {
        filterRezult = (item.offer[it] !== false);
      } else {
        filterRezult = (item.offer[it] === data);
      }
      return filterRezult;
    });
    return tmpArray;
  };

  /**
   * выбираем данные из массива предложений
   *
   * @param {any} array  массив
   * @param {any} data значение поля формы (все данные int)
   * @param {any} it ключ в массиве array
   * @returns array найденные элементы
   */

  var getByPrice = function (array, data, it) {
    var filterRezult = null;
    var tmpArray = array.filter(function (item) {
      if (data === 'any') {
        filterRezult = item.offer[it] !== false;
      } else if (data === 'middle') {
        filterRezult = item.offer[it] <= 50000 && item.offer[it] >= 10000;
      } else if (data === 'low') {
        filterRezult = item.offer[it] <= 10000;
      } else if (data === 'high') {
        filterRezult = item.offer[it] >= 50000;
      }
      return filterRezult;
    });
    return tmpArray;
  };

  /**
   * убираем с карты все объекты с классом pin кроме pin__main
   *
   */
  var clearMap = function () {
    var pins = avatarBlock.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
  };

  /* экспортируем в глобальную область видимости */
  window.filter = {
    getSort: filterPins
  };
}());
