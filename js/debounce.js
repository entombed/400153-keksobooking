'use strict';

(function () {

  var lastTimeout = null;
  var debounce = function (fun, time) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, time);
  };

  /* экспортируем в глобальную область видимости */
  window.debounce = {
    debounce: debounce
  };

})();
