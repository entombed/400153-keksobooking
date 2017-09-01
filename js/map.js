'use strict';
(function () {
  /* переменная для работы с картой на которую размещаются аватарки (pin) */
  var avatarBlock = document.querySelector('.tokyo__pin-map');
  var MapArea = document.querySelector('.tokyo');
  MapArea.style.overflow = 'hidden';
  /* создание автарок (pin) */
  window.createAvatars(window.currentOffers, avatarBlock);

  //  Перемещение текущего пина, и вывод его адреса в поле адрес
  /* переменная для работы с MainPin */
  var pinMain = avatarBlock.querySelector('.pin__main');

  /* переменная для работы с полем адресс */
  var addressInput = document.getElementById('address');

  /* размеры картинки MainPin */
  var pinMainWidth = pinMain.clientWidth;
  var pinMainHeight = pinMain.clientHeight;

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
    var onMouseMove = function (moveEvt) {
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
      if (pinMain.offsetLeft < -35) {
        setPinStylePosition(shiftPin, 5, 0, 'plus');
      } else if (pinMain.offsetLeft > 1160) {
        setPinStylePosition(shiftPin, 5, 0, 'minus');
      } else if (pinMain.offsetTop < 100) {
        setPinStylePosition(shiftPin, 0, 5, 'plus');
      } else if (pinMain.offsetTop > 570) {
        setPinStylePosition(shiftPin, 0, 5, 'minus');
      } else {
        setPinStylePosition(shiftPin, 0, 0);
      }
    };

    /* выводим в строку адрес текущие координаты */
    var setAddressValue = function () {
      addressInput.value = 'x: ' + Math.floor(pinMain.offsetLeft + pinMainWidth / 2 + 0.5) + ', y: ' + (pinMain.offsetTop + pinMainHeight);
    };

    /* удаляем слущатели событий */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', setAddressValue);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', setAddressValue);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', movePinMainHandler);

})();
