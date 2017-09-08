'use strict';

(function () {
  var avatarBlock = document.querySelector('.tokyo__pin-map'); // template для создания pin

    var filterPins = function (event, array, filter) {
      var doFilter1 = sortByType(array, filter['housing_type']['value'], 'type');
      var doFilter2 = getByPrice(doFilter1, filter['housing_price']['value'], 'price');
      var doFilter3 = sortArray(doFilter2, filter['housing_room-number']['value'], 'rooms');
      var doFilter4 = sortArray(doFilter3, filter['housing_guests-number']['value'], 'guests');
      console.log(doFilter4);
      clearMap();
      window.pin.createPins(doFilter4, avatarBlock);
  };

  var sortArray = function (array, data, check) {
    var filterRezult = null;
    var tmpArray = array.filter(function (item) {
        if (data === 'any') {
          filterRezult = (item.offer[check] !== false);
        } else {
          filterRezult = (item.offer[check] === Number(data));
        }
        return filterRezult;
      });
    return tmpArray;
  };

  var sortByType = function (array, data, check) {
    var filterRezult = null;
    var tmpArray = array.filter(function (item) {
        if (data === 'any') {
          filterRezult = (item.offer[check] !== false);
        } else {
          filterRezult = (item.offer[check] === data);
        }
        return filterRezult;
      });
    return tmpArray;
  };

  var getByPrice = function (array, data, check) {
    var filterRezult = null;
    var tmpArray = array.filter(function (item) {
      if (data === 'any') {
        filterRezult = item.offer[check] !== false;
      } else if (data === 'middle') {
        filterRezult = item.offer[check] <= 50000 && item.offer[check] >= 10000;
      } else if (data === 'low') {
        filterRezult = item.offer[check] <= 10000;
      } else if (data === 'high') {
        filterRezult = item.offer[check] >= 50000;
      }
      return filterRezult;
    });
    return tmpArray;
  };

  var clearMap = function () {
    var pins = avatarBlock.querySelectorAll('.pin:not(.pin__main)');
    for (var i = 0; i < pins.length; i++) {
      // pins[i].classList.add('hidden');
      pins[i].parentNode.removeChild(pins[i]);
    }
  };
  window.filter = {
    filterPins: filterPins
  };
}());
