'use strict';

(function () {
  window.preview = {
    openBigPicture: function (element, data) {
      var bigPicture = document.querySelector('.big-picture');
      element.addEventListener('click', function () {
        bigPicture.classList.remove('hidden');
        window.picture.renderBigPhoto(data);
      });
      element.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, function () {
          bigPicture.classList.remove('hidden');
          window.picture.renderBigPhoto(data);
        });
      });
    },
    bigPhoto: function (responseData) {
      var pictures = document.querySelector('.pictures');
      var thumbnails = pictures.querySelectorAll('.picture');
      for (var i = 0; i < thumbnails.length; i++) {
        window.preview.openBigPicture(thumbnails[i], responseData[i]);
      }
    }
  };
})();
