'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      window.responseData = xhr.response;
      window.renderPreview(window.responseData);
      window.bigPhoto(window.responseData);
    } else {
      throw Error('Ошибка: ' + xhr.status);
    }
  });
  xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
  xhr.send();
})();