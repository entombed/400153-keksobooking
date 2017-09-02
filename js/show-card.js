'use strict';
(function () {
  /* переменная в которую записывается текущий элемент с классом pin--active */
  var oldPin = null;

  /* переменная для работы с окном (dialog) подробной информации о предложении */
  var offerDialog = document.querySelector('#offer-dialog');

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

  /* экпортируем в глобальную зону видимости */
  window.showAdDetails = showAdDetails;
  window.oldPin = oldPin;

})();
