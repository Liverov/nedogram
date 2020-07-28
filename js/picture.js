'use strict';

(function () {
  var DEFAULT_COMMENTS_COUNT = 5;

  window.photosArray = [];
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
      window.photosArray = responseData;
      window.picture.updateHandler(window.photosArray);
    },
    updateHandler: function (newArray, resetData) {
      if (resetData) {
        window.picture.resetPhotos();
      }
      window.picture.renderPreview(newArray);
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

      var newCommentsArray = photo.comments.slice();

      window.resetCommentArray = function () {
        newCommentsArray.splice(0, photo.comments.length);
        newCommentsArray = photo.comments.slice();
      };

      var partComments = 0;
      var currentCommentsCount = bigPictureCommentCurrentCounter.textContent;

      if (currentCommentsCount > newCommentsArray.length) {
        bigPictureCommentCurrentCounter.textContent = newCommentsArray.length;
      } else {
        bigPictureCommentCurrentCounter.textContent = DEFAULT_COMMENTS_COUNT;
      }
      window.renderCommentsHandler = function (evt) {
        var fragment = document.createDocumentFragment();
        window.bigPictureCommentsLoader.classList.remove('hidden');

        var blockComments = newCommentsArray.splice(0, 5);
        partComments += blockComments.length;

        blockComments.forEach(function (blockComment) {
          fragment.appendChild(window.preview.renderbigPictureComments(blockComment));
          bigPictureSocialComments.appendChild(fragment);
        });
        if (newCommentsArray.length === 0) {
          window.bigPictureCommentsLoader.classList.add('hidden');
        }
        if (evt) {
          bigPictureCommentCurrentCounter.textContent = partComments;
        }
      };
      window.renderCommentsHandler();
      window.bigPictureCommentsLoader.addEventListener('click', window.renderCommentsHandler);

      document.addEventListener('keydown', closeEscBigPhotoHandler);
      window.bigPictureCancel.addEventListener('click', closeBigPhotoHandler);
    },
    renderPreview: function (photosArray) {
      var pictures = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photosArray.length; i++) {
        fragment.appendChild(window.picture.renderPhotos(photosArray[i]));
      }
      pictures.appendChild(fragment);
      window.preview.getThumbnailLink(photosArray);
    },
    resetPhotos: function () {
      var pictures = document.querySelector('.pictures');
      var pictureLink = pictures.querySelectorAll('.picture');
      for (var i = 0; i < pictureLink.length; i++) {
        pictureLink[i].removeEventListener('keydown', window.renderBigPictureEvents);
        pictureLink[i].removeEventListener('click', window.renderBigPictureEvents);
        pictures.removeChild(pictureLink[i]);
      }
      window.uploadPicture.removeEvents();
    },
    resetBigPhotoHandler: function () {
      window.resetCommentArray();
      window.bigPictureCommentsLoader.removeEventListener('click', window.renderCommentsHandler);
      document.removeEventListener('keydown', closeEscBigPhotoHandler);
      window.bigPictureCancel.removeEventListener('click', closeBigPhotoHandler);
      window.uploadPicture.removeEvents();
    }
  };

})();
