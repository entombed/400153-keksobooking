'use strict';

(function () {

  /**
   * Синхронизация полей, данные берутся из field1 = data1, field2 = data2
   *
   * @param {any} field1 поле формы (изменение этого поля инициирует синхронизацию)
   * @param {any} field2 поле формы (в этом поле изменяются данные)
   * @param {any} data1 массив данных (значения которые содержатся в field1 )
   * @param {any} data2 массив данных (значения которые содержатся в field2)
   * @param {any} callback функция изменяющая значение поля field2
   */
  var synchronizeFields = function (field1, field2, data1, data2, callback) {
    field1.addEventListener('change', function () {
      var index = data1.indexOf(field1.value);
      callback(field2, data2[index]);
    });
  };

  /* экпортируем в глобальную зону видимости */
  window.synchronizeFields = synchronizeFields;
})();
