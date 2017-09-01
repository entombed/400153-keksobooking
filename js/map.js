'use strict';
(function () {
  /* переменная для работы с картой на которую размещаются аватарки (pin) */
  var avatarBlock = document.querySelector('.tokyo__pin-map');

  /* создание автарок (pin) */
  window.createAvatars(window.currentOffers, avatarBlock);

})();
