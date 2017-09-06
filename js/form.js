'use strict';
(function () {
  /* Переменная для работы с pin__main */
  var pinMain = document.querySelector('.pin__main');

  /* Переменные формы с объявлением */
  var form = document.querySelector('.notice__form');
  var title = form.title;
  var type = form.type;
  var price = form.price;
  var timeIn = form.timein;
  var timeOut = form.timeout;
  var roomNumber = form.room_number;
  var capacity = form.capacity;
  var address = form.address;

  /* переменная сохраняющая статус поля валидное или нет */
  var statusField = true;

  /**
   * Получаем координаты при загрузке страницы и при сбросе формыю
   *
   * @param {obj} pin
   */
  var getPinMainPosition = function (pin) {
    var pinWidth = pin.offsetWidth;
    var pinHeight = pin.offsetHeight;
    var pinCoord = {
      x: pin.offsetLeft + Math.floor(pinWidth / 2),
      y: pin.offsetTop + pinHeight
    };
    address.value = 'x: ' + pinCoord.x + ' y: ' + pinCoord.y;
  };

  /**
   * Стнхронизируем поле "Цена за ночь, руб." в зависимости от выбранного значения в поле "Тип жилья"
   *
   * @param {any} field1 поле формы
   * @param {any} field2 поле формы
   */
  var syncPriceField = function (field1, field2) {
    var value = null;
    switch (field1.value) {
      case 'flat':
        value = 1000;
        break;
      case 'bungalo':
        value = 0;
        break;
      case 'house':
        value = 5000;
        break;
      case 'palace':
        value = 10000;
        break;
    }
    field2.value = value;
    field2.min = value;
  };

  /**
   * Синхронизируем поля "Время заезда и выезда"
   *
   * @param {obj} field1 поле формы
   * @param {obj} field2 поле формы
   */
  var syncTimeField = function (field1, field2) {
    field2.selectedIndex = field1.selectedIndex;
  };

  /**
   * Синхронизируем поле "Количество мест" в зависимости от выбранного значения в поле "Кол-во комнат"
   *
   * @param {obj} field1 поле формы
   * @param {obj} field2 поле формы
   */
  var syncCapacityField = function (field1, field2) {
    var value = Number(field1.value);
    var options = field2.options;
    var optionsLength = options.length;
    var currentValue = null;

    for (var i = 0; i < optionsLength; i++) {
      currentValue = Number(options[i].value);
      options[i].disabled = true;
      if (currentValue === 0 && value === 100) {
        options[i].selected = true;
        options[i].disabled = false;
      }
      if (currentValue === value) {
        options[i].selected = true;
        options[i].disabled = false;
      }
      if (currentValue < value && currentValue !== 0 && value !== 100) {
        options[i].disabled = false;
      }
    }
  };

  /* Сброс формы по умолчанию */
  var resetToDefaultForm = function () {
    form.reset();
    title.required = true;
    title.minLength = 30;
    title.maxLength = 100;
    price.required = true;
    price.type = 'number';
    price.max = 1000000;
    address.required = true;
    syncPriceField(type, price);
    syncCapacityField(roomNumber, capacity);
    getPinMainPosition(pinMain);
    address.setAttribute('readonly', 'readonly');
  };

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
   * @param {obj} currentField поле формы
   */

  var checkDataInFieldAddress = function (currentField) {
    changeStyleBorderColor(currentField, true);
    if (!currentField.value) {
      changeStyleBorderColor(currentField, false);
    }
  };

  /**
   * Вызываем необходимую функцию в зависимости от занчени name поля
   *
   * @param {obj} event
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

  /* Сбрасываем значение полей формы */
  resetToDefaultForm();

  /* синхронизируем поля */
  window.synchronizeFields.synchronizeFields('change', timeIn, timeOut, syncTimeField);
  window.synchronizeFields. synchronizeFields('change', timeOut, timeIn, syncTimeField);
  window.synchronizeFields.synchronizeFields('change', type, price, syncPriceField);
  window.synchronizeFields.synchronizeFields('change', roomNumber, capacity, syncCapacityField);

  /* слушатель события потери фокуса в поля формы */
  form.addEventListener('blur', checkBluerField, true);

  /* Проверка правильности заполнения полей формы перед отправкой */
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (statusField) {
      window.backend.save(resetToDefaultForm, window.util.errorRequestHandler, new FormData(form));
    }
  });
})();
