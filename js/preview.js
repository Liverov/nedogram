'use strict';

(function () {
  window.preview = {
    openBigPicture: function (element, data) {
      window.renderBigPictureEvents = function () {
        var bigPicture = document.querySelector('.big-picture');
        bigPicture.classList.remove('hidden');
        window.picture.renderBigPhoto(data);
        window.checkForm.inputFormEvents();
      }

      element.addEventListener('click', window.renderBigPictureEvents);
      element.addEventListener('keydown', window.renderBigPictureEvents);
    },
    getThumbnailLink: function (responseData) {
      window.pictures = document.querySelector('.pictures');
      var thumbnails = window.pictures.querySelectorAll('.picture');
      for (var i = 0; i < thumbnails.length; i++) {
        window.preview.openBigPicture(thumbnails[i], responseData[i]);
      }
    },
    renderbigPictureComments: function (commentsArray) {
      var commentTemplate = document.querySelector('#social__comment').content;
      var commentElement = commentTemplate.cloneNode(true);
      var socialComment = commentElement.querySelector('.social__comment');
      var sicalCommetnAvatar = socialComment.querySelector('.social__picture');
      var socialCommentText = socialComment.querySelector('.social__text');
      sicalCommetnAvatar.src = commentsArray.avatar;
      sicalCommetnAvatar.alt = commentsArray.name;
      socialCommentText.textContent = commentsArray.message;

      return commentElement;
    }
  };
})();
