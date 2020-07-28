'use strict';

(function () {
  var formImage = document.querySelector('#upload-select-image');
  formImage.addEventListener('submit', function submitHandler(evt) {
    evt.preventDefault();

    var formData = new FormData(formImage);
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://javascript.pages.academy/kekstagram');
    xhr.send(formData);
    xhr.addEventListener('load', function submitFormHandler() {
      if (xhr.status === 200) {
        window.uploadPicture.removeEvents();
        window.modalForm.showSuccessMessage();
      } else {
        window.uploadPicture.removeEvents();
        window.modalForm.showErrorMessage();
      }
    });
  });
})();
