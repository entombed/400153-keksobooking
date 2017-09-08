'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 2000;
  var lastTimeout = null;
  var debounce = function () {
    var args = Array.prototype.slice.call(arguments);
    var fun = args[0];
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      args.splice(0, 1);
      fun.apply(null, args);
    }, DEBOUNCE_INTERVAL);
  };

  /* экспортируем в глобальную область видимости */
  window.debounce = {
    debounce: debounce
  };

})();
