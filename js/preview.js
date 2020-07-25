'use strict';

(function () {
  var arrPhotos = window.data.generatePhotos(window.data.PHOTOS_QUANTITY);
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var thumbnails = pictures.querySelectorAll('.picture');
  
  window.preview = {
    openBigPicture: function (element, data) {
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
    }
  };

  // previewThumbnails
  window.bigPhoto = function(responseData) {
    for (var i = 0; i < thumbnails.length; i++) {
      window.preview.openBigPicture(thumbnails[i], responseData[i]);
    }
  }
})();
