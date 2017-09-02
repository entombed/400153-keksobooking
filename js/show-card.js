'use strict';
(function () {
  /* переменная в которую записывается текущий элемент с классом pin--active */
  var oldPin = null;

  /* переменная для работы с окном (dialog) подробной информации о предложении */
  var offerDialog = document.querySelector('#offer-dialog');

  /* закрывает окно с информацией о предложении (слево вверху) */
  var closeDialog = function () {
    if (!offerDialog.classList.contains('hidden')) {
      offerDialog.classList.add('hidden');
    }
  };

  /**
   * показывает окно с информацией о предложении,
   * добавлет класс pin--active к выбранной автарке
   * проверяет если на данный момент у другого pin (отличного от выбранного) класс pin--active и удаляет его
   *
   */

  var showAdDetails = function () {
    var pin = window.getParentBySelector(event.target, 'pin');
    if (pin && !pin.classList.contains('pin__main')) {
      pin.classList.add('pin--active');
      if (oldPin && oldPin !== pin) {
        oldPin.classList.remove('pin--active');
      }
      oldPin = pin;
      window.createDialog(window.currentOffers[pin.dataset.countNumber]);
      if (offerDialog.classList.contains('hidden')) {
        offerDialog.classList.remove('hidden');
      }
    }
  };

  /* скрывает окно с информацией о предолжении и убирает подсветку у активной автарки на карте */
  var doHiddenAdDetails = function () {
    offerDialog.classList.add('hidden');
    if (oldPin) {
      oldPin.classList.remove('pin--active');
    }
  };

  /**
   * закртие окна инфрмации о предложении
   *
   * @param {any} event
   */

  var hiddenAdDetails = function (event) {
    if (window.getParentBySelector(event.target, 'dialog__close')) {
      if (!offerDialog.classList.contains('hidden')) {
        doHiddenAdDetails();
      }
    }
  };

  /* экпортируем в глобальную зону видимости */
  window.showAdDetails = showAdDetails;
  window.oldPin = oldPin;
  window.closeDialog = closeDialog;
  window.doHiddenAdDetails = doHiddenAdDetails;
  window.hiddenAdDetails = hiddenAdDetails;

})();
