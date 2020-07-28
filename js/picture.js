'use strict';

(function () {
  var DEFAULT_COMMENTS_COUNT = 5;

  window.photosArrays = [];
  var closeBigPhotoHandler = function () {
    window.bigPicture.classList.add('hidden');
    window.picture.resetBigPhotoHandler();
  };

  var closeEscBigPhotoHandler = function (evt) {
    window.utils.isEscEvent(evt, function () {
      window.bigPicture.classList.add('hidden');
      window.picture.resetBigPhotoHandler();
    });
  };

  window.picture = {
    successHandler: function (responseData) {
      window.photosArrays = responseData;
      window.picture.updateHandler(window.photosArrays);
    },
    updateHandler: function (newArrays, resetData) {
      if (resetData) {
        window.picture.resetPhotos();
      }
      window.picture.renderPreview(newArrays);
    },
    renderPhotos: function (photo) {
      var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
      var photoElement = pictureTemplate.cloneNode(true);
      var photoImage = photoElement.querySelector('img');
      var photoLikes = photoElement.querySelector('.picture__likes');
      var photoComments = photoElement.querySelector('.picture__comments');

      photoImage.src = photo.url;
      photoLikes.textContent = photo.likes;
      photoComments.textContent = photo.comments.length;

      return photoElement;
    },
    renderBigPhoto: function (photo) {
      window.bigPicture = document.querySelector('.big-picture');
      window.bigPictureCancel = window.bigPicture.querySelector('.big-picture__cancel');
      var bigPictureImg = window.bigPicture.querySelector('.big-picture__img');
      var bigPictureComments = window.bigPicture.querySelector('.comments-count');
      var bigPictureLikes = window.bigPicture.querySelector('.likes-count');
      var bigPictureSocialComments = window.bigPicture.querySelector('.social__comments');
      var bigPictureDescription = window.bigPicture.querySelector('.social__caption');
      window.bigPictureCommentsLoader = window.bigPicture.querySelector('.comments-loader');
      var bigPictureCommentCurrentCounter = window.bigPicture.querySelector('.comments-count__current');
      bigPictureSocialComments.innerHTML = '';
      window.bigPicture.classList.remove('hidden');

      bigPictureImg.querySelector('img').src = photo.url;
      bigPictureLikes.textContent = photo.likes;
      bigPictureComments.textContent = photo.comments.length;
      bigPictureDescription.textContent = photo.description;

      var newCommentsArrays = photo.comments.slice();

      window.resetCommentArray = function () {
        newCommentsArrays.splice(0, photo.comments.length);
        newCommentsArrays = photo.comments.slice();
      };

      var partComments = 0;
      var currentCommentsCount = bigPictureCommentCurrentCounter.textContent;

      if (currentCommentsCount > newCommentsArrays.length) {
        bigPictureCommentCurrentCounter.textContent = newCommentsArrays.length;
      } else {
        bigPictureCommentCurrentCounter.textContent = DEFAULT_COMMENTS_COUNT;
      }

      window.getCommentsHandler = function (evt) {
        var fragment = document.createDocumentFragment();
        window.bigPictureCommentsLoader.classList.remove('hidden');

        var blockComments = newCommentsArrays.splice(0, 5);
        partComments += blockComments.length;

        blockComments.forEach(function (blockComment) {
          fragment.appendChild(window.preview.renderbigPictureComments(blockComment));
          bigPictureSocialComments.appendChild(fragment);
        });
        if (newCommentsArrays.length === 0) {
          window.bigPictureCommentsLoader.classList.add('hidden');
        }
        if (evt) {
          bigPictureCommentCurrentCounter.textContent = partComments;
        }
      };
      window.getCommentsHandler();
      window.bigPictureCommentsLoader.addEventListener('click', window.getCommentsHandler);

      document.addEventListener('keydown', closeEscBigPhotoHandler);
      window.bigPictureCancel.addEventListener('click', closeBigPhotoHandler);
    },
    renderPreview: function (photosArrays) {
      var pictures = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photosArrays.length; i++) {
        fragment.appendChild(window.picture.renderPhotos(photosArrays[i]));
      }
      pictures.appendChild(fragment);
      window.preview.getThumbnailLink(photosArrays);
    },
    resetPhotos: function () {
      var pictures = document.querySelector('.pictures');
      var pictureLinks = pictures.querySelectorAll('.picture');
      for (var i = 0; i < pictureLinks.length; i++) {
        pictureLinks[i].removeEventListener('keydown', window.renderBigPictureEvents);
        pictureLinks[i].removeEventListener('click', window.renderBigPictureEvents);
        pictures.removeChild(pictureLinks[i]);
      }
      window.uploadPicture.removeEventsHandler();
    },
    resetBigPhotoHandler: function () {
      window.resetCommentArray();
      window.bigPictureCommentsLoader.removeEventListener('click', window.getCommentsHandler);
      document.removeEventListener('keydown', closeEscBigPhotoHandler);
      window.bigPictureCancel.removeEventListener('click', closeBigPhotoHandler);
      window.uploadPicture.removeEventsHandler();
    }
  };

})();
