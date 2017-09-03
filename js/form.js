'use strict';
(function () {
  /* Переменные формы с объявлением */
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var address = form.querySelector('#address');

  /* переменная сохраняющая статус поля валидное или нет */
  var statusField = true;

  /* Сброс формы по умолчанию */
  var resetToDefaultForm = function () {
    form.reset();
    title.required = true;
    title.minLength = 30;
    title.maxLength = 100;
    price.required = true;
    price.type = 'number';
    price.min = 0;
    price.max = 1000000;
    price.value = 1000;
    type.value = 'flat';
    address.required = true;
    form.action = 'https://1510.dump.academy/keksobooking';
    roomNumber.value = 1;
  };

  /* Сбрасываем значение полей формы */
  resetToDefaultForm();

  /* масиивы данных для синхронизации полей */
  var regTime = ['12:00', '13:00', '14:00'];
  var typeHouse = ['flat', 'house', 'bungalo', 'palace'];
  var priceHouse = [1000, 5000, 0, 10000];
  var roomsCount = ['1', '2', '3', '100'];
  var placesCount = [1, 2, 3, 0];

  /**
   * принимает значение из масиива и задает:
   * значение переданному полю
   *
   * @param {any} field поле формы
   * @param {any} data значение из массива
   */

  var syncValues = function (field, data) {
    field.value = data;
  };

  /**
   * принимает значение из масиива и задает:
   *  - минимальное значение переданного поля
   *  - значение в переданном поле
   *
   * @param {any} field поле формы
   * @param {any} data значение из массива
   */

  var syncValueWithMin = function (field, data) {
    field.min = data;
    field.value = data;
  };

  /* синхронизируем поля */
  window.synchronizeFields(timeIn, timeOut, regTime, regTime, syncValues);
  window.synchronizeFields(timeOut, timeIn, regTime, regTime, syncValues);
  window.synchronizeFields(type, price, typeHouse, priceHouse, syncValueWithMin);
  window.synchronizeFields(roomNumber, capacity, roomsCount, placesCount, syncValues);

  /**
   * изменяем цвет рамки поля
   *
   * @param {obj} currentField поле формы
   * @param {bool} check true или false
   */

  var changeStyleBorderColor = function (currentField, check) {
    currentField.style.borderColor = '';
    statusField = true;
    if (!check) {
      currentField.style.borderColor = 'red';
      statusField = false;
    }
  };

  /**
   * проверка значения содержащегося в поле
   *
   * @param {any} currentField поле формы
   * @param {int} currentValue значение содержащееся в поле
   * @param {int} min минимальное значение
   * @param {int} max максимальное значение
   */

  var checkDataInField = function (currentField, currentValue, min, max) {
    changeStyleBorderColor(currentField, true);
    if (Number(currentValue) < Number(min) || Number(currentValue) > Number(max) || Number(currentField.value.length) === 0) {
      changeStyleBorderColor(currentField, false);
    }
  };

  /**
   * проверка поля адрес
   *
   * @param {any} currentField поле формы
   */

  var checkDataInFieldAddress = function (currentField) {
    changeStyleBorderColor(currentField, true);
    if (!currentField.value) {
      changeStyleBorderColor(currentField, false);
    }
  };

  /**
   * выбор необходимой функции в зависимости от поля
   *
   * @param {any} event
   */

  var checkBluerField = function (event) {
    switch (event.target.name.toLowerCase()) {
      case 'address':
        checkDataInFieldAddress(address);
        break;
      case 'title':
        checkDataInField(title, title.value.length, title.minLength, title.maxLength);
        break;
      case 'price':
        checkDataInField(price, price.value, price.min, price.max);
        break;
    }
  };

  /* слушатель события потери фокуса в поля формы */
  form.addEventListener('blur', checkBluerField, true);

  /* Проверка правильности заполнения полей формы перед отправкой */
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (statusField) {
      form.submit();
      resetToDefaultForm();
    }
  });
})();
