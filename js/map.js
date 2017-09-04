'use strict';
(function () {

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

  var getData = function (data) {
    window.currentOffers = data;
    /* создание автарок (pin) */
    window.pin.createAvatars(data, avatarBlock);
  };

  /* загружаем данные с севрера */
  window.backend.load(getData, window.backend.sendRequestHandler);

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

      /* высчитываем текущие координаты перемещения pin */
      var pinAddressCoord = {
        x: pinMain.offsetLeft - shiftPin.x + Math.floor(pinMainWidth / 2),
        y: pinMain.offsetTop - shiftPin.y + pinMainHeight
      };

      /* ограничиваем зону перемещения pin ( условие pinAddressCoord.y >= 190 для того чтобы pin не выходил выше горизонта) */
      if (pinAddressCoord.x >= 0 && pinAddressCoord.x <= MapAreaWidth && pinAddressCoord.y >= 190 && pinAddressCoord.y <= MapAreaHeight - tokyoFilterHeight) {
        pinMain.style.top = (pinMain.offsetTop - shiftPin.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shiftPin.x) + 'px';
        /* выводим текущие кординаты в строку адрес */
        addressInput.value = 'x: ' + pinAddressCoord.x + ', y: ' + pinAddressCoord.y;
      }
    };

    /* удаляем слущатели событий */
    var MouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', MouseMoveHandler);
      document.removeEventListener('mouseup', MouseUpHandler);
    };

    document.addEventListener('mousemove', MouseMoveHandler);
    document.addEventListener('mouseup', MouseUpHandler);
  };

  pinMain.addEventListener('mousedown', movePinMainHandler);
  // window.map = {
  //   currentOffers: currentOffers
  // };
})();
