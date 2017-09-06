'use strict';

(function () {


  /**
   * Синхронизация полей форм
   *
   * @param {string} eventName событие при котором инициируется синхронизация
   * @param {obj} field1 поле формы
   * @param {obj} field2 поле формы
   * @param {function} callback функция выполняющая синхронизацию
   */
  var synchronizeFields = function (eventName, field1, field2, callback) {
    field1.addEventListener(eventName, function () {
      callback(field1, field2);
    });
  };

  /* экпортируем в глобальную зону видимости */
  window.synchronizeFields = {
    synchronizeFields: synchronizeFields
  };
})();
