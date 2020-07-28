'use strict';

(function () {
  var MAX_TEXT_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 20;

  var uploadHashTagsField = document.querySelector('.text__hashtags');
  var uploadCommentField = document.querySelector('.text__description');
  var photoCommentField = document.querySelector('.social__footer-text');

  window.checkForm = {
    checkComments: function (inputField) {
      if (inputField.target.className === 'text__description') {
        inputField = uploadCommentField;
      } else if (inputField.target.className === 'social__footer-text') {
        inputField = photoCommentField;
      }
      var comment = inputField.value;
      if (comment.length === 0) {
        inputField.setCustomValidity('');
      } else {
        if (comment.length > MAX_TEXT_LENGTH) {
          inputField.style.borderColor = 'red';
          inputField.style.borderWidth = '5px';
          inputField.setCustomValidity('длина комментария не может составлять больше 140 символов');
          inputField.reportValidity();
        } else if (comment.length <= MAX_TEXT_LENGTH) {
          inputField.setCustomValidity('');
        }
      }
    },
    checkHashTags: function (evt) {
      if (evt.target.classList.contains('text__hashtags')) {
        var hashTagRegExp = /^#[a-zа-яA-ZА-Я0-9]{1,19}$/;
        var hashTagsErrorCount = 0;
        var hashTag = uploadHashTagsField.value.trim();
        var hashTagsArrays = hashTag.split(' ');
        var hashTagslowerCaseArrays = [];
        for (var i = 0; i < hashTagsArrays.length; i++) {
          hashTagslowerCaseArrays.push(hashTagsArrays[i].toLowerCase());
          if (!hashTagRegExp.test(hashTagslowerCaseArrays[i])) {
            hashTagsErrorCount = 1;
          } else if (hashTagslowerCaseArrays[i].length > MAX_HASHTAG_LENGTH || hashTagslowerCaseArrays[i].length < MIN_HASHTAG_LENGTH) {
            hashTagsErrorCount = 2;
          } else if (!(hashTagslowerCaseArrays.indexOf(hashTagslowerCaseArrays[i]) === hashTagslowerCaseArrays.lastIndexOf(hashTagslowerCaseArrays[i]))) {
            hashTagsErrorCount = 3;
          } else if (hashTagslowerCaseArrays.length > MAX_HASHTAGS) {
            hashTagsErrorCount = 4;
          }
        }

        if (hashTagsErrorCount > 0) {
          uploadHashTagsField.style.borderColor = 'red';
          uploadHashTagsField.style.borderWidth = '5px';
        }

        switch (hashTagsErrorCount) {
          case 0:
            uploadHashTagsField.style.borderColor = '';
            uploadHashTagsField.setCustomValidity('');
            break;
          case 1:
            uploadHashTagsField.setCustomValidity('Строка после решётки должна состоять из букв и чисел');
            uploadHashTagsField.reportValidity();
            break;
          case 2:
            uploadHashTagsField.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
            uploadHashTagsField.reportValidity();
            break;
          case 3:
            uploadHashTagsField.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
            uploadHashTagsField.reportValidity();
            break;
          case 4:
            uploadHashTagsField.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
            uploadHashTagsField.reportValidity();
            break;
        }
      }
    },
    inputFormEventsHandler: function () {
      uploadHashTagsField.addEventListener('input', window.checkForm.checkHashTags);
      uploadCommentField.addEventListener('input', window.checkForm.checkComments);
      photoCommentField.addEventListener('input', window.checkForm.checkComments);
    },
    addFocusBlurHandlers: function () {
      uploadHashTagsField.addEventListener('focus', focusInputHandler);
      uploadHashTagsField.addEventListener('blur', blurInputHandler);
      uploadCommentField.addEventListener('focus', focusInputHandler);
      uploadCommentField.addEventListener('blur', blurInputHandler);
    },
    removeFormEvents: function () {
      uploadHashTagsField.removeEventListener('focus', focusInputHandler);
      uploadHashTagsField.removeEventListener('blur', blurInputHandler);
      uploadCommentField.removeEventListener('focus', focusInputHandler);
      uploadCommentField.removeEventListener('blur', blurInputHandler);
      uploadHashTagsField.removeEventListener('input', window.checkForm.checkHashTags);
      uploadCommentField.removeEventListener('input', window.checkForm.checkComments);
      photoCommentField.removeEventListener('input', window.checkForm.checkComments);
    }
  };

  var focusInputHandler = function () {
    document.removeEventListener('keydown', window.uploadPicture.removeEventsHandler);
  };

  var blurInputHandler = function () {
    document.addEventListener('keydown', window.uploadPicture.removeEventsHandler);
  };

})();
