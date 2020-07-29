'use strict';

(function () {
  var XHR_TIMEOUT = 3000;

  var LOAD_METHOD = 'GET';
  var LOAD_URL = 'https://javascript.pages.academy/kekstagram/data';
  var LOAD_RESPONSE = 'json';

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var xhr = new XMLHttpRequest();
  xhr.responseType = LOAD_RESPONSE;

  xhr.open(LOAD_METHOD, LOAD_URL);

  xhr.addEventListener('load', function () {
    switch (xhr.status) {
      case StatusCode.OK:
        var responseData = xhr.response;
        window.picture.successData(responseData);
        window.sort.showFilterBarOnPage();
        break;

      case StatusCode.BAD_REQUEST:
        window.modalForm.showErrorMessage('Сервер не смог обработать запрс');
        break;

      case StatusCode.FORBIDDEN:
        window.modalForm.showErrorMessage('Доступ запрещен');
        break;

      case StatusCode.NOT_FOUND:
        window.modalForm.showErrorMessage('Запрашиваемая страница не найдена, проверьте правильность написания адреса');
        break;

      case StatusCode.SERVER_ERROR:
        window.modalForm.showErrorMessage('Внутренняя ошибка сервера');
        break;

      default:
        window.modalForm.showErrorMessage('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    }
  });

  xhr.timeout = XHR_TIMEOUT;

  xhr.addEventListener('error', function () {
    window.modalForm.showErrorMessage('Ошибка соединения');
  });

  xhr.addEventListener('timeout', function () {
    window.modalForm.showErrorMessage('Запрос не успел отработать за ' + xhr.timeout + 'мс');
  });

  xhr.send();
})();
