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
  'pinWidth': 0,
  'pinHeight': 0
};

var baseTypesOffer = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var countOffers = 9;

var resortItems = function (item) {
  return item.filter(function () {
    return Math.random() * 1000 >= 500;
  });
};

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var getItemLength = function (item) {
  return item.length;
};

var getRandomItem = function (array) {
  var allItems = getItemLength(array);
  var randomItem = getRandomInt(0, allItems - 1);
  return array[randomItem];
};

var getRandomPosition = function (minPos, maxPos) {
  return getRandomInt(minPos, maxPos);
};

var createOffers = function (numOffers) {
  var offersArray = [];
  for (var i = 0; i < numOffers; i++) {
    var x = getRandomPosition(baseValuesOffer['minX'] + baseValuesOffer['pinWidth'] / 2, baseValuesOffer['maxX'] + baseValuesOffer['pinWidth'] / 2);
    var y = getRandomPosition(baseValuesOffer['minY'] + baseValuesOffer['pinHeight'], baseValuesOffer['maxY'] - baseValuesOffer['pinHeight']);
    offersArray[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': getRandomItem(baseValuesOffer['titles']),
        'location': x + ' ' + y,
        'price': getRandomInt(baseValuesOffer['minPrice'], baseValuesOffer['maxPrice']),
        'type': getRandomItem(baseValuesOffer['type']),
        'rooms': getRandomInt(1, 5),
        'guests': getRandomInt(1, 10),
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
  console.log(offersArray);
  return offersArray;
};

var currentOffers = createOffers(countOffers);
