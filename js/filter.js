'use strict';

(function () {
  var avatarBlock = document.querySelector('.tokyo__pin-map'); // template для создания pin

  var filterPins = function (event, array, filter) {
    switch (event.target.name.toLowerCase()) {
      case 'housing_type':
        console.log(filter['housing_type']['value']);
        break;
      case 'housing_price':
        console.log(filter['housing_price']['value']);
        break;
      case 'housing_room-number':
        console.log(filter['housing_room-number']['value']);
        break;
      case 'housing_guests-number':
        console.log(filter['housing_guests-number']['value']);
        break;
    }
  };

  var clearMap = function () {
      var pins = avatarBlock.querySelectorAll('.pin:not(.pin__main)');
      for (var i = 0; i < pins.length; i++) {
        pins[i].parentNode.removeChild(pins[i]);
      }
  };
  window.filter = {
    filterPins: filterPins
  }
}());
