'use strict';
(function () {

  /* Ширина и высота автарки (pin) */
  var baseSizePin = {
    'pinWidth': 56,
    'pinHeight': 75,
  };

  /* переменная для работы с окном (dialog) подробной информации о предложении */
  var offerDialog = document.querySelector('#offer-dialog');

  /* переменная для работы с картой на которой размещаются аватарки (pin) */
  var tokyoPinMap = document.querySelector('.tokyo__pin-map');

  /**
   * создание блока автарки с указанием стилей и позиции размещения на карте
   *
   * @param {obj} array массив объектов предложений
   * @param {int} counter число для атрибута data-count-number
   * @return HTML блок для аватарки
   */

  var createTemplatePin = function (array, counter) {
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

  var createPins = function (array, template) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createTemplatePin(array[i], i));
    }
    template.appendChild(fragment);
  };

  /* скрывает окно с информацией о предолжении и убирает подсветку у активной автарки на карте */
  var doHiddenDialogDetails = function () {
    offerDialog.classList.add('hidden');
    if (window.oldPin) {
      window.oldPin.classList.remove('pin--active');
    }
  };

  /**
   * закртие окна инфрмации о предложении
   *
   * @param {any} event
   */

  var hiddenDialogDetails = function (event) {
    if (window.util.getParentBySelector(event.target, 'dialog__close')) {
      if (!offerDialog.classList.contains('hidden')) {
        doHiddenDialogDetails();
      }
    }
  };

  /* скрывает окно с информацией */
  doHiddenDialogDetails();

  /* вешаем обработчики на аватарки расположенные на карте. клик мышки на автарке, enter на автарке в фокусе */
  tokyoPinMap.addEventListener('click', window.util.clickHandler(window.showCard.showCard));
  tokyoPinMap.addEventListener('keydown', window.util.enterPressHandler(window.showCard.showCard));

  /* вешаем обработчики на окно с подробной информацией о предолжении. клик мышки на крестике и enter на кнопке закрыто окно */
  offerDialog.addEventListener('click', window.util.clickHandler(hiddenDialogDetails));
  offerDialog.addEventListener('keydown', window.util.enterPressHandler(hiddenDialogDetails));

  /* вешаем обработчики на окно с подробной информацией о предолжении. закрытие по нажатию esc */
  document.addEventListener('keydown', window.util.escPressHandler(doHiddenDialogDetails));

  /* экспортируем в глобальную область видимости */
  window.pin = {
    createPins: createPins
  };
})();
