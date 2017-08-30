'use strict';

var baseValuesOffer = {
  'titles': [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
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
  'imgId': ['01', '02', '03', '04', '05', '06', '07', '08']
};

var baseTypesOffer = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var baseSizePin = {
  'pinWidth': 56,
  'pinHeight': 75
};

var keysCodes = {
  ESC: 27,
  ENTER: 13
};

var countOffers = 8;
var lodgeTemplate = document.querySelector('#lodge-template').content;
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var offerDialog = document.querySelector('#offer-dialog');
var oldPin = null;

/**
 * Случайное кол-во элементов из массива
 *
 * @param {array} array
 * @return массив элементов
 */

var resortItems = function (array) {
  var tmpArray = [];
  var currentLength = getRandomInt(1, array.length);
  for (var i = 0; i < currentLength; i++) {
    tmpArray.push(getUniqueItem(array, i));
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
 * @param {array} array принимает массив
 * @return случайный элемент массива
 */

var getRandomItem = function (array) {
  var length = array.length;
  var randomItem = getRandomInt(0, length - 1);
  return array[randomItem];
};

/**
 * Возвращает уникальный элемент из массива
 *
 * @param {array} array принимает массив
 * @param {int} i число
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

/**
 * Вывод информационного блока (слева вверху) с описанием предложения и информацией
 *
 * @param {array} array - первый объект из массива предложений
 */

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

var currentOffers = createOffers(countOffers);
createAvatars(currentOffers, baseSizePin['pinWidth'], baseSizePin['pinHeight']);

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

// ++++++++++++++++++++++++++++++++++++++++++++++++
// Переменные формы с объявлением
var form = document.querySelector('.notice__form');
var title = form.querySelector('#title');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var address = form.querySelector('#address');

var statusFill = true;

// Сброс формы по умолчанию
var resetToDefaultForm = function () {
  form.reset();
  title.required = true;
  title.minLength = 30;
  title.maxLength = 100;
  price.required = true;
  price.type = 'number';
  price.min = 0;
  price.max = 1000000;
  price.value = 1000;
  type.value = 'flat';
  address.required = true;
  form.action = 'https://1510.dump.academy/keksobooking';
  roomNumber.value = 1;
  capacity.value = 1;
};

resetToDefaultForm();

// Автоматическая корректировка полей взаимозависимых полей формы
var correctCheckinCheckout = function (element1, element2) {
  element1.addEventListener('change', function () {
    element2.value = element1.value;
  });
};

correctCheckinCheckout(timeIn, timeOut);
correctCheckinCheckout(timeOut, timeIn);

// Зависимость количеества мест от количества комнат
roomNumber.addEventListener('change', function () {
  for (var i = 0; i < capacity.options.length; i++) {
    capacity.options[i].disabled = false;
  }
  switch (roomNumber.value) {
    case '1':
      capacity.value = '1';
      for (i = 0; i < capacity.options.length; i++) {
        if (i === 2) {
          continue;
        }
        capacity.options[i].disabled = true;
      }
      break;
    case '2':
      capacity.value = '2';
      for (i = 0; i < capacity.options.length; i++) {
        if (i === 2 || i === 1) {
          continue;
        }
        capacity.options[i].disabled = true;
      }
      break;
    case '3':
      capacity.value = '3';
      for (i = 0; i < capacity.options.length; i++) {
        if (i === 3) {
          capacity.options[i].disabled = true;
        }
      }
      break;
    case '100':
      capacity.value = '0';
      for (i = 0; i < capacity.options.length; i++) {
        if (i === 3) {
          continue;
        }
        capacity.options[i].disabled = true;
      }
      break;
  }
});
// Синхронизация значения поля «Тип жилья» с минимальной ценой объявления
type.addEventListener('change', function () {
  switch (type.value) {
    case 'bungalo':
      price.value = 0;
      break;
    case 'flat':
      price.value = 1000;
      break;
    case 'house':
      price.value = 5000;
      break;
    case 'palace':
      price.value = 10000;
      break;
  }
});

var changeStyleBorderColor = function (fill, check) {
  fill.style.borderColor = '';
  statusFill = true;
  if (!check) {
    fill.style.borderColor = 'red';
    statusFill = false;
  }
};

var checkDataInFill = function (fill, currentValue, min, max) {
  changeStyleBorderColor(fill, true);
  if (currentValue < min || currentValue > max || fill.value.length === 0) {
    changeStyleBorderColor(fill, false);
  }
};

// проверяем что цена указана правильно
price.addEventListener('blur', function () {
  checkDataInFill(price, Number(price.value), Number(price.min), Number(price.max));
});

// проверяем длинну поля адресс
address.addEventListener('blur', function () {
  changeStyleBorderColor(address, true);
  if (!address.value) {
    changeStyleBorderColor(address, false);
  }
});

// проверяем длинну поля заголовок
title.addEventListener('blur', function () {
  checkDataInFill(title, title.value.length, title.minLength, title.maxLength);
});

// Проверка правильности заполнения полей формы перед отправкой
form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (statusFill) {
    form.submit();
    resetToDefaultForm();
  }
});
