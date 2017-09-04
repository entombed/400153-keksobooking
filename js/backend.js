'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';
  var noticeForm = document.querySelector('.notice__form');

  var sendRequestHandler = function (errorMessage) {
    var msgBlock = document.createElement('div');
    msgBlock.classList.add('errorMsgForm');
    msgBlock.style.margin = 'auto';
    msgBlock.style.padding = '10px';
    msgBlock.style.textAlign = 'center';
    msgBlock.style.backgroundColor = 'red';
    msgBlock.style.position = 'relative';
    msgBlock.style.left = '0px';
    msgBlock.style.right = '0px';
    msgBlock.style.fontSize = '25px';
    msgBlock.style.color = 'white';
    msgBlock.textContent = errorMessage;
    noticeForm.insertAdjacentElement('beforeend', msgBlock);
  };

  var sendRequest = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 404:
          onError(xhr.status + 'Запрошенный документ отсутствует на сервере.');
          break;
        case 500:
          onError(xhr.status + 'Внутренняя ошибка сервера.');
          break;
        default:
          onError('Хьюстон у нас проблема, что то пошло не так. Код ошибки ' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Проверьте подключение к интернету.');
    });

    xhr.addEventListener('timeout', function () {
      onError('Превышено время соединения. Запрос не выполнился за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 4000;

    xhr.open(method, url);

    xhr.send(data);

  };
  var load = function (onLoad, onError) {
      sendRequest('GET', URL + '/data', onLoad, onError);
  };

  var save = function (onLoad, onError, data) {
      sendRequest('POST', URL, onLoad, onError, data);
  };

  /* экспортируем в глобальную зону видимости */
  window.load = load;
  window.save = save;
  window.sendRequestHandler = sendRequestHandler
})();
