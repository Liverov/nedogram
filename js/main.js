'use strict';

var PHOTOS_QUANTITY = 25;
var COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var COMMENTS_NAMES = [
  'Артем',
  'Антон',
  'Ольга',
  'Ирина',
  'Василий',
  'Яков',
  'Петр'
];

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var arrPhotos = generatePhotos(PHOTOS_QUANTITY);
var fragment = document.createDocumentFragment();
var bigPicture = document.querySelector('.big-picture');

var imgPreview = pictures.querySelector('.img-upload__preview');
var uploadFile = pictures.querySelector('#upload-file');
var uploadOverlay = pictures.querySelector('.img-upload__overlay');
var uploadCancel = pictures.querySelector('#upload-cancel');

var scaleSmaller = document.querySelector('.scale__control--smaller');
var scaleBigger = document.querySelector('.scale__control--bigger');
var scaleValue = document.querySelector('.scale__control--value');

var effects = uploadOverlay.querySelector('.effects'); // Fieldset
var effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
var effectLevelPin = document.querySelector('.effect-level__pin');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePhotos(num) {
  var photos = [];
  for (var i = 0; i < num; i++) {
    photos.push({
      'url': 'photos/' + (i + 1) + '.jpg',
      'description': 'Описание к фотографии #' + i,
      'likes': getRandomInt(15, 200),
      'comments': generateComments(getRandomInt(1, 4))
    });
  }

  return photos;
}

function generateComments(num) {
  var comments = [];
  for (var i = 0; i < num; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: COMMENTS_MESSAGES[getRandomInt(0, 5)],
      name: COMMENTS_NAMES[getRandomInt(0, 6)]
    };
  }

  return comments;
}

function renderPhotos(photo) {
  var photoElement = pictureTemplate.cloneNode(true);
  var photoImg = photoElement.querySelector('img');
  var photoLikes = photoElement.querySelector('.picture__likes');
  var photoComments = photoElement.querySelector('.picture__comments');

  photoImg.src = photo.url;
  photoLikes.textContent = photo.likes;
  photoComments.textContent = photo.comments.length;
  return photoElement;
}

for (var i = 0; i < arrPhotos.length; i++) {
  fragment.appendChild(renderPhotos(arrPhotos[i]));
}
pictures.appendChild(fragment);

// Рендер большого фото первым элементом массива
renderBigPhoto(arrPhotos[0]);

function renderBigPhoto(photo) {
  var bigPicImg = bigPicture.querySelector('.big-picture__img');
  var bigPicLikes = bigPicture.querySelector('.likes-count');
  var bigPicComments = bigPicture.querySelector('.comments-count');
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

}

function closeEscModal(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    uploadFile.value = '';
  }
}

function closeModal() {
  uploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', closeEscModal);
}

function openModal() {
  document.querySelector('body').classList.add('modal-open');
  uploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', closeEscModal);
}

uploadFile.addEventListener('change', function () {
  // document.querySelector('.social__comment-count').classList.add('hidden');
  // document.querySelector('.comments-loader').classList.add('hidden');
  openModal();
});

uploadCancel.addEventListener('click', function () {
  closeModal();
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    closeModal();
  }
});

function scaleControls() {
  var scale = 100;
  scaleValue.value = scale + '%';

  scaleSmaller.addEventListener('click', function () {
    if (scale > 25) {
      scale -= 25;
      var scaleSumm = scale / 100;
      imgPreview.style = 'transform: scale(' + scaleSumm + ')';
      scaleValue.value = scale + '%';
    }
  });

  scaleBigger.addEventListener('click', function () {
    if (scale < 100) {
      scale += 25;
      var scaleSumm = scale / 100;
      imgPreview.style = 'transform: scale(' + scaleSumm + ')';
      scaleValue.value = scale + '%';
    }
  });
}

function effectChangeHandler(evt) {
  imgPreview.setAttribute('class', '');
  imgPreview.classList.add('effects__preview--' + evt.target.value);

  if (evt.target.value === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
}

scaleControls();
effects.addEventListener('change', effectChangeHandler);

effectLevelPin.addEventListener('mouseup', function () {

});
