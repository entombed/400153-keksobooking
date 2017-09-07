'use strict';

(function () {
  var avatarBlock = document.querySelector('.tokyo__pin-map'); // template для создания pin


  var filterPins = function (event, array, filter) {
    var check = null;
    switch (event.target.name.toLowerCase()) {
      case 'housing_type':
// проверяем тип
        check = 'type';
        sortArray(array, filter['housing_type']['value'], check);
        break;
      case 'housing_price':
// проверяем цену
        check = 'price';
        getByPrice(array, filter['housing_price']['value'], check);
        break;
      case 'housing_room-number':
// кол-во комнат
        check = 'rooms';
        sortArray(array, Number(filter['housing_room-number']['value']), check);
        break;
      case 'housing_guests-number':
// кол-во гостей
        check = 'guests';
        sortArray(array, Number(filter['housing_guests-number']['value']), check);
        break;
    }
  };

  var sortArray = function (array, data, check) {
    if (data === 'any') {
      newA = array;
    } else {
      var newA = array.filter(function (item) {
        return item.offer[check] === data;
      });
    }
    clearMap();
    window.pin.createPins(newA, avatarBlock);
    console.log(check);
    console.log(newA);
  };

  var getByPrice = function (array, data, check) {
    var newA = array.filter(function (item) {
      var rez = null;
      if (data === 'middle') {
        rez = item.offer[check] <= 50000 && item.offer[check] >= 10000;
      } else if (data === 'low') {
        rez = item.offer[check] <= 10000;
      } else if (data === 'high') {
        rez = item.offer[check] >= 50000;
      }
      return rez;
    });
    clearMap();
    window.pin.createPins(newA, avatarBlock);
    console.log(check);
    console.log(newA);
  };

  var clearMap = function () {
    var pins = avatarBlock.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.add('hidden');
    }
  };
  window.filter = {
    filterPins: filterPins
  };
}());
