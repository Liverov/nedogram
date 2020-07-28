'use strict';

(function () {
  var XHR_TIMEOUT = 3000;

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      window.responseData = xhr.response;
      window.picture.successData(window.responseData);
      window.filters.showFilterBarOnPage();
    } else {
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
  xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
  xhr.send();
})();
