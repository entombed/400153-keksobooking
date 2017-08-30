'use strict';
(function () {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var baseTypesOffer = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var createDialog = function (array) {
    var lodgeItem = lodgeTemplate.cloneNode(true);
    var dialog = document.querySelector('.dialog');
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
    dialog.querySelector('.dialog__title img').src = array['author']['avatar'];

    dialog.replaceChild(lodgeItem, dialogPanel);
  };
})();
