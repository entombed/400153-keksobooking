'use strict';
(function () {

  /* Ширина и высота автарки (pin) */
  var baseSizePin = {
    'pinWidth': 56,
    'pinHeight': 75,
  };

  /* переменная в которую записывается текущий элемент с классом pin--active */
  var oldPin = null;

  /* переменная для работы с окном (dialog) подробной информации о предложении */
  var offerDialog = document.querySelector('#offer-dialog');

  /* переменная для работы с картой на которой размещаются аватарки (pin) */
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  // var avatarBlock = document.querySelector('.tokyo__pin-map');

  /**
   * создание блока автарки с указанием стилей и позиции размещения на карте
   *
   * @param {obj} array массив объектов предложений
   * @param {int} counter число для атрибута data-count-number
   * @return HTML блок для аватарки
   */

  var createAvatarBlock = function (array, counter) {
    var pinBlock = document.createElement('div');
    var imgBlock = document.createElement('img');
    pinBlock.dataset.countNumber = counter;
    pinBlock.tabIndex = 0;
    pinBlock.className = 'pin';
    pinBlock.style.left = (array['location']['x'] - baseSizePin['pinWidth'] / 2) + 'px';
    pinBlock.style.top = (array['location']['y'] - baseSizePin['pinHeight']) + 'px';
    imgBlock.className = 'rounded';
    imgBlock.width = 40;
    imgBlock.height = 40;
    imgBlock.src = array['author']['avatar'];
    pinBlock.appendChild(imgBlock);
    return pinBlock;
  };

  /**
   * добавление аватарок в HTML
   *
   * @param {obj} array массив объектов предложений
   * @param {obj} template карта на которой размещаются аватарки (pin)
   */

  var createAvatars = function (array, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createAvatarBlock(array[i], i));
    }
    template.appendChild(fragment);
  };

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

  /* вешаем обработчики на аватарки расположенные на карте. клик мышки на автарке, enter на автарке в фокусе */
  tokyoPinMap.addEventListener('click', window.clickHandler(showAdDetails));
  tokyoPinMap.addEventListener('keydown', window.entterPressHandler(showAdDetails));

  /* вешаем обработчики на окно с подробной информацией о предолжении. клик мышки на крестике и enter на кнопке закрыто окно */
  offerDialog.addEventListener('click', window.clickHandler(hiddenAdDetails));
  offerDialog.addEventListener('keydown', window.entterPressHandler(hiddenAdDetails));

  /* вешаем обработчики на окно с подробной информацией о предолжении. закрытие по нажатию esc */
  document.addEventListener('keydown', window.escPressHandler(doHiddenAdDetails));

  /* скрывает окно с информацией */
  closeDialog();

  /* экспортируем в глобальную область видимости */
  window.createAvatars = createAvatars;
})();
