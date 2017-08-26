'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARDS_AMOUNT = 8;
var IMG_AMOUNT = 8;
var ROOMS_AMOUNT = 5;
var GUESTS_AMOUNT = 10;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var RUS_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var CHECK_TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_WIDTH = 56;
var PIN_HEIGHT = 75;
var empty = [];


// для обработки массивов
var getRandomRepeat = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomNoRepeat = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  var removed = arr.splice(rand, 1);
  return removed;
};

var getRandomInterval = function (min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));
  return rand;
};

var getRandomOrderLength = function (arr) {
  var copied = arr.slice();
  for (var i = 0; i < copied.length; i++) {
    var randIndex = Math.floor(Math.random() * copied.length);
    var rand = Math.random();
    if (rand < 0.5) {
      copied.splice(randIndex, 1);
    }
  }
  return copied;
};

var getArrAmount = function (amount) {
  var arr = [];
  var i = 0;
  while (i < amount) {
    arr[i] = ++i;
  }
  return arr;
};


// Получение массива объявлений
var getAdverts = function () {
  var imgArr = getArrAmount(IMG_AMOUNT);
  var adverts = [];
  for (var i = 0; i < WIZARDS_AMOUNT; i++) {
    adverts[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + getRandomNoRepeat(imgArr) + '.png'
      },
      'offer': {
        'title': getRandomNoRepeat(TITLES),
        'address': '',
        'price': getRandomInterval(1000, 1000000) + '&#x20bd;/ночь',
        'type': getRandomRepeat(TYPES),
        'rooms': getRandomInterval(1, ROOMS_AMOUNT),
        'guests': getRandomInterval(1, GUESTS_AMOUNT),
        'checkin': getRandomRepeat(CHECK_TIMES),
        'checkout': getRandomRepeat(CHECK_TIMES),
        'features': getRandomOrderLength(FEATURES),
        'description': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, iste. Temporibus ipsum, voluptas dignissimos adipisci ipsam dolorem iusto blanditiis quisquam.',
        'photos': empty
      },
      'location': {
        'x': getRandomInterval(300, 900),
        'y': getRandomInterval(100, 500)
      }
    };
    adverts[i].offer.address = adverts[i].location.x + ', ' + adverts[i].location.y;
  }
  return adverts;
};

var adverts = getAdverts();


// +++++++++++++++++++ПИНЫ и ОБЪЯВЛЕНИЯ++++++++++++++++++

var pinMap = document.querySelector('.tokyo__pin-map');
var pin = document.querySelector('.pin');

var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

dialog.classList.add('hidden');

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (document.querySelector('.pin--active')) {
      document.querySelector('.pin--active').classList.remove('pin--active');
    }
    dialog.classList.add('hidden');
  }
};


var closeDialog = function () {
  dialog.classList.add('hidden');
  if (document.querySelector('.pin--active')) {
    document.querySelector('.pin--active').classList.remove('pin--active');
  }
  document.removeEventListener('keydown', onEscPress);
};

var onDialogClosePress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
};

var onDialogCloseClick = function () {
  closeDialog();
};

dialogClose.addEventListener('click', onDialogCloseClick);
dialogClose.addEventListener('keydown', onDialogClosePress);


var activatePin = function (evt) {
  if (document.querySelector('.pin--active')) {
    document.querySelector('.pin--active').classList.remove('pin--active');
  }
  evt.currentTarget.classList.add('pin--active');
  document.addEventListener('keydown', onEscPress);
};

var onPinPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePin(evt);
  }
};

var onPinClick = function (evt) {
  activatePin(evt);
};

// пины
var renderPin = function (obj) {
  var pinElement = pin.cloneNode(true);

  var onPinPressAppendLodge = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      appendLodge(obj);
    }
  };

  var onPinClickAppendLodge = function () {
    appendLodge(obj);
  };

  pinElement.addEventListener('click', onPinClickAppendLodge, true);
  pinElement.addEventListener('keydown', onPinPressAppendLodge, true);
  pinElement.addEventListener('click', onPinClick, true);
  pinElement.addEventListener('keydown', onPinPress, true);

  pinElement.classList.remove('pin__main');
  pinElement.tabIndex = '0';
  pinElement.querySelector('img').src = obj.author.avatar;
  pinElement.style = 'left: ' + (obj.location.x - PIN_WIDTH / 2) + 'px; top: ' + (obj.location.y - PIN_HEIGHT) + 'px';

  return pinElement;
};


var appendPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  pinMap.appendChild(fragment);
};

appendPins(adverts);

// объявления
var renderLodge = function (arr) {
  var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');
  var lodgeElement = lodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = arr.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = arr.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = arr.offer.price;
  lodgeElement.querySelector('.lodge__type').textContent = RUS_TYPES[arr.offer.type];
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + arr.offer.guests + ' гостей в ' + arr.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + arr.offer.checkin + ' , выезд до ' + arr.offer.checkout;
  var keksFeatures = arr.offer.features;
  for (var i = 0; i < keksFeatures.length; i++) {
    lodgeElement.querySelector('.lodge__features').innerHTML += '<span class = "feature__image feature__image--' + keksFeatures[i] + '"></span>';
  }
  lodgeElement.querySelector('.lodge__description').textContent = arr.offer.description;
  return lodgeElement;
};

var appendLodge = function (obj) {
  var dialogPanel = document.querySelector('.dialog__panel');
  dialogPanel.parentElement.replaceChild(renderLodge(obj), dialogPanel);
  var dialogTitle = document.querySelector('.dialog__title');
  dialogTitle.querySelector('img').src = obj.author.avatar;
  dialog.classList.remove('hidden');
};
