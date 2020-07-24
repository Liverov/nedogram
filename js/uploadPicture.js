'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var uploadFile = pictures.querySelector('#upload-file');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var uploadCancel = pictures.querySelector('#upload-cancel');
  console.log('upPicture' + document.querySelector('.picture'));
  window.uploadPicture = {
    closeModal: function () {
      uploadFile.value = '';
      uploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', window.uploadPicture.closeModal);
    },
    closeEscModal: function (evt) {
      window.utils.isEscEvent(evt, function () {
        uploadFile.value = '';
        uploadOverlay.classList.add('hidden');
        document.removeEventListener('keydown', window.uploadPicture.closeModal);
      });
    },
    openModal: function () {
      document.querySelector('body').classList.add('modal-open');
      uploadOverlay.classList.remove('hidden');
      // Вешаем закрытие онка только если открыто модальное
      document.addEventListener('keydown', window.uploadPicture.closeEscModal);
      uploadCancel.addEventListener('click', window.uploadPicture.closeModal);
    }
  };

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.uploadPicture.openModal();
  });

})();
