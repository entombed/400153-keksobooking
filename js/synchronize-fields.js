'use strict';

(function () {
  window.synchronizeFields = function (initElement, toSyncElement, callback) {
    initElement.onchange = function () {
      callback(initElement.value, toSyncElement);
    };
  };
})();
