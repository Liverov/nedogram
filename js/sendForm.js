'use strict';

(function () {
  var XHR_TIMEOUT = 3000;

  var formImage = document.querySelector('#upload-select-image');
  formImage.addEventListener('submit', function submitHandler(evt) {
    evt.preventDefault();

    var formData = new FormData(formImage);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function submitFormHandler() {
      if (xhr.status === 200) {
        window.uploadPicture.removeEventsHandler();
        window.modalForm.showSuccessMessage();
      } else {
        window.uploadPicture.removeEventsHandler();
        window.modalForm.showErrorMessage();
        throw Error('Ошибка: ' + xhr.status + ' - ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      window.modalForm.showErrorMessage();
    });

    xhr.addEventListener('timeout', function () {
      window.modalForm.showErrorMessage();
    });

    xhr.timeout = XHR_TIMEOUT;
    xhr.open('POST', 'https://javascript.pagesx.academy/kekstagram');
    xhr.send(formData);
  });
})();
