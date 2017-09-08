'use strict';
(function () {

  /* Переменная для работы с окном (dialog) подробной мнформации о предложении */
  var dialog = document.querySelector('#offer-dialog');
  var dialogAvatar = dialog.querySelector('.dialog__title img');

  /* Переменная для шаблона окна (dialog) */
  var lodgeTemplate = document.querySelector('#lodge-template').content;

  var baseTypesOffer = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  /* Создание окна (dialog) с подробной информацией о предложении*/
  var createDialog = function (array) {
    var lodgeItem = lodgeTemplate.cloneNode(true);
    var dialogPanel = dialog.querySelector('.dialog__panel');
    lodgeItem.querySelector('.lodge__title').textContent = array['offer']['title'];
    lodgeItem.querySelector('.lodge__address').textContent = array['offer']['address'];
    lodgeItem.querySelector('.lodge__price').innerHTML = array['offer']['price'] + '&#x20bd;/ночь';
    lodgeItem.querySelector('.lodge__type').textContent = baseTypesOffer[array['offer']['type']];
    lodgeItem.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + array['offer']['guests'] + ' гостей в ' + array['offer']['rooms'] + ' комнатах';
    lodgeItem.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + array['offer']['checkin'] + ', выезд до ' + array['offer']['checkout'];

    for (var i = 0; i < array['offer']['features'].length; i++) {
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + array['offer']['features'][i];
      lodgeItem.querySelector('.lodge__features').appendChild(span);
    }

    lodgeItem.querySelector('.lodge__description').textContent = array['offer']['description'];
    dialogAvatar.src = array['author']['avatar'];

    dialog.replaceChild(lodgeItem, dialogPanel);
  };

  /* скрывает окно с информацией о предолжении и убирает подсветку у активной автарки на карте */
  var doHiddenDialogDetails = function () {
    dialog.classList.add('hidden');
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
      if (!dialog.classList.contains('hidden')) {
        doHiddenDialogDetails();
      }
    }
  };

  /* скрывает окно с информацией */
  doHiddenDialogDetails();

  /* вешаем обработчики на окно с подробной информацией о предолжении. клик мышки на крестике и enter на кнопке закрыто окно */
  dialog.addEventListener('click', window.util.clickHandler(hiddenDialogDetails));
  dialog.addEventListener('keydown', window.util.enterPressHandler(hiddenDialogDetails));

  /* вешаем обработчики на окно с подробной информацией о предолжении. закрытие по нажатию esc */
  document.addEventListener('keydown', window.util.escPressHandler(doHiddenDialogDetails));

  /* экспортируем в глобальную зону видимости */
  window.card = {
    create: createDialog
  };
})();
