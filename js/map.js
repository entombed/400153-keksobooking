'use strict';
(function () {

  /* переменная для работы с pin__main */
  var avatarBlock = document.querySelector('.tokyo__pin-map');
  var pinMain = avatarBlock.querySelector('.pin__main');

  /* переменная для работы с полем адрес */
  var addressInput = document.getElementById('address');

  /* размеры картинки pin__main */
  var pinMainWidth = pinMain.offsetWidth;
  var pinMainHeight = pinMain.offsetHeight;

  /* переменная для работы с картой на которой размещаются аватарки (pin) */
  var mapArea = document.querySelector('.tokyo');

  /* высота и ширина области перемещения pin__main */
  var mapAreaHeight = pinMain.offsetParent.offsetHeight;
  var mapAreaWidth = pinMain.offsetParent.offsetWidth;
  var tokyoFilter = mapArea.querySelector('.tokyo__filters-container');
  var tokyoFilterHeight = tokyoFilter.offsetHeight;

  /* все что выходит за границы области перемещения скрывается */
  mapArea.style.overflow = 'hidden';

  var loadData = function (data) {
    window.currentOffers = data;
    /* создание автарок (pin) */
    window.pin.createAvatars(data, avatarBlock);
  };

  /* загружаем данные с севрера */
  window.backend.load(loadData, window.util.sendRequestHandler);

  var movePinMainHandler = function (event) {
    event.preventDefault();

    /* блокируем ввод адреса руками в поле адрес */
    addressInput.setAttribute('readonly', 'readonly');

    /* текущая позиция pin__main */
    var currentPinPosition = {
      x: event.clientX,
      y: event.clientY
    };

    /*  */
    var mouseMoveHandler = function (moveEvt) {
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

      /* высчитываем текущие координаты перемещения pin__main */
      var pinAddressCoord = {
        x: pinMain.offsetLeft - shiftPin.x + Math.floor(pinMainWidth / 2),
        y: pinMain.offsetTop - shiftPin.y + pinMainHeight
      };

      /* ограничиваем зону перемещения pin ( условие pinAddressCoord.y >= 190 для того чтобы pin__main не выходил выше горизонта) */
      if (pinAddressCoord.x >= 0 && pinAddressCoord.x <= mapAreaWidth && pinAddressCoord.y >= 190 && pinAddressCoord.y <= mapAreaHeight - tokyoFilterHeight) {
        pinMain.style.top = (pinMain.offsetTop - shiftPin.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shiftPin.x) + 'px';
        /* выводим текущие кординаты в строку адрес */
        addressInput.value = 'x: ' + pinAddressCoord.x + ', y: ' + pinAddressCoord.y;
      }
    };

    /* удаляем слущатели событий */
    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  pinMain.addEventListener('mousedown', movePinMainHandler);

})();
