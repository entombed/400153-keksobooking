'use strict';

var baseValuesOffer = {
  'titles': ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  'type': ['flat', 'house', 'bungalo'],
  'checkin': ['12:00', '13:00', '14:00'],
  'checkout': ['12:00', '13:00', '14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'minX': 300,
  'maxX': 900,
  'minY': 100,
  'maxY': 500,
  'minPrice': 1000,
  'maxPrice': 1000000,
  'pinWidth': 56,
  'pinHeight': 75,
  'imgId': ['01', '02', '03', '04', '05', '06', '07', '08']
};

var baseTypesOffer = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var countOffers = 8;
var lodgeTemplate = document.querySelector('#lodge-template').content;

/**
 * Создает копию массива
 *
 * @param {array} items массив значений
 * @return копию массива
 */

/**
 * Случайное кол-во элементов из массива
 *
 * @param {array} items
 * @return массив элементов
 */

var resortItems = function (items) {
  items.counter = 0;
  var tmpArray = [];
  var length = items.length;
  var currentLength = getRandomInt(1, length);

  for (var i = 0; i < currentLength; i++) {
    var elementPosition = getRandomInt(items.counter, length - 1);
    var element = items[elementPosition];
    items[elementPosition] = items.splice(items.counter, 1, items[elementPosition])[0];
    items.counter = items.counter === length - 1 ? 0 : items.counter + 1;
    tmpArray.push(element);
  }
  return tmpArray;
};

/**
 * Случайное целое число в диапазоне min max
 *
 * @param {int} min минимальное значение
 * @param {int} max максимальное значение
 * @return случайное число
 */

var getRandomInt = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

/**
 * Случайные элемент массива
 *
 * @param {array} items принимает массив
 * @return случайный элемент массива
 */

var getRandomItem = function (items) {
  var length = items.length;
  var randomItem = getRandomInt(0, length - 1);
  return items[randomItem];
};

/**
 * Возвращает уникальный элемент из массива
 *
 * @param {array} items принимает массив
 * @return уникальный элемент из массива
 */

function getUniqueItem(array, i) {
  var currentIndex = i || 0;
  var index = getRandomInt(currentIndex, array.length - 1);
  var tmp = null;
  var value = array[index];
  tmp = array[currentIndex];
  array[currentIndex] = array[index];
  array[index] = tmp;
  return value;
}


/**
 * Создает массив объектов содержащих данные предложений по сдаче квартир
 *
 * @param {int} numOffers кол-во предложений
 * @return массив содержащий объекты в которых содержится информация по предложениям
 */

var createOffers = function (numOffers) {
  var offersArray = [];
  for (var i = 0; i < numOffers; i++) {
    var posX = getRandomInt(baseValuesOffer['minX'], baseValuesOffer['maxX']);
    var posY = getRandomInt(baseValuesOffer['minY'], baseValuesOffer['maxY']);
    var tmpRooms = getRandomInt(1, 5);
    offersArray[i] = {
      'author': {
        'avatar': 'img/avatars/user' + getUniqueItem(baseValuesOffer['imgId'], i) + '.png'
      },
      'offer': {
        'title': getUniqueItem(baseValuesOffer['titles'], i),
        'location': posX + ', ' + posY,
        'price': getRandomInt(baseValuesOffer['minPrice'], baseValuesOffer['maxPrice']),
        'type': getRandomItem(baseValuesOffer['type']),
        'rooms': tmpRooms,
        'guests': getRandomInt(1, tmpRooms * 2),
        'checkin': getRandomItem(baseValuesOffer['checkin']),
        'checkout': getRandomItem(baseValuesOffer['checkout']),
        'features': resortItems(baseValuesOffer['features']),
        'description': '',
        'photos': []
      },
      'location': {
        'x': posX,
        'y': posY
      }
    };
  }
  return offersArray;
};

/**
 * создание блока автарки с указанием стилей и позиции размещения на карте
 *
 * @param {obj} items массов объектов предложений
 * @param {int} imgWidth ширина аватарки
 * @param {int} imgHeight высота аватарки
 * @return HTML блок для аватарки
 */

var createAvatarBlock = function (items, imgWidth, imgHeight, counter) {
  var pinBlock = document.createElement('div');
  var imgBlock = document.createElement('img');
  imgBlock.dataset.countNumber = counter;
  imgBlock.setAttribute('tabindex', '0');

  pinBlock.className = 'pin';
  pinBlock.style.left = (items['location']['x'] - imgWidth / 2) + 'px';
  /*
  при вычислении по Y аватарки попадают в зону над горизонтом,
  baseValuesOffer['minY'] = 100 маловато значение, если поставить 200 будет выглядеть лучше
  */
  pinBlock.style.top = (items['location']['y'] - imgHeight) + 'px';
  imgBlock.className = 'rounded';
  imgBlock.width = 40;
  imgBlock.height = 40;
  imgBlock.src = items['author']['avatar'];
  pinBlock.appendChild(imgBlock);
  return pinBlock;
};

/**
 * добавление аватарок в HTML
 *
 * @param {obj} items items массов объектов предложений
 * @param {int} imgWidth ширина аватарки
 * @param {int} imgHeight высота аватарки
 */

var createAvatars = function (items, imgWidth, imgHeight) {
  var avatarBlock = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < items.length; i++) {
    fragment.appendChild(createAvatarBlock(items[i], imgWidth, imgHeight, i));
  }
  avatarBlock.appendChild(fragment);
};

/**
 * Вывод информационного блока (слева вверху) с описанием предложения и информацией
 *
 * @param {array} items - первый объект из массива предложений
 * @param {any} template - шаблон который используется для создания контента
 */



var createDialog = function (items) {
  var lodgeItem = lodgeTemplate.cloneNode(true);
  var lodgeTitle = lodgeItem.querySelector('.lodge__title');
  var lodgeAddress = lodgeItem.querySelector('.lodge__address');
  var lodgePrice = lodgeItem.querySelector('.lodge__price');
  var lodgeType = lodgeItem.querySelector('.lodge__type');
  var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckin = lodgeItem.querySelector('.lodge__checkin-time');
  var dialog = document.querySelector('.dialog');
  var dialogPanel = dialog.querySelector('.dialog__panel');

  lodgeTitle.textContent = items['offer']['title'];
  lodgeAddress.textContent = items['offer']['address'];
  lodgePrice.innerHTML = items['offer']['price'] + '&#x20bd;/ночь';
  lodgeType.textContent = baseTypesOffer[items['offer']['type']];
  lodgeRooms.textContent = 'Для ' + items['offer']['guests'] + ' гостей в ' + items['offer']['rooms'] + ' комнатах';
  lodgeCheckin.textContent = 'Заезд после ' + items['offer']['checkin'] + ', выезд до ' + items['offer']['checkout'];

  for (var i = 0; i < items['offer']['features'].length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + items['offer']['features'][i];
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  }

  lodgeItem.querySelector('.lodge__description').textContent = items['offer']['description'];
  dialog.querySelector('.dialog__title img').src = items['author']['avatar'];

  dialog.replaceChild(lodgeItem, dialogPanel);
};

var currentOffers = createOffers(countOffers);
createAvatars(currentOffers, baseValuesOffer['pinWidth'], baseValuesOffer['pinHeight']);
createDialog(currentOffers[0]);

//+++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++

var keysCodes = {
  ESC: 27,
  ENTER: 13
};
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var pinsTokyoPinMap = tokyoPinMap.querySelectorAll('.pin:not(.pin__main)');
var offerDialog = document.querySelector('#offer-dialog');
var offerDialogClose = offerDialog.querySelector('.dialog__close');

var pinClickHendler = function (event) {
  if ((event.keyCode === keysCodes['ENTER'] || event.type === 'click') && (event.target.tagName.toLowerCase() === 'img')) {
    var target = event.currentTarget;
    removeCurrentActivePin();
    addClassToCurrentPin(target);
    dialogOpenWindow(event, currentOffers);
  }
};

var addClassToCurrentPin = function (target) {
  target.classList.add('pin--active');
};

var removeCurrentActivePin = function () {
  var currentActivePin = tokyoPinMap.querySelector('.pin--active');
  if (currentActivePin) {
    currentActivePin.classList.remove('pin--active');
  }
};

var dialogOpenWindow = function (event, array) {
  var i = event.target.dataset.countNumber;
  createDialog(array[i]);
  offerDialog.classList.remove('hidden');
};

var dialogCloseClickHendler = function () {
  if (event.keyCode === keysCodes['ESC'] || event.type === 'click') {
    offerDialog.classList.add('hidden');
    removeCurrentActivePin();
  }
};


for (var i = 0; i < pinsTokyoPinMap.length; i++) {
  pinsTokyoPinMap[i].addEventListener('click', pinClickHendler);
  pinsTokyoPinMap[i].addEventListener('keydown', pinClickHendler);
}


offerDialogClose.addEventListener('click', dialogCloseClickHendler);
window.addEventListener('keydown', dialogCloseClickHendler);
