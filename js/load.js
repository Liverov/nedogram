'use strict';

(function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      window.responseData = xhr.response;
      //console.log(window.responseData);
      window.addPhoto(window.responseData);
      //window.bigPhoto(window.responseData);
      // window.clickBigPhotoHandler();
      // window.renderFilterBar();
    } else {
      throw Error('Ошибка: ' + xhr.status);
    }
  });
  xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
  xhr.send();
})();