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
    capacity.value = 1;
  };

  resetToDefaultForm();

/* Автоматическая корректировка поля въезда или выезда */
  var syncCheckinCheckout = function (element1, element2) {
    element1.addEventListener('change', function () {
      element2.value = element1.value;
    });
  };

  syncCheckinCheckout(timeIn, timeOut);
  syncCheckinCheckout(timeOut, timeIn);

/* Зависимость количеества мест от количества комнат (код жуть но работает) */
  roomNumber.addEventListener('change', function () {
    for (var i = 0; i < capacity.options.length; i++) {
      capacity.options[i].disabled = false;
    }
    switch (roomNumber.value) {
      case '1':
        capacity.value = '1';
        for (i = 0; i < capacity.options.length; i++) {
          if (i === 2) {
            continue;
          }
          capacity.options[i].disabled = true;
        }
        break;
      case '2':
        capacity.value = '2';
        for (i = 0; i < capacity.options.length; i++) {
          if (i === 2 || i === 1) {
            continue;
          }
          capacity.options[i].disabled = true;
        }
        break;
      case '3':
        capacity.value = '3';
        for (i = 0; i < capacity.options.length; i++) {
          if (i === 3) {
            capacity.options[i].disabled = true;
          }
        }
        break;
      case '100':
        capacity.value = '0';
        for (i = 0; i < capacity.options.length; i++) {
          if (i === 3) {
            continue;
          }
          capacity.options[i].disabled = true;
        }
        break;
    }
  });

/* Синхронизация значения поля «Тип жилья» с ценой объявления */
  type.addEventListener('change', function () {
    switch (type.value) {
      case 'bungalo':
        price.value = 0;
        break;
      case 'flat':
        price.value = 1000;
        break;
      case 'house':
        price.value = 5000;
        break;
      case 'palace':
        price.value = 10000;
        break;
    }
  });

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
