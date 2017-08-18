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

/**
 * Выводит случайное кол-во элементов из массива
 *
 * @param {any} items массив значений
 * @returns массив с случайным кол-вом элементов
 */

var resortItems = function (items) {
  items.counter = 0;
  var tmpArray = [];
  var lenght = getItemLength(items);
  var currentLength = getRandomInt(1, lenght);

  for (var i = 0; i < currentLength; i++) {
    var elementPosition = getRandomInt(items.counter, items.length - 1);
    var element = items[elementPosition];
    items[elementPosition] = items.splice(items.counter, 1, items[elementPosition])[0];
    items.counter = items.counter === items.length - 1 ? 0 : items.counter + 1;
    tmpArray.push(element);
  }
  return tmpArray;
};

/**
 * Случайное целое число в диапазоне min max
 *
 * @param {any} min минимальное значение
 * @param {any} max максимальное значение
 * @returns случайное число
 */

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

/**
 * Вычисляет длинну элементов
 *
 * @param {any} items принимает массив
 * @returns длинну массива
 */

var getItemLength = function (items) {
  return items.length;
};

/**
 * Случайные элемент массива
 *
 * @param {any} items принимает массив
 * @returns случайный элемент массива
 */

var getRandomItem = function (items) {
  var allItems = getItemLength(items);
  var randomItem = getRandomInt(0, allItems - 1);
  return items[randomItem];
};

/**
 * Возвращает случайно элемент из массива
 * Возвращаемый элемент удаляется из массива
 * @param {any} items принимает массив
 * @returns случайный элемент массива
 */

var getRandomUniqueItem = function (items) {
  var allItems = getItemLength(items);
  var randomItem = getRandomInt(0, allItems - 1);
  return items.splice(randomItem, 1);
};

/**
 * Создает массив объектов содержащих данные предложений по сдаче квартир
 *
 * @param {any} numOffers кол-во предложений
 * @returns массив содержащий объекты в которых содержится информация по предложениям
 */

var createOffers = function (numOffers) {
  var offersArray = [];
  for (var i = 0; i < numOffers; i++) {
    var x = getRandomInt(baseValuesOffer['minX'] + baseValuesOffer['pinWidth'] / 2, baseValuesOffer['maxX'] + baseValuesOffer['pinWidth'] / 2);
    var y = getRandomInt(baseValuesOffer['minY'] + baseValuesOffer['pinHeight'], baseValuesOffer['maxY'] - baseValuesOffer['pinHeight']);
    var tmpRooms = getRandomInt(1, 5);
    offersArray[i] = {
      'author': {
        'avatar': 'img/avatars/user' + getRandomUniqueItem(baseValuesOffer['imgId']) + '.png'
      },
      'offer': {
        'title': getRandomUniqueItem(baseValuesOffer['titles']),
        'location': x + ' ' + y,
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
        'posX': x,
        'posY': y
      }
    };
  }
  return offersArray;
};

/**
 * создание блока автарки
 *
 * @param {any} items массов объектов предложений
 * @returns HTML блок для аватарки
 */

var createAvatarBlock = function (items) {
  var pinBlock = document.createElement('div');
  var imgBlock = document.createElement('img');

  pinBlock.className = 'pin';
  pinBlock.style.left = items['location']['posX'] + 'px';
  pinBlock.style.top = items['location']['posY'] + 'px';
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
 * @param {any} items массов объектов предложений
 */

var createAvatars = function (items) {
  var avatarBlock = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < getItemLength(items); i++) {
    fragment.appendChild(createAvatarBlock(items[i]));
  }
  avatarBlock.appendChild(fragment);
};

/**
 * Вывод информационного блока (слева вверху) с описанием предложения и информацией
 *
 * @param {any} items - первый объект из массива предложений
 */

var createDialog = function (items) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var lodgeItem = lodgeTemplate.cloneNode(true);
  var lodgeTitle = lodgeItem.querySelector('.lodge__title');
  var lodgeAddress = lodgeItem.querySelector('.lodge__address');
  var lodgePrice = lodgeItem.querySelector('.lodge__price');
  var lodgeType = lodgeItem.querySelector('.lodge__type');
  var lodgeRooms = lodgeItem.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckin = lodgeItem.querySelector('.lodge__checkin-time');
  var dialog = document.querySelector('.dialog');
  var dialogPanel = document.querySelector('.dialog__panel');

  lodgeTitle.textContent = items['offer']['title'];
  lodgeAddress.textContent = items['offer']['address'];
  lodgePrice.innerHTML = items['offer']['price'] + ' &#8381;/ночь';
  lodgeType.textContent = baseTypesOffer[items['offer']['type']];
  lodgeRooms.textContent = 'Для ' + items['offer']['guests'] + ' гостей в ' + items['offer']['rooms'] + ' комнатах';
  lodgeCheckin.textContent = 'Заезд после ' + items['offer']['checkin'] + ', выезд до ' + items['offer']['checkout'];

  for (var i = 0; i < getItemLength(items['offer']['features']); i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + items['offer']['features'][i];
    lodgeItem.querySelector('.lodge__features').appendChild(span);
  }

  lodgeItem.querySelector('.lodge__description').textContent = items['offer']['description'];
  document.querySelector('.dialog__title img').src = items['author']['avatar'];

  dialog.replaceChild(lodgeItem, dialogPanel);
};

var currentOffers = createOffers(countOffers);
createAvatars(currentOffers);
createDialog(currentOffers[0]);
