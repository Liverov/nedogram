'use strict';

(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var textComments = document.querySelector('.social__footer-text');

  // checkHashtags
  textHashtags.addEventListener('input', function () {
    var hashTagRegExp = /^#[a-zа-яA-ZА-Я0-9]{1,19}$/;
    var hashTagsErrorCount = 0;
    var tag = textHashtags.value.trim();
    var hashTagsArray = tag.split(' ');
    if (tag) {
      for (var i = 0; i < hashTagsArray.length; i++) {
        if (!hashTagRegExp.test(hashTagsArray[i])) {
          hashTagsErrorCount++;
        }
      }
    }
    if (hashTagsErrorCount) {
      textHashtags.setCustomValidity('Исправьте ошибки в ' + hashTagsErrorCount + ' хэштеге');
      textHashtags.reportValidity();
    } else if (hashTagsArray.length > 5) {
      textHashtags.setCustomValidity('Не больше 5 хештегов');
      textHashtags.reportValidity();
    } else {
      textHashtags.setCustomValidity('');
    }
  });

  // checkComments
  textComments.addEventListener('input', function () {
    if (textComments.value.length > 140) {
      textComments.setCustomValidity('Ваш комментарий больше 140 символов');
      textComments.reportValidity();
    } else {
      textComments.setCustomValidity('');
    }
  });

})();
