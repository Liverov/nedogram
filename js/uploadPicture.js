'use strict';

(function () {
  var FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

  var pictures = document.querySelector('.pictures');
  var uploadFile = pictures.querySelector('#upload-file');
  var uploadOverlay = pictures.querySelector('.img-upload__overlay');
  var uploadCancel = pictures.querySelector('#upload-cancel');
  var picturePreview = uploadOverlay.querySelector('.img-upload__preview');
  var pictureImgPreview = picturePreview.querySelector('img');
  var imagePreview = pictures.querySelector('.img-upload__preview');

  window.uploadPicture = {
    removeEvents: function (evt) {
      if (evt) {
        window.utils.isEscEvent(evt, function () {
          document.removeEventListener('keydown', window.uploadPicture.removeEvents);
        });
      }
      uploadOverlay.classList.add('hidden');
      uploadFile.value = '';
      uploadCancel.removeEventListener('click', window.uploadPicture.removeEvents);
      document.querySelector('#upload-select-image').reset();
      window.checkForm.removeFormEvents();
      window.effects.resetSlider();
      window.effects.resetMouseDownChange();
      var bodyElement = document.querySelector('body');
      bodyElement.removeAttribute('class');
    },
    openModal: function (evt) {
      window.pictureEffect = evt.target.value;
      document.querySelector('.scale__control--value').value = '100%';
      imagePreview.removeAttribute('style');
      imagePreview.setAttribute('class', 'img-upload__preview');
      document.querySelector('body').classList.add('modal-open');
      uploadOverlay.classList.remove('hidden');
      var effectLevel = document.querySelector('.img-upload__effect-level');
      effectLevel.classList.add('hidden');
      window.uploadPicture.uploadPicturePreview();
      window.effects.scrollEffectChange();
      window.checkForm.inputFormEvents();
      window.checkForm.addFocusBlur();
      window.effects.scaleChange();
      document.addEventListener('keydown', window.uploadPicture.removeEvents);
      uploadCancel.addEventListener('click', window.uploadPicture.removeEvents);
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

  uploadFile.addEventListener('change', window.uploadPicture.openModal);
})();
