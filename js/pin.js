'use strict';
(function () {
  var baseSizePin = {
    'pinWidth': 56,
    'pinHeight': 75,
  };

  var keysCodes = {
    ESC: 27,
    ENTER: 13
  };

  var tokyoPinMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var oldPin = null;

  /**
   * создание блока автарки с указанием стилей и позиции размещения на карте
   *
   * @param {obj} array массив объектов предложений
   * @param {int} imgWidth ширина аватарки
   * @param {int} imgHeight высота аватарки
   * @return HTML блок для аватарки
   */

  var createAvatarBlock = function (array, imgWidth, imgHeight, counter) {
    var pinBlock = document.createElement('div');
    var imgBlock = document.createElement('img');
    pinBlock.dataset.countNumber = counter;
    pinBlock.tabIndex = 0;
    pinBlock.className = 'pin';
    pinBlock.style.left = (array['location']['x'] - imgWidth / 2) + 'px';
    pinBlock.style.top = (array['location']['y'] - imgHeight) + 'px';
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
   * @param {int} imgWidth ширина аватарки
   * @param {int} imgHeight высота аватарки
   */

  var createAvatars = function (array, imgWidth, imgHeight) {
    var avatarBlock = document.querySelector('.tokyo__pin-map');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(createAvatarBlock(array[i], imgWidth, imgHeight, i));
    }
    avatarBlock.appendChild(fragment);
  };
  createAvatars(window.currentOffers, baseSizePin['pinWidth'], baseSizePin['pinHeight']);
  /**
 * Производит поиск по родителя содержащий искомый css класс
 * Поднимается вверж от child пока не встретит родтеля с классом selector
 *
 * @param {obj} объект
 * @param {string} css class родителя
 * @returns возвращает найденный родитель с указанным css классом
 */

  function getParentBySelector(child, selector) {
    var node = child;
    while (node && !node.classList.contains(selector)) {
      node = node.parentElement;
    }
    return node;
  }
  /**
 * закрывает окно с информацией о предложении (слево вверху)
 *
 */

  function closeDialog() {
    if (!offerDialog.classList.contains('hidden')) {
      offerDialog.classList.add('hidden');
    }
  }

  /**
   * показывает окно с информацией о предложении,
   * добавлет класс pin--active к выбранной автарке
   * проверяет если на данный момент у другого pin (отличного от выбранного) класс pin--active и удаляет его
   *
   */

  function showAdDetails() {
    var pin = getParentBySelector(event.target, 'pin');
    if (pin && !pin.classList.contains('pin__main')) {
      pin.classList.add('pin--active');
      if (oldPin && oldPin !== pin) {
        oldPin.classList.remove('pin--active');
      }
      oldPin = pin;
      createDialog(currentOffers[pin.dataset.countNumber]);
      if (offerDialog.classList.contains('hidden')) {
        offerDialog.classList.remove('hidden');
      }
    }
  }

  /**
   * скрывает окно с информацией о предолжении и убирает подсветку у активной автарки на карте
   *
   */

  function doHiddenAdDetails() {
    offerDialog.classList.add('hidden');
    if (oldPin) {
      oldPin.classList.remove('pin--active');
    }
  }

  /**
   * закртие окна инфрмации о предложении
   *
   * @param {any} event
   */

  function hiddenAdDetails(event) {
    if (getParentBySelector(event.target, 'dialog__close')) {
      if (!offerDialog.classList.contains('hidden')) {
        doHiddenAdDetails();
      }
    }
  }

  function clickHandler(calldack) {
    return function (event) {
      calldack(event);
    };
  }

  function entterPressHandler(callback) {
    return function (event) {
      if (event.keyCode === keysCodes['ENTER']) {
        callback(event);
      }
    };
  }

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
