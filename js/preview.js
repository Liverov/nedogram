'use strict';

(function () {
  window.preview = {
    openBigPicture: function (element, data) {
      window.renderBigPictureEventsHandler = function () {
        var bigPicture = document.querySelector('.big-picture');
        bigPicture.classList.remove('hidden');
        window.picture.renderBigPhoto(data);
        window.checkForm.inputFormEventsHandler();
      };
      element.addEventListener('click', window.renderBigPictureEventsHandler);
      element.addEventListener('keydown', window.renderBigPictureEventsHandler);
    },
    getThumbnailLink: function (responseData) {
      window.pictures = document.querySelector('.pictures');
      var thumbnails = window.pictures.querySelectorAll('.picture');
      for (var i = 0; i < thumbnails.length; i++) {
        window.preview.openBigPicture(thumbnails[i], responseData[i]);
      }
    },
    renderbigPictureComments: function (commentsArrays) {
      var commentTemplate = document.querySelector('#social__comment').content;
      var commentElement = commentTemplate.cloneNode(true);
      var socialComment = commentElement.querySelector('.social__comment');
      var sicalCommetnAvatar = socialComment.querySelector('.social__picture');
      var socialCommentText = socialComment.querySelector('.social__text');
      sicalCommetnAvatar.src = commentsArrays.avatar;
      sicalCommetnAvatar.alt = commentsArrays.name;
      socialCommentText.textContent = commentsArrays.message;

      return commentElement;
    }
  };
})();
