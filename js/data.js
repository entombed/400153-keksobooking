'use strict';
(function () {
  /* базовые параметры для генерации информации о предложения */
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
    'types': ['flat', 'house', 'bungalo', 'palace'],
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

  /* количество предложений сдачи в аренду жилья*/
  var countOffers = 8;

  /* объект содержащий предолжеия по сдачи жилья */
  var createOffers = function (numOffers) {
    var offersArray = [];
    for (var i = 0; i < numOffers; i++) {
      var posX = window.getRandomInt(baseValuesOffer['minX'], baseValuesOffer['maxX']);
      var posY = window.getRandomInt(baseValuesOffer['minY'], baseValuesOffer['maxY']);
      var tmpRooms = window.getRandomInt(1, 5);
      offersArray[i] = {
        'author': {
          'avatar': 'img/avatars/user' + window.getUniqueItem(baseValuesOffer['imgId'], i) + '.png'
        },
        'offer': {
          'title': window.getUniqueItem(baseValuesOffer['titles'], i),
          'location': posX + ', ' + posY,
          'price': window.getRandomInt(baseValuesOffer['minPrice'], baseValuesOffer['maxPrice']),
          'type': window.getRandomItem(baseValuesOffer['types']),
          'rooms': tmpRooms,
          'guests': window.getRandomInt(1, tmpRooms * 2),
          'checkin': window.getRandomItem(baseValuesOffer['checkin']),
          'checkout': window.getRandomItem(baseValuesOffer['checkout']),
          'features': window.resortItems(baseValuesOffer['features']),
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
  /* создаем объект с предложениями */
  var currentOffers = createOffers(countOffers);

  /* экспортируем в глобальную область видимости */
  window.data = {
    currentOffers: currentOffers
  };
})();
