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

  /* экспортируем в глобальную область видимости */
  window.pin = {
    create: createPins
  };
})();
