'use strict';

(function () {
  var uploadHashTagsField = document.querySelector('.text__hashtags');
  var uploadCommentField = document.querySelector('.text__description');
  var photoCommentField = document.querySelector('.social__footer-text');

  window.checkForm = {
    checkComments: function (inputField) {
      if(inputField.target.className === 'text__description') {
        inputField = uploadCommentField;
      } else if (inputField.target.className === 'social__footer-text') {
        inputField = photoCommentField;
      }
      var comment = inputField.value;
      if (comment.length === 0) {
        inputField.setCustomValidity('');
      } else {
        if (comment.length > 140) {
          inputField.style.borderColor = 'red';
          inputField.style.borderWidth = '5px';
          inputField.setCustomValidity('длина комментария не может составлять больше 140 символов');
          inputField.reportValidity();
        } else if (comment.length <= 140) {
          inputField.setCustomValidity('');
        }
      }
    },
    checkHashTags: function (evt) {
      if (evt.target.classList.contains('text__hashtags')) {
        var hashTagRegExp = /^#[a-zа-яA-ZА-Я0-9]{1,19}$/;
        var hashTagsErrorCount = 0;
        var hashTag = uploadHashTagsField.value.trim();
        var hashTagsArray = hashTag.split(' ');
        var hashTagslowerCaseArray = [];
        for (var i = 0; i < hashTagsArray.length; i++) {
          hashTagslowerCaseArray.push(hashTagsArray[i].toLowerCase());
          if (!hashTagRegExp.test(hashTagslowerCaseArray[i])) {
            hashTagsErrorCount = 1;
          } else if (hashTagslowerCaseArray[i].length > 20 || hashTagslowerCaseArray[i].length < 2) {
            hashTagsErrorCount = 2;
          } else if (!(hashTagslowerCaseArray.indexOf(hashTagslowerCaseArray[i]) === hashTagslowerCaseArray.lastIndexOf(hashTagslowerCaseArray[i]))) {
            hashTagsErrorCount = 3;
          } else if (hashTagslowerCaseArray.length > 5) {
            hashTagsErrorCount = 4;
          }
        }

        if(hashTagsErrorCount > 0) {
          uploadHashTagsField.style.borderColor = 'red';
          uploadHashTagsField.style.borderWidth = '5px';
        }

        switch (hashTagsErrorCount) {
          case 0:
            uploadHashTagsField.style.borderColor = '';
            uploadHashTagsField.setCustomValidity('');
            break;
          case 1:
            uploadHashTagsField.setCustomValidity('строка после решётки должна состоять из букв и чисел');
            uploadHashTagsField.reportValidity();
            break;
          case 2:
            uploadHashTagsField.setCustomValidity('хеш-тег не может состоять только из одной решётки, максимальная длинаодного хэш-тега 20 символов, включая решётку');
            uploadHashTagsField.reportValidity();
            break;
          case 3:
            uploadHashTagsField.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
            uploadHashTagsField.reportValidity();
            break;
          case 4:
            uploadHashTagsField.setCustomValidity('нельзя указать больше пяти хэш-тегов');
            uploadHashTagsField.reportValidity();
            break;
        }
      }
    },
    inputFormEvents: function () {
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
    document.removeEventListener('keydown', window.uploadPicture.removeEvents);
  };

  var blurInputHandler = function () {
    document.addEventListener('keydown', window.uploadPicture.removeEvents);
  };

})();
