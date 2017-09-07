'use strict';

(function () {
  var avatarBlock = document.querySelector('.tokyo__pin-map'); // template для создания pin


  var filterPins = function (event, array, filter) {
    switch (event.target.name.toLowerCase()) {
      case 'housing_type':
        //console.log(filter['housing_type']['value']);
        var check = 'type'
        sortArray(array, filter['housing_type']['value'], check);
        break;
      case 'housing_price':
//        console.log(filter['housing_price']['value']);
        break;
      case 'housing_room-number':
//        console.log(filter['housing_room-number']['value']);
        var check = 'rooms';
        sortArray(array, filter['housing_room-number']['value'], check);
        break;
      case 'housing_guests-number':
//        console.log(filter['housing_guests-number']['value']);
        var check = 'guests';
        sortArray(array, filter['housing_guests-number']['value'], check);
        break;
    }
  };

  var sortArray = function (array, data, check) {

    if (data == 'any') {
      newA = array;
    } else {
      var newA = array.filter(function (room) {
        return room.offer[check] == data;
      });
    }
    clearMap();
    window.pin.createPins(newA, avatarBlock);
    console.log(check);
    console.log(newA);
  }

  var clearMap = function () {
    var pins =  avatarBlock.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
  };
  window.filter = {
    filterPins: filterPins
  }
}());
