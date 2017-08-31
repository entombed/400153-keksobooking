'use strict';
(function () {

/* Ширина и высота автарки (pin) */
  var baseSizePin = {
    'pinWidth': 56,
    'pinHeight': 75,
  };

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

})();
