'use strict';

(function () {
  var pictures;

  window.preview = {
    openBigPicture: function (element, data) {
      var renderBigPictureEventsHandler = function () {
        var bigPicture = document.querySelector('.big-picture');
        bigPicture.classList.remove('hidden');
        window.picture.renderBigPhoto(data);
        window.checkForm.inputFormHandlers();
      };
      element.addEventListener('click', renderBigPictureEventsHandler);
      element.addEventListener('keydown', renderBigPictureEventsHandler);
    },
    getThumbnailLink: function (responseData) {
      pictures = document.querySelector('.pictures');
      var thumbnails = pictures.querySelectorAll('.picture');
      for (var i = 0; i < thumbnails.length; i++) {
        window.preview.openBigPicture(thumbnails[i], responseData[i]);
      }
    },
    renderbigPictureComments: function (commentsGroups) {
      var commentTemplate = document.querySelector('#social__comment').content;
      var commentElement = commentTemplate.cloneNode(true);
      var socialComment = commentElement.querySelector('.social__comment');
      var sicalCommetnAvatar = socialComment.querySelector('.social__picture');
      var socialCommentText = socialComment.querySelector('.social__text');
      sicalCommetnAvatar.src = commentsGroups.avatar;
      sicalCommetnAvatar.alt = commentsGroups.name;
      socialCommentText.textContent = commentsGroups.message;

      return commentElement;
    }
  };
})();
