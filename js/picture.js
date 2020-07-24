'use strict';

(function () {
  var arrPhotos = window.data.generatePhotos(window.data.PHOTOS_QUANTITY);
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  window.picture = {
    renderPhotos: function (photo) {
      var photoElement = pictureTemplate.cloneNode(true);
      var photoImg = photoElement.querySelector('.picture__img');
      var photoLikes = photoElement.querySelector('.picture__likes');
      var photoComments = photoElement.querySelector('.picture__comments');

      photoImg.src = photo.url;
      photoLikes.textContent = photo.likes;
      photoComments.textContent = photo.comments.length;
      return photoElement;
    },
    renderBigPhoto: function (photo) {
      var bigPicImg = bigPicture.querySelector('.big-picture__img');
      var bigPicComments = bigPicture.querySelector('.comments-count');
      var bigPicLikes = bigPicture.querySelector('.likes-count');
      var bigPicSocialComments = bigPicture.querySelector('.social__comments');
      var bigPicDescription = bigPicture.querySelector('.social__caption');

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

      // Закрываем по Esc Только если бигфото открыто
      document.addEventListener('keydown', closeEscBigPhoto);
      // Закрываем по клику только ели бигфото открыто
      bigPictureCancel.addEventListener('click', closeBigPhoto);
    }
  };

  // fragmentRenderPhoto
  window.addPhoto = function(responseData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < responseData.length; i++) {
      fragment.appendChild(window.picture.renderPhotos(responseData[i]));
    }
    pictures.appendChild(fragment);
  }
  function closeBigPhoto() {
    bigPicture.classList.add('hidden');
  }

  function closeEscBigPhoto(evt) {
    window.utils.isEscEvent(evt, function () {
      bigPicture.classList.add('hidden');
    });
  }

})();
