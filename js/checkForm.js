'use strict';

(function () {
  var MAX_TEXT_LENGTH = 140;
  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MIN_HASHTAG_LENGTH = 2;

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
        var hashTag = uploadHashTagsField.value.trim();
        var hashTags = hashTag.split(' ');
        var hashTagslowerCase = [];
        var hashTagErrorMessage = '';

        for (var i = 0; i < hashTags.length; i++) {
          if (hashTags[i] !== '') {
            hashTagslowerCase.push(hashTags[i].toLowerCase());
            if (!hashTagRegExp.test(hashTagslowerCase[i])) {
              hashTagErrorMessage += 'Строка после решётки должна состоять из букв и чисел. ';
            }
            if (hashTagslowerCase[i].length > MAX_HASHTAG_LENGTH || hashTagslowerCase[i].length < MIN_HASHTAG_LENGTH) {
              hashTagErrorMessage += 'Максимальная длина одного хэш-тега 20 символов, включая решётку и не менее 2 символов. ';
            }
            if (!(hashTagslowerCase.indexOf(hashTagslowerCase[i]) === hashTagslowerCase.lastIndexOf(hashTagslowerCase[i]))) {
              hashTagErrorMessage += 'Один и тот же хэш-тег не может быть использован дважды. ';
            }
            if (hashTagslowerCase.length > MAX_HASHTAGS) {
              hashTagErrorMessage += 'Нельзя указать больше пяти хэш-тегов. ';
            }
          } else {
            uploadHashTagsField.removeAttribute('style');
          }
        }

        if (hashTagErrorMessage) {
          uploadHashTagsField.style.borderColor = 'red';
          uploadHashTagsField.style.borderWidth = '5px';
          uploadHashTagsField.setCustomValidity(hashTagErrorMessage);
          uploadHashTagsField.reportValidity();
        } else {
          uploadHashTagsField.style.borderColor = '';
          uploadHashTagsField.setCustomValidity('');
        }
      }
    },
    inputFormHandlers: function () {
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
    removeFormHandlers: function () {
      uploadHashTagsField.removeAttribute('style');
      uploadHashTagsField.setCustomValidity('');
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
    document.removeEventListener('keydown', window.uploadPicture.removeEvents);
  };

  var blurInputHandler = function () {
    document.addEventListener('keydown', window.uploadPicture.removeEvents);
  };
})();
