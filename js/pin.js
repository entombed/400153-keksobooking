'use strict';
(function () {

  var keysCodes = {
    ESC: 27,
    ENTER: 13
  };

  var oldPin = null;
  var offerDialog = document.querySelector('#offer-dialog');
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  /**
 * закрывает окно с информацией о предложении (слево вверху)
 *
 */

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

  /**
   * скрывает окно с информацией о предолжении и убирает подсветку у активной автарки на карте
   *
   */

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

  var clickHandler = function (calldack) {
    return function (event) {
      calldack(event);
    };
  };

  var entterPressHandler = function (callback) {
    return function (event) {
      if (event.keyCode === keysCodes['ENTER']) {
        callback(event);
      }
    };
  };

  /*
  скрывает окно с информацией
  */
  closeDialog();

  /*
  вешаем обработчики на аватарки расположенные на карте. клик мышки на автарке, enter на автарке в фокусе
  */
  tokyoPinMap.addEventListener('click', clickHandler(showAdDetails));
  tokyoPinMap.addEventListener('keydown', entterPressHandler(showAdDetails));

  /*
  вешаем обработчики на окно с подробной информацией о предолжении. клик мышки на крестике и enter на кнопке закрыто окно
  */
  offerDialog.addEventListener('click', clickHandler(hiddenAdDetails));
  offerDialog.addEventListener('keydown', entterPressHandler(hiddenAdDetails));

  /*
  вешаем обработчики на окно с подробной информацией о предолжении. закрытие по нажатию esc
  */
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === keysCodes['ESC']) {
      if (!offerDialog.classList.contains('hidden')) {
        doHiddenAdDetails();
      }
    }
  });
})();
