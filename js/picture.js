'use strict';

(function () {
  var DEFAULT_COMMENTS_COUNT = 5;

  window.photosGroup = [];
  var closeBigPhotoHandler = function () {
    window.bigPicture.classList.add('hidden');
    window.picture.resetBigPhoto();
  };

  var closeEscBigPhotoHandler = function (evt) {
    window.utils.isEscEvent(evt, function () {
      window.bigPicture.classList.add('hidden');
      window.picture.resetBigPhoto();
    });
  };

  window.picture = {
    successData: function (responseData) {
      window.photosGroup = responseData;
      window.picture.updateData(window.photosGroup);
    },
    updateData: function (newData, resetData) {
      if (resetData) {
        window.picture.resetPhotos();
      }
      window.picture.renderPreview(newData);
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

      var newComments = photo.comments.slice();

      window.resetComments = function () {
        newComments.splice(0, photo.comments.length);
        newComments = photo.comments.slice();
      };

      var partComments = 0;
      var currentCommentsCount = bigPictureCommentCurrentCounter.textContent;

      bigPictureCommentCurrentCounter.textContent = (currentCommentsCount > newComments.length) ? newComments.length : DEFAULT_COMMENTS_COUNT;

      window.renderComments = function (evt) {
        var fragment = document.createDocumentFragment();
        window.bigPictureCommentsLoader.classList.remove('hidden');

        var blockComments = newComments.splice(0, 5);
        partComments += blockComments.length;

        blockComments.forEach(function (blockComment) {
          fragment.appendChild(window.preview.renderbigPictureComments(blockComment));
          bigPictureSocialComments.appendChild(fragment);
        });
        if (newComments.length === 0) {
          window.bigPictureCommentsLoader.classList.add('hidden');
        }
        if (evt) {
          bigPictureCommentCurrentCounter.textContent = partComments;
        }
      };
      window.renderComments();
      window.bigPictureCommentsLoader.addEventListener('click', window.renderComments);

      document.addEventListener('keydown', closeEscBigPhotoHandler);
      window.bigPictureCancel.addEventListener('click', closeBigPhotoHandler);
    },
    renderPreview: function (photosGroup) {
      var pictures = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < photosGroup.length; i++) {
        fragment.appendChild(window.picture.renderPhotos(photosGroup[i]));
      }
      pictures.appendChild(fragment);
      window.preview.getThumbnailLink(photosGroup);
    },
    resetPhotos: function () {
      var pictures = document.querySelector('.pictures');
      var pictureLinks = pictures.querySelectorAll('.picture');
      for (var i = 0; i < pictureLinks.length; i++) {
        pictureLinks[i].removeEventListener('keydown', window.renderBigPictureEvents);
        pictureLinks[i].removeEventListener('click', window.renderBigPictureEvents);
        pictures.removeChild(pictureLinks[i]);
      }
      window.uploadPicture.removeEvents();
    },
    resetBigPhoto: function () {
      window.resetComments();
      window.bigPictureCommentsLoader.removeEventListener('click', window.renderComments);
      document.removeEventListener('keydown', closeEscBigPhotoHandler);
      window.bigPictureCancel.removeEventListener('click', closeBigPhotoHandler);
      window.uploadPicture.removeEvents();
    }
  };

})();
