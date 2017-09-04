'use strict';
(function () {

  /* переменная для работы с окном (dialog) подробной информации о предложении */
  var offerDialog = document.querySelector('#offer-dialog');

  /**
   * показывает окно с информацией о предложении,
   * добавлет класс pin--active к выбранной автарке
   * проверяет если на данный момент у другого pin (отличного от выбранного) класс pin--active и удаляет его
   *
   */

  var showDialogDetails = function () {
    var pin = window.getParentBySelector(event.target, 'pin');
    if (pin && !pin.classList.contains('pin__main')) {
      pin.classList.add('pin--active');
      if (window.oldPin && window.oldPin !== pin) {
        window.oldPin.classList.remove('pin--active');
      }
      window.oldPin = pin;
      window.createDialog(window.currentOffers[pin.dataset.countNumber]);
      if (offerDialog.classList.contains('hidden')) {
        offerDialog.classList.remove('hidden');
      }
    }
  };

  /* экпортируем в глобальную зону видимости */
  window.showCard = showDialogDetails;

})();
