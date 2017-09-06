'use strict';

(function () {


  /**
   * Синхронизация полей форм
   *
   * @param {string} eventName
   * @param {obj} field1
   * @param {obj} field2
   * @param {function} callback
   */
  var synchronizeFields = function (eventName, field1, field2, callback) {
    callback(field1, field2);
    field1.addEventListener(eventName, function () {
      callback(field1, field2);
    });
  };

  /* экпортируем в глобальную зону видимости */
  window.synchronizeFields = {
    synchronizeFields: synchronizeFields
  };
})();
