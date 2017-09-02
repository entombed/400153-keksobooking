'use strict';
(function () {
  //  Перемещение текущего пина, и вывод его адреса в поле адрес
  /* переменная для работы с MainPin */
  var avatarBlock = document.querySelector('.tokyo__pin-map');
  var pinMain = avatarBlock.querySelector('.pin__main');

  /* переменная для работы с полем адресс */
  var addressInput = document.getElementById('address');

  /* размеры картинки MainPin */
  var pinMainWidth = pinMain.offsetWidth;
  var pinMainHeight = pinMain.offsetHeight;

  /* переменная для работы с картой на которую размещаются аватарки (pin) */
  var MapArea = document.querySelector('.tokyo');

  /* высота и ширина области перемещения pin-main*/
  var MapAreaHeight = pinMain.offsetParent.offsetHeight;
  var MapAreaWidth = pinMain.offsetParent.offsetWidth;
  var tokyoFilter = MapArea.querySelector('.tokyo__filters-container');
  var tokyoFilterHeight = tokyoFilter.offsetHeight;
  /* все что выходит за границы области перемещения скрывается */
  MapArea.style.overflow = 'hidden';
  /* создание автарок (pin) */
  window.createAvatars(window.currentOffers, avatarBlock);


  /* функция вычисляет позицию на карте и корректирует если выходит за пределы */
  var setPinStylePosition = function (shiftPin, fixX, fixY, fixTo) {
    if (fixTo === 'plus') {
      pinMain.style.top = (pinMain.offsetTop - shiftPin.y + fixY) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shiftPin.x + fixX) + 'px';
    } else if (fixTo === 'minus') {
      pinMain.style.top = (pinMain.offsetTop - shiftPin.y - fixY) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shiftPin.x - fixX) + 'px';
    } else {
      pinMain.style.top = (pinMain.offsetTop - shiftPin.y + fixY) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shiftPin.x + fixX) + 'px';
    }
  };

  var movePinMainHandler = function (event) {
    event.preventDefault();

    /* блокируем ввод адреса руками в поле адрес */
    addressInput.setAttribute('readonly', 'readonly');

    /* текущая позиция MainPin */
    var currentPinPosition = {
      x: event.clientX,
      y: event.clientY
    };

    /*  */
    var MouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      /* сдвиг относитено стартовых кооррдинат */
      var shiftPin = {
        x: currentPinPosition.x - moveEvt.clientX,
        y: currentPinPosition.y - moveEvt.clientY
      };

      /* переписываем текущие координаты */
      currentPinPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      /* вычисляем координаты и корректируем их в случае выхода за пределы карты */
      if (pinMain.offsetLeft < 0 - pinMainWidth / 2) {
        setPinStylePosition(shiftPin, 5, 0, 'plus');
      } else if (pinMain.offsetLeft > MapAreaWidth - pinMainWidth / 2) {
        setPinStylePosition(shiftPin, 5, 0, 'minus');
      } else if (pinMain.offsetTop < 100) {
        setPinStylePosition(shiftPin, 0, 5, 'plus');
      } else if (pinMain.offsetTop > MapAreaHeight - pinMainHeight - tokyoFilterHeight) {
        setPinStylePosition(shiftPin, 0, 5, 'minus');
      } else {
        setPinStylePosition(shiftPin, 0, 0);
      }
    };

    /* выводим в строку адрес текущие координаты */
    var printAddressValueHandler = function () {
      addressInput.value = 'x: ' + Math.floor(pinMain.offsetLeft + pinMainWidth / 2 + 0.5) + ', y: ' + (pinMain.offsetTop + pinMainHeight);
    };

    /* удаляем слущатели событий */
    var MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
      document.removeEventListener('mousemove', printAddressValueHandler);
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mousemove', printAddressValueHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  };

  pinMain.addEventListener('mousedown', movePinMainHandler);

})();
