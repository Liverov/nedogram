'use strict';

(function () {
  var XHR_TIMEOUT = 10000;

  var UPLOAD_METHOD = 'POST';
  var UPLOAD_URL = 'https://javascript.pages.academy/kekstagram';
  var UPLOAD_RESPONSE = 'json';

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  var formImage = document.querySelector('.img-upload__form');
  formImage.addEventListener('submit', function uploadToServer(evt) {
    evt.preventDefault();
    var formData = new FormData(formImage);
    var xhr = new XMLHttpRequest();
    xhr.responseType = UPLOAD_RESPONSE;

    xhr.open(UPLOAD_METHOD, UPLOAD_URL);

    xhr.addEventListener('load', function sendToServer() {
      switch (xhr.status) {
        case StatusCode.OK:
          window.modalForm.showSuccessMessage();
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

    xhr.send(formData);

    window.uploadPicture.removeEvents();
  });
})();
