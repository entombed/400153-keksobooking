'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;
  var lastTimeout = null;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  /* экспортируем в глобальную область видимости */
  window.debounce = {
    debounce: debounce
  };

})();
