'use strict';

(function () {
  window.picture = {
    renderPhotos: function (photo) {
      var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
      var photoElement = pictureTemplate.cloneNode(true);
      var photoImg = photoElement.querySelector('img');
      var photoLikes = photoElement.querySelector('.picture__likes');
      var photoComments = photoElement.querySelector('.picture__comments');

      photoImg.src = photo.url;
      photoLikes.textContent = photo.likes;
      photoComments.textContent = photo.comments.length;

      return photoElement;
    },
    renderBigPhoto: function (photo) {
      window.bigPicture = document.querySelector('.big-picture');
      var bigPictureCancel = window.bigPicture.querySelector('.big-picture__cancel');
      var bigPicImg = window.bigPicture.querySelector('.big-picture__img');
      var bigPicComments = window.bigPicture.querySelector('.comments-count');
      var bigPicLikes = window.bigPicture.querySelector('.likes-count');
      var bigPicSocialComments = window.bigPicture.querySelector('.social__comments');
      var bigPicDescription = window.bigPicture.querySelector('.social__caption');

      bigPicImg.querySelector('img').src = photo.url;
      bigPicLikes.textContent = photo.likes;
      bigPicComments.textContent = photo.comments.length;

      for (var j = 0; j < photo.comments.length; j++) {
        var li = bigPicSocialComments.querySelector('li');
        var img = li.querySelector('img');
        img.src = photo.comments[j].avatar;
        img.alt = photo.comments[j].name;
        var commentMessage = li.querySelector('.social__text');
        commentMessage.textContent = photo.comments[j].message;
        bigPicSocialComments.appendChild(li);
      }

      bigPicDescription.textContent = photo.description;

      document.addEventListener('keydown', closeEscBigPhoto);
      bigPictureCancel.addEventListener('click', closeBigPhoto);
    },
    renderPreview: function (responseData) {
      var pictures = document.querySelector('.pictures');
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < responseData.length; i++) {
        fragment.appendChild(window.picture.renderPhotos(responseData[i]));
      }
      pictures.appendChild(fragment);
    }
  };

  function closeBigPhoto() {
    window.bigPicture.classList.add('hidden');
  }

  function closeEscBigPhoto(evt) {
    window.utils.isEscEvent(evt, function () {
      window.bigPicture.classList.add('hidden');
    });
  }

})();
