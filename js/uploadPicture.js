'use strict';

(function () {
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var pictures = document.querySelector('.pictures');
  var uploadFile = pictures.querySelector('#upload-file');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var uploadCancel = pictures.querySelector('#upload-cancel');
  var picturePreview = uploadOverlay.querySelector('.img-upload__preview');
  var pictureImgPreview = picturePreview.querySelector('img');

  window.uploadPicture = {
    closeModalHandler: function () {
      uploadFile.value = '';
      uploadOverlay.classList.add('hidden');
      document.removeEventListener('keydown', window.uploadPicture.closeModalHandler);
      uploadCancel.removeEventListener('click', window.uploadPicture.closeModalHandler);
      document.querySelector('#upload-select-image').reset();
      window.effects.resetSlider();
    },
    closeEscModalHandler: function (evt) {
      window.utils.isEscEvent(evt, function () {
        uploadFile.value = '';
        uploadOverlay.classList.add('hidden');
        document.removeEventListener('keydown', window.uploadPicture.closeModalHandler);
      });
    },
    openModalHandler: function () {
      document.querySelector('body').classList.add('modal-open');
      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', window.uploadPicture.closeEscModalHandler);
      uploadCancel.addEventListener('click', window.uploadPicture.closeModalHandler);
      var effectLevel = document.querySelector('.img-upload__effect-level');
      effectLevel.classList.add('hidden');
      window.uploadPicture.uploadPicturePreview();
    },
    uploadPicturePreview: function () {
      var pictureFile = uploadFile.files[0];
      var pictureName = pictureFile.name.toLowerCase();
      var matches = FILE_TYPES.some(function (evt) {
        return pictureName.endsWith(evt);
      });
  
      if (matches) {
        var fileReader = new FileReader();
        fileReader.addEventListener('load', function () {
          pictureImgPreview.src = fileReader.result;
        });
  
        fileReader.readAsDataURL(pictureFile);
      }
    }
  };

  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.uploadPicture.openModalHandler();
  });

})();
